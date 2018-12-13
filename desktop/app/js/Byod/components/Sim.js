import { Field, reduxForm } from 'redux-form/immutable';
import { Grid, Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getErrorMap } from './../../common/Helpers';
import { renderTextField } from '../../common/TextField/';
import * as Constants from './../constants';
import Button from '../../common/Button/Button';
import Loader from '../../common/Loader/Loader';
import Notification from './../../common/Notification/Notification';
import { hashHistory } from './../../store';

const styles = {
  place: {
    marginLeft: 15,
    fontSize: 18,
  },
};

class Sim extends Component {
  static propTypes = {
    pageJSON: PropTypes.object,
    iMEIResponse: PropTypes.object,
    addNewSim: PropTypes.func,
    formData: PropTypes.object,
    validateSIM: PropTypes.func,
    cqJSON: PropTypes.object,
    data: PropTypes.object,
    asyncCallStatus: PropTypes.object,
    checkedDevicesResponse: PropTypes.object,
    validateIMEI: PropTypes.func,
    // removeDevice: PropTypes.func,
    // showCheckedDevices: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.content = null;
    this.osOptions = this.props.data.deviceType[0].OS;
    this.osMismatch = false;
    this.simContent = null;
    this.pageMessage = null;
    this.state = {
      simState: true,
      showSimError: false,
      showSuccessNotification: false,
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.formData.toJS().simId &&
      newProps.formData.toJS().simId.values.deviceType !== this.props.formData.toJS().simId.values.deviceType) {
      this.osOptions = this.props.data.deviceType.filter((device) => device.name === newProps.formData.toJS().simId.values.deviceType)[0].OS;
      this.osMismatch = true;
    }
    this.state.showSimError = (newProps.simValidationResponse.output && newProps.simValidationResponse.output.output === null) || false;
    this.simContent = (newProps.simValidationResponse.output && newProps.simValidationResponse.output.output === null) && getErrorMap(newProps.simValidationResponse.output.errorMap);
    this.state.showSuccessNotification = (newProps.iMEIResponse.output && !newProps.iMEIResponse.output.isIMEI2 && typeof newProps.iMEIResponse.output.output !== typeof undefined && newProps.iMEIResponse.output.output !== null) || false;
    this.pageMessage = (newProps.iMEIResponse.output && newProps.iMEIResponse.output.output !== null) && newProps.iMEIResponse.output.statusMessage;
    return true;
  }

