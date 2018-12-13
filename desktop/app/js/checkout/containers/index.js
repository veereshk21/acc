import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomePage from '../components/index';
import * as actionCreators from '../actions';
import { EDIT_STATE } from '../constants';

import * as NotificationActions from '../../common/NotificationBar/actions';

const tagging = (payment, sdd, bta, paypal, applepay, masterpass) => {
  // Build tagging string for payment options.

  const taggingArray = [];
  let testVersion = 'play akka version';

  if (sdd) {
    taggingArray.push('sdd offered');
  }
  if (payment) {
    if (bta) {
      taggingArray.push('bta offered');
    }
    if (paypal) {
      taggingArray.push('paypal offered');
    }
    if (applepay) {
      taggingArray.push('apple pay offered');
    }
    if (masterpass) {
      taggingArray.push('masterpass offered');
    }
  }
  taggingArray.push('play akka version');
  testVersion = taggingArray.toString();

  if (window.vzwDL && window.vzwDL.page && window.vzwDL.page.testVersion !== testVersion) {
    window.vzwDL.page.testVersion = testVersion;
  }
};

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const forms = state.get('form').toJS();
  const editState = state.get('editState').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  // const forms = state.get('form').toJS();
  const npanxxErrorIndex = data.deviceConfigInfo.devices.findIndex((device) => ((device.flow === 'AAL' || device.flow === 'NSO') && !((device.numberShareDevice) || device.npaNxxnumber !== null || (device.npnxxCustomerSelection === 'transfer' && device.portInDetails && device.portInDetails.existingNumber))));
  if (!data.devices) {
    window.location.href = '/#genericError';
    return {};
  }
  const sddAvailable = !!data.shippingInfo.shippingTypesInfo.find((method) => method.shippingOptionId === 'SDD_SAMEDAY');
  const sddOffered = !editState[EDIT_STATE.SHIPPING] && data.checkoutStates.showDeliveryMethod && sddAvailable;
  const applePayAvailable = state.get('applePayAvailable');
  const applepayOffered = (data.applePayEnabled === true && applePayAvailable === true && data.checkoutStates.pastDuePaymentRequired !== true);

  tagging(
    editState[EDIT_STATE.PAYMENT],
    sddOffered,
    data.billingInfo.billToAccountEligible,
    data.payPalEnabled,
    applepayOffered,
    data.masterpassEnabled,
  );

  const oneClickCheckout = (
    forms.chooseShippingMethod && forms.chooseShippingMethod.values && forms.chooseShippingMethod.values.shippingRadio &&
    !data.checkoutStates.paymentRequired &&
    !data.checkoutStates.shippingAddressChangeRequired &&
    !data.checkoutStates.shippingAddressRequired &&
    !data.checkoutStates.shippingMethodRequired &&
    npanxxErrorIndex < 0 &&
    !data.flipIspuToShipping
  );
  return {
    cqContent,
    ...asyncCallStatus,
    editState,
    billingInfo: data.billingInfo,
    standaloneAccessories: data.standaloneAccessories,
    paymentRequired: data.checkoutStates.paymentRequired,
    shippingAddressRequired: data.checkoutStates.shippingAddressRequired,
    shippingAddressChangeRequired: data.checkoutStates.shippingAddressChangeRequired,
    npanxxError: npanxxErrorIndex >= 0,
    npanxxErrorIndex,
    oneClickCheckout,
    cartDetailURL: data.cartDetailURL,
    genericPromoMessageAI: data.genericPromoMessageAI,
    showPaymentSection: data.checkoutStates.showPaymentSection,
    masterpassError: data.billingInfo.masterpassError,
    flipIspuToShipping: data.flipIspuToShipping ? data.flipIspuToShipping : false,
    checkoutStates: data.checkoutStates,
    eppAccessoryPolicyModal: data.eppAccessoryTermsAndConditionDisplay,
    instantCreditAllocationsChanged: state.get('instantCreditAllocationsChanged'),
    selectedShippingType: data.selectedShippingType,
    bannerContent: data.bannerContent,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
