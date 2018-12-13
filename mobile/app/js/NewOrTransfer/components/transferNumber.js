import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';

import BackButton from '../../common/BackButton/BackButton';
import { renderTextField } from '../../common/TextField';
import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';
import HorizontalRule from '../../common/HorizontalRule';
import MSelect from '../../common/Select';
import Checkbox from '../../common/Checkbox/index';


const validate = (values, props) => {
  const errors = {};
  const existingNumber = values.get('existingNumber');
  const accountHolderName = values.get('accountHolderName');
  const existingAccountNumber = values.get('existingAccountNumber');
  const shippingAddress = values.get('address1');
  const shippingAddress2 = values.get('address2');
  const state = values.get('state');
  const city = values.get('city');
  const zipCode = values.get('zipcode');
  const altContactNumber = values.get('altContactNumber');
  const customerAgreement = values.get('customerAgreement');

  if (!existingNumber) {
    errors.existingNumber = props.cqContent.label.OD_PORTIN_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/i.test(existingNumber)) {
    errors.existingNumber = props.cqContent.error.OD_PORTIN_INVALID_MOBILE_NUMBER;
  }
  if (!altContactNumber) {
    errors.altContactNumber = props.cqContent.label.OD_PORTIN_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/i.test(altContactNumber)) {
    errors.altContactNumber = props.cqContent.error.OD_PORTIN_INVALID_ALTERNATE_NUMBER;
  }
  if (!accountHolderName) {
    errors.accountHolderName = props.cqContent.label.OD_PORTIN_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(accountHolderName)) {
    errors.accountHolderName = props.cqContent.error.OD_PORTIN_INVALID_ACCOUNT_HOLDER_NAME;
  }

  if (!existingAccountNumber) {
    errors.existingAccountNumber = props.cqContent.label.OD_PORTIN_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^([0-9]){5,20}$/i.test(existingAccountNumber)) {
    errors.existingAccountNumber = props.cqContent.error.OD_PORTIN_INVALID_ACCOUNT_NUMBER;
  }

  if (!shippingAddress) {
    errors.address1 = props.cqContent.label.OD_PORTIN_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z0-9\-\. ',#&;/\s]+$/i.test(shippingAddress)) { // eslint-disable-line
    errors.address1 = props.cqContent.error.OD_PORTIN_INVALID_BILLING_ADDRESS;
  }
  if (shippingAddress2 && !/^[a-zA-Z0-9\-\. ',#&;/\s]+$/i.test(shippingAddress2)) { // eslint-disable-line
    errors.address2 = props.cqContent.error.OD_PORTIN_INVALID_BILLING_ADDRESS;
  }
  if (!city) {
    errors.city = props.cqContent.label.OD_PORTIN_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(city)) {
    errors.city = props.cqContent.error.OD_PORTIN_INVALID_CITY;
  }
  if (!state) {
    errors.state = props.cqContent.label.OD_PORTIN_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z]{2}$/i.test(state)) {
    errors.state = props.cqContent.error.OD_PORTIN_INVALID_STATE;
  }
  if (!zipCode) {
    errors.zipcode = props.cqContent.label.OD_PORTIN_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^\d{5}-\d{4}$|^\d{5}$/i.test(zipCode)) {
    errors.zipcode = props.cqContent.error.OD_PORTIN_INVALID_ZIP_CODE;
  }
  if (!customerAgreement) {
    errors.customerAgreement = 'props.cqContent.label.OD_PORTIN_FORM_FIELD_REQUIRED_TEXT';
  } else if (!/^\d{5}-\d{4}$|^\d{5}$/i.test(zipCode)) {
    errors.customerAgreement = 'props.cqContent.error.OD_PORTIN_INVALID_ZIP_CODE';
  }


  return errors;
};

