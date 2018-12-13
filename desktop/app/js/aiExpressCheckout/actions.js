import request from 'axios';
import { reset, change, touch } from 'redux-form';
import { hashHistory } from './../store';
import { showErrorNotification, showInfoNotification, hideNotification } from './../common/NotificationBar/actions';
import { getErrorMap } from './../common/Helpers';

import {
  API_SUCCESS_CODE,
  RESET_STATE,
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_INVALIDATE,
  STORE_LIST,
  MARKER_SELECTED,
  STORE_SELECTED,
  MAP_CLICKED,
  AGREEMENT_CLICKED,
  APPLE_PAY,
  FETCH_TRADE_IN_AGREEMENT,
  UPDATE_EDIT_STATE,
  EDIT_STATE,
  NOTIFICATIONS,
  RESET_ZIPCODE_INFO,
  ISPU_CLEAR_STORES_PAGENUM,
  ISPU_SHOW_MORE_STORES,
  ISPU_PAGE_INCREASE,
  ISPU_PAGE_DECREASE,
  ISPU_UPDATE_LAT_LNG,
  ISPU_HIDE_SHOW_MORE_BUTTON,
  ISPU_UPDATE_NEXT_URL,
  HIDE_INSTANT_CREDIT_UPDATED,
  RESET_PROTECTION_STATE,
  SHOW_PROTECTION_MODAL,
} from './constants';

const scrollProps = { block: 'start', inline: 'nearest', behavior: 'smooth' };

/* *
 * Action sets a loader to be shown on page
 * */
export const asyncFetch = () => ({
  type: ASYNC_FETCH,
});
/* *
 * Action clears the loader on the page.
 * */
export const asyncFetchSucess = (data = {}) => ({
  type: ASYNC_FETCH_SUCCESS,
  data,
});

/* *
 * Action displays API error on the page.
 * */
const asyncFetchFalied = () => ({
  type: ASYNC_FETCH_FAILURE,
});
/* *
 * Action clears the loader and also data in data node.
 * */
export const invalidateAsyncFetch = () => ({
  type: ASYNC_FETCH_INVALIDATE,
});

/* *
 * Action clears the loader and also data in data node.
 * */
export const updateEditState = (section, value) => ({
  type: UPDATE_EDIT_STATE,
  data: { section, value },
});

function resetState(data) {
  return {
    type: RESET_STATE,
    data,
  };
}

export const disableISPU = () => (dispatch, getState) => {
  const state = getState().toJS();
  const { orderDetails } = state;
  if (orderDetails && orderDetails.shippingInfo) {
    orderDetails.shippingInfo.ispuEligibleFlag = false;
  }
  dispatch(resetState(orderDetails));
};

function resetProtection(data) {
  return {
    type: RESET_PROTECTION_STATE,
    data,
  };
}

export function showProtectionModal(status) {
  return {
    type: SHOW_PROTECTION_MODAL,
    status,
  };
}


/**
 * Service call to Change the Protection item.
 * */

function protectionRemoveAPI(reqData, orderId, url) {
  /** *TODO: Replace with actual item service */
  return request({
    method: 'post',
    url,
    data: reqData,
  });
}


export const protectionRemove = (obj, url) => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState().toJS();
  const { orderId } = state.orderDetails;
  protectionRemoveAPI(obj, orderId, url).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(resetProtection(response.data.output));
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
    dispatch(asyncFetchSucess());
  }).catch((err) => {
    console.log(err); // eslint-disable-line no-console
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
  });
};

/**
 * Service call to Change the Protection item.
 * */

function protectionChangeAPI(reqData, orderId, url) {
  /** *TODO: Replace with actual item service */
  return request({
    method: 'post',
    url,
    data: reqData,
  });
}


export const protectionChange = (obj, url) => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState().toJS();
  const { orderId } = state.orderDetails;
  protectionChangeAPI(obj, orderId, url).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(resetProtection(response.data));
      dispatch(showProtectionModal(true));
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      dispatch(showProtectionModal(false));
    }
    dispatch(asyncFetchSucess());
  }).catch((err) => {
    console.log(err); // eslint-disable-line no-console
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    dispatch(showProtectionModal(false));
  });
};

/* *
 * Update protection
 * */
function updateProtectionAPI(selectedProtection, reqObj, orderId, url) {
  return request({
    method: 'post',
    url,
    data: reqObj,
  });
}

