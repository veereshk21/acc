import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { every } from 'lodash';
import { Row } from 'react-flexbox-grid';
import VerificationCodeMethod from './VerificationCodeMethod';
import { TEXT_DIFFERENT_METHOD } from '../constants';


export default class VerificationCodeMethodMainChoices extends Component { // eslint-disable-line
  render() {
    const { currentDevice, otherDevices, cqContent } = this.props;

    const currentDeviceDisabled = !currentDevice.smsCapable
      || !currentDevice.esnHistoryCheckPassed
      || currentDevice.numberOfSMSRequestsIn24Hours >= 3;

    const otherDevicesDisabled = every(otherDevices, (dev) =>
      !dev.smsCapable
      || !dev.esnHistoryCheckPassed
      || dev.numberOfSMSRequestsIn24Hours >= 3);

    return (
      <Row>
        <VerificationCodeMethod
          name={this.props.radioName}
          title={cqContent.label.OD_SECURE_PIN_TEXT_ME_TEXT}
          text={currentDevice.formattedMtn}
          value={currentDevice.mtn} // number?
          onChange={this.props.onChange}
          inactive={currentDeviceDisabled}
          defaultChecked={!currentDeviceDisabled}
        />
        <VerificationCodeMethod
          name={this.props.radioName}
          title={cqContent.label.OD_SECURE_PIN_TEXT_TO_DIFFERENT_NUMBER_TEXT}
          text={cqContent.label.OD_SECURE_PIN_CHOOSE_LINE_TEXT}
          value={TEXT_DIFFERENT_METHOD}
          onChange={this.props.onChange}
          inactive={otherDevicesDisabled}
          defaultChecked={
            currentDeviceDisabled
            && !otherDevicesDisabled
          }
        />
      </Row>
    );
  }
}
VerificationCodeMethodMainChoices.propTypes = {
  onChange: PropTypes.func,
  radioName: PropTypes.string,
  currentDevice: PropTypes.object,
  cqContent: PropTypes.object,
  otherDevices: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};
