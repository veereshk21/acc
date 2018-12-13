import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomePage from '../components/index';
import * as actionCreators from '../actions';

import * as NotificationActions from '../../common/NotificationBar/actions';


const getPaymentInfo = (checkoutStates, billingInfo) => {
  let paymentMethod = null;
  const paymentMode = billingInfo.selectedPaymentMode.toString().toLocaleLowerCase();
  if (checkoutStates.paymentRequired === false) {
    if (paymentMode === 'bta') {
      paymentMethod = 'Bill to account';
    } else if (paymentMode === 'applepay') {
      const applePaymentInfo = billingInfo.applePayResponseInfo || {};
      const appleNetWork = (typeof applePaymentInfo.displayName !== 'undefined') ? applePaymentInfo.displayName : '';
      const appleEmail = (typeof applePaymentInfo.emailAddress !== 'undefined') ? applePaymentInfo.emailAddress : '';
      paymentMethod = `<div class='apple-pay-button apple-pay-button-white-with-line apple-pay-button-logo'></div><br/>${appleNetWork}<br/>${appleEmail}`;
    } else if (paymentMode === 'paypal') {
      paymentMethod = `<div><img src='https://ss7.vzw.com/is/image/VerizonWireless/paypal_horiz_logo?$cpo$' height='12px' /><br/></div>${billingInfo.paypalEmailAddress}`;
    } else if (paymentMode === 'masterpass') {
      paymentMethod = `<div class='height30 positionRelative'>
      <div class='positionAbsolute' style='top: -10px; right: 0;'>
        <img src='https://static.masterpass.com/dyn/img/acc/global/mp_mark_hor_blk.svg' height='16px' />
        <p>${billingInfo.masterpassResponseInfo.cardType} (****${billingInfo.masterpassResponseInfo.lastDigits} )</p>
        <p>${billingInfo.masterpassResponseInfo.emailAddress}</p>
      </div>
      </div>`;
    } else if (paymentMode === 'savedcard') {
      // eslint-disable-next-line consistent-return
      billingInfo.savedCardInfo.forEach((savedCard) => {
        if (savedCard.preselectCard === true) {
          paymentMethod = savedCard.savedCardNickName.toString();
          return true;
        }
      });
    } else if (paymentMode === 'newcard') {
      paymentMethod = billingInfo.creditCardInfo.creditCardNumber;
      if (paymentMethod) paymentMethod.toString();
    }
  }

  return paymentMethod;
};

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');

  if (!data.devices) {
    window.location.href = '/#genericError';
    return {};
  }
  const _inlineAccessories = (data.devices.accessories || []);
  const _inlineBundle = (data.devices.accessoriesBundle || []);
  const _accessories = (data.accessories || []);
  const _accBundle = (data.accessoriesBundle || []);

  const testVersion = 'play akka version';
  if (window.vzwDL && window.vzwDL.page && window.vzwDL.page.testVersion !== testVersion) {
    window.vzwDL.page.testVersion = testVersion;
  }

  return {
    accessories: data.standaloneAccessories ? [..._accessories] : [..._accessories, ..._inlineAccessories],
    accessoriesBundle: data.standaloneAccessories ? [..._accBundle] : [..._inlineBundle, ..._accBundle],
    flow: data.flow,
    payPalEnabled: data.payPalEnabled,
    deviceConfigInfo: data.deviceConfigInfo,
    checkoutStates: data.checkoutStates,
    devices: data.devices,
    shippingInfo: data.shippingInfo,
    selectedShippingType: data.selectedShippingType,
    paymentInfo: getPaymentInfo(data.checkoutStates, data.billingInfo),
    billingInfo: data.billingInfo,
    dueToday: data.dueToday,
    dueMonthly: data.totalDueMonthlyPlanAndDevice,
    pastDueAmount: data.pastDueAmount,
    pastDueExist: data.pastDueExist,
    pastDueAmountPaid: data.pastDueAmountPaid,
    termsAndConditionsInfo: data.termsAndConditionsInfo,
    tradeInPromoDetails: data.tradeInPromoDetails,
    transformedTradeInPromoDetails: (typeof data.transformedTradeInPromoDetails !== 'undefined') ? data.transformedTradeInPromoDetails : null,
    cartDetailURL: data.cartDetailURL,
    totalActivationFee: data.totalActivationFee,
    standaloneAccessories: data.standaloneAccessories,
    appleMerchantIdentifier: !!data.appleMerchantIdentifier && data.appleMerchantIdentifier,
    cqContent,
    comboOrder: data.comboOrder,
    cpcOrder: data.cpcOrder,
    lineLevelOpted: data.isHLLPlanInOrder,
    submitOrderURL: data.submitOrderURL,
    plans: data.plans,
    ...asyncCallStatus,
    subtitle: data.mainViewSubTitle,
    titleMonthly: data.dueMonthlyView && data.dueMonthlyView.title,
    titleToday: data.dueTodayView && data.dueTodayView.title,
    tradeInCredit: data.tradeInPromoDetails ? data.tradeInPromoDetails.price : null, // TODO: Change to data.tradeInPromoDetails.tradeInCredit when backend changes are done,
    planDueMonthly: data.cpcOrder,
    itemOnJaxPlan: data.itemOnJaxPlan,
    tmpMdOpted: data.tmpMdOpted,
    giftCardsEnabled: data.giftCardsEnabled,
    giftCardsLimit: data.giftCardsLimit,
    giftCardsUsed: data.giftCardsUsed,
    balanceCreditCardAmount: data.balanceCreditCardAmount,
    totalGiftCardAmount: data.totalGiftCardAmount,
    flipIspuToShipping: (typeof data.flipIspuToShipping !== 'undefined') ? data.flipIspuToShipping : false,
    showShippingAddress: (typeof data.checkoutStates.showShippingAddress !== 'undefined') ? data.checkoutStates.showShippingAddress : true,
    showPaymentSection: (typeof data.checkoutStates.showPaymentSection !== 'undefined') ? data.checkoutStates.showPaymentSection : true,
    showDeliveryMethod: (typeof data.checkoutStates.showDeliveryMethod !== 'undefined') ? data.checkoutStates.showDeliveryMethod : true,
    instantCreditOrder: data.checkoutStates && data.checkoutStates.instantCreditOrder,
    totalInstantCredit: data.instantCreditDetails && data.instantCreditDetails.totalInstantCredit,
    instantCreditAllocationsChanged: state.get('instantCreditAllocationsChanged'),
    bicRepresentationChangeEnabled: data.bicRepresentationChangeEnabled,
    promoTradeInOrder: !!(data.transformedTradeInPromoDetails && data.transformedTradeInPromoDetails.tradeInDevices && data.transformedTradeInPromoDetails.tradeInDevices.find((tradeItem) => tradeItem.bicApplied)),
    isTradeInEnabled: (window.siteId && typeof (data.enableTradeInForAgent) !== 'undefined') ? data.enableTradeInForAgent === true : true,
    showVendorShippingMethod: (typeof data.shippingInfo.vendorShippingOptionExists !== 'undefined') ? data.shippingInfo.vendorShippingOptionExists : false,
    selectedVendorShippingType: data.selectedVendorShippingType ? data.selectedVendorShippingType : null,

    isAgentSite: window.isAgentSite,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actionCreators, NotificationActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
