import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PortInNumber from '../../components/devices/portInNumber';
import * as actionCreators from '../../actions';

import * as NotificationActions from '../../../common/NotificationBar/actions';

function mapStateToProps(state, props) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const { portInDetails } = props.device;

  const initialValues = portInDetails ? {
    portInAddress: portInDetails.address1,
    portInAddress2: portInDetails.address2,
    portInZipCode: portInDetails.zipcode,
    portInCity: portInDetails.city,
    portInState: portInDetails.state,
    portInExistingNumber: portInDetails.existingNumber,
    portInExistingAccount: portInDetails.existingAccountNumber,
    portInPin: portInDetails.accountPin,
    portInContactNumber: portInDetails.altContactNumber,
    portInName: portInDetails.accountHolderName,
  } : {};

  if (!data.devices) {
    window.location.href = '/#genericError';
    return {};
  }
  return {
    cqContent,
    asyncCallStatus,
    devices: data.deviceConfigInfo.devices,
    states: data.states,
    initialValues,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PortInNumber);