export const updateProtection = (selectedProtection, obj) => (dispatch, getState) => { // eslint-disable-next-line
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const { orderId } = state.orderDetails;
  // const url = state.orderDetails.updateProtectionURL; // Todo uncomment after demo
  const url = '/od/cust/auth/aiexpresscart/submitProtection'; // Todo Remove after Demo;
  updateProtectionAPI(selectedProtection, obj, orderId, url).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(resetState(response.data.output));// update the page with fresh data
      dispatch(hideNotification());
    } else if (response.data.statusCode !== API_SUCCESS_CODE) {
      if (response.data.output && response.data.output.goToSuccessURL) {
        window.location = response.data.output.goToSuccessURL;
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
    dispatch(asyncFetchSucess());// action to hide loader
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    dispatch(showErrorNotification('Invalid Data')); // Todo with generic msg
    // hashHistory.push('/genericError');
  });
};


/* *
 * Agreement checkbox selection
 * */

export const agreementChecked = (agreementState) => ({
  type: AGREEMENT_CLICKED,
  agreementState,
});


/* *
 * Update shipping address
 * */
function updateShippingAddressAPI(shippingAddress, url) {
  return request({
    method: 'post',
    url,
    data: shippingAddress,
  });
}

export const updateShippingAddress = (shippingAddress, OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.updateShippingInfoURL;

  updateShippingAddressAPI(shippingAddress, url).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      const orderDetails = response.data.output;
      if (orderDetails.shippingInfo.shippingInfoUpdated === true) {
        dispatch(resetState(response.data.output));// update the page with fresh data
        dispatch(hideNotification());
        dispatch(updateEditState(EDIT_STATE.SHIPPING, orderDetails.checkoutStates.contactInfoRequired));
        dispatch(updateEditState(EDIT_STATE.PAYMENT, !!(orderDetails.checkoutStates && orderDetails.checkoutStates.paymentRequired)));
      } else {
        dispatch(showErrorNotification(OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT));
        window.document.getElementById('shippingAddressSection').scrollIntoView(scrollProps);
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      window.document.getElementById('shippingAddressSection').scrollIntoView(scrollProps);
    }
    dispatch(asyncFetchSucess());// action to hide loader
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    dispatch(showErrorNotification('Invalid Data : Internal Server Error')); // Todo with generic msg
    // hashHistory.push('/genericError');
  });
};

/* *
 * Update shipping type
 * */
function updateShippingInfoAPI(shippingInfo, url) {
  return request({
    method: 'post',
    url,
    data: shippingInfo,
  });
}

export const updateShippingInfo = (shippingInfo) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.updateShippingInfoURL;
  updateShippingInfoAPI(shippingInfo, url).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      const orderDetails = response.data.output;
      dispatch(resetState(orderDetails));// update the page with fresh data
      dispatch(updateEditState(EDIT_STATE.SHIPPING, !!(orderDetails.checkoutStates && (orderDetails.checkoutStates.contactInfoRequired))));
      dispatch(updateEditState(EDIT_STATE.PAYMENT, !!(orderDetails.checkoutStates && orderDetails.checkoutStates.paymentRequired)));
      dispatch(updateEditState(EDIT_STATE.PAYMENT, !!(orderDetails.checkoutStates && orderDetails.checkoutStates.shippingMethodRequired)));
      dispatch(hideNotification());
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      window.document.getElementById('shippingMethodSection').scrollIntoView(scrollProps);
    }
    dispatch(asyncFetchSucess());// action to hide loader
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(showErrorNotification('Invalid Data : Internal Server Error')); // Todo with generic msg
    // hashHistory.push('/genericError');
  });
};

/** PieEncription logic
 * @param creditCard: string,
 * @param cvv: number,
 * @param pieEnabled: boolean
 */
const encryptCreditCard = (creditCard, cvv, pieEnabled = false) => {
  // PIE encryption
  let encryptedResult = null;
  const creditCardInfo = {
    creditCard,
    cvv,
    isEncrypted: false,
  };

  if (!pieEnabled) {
    return creditCardInfo;
  }

  if (creditCard && window.ValidatePANChecksum && !window.ValidatePANChecksum(creditCard)) {
    // Checks if creditCard is valid? Else BAU.
    return creditCardInfo;
  }

  encryptedResult = (creditCard && window.ProtectPANandCVV) ? window.ProtectPANandCVV(creditCard, cvv) : null;

  if (encryptedResult !== null) {
    return {
      creditCard: encryptedResult[0],
      cvv: encryptedResult[1],
      isEncrypted: true,
    };
  }

  return creditCardInfo;
};

/** PieEncription logic
 * @param creditCard: string,
 * @param cvv: number,
 * @param pieEnabled: boolean
 */
