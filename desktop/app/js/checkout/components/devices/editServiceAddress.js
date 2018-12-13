import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form/immutable';
import { renderTextField } from '../../../common/TextField/';
import MSelect from '../../../common/Select/index';
import Checkbox from '../../../common/Checkbox/index';
import * as validation from '../../../common/validation';
import ToolTip from '../../../common/ToolTip/index';
import { transformServiceAddress } from '../../helpers';


const validate = (values, props) => {
  const errors = {};

  const firstName = values.get('firstNameServAddress');
  const lastName = values.get('lastNameServAddress');
  const address = values.get('address1ServAddress');
  const address2 = values.get('address2ServAddress');
  const state = values.get('stateServAddress');
  const city = values.get('cityServAddress');
  const zipCode = values.get('zipcodeServAddress');
  const telephoneNumber = values.get('phoneNumberServAddress');


  // Validation for different Service Address
  if (!firstName) {
    errors.firstNameServAddress = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidNameWithSpace(firstName)) {
    errors.firstNameServAddress = props.cqContent.error.DT_OD_CHECKOUT_SERVICE_ADDRESS_INVALID_FIRST_NAME_ERROR;
  }
  if (!lastName) {
    errors.lastNameServAddress = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidNameWithSpace(lastName)) {
    errors.lastNameServAddress = props.cqContent.error.DT_OD_CHECKOUT_SERVICE_ADDRESS_INVALID_LAST_NAME_ERROR;
  }
  if (!address) {
    errors.address1ServAddress = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidAddress(address)) {
    errors.address1ServAddress = props.cqContent.error.DT_OD_CHECKOUT_SERVICE_ADDRESS_INVALID_SERVICE_ADDRESS_PRIMARY_ERROR;
  }
  if (address2 && !validation.isValidAddress(address2)) {
    errors.address2ServAddress = props.cqContent.error.DT_OD_CHECKOUT_SERVICE_ADDRESS_INVALID_SERVICE_ADDRESS_SECONDARY_ERROR;
  }
  if (!city) {
    errors.cityServAddress = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidCity(city)) {
    errors.cityServAddress = props.cqContent.error.DT_OD_CHECKOUT_SERVICE_ADDRESS_INVALID_CITY_ERROR;
  }
  if (!state) {
    errors.stateServAddress = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidName(state)) {
    errors.stateServAddress = props.cqContent.error.DT_OD_CHECKOUT_SERVICE_ADDRESS_INVALID_STATE_ERROR;
  }
  if (!zipCode) {
    errors.zipcodeServAddress = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidZipCode(zipCode)) {
    errors.zipcodeServAddress = props.cqContent.error.DT_OD_CHECKOUT_SERVICE_ADDRESS_INVALID_ZIPCODE_ERROR;
  }
  if (!telephoneNumber) {
    errors.phoneNumberServAddress = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidPhoneNumber(telephoneNumber)) {
    errors.phoneNumberServAddress = props.cqContent.error.DT_OD_CHECKOUT_SERVICE_ADDRESS_INVALID_PHONE_NUMBER_ERROR;
  }

  return errors;
};
class ServiceAddressEdit extends Component {
  onClickSameAsShipping = () => {
    const {
      change, addressInfo, sameAsShippingAddress,
    } = this.props;
    if (!sameAsShippingAddress) {
      change('firstNameServAddress', addressInfo.firstName);
      change('lastNameServAddress', addressInfo.lastName);
      change('address1ServAddress', addressInfo.address1);
      change('address2ServAddress', addressInfo.address2);
      change('cityServAddress', addressInfo.city);
      change('stateServAddress', addressInfo.state);
      change('zipcodeServAddress', addressInfo.zipcode);
      change('phoneNumber', addressInfo.phoneNumber);
    }
  };

  onSubmit = (data) => {
    const params = {
      deviceServiceAddress: [{
        deviceId: this.props.device.deviceId,
        serviceAddress: transformServiceAddress(data.toJS()),
        sameAsShippingAddress: data.get('sameAsShippingAddress'),
      }],
      userInfo: {
        userRole: 'AccountOwner',
      },
    };
    this.props.updateServiceAddress(params, this.props.index);
  }

