import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field } from 'redux-form/immutable';
import { renderTextField } from '../../../common/TextField/';
import MSelect from '../../../common/Select/index';
import Checkbox from '../../../common/Checkbox/index';

const ShippingAddressForm = (props) => {
  const { cqContent, isBuisnessAddress, states, change, billingAddress, checkoutStates, addressInfo } = props;

  const onCheckBoxClick = () => {
    if (!props.formValues.sameAsBilling) {
      change('address1', billingAddress.address1);
      change('address2', billingAddress.address2);
      change('businessName', billingAddress.businessName);
      change('city', billingAddress.city);
      change('companyName', billingAddress.companyName);
      change('state', billingAddress.state);
      change('zipcode', billingAddress.zipcode);
    }
  };
  const onFormClick = () => {
    if (props.formValues.sameAsBilling) {
      change('sameAsBilling', false);
    }
  };

  const showAllFields = (
    (props.formEnabled && (checkoutStates.poBoxShippingAddress || checkoutStates.shippingAddressValidationError || checkoutStates.batteryShippingNotAllowedStates)) ||
    (props.formEnabled && !checkoutStates.contactInfoRequired && !checkoutStates.shippingNameChangeRequired)
  );
  const showName = (
    showAllFields ||
    !checkoutStates.contactInfoRequired ||
    (checkoutStates.contactInfoRequired && checkoutStates.shippingNameChangeRequired)
  );
  const showAddress = (
    showAllFields ||
    (!checkoutStates.contactInfoRequired && !checkoutStates.shippingNameChangeRequired)
  );
  const showEmail = (
    showAllFields ||
    !checkoutStates.shippingNameChangeRequired ||
    (checkoutStates.contactInfoRequired && !addressInfo.email)
  );
  const showPhoneNumber = (
    showAllFields ||
    !checkoutStates.shippingNameChangeRequired ||
    (checkoutStates.contactInfoRequired && !addressInfo.phoneNumber)
  );

  return (
    <form // eslint-disable-line
      id="field"
      className="margin0"
    >
      <div className="clearfix">
        <div className="margin12 onlyBottomMargin">
          {showName &&
            <div>
              <Row className="margin12 onlyBottomMargin">
                <Col xs={6} onClick={onFormClick}>
                  <div className="positionRelative">
                    <MSelect
                      label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_WHERE_TO_SHIP}
                      name="shipToType"
                      id="shipToType"
                      borderStyle

                    >
                      <option value="residence">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SHIP_TO_RESIDENCE}</option>
                      <option value="business">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SHIP_TO_BILLING}</option>

                    </MSelect>
                  </div>
                </Col>
                <Col xs={6} onClick={onFormClick}>
                  <Field
                    component={renderTextField}
                    id="businessName"
                    name="businessName"
                    label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_COMPANY_NAME_TEXT}
                    type="text"
                    required={isBuisnessAddress}

                  />
                </Col>
              </Row>
              <Row className="margin12 noSideMargin">
                <Col xs={6}>
                  <Field
                    component={renderTextField}
                    id="firstName"
                    name="firstName"
                    label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_FIRST_NAME_TEXT}
                    type="text"
                    required
                  />
                </Col>
                <Col xs={6}>
                  <Field
                    component={renderTextField}
                    id="lastName"
                    name="lastName"
                    label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_LAST_NAME_TEXT}
                    type="text"
                    required
                  />
                </Col>
              </Row>
            </div>
          }
          {showAddress &&
            <div>
              <Row className="margin12 noSideMargin">
                <Col xs={6} onClick={onFormClick}>
                  <Field
                    component={renderTextField}
                    id="address1"
                    name="address1"
                    label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SHIPPING_ADDRESS_PRIMARY_TEXT}
                    type="text"
                    required

                  />
                </Col>
                <Col xs={6} onClick={onFormClick}>
                  <Field
                    component={renderTextField}
                    id="address2"
                    name="address2"
                    label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SHIPPING_ADDRESS_SECONDARY_TEXT}
                    type="text"

                  />
                </Col>
              </Row>
              <Row className="margin12 noSideMargin">
                <Col xs={6} onClick={onFormClick}>
                  <Field
                    component={renderTextField}
                    id="city"
                    name="city"
                    label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_CITY_TEXT}
                    type="text"
                    required

                  />
                </Col>

                <Col xs={3} onClick={onFormClick}>
                  <div
                    style={{ marginTop: 28 }}
                    className="positionRelative"
                  >
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
                <Col xs={3} onClick={onFormClick}>
                  <Field
                    component={renderTextField}
                    id="zipcode"
                    name="zipcode"
                    label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_ZIPCODE_TEXT}
                    type="text"
                    required

                  />
                </Col>
              </Row>
            </div>
          }

          {/* Email & Phone Number */}
          <Row>
            {showEmail &&
              <Col xs={6}>
                <Field
                  component={renderTextField}
                  id="email"
                  name="email"
                  label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_EMAIL_TEXT}
                  type="text"
                  required
                />
              </Col>
            }
            {showPhoneNumber &&
              <Col xs={6}>
                <Field
                  component={renderTextField}
                  id="phoneNumber"
                  name="phoneNumber"
                  label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_PHONE_NUMBER_TEXT}
                  type="text"
                  maxLength="10"
                  required
                />
              </Col>
            }
          </Row>
          {showAddress &&
            <Row className="margin24 noSideMargin">
              <Col xs={12}>
                <Checkbox
                  className="checkbox"
                  name="sameAsBilling"
                  id="sameAsBilling"
                  component="input"
                  type="checkbox"
                  labelClass="displayInlineBlock verticalCenter leftAlign pad12 onlyLeftPad"
                  aria-labelledby="sameAsBillingLabel"
                  tabIndex="-1"
                  aria-hidden
                  onClick={onCheckBoxClick}
                >
                  <p id="sameAsBillingLabel" > {cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SAME_BILLING} </p>
                </Checkbox>
              </Col>
            </Row>
          }
        </div>
      </div>
    </form>
  );
};

ShippingAddressForm.propTypes = {
  cqContent: PropTypes.object,
  isBuisnessAddress: PropTypes.bool,
  states: PropTypes.array,
  change: PropTypes.func,
  billingAddress: PropTypes.object,
  addressInfo: PropTypes.object,
  checkoutStates: PropTypes.object,
  // formValues: PropTypes.object,
  formEnabled: PropTypes.bool,
};

export default ShippingAddressForm;