const encryptGiftCard = (data, pieEnabled = false) => {
  // PIE encryption
  const suffixSTR = 'PSS';
  const giftCardInfo = { ...data };
  if (!(pieEnabled && !giftCardInfo.isEncrypted && window.ProtectString)) {
    return giftCardInfo;
  }
  try {
    const encryptedCardResult = window.ProtectString(giftCardInfo.giftCard);
    const encryptedPinResult = window.ProtectString(giftCardInfo.pin);

    if (encryptedCardResult || encryptedPinResult) {
      giftCardInfo.giftCard = encryptedCardResult[0] + ' ' + window.PIE.key_id + ' ' + window.PIE.phase + ' ' + suffixSTR;
      giftCardInfo.pin = encryptedPinResult[0] + ' ' + window.PIE.key_id + ' ' + window.PIE.phase + ' ' + suffixSTR;
      giftCardInfo.isEncrypted = true;
    } else {
      return giftCardInfo;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Catch Exception:', error);
    return giftCardInfo;
  }
  return giftCardInfo;
};


/* *
 * Add credit/debit card
 * */
const addCardAPI = (cardInfo, isPastDue, updatePaymentInfoURL, pastDueCheckoutURL, pieEnabled, giftCards, cardinalInit) => {
  const { creditCard: encryptedCard, cvv: encryptedCVV, isEncrypted } = encryptCreditCard(cardInfo.card_number, cardInfo.card_cvc, pieEnabled);
  const encryptedGiftCards = [];
  giftCards.map((giftCard) => encryptedGiftCards.push(encryptGiftCard(giftCard, pieEnabled)));

  const requestParams = {
    creditCardNumber: encryptedCard,
    creditCardExpMonth: cardInfo.card_month,
    creditCardExpYear: cardInfo.card_year,
    billingZipCode: cardInfo.card_zip,
    creditCardVerificationNumber: encryptedCVV,
    creditCardType: cardInfo.cardType,
    nickname: '',
    selectedpaymentType: 'newCard',
    isEncrypted,
    cardinalInit,
  };
  if (encryptedGiftCards.length > 0) {
    requestParams.giftCards = encryptedGiftCards;
  }
  // return request({
  //   method: 'get',
  //   url: 'http://www.mocky.io/v2/5a4e974d120000e51924da4d',
  // });

  if (isPastDue) {
    return request({
      method: 'post',
      url: pastDueCheckoutURL,
      data: requestParams,
    });
  }
  return request({
    method: 'post',
    url: updatePaymentInfoURL,
    data: requestParams,
  });
};
export const handleCardinalResponseUrlApi = (data, jwt, url) => request({
  method: 'post',
  url,
  data: { cardinalJWTToken: jwt },
});
export const dispatchErrorNotification = (errMsg) => (dispatch) => {
  dispatch(asyncFetchSucess());
  dispatch(showErrorNotification(errMsg));
};

export const handle3dPaymentValidated = (data, jwt) => (dispatch, getState) => {
  const state = getState().toJS();
  const { handleCardinalResponseURL } = state.orderDetails;

  handleCardinalResponseUrlApi(data, jwt, handleCardinalResponseURL).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(resetState(response.data.output));
      dispatch(updateEditState(EDIT_STATE.PAYMENT, false));
      dispatch(hideNotification());
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    dispatch(showErrorNotification('Invalid Data : Internal Server Error')); // Todo with generic msg
    // hashHistory.push('/genericError');
  });
};

export const addNewCard = (cardInfo, isPastDue, pieEnabled, giftCards, cardinalInit) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const { updatePaymentInfoURL, pastDueCheckoutURL } = state.orderDetails;

  addCardAPI(cardInfo, isPastDue, updatePaymentInfoURL, pastDueCheckoutURL, pieEnabled, giftCards, cardinalInit).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(hideNotification());
      if (response.data.output.cardinal3DSecureResponse && window.Cardinal) {
        window.Cardinal.continue(
          'cca',
          {
            AcsUrl: response.data.output.acsUrl,
            Payload: response.data.output.payload,
          },
          {
            OrderDetails: {
              TransactionId: response.data.output.transId,
            },
          }
        );
      } else {
        dispatch(asyncFetchSucess());
        dispatch(resetState(response.data.output));
        dispatch(updateEditState(EDIT_STATE.PAYMENT, false));
      }
    } else if (response.data.statusCode !== API_SUCCESS_CODE) {
      if ((response.data.output !== null && typeof response.data.output.goToSuccessURL !== 'undefined')) {
        window.location = response.data.output.goToSuccessURL;
      } else {
        dispatch(asyncFetchSucess());
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
        window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
        dispatch(reset('addNewCard'));
        // addPaymentMethodForm.setState({ masked_card_number: '', card_number: '', card_error: '' });
        // TO DO: CLEAR STATE
      }
    } else {
      dispatch(asyncFetchSucess());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
      dispatch(reset('addNewCard'));
      // addPaymentMethodForm.setState({ masked_card_number: '', card_number: '', card_error: '' });
      // TO DO: CLEAR STATE
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(showErrorNotification('Invalid Data : Internal Server Error')); // Todo with generic msg
    // hashHistory.push('/genericError');
  });
};

// const updatePastDuePaymentAPI = (paymentInfo) => {


// };

