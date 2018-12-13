import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BicOfferDetail from '../components/BicOfferDetails';
import * as actionCreators from '../actions';

// const getDevice = (deviceMap, deviceId) => deviceMap.filter((device) => (device.deviceId === deviceId))[0];

function mapStateToProps(state, ownProps) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const currentDevice = data.devices.items[ownProps.params.deviceId];
  return {
    currentDevice,
    cqContent,
    states: data.states,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(BicOfferDetail);
