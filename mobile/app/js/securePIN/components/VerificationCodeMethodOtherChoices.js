import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import VerificationCodeMethod from './VerificationCodeMethod';
// import { TEXT_DIFFERENT_METHOD } from '../constants';


export default class VerificationCodeMethodOtherChoices extends Component { // eslint-disable-line
  render() {
    const defaultCheckedMtn = find(this.props.otherDevices, { smsCapable: true, esnHistoryCheckPassed: true }).mtn;

    return (
      this.props.otherDevices.map((device, i) =>
        (<VerificationCodeMethod
          key={i}
          name={this.props.radioName}
          title={device.nickName}
          text={device.formattedMtn}
          value={device.mtn}
          inactive={
            !device.smsCapable
            || !device.esnHistoryCheckPassed
            || device.numberOfSMSRequestsIn24Hours >= 3
          }
          onChange={this.props.onChange}
          defaultChecked={
            device.smsCapable
            && device.esnHistoryCheckPassed
            && device.numberOfSMSRequestsIn24Hours < 3
            && device.mtn === defaultCheckedMtn
          }
        />))
    );
  }
}
VerificationCodeMethodOtherChoices.propTypes = {
  onChange: PropTypes.func,
  otherDevices: PropTypes.array,
  radioName: PropTypes.string,
};