/* *
 * Choose payment method
 * */
const updatePaymentInfoAPI = (paymentInfo, isPastDue, updatePaymentInfoURL, pastDueCheckoutURL, pieEnabled, giftCards, cardinalInit, cvvRequired) => {
  const encryptedGiftCards = [];
  if (giftCards !== undefined) { giftCards.map((giftCard) => encryptedGiftCards.push(encryptGiftCard(giftCard, pieEnabled))); }

  let requestParams = {};
  if (paymentInfo.paymentType === 'savedcard') {
    if (cvvRequired) {
      const { cvv: encryptedCVV, isEncrypted } = encryptCreditCard(null, paymentInfo.card_cvc, pieEnabled);
      requestParams = {
        creditCardVerificationNumber: encryptedCVV,
        nickname: paymentInfo.savedCardNickName,
        selectedpaymentType: 'savedCard',
        isEncrypted,
        cardinalInit,
      };
    } else {
      requestParams = {
        nickname: paymentInfo.savedCardNickName,
        selectedpaymentType: 'savedCard',
        cardinalInit,
      };
    }
  } else {
    requestParams = {
      selectedpaymentType: 'BTA',
    };
  }
  if (encryptedGiftCards.length > 0) {
    requestParams.giftCards = encryptedGiftCards;
  }
  // return request({
  //   method: 'get',
  //   url: 'http://www.mocky.io/v2/5a4e974d120000e51924da4d',
  // });
  if (isPastDue) {
    return request({
      method: 'post',
      url: pastDueCheckoutURL,
      data: requestParams,
    });
  }
  return request({
    method: 'post',
    url: updatePaymentInfoURL,
    data: requestParams,
  });
};

export const choosePaymentMethod = (paymentInfo, isPastDue, pieEnabled, giftCards, cardinalInit, cvvRequired) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const { updatePaymentInfoURL, pastDueCheckoutURL } = state.orderDetails;
  updatePaymentInfoAPI(paymentInfo, isPastDue, updatePaymentInfoURL, pastDueCheckoutURL, pieEnabled, giftCards, cardinalInit, cvvRequired).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader

    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(hideNotification());
      if (response.data.output.cardinal3DSecureResponse && window.Cardinal) {
        window.Cardinal.continue(
          'cca',
          {
            AcsUrl: response.data.output.acsUrl,
            Payload: response.data.output.payload,
          },
          {
            OrderDetails: {
              TransactionId: response.data.output.transId,
            },
          }
        );
      } else {
        dispatch(asyncFetchSucess());
        dispatch(resetState(response.data.output));// update the page with fresh data
        dispatch(updateEditState(EDIT_STATE.PAYMENT, false));
      }
    } else if (response.data.statusCode !== API_SUCCESS_CODE) {
      if ((response.data.output !== null && typeof response.data.output.goToSuccessURL !== 'undefined')) {
        window.location = response.data.output.goToSuccessURL;
      } else {
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
        /* setTimeout(()=>{
            dispatch(hideNotification());
          }, 5000); */
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    dispatch(showErrorNotification('Invalid Data : Internal Server Error')); // Todo with generic msg
    // hashHistory.push('/genericError');
  });
};
/* *
* Reset state after apple payment processed
* */
export const updateApplePaymentInfo = (responseJSON) => (dispatch) => {
  dispatch(asyncFetch());// action to show loader
  // eslint-disable-next-line no-param-reassign
  responseJSON.showPaymentSuccessMessage = true; // WE NEED TO FIX THIS
  dispatch(resetState(responseJSON)); // update the page with fresh data
  dispatch(asyncFetchSucess());
  dispatch(hideNotification());
  dispatch(updateEditState(EDIT_STATE.PAYMENT, false));
};
export const showApplePayErrorInfo = (errorData) => (dispatch) => {
  if (errorData && errorData.type === 'info') {
    dispatch(showInfoNotification(errorData.message));
  } else if (errorData && errorData.type === 'error') {
    dispatch(showErrorNotification(errorData.message));
    window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
  }
  setTimeout(() => {
    dispatch(hideNotification());
  }, 5000);
};


export const updateServiceAddress = (data, deviceIndex) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.updateDeviceServiceAddressURL;
  postAPI(data, url).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    if (response.data.statusCode === API_SUCCESS_CODE) {
      if (response.data.output.deviceConfigInfo.deviceAddressUpdated === true) {
        dispatch(resetState(response.data.output));// update the page with fresh data
        dispatch(hideNotification());
        dispatch(updateEditState(EDIT_STATE.SERVICE + deviceIndex, false));
      } else {
        dispatch(showErrorNotification(state.cqContent.label.OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT));
        window.document.getElementById('ServiceAddressSection').scrollIntoView(scrollProps);
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      window.document.getElementById('ServiceAddressSection').scrollIntoView(scrollProps);
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
  });
};


