import { Col, Row } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { isDeviceValid } from './../../common/validation';
import { renderTextField } from '../../common/TextField/';
import * as Constants from './../constants';
import Anchor from './../../common/A/A';
import AsyncComponent from '../../common/AsyncComponent';
import Button from '../../common/Button/Button';
import Loader from '../../common/Loader/Loader';
import MSelect from './../../common/Select';
import Notification from './../../common/Notification/Notification';
import NotificationBar from './../../common/NotificationBar';
import RightSection from './RightSection/index';

const Modal = AsyncComponent(() => import('./../../common/Modal'));
const SecurePin = AsyncComponent(() => import('./securePin'));

const styles = {
  place: {
    marginLeft: 15,
    fontSize: 18,
  },
  label: {
    fontSize: 22,
    fontFamily: 'NeueHaasGroteskDisplayBold, Arial, Helvetica, sans-serif',
    color: '#000',
    paddingTop: 10,
    position: 'relative',
  },
};
const FontValue = 22;
const marginValue = 30;

class Byod extends Component {
  static propTypes = {
    pageJSON: PropTypes.object,
    setSelectedDeviceAction: PropTypes.func,
    validateIMEI: PropTypes.func,
    formData: PropTypes.object,
    deviceList: PropTypes.array,
    cqJSON: PropTypes.object,
    selectedDevice: PropTypes.object,
    data: PropTypes.object,
    removeDevice: PropTypes.func,
    showCheckedDevices: PropTypes.object,
    invalidateAsyncFetch: PropTypes.func,
    showErrorNotification: PropTypes.func,
    asyncCallStatus: PropTypes.object,
    sendSMS: PropTypes.func,
    validateAuthCode: PropTypes.func,
    fetchSMSDevices: PropTypes.func,
    securePinEnabled: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.content = null;
    this.osContent = null;
    this.osSelected = null;
    this.osOptions = this.props.data.deviceType[0].OS;
    this.osMismatch = false;
    this.imeiContent = null;
    this.state = {
      showSecurePin: false,
      viewInstructions: false,
      showError: false,
      viewState: true,
      osSelected: '',
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.formData.toJS().byodDevice && this.props.formData.toJS().byodDevice.values &&
      newProps.formData.toJS().byodDevice.values.deviceType !== this.props.formData.toJS().byodDevice.values.deviceType) {
      this.osOptions = (newProps.formData.toJS().byodDevice.values.deviceType !== 'Basic Phone') ?
        this.props.data.deviceType.filter((device) => device.name === newProps.formData.toJS().byodDevice.values.deviceType)[0].OS :
        this.props.data.deviceType.filter((device) => device.name === newProps.formData.toJS().byodDevice.values.deviceType);
      this.osMismatch = true;
    }
    this.content = newProps.selectedDevice.selectedDevice && newProps.deviceList.filter((device) => device.name === newProps.selectedDevice.selectedDevice)[0].key;
    this.osSelected = newProps.selectedDevice.selectedDevice && newProps.selectedDevice.selectedDevice;
    this.state.viewInstructions = true;
    // this.state.showError = (newProps.iMEIResponse && newProps.iMEIResponse.output.output === null) || false;
    // this.imeiContent = (newProps.iMEIResponse && newProps.iMEIResponse.output.output === null) && getErrorMap(newProps.iMEIResponse.output.errorMap);
    if (newProps.asyncCallStatus && newProps.asyncCallStatus.data.smsDevicesFetched) {
      this.setState({
        showSecurePin: true,
        deviceDetails: newProps.asyncCallStatus.data.output.deviceDetails,
        orderID: newProps.asyncCallStatus.data.output.orderID,
      });
      this.props.invalidateAsyncFetch();
    }
  }

  getOSContent = () => {
    let content = null;
    let selectedDevice = null;
    if (this.props.formData.toJS().byodDevice) {
      selectedDevice = (this.props.formData.toJS().byodDevice.values.deviceType !== 'Basic Phone') ?
        this.props.data.deviceType.filter((device) => device.name === this.props.formData.toJS().byodDevice.values.deviceType)[0].OS :
        this.props.data.deviceType.filter((device) => device.name === this.props.formData.toJS().byodDevice.values.deviceType);
    }
    if (!this.osMismatch) {
      content = this.props.formData.toJS().byodDevice ? selectedDevice.filter((os) => os.name === this.props.formData.toJS().byodDevice.values.osType)[0].deviceIdInstructions : null;
    } else {
      content = selectedDevice[0].deviceIdInstructions;
    }
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }

  showContent = (type) => {
    this.props.setSelectedDeviceAction(type);
  }

  submitDevice = () => {
    const selectedDevice = this.props.formData.toJS().byodDevice.values.previousDevice;
    this.props.validateIMEI({ selectedDevice }, this.props.pageJSON.validateIMEIUrl);
  }

  closeSecurePinModal = () => {
    this.setState({ showSecurePin: false });
  }

