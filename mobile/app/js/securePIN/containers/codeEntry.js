import { connect } from 'react-redux';
import { find } from 'lodash';
import { sendSMS, validateAuthCode, resetInvalidAuthCode } from '../actions';
import * as NotificationActions from '../../common/NotificationBar/actions';
import VerificationCodeEntry from '../components/VerificationCodeEntry';


const mapStateToProps = (state) => {
  const asyncCallStatus = state.get('asyncCallStatus');
  const securePIN = state.get('securePIN');
  const cqContent = state.get('cqContent').toJS();

  let deviceObj;

  if (securePIN.currentDevice.mtn === securePIN.codeSentTo) {
    deviceObj = securePIN.currentDevice;
  } else {
    deviceObj = find(securePIN.otherDevices, { mtn: securePIN.codeSentTo });
  }

  return {
    cqContent,
    isFetching: asyncCallStatus.isFetching,
    error: asyncCallStatus.error,
    method: securePIN.method,
    codeSentTo: securePIN.codeSentTo,
    invalidAuthCode: securePIN.invalidAuthCode,
    deviceObj,
    numOfAttempts: securePIN.numOfAttempts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  sendSMS: (mdn) => dispatch(sendSMS(mdn)),
  validateAuthCode: (authCode) => dispatch(validateAuthCode(authCode)),
  resetInvalidAuthCode: () => dispatch(resetInvalidAuthCode()),
  showInfoNotification: (message) => dispatch(NotificationActions.showInfoNotification(message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationCodeEntry);
