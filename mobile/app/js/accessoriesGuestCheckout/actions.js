/* eslint-disable */
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
  ASYNC_FETCH_WITHMESSAGE,
  LOAD_BILLING_FORM,
  SAME_AS_SHIPPING,
  APPLE_PAY,
  PAYPAL_CMPI_LOOKUP_URL,
  CYBER_SOURCE_DATA,
  
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

export const load = (data) => ({ type: LOAD_BILLING_FORM, data });
/* *
 * Update shipping address
 * */
function updateShippingAddressAPI(shippingAddress, url) {
  const shipToType = shippingAddress.businessName ? 'business' : 'residence';

  return request({
    method: 'post',
    url,
    data: {
      ...shippingAddress,
      shipToType,
      addressOnly: true,
    },
  });
}

export const updateShippingAddress = (shippingAddress, OD_CHECKOUT_ADDRESS_UPDATE_FAILURE_TEXT) => function (dispatch, getState) {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.updateShippingInfoURL;

  updateShippingAddressAPI(shippingAddress, url).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    console.log(response.data);
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
  }).catch((error) => {
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
    data: {
      ...shippingInfo,
      addressOnly: false
    },
  });
}

export const updateShippingInfo = (shippingInfo) => function (dispatch, getState) {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const url = state.orderDetails.updateShippingInfoURL;
  updateShippingInfoAPI(shippingInfo, url).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader

    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(resetState(response.data.output));// update the page with fresh data
      dispatch(hideNotification());
      hashHistory.push('/');
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch((error) => {
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    hashHistory.push('/genericError');
  });
};

export const sameAsShippingAddress = (data) => function (dispatch) {
  dispatch({
    type: SAME_AS_SHIPPING,
    data
  })
}

const updateBillingAPI = (billingAddress, updateBillingAddressInfoURL, pieEnabled, cardinalInit) => {
  // const { creditCard: encryptedCard, cvv: encryptedCVV, isEncrypted } = encryptCreditCard(cardInfo.card_number, cardInfo.card_cvc, pieEnabled);
  console.log(billingAddress);
  const requestParams = billingAddress;
  return request({
    method: 'post',
    url: updateBillingAddressInfoURL,
    data: requestParams,
  });
};
export const updateBillingAddress = (billingAddress, pieEnabled, giftCardFlow, cardinalInit) => (dispatch, getState) => {
  dispatch(asyncFetch())
  const state = getState().toJS();
  const { updateBillingAddressInfoURL } = state.orderDetails;
  updateBillingAPI(billingAddress, updateBillingAddressInfoURL, pieEnabled, cardinalInit).then((response) => {
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(asyncFetchSucess());
      dispatch(resetState(response.data.output));
      hashHistory.push('/');
    } else {
      dispatch(asyncFetchSucess());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      dispatch(reset('BillingAddress'));
    }
  })
}
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
    console.log('Catch Exception:', error);
    return giftCardInfo;
  }
  return giftCardInfo;
};

const addCardAPI = (cardInfo, addPaymentForm, updatePaymentInfoURL, billingAddress, pieEnabled, cardinalInit) => {
  const { creditCard: encryptedCard, cvv: encryptedCVV, isEncrypted } = encryptCreditCard(cardInfo.card_number, cardInfo.card_cvc, pieEnabled);
  const requestParams = {
    creditCardNumber: encryptedCard,
    creditCardExpMonth: cardInfo.card_month,
    creditCardExpYear: cardInfo.card_year,
    billingZipCode: cardInfo.zipcode,
    creditCardVerificationNumber: encryptedCVV,
    creditCardType: cardInfo.cardType,
    nickname: '',
    selectedpaymentType: 'newCard',
    isEncrypted,
    cardinalInit,
    billingAddress: billingAddress
  };
  return request({
    method: 'post',
    url: updatePaymentInfoURL,
    data: requestParams,
  });
};