/* *
 * Fetch trade-in agreement
 * */

const tradeInAgreementReceived = (agreementText = 'Some text!') => ({
  type: FETCH_TRADE_IN_AGREEMENT,
  agreementText,
});

const fetchTradeInAgreementAPI = () =>
  /* return request({
   method: 'post',
   url: '',
   data: requestParams
   }); */

  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
export const fetchTradeInAgreement = () => (dispatch) => {
  dispatch(asyncFetch());// action to show loader
  fetchTradeInAgreementAPI().then((response) => { // eslint-disable-line consistent-return
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(tradeInAgreementReceived());
      dispatch(asyncFetchSucess());// action to hide loader
      hashHistory.push('/tradeInAgreement');
    } else {
      hashHistory.push('/genericError');
      return false;
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
    dispatch(showErrorNotification('Invalid Data : Internal Server Error')); // Todo with generic msg
    // hashHistory.push('/genericError');
  });
};

/* *
 * Submit order
 * */

export const placeOrder = (submitOrderURL, optInShippingSMS, optInMtn, optInPaperFree) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const shippingMethod = (state.form && state.form.chooseShippingMethod) ? state.form.chooseShippingMethod.values : null;
  if (shippingMethod && shippingMethod.shippingRadio === 'SDD_SAMEDAY' && (!shippingMethod.availWindows || shippingMethod.availWindows === 'title')) {
    dispatch(asyncFetchFalied());
    dispatch(showErrorNotification(state.cqContent.error.DT_OD_CHECKOUT_SDD_MISSING_DELIVERYWINDOW));
    window.document.getElementById('shippingSection').scrollIntoView(scrollProps);
  } else {
    request({
      method: 'post',
      url: submitOrderURL,
      data: {
        optInShippingSMS,
        optInMtn,
        optInPaperFree,
      },
    }).then((response) => {
      if (typeof response.status !== 'undefined' && response.status === 500) {
        dispatch(asyncFetchFalied());
        // The message should come from CQ JSON
        dispatch(showErrorNotification(state.cqContent.error.SPINNER_ERROR_MSG));
      } else {
        dispatch(asyncFetchSucess());// action to hide loader
        if (response.data.statusCode === API_SUCCESS_CODE) {
          window.location = response.data.output.redirectURL;
        } else {
          dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
        }
      }
    }).catch(() => {
      dispatch(hideNotification());
      dispatch(asyncFetchFalied());
      // The message should come from CQ JSON
      dispatch(showErrorNotification(state.cqContent.error.SPINNER_ERROR_MSG));
    });
  }
};

export const cancelOrder = (cancelOrderURL, orderId) => (dispatch, getState) => {
  const state = getState().toJS();
  request({
    method: 'post',
    url: cancelOrderURL,
    data: {
      orderId,
    },
  }).then((response) => {
    if (response.data.statusCode === '00') {
      dispatch(asyncFetchSucess());
      // window.location = response.data.redirectionUrl;
      window.location = window.location.origin;
    }
  }).catch(() => {
    dispatch(hideNotification());
    dispatch(asyncFetchFalied());
    // The message should come from CQ JSON
    dispatch(showErrorNotification(state.cqContent.error.SPINNER_ERROR_MSG));
  });
};

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** *
 * * ** ** ** ** **ISPU Actions* ** ** ** ** ** ** *
 * ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */
const updateStoreList = (storeList, zipCode) => ({
  type: STORE_LIST,
  data: { storeList, zipCode },
});

const fetchStoresNearBy = (zipCode, url, range, latLng, pagination) => {
  const params = {
    zipCode,
    range,
    latitude: latLng.lat,
    longitude: latLng.lng,
    pageNum: pagination,
    requestType: 'A',
  };
  return request({
    method: 'post',
    url,
    data: params,
  });
};

const increasePageNum = () => ({
  type: ISPU_PAGE_INCREASE,
});

const decreasePageNum = () => ({
  type: ISPU_PAGE_DECREASE,
});

const clearStoresAndNum = () => ({
  type: ISPU_CLEAR_STORES_PAGENUM,
});

const updateShowMoreList = (storesList) => ({
  type: ISPU_SHOW_MORE_STORES,
  data: { storesList },
});

const updatelatLng = (latLng) => ({
  type: ISPU_UPDATE_LAT_LNG,
  data: { latLng },
});

const hideShowMoreButton = () => ({
  type: ISPU_HIDE_SHOW_MORE_BUTTON,
});

const updateNextURL = (nextURL) => ({
  type: ISPU_UPDATE_NEXT_URL,
  data: { nextURL },
});

