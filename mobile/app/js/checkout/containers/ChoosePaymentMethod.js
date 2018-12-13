import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChoosePaymentMethod from '../components/ChoosePaymentMethod';
import * as actionCreators from '../actions';
import { paymentTagging } from '../helper';


const getPaymentOptions = (cqContent, billingInfo, isApplePaymentEnabled, isPastDuePaymentRequired, isPayPalEnabled, isStandaloneAccessory, applePayAvailable, selectedShippingType, giftCardFlow) => {
  const paymentOpts = [];
  // add BTA as payment option if available
  if (billingInfo.billToAccountEligible === true && !giftCardFlow) {
    paymentOpts.push({ paymentType: 'BTA' });
  }
  // add applePay as payment option if apple session supported by browser and active cards are added to browser wallet
  if (selectedShippingType !== 'ISPU' && isApplePaymentEnabled === true && applePayAvailable === true && isPastDuePaymentRequired !== true && !giftCardFlow) {
    paymentOpts.push({ paymentType: 'applepay' });
  }
  // add paypal payment options
  if (isPayPalEnabled === true && !giftCardFlow) {
    paymentOpts.push({ paymentType: 'PAYPAL' });
  }
  // add saved cards as payment options if available
  if (billingInfo.savedCardInfo.length > 0) {
    billingInfo.savedCardInfo.forEach((savedCard) => {
      paymentOpts.push({ paymentType: 'savedcard', ...savedCard });
    });
  }
  // add newly added credit card as payment options if available
  if (billingInfo.selectedPaymentMode.toString().toLowerCase() === 'newcard' && billingInfo.creditCardInfo.creditCardNumber) {
    paymentOpts.push({ paymentType: 'newcard', ...billingInfo.creditCardInfo });
  }
  paymentOpts.push({ paymentType: 'addcard' });
  return paymentOpts;
};

const getSelectedPaymentIndex = (paymentOptions, billingInfo, checkoutStates) => {
  let selectedOptIndex = 0;// BTA as default. If BTa is not there it will match with one of other options i.e. saved cards / credit cards
  let defaultedPaymentIndex = false;
  const selectedPaymentMode = billingInfo.selectedPaymentMode.toString().toLowerCase();
  if (checkoutStates.paymentRequired === true) {
    selectedOptIndex = 0;
  } else if (selectedPaymentMode === 'savedcard' && billingInfo.savedCardInfo.length > 0) {
    selectedOptIndex = paymentOptions.findIndex((option) => (option.paymentType.toString().toLowerCase() === selectedPaymentMode && option.preselectCard === true));
  } else {
    selectedOptIndex = paymentOptions.findIndex((option) => (option.paymentType.toString().toLowerCase() === selectedPaymentMode));
  }
  if (selectedOptIndex < 0) {
    selectedOptIndex = 0;
    defaultedPaymentIndex = true;
  }
  return { selectedPaymentOptInd: selectedOptIndex, defaultedPaymentIndex };
};

function mapStateToProps(state, ownProps) {
  const data = state.get('orderDetails').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const cqContent = state.get('cqContent').toJS();
  const applePayAvailable = state.get('applePayAvailable');
  /* data.applePayEnabled = true;
  data.appleMerchantIdentifier = 'merchant.com.vzw.test';
  data.applePaymentRequest = {
    "totalAmount": "24.00",
    "orderTotalLabel": "PAY VERIZON (TOTAL PENDING)",
    "showAvailableShippingOptions": false,
    "lineItems": [
      {
        "label": "PAYMENT NOT PROCESSED UNTIL WE VERIFY YOUR ORDER",
        "amount": "0.00",
        "type": "pending"
      }
    ],
    "requestBillingInfoFromApple": ['postalAddress'],
    "requestShippingInfoFromApple": ['email']
  }; */
  const selectedShippingOption = (data && data.selectedShippingType && data.selectedShippingType.type) ? data.selectedShippingType.type : '';
  const giftCardFlow = ownProps.match.params.type === 'giftCard';
  const paymentOptions = getPaymentOptions(cqContent, data.billingInfo, data.applePayEnabled, data.checkoutStates.pastDuePaymentRequired, data.payPalEnabled, data.standaloneAccessories, applePayAvailable, selectedShippingOption, giftCardFlow);
  const selectedPaymentOptInd = getSelectedPaymentIndex(paymentOptions, data.billingInfo, data.checkoutStates);
  const showApplePay = (data.applePayEnabled === true && applePayAvailable === true && data.checkoutStates.pastDuePaymentRequired !== true);

  paymentTagging(
    null,
    data.payPalEnabled,
    showApplePay,
    data.masterpassEnabled,
  );
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
    ...selectedPaymentOptInd,
    ...asyncCallStatus,
    paymentRequired: data.checkoutStates.paymentRequired,
    giftCardFlow,
    authInfo: data.authInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePaymentMethod);
