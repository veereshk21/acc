import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomePage from '../components/index';
import * as actionCreators from '../actions';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  // const forms = state.get('form').toJS();
  if (!data.devices) {
    window.location.href = '/#genericError';
    return {};
  }
  return {
    cqContent,
    ...asyncCallStatus,
    billingInfo: data.billingInfo,
    standaloneAccessories: data.standaloneAccessories,
    paymentRequired: data.checkoutStates.paymentRequired,
    shippingAddressRequired: data.checkoutStates.shippingAddressRequired,
    shippingAddressChangeRequired: data.checkoutStates.shippingAddressChangeRequired,
    cartDetailURL: data.cartDetailURL,
    showPaymentSection: data.checkoutStates.showPaymentSection,
    checkoutStates: data.checkoutStates,
    orderId: data.orderId,
    confirmationEmail: data.confirmationEmail,
    ispuSelected: data.selectedShippingType && data.selectedShippingType.type && data.selectedShippingType.type.toLowerCase() === 'ispu',
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