  getOSContent = () => {
    let content = null;
    const selectedDevice = this.props.formData.toJS().simId && this.props.data.deviceType.filter((device) => device.name === this.props.formData.toJS().simId.values.deviceType)[0].OS;
    if (!this.osMismatch) {
      content = this.props.formData.toJS().simId ? selectedDevice.filter((os) => os.name === this.props.formData.toJS().simId.values.osType)[0].deviceIdInstructions : null;
    } else {
      content = selectedDevice[0].deviceIdInstructions;
    }
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  changeSimView = (type) => {
    // this.setState({ simState: !this.state.simState });
    this.setState({ simState: type === Constants.NEED_SIM });
  }

  addSimSelected = () => {
    const { deviceId } = this.props.iMEIResponse.output.output;
    this.props.addNewSim({ deviceId, skipNSOAddSimBtn: true }, this.props.pageJSON.addSimUrl);
  }

  submitSim = () => {
    const { simId } = this.props.formData.toJS().simId.values;
    // hashHistory.push('/sim');
    this.props.validateSIM({ simId }, this.props.pageJSON.validateSIMUrl);
  };

  activateToday = () => {
    const { imei1 } = this.props.iMEIResponse.output.output;
    this.props.validateIMEI({ deviceId: imei1, isIMEI1: true }, this.props.pageJSON.validateIMEIUrl);
  }

  checkOtherDevice = () => {
    hashHistory.push('/');
  }

  shopDevices = () => {
    window.location = this.props.cqJSON.label.DT_OD_BYOD_SHOP_DEVICES_URL;
  }

  render() {
    const { cqJSON, asyncCallStatus, checkedDevicesResponse, iMEIResponse } = this.props;
    const device = checkedDevicesResponse.output[0];
    const { isIMEI2 } = this.props.iMEIResponse.output;
    console.log(iMEIResponse);
    return (
      <Grid>
        {asyncCallStatus.isFetching === true && <Loader />}
        <Row className="pad36 noSidePad">
          <Col sm={6} md={6} lg={6}>
            {this.state.showSuccessNotification &&
              <Notification message={this.pageMessage} />
            }
            <div className="width90">
              <Row className="pad24 onlyBottomPad">
                <Col xs={12} className="margin10 noSideMargin">
                  {device.deviceName && <h2 className="fontSize_11">{cqJSON.label.DT_OD_BYOD_SIM_TITLE.replace('$DEVICENAME$', device.deviceName)}</h2>}
                </Col>
              </Row>
              {isIMEI2 &&
              <Row className=" margin12  noSideMargin">
                <Col xs={12}>
                  <p className="bold">{cqJSON.label.DT_OD_BYOD_IMEI_2_ACTIVATION_DISCLAIMER}</p>
                </Col>
              </Row>
              }
              <Row className="pad60 onlyBottomPad">
                <Col xs={12}>
                  {isIMEI2 ? cqJSON.label.DT_OD_BYOD_IMEI_1_ACTIVATION_DESCRIPTION : cqJSON.label.DT_OD_BYOD_SIM_REQUIRED_DESCRIPTION}
                </Col>
              </Row>
            </div>
          </Col>
          <Col sm={6} md={6} lg={6}>
            <Row>
              <Col xs={4} className="textAlignCenter">
                {device.deviceName && device.imageUrl && <img className="width100" src={`https://ss7.vzw.com/is/image/VerizonWireless/${device.imageUrl}?$device-lg$`} alt={device.deviceName} />}
              </Col>
              <Col xs={8}>
                <Row className="pad12 onlyBottomPad">
                  <Col xs={12}>
                    <h3>Line 1</h3>
                  </Col>
                </Row>
                <Row>
                  <Col lg={5} md={8} sm={8}>
                    {device.deviceName && <h2>{device.deviceName}</h2>}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        {isIMEI2 &&
        <Col>
          <Row className="noSidePad">
            <Col xs={12} md={2} className="textAlignCenter">
              <button
                className="button primary margin30 onlyTopMargin large textAlignCenter"
                onClick={this.activateToday}
              >
                {cqJSON.label.DT_OD_BYOD_ACTIVATE_TODAY}
              </button>
            </Col>
            <Col xs={12} md={1}>
              <p className="fontSize_9 bold textAlignCenter">Or</p>
            </Col>
            <Col xs={12} md={2} className="textAlignCenter">
              <button
                className="button secondary margin30 onlyTopMargin large"
                onClick={this.shopDevices}
              >
                {cqJSON.label.DT_OD_BYOD_SHOP_DEVICES}
              </button>
            </Col>
            <Col xs={12} md={3} className="textAlignCenter">
              <div className="margin36 onlyTopMargin">
                <a
                  className="tertiary fontSize_8"
                  role="button"
                  onClick={this.checkOtherDevice}
                >Check another device
                </a>
              </div>
            </Col>
          </Row>
        </Col>
        }
        {isIMEI2 ?
          <Row className="pad36 noSidePad">
            <Col className="pad6 onlyBottomPad" xs={12}>
              <a target="_blank" href={cqJSON.label.DT_OD_BYOD_REDIRECT_URL}> <p className="bold">{cqJSON.label.DT_OD_BYOD_FAQS}</p></a>
            </Col>
          </Row>
          :
          <Row className="pad36 onlyBottomPad">
            <Col sm={6} md={6} lg={6} className="border_grayThree pad15 onlyBottomPad">
              <Row className="pad18 noBottomPad">
                <Col xs={12}>
                  <h2>{cqJSON.label.DT_OD_BYOD_GET_SIM_TEXT}</h2>
                </Col>
              </Row>
              <Row className="pad18">
                <Col xs={12} className="border_grayThree onlyBottomBorder pad20 onlyBottomPad">
                  {cqJSON.label.DT_OD_BYOD_ORDER_NEW_SIM}
                </Col>
              </Row>
              <Row className="pad18">
                <Button
                  type="button"
                  className="button secondary"
                  onClick={this.addSimSelected}
                  analyticstrack="add-new-sim"
                >
                  {cqJSON.label.DT_OD_BYOD_ADD_SIM_CTA_TEXT}
                </Button>
              </Row>
            </Col>
            <Col sm={6} md={6} lg={6} className="border_grayThree noLeftBorder pad15 onlyBottomPad">
              <Row className="pad18 noBottomPad">
                <Col xs={12}>
                  <h2>{cqJSON.label.DT_OD_BYOD_HAVE_SIM_TITLE}</h2>
                </Col>
              </Row>
              <Row className="pad18">
                <Col xs={12} className="border_grayThree onlyBottomBorder pad20 onlyBottomPad">
                  {cqJSON.label.DT_OD_BYOD_HAVE_SIM_DESCRIPTION}
                </Col>
              </Row>
              {this.state.showSimError &&
                <Notification type="error" message={this.simContent} />
              }
              <Row className="pad18 noTopPad">
                <Col xs={5}>
                  <Field
                    component={renderTextField}
                    id="simId"
                    name="simId"
                    type="text"
                    hintText="SIM ID"
                    hintStyle={styles.place}
                    label={cqJSON.label.DT_OD_BYOD_ENTER_SIM_ID}
                    required
                    pattern="[0-9]*"
                  />
                </Col>
                <Col>
                  <Button
                    type="button"
                    className="button secondary"
                    onClick={this.submitSim}
                    analyticstrack="add-existing-sim"
                  >
                    {cqJSON.label.DT_OD_BYOD_CHECK_SIM_CTA_TEXT}
                  </Button>
                </Col>
              </Row>
              <Row className="pad18 noTopPad">
                <Col xs={12}>
                  <Row className="margin20 onlyBottomMargin">
                    <Col xs={12}>
                      {cqJSON.label.DT_OD_FIND_SIM_INSTRUCTION_TOP}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <span className="pad24 onlyRightPad">1.</span><span>From your home screen, select "Settings".</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <span className="pad24 onlyRightPad">2.</span><span>Select "General".</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <span className="pad24 onlyRightPad">3.</span><span>Select "About".</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <span className="pad24 onlyRightPad">4.</span><span>Scroll down to the ICCID number.</span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        }
      </Grid>
    );
  }
}

export default reduxForm({
  form: 'simId',
  initialValues: {
    deviceType: 'Smartphone',
    osType: 'iOS(Apple)',
  },
})(Sim);