export const showMoreStores = () => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  dispatch(increasePageNum());

  const state = getState().toJS();
  const url = state.orderDetails.storeDetailsURL;
  const pageNum = state.storeDetails.ispuPagination;
  const latLng = state.storeDetails.zipLatLng;
  const zipCode = state.storeDetails.zipCode;
  const { useISPUService, useISPUCC } = state.orderDetails;
  const range = useISPUCC ? 50 : state.form.ispu.values.ispuDistance;
  fetchStoresNearBy(zipCode, url, range, latLng, pageNum).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    if (response.data.statusCode === API_SUCCESS_CODE) {
      if (useISPUService && response.data.output && response.data.output.stores.length > 0) {
        dispatch(updateShowMoreList(response.data.output.stores, zipCode));
        dispatch(updateNextURL(response.data.output.nextURL));
      } else if (!useISPUService && response.data.output && response.data.output.length > 0) {
        dispatch(updateShowMoreList(response.data.output, zipCode));
      } else {
        dispatch(updateNextURL(response.data.output.nextURL));
        dispatch(hideShowMoreButton());
      }
      dispatch(hideNotification());
    } else {
      dispatch(hideShowMoreButton());
      dispatch(decreasePageNum());
      dispatch(showErrorNotification(getErrorMap(response.errorMap), NOTIFICATIONS.ISPU));
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
    dispatch(decreasePageNum());
    dispatch(hideNotification());
    dispatch(showErrorNotification('Invalid Data : Internal Server Error')); // Todo with generic msg
    // hashHistory.push('/genericError');
  });
};

export const submitZipCode = (zipCode, latLng) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  dispatch(updatelatLng(latLng));
  dispatch(clearStoresAndNum());
  const state = getState().toJS();
  const url = state.orderDetails.storeDetailsURL;
  const pageNum = state.storeDetails.ispuPagination;
  const { useISPUService, useISPUCC } = state.orderDetails;
  const range = useISPUCC ? 50 : state.form.ispu.values.ispuDistance;
  fetchStoresNearBy(zipCode, url, range, latLng, pageNum).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    if (response.data.statusCode === API_SUCCESS_CODE) {
      if (useISPUService) {
        dispatch(updateStoreList(response.data.output.stores, zipCode));
        dispatch(updateNextURL(response.data.output.nextURL));
      } else {
        dispatch(updateStoreList(response.data.output, zipCode));
      }
      dispatch(hideShowMoreButton());
      dispatch(hideNotification());
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.ISPU));
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    dispatch(showErrorNotification('Invalid Data : Internal Server Error')); // Todo with generic msg
    // hashHistory.push('/genericError');
  });
};

const submitISPU_Promise = (dataParam, url) => request({
  method: 'post',
  url,
  data: dataParam,
});

export const submitISPU = (data) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.updateShippingInfoURL;

  submitISPU_Promise(data, url).then((response) => {
    dispatch(asyncFetchSucess());

    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(resetState(response.data.output));// update the page with fresh data
      dispatch(hideNotification());

      if (response.data.output.checkoutStates.contactInfoRequired === true) {
        // hashHistory.push('/choosePaymentMethod');
        dispatch(updateEditState(EDIT_STATE.SHIPPING, true));
        dispatch(showErrorNotification(state.cqContent.error.DT_OD_CHECKOUT_EDIT_SECTION_CONTACT_INFO_REQUIRED_ERROR));
      } else {
        dispatch(updateEditState(EDIT_STATE.SHIPPING, false));
      }
      if (response.data.output.checkoutStates.paymentRequired === true && response.data.output.selectedShippingType.type === 'ISPU' && response.data.output.billingInfo.selectedPaymentMode.toLowerCase() !== 'newcard') {
        // hashHistory.push('/choosePaymentMethod');
        dispatch(updateEditState(EDIT_STATE.PAYMENT, true));
        dispatch(showErrorNotification(state.cqContent.error.DT_OD_CHECKOUT_PAYMENT_SECTION_ERROR));
        window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.ISPU));
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    dispatch(showErrorNotification('Invalid Data : Internal Server Error')); // Todo with generic msg
    // hashHistory.push('/genericError');
  });
};


export const markerClicked = (storeId, reRenderMaps) => ({
  type: MARKER_SELECTED,
  storeId,
  reRenderMaps,
});


export const storeSelected = (storeId) => ({
  type: STORE_SELECTED,
  storeId,
});


export const mapClicked = () => ({
  type: MAP_CLICKED,
});

const updatePaypalPaymentInfoAPI = (url) =>
  request.post(url);

export const paypalPaymentMethod = () => (dispatch, getState) => {
  const state = getState().toJS();
  const url = state.orderDetails.paypalCmpiLookupURL;

  dispatch(asyncFetch());// action to show loader
  updatePaypalPaymentInfoAPI(url).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    window.location.href = response.data.output;
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    dispatch(showErrorNotification('Invalid Data : Internal Server Error')); // Todo with generic msg
    // hashHistory.push('/genericError');
  });
};

