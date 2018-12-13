/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from '../../common/Button/Button';
import BlockedNumberInput from './BlockedNumberInput';
import Loader from '../../common/Loader/Loader';
import Title from '../../common/Title/Title';
import { hashHistory } from './../../store';
import HorizontalRule from '../../common/HorizontalRule';

export default class VerificationCodeEntry extends Component {
  state = {
    isFetching: this.props.isFetching,
    code: '',
    isCodeLongEnough: false,
    errorText: '',
    numberOfSMSRequestsIn24Hours: null,
    formKey: 1,
  }


  componentDidUpdate() {
    const {
      isFetching, deviceObj, invalidAuthCode, numOfAttempts,
    } = this.props;
    const { errorText } = this.state;
    const attemptsRemaining = 3 - numOfAttempts;
    const newError = this.invalidAuthCodeText(attemptsRemaining);

    if (invalidAuthCode && errorText !== newError) {
      this.setState({
        errorText: newError,
        formKey: this.state.formKey + 1, // empties the form
      });
    }

    if (this.state.isFetching !== isFetching) {
      this.setState({
        isFetching,
      });
    }

    if (this.state.numberOfSMSRequestsIn24Hours === null && deviceObj) {
      this.setState({
        numberOfSMSRequestsIn24Hours: deviceObj.numberOfSMSRequestsIn24Hours,
      });
    }
  }
  onCodeChange = (code) => {
    if (this.props.invalidAuthCode) {
      this.props.resetInvalidAuthCode();

      this.setState({
        errorText: '',
      });
    }

    if (parseInt(code, 10)) {
      this.setState({
        code,
        isCodeLongEnough: code.length === this.codeLength,
      });
    }
  }
  onDoneClick = () => {
    this.props.validateAuthCode(this.state.code);
  }
  sendNewCode = () => {
    let { numberOfSMSRequestsIn24Hours } = this.props.deviceObj;
    numberOfSMSRequestsIn24Hours += 1;
    this.props.sendSMS(this.props.codeSentTo);

    this.setState({
      numberOfSMSRequestsIn24Hours,
    });
  }

  invalidAuthCodeText = (attemptsRemaining) => (
    `This code isn't valid. You have ${attemptsRemaining} more ${attemptsRemaining === 1 ? 'try' : 'tries'}.`
  )
  codeLength = 6

  render() {
    const {
      cqContent, deviceObj, invalidAuthCode, numOfAttempts,
    } = this.props;

    if (numOfAttempts >= 3) {
      hashHistory.push('/limitError');
    }

    return deviceObj ?
      (
        <Grid className="pad32">
          <Row >
            <Col>
              {this.state.isFetching === true && <Loader />}
              <Title>{cqContent.label.OD_SECURE_PIN_ENTER_CODE_INFO_TEXT}</Title>
              <p className="fontSize_1_3">{cqContent.label.OD_SECURE_PIN_SEND_NEW_CODE_INFO_TEXT}</p>
              <HorizontalRule />
            </Col>
          </Row>
          <Row>
            <BlockedNumberInput
              key={this.state.formKey}
              length={this.codeLength}
              onCodeChange={this.onCodeChange}
              disabled={numOfAttempts >= 3}
            />
            <div className="center red">{this.state.errorText}</div>
          </Row>
          <Row className="footerFixed">
            <Col xs={12}>
              <Button
                className="secondary margin6 large"
                onClick={this.sendNewCode}
                analyticstrack="send-new-sms"
                disabled={
                  this.state.numberOfSMSRequestsIn24Hours >= 3
                  || numOfAttempts < 3
                }
              >{cqContent.label.OD_SECURE_PIN_SEND_NEW_CODE_BUTTON_TEXT}
              </Button>
              <Button
                onClick={this.onDoneClick}
                className="margin6 large"
                analyticstrack="submit-sms-code"
                disabled={
                  !this.state.isCodeLongEnough
                  || invalidAuthCode
                  || numOfAttempts >= 3
                }
              >{cqContent.label.OD_SECURE_PIN_DONE_BUTTON_TEXT}
              </Button>
            </Col>
          </Row>

        </Grid>
      ) : (
        <Loader />
      );
  }
}

VerificationCodeEntry.propTypes = {
  isFetching: PropTypes.bool,
  cqContent: PropTypes.object,
  numberOfSMSRequestsIn24Hours: PropTypes.any,
  deviceObj: PropTypes.object,
  invalidAuthCode: PropTypes.bool,
  numOfAttempts: PropTypes.number,
  sendSMS: PropTypes.func,
  codeSentTo: PropTypes.any,
  validateAuthCode: PropTypes.func,
  resetInvalidAuthCode: PropTypes.func,
};
