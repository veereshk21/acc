/* eslint-disable no-param-reassign */
import request from 'axios';
import { reset } from 'redux-form';
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
  ASYNC_FETCH_WITHMESSAGE,
  STORE_LIST,
  MARKER_SELECTED,
  STORE_SELECTED,
  MAP_CLICKED,
  AGREEMENT_CLICKED,
  APPLE_PAY,
  PAYPAL_CMPI_LOOKUP_URL,
  FETCH_TRADE_IN_AGREEMENT,
  CYBER_SOURCE_DATA,
  ISPU_CLEAR_STORES_PAGENUM,
  ISPU_SHOW_MORE_STORES,
  ISPU_PAGE_INCREASE,
  ISPU_PAGE_DECREASE,
  ISPU_UPDATE_LAT_LNG,
  ISPU_HIDE_SHOW_MORE_BUTTON,
  HIDE_INSTANT_CREDIT_UPDATED,
  ISPU_UPDATE_NEXT_URL,
} from './constants';

function resetState(data) {
  return {
    type: RESET_STATE,
    data,
  };
}

/* *
 * Action sets a loader to be shown on page
 * */
export function asyncFetch() {
  return {
    type: ASYNC_FETCH,
  };
}
/* *
 * Action sets a loader to be shown on page
 * */
function asyncFetchwithMessage() {
  return {
    type: ASYNC_FETCH_WITHMESSAGE,
  };
}
/* *
 * Action clears the loader on the page.
 * */
export function asyncFetchSucess(data = {}) {
  return {
    type: ASYNC_FETCH_SUCCESS,
    data,
  };
}

/* *
 * Action displays API error on the page.
 * */
export function asyncFetchFalied() {
  return {
    type: ASYNC_FETCH_FAILURE,
  };
}
/* *
 * Action clears the loader and also data in data node.
 * */
export function invalidateAsyncFetch() { // eslint-disable-line
  return {
    type: ASYNC_FETCH_INVALIDATE,
  };
}

/* *
 * Update shipping address
 * */
function updateShippingAddressAPI(shippingAddress, url) {
  const shipToType = (shippingAddress.businessAddress === true) ? 'business' : 'residence';

  return request({
    method: 'post',
    url,
    data: { ...shippingAddress, shipToType },
  });
}

