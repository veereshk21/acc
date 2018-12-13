import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { some } from 'lodash';
import { Grid, Row, Col } from 'react-flexbox-grid';
import VerificationCodeMethodMainChoices from './VerificationCodeMethodMainChoices';
import VerificationCodeMethodOtherChoices from './VerificationCodeMethodOtherChoices';
import A from '../../common/A/A';
import Button from '../../common/Button/Button';
import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';
import { TEXT_DIFFERENT_METHOD } from '../constants';
import HorizontalRule from '../../common/HorizontalRule';


export default class VerificationCodeMethodChoice extends Component {
  constructor(props) {
    super(props);
    this.radioName = 'method';
    this.onNextButtonClick = this.onNextButtonClick.bind(this);
  }

  componentWillMount() {
    this.props.getSMSCapableDevices();
  }

  onNextButtonClick() {
    const sendCodeTo = this.form.elements[this.radioName].value;
    const sendCode = sendCodeTo !== TEXT_DIFFERENT_METHOD;

    if (sendCode) {
      this.props.sendSMS(sendCodeTo);
    }

    window.location = sendCode ? '#/code' : '#/other';
  }

  render() {
    const { currentDevice, otherDevices, cqContent } = this.props;

    if (this.props.isFetching) {
      return (<Loader />);
    } else if (currentDevice) {
      const currentDeviceDisabled = !currentDevice.smsCapable
        || !currentDevice.esnHistoryCheckPassed
        || currentDevice.numberOfSMSRequestsIn24Hours >= 3;
      const otherDevicesDisabled = !some(otherDevices, (dev) =>
        dev.smsCapable
        && dev.esnHistoryCheckPassed
        && dev.numberOfSMSRequestsIn24Hours < 3);

      const anyOtherDevicesDisabled = some(otherDevices, (dev) =>
        !dev.smsCapable
        || !dev.esnHistoryCheckPassed
        || dev.numberOfSMSRequestsIn24Hours >= 3);

      const inactive = this.props.pathname === '/'
        ? currentDeviceDisabled || otherDevicesDisabled
        : anyOtherDevicesDisabled;

      const btnInactive = this.props.pathname === '/'
        ? currentDeviceDisabled && otherDevicesDisabled
        : otherDevicesDisabled;

      const infoCopy = inactive
        ? cqContent.label.OD_SECURE_PIN_VERIFICATION_OPTIONS_UNAVAILABLE_TEXT
        : cqContent.label.OD_SECURE_PIN_VERIFICATION_CODE_FREE_TEXT;
      const inactiveLearnMoreLink = inactive && (
        <A href="#/learnMore" className="link">Learn More.</A>
      );
      const header = this.props.pathname === '/'
        ? cqContent.label.OD_SECURE_PIN_GET_VERIFICATION_CODE_PROMPT_TEXT
        : cqContent.label.OD_SECURE_PIN_SEND_VERIFICATION_CODE_PROMPT_TEXT;

      return (
        <Grid className="pad32">
          <Row>
            <Col xs={12}>
              <Title >{header}</Title>
              <p className="fontSize_1_3">{infoCopy} {inactiveLearnMoreLink}</p>
              <HorizontalRule />
            </Col>
            <Col xs={12}>
              <form
                ref={(node) => this.form = node}
              >
                {this.props.pathname === '/' &&
                  <VerificationCodeMethodMainChoices
                    radioName={this.radioName}
                    cqContent={cqContent}
                    {...this.props}
                  />
                }
                {this.props.pathname === '/other' &&
                  <VerificationCodeMethodOtherChoices
                    radioName={this.radioName}
                    {...this.props}
                  />
                }
              </form>
            </Col>
            <Col xs={12} className="footerFixed">
              <Button
                className="large width40"
                disabled={btnInactive}
                onClick={this.onNextButtonClick}
                analyticstrack="send-sms"
              >{cqContent.label.OD_SECURE_PIN_SEND_VERIFICATION_CODE_BUTTON_TEXT}
              </Button>
            </Col>
          </Row>
        </Grid>
      );
    }
    // ERROR
    return (<Loader />);
  }
}

VerificationCodeMethodChoice.defaultProps = {
  radioName: 'method',
};
VerificationCodeMethodChoice.propTypes = {
  getSMSCapableDevices: PropTypes.func,
  sendSMS: PropTypes.func,
  pathname: PropTypes.string,
  currentDevice: PropTypes.object,
  otherDevices: PropTypes.array,
  cqContent: PropTypes.object,
  isFetching: PropTypes.bool,
  radioName: PropTypes.string,
};
