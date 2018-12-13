/**
 * Created by mambig on 2/16/2017.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ServiceAddress from '../components/ServiceAddress';
import * as actionCreators from '../actions';

const getDevice = (deviceMap, deviceId) => deviceMap.filter((device) => (device.deviceId === deviceId))[0];

function mapStateToProps(state, ownProps) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  console.log(ownProps);
  const currentDevice = getDevice(data.deviceConfigInfo.devices, ownProps.match.params.deviceId);
  return {
    currentDevice,
    cqContent,
    initialValues: currentDevice.serviceAddress,
    states: data.states,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceAddress);
