import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChoosePaymentMethod from '../../components/payment/choosePaymentMethod';
import * as actionCreators from '../../actions';
import * as notificationActions from '../../../common/NotificationBar/actions';
import { EDIT_STATE } from '../../constants';

// Build an array with Payment options to be shown
const getPaymentOptions = (cqContent, billingInfo, selectedShippingType, showApplePay, showPaypal, showMasterpass) => {
  const paymentOpts = [];

  // add BTA as payment option if available
  if (billingInfo.billToAccountEligible === true) {
    paymentOpts.push({ paymentType: 'BTA' });
  }

  // Add ApplePay option
  if (showApplePay) {
    paymentOpts.push({ paymentType: 'applepay' });
  }

  // Add PayPal overlay option
  if (showPaypal) {
    paymentOpts.push({ paymentType: 'paypal' });
  }

  // Add Masterpass option
  if (showMasterpass && window.masterpass) {
    paymentOpts.push({ paymentType: 'masterpass' });
  }
  // add option for saved payments
  if (billingInfo.savedCardInfo.length > 0) {
    paymentOpts.push({ paymentType: 'savedcard' });
  }

  // add option for newCard
  paymentOpts.push({ paymentType: 'newcard' });

  return paymentOpts;
};

// This will retrieve the selected payment mode in the billing info node, NOT the redux form.
const getOrderSelectedPaymentMode = (paymentOptions, billingInfo, checkoutStates) => {
  let selectedOptIndex = -1;
  const selectedPaymentMode = billingInfo.selectedPaymentMode ? billingInfo.selectedPaymentMode.toString().toLowerCase() : '';
  if (checkoutStates.paymentRequired === true) {
    selectedOptIndex = -1;
  } else {
    selectedOptIndex = paymentOptions.findIndex((option) => (option.paymentType.toString().toLowerCase() === selectedPaymentMode));
  }
  return (selectedOptIndex < 0 ? null : paymentOptions[selectedOptIndex].paymentType);
};

// Function to build tagging string for payment options.
const getTestVersion = (bta, paypal, applepay, masterpass) => {
  const taggingArray = [];
  if (bta === true) {
    taggingArray.push('BTA');
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
  taggingArray.push('play akka version');
  return taggingArray.toString();
};

const getGiftCards = (giftCardsLimit, formData, dueToday) => {
  const giftCardList = [];
  let giftCardAppliedValue = 0;
  for (let index = 1; giftCardsLimit >= index; index++) {
    if (formData[`giftCardCheckbox_${index}`] && formData[`giftCardNumber_${index}`] && formData[`giftCardPin_${index}`] && formData[`amountToApply_${index}`]) {
      giftCardAppliedValue += parseFloat(formData[`amountToApply_${index}`]);
      giftCardList.push({
        giftCard: formData[`giftCardNumber_${index}`],
        pin: formData[`giftCardPin_${index}`],
        amountApplied: parseFloat(formData[`amountToApply_${index}`]),
        isEncrypted: formData[`isEncrypted_${index}`],
        lastDigits: formData[`lastDigits_${index}`],
      });
    }
  }
  return {
    giftCardList,
    giftCardTotalExceedsDueToday: giftCardAppliedValue > dueToday,
  };
};


function mapStateToProps(state) {
  // Getting Data from store
  const data = state.get('orderDetails').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const cqContent = state.get('cqContent').toJS();
  const forms = state.get('form').toJS();
  const giftCardForm = (forms.giftCardsForm && forms.giftCardsForm.values ? forms.giftCardsForm.values : {});
  const editState = state.get('editState').toJS();

  // Apple Pay Checks
  const applePayAvailable = state.get('applePayAvailable');
  const showApplePay = (data.applePayEnabled === true && applePayAvailable === true && data.checkoutStates.pastDuePaymentRequired !== true);

  // Generating Payment Options
  const paymentOptions = getPaymentOptions(cqContent, data.billingInfo, selectedShippingOption, showApplePay, data.payPalEnabled, data.masterpassEnabled);

  // Getting Selected Data
  const selectedRadioButton = (forms.choosePaymentMethod && forms.choosePaymentMethod.values && forms.choosePaymentMethod.values.paymentRadio ? forms.choosePaymentMethod.values.paymentRadio : '');
  const selectedShippingOption = (data && data.selectedShippingType && data.selectedShippingType.type) ? data.selectedShippingType.type : '';
  const orderSelectedPaymentMode = getOrderSelectedPaymentMode(paymentOptions, data.billingInfo, data.checkoutStates);
  const initSavedCardIndex = data.billingInfo.savedCardInfo.findIndex((card) => card.preselectCard === true);
  const selectedSavedCardIndex = forms.choosePaymentMethod && forms.choosePaymentMethod.values && forms.choosePaymentMethod.values.savedCard ? parseInt(forms.choosePaymentMethod.values.savedCard, 10) : 0;
  const cyberSourceData = state.get('cyberSourceData') && Object.keys(state.get('cyberSourceData')).length ? state.get('cyberSourceData').toJS() : {};

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
    ...asyncCallStatus,
    paymentRequired: data.checkoutStates.paymentRequired,
    testVersion: getTestVersion(data.billingInfo.billToAccountEligible, data.payPalEnabled, showApplePay, data.masterpassEnabled),
    masterpassError: data.billingInfo.masterpassError,
    masterpass3DSecure: data.billingInfo.masterpass3DSecure,
    asyncCallStatus,
    authInfo: data.authInfo,
    showGiftCard: (selectedRadioButton === 'newcard' || selectedRadioButton === 'savedcard') && data.giftCardsEnabled && selectedShippingOption !== 'ISPU',
    showAddCard: selectedRadioButton === 'newcard' && editState[EDIT_STATE.PAYMENT],
    showCVV: selectedRadioButton === 'savedcard' && editState[EDIT_STATE.PAYMENT] && (data.billingInfo.savedCardInfo[(selectedSavedCardIndex)].cvvNeeded || data.checkoutStates.cvvNeeded),
    savedCards: data.billingInfo.savedCardInfo,
    initialValues: {
      paymentRadio: orderSelectedPaymentMode,
      savedCard: ((initSavedCardIndex >= 0) ? initSavedCardIndex : 0),
    },
    billingInfo: data.billingInfo,
    pieEnabled: data.pieEnabled,
    editState,
    forms,
    selectedRadioButton,
    orderSelectedPaymentMode,
    initSavedCardIndex,
    selectedSavedCardIndex,
    masterpassConfigInfo: data.masterpassConfigInfo,
    ...getGiftCards(data.giftCardsLimit, giftCardForm, data.dueToday),
    paypalFlowCompleted: data.billingInfo.paypalEmailAddress !== null,
    masterpassFlowCompleted: !data.billingInfo.masterpassError && data.billingInfo.masterpassResponseInfo && data.billingInfo.masterpassResponseInfo.lastDigits && data.billingInfo.masterpassResponseInfo.cardType,
    stepsCompleted: data.stepsCompleted,
    cyberSourceData: cyberSourceData.data ? cyberSourceData.data.output : '',
    cybersourecPreAuthFailure: data.billingInfo.cybersourecPreAuthFailure,
    cybersourecPreAuthFailureErrorMessage: data.billingInfo.cybersourecPreAuthFailureErrorMessage,
    orderId: data.orderId,
    isAgentSite: window.isAgentSite,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...notificationActions, ...actionCreators }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePaymentMethod);
