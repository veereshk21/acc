import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form/immutable';
import { renderTextField } from '../../../common/TextField/';
import MSelect from '../../../common/Select/index';
import Checkbox from '../../../common/Checkbox/index';
import * as validation from '../../../common/validation';
import { transformPortIn } from '../../helpers';
import NotificationBar from '../../../common/NotificationBar';
import { NOTIFICATIONS } from '../../constants';

const validate = (values, props) => {
  const errors = {};
  const portInName = values.get('portInName');
  const portInAddress = values.get('portInAddress');
  const portInAddress2 = values.get('portInAddress2');
  const portInState = values.get('portInState');
  const portInCity = values.get('portInCity');
  const portInZipCode = values.get('portInZipCode');
  const portInExistingNumber = values.get('portInExistingNumber');
  const portInContactNumber = values.get('portInContactNumber');
  const portInAgreement = values.get('portInAgreement');
  const portInExistingAccount = values.get('portInExistingAccount');

  if (!portInName) {
    errors.portInName = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidNameWithSpace(portInName)) {
    errors.portInName = props.cqContent.error.DT_OD_CHECKOUT_PORT_IN_INVALID_FIRST_NAME_ERROR;
  }
  if (!portInAddress) {
    errors.portInAddress = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidAddress(portInAddress)) {
    errors.portInAddress = props.cqContent.error.DT_OD_CHECKOUT_PORT_IN_INVALID_ADDRESS_PRIMARY_ERROR;
  }
  if (portInAddress2 && !validation.isValidAddress(portInAddress2)) {
    errors.portInAddress2 = props.cqContent.error.DT_OD_CHECKOUT_PORT_IN_INVALID_ADDRESS_SECONDARY_ERROR;
  }
  if (!portInCity) {
    errors.portInCity = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidCity(portInCity)) {
    errors.portInCity = props.cqContent.error.DT_OD_CHECKOUT_PORT_IN_INVALID_CITY_ERROR;
  }
  if (!portInState) {
    errors.portInState = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidName(portInState)) {
    errors.portInState = props.cqContent.error.DT_OD_CHECKOUT_PORT_IN_INVALID_STATE_ERROR;
  }
  if (!portInZipCode) {
    errors.zipcode = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidZipCode(portInZipCode)) {
    errors.portInZipCode = props.cqContent.error.DT_OD_CHECKOUT_PORT_IN_INVALID_ZIPCODE_ERROR;
  }
  if (!portInExistingNumber) {
    errors.portInExistingNumber = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidPhoneNumber(portInExistingNumber)) {
    errors.portInExistingNumber = props.cqContent.error.DT_OD_CHECKOUT_PORT_IN_INVALID_PHONE_NUMBER_ERROR;
  }
  if (!portInContactNumber) {
    errors.portInContactNumber = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidPhoneNumber(portInContactNumber)) {
    errors.portInContactNumber = props.cqContent.error.DT_OD_CHECKOUT_PORT_IN_INVALID_PHONE_NUMBER_ERROR;
  }
  if (!portInAgreement) {
    errors.portInAgreement = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  }
  if (!portInExistingAccount) {
    errors.portInExistingAccount = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  }
  return errors;
};

class PortNumber extends Component {
  componentWillReceiveProps = (newProps) => {
    const {
      data,
    } = newProps.asyncCallStatus;

    if (data.zipCodeInfoFetched) {
      this.props.change('portInCity', data.city);
      this.props.change('portInState', data.state);
      this.props.change('portInZipCode', data.zipcode);
      this.props.invalidateAsyncFetch();
    }
  };

  submitPortIn = (data) => {
    const params = transformPortIn(data.toJS());
    this.props.validatePortIn(params);
  };

  render() {
    const {
      cqContent, valid, submitting, states, handleSubmit, device, fetchZipCodeInfo,
    } = this.props;
    return (
      <div>
        <NotificationBar section={NOTIFICATIONS.PORTIN} />

        <div className="pad20 noTopPad">
          <h2 className="margin12 noSideMargin">{cqContent.label.DT_OD_CHECKOUT_PORT_IN_TITLE}</h2>
          <div
            className="margin36 onlyBottomMargin"
            dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CHECKOUT_PORT_IN_DISCLAIMER }}
          />
          <p className="h3 fontSize_9 margin12 noSideMargin" dangerouslySetInnerHTML={{ __html: device.deviceName }} />

