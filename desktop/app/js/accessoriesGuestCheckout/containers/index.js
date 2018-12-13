import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomePage from '../components/index';
import * as actionCreators from '../actions';
import { EDIT_STATE } from '../constants';
import * as NotificationActions from '../../common/NotificationBar/actions';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const { stepsCompleted } = data;
  const editState = state.get('editState').toJS();
  const forms = state.get('form').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');

  const oneClickCheckout = (
    !editState[EDIT_STATE.SHIPPING_ADDRESS] &&
    !editState[EDIT_STATE.SHIPPING_METHOD] &&
    !editState[EDIT_STATE.BILLING_ADDRESS] &&
    !editState[EDIT_STATE.PAYMENT] &&
    stepsCompleted.billingAddress &&
    stepsCompleted.deliveryInfo &&
    stepsCompleted.paymentInfo &&
    stepsCompleted.shippingAddress
  );


  return {
    cqContent,
    ...asyncCallStatus,
    editState,
    billingInfo: data.billingInfo,
    standaloneAccessories: data.standaloneAccessories,
    oneClickCheckout,
    cartDetailURL: data.cartDetailURL,
    masterpassError: data.billingInfo.masterpassError,
    stepsCompleted: data.stepsCompleted,
    addressInfo: data.shippingInfo.addressInfo,
    forms,
    bannerContent: data.bannerContent,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
