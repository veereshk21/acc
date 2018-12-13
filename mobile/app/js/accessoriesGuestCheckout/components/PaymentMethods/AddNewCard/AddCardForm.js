import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { Row, Col } from 'react-flexbox-grid';

import MSelect from '../../../../common/Select/index';
import { renderTextField } from '../../../../common/TextField/';
import * as validation from '../../../../common/validation';
import NortonSeal from '../../../../../images/norton_secure_seal.svg';
import CVV from '../../../../../images/cvv.svg';
import Checkbox from '../../../../common/Checkbox/index';


const selector = formValueSelector('addPaymentForm');

const validate = (values, props) => {
  const errors = {};

  const cardNumber = values.get('card_number');
  const cardExpiryMonth = values.get('card_month');
  const cardExpiryYear = values.get('card_year');
  const cardCVC = values.get('card_cvc');
  const zipCode = values.get('zipcode');

  const cvvLength = cardNumber && validation.getCardType(cardNumber) === 'amex' ? 4 : 3;

  if (!cardNumber) {
    errors.card_number = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidCreditCardNumber(cardNumber)) {
    errors.card_number = props.cq.error.OD_CHECKOUT_PAYMENT_INVALID_CARD_ERROR;
  }

  if (!cardExpiryMonth) {
    errors.card_month = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidCreditCardMonth(cardExpiryMonth, cardExpiryYear)) {
    errors.card_month = props.cq.error.OD_CHECKOUT_PAYMENT_INVALID_EXPIRATION_MONTH_ERROR;
  }

  if (!cardExpiryYear) {
    errors.card_year = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidCreditCardExpiryYear(cardExpiryYear)) {
    errors.card_year = props.cq.error.OD_CHECKOUT_PAYMENT_INVALID_EXPIRATION_YEAR_ERROR;
  }

  if (!cardCVC) {
    errors.card_cvc = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidCreditCardCVC(cardCVC, cvvLength)) {
    errors.card_cvc = props.cq.error.OD_CHECKOUT_PAYMENT_INVALID_CVC_ERROR;
  }

  if (!zipCode) {
    errors.zipcode = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidZipCode(zipCode)) {
    errors.zipcode = props.cq.error.OD_CHECKOUT_PAYMENT_INVALID_ZIPCODE_ERROR;
  }
  return errors;
};

class AddNewCardForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.cardinalInit = window.cardinalInit || false;
    this.giftCard = props.giftCardFlow;
    this.onCardFocus = this.onCardFocus.bind(this);
    this.onCardBlur = this.onCardBlur.bind(this);
    this.onCardChange = this.onCardChange.bind(this);
  }
  componentDidMount = () => {
    const {
      handle3dPaymentValidated, dispatchErrorNotification, authInfo, asyncFetchFalied, cq,
    } = this.props;
    document.getElementById('useGiftCard').checked = this.giftCard;
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
                dispatchErrorNotification(cq.error.OD_CHECKOUT_CARDINAL_FAILURE_ERROR);
                break;

              case 'ERROR': // Handle service level error
                console.log('ERROR');
                asyncFetchFalied();
                dispatchErrorNotification(cq.error.OD_CHECKOUT_CARDINAL_ERROR_ERROR);
                break;

              default:
                break;
            }
          } else if (data.ActionCode === 'ERROR' || data.ActionCode === 'FAILURE') {
            console.log(data.ActionCode);
            asyncFetchFalied();
            dispatchErrorNotification(cq.error.OD_CHECKOUT_CARDINAL_ERROR_ERROR);
          } else {
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
  cardErrorCheck() {
    const { cq } = this.props;
    if (!this.state.card_number.length) {
      this.setState({ card_error: cq.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT });
    } else if (!/^4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}$/i.test(this.state.card_number)) {
      this.setState({ card_error: cq.error.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_INVALID_CARD_ERROR });
    } else {
      this.setState({ card_error: '' });
    }
  }

  updateGiftCardFlag = (e) => {
    this.giftCard = e.target.checked;
  }
  handleAddNewCard(creditCardInfo, addPaymentForm, pieEnabled, giftCardFlow, cardinalInit) {
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

    this.props.addNewCard(creditCardInfo, addPaymentForm, pieEnabled, giftCardFlow, cardinalInit);
  }
  render() {
    const {
      cq, billingInfo, cvvLength, handleSubmit, valid, submitting, pieEnabled,
    } = this.props;
    const addPaymentForm = this;
    return (
      <div>
        <Row className="noSideMargin pad24 onlySidePad">
          <Col xs={8} className="margin6 noSideMargin">
            <Field
              className=""
              component={renderTextField}
              errorText={this.state.card_error}
              aria-label="Credit or Debit Card Number"
              name="card_number"
              id="card_number"
              type="text"
              label={cq.label.OD_CHECKOUT_PAYMENT_CARD_NUMBER}
              maxLength="16"
              textFieldValue={this.state.masked_card_number}
              onFocus={this.onCardFocus}
              onBlur={this.onCardBlur}
              onChange={this.onCardChange}
              autoFocus
              required
              pattern="[0-9]*"
            />
          </Col>
          <Col xs={4} >
            <img className="height60 margin24 onlyTopMargin" src={NortonSeal} alt="Norton Secured" />
          </Col>
        </Row>
        <Row className="noSideMargin pad24 onlySidePad">
          <Col xs={4} className="margin6 noSideMargin noBottomMargin">
            <MSelect
              name="card_month"
              id="card_month"
              label={cq.label.OD_CHECKOUT_PAYMENT_CARD_EXPIRATION_MONTH}
              analyticstrack="choose-exp-month"
              borderStyle
              required
            >
              <option disabled value="" />
              {billingInfo.expirationMonths.map((month) => (<option key={`month-${month}`} value={month}>{month}</option>))}
            </MSelect>
          </Col>
          <Col xs={4} className="margin6 noSideMargin noBottomMargin">
            <MSelect
              name="card_year"
              id="card_year"
              label={cq.label.OD_CHECKOUT_PAYMENT_CARD_EXPIRATION_YEAR}
              analyticstrack="choose-exp-year"
              borderStyle
              required
            >
              <option disabled value="" />
              {billingInfo.expirationYears.map((year) => (<option key={`year-${year}`} value={year}>{year}</option>))}
            </MSelect>
          </Col>
          <Col xs={4} className="margin6 noSideMargin noBottomMargin">
            <Field
              className=""
              component={renderTextField}
              id="card_cvc"
              name="card_cvc"
              normalize={validation.allowOnlyNumbers}
              maxLength={cvvLength}
              label={cq.label.OD_CHECKOUT_PAYMENT_CARD_CVV}
              type="password"
              required
              tooltip={
                <div>
                  <p className="margin12 onlyBottomMargin">{cq.label.OD_CHECKOUT_PAYMENT_CARD_CVV_TOOLTIP}</p>
                  <img src={CVV} alt="CVV location" />
                </div>
              }
            />
          </Col>
        </Row>
        <Row className="noSideMargin pad24 onlySidePad">
          <Col xs={12} className="margin6 noSideMargin">

            <Field
              component={renderTextField}
              type="text"
              id="zipcode"
              name="zipcode"
              label={this.props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_ZIPCODE_TEXT}
            />
          </Col>

        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={12} >
            <Checkbox
              className="checkbox"
              name="useGiftCard"
              id="useGiftCard"
              component="input"
              type="checkbox"
              checkboxClass="displayInlineBlock"
              labelClass="displayInlineBlock verticalCenter"
              aria-labelledby="labelId"
              tabIndex="-1"
              aria-hidden
              onClick={this.updateGiftCardFlag}
              analyticstrack="use-gift-card"
            >
              <p className="margin6 onlyLeftMargin" id="labelId" >
                I want to use a gift card.
              </p>
            </Checkbox>
          </Col>
        </Row>
        <Row className="noSideMargin pad24 onlySidePad" />
        <Row className="noSideMargin pad24 onlySidePad footerFixed">
          <Col xs={12} className="textAlignCenter">
            <button
              className="primary button large"
              type="submit"
              disabled={!valid || submitting}
              analyticstrack="submit-new-card"
              onClick={
                handleSubmit((data) => {
                  this.handleAddNewCard(Object.assign({}, data.toJS(), { cardType: validation.getCardType(data.get('card_number')) }), addPaymentForm, pieEnabled, this.giftCard, this.cardinalInit);// dispatches add new card action
                })
              }
            >{'Continue'}
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

AddNewCardForm.propTypes = {
  cq: PropTypes.object,
  billingInfo: PropTypes.object,
  cvvLength: PropTypes.number,
  handleSubmit: PropTypes.func,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  pieEnabled: PropTypes.bool,
  handle3dPaymentValidated: PropTypes.func,
  dispatchErrorNotification: PropTypes.func,
  authInfo: PropTypes.object,
  asyncFetchFalied: PropTypes.func,
  addNewCard: PropTypes.func,
  giftCardFlow: PropTypes.bool,
};

export default reduxForm({
  form: 'addPaymentForm',
  destroyOnUnmount: false,
  validate,
})(connect((state) => {
  const forms = state.get('form').toJS();
  const cardNumber = selector(state, 'card_number');
  const cvvLength = cardNumber && validation.getCardType(cardNumber) === 'amex' ? 4 : 3;
  return {
    cvvLength,
    newCardForm: forms.addPaymentForm ? forms.addPaymentForm : {},
  };
})(AddNewCardForm));
