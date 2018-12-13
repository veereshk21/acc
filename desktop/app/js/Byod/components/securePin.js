import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import RadioButton from '../../common/RadioButton/index';
import { hashHistory } from '../../store';
import * as validation from '../../common/validation';
import { renderTextField } from '../../common/TextField/';

const selector = formValueSelector('securePin');
const validate = (values, props) => {
  const errors = {};
  const securePin = values.get('securePin');
  const securePinConfirmation = values.get('securePinConfirmation');

  if (!securePin) {
    errors.securePin = props.cqContent.error.DT_OD_CHECKOUT_SECURE_PIN_REQUIRED_ERROR;
  }
  if (!securePinConfirmation) {
    errors.securePinConfirmation = props.cqContent.error.DT_OD_CHECKOUT_SECURE_PIN_CONFIRM_REQUIRED_ERROR;
  } else if (securePin !== securePinConfirmation) {
    errors.securePinConfirmation = props.cqContent.error.DT_OD_CHECKOUT_SECURE_PIN_NOT_MATCHING_ERROR;
  }
  return errors;
};
class SecurePin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceDetails: props.deviceDetails,
      sentSMS: false,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.asyncCallStatus.data.sentSMS) {
      const { deviceDetails } = this.props;
      const deviceIndex = deviceDetails.findIndex((device) => (device.mtn === nextProps.selectValue('smsDevice')));

      if (deviceIndex >= 0) {
        deviceDetails.splice(deviceIndex, 1, { ...deviceDetails[deviceIndex], numberOfSMSRequestsIn24Hours: nextProps.asyncCallStatus.data.numberOfSMSRequestsIn24Hours });
      } else {
        hashHistory.push('/genericError');
      }
      this.setState({
        sentSMS: true,
        deviceDetails,
      });
      this.props.invalidateAsyncFetch();
    } else if (nextProps.asyncCallStatus.data.smsAuthenticationComplete) {
      nextProps.securePinSuccess();
    }
  }
  sendSMS = () => {
    this.props.sendSMS(this.props.selectValue('smsDevice'));
  }
  validateAuthCode = () => {
    this.props.validateAuthCode(this.props.selectValue('securePin'));
  }
  render() {
    const {
      cqContent, closeModal, selectValue, valid, submitting,
    } = this.props;
    const {
      deviceDetails, sentSMS,
    } = this.state;
    const currentDevice = deviceDetails.find((device) => (device.mtn === selectValue('smsDevice')));
    const currentDeviceSMSEligible = currentDevice && (!currentDevice.smsCapable || !currentDevice.esnHistoryCheckPassed || currentDevice.numberOfSMSRequestsIn24Hours >= 3);

    return (
      <div className="pad12">
        <Row>
          <Col xs={12}>
            <h2>{cqContent.label.DT_OD_BYOD_SECUREPIN_TITLE}</h2>
          </Col>
        </Row>
        {!sentSMS ?
          <div>
            <Row>
              <Col xs={12}>
                {cqContent.label.DT_OD_BYOD_SECUREPIN_DESCRIPTION}
              </Col>
            </Row>
            <Row>
              <Col xs={12} dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_BYOD_SECUREPIN_INSTRUCTIONS }} />
            </Row>
            <Row className="pad36 onlyTopPad">
              {deviceDetails.map((device) => (
                <Col key={`devicePin-${device.mtn}`} className="background_gray_three pad12 width160 margin6 sideMarginOnly">
                  <label className="displayBlock textAlignCenter" htmlFor={device.mtn}>
                    <img className="margin12 onlyBottomMargin" src={device.deviceImageUrl} alt={device.deviceName} />
                    <p className="centerTextAlign margin12 onlyBottomMargin bold">{device.formattedMtn}</p>
                  </label>
                  <RadioButton
                    // disabled={radioBTNClass}
                    name="smsDevice"
                    id={`smsDevice-${device.mtn}`}
                    value={device.mtn}
                    containerClassName="margin24 onlyLeftMargin"
                    labelClassName="bold displayInlineBlock fontSize_4 onlyLeftPad pad6 verticalCenter"
                    analyticstrack="select-sms-capable-device-radio"
                  >
                    {cqContent.label.DT_OD_CHECKOUT_SECURE_PIN_SELECT}
                  </RadioButton>
                </Col>

              ))}
            </Row>
            <Row>
              <Col xsOffset={7} xs={2}>
                <p>{cqContent.label.DT_OD_BYOD_SECUREPIN_CANCEL_TITLE}</p>
                <button
                  className="fontSize_3 link background_transparent displayInlineBlock margin15 borderSize_0"
                  onClick={closeModal}
                  analyticstrack="before-send-sms-modal-cancel-link"
                >
                  Cancel
                </button>
              </Col>
              <Col xs={3}>
                <button
                  className="primary button large"
                  type="submit"
                  onClick={this.sendSMS}
                  disabled={currentDeviceSMSEligible}
                  analyticstrack="send-sms-to-selected-device-cta"
                >
                  {cqContent.label.DT_OD_BYOD_SECUREPIN_CTA}
                </button>
              </Col>
            </Row>
          </div>
          :
          <div>
            <div>
              <span>
                {`${cqContent.label.DT_OD_BYOD_SECUREPIN_ENTER_CODE_TEXT} ${currentDevice.mtn}`}
              </span>
            </div>
            <div style={{ width: 300 }}>
              <div className="margin24 noSideMargin">
                <Field
                  component={renderTextField}
                  type="text"
                  id="securePin"
                  name="securePin"
                  normalize={validation.allowOnlyNumbers}
                  label="Customer Verification"
                />
              </div>
              <div className="margin24 noSideMargin">
                <Field
                  component={renderTextField}
                  type="text"
                  id="securePinConfirmation"
                  name="securePinConfirmation"
                  normalize={validation.allowOnlyNumbers}
                  label="Confirm Online Verification Code"
                />
              </div>
            </div>
            <Row>
              <Col xsOffset={7} xs={2}>
                <button
                  className="fontSize_3 link background_transparent displayInlineBlock margin15 borderSize_0"
                  onClick={closeModal}
                  analyticstrack="after-send-sms-cancel-modal-link"
                >
                  Cancel
                </button>
              </Col>
              <Col xs={3}>
                <button
                  className="primary button large"
                  type="submit"
                  onClick={this.validateAuthCode}
                  disabled={!valid || submitting}
                  analyticstrack="validate-auth-code-cta"
                >
                  {cqContent.label.DT_OD_BYOD_SECUREPIN_ENTER_CODE_CTA}
                </button>
              </Col>
            </Row>
          </div>
        }
      </div>
    );
  }
}

SecurePin.propTypes = {
  cqContent: PropTypes.object,
  deviceDetails: PropTypes.array,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  closeModal: PropTypes.func,
  selectValue: PropTypes.func,
  invalidateAsyncFetch: PropTypes.func,
  sendSMS: PropTypes.func,
  validateAuthCode: PropTypes.func,
};

export default connect((state) => ({ selectValue: (field) => selector(state, field) }))(
  reduxForm({
    form: 'securePin',
    validate,
  })(SecurePin)
);
