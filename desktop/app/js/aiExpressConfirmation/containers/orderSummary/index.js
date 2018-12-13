import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OrderSummary from '../../components/orderSummary';
import * as actionCreators from '../../actions';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const buddyUpgrade = data.devices.buddyUpgrade;
  const orderId = data.orderId;
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const forms = state.get('form').toJS();
  const npanxxErrorIndex = data.deviceConfigInfo.devices.findIndex((device) => ((device.flow === 'AAL' || device.flow === 'NSO') && !(device.npaNxxnumber !== null || (device.npnxxCustomerSelection === 'transfer' && device.portInDetails && device.portInDetails.existingNumber))));
  const notification = state.get('notification');
  const ispuSelected = data.selectedShippingType && data.selectedShippingType.type === 'ISPU';

  const getTextUpdatesForm = (forms.getTextUpdatesForm && forms.getTextUpdatesForm.values) ? forms.getTextUpdatesForm.values : null;
  return {
    cqContent,
    ...asyncCallStatus,
    billingInfo: data.billingInfo,
    devices: data.devices,
    plans: data.plans,
    taxes: data.taxes,
    shipping: data.selectedShippingType,
    dueMonthly: data.totalDueMonthlyPlanAndDevice,
    dueToday: data.totalDueToday,
    isBTA: data.billingInfo.selectedPaymentMode.toLowerCase() === 'bta',
    cartDetailURL: data.cartDetailURL,
    accessories: data.dueTodayView && data.dueTodayView.accessories,
    accessoriesBundle: data.dueTodayView && data.dueTodayView.accessoriesBundle,
    standaloneAccessories: data.standaloneAccessories,
    submitOrderURL: data.submitOrderURL,
    ...getTextUpdatesForm,
    tradeInDetails: data.transformedTradeInPromoDetails,
    subtotalDueToday: data.subtotalDueToday,
    totalUpgradeFee: data.totalUpgradeFee,
    totalOrderTax: data.totalOrderTax,
    totalOrderTaxTooltip: data.totalOrderTaxTooltip,
    flow: data.flow,
    comboOrder: data.comboOrder,
    cpcOrder: data.cpcOrder,
    depositAmount: data.depositAmount,
    showPlanCost: !data.itemOnJaxPlan,
    showGiftCards: data.giftCardsEnabled && data.giftCardsUsed > 0,
    giftCardList: data.billingInfo.giftCardList,
    buddyUpgrade,
    orderId,
    showDeliveryMethod: data.checkoutStates.showDeliveryMethod,
    displayUpgradeFee: data.displayUpgradeFee,
    hllplan: data.isHLLPlanInOrder,
    totalDueMonthlyPlanAndDevice: data.totalDueMonthlyPlanAndDevice,
    notification,
    checkoutStates: data.checkoutStates,
    addressInfo: data.shippingInfo.addressInfo,
    ispuSelected,
    accountLevelDiscountVOList: data.accountLevelDiscountList,
    bicRepresentationChangeEnabled: data.bicRepresentationChangeEnabled,
    instantCreditDetails: data.instantCreditDetails,
    npanxxError: npanxxErrorIndex && npanxxErrorIndex < 0,
    marketTradeInDevices: (data.transformedTradeInPromoDetails && data.transformedTradeInPromoDetails.tradeInDevices ? data.transformedTradeInPromoDetails.tradeInDevices.filter((device) => !device.bicApplied) : []),
    totalSurcharges: data.totalSurcharges,
    plansTotalLAC: !data.isHLLPlanInOrder && !data.plans && data.plans.totalLineAccessCharges,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