export const updateShippingAddress = (shippingAddress, OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT) => function (dispatch, getState) {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.updateShippingInfoURL;

  updateShippingAddressAPI(shippingAddress, url).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader

    if (response.data.statusCode === API_SUCCESS_CODE) {
      if (response.data.output.shippingInfo.shippingInfoUpdated === true) {
        dispatch(resetState(response.data.output));// update the page with fresh data
        dispatch(hideNotification());
        hashHistory.push('/');
      } else {
        dispatch(showErrorNotification(getErrorMap({ OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT })));
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch(() => {
    // console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
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

export const updateShippingInfo = (shippingInfo, giftCardFlow) => function (dispatch, getState) {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.updateShippingInfoURL;
  updateShippingInfoAPI(shippingInfo, url).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader

    if (response.data.statusCode === API_SUCCESS_CODE) {
      const paymentType = response.data.output.billingInfo.selectedPaymentMode.toString().toLocaleLowerCase();
      const hasSavedCards = response.data.output.billingInfo.savedCardInfo.length > 0;
      dispatch(resetState(response.data.output));// update the page with fresh data
      dispatch(hideNotification());

      if (giftCardFlow && (paymentType !== 'newcard' || paymentType !== 'savedcard')) {
        if (hasSavedCards) {
          hashHistory.push('/choosePaymentMethod/giftCard');
        } else {
          hashHistory.push('/addPaymentMethod/newGiftCard');
        }
      } else if (giftCardFlow) {
        hashHistory.push('/giftCards');
      } else {
        hashHistory.push('/');
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch(() => {
    // console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    hashHistory.push('/genericError');
  });
};

/** PieEncription logic
 * @param creditCard: string,
 * @param cvv: number,
 * @param pieEnabled: boolean
 */
const encryptCreditCard = function (creditCard, cvv, pieEnabled = false) {
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

  encryptedResult = window.ProtectPANandCVV ? window.ProtectPANandCVV(creditCard, cvv) : null;

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
const encryptGiftCard = function (data, pieEnabled = false) {
  // PIE encryption
  const suffixSTR = 'PSS';
  const giftCardInfo = { ...data };
  if (!(pieEnabled && !giftCardInfo.isEncrypted && window.ProtectString)) {
    return giftCardInfo;
  }
  try {
    const encryptedCardResult = ProtectString(giftCardInfo.giftCard); // eslint-disable-line
    const encryptedPinResult = ProtectString(giftCardInfo.pin); //eslint-disable-line

    if (encryptedCardResult || encryptedPinResult) {
      giftCardInfo.giftCard = encryptedCardResult[0] + ' ' + window.PIE.key_id + ' ' + window.PIE.phase + ' ' + suffixSTR;
      giftCardInfo.pin = encryptedPinResult[0] + ' ' + window.PIE.key_id + ' ' + window.PIE.phase + ' ' + suffixSTR;
      giftCardInfo.isEncrypted = true;
    } else {
      return giftCardInfo;
    }
  } catch (error) {
    // console.log('Catch Exception:', error);
    return giftCardInfo;
  }
  return giftCardInfo;
};


/* *
 * Add credit/debit card
 * */
const addCardAPI = (cardInfo, isPastDue, updatePaymentInfoURL, pastDueCheckoutURL, pieEnabled, cardinalInit) => {
  const { creditCard: encryptedCard, cvv: encryptedCVV, isEncrypted } = encryptCreditCard(cardInfo.card_number, cardInfo.card_cvc, pieEnabled);
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
export const dispatchErrorNotification = (errMsg) => function (dispatch) {
  dispatch(showErrorNotification(errMsg));
};

export const handle3dPaymentValidated = (data, jwt) => function (dispatch, getState) {
  dispatch(asyncFetchwithMessage());
  const state = getState().toJS();
  const { handleCardinalResponseURL } = state.orderDetails;

  handleCardinalResponseUrlApi(data, jwt, handleCardinalResponseURL).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(resetState(response.data.output));
      dispatch(hideNotification());
      hashHistory.push('/');
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch(() => {
    // console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

export const addNewCard = (cardInfo, addPaymentMethodForm, isPastDue, pieEnabled, giftCardFlow, cardinalInit) => function (dispatch, getState) {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const { updatePaymentInfoURL } = state.orderDetails;
  const { pastDueCheckoutURL } = state.orderDetails;

  addCardAPI(cardInfo, isPastDue, updatePaymentInfoURL, pastDueCheckoutURL, pieEnabled, cardinalInit).then((response) => {
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
      } else if (giftCardFlow) {
        dispatch(asyncFetchSucess());
        dispatch(resetState(response.data.output));
        hashHistory.push('/giftCards');
      } else {
        dispatch(asyncFetchSucess());
        dispatch(resetState(response.data.output));
        hashHistory.push('/');
      }
    } else if (response.data.statusCode !== API_SUCCESS_CODE) {
      if ((response.data.output !== null && typeof response.data.output.goToSuccessURL !== 'undefined')) {
        window.location = response.data.output.goToSuccessURL;
      } else {
        dispatch(asyncFetchSucess());
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
        dispatch(reset('addPaymentForm'));
        addPaymentMethodForm.setState({ masked_card_number: '', card_number: '', card_error: '' });
        /* setTimeout(() => {
            dispatch(hideNotification());
          }, 5000); */
      }
    } else {
      dispatch(asyncFetchSucess());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      dispatch(reset('addPaymentForm'));
      addPaymentMethodForm.setState({ masked_card_number: '', card_number: '', card_error: '' });
    }
  }).catch(() => {
    // console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    hashHistory.push('/genericError');
  });
};

// const updatePastDuePaymentAPI = (paymentInfo) => {


// };

/* *
 * Choose payment method
 * */
const updatePaymentInfoAPI = (paymentInfo, isPastDue, updatePaymentInfoURL, pastDueCheckoutURL, cardinalInit, cvvNeeded) => {
  let requestParams = {};
  if (paymentInfo.paymentType === 'savedcard') {
    requestParams = {
      nickname: paymentInfo.savedCardNickName,
      selectedpaymentType: 'savedCard',
      cardinalInit,
    };
  } else {
    requestParams = {
      selectedpaymentType: 'BTA',
    };
  }
  if (cvvNeeded) {
    const { creditCardVerificationNumber } = paymentInfo;
    requestParams.creditCardVerificationNumber = creditCardVerificationNumber;
  }
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

export const choosePaymentMethod = (paymentInfo, isPastDue, giftCardFlow, cardinalInit, cvvNeeded = false) => function (dispatch, getState) {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const { updatePaymentInfoURL } = state.orderDetails;
  const { pastDueCheckoutURL } = state.orderDetails;
  updatePaymentInfoAPI(paymentInfo, isPastDue, updatePaymentInfoURL, pastDueCheckoutURL, cardinalInit, cvvNeeded).then((response) => {
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
      } else if (giftCardFlow) {
        dispatch(asyncFetchSucess());
        dispatch(resetState(response.data.output));// update the page with fresh data
        hashHistory.push('/giftCards');
      } else {
        dispatch(asyncFetchSucess());
        dispatch(resetState(response.data.output));// update the page with fresh data
        hashHistory.push('/');
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
  }).catch(() => {
    // console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};
/* *
* Reset state after apple payment processed
* */
export const updateApplePaymentInfo = (responseJSON) => function (dispatch) {
  dispatch(asyncFetch());// action to show loader
  responseJSON.showPaymentSuccessMessage = true;
  dispatch(resetState(responseJSON));// update the page with fresh data
  dispatch(asyncFetchSucess());
  dispatch(hideNotification());
  hashHistory.push('/');
};
export const showApplePayErrorInfo = (errorData) => function (dispatch) {
  if (errorData && errorData.type === 'info') {
    dispatch(showInfoNotification(errorData.message));
  } else if (errorData && errorData.type === 'error') {
    dispatch(showErrorNotification(errorData.message));
  }
  setTimeout(() => {
    dispatch(hideNotification());
  }, 5000);
  hashHistory.push('/');
};
/* *
 * Enter CVC for saved card
 * */
const confirmPaymentAPI = (cardInfo, url, cardinalInit) => {
  const requestParams = {
    creditCardVerificationNumber: cardInfo.creditCardVerificationNumber,
    nickname: cardInfo.savedCardNickName,
    selectedpaymentType: 'savedCard',
    isEncrypted: false,
    cardinalInit,
  };

  return request({
    method: 'post',
    url,
    data: requestParams,
  });
};
export const confirmPayment = (cardInfo, cardinalInit) => function (dispatch, getState) {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.updatePaymentInfoURL;
  confirmPaymentAPI(cardInfo, url, cardinalInit).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader

    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(resetState(response.data.output));// update the page with fresh data
      dispatch(hideNotification());
      hashHistory.push('/');
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch(() => {
    // console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

/* *
 * AAL - Submit service address
 * */

const updateServiceAddressAPI = (address, url) => {
  const { deviceId, ...serviceAddress } = address;
  const requestParams = {
    deviceServiceAddress: [
      { deviceId, serviceAddress }],
    userInfo: { userRole: 'AccountOwner' },
  };
  return request({
    method: 'post',
    url,
    data: requestParams,
  });
};

export const updateServiceAddress = (address, OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.updateDeviceServiceAddressURL;
  updateServiceAddressAPI(address, url).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    if (response.data.statusCode === API_SUCCESS_CODE) {
      if (response.data.output.deviceConfigInfo.deviceAddressUpdated === true) {
        dispatch(resetState(response.data.output));// update the page with fresh data
        dispatch(hideNotification());
        hashHistory.push('/');
      } else {
        dispatch(showErrorNotification(getErrorMap({ OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT })));
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
  });
};


/* *
 * Fetch trade-in agreement
 * */

const tradeInAgreementReceived = (agreementText) => ({ //eslint-disable-line
  type: FETCH_TRADE_IN_AGREEMENT,
  agreementText: 'Some text!',
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
  fetchTradeInAgreementAPI().then((response) => { //eslint-disable-line
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
    hashHistory.push('/genericError');
  });
};

/* *
 * Submit order
 * */

export const placeOrder = (submitOrderURL, smsOptin, updateOptInSmsNumber) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const tntVzSelectsCheckBoxMobEup = document.getElementById('tntVzSelectsCheckBoxMobEup');
  request({
    method: 'post',
    url: submitOrderURL,
    data: {
      optInShippingSMS: smsOptin,
      optInMtn: updateOptInSmsNumber,
      vzSelectTerms: tntVzSelectsCheckBoxMobEup ? tntVzSelectsCheckBoxMobEup.checked : false,
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
};

/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** *
 * * ** ** ** ** **ISPU Actions* ** ** ** ** ** ** *
 * ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */
const updateStoreList = (storeList, zipCode) => ({
  type: STORE_LIST,
  data: { storeList, zipCode },
});

const fetchStoresNearBy = (zipCode, url, latLng, pagination) => {
  const params = {
    zipCode,
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
  const { zipCode } = state.storeDetails;
  const { useISPUService } = state.orderDetails;
  fetchStoresNearBy(zipCode, url, latLng, pageNum).then((response) => {
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
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
    dispatch(decreasePageNum());
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

export const submitZipCode = (zipCode, latLng) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  dispatch(updatelatLng(latLng));
  dispatch(clearStoresAndNum());

  const state = getState().toJS();
  const url = state.orderDetails.storeDetailsURL;
  const pageNum = state.storeDetails.ispuPagination;
  const { useISPUService } = state.orderDetails;

  fetchStoresNearBy(zipCode, url, latLng, pageNum).then((response) => {
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
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
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
      if (response.data.output.checkoutStates.paymentRequired === true && response.data.output.selectedShippingType.type === 'ISPU' && response.data.output.billingInfo.selectedPaymentMode.toLowerCase() !== 'newcard') {
        hashHistory.push('/choosePaymentMethod');
      } else {
        hashHistory.push('/');
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
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

/* *
 * Agreement checkbox selection
 * */

export const agreementChecked = (agreementState) => ({
  type: AGREEMENT_CLICKED,
  agreementState,
});

const updatePaypalPaymentInfoAPI = () =>
  // return request.post('http://www.mocky.io/v2/596801531100000c026149f3');
  request.post(PAYPAL_CMPI_LOOKUP_URL);

export const paypalPaymentMethod = () => function (dispatch) {
  dispatch(asyncFetch());// action to show loader
  updatePaypalPaymentInfoAPI().then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    window.location.href = response.data.output;
  }).catch(() => {
    // console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

export const applePayOption = (appleMerchantIdentifier) => (dispatch) => {
  dispatch(asyncFetch());
  if (typeof window.ApplePaySession !== 'undefined' && window.ApplePaySession) {
    // eslint-disable-next-line no-undef
    const promise = ApplePaySession.canMakePaymentsWithActiveCard(appleMerchantIdentifier);
    promise.then((canMakePayments) => {
      dispatch(asyncFetchSucess());
      dispatch(applePayOn(canMakePayments));
    }).catch(() => {
      dispatch(asyncFetchFalied());
      // console.log('error', error);
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


// const getAPI = (url) => (request({
//   method: 'get',
//   url,
// }));

export const checkGiftCardBalance = (data) => function (dispatch, getState) {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.checkGiftCardBalanceURL;
  const { pieEnabled } = state.orderDetails;
  const giftCardArray = [];
  for (let i = 0; data.length > i; i++) {
    giftCardArray.push(encryptGiftCard(data[i], pieEnabled));
  }
  postAPI({ giftCards: giftCardArray }, url).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(asyncFetchSucess({ giftCardBalanceFetched: true, ...response.data }));// action to hide loader
      dispatch(hideNotification());
      // hashHistory.push('/');
    } else {
      dispatch(asyncFetchSucess()); // action to hide loader
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch(() => {
    // console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};
export const submitGiftCard = (data) => function (dispatch, getState) {
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
      hashHistory.push('/');
    } else if (response.data.statusCode !== API_SUCCESS_CODE) {
      if ((response.data.output !== null && typeof response.data.output.goToSuccessURL !== 'undefined')) {
        window.location = response.data.output.goToSuccessURL;
      } else {
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch(() => {
    // console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};
const setCyberSourceData = (data) => ({
  type: CYBER_SOURCE_DATA,
  data,
});

export const fetchCyberSourceDataApi = (orderId) =>
  request({
    method: 'get',
    url: 'checkout/getCybersourceSignedData?orderId=' + orderId,
  });

export const fetchCyberSourceData = (orderId) => (dispatch) => {
  dispatch(asyncFetch());
  fetchCyberSourceDataApi(orderId).then((res) => {
    dispatch(asyncFetchSucess());
    // const response = {"data" : {"output":{"orderId":"SDC88c19182644a0790f5be4e7f0d2cb465{d6}","httpPostUrl":"https://testsecureacceptance.cybersource.com/silent/pay","dataMap":{"unsigned_field_names":"card_type,card_number,card_expiry_date,card_cvn","amount":"1","bill_to_address_postal_code":"15317","signature":"2bs04hA20eZqvyfiruHELtZ5vBNup2rETmnVFOu4Q7M=","bill_to_address_state":"PA","transaction_uuid":"d63e9479-474d-4dae-8b2e-cdab9a1c939e","signed_field_names":"access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code,override_custom_receipt_page,ignore_avs","locale":"en","transaction_type":"authorization,create_payment_token","bill_to_email":"aa@aa.com","reference_number":"SDC88c19182644a0790f5be4e7f0d2cb465{d6}","ignore_avs":"true","bill_to_address_country":"US","bill_to_surname":"BELTRAN","bill_to_address_line1":"301 CARRIAGE HILL APT'S","profile_id":"602C4C13-900B-46DE-9668-76CB2D14F3E3","access_key":"f43969b9e54539e3ba6ad6bb1a24ee30","bill_to_phone":"9999999999","override_custom_receipt_page":"/checkout/payment/","bill_to_address_city":"MC MURRAY","currency":"USD","bill_to_forename":"BRIAN","signed_date_time":"2018-02-16T12:47:31Z","payment_method":"card"},"cardTypeMap":{"001":"Visa","002":"MasterCard","003":"American Express","004":"Discover"}},"errorMap":null,"statusMessage":"Service completed Successfully.","statusCode":"00"}};
    dispatch(setCyberSourceData(res));
  }).catch((err) => {
    console.log('Error in err', err);
  });
};

export const removeGiftCard = (data) => function (dispatch, getState) {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.removeGiftCardURL;
  postAPI({ giftCards: data }, url).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(resetState(response.data.output));// update the page with fresh data
      dispatch(asyncFetchSucess({ giftCardsRemoved: data }));
      dispatch(hideNotification());
      // hashHistory.push('/');
    } else if (response.data.statusCode !== API_SUCCESS_CODE) {
      dispatch(asyncFetchSucess());// action to hide loader
      if ((response.data.output !== null && typeof response.data.output.goToSuccessURL !== 'undefined')) {
        window.location = response.data.output.goToSuccessURL;
      } else {
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      }
    } else {
      dispatch(asyncFetchSucess());// action to hide loader
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch(() => {
    // console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};


export const showMasterpassError = () => function (dispatch, getState) {
  const { orderDetails } = getState().toJS();
  const billingInfo = { ...orderDetails.billingInfo, masterpassError: false };
  dispatch(showErrorNotification(orderDetails.billingInfo.masterpassErrorMessage));
  dispatch(resetState({ ...orderDetails, billingInfo }));
};

export const hideInstantCreditTaxUpdatedMsg = (data = false) => ({
  type: HIDE_INSTANT_CREDIT_UPDATED,
  data,
});