export const addNewCard = (cardInfo, addPaymentForm, pieEnabled, giftCardFlow, cardinalInit) => function (dispatch, getState) {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const { updatePaymentInfoURL } = state.orderDetails;
  const { pastDueCheckoutURL } = state.orderDetails;
  const { billingAddress } = state.orderDetails.billingInfo

  addCardAPI(cardInfo, addPaymentForm, updatePaymentInfoURL, billingAddress, pieEnabled, cardinalInit).then((response) => {
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
        addPaymentForm.setState({ masked_card_number: '', card_number: '', card_error: '' });
        /* setTimeout(() => {
            dispatch(hideNotification());
          }, 5000); */
      }
    } else {
      dispatch(asyncFetchSucess());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch((error) => {
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    hashHistory.push('/genericError');
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
  }).catch((error) => {
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};


/* *
 * Generic post API
 * */
const postAPI = (data, url) => (request({
  method: 'post',
  url,
  data,
}));

const getAPI = (url, paramaters) => request.get(url, { params: paramaters });

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
      dispatch(asyncFetchSucess());// action to hide loader
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch((error) => {
    console.log('Catch Execption:', error);
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
  }).catch((error) => {
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
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
  }).catch((error) => {
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};
/* *
 * Submit order
 * */

export const placeOrder = (submitOrderURL, smsOptin, updateOptInSmsNumber) => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  request({
    method: 'post',
    url: submitOrderURL,
    data: {

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

export const applePayOption = (appleMerchantIdentifier) => (dispatch) => {
  dispatch(asyncFetch());
  if (typeof window.ApplePaySession !== 'undefined' && window.ApplePaySession) {
    // eslint-disable-next-line no-undef
    const promise = ApplePaySession.canMakePaymentsWithActiveCard(appleMerchantIdentifier);
    promise.then((canMakePayments) => {
      dispatch(asyncFetchSucess());
      dispatch(applePayOn(canMakePayments));
    }).catch((error) => {
      dispatch(asyncFetchFalied());
      console.log('error', error);
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

const updatePaypalPaymentInfoAPI = (url) =>
  // return request.post('http://www.mocky.io/v2/596801531100000c026149f3');
  request.post(url);

  export const paypalPaymentMethod = () => (dispatch, getState) => {
    const state = getState().toJS();
    const url = state.orderDetails.paypalCmpiLookupURL;

    dispatch(asyncFetch());// action to show loader
    updatePaypalPaymentInfoAPI(url).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    window.location.href = response.data.output;
  }).catch((error) => {
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};
export const fetchZipCodeInfo = (zipCode, form) => (dispatch, getState) => {
  console.log(zipCode)
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
    //const response = {"data" : {"output":{"orderId":"SDC88c19182644a0790f5be4e7f0d2cb465{d6}","httpPostUrl":"https://testsecureacceptance.cybersource.com/silent/pay","dataMap":{"unsigned_field_names":"card_type,card_number,card_expiry_date,card_cvn","amount":"1","bill_to_address_postal_code":"15317","signature":"2bs04hA20eZqvyfiruHELtZ5vBNup2rETmnVFOu4Q7M=","bill_to_address_state":"PA","transaction_uuid":"d63e9479-474d-4dae-8b2e-cdab9a1c939e","signed_field_names":"access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code,override_custom_receipt_page,ignore_avs","locale":"en","transaction_type":"authorization,create_payment_token","bill_to_email":"aa@aa.com","reference_number":"SDC88c19182644a0790f5be4e7f0d2cb465{d6}","ignore_avs":"true","bill_to_address_country":"US","bill_to_surname":"BELTRAN","bill_to_address_line1":"301 CARRIAGE HILL APT'S","profile_id":"602C4C13-900B-46DE-9668-76CB2D14F3E3","access_key":"f43969b9e54539e3ba6ad6bb1a24ee30","bill_to_phone":"9999999999","override_custom_receipt_page":"/checkout/payment/","bill_to_address_city":"MC MURRAY","currency":"USD","bill_to_forename":"BRIAN","signed_date_time":"2018-02-16T12:47:31Z","payment_method":"card"},"cardTypeMap":{"001":"Visa","002":"MasterCard","003":"American Express","004":"Discover"}},"errorMap":null,"statusMessage":"Service completed Successfully.","statusCode":"00"}};
    dispatch(setCyberSourceData(res));
  }).catch((err) => {
    console.log('Error in err', err);
  });
};