import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions';
import GuestLogin from '../components/index';

function mapStateToProps(state) {
  const data = state.get('guestLoginDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const formData = state.toJS().form.guestLoginForm;
  const userNameField = formData && formData.values && formData.values.IDToken1;
  const passwordField = formData && formData.values && formData.values.IDToken2;
  const rememberMeField = formData && formData.values && formData.values.rememberMe;
  const ctadisabled = (userNameField && passwordField) || false;
  return {
    goToURL: data.goToURL,
    loginURL: data.loginURL,
    wasGuestcheckout: data.wasGuestcheckout,
    cqContent,
    ...asyncCallStatus,
    userNameField,
    passwordField,
    ctadisabled,
    rememberMeField,
    guestCheckoutEnabled: data.guestCheckoutEnabled,
    guestLogInEnabled: data.guestLogInEnabled,
    guestCheckoutURL: data.guestCheckoutURL,
    forgotPwdURL: data.forgotPwdURL,
    forgotUsernameURL: data.forgotUsernameURL,
    privacyPolicyURL: data.privacyPolicyURL,
    amLoginURL: data.amLoginURL,
    amGotoURL: data.amGotoURL,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestLogin);
