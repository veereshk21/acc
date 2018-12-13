import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import DevicesSection from '../../components/devices';
import * as actionCreators from '../../actions';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const protectionChangeList = state.get('protectionChangeList');
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const npanxxErrorIndex = data.deviceConfigInfo.devices.findIndex((device) => ((device.flow === 'AAL' || device.flow === 'NSO') && !(device.npaNxxnumber !== null || (device.npnxxCustomerSelection === 'transfer' && device.portInDetails && device.portInDetails.existingNumber))));
  if (!data.devices) {
    window.location.href = '/#genericError';
    return {};
  }
  return {
    cqContent,
    asyncCallStatus,
    devices: data.devices.items,
    protectionChangeList: !isEmpty(protectionChangeList) ? protectionChangeList : null,
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
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DevicesSection);
