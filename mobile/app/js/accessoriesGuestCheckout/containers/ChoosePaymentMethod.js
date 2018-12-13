import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChoosePaymentMethod from '../components/ChoosePaymentMethod';
import * as actionCreators from '../actions';


const getPaymentOptions = (cqContent, billingInfo, selectedShippingType, giftCardFlow, showDigitalWallet) => {
  const paymentOpts = [];

  // add BTA as payment option if available
  if (billingInfo.billToAccountEligible === true && !giftCardFlow) {
    paymentOpts.push({ paymentType: 'BTA' });
  }
  // add saved cards as payment options if available
  if (billingInfo.savedCardInfo.length > 0) {
    billingInfo.savedCardInfo.forEach((savedCard) => {
      paymentOpts.push({ paymentType: 'savedcard', ...savedCard });
    });
  }
  // add newly added credit card as payment options if available
  if (billingInfo.selectedPaymentMode && billingInfo.selectedPaymentMode.toString().toLowerCase() === 'newcard' && billingInfo.creditCardInfo.creditCardNumber) {
    paymentOpts.push({ paymentType: 'newcard', ...billingInfo.creditCardInfo });
  }

  // Add Digital wallet overlay option
  if (showDigitalWallet) {
    paymentOpts.push({ paymentType: 'digitalwallet' });
  }
  paymentOpts.push({ paymentType: 'addcard' });

  return paymentOpts;
};

const getSelectedPaymentIndex = (paymentOptions, billingInfo, checkoutStates) => {
  let selectedOptIndex = 1;// BTA as default. If BTa is not there it will match with one of other options i.e. saved cards / credit cards
  const selectedPaymentMode = billingInfo.selectedPaymentMode ? billingInfo.selectedPaymentMode.toString().toLowerCase() : '';
  if (checkoutStates.paymentRequired === true) {
    selectedOptIndex = -1;
  } else if (selectedPaymentMode === 'savedcard' && billingInfo.savedCardInfo.length > 0) {
    selectedOptIndex = paymentOptions.findIndex((option) => (option.paymentType.toString().toLowerCase() === selectedPaymentMode && option.preselectCard === true));
  } else if (selectedPaymentMode === 'applepay' || selectedPaymentMode === 'paypal' || selectedPaymentMode === 'masterpass' || selectedPaymentMode === 'visacheckout') {
    selectedOptIndex = paymentOptions.findIndex((option) => (option.paymentType.toString().toLowerCase() === 'digitalwallet'));
  } else {
    selectedOptIndex = paymentOptions.findIndex((option) => (option.paymentType.toString().toLowerCase() === selectedPaymentMode));
  }

  return selectedOptIndex;
};

function mapStateToProps(state, ownProps) {
  const data = state.get('orderDetails').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const cqContent = state.get('cqContent').toJS();

  const selectedShippingOption = (data && data.selectedShippingType && data.selectedShippingType.type) ? data.selectedShippingType.type : '';
  const giftCardFlow = ownProps.match.params.type === 'giftCard';
  const applePayAvailable = state.get('applePayAvailable');

  const showApplePay = (data.applePayEnabled === true && applePayAvailable === true && data.checkoutStates.pastDuePaymentRequired !== true);
  const showDigitalWallet = (showApplePay || data.payPalEnabled || data.masterpassEnabled) && !giftCardFlow;
  const paymentOptions = getPaymentOptions(cqContent, data.billingInfo, selectedShippingOption, giftCardFlow, showDigitalWallet);
  const selectedPaymentOptInd = getSelectedPaymentIndex(paymentOptions, data.billingInfo, data.checkoutStates);

  // Function to build tagging string for payment options.
  const getTestVersion = (bta, paypal, applepay, masterpass) => {
    const taggingArray = [];
    if (bta === true) {
      taggingArray.push('mobile:1click:BTA');
    }
    if (paypal === true) {
      taggingArray.push('paypal offered');
    }
    if (applepay === true) {
      taggingArray.push('apple pay offered');
    }
    if (masterpass === true) {
      taggingArray.push('masterpass offered');
    }
    return taggingArray.toString();
  };
  return {
    cqContent,
    pastDuePaymentRequired: data.checkoutStates.pastDuePaymentRequired,
    checkoutStates: data.checkoutStates,
    pastDueAmount: data.pastDueAmount,
    selectedShippingType: data.selectedShippingType,
    dueToday: data.dueToday,
    applePayEnabled: (data.applePayEnabled) ? data.applePayEnabled : false,
    applePaymentRequest: (data.applePaymentRequest) ? data.applePaymentRequest : {},
    appleMerchantIdentifier: (data.appleMerchantIdentifier) ? data.appleMerchantIdentifier : '',
    paymentOptions,
    selectedPaymentOptInd,
    ...asyncCallStatus,
    paymentRequired: data.checkoutStates.paymentRequired,
    giftCardFlow,
    testVersion: getTestVersion(data.billingInfo.billToAccountEligible, data.payPalEnabled, data.applePayEnabled, data.masterpassEnabled),
    showPaypal: data.payPalEnabled,
    showApplePay,
    showMasterpass: data.masterpassEnabled,
    showVisaCheckout: false,
    showDigitalWallet,
    masterpassError: data.billingInfo.masterpassError,
    masterpass3DSecure: data.billingInfo.masterpass3DSecure,
    masterpassResponseInfo: data.billingInfo.masterpass3DSecure,
    authInfo: data.authInfo,
    stepsCompleted: data.stepsCompleted,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePaymentMethod);
