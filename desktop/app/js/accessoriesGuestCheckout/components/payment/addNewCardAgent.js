import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { Row, Col } from 'react-flexbox-grid';
import MSelect from '../../../common/Select/index';
import { renderTextField } from '../../../common/TextField/';
import * as validation from '../../../common/validation';
import NortonSeal from '../../../../images/norton_secure_seal.svg';
import CVV from '../../../../images/cvv.svg';

/* eslint-disable react/no-string-refs, no-class-assign */
const validate = (values, props) => {
  const errors = {};
  const cardNumber = values.get('card_number');
  const cardExpiryMonth = values.get('card_month');
  const cardExpiryYear = values.get('card_year');
  const cardCVC = values.get('card_cvc');
  const cvvLength = cardNumber && validation.getCardType(cardNumber) === 'amex' ? 4 : 3;

  if (!cardNumber) {
    errors.card_number = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidCreditCardNumber(cardNumber)) {
    errors.card_number = props.cqContent.error.DT_OD_CHECKOUT_PAYMENT_INVALID_CARD_ERROR;
  }

  if (!cardExpiryMonth) {
    errors.card_month = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidCreditCardMonth(cardExpiryMonth, cardExpiryYear)) {
    errors.card_month = props.cqContent.error.DT_OD_CHECKOUT_PAYMENT_INVALID_EXPIRATION_MONTH_ERROR;
  }

  if (!cardExpiryYear) {
    errors.card_year = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidCreditCardExpiryYear(cardExpiryYear)) {
    errors.card_year = props.cqContent.error.DT_OD_CHECKOUT_PAYMENT_INVALID_EXPIRATION_YEAR_ERROR;
  }

  if (!cardCVC) {
    errors.card_cvc = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidCreditCardCVC(cardCVC, cvvLength)) {
    errors.card_cvc = props.cqContent.error.DT_OD_CHECKOUT_PAYMENT_INVALID_CVC_ERROR;
  }

  return errors;
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
    if (cardNumber && re.test(cardNumber.toString()) === true) {
      cardType = regex.type;
      return true;
    }
    return false;
  });

  return cardType;
};
class AddNewCardAgentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card_number: '',
      masked_card_number: '',
      card_error: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCardBlur = this.onCardBlur.bind(this);
  }
  onCardBlur(e) {
    const str = e.target.value;
    this.setState({
      // new_masked_card_number: maskedValue,
      card_number: str,
    });
    this.refs.card_number.value = '**************';
    document.getElementById('card_number').value = null;
  }
  onSubmit(event) {
    event.preventDefault();
    const ConvertedJSON = {};
    let cardType = '';
    const cardName = getCardType(this.props.card_number);
    if (cardName === 'visa') {
      cardType = '001';
    } else if (cardName === 'mastercard') {
      cardType = '002';
    } else if (cardName === 'amex') {
      cardType = '003';
    } else if (cardName === 'discover') {
      cardType = '004';
    }
    const month = this.props.card_month;
    const year = this.props.card_year;
    const expiryDate = month + '-' + year;
    const firstName = this.props.billingInfo.billingAddress.firstName;
    const lastName = this.props.billingInfo.billingAddress.lastName;
    this.refs.card_expiry.value = expiryDate;
    this.refs.firstName.value = firstName;
    this.refs.lastName.value = lastName;
    this.refs.card_type.value = cardType;
    this.refs.card_number.value = this.props.card_number;
    this.refs.card_month.value = this.props.card_month;
    this.refs.card_year.value = this.props.card_year;
    this.refs.card_cvn.value = this.props.card_cvc;
    this.refs.card_zip.value = this.props.billingInfo.billingAddress.zipcode;
    const data = new FormData(event.target);
    for (const [key, value] of data.entries()) {
      ConvertedJSON[key] = value;
    }
    if (this.props.valid) {
      this.refs.form.submit();
    }
  }

  render() {
    const { cqContent, billingInfo, cvvLength } = this.props;
    const cardNumberActive = this.props.newCardForm.active === 'card_number';
    const onCardFocus = () => { this.props.change('card_number', ''); };
    const cyberSourceData = this.props.cyberSourceData ? this.props.cyberSourceData : '';
    return (
      <div className="margin12 onlySideMargin">
        <div className="agentComm">
          <Row>
            <Col xs={8} className="clearfix">
              <Field
                className=""
                component={renderTextField}
                id="card_number"
                name="card_number"
                normalize={validation.allowOnlyNumbers}
                label={cqContent.label.DT_OD_CHECKOUT_PAYMENT_CARD_NUMBER}
                aria-label={cqContent.label.DT_OD_CHECKOUT_PAYMENT_CARD_NUMBER}
                type={cardNumberActive ? 'text' : 'password'}
                onFocus={onCardFocus}
                maxLength="16"
                pattern="[0-9]*"
                required
                ref="card_number"
                onBlur={this.onCardBlur}
                value={this.state.card_number}
              />
            </Col>
            <Col xs={4} className="clearfix">
              <img className="height72 margin18 onlyTopMargin" src={NortonSeal} alt="Norton Secured" />
            </Col>
          </Row>
          <Row className="margin18 noSideMargin">
            <Col xs={4} className="clearfix" >
              <MSelect
                name="card_month"
                id="card_month"
                label={cqContent.label.DT_OD_CHECKOUT_PAYMENT_CARD_EXPIRATION_MONTH}
                borderStyle
                required
              >
                <option disabled value="" />
                {billingInfo.expirationMonths.map((month) => (<option key={`month-${month}`} value={month}>{month}</option>))}
              </MSelect>
            </Col>
            <Col xs={4}>
              <MSelect
                name="card_year"
                id="card_year"
                label={cqContent.label.DT_OD_CHECKOUT_PAYMENT_CARD_EXPIRATION_YEAR}
                borderStyle
                required
                ref="card_year"
              >
                <option disabled value="" />
                {billingInfo.expirationYears.map((year) => (<option key={`year-${year}`} value={year}>{year}</option>))}
              </MSelect>
            </Col>
            <Col xs={4} className="clearfix">
              <Field
                className=""
                component={renderTextField}
                id="card_cvc"
                name="card_cvc"
                normalize={validation.allowOnlyNumbers}
                maxLength={cvvLength}
                label={cqContent.label.DT_OD_CHECKOUT_PAYMENT_CARD_CVV}
                type="password"
                required
                ref="card_cvc"
                tooltip={
                  <div>
                    <p className="margin12 onlyBottomMargin">{cqContent.label.DT_OD_CHECKOUT_PAYMENT_CARD_CVV_TOOLTIP}</p>
                    <img src={CVV} alt="CVV location" />
                  </div>
                }
              />
            </Col>
          </Row>
          <div>
            <p>{cqContent.label.DT_OD_CHECKOUT_PAYMENT_CREDIT_CARD_ZIP_CODE_LABEL}</p>
            <p className="margin18">{billingInfo.billingAddress.zipcode}</p>
          </div>
          <div>
            <form method="post" ref="form" onSubmit={this.onSubmit} action={this.props.cyberSourceData ? this.props.cyberSourceData.httpPostUrl : ''} >
              { cyberSourceData && Object.keys(cyberSourceData.dataMap).map((key) =>
                <input type="hidden" name={key} value={cyberSourceData.dataMap[key]} />)
              }
              <input type="hidden" name="card_number" ref="card_number" />
              <input type="hidden" name="card_month" ref="card_month" />
              <input type="hidden" name="card_year" ref="card_year" />
              <input type="hidden" name="card_cvn" ref="card_cvn" />
              <input type="hidden" name="card_zip" ref="card_zip" />
              <input type="hidden" name="card_expiry_date" ref="card_expiry" />
              <input type="hidden" name="firstName" ref="firstName" />
              <input type="hidden" name="lastName" ref="lastName" />
              <input type="hidden" name="card_type" ref="card_type" />
              <button
                className="fontSize_3 link background_transparent displayInlineBlock margin15 borderSize_0"
                onClick={this.props.onCancel}
              >
              Cancel
              </button>
              <button
                className={this.props.valid ? 'primary button large ' : 'primary button large disabled'}
                type={!this.props.valid ? 'button' : 'submit'}
              >
                Validate
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
AddNewCardAgentForm.propTypes = {
  cqContent: PropTypes.object,
  billingInfo: PropTypes.object,
  cvvLength: PropTypes.number,
  newCardForm: PropTypes.object,
  onCancel: PropTypes.func,
  card_number: PropTypes.any,
  card_month: PropTypes.any,
  card_year: PropTypes.any,
  card_cvc: PropTypes.number,
  valid: PropTypes.bool,
  cyberSourceData: PropTypes.any,
  change: PropTypes.func,
};

AddNewCardAgentForm = reduxForm({
  form: 'addNewCard',
  destroyOnUnmount: false,
  validate,
})(AddNewCardAgentForm);

const selector = formValueSelector('addNewCard'); // Create the selector

AddNewCardAgentForm = (connect((state, ownProps) => {
  const forms = state.get('form').toJS();
  const cardNumber = selector(state, 'card_number');
  const cyberSourceData = ownProps.cyberSourceData;
  let cardDetails = {};
  const cardData = ownProps.preselectedCard;
  const cvvLength = (cardNumber && getCardType(cardNumber) === 'amex') ? 4 : 3;
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
    newCardForm: forms.addNewCard ? forms.addNewCard : {},
    cyberSourceData,
    initialValues: cardDetails,
    card_number: selector(state, 'card_number'),
    card_cvc: selector(state, 'card_cvc'),
    card_month: selector(state, 'card_month'),
    card_year: selector(state, 'card_year'),
  };
})(AddNewCardAgentForm));

export default AddNewCardAgentForm;
