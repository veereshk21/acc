import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PayPal from '../components/PayPalCheckout';
import * as CartActions from '../actions';

const mapStateToProps = (state) => {
  // const asyncCallStatus = state.get('asyncCallStatus');
  const data = state.toJSON();
  const cartData = data.cartData.output;
  return {
    cartData,
    cq: data.cqContent,
    cartReadyforCheckout: cartData.cartValidationDetailsVo && cartData.cartValidationDetailsVo.cartReadyforCheckout,
    isAccountMember: cartData.accountMember,
    emailResponse: data.accountEmailFeature || {},
    authenticated: cartData.authenticated,
    standaloneAccessories: cartData.standaloneAccessories,
    guestCheckoutSignInURL: cartData.guestCheckoutSignInURL,
    accGuestCheckoutEnabled: cartData.accGuestCheckoutEnabled,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(CartActions, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PayPal));
