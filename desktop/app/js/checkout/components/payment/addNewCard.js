import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { Row, Col } from 'react-flexbox-grid';

import MSelect from '../../../common/Select/index';
import { renderTextField } from '../../../common/TextField/';
import * as validation from '../../../common/validation';
import NortonSeal from '../../../../images/norton_secure_seal.svg';
import CVV from '../../../../images/cvv.svg';

const selector = formValueSelector('addNewCard');

const validate = (values, props) => {
  const cardNumber = values.get('card_number');
  const cardExpiryMonth = values.get('card_month');
  const cardExpiryYear = values.get('card_year');
  const cardCVC = values.get('card_cvc');
  const cvvLength = cardNumber && validation.getCardType(cardNumber) === 'amex' ? 4 : 3;
  const card_zip = values.get('card_zip');
  const errors = {};

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

  if (!card_zip) {
    errors.card_zip = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidZipCode(card_zip)) {
    errors.card_zip = props.cqContent.error.DT_OD_CHECKOUT_PAYMENT_INVALID_ZIPCODE_ERROR;
  }
  return errors;
};

const AddNewCardForm = (props) => {
  const { cqContent, billingInfo, cvvLength, checkoutStates } = props;
  const cardNumberActive = props.newCardForm.active === 'card_number';
  const onCardFocus = () => { props.change('card_number', ''); };
  return (
    <div className="margin12 onlySideMargin">
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
          />
        </Col>
        <Col xs={4} className="clearfix">
          <img className="height72 margin18 onlyTopMargin" src={NortonSeal} alt="Norton Secured" />
        </Col>
      </Row>
      <Row className="margin36 noSideMargin">
        <Col xs={4} className="clearfix">
          <MSelect
            name="card_month"
            id="card_month"
            label={cqContent.label.DT_OD_CHECKOUT_PAYMENT_CARD_EXPIRATION_DATE}
            aria-label={cqContent.label.DT_OD_CHECKOUT_PAYMENT_CARD_EXPIRATION_MONTH}
            errorStyle={{
              width: 'calc(200% + 16px)',
            }}
            borderStyle
            required
          >
            <option disabled value="">{cqContent.label.DT_OD_CHECKOUT_PAYMENT_CARD_EXPIRATION_MONTH}</option>
            {billingInfo.expirationMonths.map((month) => (<option key={`month-${month}`} value={month}>{month}</option>))}
          </MSelect>
        </Col>
        <Col xs={4} style={{ marginTop: 22 }}>
          <MSelect
            name="card_year"
            id="card_year"
            aria-label={cqContent.label.DT_OD_CHECKOUT_PAYMENT_CARD_EXPIRATION_YEAR}
            errorStyle={{
              left: 'calc(-100 % - 16px)',
              width: 'calc(200 % + 16px)',
            }}
            borderStyle
            required
          >
            <option disabled value="">{cqContent.label.DT_OD_CHECKOUT_PAYMENT_CARD_EXPIRATION_YEAR}</option>
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
            tooltip={`<div><p>${cqContent.label.DT_OD_CHECKOUT_PAYMENT_CARD_CVV_TOOLTIP}</p><img src=${CVV} alt="CVV location" /></div>`}
          />
        </Col>
      </Row>
      <Row className="margin18 noSideMargin">
        <Col xs={6} style={{ marginTop: 16 }} className="clearfix">
          <Field
            className=""
            component={renderTextField}
            id="card_zip"
            name="card_zip"
            label={cqContent.label.DT_OD_CHECKOUT_PAYMENT_CREDIT_CARD_ZIP_CODE_LABEL}
            type="text"
            tooltip={!checkoutStates.creditCardZipEditable && `<p>${cqContent.label.DT_OD_CHECKOUT_PAYMENT_CREDIT_CARD_ZIP_CODE_TOOLTIP}</p>`}
            disabled={!checkoutStates.creditCardZipEditable}
          />
        </Col>
      </Row>
    </div >
  );
};
AddNewCardForm.propTypes = {
  cqContent: PropTypes.object,
  billingInfo: PropTypes.object,
  cvvLength: PropTypes.number,
  newCardForm: PropTypes.object,
  checkoutStates: PropTypes.object,
};

export default reduxForm({
  form: 'addNewCard',
  destroyOnUnmount: false,
  validate,
})(connect((state) => {
  const forms = state.get('form').toJS();
  const cardNumber = selector(state, 'card_number');
  const cvvLength = cardNumber && validation.getCardType(cardNumber) === 'amex' ? 4 : 3;
  return {
    cvvLength,
    newCardForm: forms.addNewCard ? forms.addNewCard : {},
  };
})(AddNewCardForm));
