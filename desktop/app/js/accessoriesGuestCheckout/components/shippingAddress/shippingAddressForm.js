import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field } from 'redux-form/immutable';
import { renderTextField } from '../../../common/TextField/';
import MSelect from '../../../common/Select/index';
import { allowOnlyNumbers } from '../../../common/validation';

const ShippingAddressForm = (props) => {
  const { cqContent, isBuisnessAddress, states } = props;

  return (
    <form // eslint-disable-line
      id="field"
      className="margin0"
    >
      <div className="border_grayThree onlyBottomBorder pad12 onlyBottomPad">
        {/* Contact Information */}
        <div>
          <h3>{cqContent.label.DT_OD_CHECKOUT_SHIPPING_CONTACT_INFORMATION_TITLE} </h3>
          <Row>
            <Col xs={6}>
              <div className="margin12 noSideMargin">
                <Field
                  component={renderTextField}
                  id="firstName"
                  name="firstName"
                  label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_FIRST_NAME_TEXT}
                  type="text"
                  required
                />
              </div>
            </Col>
            <Col xs={6}>
              <div className="margin12 noSideMargin">
                <Field
                  component={renderTextField}
                  id="lastName"
                  name="lastName"
                  label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_LAST_NAME_TEXT}
                  type="text"
                  required
                />
              </div>
            </Col>
            <Col xs={6}>
              <div className="margin12 noSideMargin">
                <Field
                  component={renderTextField}
                  id="email"
                  name="email"
                  label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_EMAIL_TEXT}
                  type="text"
                  required
                />
              </div>
            </Col>
            <Col xs={6}>
              <div className="margin12 noSideMargin">
                <Field
                  component={renderTextField}
                  id="phoneNumber"
                  name="phoneNumber"
                  label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_PHONE_NUMBER_TEXT}
                  type="text"
                  maxLength="10"
                  normalize={allowOnlyNumbers}
                  required
                />
              </div>
            </Col>
          </Row>
        </div>
        {/* Shipping Address */}
        <div className="margin36 onlyTopMargin">
          <h3>{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SECTION_TITLE} </h3>
          <Row>
            <Col xs={6}>
              <div className="margin12 onlyBottomMargin">
                <MSelect
                  label={<span className="is-visuallyHidden">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_WHERE_TO_SHIP}</span>}
                  name="shipToType"
                  aria-label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_STATE_TEXT}
                  id="shipToType"
                  borderStyle
                >
                  <option value="residence">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SHIP_TO_RESIDENCE}</option>
                  <option value="business">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SHIP_TO_BILLING}</option>

                </MSelect>
              </div>
            </Col>
            <Col xs={6}>
              {isBuisnessAddress &&
                <div className="margin12 onlyBottomMargin">
                  <Field
                    component={renderTextField}
                    id="businessName"
                    name="businessName"
                    label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_COMPANY_NAME_TEXT}
                    type="text"
                    required={isBuisnessAddress}
                  />
                </div>
              }
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <div className="margin12 noSideMargin">
                <Field
                  component={renderTextField}
                  id="address1"
                  name="address1"
                  label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SHIPPING_ADDRESS_PRIMARY_TEXT}
                  type="text"
                  required
                  placeholder=""
                  placesAutocomplete
                  placesAutocompleteOnSelect={props.autocompleteOnSelect}
                  googleMapAPI={props.googleMapAPI}
                />
              </div>
            </Col>
            <Col xs={6}>
              <div className="margin12 noSideMargin">
                <Field
                  component={renderTextField}
                  id="address2"
                  name="address2"
                  label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SHIPPING_ADDRESS_SECONDARY_TEXT}
                  type="text"
                />
              </div>
            </Col>
            <Col xs={6}>
              <Field
                component={renderTextField}
                id="city"
                name="city"
                label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_CITY_TEXT}
                type="text"
                required
              />
            </Col>
            <Col xs={6}>
              <Row>
                <Col xs={6}>
                  <div style={{ marginTop: 28 }}>
                    <MSelect
                      label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_STATE_TEXT}
                      name="state"
                      aria-label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_STATE_TEXT}
                      id="state"
                      borderStyle
                      required
                    >
                      <option disabled value="" />
                      {states.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </MSelect>
                  </div>
                </Col>
                <Col xs={6}>
                  <Field
                    required
                    component={renderTextField}
                    id="zipcode"
                    name="zipcode"
                    label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_ZIPCODE_TEXT}
                    type="text"
                    onBlur={(evt) => {
                      props.fetchZipCodeInfo(evt.target.value, props.form);
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row >
        </div>
      </div >
    </form >
  );
};

ShippingAddressForm.propTypes = {
  cqContent: PropTypes.object,
  isBuisnessAddress: PropTypes.bool,
  states: PropTypes.array,
  autocompleteOnSelect: PropTypes.function,
  googleMapAPI: PropTypes.object,
  fetchZipCodeInfo: PropTypes.func,
  form: PropTypes.string,
};

export default ShippingAddressForm;
