import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as CartActions from '../actions';
import { showErrorNotification } from './../../common/NotificationBar/actions';
import MasterPass from '../components/MasterPassCheckout';

const mapStateToProps = (state) => {
  // const asyncCallStatus = state.get('asyncCallStatus');
  const data = state.toJSON();
  const cartData = data.cartData.output;
  return {
    cartData,
    cq: data.cqContent,
    isAccountMember: cartData.accountMember,
    masterpassConfigInfo: cartData.masterpassConfigInfo,
    authenticated: cartData.authenticated,
    standaloneAccessories: cartData.standaloneAccessories,
    guestCheckoutSignInURL: cartData.guestCheckoutSignInURL,
    accGuestCheckoutEnabled: cartData.accGuestCheckoutEnabled,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...CartActions, showErrorNotification }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MasterPass));