class TransferNumberForm extends Component {
  constructor() {
    super();
    this.state = {
      selectedState: 'AK',
      customerChecked: false,
    };
    // this.onTransferSubmit = this.onTransferSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ selectedState: event.target.value });
  }
  render() {
    const {
      handleSubmit, valid, submitting, onTransferSubmit, cqContent, output, isFetching,
    } = this.props;
    const states = ['Select State', ...output.states];
    return (
      <Grid className="pad12 onlyTopPad">
        {isFetching && <Loader />}
        <Row>
          <BackButton />
        </Row>
        <Row className="pad24">
          <Col xs={12}>
            <Title>{cqContent.label.OD_PORTIN_NUMBERTRANSFER_TITLE}</Title>
            <HorizontalRule />

            <form>
              <Row>
                <Col xs={12} className="margin6 noSideMargin">
                  <Field
                    component={renderTextField}
                    type="text"
                    id="existingNumber"
                    name="existingNumber"
                    label={cqContent.label.OD_PORTIN_EXISTING_MOBILENUMBER}
                    tabIndex="-1"
                    autoFocus
                  />

                </Col>
              </Row>
              <Row >
                <Col xs={12} className="margin6 noSideMargin">
                  <Field
                    component={renderTextField}
                    type="text"
                    id="existingAccountNumber"
                    name="existingAccountNumber"
                    label={cqContent.label.OD_PORTIN_EXISTING_ACCOUNTNUMBER}
                    maxLength={20}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="margin6 noSideMargin">
                  <Field
                    component={renderTextField}
                    type="text"
                    id="accountPin"
                    name="accountPin"
                    label={cqContent.label.OD_PORTIN_ACCOUNT_PIN}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="margin6 noSideMargin">
                  <Field
                    component={renderTextField}
                    type="text"
                    id="accountHolderName"
                    name="accountHolderName"
                    label={cqContent.label.OD_PORTIN_ACCOUNT_HOLDER_NAME}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="margin6 noSideMargin">
                  <Field
                    component={renderTextField}
                    type="text"
                    id="altContactNumber"
                    name="altContactNumber"
                    label={cqContent.label.OD_PORTIN_CONTACT_PHONE_NUMBER}
                  />
                </Col>
              </Row>
              <Row >
                <Col xs={12} className="margin6 noSideMargin">
                  <Field
                    component={renderTextField}
                    type="text"
                    id="address1"
                    name="address1"
                    label={cqContent.label.OD_PORTIN_BILLING_ADDRESS_1}
                  />
                </Col>
              </Row>

              <Row >
                <Col xs={12} className="margin6 noSideMargin">
                  <Field
                    component={renderTextField}
                    type="text"
                    id="address2"
                    name="address2"
                    label={cqContent.label.OD_PORTIN_BILLING_ADDRESS_2}
                  />
                </Col>
              </Row>


              <Row >
                <Col xs={6} className="margin6 noSideMargin">
                  <MSelect
                    label="State"
                    name="state"
                    aria-label="State"
                    id="state"
                    borderStyle
                    required
                    analyticstrack="choose-transfer-number-state"
                  >
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </MSelect>
                </Col>
                <Col xs={6} className="margin6 noSideMargin">
                  <Field
                    component={renderTextField}
                    type="text"
                    id="city"
                    name="city"
                    label={cqContent.label.OD_PORTIN_CITY}
                  />

                </Col>
              </Row>
              <Row className="clearfix">
                <Col xs={12} className="margin6 noSideMargin">
                  <Field
                    component={renderTextField}
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    label={cqContent.label.OD_PORTIN_ZIPCODE}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="margin18 noSideMargin">
                  <Checkbox
                    className="checkbox"
                    id="customerAgreement"
                    name="customerAgreement"
                    component="input"
                    type="checkbox"
                    checkboxClass="displayInlineBlock"
                    labelClass="displayInlineBlock verticalCenter margin6 onlyLeftMargin leftAlign "
                    aria-labelledby="labelId"
                    tabIndex="-1"
                    aria-hidden
                    analyticstrack="trasfer-number-customer-agreement"
                  >
                    <p id="labelId" >
                      {cqContent.label.OD_PORTIN_REQUIRED_CHECKBOX}
                    </p>
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="margin6 noSideMargin textAlignCenter">
                  <button
                    className="primary button large"
                    type="submit"
                    disabled={!valid || submitting}
                    analyticstrack="submit-number-portin"
                    onClick={
                      handleSubmit((data) => {
                        onTransferSubmit(Object.assign({}, data.toJS()), output.transferSubmit);// dispatches add new card action
                      })
                    }
                  >{cqContent.label.OD_PORTIN_PROMPT_NEXT_CTA}
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
TransferNumberForm.propTypes = {
  handleSubmit: PropTypes.func,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  onTransferSubmit: PropTypes.func,
  cqContent: PropTypes.object,
  output: PropTypes.object,
  isFetching: PropTypes.bool,
};

export default reduxForm({
  form: 'transferNumForm',
  validate,
})(TransferNumberForm);
