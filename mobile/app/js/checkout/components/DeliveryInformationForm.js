/* eslint-disable react/prop-types,no-unused-vars,no-useless-escape, jsx-a11y/no-noninteractive-element-interactions */
/**
 * Created by mambig on 1/3/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import { Grid, Row, Col } from 'react-flexbox-grid';
import { renderTextField } from '../../common/TextField';
import Button from '../../common/Button/Button';
import MSelect from './../../common/Select/';
import Checkbox from '../../common/Checkbox/index';


const isBusinessChecked = false;

const validate = (values, props) => {
  const errors = {};
  const businessAddressRadio = isBusinessChecked;
  const businessName = values.get('businessName');
  const firstName = values.get('firstName');
  const lastName = values.get('lastName');
  const shippingAddress = values.get('address1');
  const shippingAddress2 = values.get('address2');
  const state = values.get('state');
  const city = values.get('city');
  const zipCode = values.get('zipcode');
  const emailAddress = values.get('email');
  const telephoneNumber = values.get('phoneNumber');

  if (businessAddressRadio === true) {
    if (!businessName) {
      errors.businessName = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
    } else if (!/^[a-zA-Z\- ',\s]+$/i.test(businessName)) {
      errors.businessName = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_COMPANY_NAME_ERROR;
    }
  }

  if (!firstName) {
    errors.firstName = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(firstName)) {
    errors.firstName = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_FIRST_NAME_ERROR;
  }
  if (!lastName) {
    errors.lastName = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(lastName)) {
    errors.lastName = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_LAST_NAME_ERROR;
  }
  if (!shippingAddress) {
    errors.address1 = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z0-9\-\. ',#&;/\s]+$/i.test(shippingAddress)) {
    errors.address1 = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_SHIPPING_ADDRESS_PRIMARY_ERROR;
  }
  if (shippingAddress2 && !/^[a-zA-Z0-9\-\. ',#&;/\s]+$/i.test(shippingAddress2)) {
    errors.address2 = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_SHIPPING_ADDRESS_SECONDARY_ERROR;
  }
  if (!city) {
    errors.city = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(city)) {
    errors.city = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_STATE_ERROR;
  }
  if (!state) {
    errors.state = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(state)) {
    errors.state = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_STATE_ERROR;
  }
  if (!zipCode) {
    errors.zipcode = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^\d{5}-\d{4}$|^\d{5}$/i.test(zipCode)) {
    errors.zipcode = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_ZIPCODE_ERROR;
  }
  if (!emailAddress) {
    errors.email = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(emailAddress)) {
    errors.email = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_EMAIL_ERROR;
  }
  if (!telephoneNumber) {
    errors.phoneNumber = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/i.test(telephoneNumber)) {
    errors.phoneNumber = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_PHONE_NUMBER_ERROR;
  }
  return errors;
};

class DeliveryInformationForm extends Component {
  constructor(props) {
    super(props);

    // isBusinessChecked = props.initialValues.get('businessAddress');

    this.state = {
      isBusinessChecked: props.initialValues.get('businessAddress'),
    };
  }


  onFormClick() {
    const {
      cqContent, formEnabled, authEnabled, authUrl,
    } = this.props;

    if (authEnabled && !formEnabled && window.confirm(cqContent.label.OD_CHECKOUT_DELIVERY_METHOD_VERIFICATION_PROMPT)) {
      // TODO: error handling
      window.location = authUrl + '?referrer=' + encodeURIComponent(window.location.pathname + window.location.hash);
    } else if (!authEnabled) {
      this.props.notifySecurePinIneligible();
    }
  }
  setBusinessStatus = (e) => {
    // isBusinessChecked = !isBusinessChecked;
    this.setState({
      isBusinessChecked: e.target.checked,
    });
  }

  getAddress() {
    this.setState({ showAddress: !this.state.showAddress });
  }
  handleChange(event) {

  }

  render() {
    const {
      cqContent, handleSubmit, formEnabled, initialValues, valid, submitting, states, shippingAddressChangeRequired,
    } = this.props;
    return (
      <div>
        <form role="form" id="field" onSubmit={handleSubmit} onClick={this.onFormClick.bind(this)}>
          <Row className="noSideMargin onlySidePad">
            <Col xs={12} className="noSidePad pad12">
              <Checkbox
                className="checkbox"
                name="businessAddress"
                id="businessAddress"
                disabled={!formEnabled}
                onChange={(e) => this.setBusinessStatus(e)}
                checked={this.state.isBusinessChecked}
                aria-label={`${cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_BUSINESS_ADDRESS_LABEL_TEXT}`}
                aria-hidden
                analyticstrack="business-address"
              >
                <p id="labelId" aria-label={`${cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_BUSINESS_ADDRESS_LABEL_TEXT}`}>
                  {cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_BUSINESS_ADDRESS_LABEL_TEXT}
                </p>
              </Checkbox>
            </Col>
            {this.state.isBusinessChecked &&
              <Col xs={12} className="noSidePad pad12" >
                <Field
                  name="businessName"
                  id="businessName"
                  component={renderTextField}
                  type="text"
                  disabled={!formEnabled}
                  label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_COMPANY_NAME_TEXT}
                />
              </Col>}
            <Col xs={12} className="noSidePad pad12">
              <Field
                component={renderTextField}
                type="text"
                id="firstName"
                name="firstName"
                label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_FIRST_NAME_TEXT}
                disabled={!formEnabled}
              />
            </Col>
            <Col xs={12} className="noSidePad pad12">
              <Field
                component={renderTextField}
                type="text"
                id="lastName"
                name="lastName"
                label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_LAST_NAME_TEXT}
                disabled={!formEnabled}
              />
            </Col>
            <Col xs={12} className="noSidePad pad12">
              <Field
                component={renderTextField}
                type="text"
                id="address1"
                name="address1"
                label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_SHIPPING_ADDRESS_PRIMARY_TEXT}
                disabled={!formEnabled}
              />
            </Col>
            <Col xs={12} className="noSidePad pad12">
              <Field
                className="leftAlign width100 fontSize_4"
                component={renderTextField}
                type="text"
                id="address2"
                name="address2"
                label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_SHIPPING_ADDRESS_SECONDARY_TEXT}
                disabled={!formEnabled}
              />
            </Col>
            <Col xs={12} className="noSidePad pad12">
              <Field
                component={renderTextField}
                type="text"
                id="city"
                name="city"
                label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_CITY_TEXT}
                disabled={!formEnabled}
              />
            </Col>
            <Col xs={12} className="noSidePad pad12">
              <Row>
                <Col xs={6}>
                  <MSelect
                    name="state"
                    id="state"
                    label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_STATE_TEXT}
                    value="MD"
                    onChange={this.handleChange.bind(this)}
                    disabled={!formEnabled}
                    borderStyle
                    required
                    analyticstrack="choose-delivery-info"
                  >
                    {states.map((optionLabel, id) => (<option key={id} value={optionLabel}>{optionLabel}</option>))}
                  </MSelect>
                </Col>
                <Col xs={6}>
                  <Field
                    component={renderTextField}
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_ZIPCODE_TEXT}
                    disabled={!formEnabled}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={12} className="noSidePad pad12">
              <Field
                className="leftAlign width100 fontSize_4"
                component={renderTextField}
                type="text"
                id="email"
                name="email"
                label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_EMAIL_TEXT}
                disabled={!formEnabled}
              />
            </Col>
            <Col xs={12} className="noSidePad pad12">
              <Field
                className="leftAlign width100 fontSize_4"
                component={renderTextField}
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_PHONE_NUMBER_TEXT}
                disabled={!formEnabled}
              />
            </Col>
            <Col xs={12} className="noSidePad pad24 textAlignCenter">
              <Button
                className="primary button large"
                type="submit"
                disabled={!formEnabled || !valid || submitting}
                analyticstrack="submit-shipping-address"
              >{cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_BUTTON_TEXT}
              </Button>
            </Col>
          </Row>
        </form>
      </div>

    );
  }
}

DeliveryInformationForm.propTypes = {
  handleSubmit: PropTypes.func,
  cqContent: PropTypes.object,
  initialValues: PropTypes.object,
  authUrl: PropTypes.string,
};


export default reduxForm({
  form: 'deliveryInformationForm',
  validate,
})(DeliveryInformationForm);