  securePinSuccess = () => {
    this.setState({ showSecurePin: false });
    this.submitIMEI();
  }

  notifySecurePinIneligible = () => {
    const { cqJSON } = this.props;
    this.props.showErrorNotification(cqJSON.error.DT_OD_BYOD_SECUREPIN_INELIGIBLE);
  }

  beginSecurePin = (e) => {
    const { securePinEnabled } = this.props.pageJSON;
    if (securePinEnabled) {
      e.preventDefault();
      this.props.fetchSMSDevices();
    } else if (!securePinEnabled) {
      this.notifySecurePinIneligible();
    }
  }
  submitIMEI = () => {
    const data = {};
    if (this.props.formData.toJS().byodDevice.values) {
      data.deviceId = this.props.formData.toJS().byodDevice.values.byodDevice;
      if (!isDeviceValid(this.props.formData.toJS().byodDevice.values.byodDevice)) {
        this.imeiContent = this.props.cqJSON.label.DT_OD_BYOD_CHECKED_DEVICE_ERROR;
        this.setState({ showError: true });
      } else {
        this.props.validateIMEI(data, this.props.pageJSON.validateIMEIUrl);
      }
    } else {
      this.imeiContent = this.props.cqJSON.label.DT_OD_BYOD_CHECKED_DEVICE_ERROR;
      this.setState({ showError: true });
    }
  }

  changeView = (type) => {
    this.setState({ viewState: type === Constants.NEW_DEVICE });
  }

  handleSubmit = (data) => {
    const formData = data.toJS();
    this.submitIMEI(Object.assign({}, formData));
  };

