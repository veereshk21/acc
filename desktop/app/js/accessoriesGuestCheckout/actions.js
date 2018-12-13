import request from 'axios';
import { reset, change } from 'redux-form';
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
  APPLE_PAY,
  UPDATE_EDIT_STATE,
  EDIT_STATE,
  CYBER_SOURCE_DATA,
} from './constants';

const scrollProps = { block: 'start', inline: 'nearest', behavior: 'smooth' };


/* *
 * Action sets a loader to be shown on page
 * */
const asyncFetch = () => ({
  type: ASYNC_FETCH,
});
/* *
 * Action clears the loader on the page.
 * */
const asyncFetchSucess = (data = {}) => ({
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
    dispatch(asyncFetchSucess());// action to hide loader

    if (response.data.statusCode === API_SUCCESS_CODE) {
      if (response.data.output.shippingInfo.shippingInfoUpdated === true) {
        if (sessionStorage.getItem('applePayEnabled') === 'true') {
          if (response.data.output.applePayEnabled === undefined || response.data.output.applePayEnabled === false) {
            /* eslint-disable no-param-reassign */
            // WE REALLY NEED TO FIX THIS!!!
            response.data.output.applePayEnabled = true;
            response.data.output.appleMerchantIdentifier = sessionStorage.getItem('appleMerchantIdentifier');
            response.data.output.applePaymentRequest = JSON.parse(sessionStorage.getItem('applePaymentRequest'));
            /* eslint-enable */
          }
        }
        dispatch(resetState(response.data.output));// update the page with fresh data
        dispatch(hideNotification());
        dispatch(updateEditState(EDIT_STATE.SHIPPING_ADDRESS, false));
      } else {
        dispatch(showErrorNotification(OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT));
        window.document.getElementById('shippingAddressSection').scrollIntoView(scrollProps);
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      window.document.getElementById('shippingAddressSection').scrollIntoView(scrollProps);
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
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

export const updateShippingInfo = (shippingInfo) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.updateShippingInfoURL;
  updateShippingInfoAPI(shippingInfo, url).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader

    if (response.data.statusCode === API_SUCCESS_CODE) {
      if (sessionStorage.getItem('applePayEnabled') === 'true') {
        if (response.data.output.applePayEnabled === undefined || response.data.output.applePayEnabled === false) {
          /* eslint-disable no-param-reassign */
          // WE REALLY NEED TO FIX THIS!!!
          response.data.output.applePayEnabled = true;
          response.data.output.appleMerchantIdentifier = sessionStorage.getItem('appleMerchantIdentifier');
          response.data.output.applePaymentRequest = JSON.parse(sessionStorage.getItem('applePaymentRequest'));
          /* eslint-enable */
        }
      }
      dispatch(resetState(response.data.output));// update the page with fresh data
      dispatch(updateEditState(EDIT_STATE.SHIPPING_METHOD, false));
      dispatch(hideNotification());
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      window.document.getElementById('shippingMethodSection').scrollIntoView(scrollProps);
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    hashHistory.push('/genericError');
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
  let validPANChecksumFail = false;
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
    validPANChecksumFail = true;
  }

  encryptedResult = (creditCard && window.ProtectPANandCVV && !validPANChecksumFail) ? window.ProtectPANandCVV(creditCard, cvv) : null;

  if (encryptedResult !== null) {
    return {
      creditCard: encryptedResult[0],
      cvv: encryptedResult[1],
      isEncrypted: true,
      validPANChecksumFail,
    };
  }

  return { ...creditCardInfo, validPANChecksumFail };
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
  const { creditCard: encryptedCard, cvv: encryptedCVV, isEncrypted, validPANChecksumFail } = encryptCreditCard(cardInfo.card_number, cardInfo.card_cvc, pieEnabled);
  //  PAN Checksum failed, dont make api call
  if (validPANChecksumFail) {
    return new Promise((resolve) => {
      resolve({ validPANChecksumFail });
    });
  }
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
export const dispatchErrorNotification = (errMsg, section) => (dispatch) => {
  dispatch(asyncFetchSucess());
  dispatch(showErrorNotification(errMsg, section));
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
    hashHistory.push('/genericError');
  });
};

export const addNewCard = (cardInfo, isPastDue, pieEnabled, giftCards, cardinalInit) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const { updatePaymentInfoURL } = state.orderDetails;
  const { pastDueCheckoutURL } = state.orderDetails;

  addCardAPI(cardInfo, isPastDue, updatePaymentInfoURL, pastDueCheckoutURL, pieEnabled, giftCards, cardinalInit).then((response) => {
    if (response.validPANChecksumFail) {
      // pan checksum failed, show error
      dispatch(showErrorNotification(state.cqContent.error.DT_OD_CHECKOUT_PAYMENT_PAN_CHECKSUM_ERROR));
      window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
      dispatch(reset('addNewCard'));
      dispatch(asyncFetchSucess());
    } else if (response.data.statusCode === API_SUCCESS_CODE) {
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
    hashHistory.push('/genericError');
  });
};

/* *
 * Choose payment method
 * */
const updatePaymentInfoAPI = (paymentInfo, isPastDue, updatePaymentInfoURL, pastDueCheckoutURL, pieEnabled, giftCards, cardinalInit, cvvRequired) => {
  const encryptedGiftCards = [];
  giftCards.map((giftCard) => encryptedGiftCards.push(encryptGiftCard(giftCard, pieEnabled)));

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
  const { updatePaymentInfoURL } = state.orderDetails;
  const { pastDueCheckoutURL } = state.orderDetails;
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
        window.document.getElementById('paymentSection').scrollIntoView(scrollProps);
        /* setTimeout(()=>{
            dispatch(hideNotification());
          }, 5000); */
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

export const placeOrder = (submitOrderURL, optInShippingSMS, optInMtn, optInPaperFree) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const shippingMethod = (state.form && state.form.chooseShippingMethod) ? state.form.chooseShippingMethod.values : null;
  if (shippingMethod && shippingMethod.shippingRadio === 'SDD_SAMEDAY' && (!shippingMethod.availWindows || shippingMethod.availWindows === 'title')) {
    dispatch(asyncFetchFalied());
    dispatch(showErrorNotification(state.cqContent.error.DT_OD_CHECKOUT_SDD_MISSING_DELIVERYWINDOW));
    window.document.getElementById('shippingMethodSection').scrollIntoView(scrollProps);
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

const updatePaypalPaymentInfoAPI = (url) =>
  // return request.post('http://www.mocky.io/v2/596801531100000c026149f3');
  request.post(url);

export const paypalPaymentMethod = () => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.paypalCmpiLookupURL;
  updatePaypalPaymentInfoAPI(url).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    window.location.href = response.data.output;
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

export const applePayOption = (appleMerchantIdentifier) => (dispatch) => {
  dispatch(asyncFetch());
  if (typeof window.ApplePaySession !== 'undefined' && window.ApplePaySession) {
    const promise = window.ApplePaySession.canMakePaymentsWithActiveCard(appleMerchantIdentifier);
    promise.then((canMakePayments) => {
      dispatch(asyncFetchSucess());
      dispatch(applePayOn(canMakePayments));
      if (window.vzwDL && window.vzwDL.page) {
        const dlTestVersion = window.vzwDL.page.testVersion;
        if (dlTestVersion && dlTestVersion.trim().length > 0) {
          if (dlTestVersion.indexOf('apple') === -1) {
            window.vzwDL.page.testVersion = dlTestVersion + ',apple pay offered';
          }
        } else {
          window.vzwDL.page.testVersion = 'apple pay offered';
        }
      } else {
        // eslint-disable-next-line no-console
        console.log('vzwDL object not found');
      }
      if (window.reviewOrderJSON && window.reviewOrderJSON.output) {
        const outputJSON = window.reviewOrderJSON.output;
        if (outputJSON && outputJSON.applePayEnabled === true) {
          /* eslint-disable no-param-reassign */
          // WE REALLY NEED TO FIX THIS!!!
          sessionStorage.setItem('applePayEnabled', outputJSON.applePayEnabled);
          sessionStorage.setItem('appleMerchantIdentifier', outputJSON.appleMerchantIdentifier);
          sessionStorage.setItem('applePaymentRequest', JSON.stringify(outputJSON.applePaymentRequest));
          /* eslint-enable */
        }
      }
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


export const fetchZipCodeInfo = (zipCode, form) => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState().toJS();
  const url = state.orderDetails.getMarketDetailsURL;
  getAPI(url, { zipCode }).then((res) => {
    dispatch(change(form, 'city', res.data.city));
    dispatch(change(form, 'state', res.data.state));
    dispatch(change(form, 'zipcode', res.data.zipcode));
    dispatch(asyncFetchSucess());
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());
  });
};

export const updateBillingAddress = (billingAddress) => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState().toJS();
  const { updateBillingAddressInfoURL } = state.orderDetails;
  postAPI(billingAddress, updateBillingAddressInfoURL).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(asyncFetchSucess());
      dispatch(resetState(response.data.output));
      dispatch(updateEditState(EDIT_STATE.BILLING_ADDRESS, false));
    } else {
      dispatch(asyncFetchSucess());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      dispatch(reset('BillingAddress'));
    }
  });
};

const setCyberSourceData = (data) => ({
  type: CYBER_SOURCE_DATA,
  data,
});

export const fetchCyberSourceDataApi = (orderId) =>
  request({
    method: 'get',
    url: '/od/cust/auth/checkout/getCybersourceSignedData?orderId=' + orderId,
  });

export const fetchCyberSourceData = (orderId) => (dispatch) => {
  // dispatch(asyncFetch());
  fetchCyberSourceDataApi(orderId).then((res) => {
    // dispatch(asyncFetchSucess());
    // const response = {"data" : {"output":{"orderId":"SDC88c19182644a0790f5be4e7f0d2cb465{d6}","httpPostUrl":"https://testsecureacceptance.cybersource.com/silent/pay","dataMap":{"unsigned_field_names":"card_type,card_number,card_expiry_date,card_cvn","amount":"1","bill_to_address_postal_code":"15317","signature":"2bs04hA20eZqvyfiruHELtZ5vBNup2rETmnVFOu4Q7M=","bill_to_address_state":"PA","transaction_uuid":"d63e9479-474d-4dae-8b2e-cdab9a1c939e","signed_field_names":"access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code,override_custom_receipt_page,ignore_avs","locale":"en","transaction_type":"authorization,create_payment_token","bill_to_email":"aa@aa.com","reference_number":"SDC88c19182644a0790f5be4e7f0d2cb465{d6}","ignore_avs":"true","bill_to_address_country":"US","bill_to_surname":"BELTRAN","bill_to_address_line1":"301 CARRIAGE HILL APT'S","profile_id":"602C4C13-900B-46DE-9668-76CB2D14F3E3","access_key":"f43969b9e54539e3ba6ad6bb1a24ee30","bill_to_phone":"9999999999","override_custom_receipt_page":"/checkout/payment/","bill_to_address_city":"MC MURRAY","currency":"USD","bill_to_forename":"BRIAN","signed_date_time":"2018-02-16T12:47:31Z","payment_method":"card"},"cardTypeMap":{"001":"Visa","002":"MasterCard","003":"American Express","004":"Discover"}},"errorMap":null,"statusMessage":"Service completed Successfully.","statusCode":"00"}};
    dispatch(setCyberSourceData(res));
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.log('Error in err', err);
    // dispatch(asyncFetchFalied());
  });
};
const setPostCyberSourceData = (data) => ({
  type: CYBER_SOURCE_DATA,
  data,
});

export const postCyberSourceDataApi = (data, url) =>
  request({
    method: 'post',
    url,
    data,
  });

export const postCyberSourceData = (data, url) => (dispatch) => {
  dispatch(asyncFetch());
  postCyberSourceDataApi(data, url).then((res) => {
    dispatch(asyncFetchSucess());
    // const response = {"data" : {"output":{"orderId":"SDC88c19182644a0790f5be4e7f0d2cb465{d6}","httpPostUrl":"https://testsecureacceptance.cybersource.com/silent/pay","dataMap":{"unsigned_field_names":"card_type,card_number,card_expiry_date,card_cvn","amount":"1","bill_to_address_postal_code":"15317","signature":"2bs04hA20eZqvyfiruHELtZ5vBNup2rETmnVFOu4Q7M=","bill_to_address_state":"PA","transaction_uuid":"d63e9479-474d-4dae-8b2e-cdab9a1c939e","signed_field_names":"access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code,override_custom_receipt_page,ignore_avs","locale":"en","transaction_type":"authorization,create_payment_token","bill_to_email":"aa@aa.com","reference_number":"SDC88c19182644a0790f5be4e7f0d2cb465{d6}","ignore_avs":"true","bill_to_address_country":"US","bill_to_surname":"BELTRAN","bill_to_address_line1":"301 CARRIAGE HILL APT'S","profile_id":"602C4C13-900B-46DE-9668-76CB2D14F3E3","access_key":"f43969b9e54539e3ba6ad6bb1a24ee30","bill_to_phone":"9999999999","override_custom_receipt_page":"/checkout/payment/","bill_to_address_city":"MC MURRAY","currency":"USD","bill_to_forename":"BRIAN","signed_date_time":"2018-02-16T12:47:31Z","payment_method":"card"},"cardTypeMap":{"001":"Visa","002":"MasterCard","003":"American Express","004":"Discover"}},"errorMap":null,"statusMessage":"Service completed Successfully.","statusCode":"00"}};
    dispatch(setPostCyberSourceData(res));
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.log('Error in err', err);
  });
};
