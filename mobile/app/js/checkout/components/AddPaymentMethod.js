/* eslint-disable no-class-assign,no-nested-ternary */
/**
 * Created by mambig on 1/4/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { hashHistory } from './../../store';
import BackButton from '../../common/BackButton/BackButton';
import Loader from '../../common/Loader/Loader';
import Title from '../../common/Title/Title';
import styles from '../../common/Constants/FormStyles';

/* eslint-disable react/no-string-refs */
const validateCreditCardMonth = (expiryMonth, expiryYear = 0) => {
  const _month = new Date().getMonth() + 1;
  const _year = new Date().getFullYear();

  let isValid = true;
  if (Number(expiryMonth) > 0 && !/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/i.test(expiryMonth) === false && Number(expiryMonth) <= 12) {
    if (parseInt(expiryYear, 10) > 0) { // if year is entered
      if (parseInt(expiryYear, 10) === _year && parseInt(expiryMonth, 10) < _month) { // if year is same as current year, month should be greater than current one.
        isValid = false;
      }
    }
  } else {
    isValid = false;
  }
  return isValid;
};


const validateCardExpiryYear = (expiryYear) => {
  let isValid = true;
  const _year = new Date().getFullYear();
  if (Number(expiryYear) > 0 && !/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/i.test(expiryYear) === false) {
    if (parseInt(expiryYear, 10) < _year) {
      isValid = false;
    }
  } else {
    isValid = false;
  }
  return isValid;
};

const allowOnlyNumbers = (value) => {
  if (!value) {
    return value;
  }
  // Reject other than numbers
  return value.replace(/[^\d]/g, '');
};

const normalizeZipCode = (value) => {
  if (!value) {
    return value;
  }
  // Reject other than numbers and hypen
  return value.replace(/[^\d-]/g, '');
};

const validate = (values, props) => {
  const errors = {};

  const cardNumber = values.get('card_number');
  const cardExpiryMonth = values.get('card_month');
  const cardExpiryYear = values.get('card_year');
  const cardCVC = values.get('card_cvc');
  const cardZipcode = values.get('card_zip');
  const cvvLength = (!cardNumber) ? 3 : (getCardType(cardNumber) === 'amex' ? 4 : 3);

  if (!cardNumber) {
    errors.card_number = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}$/i.test(values.get('card_number'))) {
    errors.card_number = props.cqContent.error.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_INVALID_CARD_ERROR;
  }

  if (!cardExpiryMonth) {
    errors.card_month = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (validateCreditCardMonth(cardExpiryMonth, cardExpiryYear) === false) {
    errors.card_month = props.cqContent.error.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_INVALID_EXPIRATION_MONTH_ERROR;
  }
  //
  if (!cardExpiryYear) {
    errors.card_year = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (validateCardExpiryYear(cardExpiryYear) === false) {
    errors.card_year = props.cqContent.error.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_INVALID_EXPIRATION_YEAR_ERROR;
  }
  //
  if (!cardCVC) {
    errors.card_cvc = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/i.test(cardCVC) || cardCVC.toString().length < cvvLength || cardCVC.toString().length > cvvLength) {
    errors.card_cvc = props.cqContent.error.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_INVALID_CVC_ERROR;
  }
  //
  if (!cardZipcode) {
    errors.card_zip = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^\d{5}-\d{4}$|^\d{5}$/.test(cardZipcode)) {
    errors.card_zip = props.cqContent.error.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_INVALID_ZIPCODE_ERROR;
  } else if (cardZipcode.toString().trim() !== props.zipcode.toString()) {
    /* Uncommented for CIS-15815 */
    errors.card_zip = props.cqContent.error.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_ZIPCODE_NOT_SAME_AS_BILLING_ERROR;
  }


  return errors;
};

// eslint-disable-next-line react/prop-types
const renderField = ({
  input: { value, ...input }, label, meta: { active, touched, error }, textFieldValue, ...custom
}) => {
  const displayLabel = (typeof error === 'string' && error.length > 0) ? 'none' : 'block';

  return (<TextField
    hintText={label}
    underlineFocusStyle={styles.underlineFocusStyle}
    floatingLabelFocusStyle={Object.assign({}, styles.floatingLabelFocusStyle, { display: 'none' })}
    floatingLabelShrinkStyle={Object.assign({}, { transform: 'scale(0.8) translate(0px, 36px)' }, { display: displayLabel })}
    style={{ width: '100%', float: 'left' }}
    floatingLabelText={label}
    errorStyle={styles.errorStyle}
    errorText={!active && touched && error}
    value={(typeof textFieldValue === 'string') ? textFieldValue : value}
    {...input}
    {...custom}
    defaultValue={custom.defaultValue}
  />);
};
renderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  textFieldValue: PropTypes.any,
};

