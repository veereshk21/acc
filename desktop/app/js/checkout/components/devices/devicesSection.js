import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import NotificationBar from '../../../common/NotificationBar';
import { NOTIFICATIONS, EDIT_STATE } from '../../constants';
// import ServiceAddressEdit from '../../containers/devices/serviceAddressEdit';

import AsyncComponent from '../../../common/AsyncComponent';
import Notification from '../../../common/Notification/Notification';

const DeviceInfo = AsyncComponent(() => import('./deviceInfo'));
const EditNumber = AsyncComponent(() => import('./editNumber'));
const EditServiceAddress = AsyncComponent(() => import('../../containers/devices/editServiceAddress'));

class DevicesSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editDeviceOpened: props.npanxxError,
      [`editDevice_${props.npanxxError ? props.npanxxErrorIndex : 0}`]: props.npanxxError,
      editDeviceSection: props.npanxxError ? EDIT_STATE.NUMBER : null,
    };
  }
  componentWillReceiveProps = (newProps) => {
    const {
      deviceInfoUpdated, deviceIndex,
    } = newProps.asyncCallStatus.data;

    if (deviceInfoUpdated) {
      // close EditState
      this.setEditState(deviceIndex, false);
      this.props.invalidateAsyncFetch();
    }
    if (newProps.npanxxError && !this.state[`editDevice_${newProps.npanxxErrorIndex}`]) {
      newProps.showErrorNotification(newProps.cqContent.error.DT_OD_NPANXX_NO_NUMBERS_ZIPCODE_TEXT);
      this.setEditState(newProps.npanxxErrorIndex, newProps.npanxxError);
      document.getElementById('devicesSection').scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
    }
  };
  setEditState = (index, state, section) => {
    this.setState({
      [`editDevice_${index}`]: state,
      editDeviceOpened: state,
      editDeviceSection: section,
    });
    this.props.updateEditState(EDIT_STATE.DEVICE, state);
    this.props.updateEditState(section, state);
  }
  getInitialNewNumber = (device, npaNxxdetails) => {
    let number = device.npaNxxnumber;
    if (!number && npaNxxdetails && npaNxxdetails.mtns && npaNxxdetails.mtns.length > 0) {
      number = npaNxxdetails[0];
    }
    return number;
  }
  getInitialCustomerSelection = (device, npaNxxdetails) => {
    let selection = 'default';
    if (device.npnxxCustomerSelection) {
      selection = device.npnxxCustomerSelection;
    } else if (!(npaNxxdetails && npaNxxdetails.mtns && npaNxxdetails.mtns.length > 0) && !device.npaNxxnumber) {
      selection = 'new';
    }
    return selection;
  }
  render() {
    const { cqContent, devices, npaNxxdetails, devicesOuter, globalPromotions } = this.props;
    const showCloseGlobalPromo = true;
    return (
      <div id="devicesSection">
        <NotificationBar section={NOTIFICATIONS.DEVICE} />
        <div className="pad24 border_grayThree borderSize_2 noTopBorder noLeftBorder">
          <div className="pad20 onlyBottomPad">
            <h2 className="h1 margin24 onlyBottomMargin fontSize32"> {cqContent.label.DT_OD_CHECKOUT_DEVICES_TITLE} </h2>
            {(globalPromotions && globalPromotions.length > 0) && globalPromotions.map((globalPromo) =>
              (globalPromo.badgeText &&
                <Row>
                  <Col xs={12} className="onlyBottomPad pad6">
                    <Notification
                      type={`${globalPromotions ? 'info' : 'error'}`}
                      message={globalPromo.badgeText}
                      toolTip={globalPromo.badgeToolTip}
                      noClose={showCloseGlobalPromo}
                    />
                  </Col>
                </Row>
              ))
            }
            {devices.map((device, index) => (
              <div key={`editDevice-${index}`} className={index !== devices.length - 1 ? 'margin24 noSideMargin' : 'margin24 onlyTopMargin'}>

                {!this.state[`editDevice_${index}`] &&
                  <DeviceInfo
                    index={index}
                    cqContent={cqContent}
                    device={device}
                    displayImeiId={(devicesOuter && devicesOuter.length > 0 && devicesOuter[index].displayImeiId) ? devicesOuter[index].displayImeiId : null} // TODO: Align for 5/22 - This is bad implementation, this field should be added to deviceConfigInfo.devices[]
                    onNumberEdit={() => this.setEditState(index, true, EDIT_STATE.NUMBER)}
                    onServiceEdit={() => this.setEditState(index, true, EDIT_STATE.SERVICE)}
                    editDeviceOpened={this.state.editDeviceOpened}
                  />
                }

                {this.state[`editDevice_${index}`] && this.state.editDeviceSection === EDIT_STATE.NUMBER &&
                  <EditNumber
                    index={index}
                    cqContent={cqContent}
                    device={device}
                    form={`editDevice_${index}`}
                    setEditState={this.setEditState}
                    {...this.props}
                    initialValues={{
                      npnxx: this.getInitialCustomerSelection(device, npaNxxdetails),
                      sameNumber: true,
                      numberZipCode: npaNxxdetails.zipCode,
                      newNumber: this.getInitialNewNumber(device, npaNxxdetails),
                    }}
                    required={this.props.npanxxError && this.props.npanxxErrorIndex === index}
                  />
                }

                {this.state[`editDevice_${index}`] && this.state.editDeviceSection === EDIT_STATE.SERVICE &&
                  <EditServiceAddress
                    index={index}
                    device={device}
                    setEditState={this.setEditState}
                    setIsAddressUpdated={this.setIsAddressUpdated}
                  />
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

DevicesSection.propTypes = {
  cqContent: PropTypes.object,
  devices: PropTypes.array,
  devicesOuter: PropTypes.array,
  npanxxError: PropTypes.bool,
  npanxxErrorIndex: PropTypes.number,
  npaNxxdetails: PropTypes.object,
  invalidateAsyncFetch: PropTypes.func,
  updateEditState: PropTypes.func,
  globalPromotions: PropTypes.array,
};
export default DevicesSection;
