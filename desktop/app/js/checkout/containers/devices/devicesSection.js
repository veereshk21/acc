import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DevicesSection from '../../components/devices/devicesSection';
import * as actionCreators from '../../actions';
import * as NotificationActions from '../../../common/NotificationBar/actions';
import { EDIT_STATE } from '../../constants';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const editShipping = state.get('editState')[EDIT_STATE.SHIPPING];
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const npanxxErrorIndex = data.deviceConfigInfo.devices.findIndex((device) => ((device.flow === 'AAL' || device.flow === 'NSO') && !((device.numberShareDevice) || device.npaNxxnumber !== null || (device.npnxxCustomerSelection === 'transfer' && device.portInDetails && device.portInDetails.existingNumber))));
  if (!data.devices) {
    window.location.href = '/#genericError';
    return {};
  }
  return {
    cqContent,
    asyncCallStatus,
    editShipping,
    devices: data.deviceConfigInfo.devices,
    devicesOuter: data.devices ? data.devices.items : [],
    states: data.states,
    npanxxError: npanxxErrorIndex >= 0,
    npanxxErrorIndex,
    npaNxxdetails: data.deviceConfigInfo.npaNxxdetails,
    deviceAddressUpdated: data.deviceConfigInfo.deviceAddressUpdated,
    npnxxCustomerSelection: data.deviceConfigInfo.npnxxCustomerSelection,
    globalPromotions: data.devices.globalPromotions,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DevicesSection);
