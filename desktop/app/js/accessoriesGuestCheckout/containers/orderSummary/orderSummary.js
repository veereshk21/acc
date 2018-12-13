import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OrderSummary from '../../components/orderSummary/orderSummary';
import * as actionCreators from '../../actions';
import { EDIT_STATE } from '../../constants';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const { stepsCompleted, orderId } = data;
  const editState = state.get('editState').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  // const forms = state.get('form').toJS();

  const checkoutEnabled = (
    !editState[EDIT_STATE.SHIPPING_ADDRESS] &&
    !editState[EDIT_STATE.SHIPPING_METHOD] &&
    !editState[EDIT_STATE.BILLING_ADDRESS] &&
    !editState[EDIT_STATE.PAYMENT] &&
    stepsCompleted.billingAddress &&
    stepsCompleted.deliveryInfo &&
    stepsCompleted.paymentInfo &&
    stepsCompleted.shippingAddress &&
    !data.checkoutStates.disableSubmitOrderForOPALUser
  );

  return {
    cqContent,
    ...asyncCallStatus,
    editState,
    billingInfo: data.billingInfo,
    checkoutEnabled,
    taxes: data.taxes,
    shipping: data.selectedShippingType,
    dueMonthly: data.totalDueMonthlyPlanAndDevice,
    dueToday: data.dueToday,
    isBTA: false,
    cartDetailURL: data.cartDetailURL,
    accessories: data.accessories,
    standaloneAccessories: data.standaloneAccessories,
    submitOrderURL: data.submitOrderURL,
    subtotalDueToday: data.subtotalDueToday,
    totalUpgradeFee: data.totalUpgradeFee,
    totalOrderTax: data.totalOrderTax,
    flow: data.flow,
    showGiftCards: data.giftCardsEnabled && data.giftCardsUsed > 0,
    giftCardList: data.billingInfo.giftCardList,
    orderId,
    showDeliveryMethod: data.checkoutStates.showDeliveryMethod,
    stepsCompleted,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
