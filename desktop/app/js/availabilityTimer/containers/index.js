import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InvalidPreorderComponent from '../../availabilityTimer/components/index';

import * as actionCreators from '../actions';
import * as NotificationActions from '../../common/NotificationBar/actions';

function mapStateToProps(state) {
  const cqContent = state.get('cqContent').toJS();
  const data = state.get('data').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  return {
    asyncCallStatus,
    availableDate: data.availableDate,
    disableCheckout: true,
    deviceName: data.deviceName,
    cqContent,
    cartDetailURL: data.cartDetailURL,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InvalidPreorderComponent);