export const applePayOption = (appleMerchantIdentifier) => (dispatch) => {
  dispatch(asyncFetch());
  if (typeof window.ApplePaySession !== 'undefined' && window.ApplePaySession) {
    const promise = window.ApplePaySession.canMakePaymentsWithActiveCard(appleMerchantIdentifier);
    promise.then((canMakePayments) => {
      dispatch(asyncFetchSucess());
      dispatch(applePayOn(canMakePayments));
    }).catch((error) => {
      dispatch(asyncFetchFalied());
      // eslint-disable-next-line no-console
      console.log('Catch Execption:', error);
    });
  } else {
    dispatch(asyncFetchFalied());
    dispatch(applePayOn(false));
  }
};
export const applePayOn = (canMakePayments) => ({
  type: APPLE_PAY,
  canMakePayments,
});

/* *
* Generic post API
* */
const postAPI = (data, url) => (request({
  method: 'post',
  url,
  data,
}));

const getAPI = (url, paramaters) => request.get(url, { params: paramaters });


export const checkGiftCardBalance = (data, index) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.checkGiftCardBalanceURL;
  // const url = 'http://www.mocky.io/v2/5ac26d2e3300007900873069';
  const { pieEnabled } = state.orderDetails;
  const giftCardArray = [encryptGiftCard(data, pieEnabled)];
  postAPI({ giftCards: giftCardArray }, url).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(asyncFetchSucess({ giftCardBalanceFetched: true, index, ...response.data }));// action to hide loader
      dispatch(hideNotification());
    } else {
      dispatch(asyncFetchSucess());// action to hide loader
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    dispatch(showErrorNotification('Invalid Data : Internal Server Error')); // Todo with generic msg
    // hashHistory.push('/genericError');
  });
};
export const submitGiftCard = (data) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.submitGiftCardURL;
  const { pieEnabled } = state.orderDetails;

  const giftCardArray = [];
  for (let i = 0; data.length > i; i++) {
    giftCardArray.push(encryptGiftCard(data[i], pieEnabled));
  }
  postAPI({ giftCards: giftCardArray }, url).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(resetState(response.data.output));// update the page with fresh data
      dispatch(hideNotification());
    } else if (response.data.statusCode !== API_SUCCESS_CODE) {
      if ((response.data.output !== null && typeof response.data.output.goToSuccessURL !== 'undefined')) {
        window.location = response.data.output.goToSuccessURL;
      } else {
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
        window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

export const showMasterpassError = () => (dispatch, getState) => {
  const { orderDetails } = getState().toJS();
  const billingInfo = { ...orderDetails.billingInfo, masterpassError: false };
  dispatch(showErrorNotification(orderDetails.billingInfo.masterpassErrorMessage));
  window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
  dispatch(updateEditState(EDIT_STATE.PAYMENT, true));
  dispatch(resetState({ ...orderDetails, billingInfo }));
};

export const fetchSMSDevices = () => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.fetchSMSDevicesUrl;
  getAPI(url).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(hideNotification());
      if (!response.data.output.ispuEligible) {
        dispatch(disableISPU());
      }
      dispatch(asyncFetchSucess({ smsDevicesFetched: true, ...response.data }));// action to hide loader
    } else {
      dispatch(asyncFetchSucess());// action to hide loader
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.SECURE_PIN));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());
    dispatch(hideNotification());
    dispatch(showErrorNotification('Invalid Data : Internal Server Error')); // Todo with generic msg
    // hashHistory.push('/genericError');
  });
};

export const sendSMS = (sendSMSTo) => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState().toJS();
  const url = state.orderDetails.sendSMSUrl;
  getAPI(url, { sendSMSTo }).then((response) => {
    if (response.data.statusCode === '00') {
      dispatch(asyncFetchSucess({ sentSMS: true, ...response.data.output }));// action to hide loader
    } else {
      dispatch(asyncFetchSucess());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.SECURE_PIN));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());
    dispatch(hideNotification());
    dispatch(showErrorNotification('Invalid Data : Internal Server Error')); // Todo with generic msg
    // hashHistory.push('/genericError');
  });
};

export const validateAuthCode = (authCode) => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState().toJS();
  const url = state.orderDetails.validateAuthCodeUrl;
  getAPI(url, { authCode }).then((response) => {
    const respData = response.data;
    dispatch(asyncFetchSucess());
    if (respData.statusCode === '00') {
      dispatch(resetState(response.data.output));
      dispatch(hideNotification());
      dispatch(asyncFetchSucess({ smsAuthenticationComplete: true }));
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), NOTIFICATIONS.SECURE_PIN));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());
    dispatch(hideNotification());
    dispatch(showErrorNotification('Invalid Data : Internal Server Error')); // Todo with generic msg
    // hashHistory.push('/genericError');
  });
};