  render() {
    const {
      cqContent, sameAsShippingAddress, states, device, index, valid, submitting, setEditState, handleSubmit,
    } = this.props;

    return (
      <div>
        <Row className="pad12 onlyBottomPad">
          <Col xs={3} sm={3} md={3} lg={2}>
            <img className="height102" src={device.deviceImageUrl} alt={device.deviceName} />
          </Col>
          <Col xs={9} lg={10} className="noPad">
            <div>
              <h3 className="displayInlineBlock">
                {cqContent.label.DT_OD_CHECKOUT_DEVICES_HEADER_SERVICE_ADDRESS}
              </h3>
              <ToolTip
                className="margin3 onlyLeftMargin displayInlineBlock"
                ariaLabel="Billing address information tooltip"
                text={cqContent.label.DT_OD_CHECKOUT_DEVICES_HEADER_SERVICE_ADDRESS_TOOLTIP}
                noRenderHTML
              />
            </div>
            {!sameAsShippingAddress &&
              <Row className="margin12 noSideMargin">
                <Col xs={12} className="margin6 noSideMargin">
                  <Field
                    component={renderTextField}
                    id="firstNameServAddress"
                    name="firstNameServAddress"
                    label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_FIRST_NAME_TEXT}
                    type="text"
                    required
                  />
                </Col>
                <Col xs={12} className="margin6 noSideMargin">
                  <Field
                    component={renderTextField}
                    id="lastNameServAddress"
                    name="lastNameServAddress"
                    label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_LAST_NAME_TEXT}
                    type="text"
                    required
                  />
                </Col>
                <Col xs={12} className="margin6 noSideMargin">
                  <Field
                    component={renderTextField}
                    id="address1ServAddress"
                    name="address1ServAddress"
                    label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_SERVICE_ADDRESS_PRIMARY_TEXT}
                    type="text"
                    required
                  />
                </Col>
                <Col xs={12} className="margin6 noSideMargin">
                  <Field
                    component={renderTextField}
                    id="address2ServAddress"
                    name="address2ServAddress"
                    label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_SERVICE_ADDRESS_SECONDARY_TEXT}
                    type="text"
                  />
                </Col>
                <Col xs={12} className="margin6 noSideMargin">
                  <Field
                    component={renderTextField}
                    id="zipcodeServAddress"
                    name="zipcodeServAddress"
                    label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_ZIPCODE_TEXT}
                    type="text"
                    required
                  />
                </Col>
                <Col xs={6} className="margin6 noSideMargin">
                  <Field
                    component={renderTextField}
                    id="cityServAddress"
                    name="cityServAddress"
                    label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_CITY_TEXT}
                    type="text"
                    required
                  />
                </Col>
                <Col xs={6} className="margin6 noSideMargin clearfix">
                  <MSelect
                    label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_STATE_TEXT}
                    name="stateServAddress"
                    aria-label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_STATE_TEXT}
                    id="stateServAddress"
                    borderStyle
                    required
                  >
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </MSelect>
                </Col>
                <Col xs={12} className="margin6 noSideMargin">
                  <Field
                    component={renderTextField}
                    id="phoneNumberServAddress"
                    name="phoneNumberServAddress"
                    label={cqContent.label.DT_OD_CHECKOUT_SERVICE_ADDRESS_PHONE_NUMBER_TEXT}
                    type="text"
                    maxLength="10"
                    required
                  />
                </Col>
              </Row>
            }
            <div>
              <Checkbox
                className="checkbox"
                name="sameAsShippingAddress"
                id="sameAsShippingAddress"
                component="input"
                type="checkbox"
                labelClass="verticalCenter leftAlign pad12 onlyLeftPad"
                onClick={this.onClickSameAsShipping}
                analyticstrack="device-sameAsShippingAddress-checkbox"
              >
                <p id="sameAsShippingAddressLabel" > {cqContent.label.DT_OD_CHECKOUT_DEVICES_SERVICE_ADDRESS_SAME_AS_SHIPPING} </p>
              </Checkbox>
            </div>
          </Col>
        </Row>
        <div className={`width100 pad24 clearfix ${index > 0 ? 'onlyTopPad' : 'noSidePad border_grayThree onlyBottomBorder'}`}>
          <button
            className="primary button large"
            type="submit"
            disabled={!valid || submitting}
            onClick={
              handleSubmit((data) => {
                this.onSubmit(data);
              })
            }
          >
            {cqContent.label.DT_OD_CHECKOUT_DEVICES_SERVICE_ADDRESS_UPDATE_BUTTON_TEXT}
          </button>

          {!this.props.required &&
            <button
              className="secondary button large margin10 onlyLeftMargin"
              onClick={() => setEditState(index, false, 'service')}
            >
              {cqContent.label.DT_OD_CHECKOUT_DEVICES_CANCEL}
            </button>
          }

        </div>
      </div>
    );
  }
}
ServiceAddressEdit.propTypes = {
  cqContent: PropTypes.object,
  sameAsShippingAddress: PropTypes.bool,
  states: PropTypes.array,
  change: PropTypes.func,
  addressInfo: PropTypes.object,
  updateServiceAddress: PropTypes.func,
  index: PropTypes.number,
  device: PropTypes.object,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  setEditState: PropTypes.func,
  handleSubmit: PropTypes.func,
  required: PropTypes.bool,
};

// export default ServiceAddressEdit;
export default reduxForm({
  form: 'serviceAddress',
  validate,
})(ServiceAddressEdit);
