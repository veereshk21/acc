import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSMSCapableDevices, sendSMS } from '../actions';
import VerificationCodeMethodChoice from '../components/VerificationCodeMethodChoice';

const mapStateToProps = (state, ownProps) => {
  const asyncCallStatus = state.get('asyncCallStatus');
  const securePIN = state.get('securePIN');
  // const route = state.get('route');
  const cqContent = state.get('cqContent').toJS();
  console.log(ownProps.location.pathname);
  return {
    cqContent,
    isFetching: asyncCallStatus.isFetching,
    error: asyncCallStatus.error,
    method: securePIN.method,
    currentDevice: securePIN.currentDevice,
    otherDevices: securePIN.otherDevices,
    pathname: ownProps.location.pathname,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSMSCapableDevices: () => dispatch(getSMSCapableDevices()),
  sendSMS: (mdn) => dispatch(sendSMS(mdn)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationCodeMethodChoice));