export const updateDeviceInfo = (data, index, section) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.validateAndPersistDeviceInfoURL;
  postAPI(data, url).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(hideNotification());
      dispatch(resetState(response.data.output));// update the page with fresh data
      dispatch(asyncFetchSucess({ deviceInfoUpdated: true, deviceIndex: index, section }));
    } else if (response.data.statusCode !== API_SUCCESS_CODE) {
      if ((response.data.output !== null && typeof response.data.output.goToSuccessURL !== 'undefined')) {
        window.location = response.data.output.goToSuccessURL;
      } else {
        dispatch(asyncFetchSucess());
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap), section));
      }
    } else {
      dispatch(asyncFetchSucess());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), section));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    dispatch(showErrorNotification(state.cqContent.error.DT_OD_CHECKOUT_PORT_IN_GENERIC_ERROR));
    // hashHistory.push('/genericError');
  });
};

export const getNewNpanxx = (zipCode) => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState().toJS();
  const url = state.orderDetails.npaNxxNumberZipCodeURL;
  getAPI(url, { zipCode, fetchNpaNxx: true }).then((response) => {
    if (response.data.statusCode === '00') {
      dispatch(hideNotification());
      dispatch(asyncFetchSucess({ newNPANXX: true, ...response.data.output }));// action to hide loader
    } else {
      dispatch(asyncFetchSucess());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      window.document.getElementById('devicesSection').scrollIntoView(scrollProps);
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());
    dispatch(hideNotification());
    dispatch(showErrorNotification('Invalid Data : Internal Server Error')); // Todo with generic msg
    // hashHistory.push('/genericError');
  });
};


export const changeForm = (form, field, value) => (dispatch) => {
  dispatch(change(form, field, value));
};

export const touchForm = (formName) => (dispatch, getState) => {
  const state = getState().toJS();
  const fields = state && state.form && state.form[formName] && state.form[formName].registeredFields ? Object.keys(state.form[formName].registeredFields) : [];
  fields.map((field) => dispatch(touch(formName, field)));
};

export const fetchZipCodeInfo = (zipCode) => (dispatch, getState) => {
  const state = getState().toJS();
  const url = state.orderDetails.getMarketDetailsURL;

  getAPI(url, { zipCode }).then((res) => {
    dispatch(asyncFetchSucess());
    dispatch(asyncFetchSucess({ zipCodeInfoFetched: true, ...res.data }));// action to hide loader
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());
  });
};

export const resetZipCodeInfo = () => ({
  type: RESET_ZIPCODE_INFO,
});

export const getTradeInSubmissionId = (url) => () => {
  postAPI({}, url).then((response) => {
    console.log(response);
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
  });
};

export const hideInstantCreditTaxUpdatedMsg = (data = false) => ({
  type: HIDE_INSTANT_CREDIT_UPDATED,
  data,
});

export const updateDeviceSku = (data, index) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS(); // eslint-disable-line
  const url = state.orderDetails.updateDeviceConfigurationURL;
  postAPI(data, url).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(resetState(response.data.output));// update the page with fresh data
      dispatch(hideNotification());
      dispatch(asyncFetchSucess());
    } else if (response.data.statusCode !== API_SUCCESS_CODE) {
      if ((response.data.output !== null && typeof response.data.output.goToSuccessURL !== 'undefined')) {
        window.location = response.data.output.goToSuccessURL;
      } else {
        dispatch(asyncFetchSucess({ updateDeviceSkuFailed: true, index }));
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      }
    } else {
      dispatch(asyncFetchSucess({ updateDeviceSkuFailed: true, index }));
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());
    dispatch(hideNotification());
    dispatch(showErrorNotification('Invalid Data : Internal Server Error')); // Todo with generic msg
    // hashHistory.push('/genericError');
  });
};

export const validateOrder = (validate) => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState().toJS();
  const url = state.orderDetails.validateOrderURL;
  postAPI(validate, url).then((response) => {
    if (response.data.statusCode === '00') {
      dispatch(resetState(response.data.output));// update the page with fresh data
      dispatch(asyncFetchSucess({ orderValidated: validate, dppAgreementFetched: true }));
    } else {
      dispatch(asyncFetchSucess());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch((error) => {
    dispatch(asyncFetchFalied());
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
  });
};

export const getSavedCards = () => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState().toJS();
  const url = state.orderDetails.retrieveCardsURL;
  postAPI({}, url).then((response) => {
    if (response.data.statusCode === '00') {
      dispatch(resetState(response.data.output));// update the page with fresh data
      dispatch(asyncFetchSucess({ savedCardsFetched: true }));
    } else {
      dispatch(asyncFetchSucess());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch((error) => {
    dispatch(asyncFetchFalied());
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
  });
};
