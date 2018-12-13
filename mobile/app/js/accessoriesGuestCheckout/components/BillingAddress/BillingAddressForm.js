/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form/immutable';
import * as validation from '../../../common/validation';

import { renderTextField } from '../../../common/TextField/';
import MSelect from '../../../common/Select/index';
import Checkbox from '../../../common/Checkbox/index';

const validate = (values, props) => {
  const errors = {};
  const firstName = values.get('firstName');
  const lastName = values.get('lastName');
  const BillingAddress = values.get('address1');
  const BillingAddress2 = values.get('address2');
  const state = values.get('state');
  const city = values.get('city');
  const zipCode = values.get('zipcode');
  const emailAddress = values.get('email');
  const telephoneNumber = values.get('phoneNumber');

  if (!firstName) {
    errors.firstName = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidNameWithSpace(firstName)) {
    errors.firstName = props.cq.error.OD_CHECKOUT_Billing_ADDRESS_INVALID_FIRST_NAME_ERROR;
  }
  if (!lastName) {
    errors.lastName = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidNameWithSpace(lastName)) {
    errors.lastName = props.cq.error.OD_CHECKOUT_Billing_ADDRESS_INVALID_LAST_NAME_ERROR;
  }
  if (!BillingAddress) {
    errors.address1 = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidAddress(BillingAddress)) {
    errors.address1 = props.cq.error.OD_CHECKOUT_Billing_ADDRESS_INVALID_Billing_ADDRESS_PRIMARY_ERROR;
  }
  if (BillingAddress2 && !validation.isValidAddress(BillingAddress2)) {
    errors.address2 = props.cq.error.OD_CHECKOUT_Billing_ADDRESS_INVALID_Billing_ADDRESS_SECONDARY_ERROR;
  }
  if (!city) {
    errors.city = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidCity(city)) {
    errors.city = props.cq.error.OD_CHECKOUT_Billing_ADDRESS_INVALID_CITY_ERROR;
  }
  if (!state) {
    errors.state = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidName(state)) {
    errors.state = props.cq.error.OD_CHECKOUT_Billing_ADDRESS_INVALID_STATE_ERROR;
  }
  if (!zipCode) {
    errors.zipcode = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidZipCode(zipCode)) {
    errors.zipcode = props.cq.error.OD_CHECKOUT_Billing_ADDRESS_INVALID_ZIPCODE_ERROR;
  }
  if (!emailAddress) {
    errors.email = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidEmail(emailAddress)) {
    errors.email = props.cq.error.OD_CHECKOUT_Billing_ADDRESS_INVALID_EMAIL_ERROR;
  }
  if (!telephoneNumber) {
    errors.phoneNumber = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidPhoneNumber(telephoneNumber)) {
    errors.phoneNumber = props.cq.error.OD_CHECKOUT_Billing_ADDRESS_INVALID_PHONE_NUMBER_ERROR;
  }
  return errors;
};
class BillingAddressForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleBusinessAddressChange = (e) => {
    this.props.sameAsShippingAddress(e.target.checked)
  }

  autocompleteOnSelect = (address) => {
    const { change } = this.props;
    change('address1', address.route);
    change('city', address.locality);
    change('state', address.administrative_area_level_1);
    change('zipcode', address.postal_code);
  }

  render() {
    const { valid, submitting, handleSubmit } = this.props;
    return (
      <form
        id="field"
        className="margin0"
      >
        <Row className="noSideMargin pad24 onlySidePad">
          <Col xs={12} >
            <div>
              <Checkbox
                className="checkbox"
                name="shipToType"
                id="shipToType"
                component="input"
                type="checkbox"
                checkboxClass="displayInlineBlock"
                labelClass="displayInlineBlock verticalCenter"
                aria-labelledby="labelId"
                tabIndex="-1"
                aria-hidden
                checked={this.props.sameAsShipping}
                onChange={this.handleBusinessAddressChange.bind(this)}
                analyticstrack="same-as-shipping"
              >
                <p className="margin6 onlyLeftMargin" id="labelId" >
                  My billing address is same as shipping.
                </p>
              </Checkbox>
            </div>
          </Col>
        </Row>


        <Row className="noSideMargin pad24 onlySidePad">
          <Col xs={12} className="margin6 noSideMargin">
            <Field
              component={renderTextField}
              type="text"
              id="firstName"
              name="firstName"
              label={this.props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_FIRST_NAME_TEXT}
              readOnly={this.props.sameAsShipping}
            />
          </Col>
        </Row>
        <Row className="noSideMargin pad24 onlySidePad">
          <Col xs={12} className="margin6 noSideMargin">
            <Field
              component={renderTextField}
              type="text"
              id="lastName"
              name="lastName"
              label={this.props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_LAST_NAME_TEXT}
              readOnly={this.props.sameAsShipping}
            />
          </Col>
        </Row>
        <Row className="noSideMargin pad24 onlySidePad">
          <Col xs={12} className="margin6 noSideMargin">
            <Field
              component={renderTextField}
              type="text"
              id="address1"
              name="address1"
              label={this.props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_SHIPPING_ADDRESS_PRIMARY_TEXT}
              readOnly={this.props.sameAsShipping}
              placeholder=""
              placesAutocomplete
              placesAutocompleteOnSelect={this.autocompleteOnSelect}
              googleMapAPI={this.props.googleMapAPI}
            />
          </Col>
        </Row>
        <Row className="noSideMargin pad24 onlySidePad">
          <Col xs={12} className="margin6 noSideMargin">
            <Field
              component={renderTextField}
              type="text"
              id="address2"
              name="address2"
              label={this.props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_SHIPPING_ADDRESS_SECONDARY_TEXT}
              readOnly={this.props.sameAsShipping}
            />
          </Col>
        </Row>
        <Row className="noSideMargin pad24 onlySidePad">
          <Col xs={12} className="margin6 noSideMargin">
            <Field
              component={renderTextField}
              type="text"
              id="city"
              name="city"
              label={this.props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_CITY_TEXT}
              readOnly={this.props.sameAsShipping}
            />
          </Col>
        </Row>
        <Row className="noSideMargin pad24 onlySidePad">
          <Col xs={12} className="margin6 noSideMargin">
            <Row>
              <Col xs={6}>
                <MSelect
                  label={this.props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_STATE_TEXT}
                  name="state"
                  aria-label={this.props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_STATE_TEXT}
                  readOnly={this.props.sameAsShipping}
                  id="state"
                  borderStyle
                  required
                  analyticstrack="choose-billin-addr-state"
                >
                  {this.props.states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </MSelect>
              </Col>
              <Col xs={6}>
                <Field
                  component={renderTextField}
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  label={this.props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_ZIPCODE_TEXT}
                  readOnly={this.props.sameAsShipping}
                  onBlur={(evt) => {
                    this.props.fetchZipCodeInfo(evt.target.value, this.props.form);
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="noSideMargin pad24 onlySidePad">
          <Col xs={12} className="margin6 noSideMargin">
            <Field
              component={renderTextField}
              type="text"
              id="email"
              name="email"
              label={this.props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_EMAIL_TEXT}
              readOnly={this.props.sameAsShipping}
            />
          </Col>
        </Row>
        <Row className="noSideMargin pad24 onlySidePad">
          <Col xs={12} className="margin6 noSideMargin">
            <Field
              component={renderTextField}
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              label={this.props.cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_PHONE_NUMBER_TEXT}
              readOnly={this.props.sameAsShipping}
            />
          </Col>
        </Row>
        <Row className="noSideMargin pad24 textAlignCenter">
          <Col xs={12}>
            <button
              className="button primary large"
              type="submit"
              disabled={!valid || submitting}
              analyticstrack="submit-billing-address"
              onClick={
                handleSubmit((data) => {
                  this.props.handleSubmitBillingForm(Object.assign({}, data.toJS()));// dispatches add new card action
                })
              }
            >Next
            </button>
          </Col>
        </Row>
      </form>
    );
  }
}


BillingAddressForm.propTypes = {
  handleBusinessAddressChange: PropTypes.func,
  sameAsShipping: PropTypes.bool,
  cq: PropTypes.object,
  states: PropTypes.array,
  change: PropTypes.func,
  googleMapAPI: PropTypes.object,
  fetchZipCodeInfo: PropTypes.func,
  form: PropTypes.string,
};

BillingAddressForm.defaultProps = {
  sameAsShipping: true,
};

export default reduxForm({
  form: 'BillingAddress',
  validate,
  enableReinitialize: true
})(BillingAddressForm);
