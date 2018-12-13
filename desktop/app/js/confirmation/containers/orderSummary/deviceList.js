
import { connect } from 'react-redux';

import DeviceList from '../../components/orderSummary/deviceList';

const mapStateToProps = (state) => {
  const data = state.get('orderDetails').toJS();
  return {
    cqContent: state.get('cqContent').toJS(),
    devices: state.get('devices').toJS(),
    deviceConfigInfo: data.deviceConfigInfo,
  };
};

export default connect(mapStateToProps)(DeviceList);