          <Row className="pad20 onlyBottomPad">
            <Col xs={6} className="pad12 noSidePad">
              <Field
                component={renderTextField}
                id="portInExistingNumber"
                name="portInExistingNumber"
                label={cqContent.label.DT_OD_CHECKOUT_PORT_IN_EXISTING_NUMBER_TEXT}
                normalize={validation.allowOnlyNumbers}
                maxLength="10"
                type="text"
                required
              />
            </Col>
            <Col xs={6} className="pad12 noSidePad">
              <Field
                component={renderTextField}
                id="portInExistingAccount"
                name="portInExistingAccount"
                label={cqContent.label.DT_OD_CHECKOUT_PORT_IN_ACCOUNT_NUMBER_TEXT}
                type="text"
                required
              />
            </Col>
            <Col xs={6} className="pad12 noSidePad">
              <Field
                component={renderTextField}
                id="portInContactNumber"
                name="portInContactNumber"
                label={cqContent.label.DT_OD_CHECKOUT_PORT_IN_CONTACT_NUMBER_TEXT}
                normalize={validation.allowOnlyNumbers}
                maxLength="10"
                type="text"
                required
              />
            </Col>
            <Col xs={6} className="pad12 noSidePad">
              <Field
                component={renderTextField}
                id="portInPin"
                name="portInPin"
                label={cqContent.label.DT_OD_CHECKOUT_PORT_IN_PIN_TEXT}
                type="text"
                required
              />
            </Col>
          </Row>

          <p className="h3 fontSize_9 margin12 noSideMargin">{cqContent.label.DT_OD_CHECKOUT_PORT_IN_ADDRESS_TITLE}</p>
          <Row>
            <Col xs={6} className="pad12 noSidePad">
              <Field
                component={renderTextField}
                id="portInName"
                name="portInName"
                label={cqContent.label.DT_OD_CHECKOUT_PORT_IN_NAME_TEXT}
                type="text"
                required
              />
            </Col>
            <Col xs={6} />
            <Col xs={6} className="pad12 noSidePad">
              <Field
                component={renderTextField}
                id="portInAddress"
                name="portInAddress"
                label={cqContent.label.DT_OD_CHECKOUT_PORT_IN_ADDRESS_PRIMARY_TEXT}
                type="text"
                required
              />
            </Col>
            <Col xs={6} className="pad12 noSidePad">
              <Field
                component={renderTextField}
                id="portInAddress2"
                name="portInAddress2"
                label={cqContent.label.DT_OD_CHECKOUT_PORT_IN_ADDRESS_SECONDARY_TEXT}
                type="text"
              />
            </Col>
            <Col xs={6} className="pad12 noSidePad">
              <Field
                component={renderTextField}
                id="portInZipCode"
                name="portInZipCode"
                label={cqContent.label.DT_OD_CHECKOUT_PORT_IN_ZIPCODE_TEXT}
                type="text"
                required
                onBlur={(evt) => {
                  fetchZipCodeInfo(evt.target.value);
                }}
              />
            </Col>
            <Col xs={3} className="pad12 noSidePad">
              <Field
                component={renderTextField}
                id="portInCity"
                name="portInCity"
                label={cqContent.label.DT_OD_CHECKOUT_PORT_IN_CITY_TEXT}
                type="text"
                required
              />
            </Col>
            <Col xs={3} className="pad12 noSidePad clearfix">
              <MSelect
                label={cqContent.label.DT_OD_CHECKOUT_PORT_IN_STATE_TEXT}
                name="portInState"
                aria-label={cqContent.label.DT_OD_CHECKOUT_PORT_IN_STATE_TEXT}
                id="portInState"
                borderStyle
                required
              >
                <option value="" disabled />
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </MSelect>
            </Col>
          </Row>
          <div className="margin24 noSideMargin pad6 onlySidePad">
            <Checkbox
              className="checkbox"
              name="portInAgreement"
              id="portInAgreement"
              component="input"
              type="checkbox"
              labelClass="verticalCenter leftAlign pad12 onlyLeftPad"
            >
              <p id="portInAgreementLabel" >{cqContent.label.DT_OD_CHECKOUT_PORT_IN_AGREEMENT}</p>
            </Checkbox>
          </div>
          <div className="width100 margin24 onlyTopMargin clearfix textAlignRight">
            <button
              className="primary button large"
              type="submit"
              disabled={!valid || submitting}
              analyticstrack="device-portIn-submit-CTA"
              onClick={
                handleSubmit((data) => {
                  this.submitPortIn(data);
                })
              }
            >
              {cqContent.label.DT_OD_CHECKOUT_PORT_IN_BUTTON_TEXT}
            </button>

            <button
              className="secondary button large margin10 onlyLeftMargin"
              onClick={this.props.closeModal}
              analyticstrack="device-portIn-cancel-CTA"
            >
              {cqContent.label.DT_OD_CHECKOUT_PORT_IN_CANCEL}
            </button>

          </div>
        </div>
      </div>
    );
  }
}
PortNumber.propTypes = {
  cqContent: PropTypes.object,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  closeModal: PropTypes.func,
  states: PropTypes.array,
  handleSubmit: PropTypes.func,
  device: PropTypes.object,
  fetchZipCodeInfo: PropTypes.func,
  validatePortIn: PropTypes.func,
  invalidateAsyncFetch: PropTypes.func,
  change: PropTypes.func,
};

// export default PortNumber;
export default reduxForm({
  form: 'portNumber',
  validate,
})(PortNumber);

