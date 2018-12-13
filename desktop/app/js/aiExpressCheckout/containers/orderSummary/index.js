import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OrderSummary from '../../components/orderSummary';
import * as actionCreators from '../../actions';
import * as NotificationActions from '../../../common/NotificationBar/actions';

import { EDIT_STATE } from '../../constants';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const buddyUpgrade = data.devices.buddyUpgrade;
  const orderId = data.orderId;
  const editState = state.get('editState').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const forms = state.get('form').toJS();
  const npanxxErrorIndex = data.deviceConfigInfo.devices.findIndex((device) => ((device.flow === 'AAL' || device.flow === 'NSO') && !(device.npaNxxnumber !== null || (device.npnxxCustomerSelection === 'transfer' && device.portInDetails && device.portInDetails.existingNumber))));
  const notification = state.get('notification');
  const ispuSelected = data.selectedShippingType && data.selectedShippingType.type === 'ISPU';

  const termsCompleted = ((forms.agreementForm && !forms.agreementForm.syncErrors) || data.standaloneAccessories);
  const shippingValid = (
    (ispuSelected || (
      !data.checkoutStates.poBoxShippingAddress &&
      !data.checkoutStates.shippingAddressValidationError
    )) &&
    !data.checkoutStates.shippingAddressChangeRequired &&
    !data.checkoutStates.shippingAddressRequired &&
    !data.checkoutStates.shippingMethodRequired &&
    !data.checkoutStates.contactInfoRequired
  );
  const shippingCompleted = (
    (!data.checkoutStates.showDeliveryMethod || (forms.chooseShippingMethod && forms.chooseShippingMethod.values && forms.chooseShippingMethod.values.shippingRadio)) &&
    shippingValid &&
    !editState[EDIT_STATE.SHIPPING]
  );
  const deliveryCompleted = (!editState[EDIT_STATE.DELIVERY]);
  const paymentCompleted = (!data.checkoutStates.paymentRequired && !editState[EDIT_STATE.PAYMENT]);
  const devicesCompleted = data.deviceConfigInfo.devices.every((device, index) => (!editState[EDIT_STATE.DEVICE + index]));
  const serviceAddressCompleted = data.deviceConfigInfo.devices.every((device, index) => (!editState[EDIT_STATE.SERVICE + index]));
  const checkoutEnabled = (shippingCompleted && paymentCompleted && devicesCompleted && serviceAddressCompleted && deliveryCompleted);

  const getTextUpdatesForm = (forms.getTextUpdatesForm && forms.getTextUpdatesForm.values) ? forms.getTextUpdatesForm.values : null;
  const edgeTermsAndCondition = (data.termsAndConditionsInfo && data.termsAndConditionsInfo.edgeTerms && data.termsAndConditionsInfo.edgeTerms.length > 0) ? data.termsAndConditionsInfo.edgeTerms.map((item) => item.edgeTermsAndCondition) : null;

  return {
    cqContent,
    ...asyncCallStatus,
    asyncCallStatus,
    editState,
    billingInfo: data.billingInfo,
    checkoutEnabled,
    plansTotalLAC: !data.isHLLPlanInOrder && data.plans && data.plans.totalLineAccessCharges,
    devices: data.devices,
    plans: data.plans,
    taxes: data.taxes,
    shipping: data.selectedShippingType,
    dueMonthly: data.totalDueMonthlyPlanAndDevice,
    dueToday: data.dueToday,
    isBTA: data.billingInfo.selectedPaymentMode.toLowerCase() === 'bta',
    cartDetailURL: data.cartDetailURL,
    accessories: data.dueTodayView && data.dueTodayView.accessories,
    accessoriesBundle: data.dueTodayView && data.dueTodayView.accessoriesBundle,
    standaloneAccessories: data.standaloneAccessories,
    submitAIOrderURL: data.submitAIOrderURL,
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
    termsCompleted,
    shippingCompleted,
    paymentCompleted,
    devicesCompleted,
    serviceAddressCompleted,
    deliveryCompleted,
    notification,
    checkoutStates: data.checkoutStates,
    addressInfo: data.shippingInfo.addressInfo,
    ispuSelected,
    accountLevelDiscountVOList: data.accountLevelDiscountList,
    bicRepresentationChangeEnabled: data.bicRepresentationChangeEnabled,
    instantCreditDetails: data.instantCreditDetails,
    npanxxError: npanxxErrorIndex && npanxxErrorIndex < 0,
    shippingValid,
    marketTradeInDevices: (data.transformedTradeInPromoDetails && data.transformedTradeInPromoDetails.tradeInDevices ? data.transformedTradeInPromoDetails.tradeInDevices.filter((device) => !device.bicApplied) : []),
    totalSurcharges: data.totalSurcharges,
    taxTooltipDisclaimer: data.taxTooltipDisclaimer,
    termsAndConditionsInfo: data.termsAndConditionsInfo,
    edgeTermsAndCondition,
    dppInOrder: data.dppInOrder,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