  render() {
    const { cqJSON, asyncCallStatus } = this.props;
    return (
      <section className="section group grid container-fluid">
        {asyncCallStatus.isFetching === true && <Loader />}
        {this.state.showSecurePin &&
          <Modal
            mounted
            closeFn={this.closeSecurePinModal}
            underlayColor="rgba(0,0,0,0.8)"
          >
            <SecurePin
              deviceDetails={this.state.deviceDetails}
              orderID={this.state.orderID}
              closeModal={this.closeSecurePinModal}
              cqContent={cqJSON}
              sendSMS={this.props.sendSMS}
              validateAuthCode={this.props.validateAuthCode}
              asyncCallStatus={this.props.asyncCallStatus}
              invalidateAsyncFetch={this.props.invalidateAsyncFetch}
              securePinSuccess={this.securePinSuccess}
            />
          </Modal>
        }
        <Row className="pad36 noSidePad">
          <Col sm={8} md={8} lg={8}>
            <Row>
              <Col sm={11} md={11} lg={8}>
                <h1 className="fontSize_11 width80">{cqJSON.label.DT_OD_BYOD_GET_STARTED}</h1>
              </Col>
            </Row>
            <Row className="pad12 onlyTopPad">
              <Col xs={12}>
                {cqJSON.label.DT_OD_BYOD_DEVICE_ID_DESCRIPTION}
              </Col>
            </Row>
            {
              this.state.showError &&
              <Row>
                <Col xs={12} className="margin18 noSideMargin">
                  <Notification message={this.imeiContent} type="error" />
                </Col>
              </Row>
            }
            <NotificationBar section="showErrorNotification" />

            {this.props.pageJSON.previousDevicesAvailable &&
              <Row style={{ marginTop: '18px' }}>
                <ul className="simSelectionTab">
                  <li className={`pad12 ${this.state.viewState && 'highlighted'}`}>
                    <span
                      className="bold fontSize_5"
                      id="newDevice"
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.changeView(Constants.NEW_DEVICE)}
                      onKeyPress={() => this.changeView(Constants.NEW_DEVICE)}
                      role="button"
                      tabIndex="0"
                      analyticstrack="new-device-view"
                    >Enter Device ID
                    </span>
                  </li>
                  <li className={`pad12 ${!this.state.viewState && 'highlighted'}`}>
                    <span
                      className="bold fontSize_5"
                      id="oldDevice"
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.changeView(Constants.OLD_DEVICE)}
                      onKeyPress={() => this.changeView(Constants.OLD_DEVICE)}
                      role="button"
                      tabIndex="0"
                      analyticstrack="previous-device-view"
                    >My Previous Devices
                    </span>
                  </li>
                </ul>
              </Row>
            }
            {this.state.viewState ? (
              <section className="pad54 onlyTopPad">
                <Row className="pad12 onlyBottomPad">
                  <Col xs={12}>
                    <h2>{cqJSON.label.DT_OD_BYOD_DEVICE_ID_TITLE}</h2>
                  </Col>
                </Row>
                <Row className="pad30 onlyBottomPad">
                  <Col xs={12}>
                    {cqJSON.label.DT_OD_BYOD_CHECK_DEVICE_DESCRIPTION}
                  </Col>
                </Row>
                <Row className="pad48 onlyBottomPad">
                  <Col lg={4} md={5} sm={5}>
                    <Field
                      component={renderTextField}
                      id="byodDevice"
                      name="byodDevice"
                      type="text"
                      hintStyle={styles.place}
                      autoFocus
                      pattern="[0-9]*"
                      maxLength="18"
                      label={cqJSON.label.DT_OD_DEVICE_CHECK_TEXT}
                      className="bold height42"
                    />
                  </Col>
                  <Col>
                    <Button
                      type="button"
                      className="button margin30 onlyTopMargin secondary height42"
                      style={{ fontSize: '14pt' }}
                      id="deviceImei"
                      onClick={this.submitIMEI}
                      analyticstrack="validate-device-imei"
                      // onClick={this.beginSecurePin}
                    >
                      {cqJSON.label.DT_OD_BYOD_SUBMIT_IMEI}
                    </Button>
                  </Col>
                </Row>
                <Row className="pad12 onlyBottomPad">
                  <Col xs={12}>
                    <h2>{cqJSON.label.DT_OD_BYOD_NEED_HELP}</h2>
                  </Col>
                </Row>
                <Row className="pad12 onlyBottomPad">
                  <Col xs={12}>
                    {cqJSON.label.DT_OD_BYOD_PERSONALIZED_INSTRUCTION}
                  </Col>
                </Row>
                <Row>
                  {this.props.deviceList.map((deviceDetails) => (
                    <Anchor className="pad10 noRightPad textDecUnderline displayInlineBlock margin20 onlyRightMargin" analyticstrack="find-device-id-link" onClick={() => this.showContent(deviceDetails.name)}>
                      <div className={` ${this.osSelected === deviceDetails.name && 'osSelected'}`}>
                        {deviceDetails.name}
                      </div>
                    </Anchor>
                  ))}
                </Row>
                {(this.state.viewInstructions && this.props.selectedDevice.selectedDevice !== Constants.OTHER_DEVICE) ?
                  <Row>
                    <Col xs={12} dangerouslySetInnerHTML={{ __html: this.content }} />
                  </Row> :
                  <section>
                    <Row>
                      <Col xs={12}>
                        <h2>Choose another device type</h2>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={5}>
                        <MSelect
                          name="deviceType"
                          aria-label="deviceType"
                          id="deviceType"
                          borderStyle
                          label="Device Type"
                          analyticstrack="select-device-type"
                        >
                          {this.props.data.deviceType.map((deviceInfo) =>
                            <option key={deviceInfo.name} value={deviceInfo.name}>{deviceInfo.name}</option>)
                          }
                        </MSelect>
                      </Col>
                    </Row>
                    {(this.props.formData.toJS().byodDevice && this.props.formData.toJS().byodDevice.values.deviceType !== 'Basic Phone') &&
                      <Row>
                        <Col xs={5}>
                          <MSelect
                            name="osType"
                            aria-label="deviceType"
                            id="osType"
                            borderStyle
                            label="Device Operating System"
                            analyticstrack="select-os-type"
                          >
                            {this.osOptions.map((osList) =>
                              <option key={osList.name} value={osList.name}>{osList.name}</option>)}
                          </MSelect>
                        </Col>
                      </Row>
                    }
                    <Row>
                      <Col xs={12}>
                        {this.getOSContent()}
                      </Col>
                    </Row>
                  </section>
                }
              </section>
            ) : (this.props.pageJSON.previousDevicesAvailable &&
              <Row>
                <Col xs={5}>
                  <MSelect
                    name="previousDevice"
                    aria-label="previousDevice"
                    id="previousDevice"
                    borderStyle
                    label="Select a device"
                    hintText="Select a device"
                    labelStyle={styles.label}
                    labelTextStyle={FontValue}
                    marginTopValue={marginValue}
                    analyticstrack="select-previous-device"
                  >
                    <option key="0" value="0">Select a Device</option>
                    {this.props.pageJSON.devices.map((device) =>
                      <option key={device.displayMtn} value={device.deviceId}>{device.displayMtn}</option>)
                    }
                  </MSelect>
                </Col>
                <Col className="pad66">
                  <Button
                    type="button"
                    className="button primary"
                    onClick={this.submitDevice}
                    analyticstrack="submit-find-device"
                  >Continue
                  </Button>
                </Col>
              </Row>
            )}
          </Col>
          <RightSection
            showCheckedDevices={this.props.showCheckedDevices}
            checkedDevice={this.props.pageJSON.checkedDevices}
            cqJSON={cqJSON}
            showDeviceId={false}
            showSimId={false}
            removeDevice={this.props.removeDevice}
            removeDeviceUrl={this.props.pageJSON.removeDeviceUrl}
            pageJSON={this.props.pageJSON}
          />
        </Row>
      </section>
    );
  }
}

export default reduxForm({
  form: 'byodDevice',
  initialValues: {
    deviceType: 'Smartphone',
    osType: 'iOS(Apple)',
  },
})(Byod);
