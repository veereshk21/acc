/* eslint-disable no-class-assign,no-nested-ternary */
/**
 * Created by mambig on 1/4/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { hashHistory } from './../../../store';
import BackButton from '../../../common/BackButton/BackButton';
import Loader from '../../../common/Loader/Loader';
import Title from '../../../common/Title/Title';
import MSelect from './../../../common/Select/';
import { renderTextField } from './../../../common/TextField';
import * as validation from '../../../common/Validation/';
import CVV from '../../../../images/cvv.svg';
import NortonSeal from '../../../../images/norton_secure_seal.svg';


const validate = (values, props) => {
  const errors = {};

  const cardNumber = values.get('card_number');
  const cardExpiryMonth = values.get('card_month');
  const cardExpiryYear = values.get('card_year');
  const cardCVC = values.get('card_cvc');
  const cvvLength = (!cardNumber) ? 3 : (validation.getCardType(cardNumber) === 'amex' ? 4 : 3);
  const card_zip = values.get('card_zip');

  if (!cardNumber) {
    errors.card_number = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}$/i.test(values.get('card_number'))) {
    errors.card_number = props.cqContent.error.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_INVALID_CARD_ERROR;
  }

  if (!cardExpiryMonth) {
    errors.card_month = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (validation.validateCreditCardMonth(cardExpiryMonth, cardExpiryYear) === false) {
    errors.card_month = props.cqContent.error.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_INVALID_EXPIRATION_MONTH_ERROR;
  }
  //
  if (!cardExpiryYear) {
    errors.card_year = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (validation.validateCardExpiryYear(cardExpiryYear) === false) {
    errors.card_year = props.cqContent.error.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_INVALID_EXPIRATION_YEAR_ERROR;
  }
  //
  if (!cardCVC) {
    errors.card_cvc = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/i.test(cardCVC) || cardCVC.toString().length < cvvLength || cardCVC.toString().length > cvvLength) {
    errors.card_cvc = props.cqContent.error.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_INVALID_CVC_ERROR;
  }
  //
  if (!card_zip) {
    errors.card_zip = props.cqContent.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidZipCode(card_zip)) {
    errors.card_zip = props.cqContent.error.OD_CHECKOUT_PAYMENT_INVALID_ZIPCODE_ERROR;
  }
  console.log(errors);
  return errors;
};


class AddPaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card_number: '',
      masked_card_number: '',
      card_error: '',
    };
    this.onCardFocus = this.onCardFocus.bind(this);
    this.onCardBlur = this.onCardBlur.bind(this);
    this.onCardChange = this.onCardChange.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.updateShippingInfo = this.updateShippingInfo.bind(this);
    this.cardinalInit = window.cardinalInit || false;
  }
  componentDidMount = () => {
    const {
      handle3dPaymentValidated, dispatchErrorNotification, authInfo, asyncFetchFalied, cqContent,
    } = this.props;
    const _this = this;
    if (window.Cardinal && authInfo) {
      try {
        window.Cardinal.configure({
          logging: {
            level: 'verbose',
          },
        });

        window.Cardinal.setup('init', {
          jwt: authInfo.clients.CARDINAL3DSECURE.token,
        });

        window.Cardinal.on('payments.setupComplete', () => {
          console.log('Cardinal setup Complete');
          _this.cardinalInit = true;
        });

        window.Cardinal.on('payments.validated', (data, jwt) => {
          console.log('Trigger::: AddPaymentMethod', data);
          if (typeof data.Payment !== 'undefined' && data.Payment.Type !== undefined) {
            switch (data.ActionCode) {
              case 'SUCCESS': // Handle successful authentication scenario and validate the signature on the JWT
                console.log('Trigger:: AddPaymentMethod :: SUCCESS');
                handle3dPaymentValidated(data, jwt);// dispatches handle3dPaymentValidated action
                break;

              case 'NOACTION': // Handle unenrolled scenario
                console.log('Trigger:: AddPaymentMethod :: NOACTION');
                handle3dPaymentValidated(data, jwt);// dispatches handle3dPaymentValidated action
                break;

              case 'FAILURE': // Handle authentication failed or error encounter scenario
                console.log('FAILURE');
                asyncFetchFalied();
                dispatchErrorNotification(cqContent.error.OD_CHECKOUT_CARDINAL_FAILURE_ERROR);
                break;

              case 'ERROR': // Handle service level error
                console.log('ERROR');
                asyncFetchFalied();
                dispatchErrorNotification(cqContent.error.OD_CHECKOUT_CARDINAL_ERROR_ERROR);
                break;

              default:
                break;
            }
          } else if (data.ActionCode === 'ERROR' || data.ActionCode === 'FAILURE') {
            console.log(data.ActionCode);
            asyncFetchFalied();
            dispatchErrorNotification(cqContent.error.OD_CHECKOUT_CARDINAL_ERROR_ERROR);
          } else {
            asyncFetchFalied();
            _this.cardinalInit = false;
          }
        });
      } catch (e) {
        // An error occurred
        _this.cardinalInit = false;
        console.log((window.Cardinal === undefined ? 'Cardinal Cruise did not load properly. ' : 'Cardinal::: An error occurred during processing. ') + e);
      }
    }
  }
  componentWillUnmount() {
    if (window.Cardinal) {
      console.log('Component UnMounted from AddPaymentMethod');
      window.Cardinal.off('payments.validated');
    }
  }
  onCardFocus() {
    this.setState({
      card_number: '',
      masked_card_number: '',
      card_error: '',
    });
  }

  onCardBlur() {
    const str = this.state.card_number;
    this.setState({
      masked_card_number: str.substring(0, str.length - 4).replace(/[0-9]/g, '*') + str.substring(str.length - 4, str.length),
    });
    this.cardErrorCheck();
  }

  onCardChange(e) {
    const normalizedValue = validation.allowOnlyNumbers(e.target.value);
    this.setState({
      card_number: normalizedValue,
      masked_card_number: normalizedValue,
    });
  }

  onCancelClick() {
    if (this.props.ispuBTAPaymentUpdated) {
      this.updateShippingInfo();
    } else {
      hashHistory.goBack();
    }
  }

  updateShippingInfo() {
    const { selectedShippingInfo, cqContent } = this.props;
    this.props.updateShippingAddress(selectedShippingInfo, cqContent.error.OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT);
  }

  cardErrorCheck() {
    const { cqContent } = this.props;
    if (!this.state.card_number.length) {
      this.setState({ card_error: cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT });
    } else if (!/^4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}$/i.test(this.state.card_number)) {
      this.setState({ card_error: cqContent.error.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_INVALID_CARD_ERROR });
    } else {
      this.setState({ card_error: '' });
    }
  }
  handleAddNewCard(creditCardInfo, addPaymentMethodForm, pastDuePaymentRequired, pieEnabled, giftCardFlow) {
    const { authInfo } = this.props;
    if (window.Cardinal && authInfo) {
      const binDectionNumber = creditCardInfo.card_number.slice(0, 6);
      try {
        if (typeof authInfo.clients.CARDINAL3DSECURE.featuresList !== 'undefined' && authInfo.clients.CARDINAL3DSECURE.featuresList.binDetection) {
          window.Cardinal.trigger('accountNumber.update', binDectionNumber);
        }
      } catch (e) {
        console.log((window.Cardinal === undefined ? 'Cardinal Cruise did not load properly. ' : 'Cardinal::: An error occurred during processing. ') + e);
      }
    }

    this.props.addNewCard(creditCardInfo, addPaymentMethodForm, pastDuePaymentRequired, pieEnabled, giftCardFlow, this.cardinalInit);
  }
  render() {
    const {
      handleSubmit, valid, submitting, paymentRequired, expirationMonths, expirationYears, isFetching, cvvLength, cqContent, pieEnabled, paymentFlow, giftCardFlow, showLoaderMessage, creditCardZipEditable,
    } = this.props;
    const addPaymentMethodForm = this;
    let backRoute = '/choosePaymentMethod';
    if (paymentFlow === 'giftCard') {
      backRoute = '/choosePaymentMethod/giftCard';
    } else if (paymentFlow === 'newGiftCard') {
      backRoute = '/';
    }
    const _lodermessage = showLoaderMessage ? cqContent.label.OD_CHECKOUT_PROGRESS_MESSAGE : null;
    return (

      <div className="pad12 noSidePad">
        {isFetching === true && <Loader content={_lodermessage} />}
        <BackButton to={backRoute}>{cqContent.label.OD_CHECKOUT_BACK_TEXT}</BackButton>
        <Grid>

          <Row >
            <Col xs={12}>

              <div className="pad12">
                <Row>
                  <Col xs={11}>

                    {this.props.pastDuePaymentRequired &&
                      <h6
                        className="margin12 onlyBottomMargin"
                      >{cqContent.label.OD_CHECKOUT_PAST_DUE_PAYMENT_DESCRIPTION_TEXT}{this.props.pastDueAmount}
                      </h6>}
                    <Title className="h2" >Add a new payment method.</Title>
                    {!creditCardZipEditable &&
                      <p className="pad6 onlyTopPad">
                        {cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_DESCRIPTION_TEXT}
                      </p>
                    }
                  </Col>
                </Row>


                <Row className="pad36 noSidePad margin102 onlyBottomMargin">

                  <Col xs={12} className="noSidePad">
                    <form>
                      <Row >
                        <Col xs={8} className="clearfix">
                          <Field
                            errorText={this.state.card_error}
                            aria-label="Credit or Debit Card Number"
                            name="card_number"
                            id="card_number"
                            component={renderTextField}
                            type="text"
                            label={cqContent.label.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_CARD_NUMBER_TEXT}
                            maxLength="16"
                            textFieldValue={this.state.masked_card_number}
                            onFocus={this.onCardFocus}
                            onBlur={this.onCardBlur}
                            onChange={this.onCardChange}
                            autoFocus
                            pattern="[0-9]*"
                          />
                        </Col>
                        <Col xs={4} className="clearfix">
                          <Field
                            aria-label="CVV Number"
                            name="card_cvc"
                            id="card_cvc"
                            component={renderTextField}
                            type="password"
                            label={cqContent.label.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_CVC_TEXT}
                            maxLength={cvvLength}
                            tooltip={
                              <div>
                                <p className="margin12 onlyBottomMargin">{cqContent.label.OD_CHECKOUT_PAYMENT_CARD_CVV_TOOLTIP}</p>
                                <img src={CVV} alt="CVV location" />
                              </div>
                            }
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={8} >
                          <Row>
                            <Col xs={6}>
                              <MSelect
                                name="card_month"
                                id="card_month"
                                label={cqContent.label.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_EXPIRATION_MONTH_TEXT}
                                borderStyle
                                required
                                defaultSelected={0}
                                analyticstrack="choose-exp-month"
                              >
                                <option value="0" >{cqContent.label.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_EXPIRATION_MONTH_TEXT}</option>
                                {expirationMonths.map((month) => (<option key={`month-${month}`} value={month}>{month}</option>))}
                              </MSelect>
                            </Col>
                            <Col xs={6}>
                              <MSelect
                                name="card_year"
                                id="card_year"
                                label={cqContent.label.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_EXPIRATION_YEAR_TEXT}
                                borderStyle
                                required
                                defaultSelected={0}
                                analyticstrack="choose-exp-year"
                              >
                                <option value="0" >{cqContent.label.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_EXPIRATION_YEAR_TEXT}</option>
                                {expirationYears.map((year) => (<option key={`year-${year}`} value={year}>{year}</option>))}
                              </MSelect>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={4} >
                          <Field
                            className="leftAlign width100 fontSize_4"
                            aria-label="Card Zip Code"
                            name="card_zip"
                            id="card_zip"
                            component={renderTextField}
                            type="text"
                            label={cqContent.label.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_ZIPCODE_TEXT}
                            normalize={validation.normalizeZipCode}
                            maxLength="10"
                            readOnly={!creditCardZipEditable}
                          />
                        </Col>
                      </Row>
                      <div>
                        <img className="height48 margin18 onlyTopMargin" src={NortonSeal} alt="Norton Secured" />
                      </div>
                    </form>
                  </Col>

                </Row>
              </div>
              <Row className="footerFixed border_00 onlyTopBorder textAlignCenter">
                <Col xs={12}>
                  {paymentRequired === false ?
                    <Link
                      to={backRoute}
                      className="secondary button large margin18 onlyRightMargin"
                      analyticstrack="cancel-add-newcard"
                    >{cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_EDIT_PAYMENT_METHOD_CANCEL_TEXT}
                    </Link> :
                    <a
                      onClick={this.onCancelClick}
                      className="secondary button large margin18 onlyRightMargin"
                      analyticstrack="cancel-add-newcard"
                    >{cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_EDIT_PAYMENT_METHOD_CANCEL_TEXT}
                    </a>}
                  <button
                    className="primary button large"
                    type="submit"
                    disabled={!valid || submitting}
                    analyticstrack="submit-add-newcard"
                    onClick={
                      handleSubmit((data) => {
                        this.handleAddNewCard(Object.assign({}, data.toJS(), { cardType: validation.getCardType(data.get('card_number')) }), addPaymentMethodForm, this.props.pastDuePaymentRequired, pieEnabled, giftCardFlow, this.cardinalInit);// dispatches add new card action
                      })
                    }
                  >{this.props.pastDuePaymentRequired ? 'Process Payment' : 'Continue'}
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

AddPaymentMethod.propTypes = {
  handleSubmit: PropTypes.func,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  isFetching: PropTypes.bool,
  paymentRequired: PropTypes.bool,
  cqContent: PropTypes.object,
  addNewCard: PropTypes.func,
  dispatchErrorNotification: PropTypes.func,
  handle3dPaymentValidated: PropTypes.func,
  ispuBTAPaymentUpdated: PropTypes.bool,
  selectedShippingInfo: PropTypes.object,
  updateShippingAddress: PropTypes.func,
  pastDuePaymentRequired: PropTypes.bool,
  pastDueAmount: PropTypes.string,
  expirationMonths: PropTypes.array,
  expirationYears: PropTypes.array,
  cvvLength: PropTypes.number,
  pieEnabled: PropTypes.bool,
  paymentFlow: PropTypes.string,
  giftCardFlow: PropTypes.bool,
  authInfo: PropTypes.object,
  asyncFetchFalied: PropTypes.func,
  showLoaderMessage: PropTypes.bool,
  creditCardZipEditable: PropTypes.bool,
};

AddPaymentMethod = reduxForm({
  form: 'addPaymentForm',
  validate,
})(AddPaymentMethod);

const selector = formValueSelector('addPaymentForm');

AddPaymentMethod = connect((state) => {
  const cardNumber = selector(state, 'card_number');
  // eslint-disable-next-line no-nested-ternary
  const cvvLength = (!cardNumber) ? 3 : (validation.getCardType(cardNumber) === 'amex' ? 4 : 3);

  return {
    cvvLength,
  };
})(AddPaymentMethod);

export default AddPaymentMethod;