// eslint-disable-next-line react/prop-types,no-unused-vars
const renderDropdown = ({
  input, label, type, meta: { touched, error }, ...custom
}) => {
  const { options, ...rest } = custom;
  return (
    <div className="selectpicker">
      <select
        {...input}
        {...rest}
        style={{
          width: '100%', border: 'none', bottom: '10px', position: 'absolute', padding: 0,
        }}
      >
        <option value="0">{label}</option>
        {options.map((optionLabel, id) => (<option key={id} value={optionLabel}>{optionLabel}</option>))}
      </select>
      {touched && error &&
        <div
          style={{
            position: 'relative', bottom: '15px', fontSize: '12px', lineHeight: '12px', color: 'rgb(244, 67, 54)', transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', textAlign: 'left', top: '65px',
          }}
        >{error}
        </div>}
    </div>
  );
};
renderDropdown.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  textFieldValue: PropTypes.any,
  type: PropTypes.any,
};
const getCardType = (cardNumber) => {
  let cardType = null;
  const cardTypeRegEx = [
    {
      expression: /^4[0-9]{12}(?:[0-9]{3})?$/,
      type: 'visa',
    },
    {
      expression: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
      type: 'mastercard',
    },
    {
      expression: /^3[47][0-9]{13}$/,
      type: 'amex',
    },
    {
      expression: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      type: 'dinersclub',
    },
    {
      expression: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      type: 'discover',
    },
    {
      expression: /^(?:2131|1800|35\d{3})\d{11}/,
      type: 'jcb',
    },
    {
      expression: /(^(2014)|^(2149))\d{11}$/,
      type: 'enroute',
    },
  ];

  cardTypeRegEx.forEach((regex) => {
    const re = new RegExp(regex.expression);
    if (re.test(cardNumber.toString()) === true) {
      cardType = regex.type;
      return true;
    }
    return false;
  });

  return cardType;
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
    this.onSubmit = this.onSubmit.bind(this);
    this.cardinalInit = window.cardinalInit || false;
  }

  // material-ui specific method
  getChildContext() {
    const muitheme = getMuiTheme(baseTheme);
    muitheme.textField.borderColor = 'rgba(0, 0, 0, 0.298039)';
    return { muiTheme: muitheme };
  }

  componentDidMount() {
    if (window.siteId) {
      this.props.fetchCyberSourceData(this.props.orderId);
    }
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
    const normalizedValue = allowOnlyNumbers(e.target.value);
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

  onSubmit(event) {
    event.preventDefault();
    let cardType = '';
    const month = this.refs.card_month.value;
    const year = this.refs.card_year.value;
    const expiryDate = month + '-' + year;
    const { selectedShippingInfo } = this.props;
    const { firstName, lastName } = selectedShippingInfo;
    this.refs.card_expiry.value = expiryDate;
    this.refs.firstName.value = firstName;
    this.refs.lastName.value = lastName;
    const cardName = getCardType(this.refs.card_number.value);
    if (cardName === 'visa') {
      cardType = '001';
    } else if (cardName === 'mastercard') {
      cardType = '002';
    } else if (cardName === 'amex') {
      cardType = '003';
    } else if (cardName === 'discover') {
      cardType = '004';
    }
    this.refs.card_type.value = cardType;
    if (this.props.valid) {
      this.refs.form.submit();
    }
  }

  render() {
    const {
      handleSubmit, valid, submitting, addNewCard, paymentRequired, expirationMonths, expirationYears, isFetching, cvvLength, cqContent, pieEnabled, paymentFlow, giftCardFlow, showLoaderMessage, cyberSourceData, preselectedCard,
    } = this.props;
    const addPaymentMethodForm = this;
    let backRoute = '/choosePaymentMethod';
    if (paymentFlow === 'giftCard') {
      backRoute = '/choosePaymentMethod/giftCard';
    } else if (paymentFlow === 'newGiftCard') {
      backRoute = '/';
    }
    let siteLoaded;

    if (window.siteId) {
      siteLoaded = false;
    } else {
      siteLoaded = true;
    }
    return (

      <div className="pad12 onlyTopPad">
        {isFetching === true && <Loader />}
        <BackButton to={backRoute}>{cqContent.label.OD_CHECKOUT_BACK_TEXT}</BackButton>
        { siteLoaded ?
          <section className="pad20">
            <div className="clearfix">
              {this.props.pastDuePaymentRequired &&
                <h6
                  className="textAlignCenter color_red"
                >{cqContent.label.OD_CHECKOUT_PAST_DUE_PAYMENT_DESCRIPTION_TEXT}{this.props.pastDueAmount}
                </h6>}
              <Title className="h2 textAlignCenter" >{cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_EDIT_PAYMENT_METHOD_TITLE_TEXT}</Title>
            </div>
            <div className="section group pad6 onlyTopPad">
              <p className="textAlignCenter">
                {cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_DESCRIPTION_TEXT}
              </p>
            </div>

            <div className="margin10 onlyTopMargin clearfix">
              
            </div>

          </section>

          :
          <section className="pad20">
            <div className="clearfix">
              {this.props.pastDuePaymentRequired &&
                <h6
                  className="textAlignCenter color_red"
                >{cqContent.label.OD_CHECKOUT_PAST_DUE_PAYMENT_DESCRIPTION_TEXT}{this.props.pastDueAmount}
                </h6>}
              <Title className="h2 textAlignCenter" >{cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_EDIT_PAYMENT_METHOD_TITLE_TEXT}</Title>
            </div>
            <div className="section group pad6 onlyTopPad">
              <div className="col span_5_of_5 fontSize_2 pad24 onlySidePad textAlignCenter">
                {cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_DESCRIPTION_TEXT}
                {this.props.cybersourecPreAuthFailure &&
              <div>{this.props.cybersourecPreAuthFailureErrorMessage}</div>
                }
              </div>
            </div>
            <div className="margin10 onlyTopMargin clearfix">
              <form method="post" onSubmit={this.onSubmit} ref="form" action={this.props.cyberSourceData ? this.props.cyberSourceData.httpPostUrl : ''}>
                <div className="clearfix">
                  <Field
                    errorText={this.state.card_error}
                    className="leftAlign width100 fontSize_4"
                    aria-label="Credit or Debit Card Number"
                    name="card_number"
                    id="card_number"
                    ref="card_number"
                    value={preselectedCard ? preselectedCard.creditCardNumber : this.state.masked_card_number}
                    component={renderField}
                    type="text"
                    label={cqContent.label.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_CARD_NUMBER_TEXT}
                    maxLength="16"

                    onFocus={this.onCardFocus}
                    onBlur={this.onCardBlur}
                    onChange={this.onCardChange}
                    autoFocus
                    pattern="[0-9]*"

                  />
                </div>

                <div className="clearfix">
                  <div className="col span_7_of_12">
                    <div className="col span_5_of_12">
                      <div
                        style={{
                          backgroundColor: 'transparent', fontSize: '16px', width: '100%', height: '72px', display: 'inline-block', position: 'relative', lineHeight: '24px', fontFamily: 'Roboto, sans-serif', transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', cursor: 'auto', float: 'left',
                        }}
                      >
                        <Field
                          className="leftAlign fontSize_4 color_000"
                          aria-label="Expiry Month"
                          disabled={false}
                          label={cqContent.label.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_EXPIRATION_MONTH_TEXT}
                          name="card_month"
                          id="card_month"
                          options={expirationMonths}
                          component={renderDropdown}
                          ref="card_month"

                        />
                        <hr
                          style={{
                            bottom: '8px', borderTop: 'none rgba(0, 0, 0, 0.298039)', borderRight: 'none rgba(0, 0, 0, 0.298039)', borderBottom: '1px solid rgba(0, 0, 0, 0.298039)', borderLeft: 'none', boxSizing: 'content-box', margin: '0px', position: 'absolute', width: '100%',
                          }}
                        />
                      </div>
                    </div>
                    <div className="col span_6_of_12 floatRight">
                      <div
                        style={{
                          backgroundColor: 'transparent', fontSize: '16px', width: '100%', height: '72px', display: 'inline-block', position: 'relative', lineHeight: '24px', fontFamily: 'Roboto, sans-serif', transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', cursor: 'auto', float: 'left',
                        }}
                      >
                        <Field
                          className="leftAlign fontSize_4 color_000"
                          aria-label="Expiry Year"
                          disabled={false}
                          name="card_year"
                          id="card_year"
                          options={expirationYears}
                          component={renderDropdown}
                          ref="card_year"
                        />
                        <hr
                          style={{
                            bottom: '8px', borderTop: 'none rgba(0, 0, 0, 0.298039)', borderRight: 'none rgba(0, 0, 0, 0.298039)', borderBottom: '1px solid rgba(0, 0, 0, 0.298039)', borderLeft: 'none', boxSizing: 'content-box', margin: '0px', position: 'absolute', width: '100%',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col span_4_of_12 floatRight">
                    <Field
                      className="leftAlign fontSize_4"
                      style={{ height: '74px', width: '100%' }}
                      aria-label="CVV Number"
                      name="card_cvn"
                      id="card_cvc"
                      component={renderField}
                      type="password"
                      label={cqContent.label.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_CVC_TEXT}
                      maxLength={cvvLength}
                    />
                  </div>
                </div>

                <div className="clearfix">
                  <Field
                    className="leftAlign width100 fontSize_4"
                    aria-label="Card Zip Code"
                    name="card_zip"
                    id="card_zip"
                    component={renderField}
                    type="text"
                    label={cqContent.label.OD_CHECKOUT_ADD_NEW_PAYMENT_METHOD_ZIPCODE_TEXT}
                    normalize={normalizeZipCode}
                    maxLength="10"
                  />
                  { cyberSourceData &&
                  Object.keys(cyberSourceData.dataMap).map((key) =>
                    <input type="hidden" name={key} value={cyberSourceData.dataMap[key]} />)
                  }
                </div>
                <div className="textAlignCenter footerContent width100 margin30 onlyTopMargin">
                  {paymentRequired === false ?
                    <Link
                      to={backRoute}
                      className="secondary button large margin18 onlyRightMargin"
                    >{cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_EDIT_PAYMENT_METHOD_CANCEL_TEXT}
                    </Link> :
                    <a
                      onClick={this.onCancelClick}
                      className="secondary button large margin18 onlyRightMargin"
                    >{cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_EDIT_PAYMENT_METHOD_CANCEL_TEXT}
                    </a>}
                  <input type="hidden" name="card_expiry_date" ref="card_expiry" />
                  <input type="hidden" name="firstName" ref="firstName" />
                  <input type="hidden" name="lastName" ref="lastName" />
                  <input type="hidden" name="card_type" ref="card_type" />
                  <button type="submit" className="primary button large"> Continue </button>
                </div>
              </form>
            </div>
          </section>
        }
        <div className="col span_5_of_5 fontSize_2 pad12 onlyBottomPad textAlignCenter">
          {cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_USER_INFO_TEXT}
        </div>

        {siteLoaded && <footer className="textAlignCenter footerContent width100">
          <div className="clearfix">
            {paymentRequired === false ?
              <Link
                to={backRoute}
                className="secondary button large margin18 onlyRightMargin"
              >{cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_EDIT_PAYMENT_METHOD_CANCEL_TEXT}
              </Link> :
              <a
                onClick={this.onCancelClick}
                className="secondary button large margin18 onlyRightMargin"
              >{cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_EDIT_PAYMENT_METHOD_CANCEL_TEXT}
              </a>}
            <button
              className="primary button large"
              type="submit"
              disabled={!valid || submitting}
              analyticstrack="submit-new-credit-card"
              onClick={
                handleSubmit((data) => {
                  this.handleAddNewCard(Object.assign({}, data.toJS(), { cardType: getCardType(data.get('card_number')) }), addPaymentMethodForm, this.props.pastDuePaymentRequired, pieEnabled, giftCardFlow, this.cardinalInit);// dispatches add new card action
                })
              }
            >{this.props.pastDuePaymentRequired ? 'Process Payment' : 'Continue'}
            </button>
          </div>
        </footer>
        }
      </div>
    );
  }
}

AddPaymentMethod.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};
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
  fetchCyberSourceData: PropTypes.func,
  cyberSourceData: PropTypes.object,
  cybersourecPreAuthFailure: PropTypes.object,
  cybersourecPreAuthFailureErrorMessage: PropTypes.object,
  authInfo: PropTypes.object,
  asyncFetchFalied: PropTypes.func,
  showLoaderMessage: PropTypes.bool,
  preselectedCard: PropTypes.object,
  orderId: PropTypes.any,
};

AddPaymentMethod = reduxForm({
  form: 'addPaymentForm',
  validate,
})(AddPaymentMethod);


const selector = formValueSelector('addPaymentForm');

AddPaymentMethod = connect((state, ownProps) => {
  const cardNumber = selector(state, 'card_number');
  let cardDetails = {};
  const cardData = ownProps.preselectedCard;
  const cvvLength = (!cardNumber) ? 3 : (getCardType(cardNumber) === 'amex' ? 4 : 3);
  // eslint-disable-next-line no-nested-ternary
  if (cardData) {
    const cardnumbered = cardData.creditCardNumber;
    const cardMonth = cardData.creditCardExpMonth;
    const cardYear = cardData.creditCardExpYear;
    const cardZip = cardData.billingZipCode ? cardData.billingZipCode : null;
    cardDetails = {
      card_number: cardnumbered,
      card_year: cardYear,
      card_month: cardMonth,
      card_zip: cardZip,
    };
  }
  return {
    cvvLength,
    initialValues: cardDetails,
  };
})(AddPaymentMethod);

export default AddPaymentMethod;
