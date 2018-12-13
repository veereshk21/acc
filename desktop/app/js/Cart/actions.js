import axios from 'axios';
import { hashHistory } from './../store';
import * as cartConstants from './constants';
import { showErrorNotification, hideNotification } from './../common/NotificationBar/actions';
import { getErrorMap, updateCartCount } from './../common/Helpers';

/* import {
 API_SUCCESS_CODE,
 ASYNC_FETCH,
 ASYNC_FETCH_SUCCESS,
 ASYNC_FETCH_FAILURE,
 ASYNC_FETCH_INVALIDATE,
 RESET_CART,
 } from './constants'; */

/* *
 * Action sets a loader to be shown on page
 * */
export function asyncFetch() {
  return {
    type: cartConstants.ASYNC_FETCH,
  };
}

/* *
 * Action clears the loader on the page.
 * */
function asyncFetchSuccess(data) {
  return {
    type: cartConstants.ASYNC_FETCH_SUCCESS,
    data,
  };
}

/* *
 * Action displays API error on the page.
 * */
function asyncFetchFailed() {
  return {
    type: cartConstants.ASYNC_FETCH_FAILURE,
  };
}

/* *
 * Action clears the loader and also data in data node.
 * */
export function invalidateAsyncFetch() {
  return {
    type: cartConstants.ASYNC_FETCH_INVALIDATE,
  };
}

export function toggleEnterZip(data) {
  return {
    type: 'ENTER_ZIP',
    data,
  };
}
/*
toggle modal
 */
export const toggleModal = (name) => ({
  type: cartConstants.TOGGLE_MODAL,
  name,
});

/**
 * Async call to apply promo code,also checks for Promo Code validity.
 * * */

export const applyPromoCodeAPI = (promoCode, orderId, url) => {
  const data = {
    barCode: promoCode,
    orderId,
  };
  /** TODO:Remove dummy call once response is confirmed */
  return axios.post(url, data);

  // return axios.get("http://echo.jsontest.com/success/true/validPromo/false");
};

/**
 * Action thunk to dispatch loading utilities and make async call to apply promo code.
 *
 * * */

export const checkPromoCode = (promoCode) => (dispatch, getState) => {
  dispatch(asyncFetch());
  /* Fetching order id from state tree */
  const state = getState();
  const cartData = state.get('cartData').get('output');
  const orderId = cartData.get('orderId');
  const url = cartData.get('applyPromoCodeURL');
  applyPromoCodeAPI(promoCode, orderId, url).then((axiosResp) => {
    /** TODO:Remove once valid response is confirmed */
    const responseData = axiosResp.data;
    dispatch(asyncFetchSuccess(responseData));

    if (responseData.statusCode === cartConstants.API_SUCCESS_CODE) {
      dispatch(resetCartItems(responseData));
      /* redirect to cart summary */
      hashHistory.push('/');
    } else {
      dispatch(showErrorNotification(getErrorMap(responseData.errorMap)));
    }
  }).catch((err) => {
    console.log(err);// eslint-disable-line no-console
    dispatch(asyncFetchFailed());// on API failure
    dispatch(hideNotification());
  });
};

/**
 * Action updates the new promo code in app state tree.
 * */
export const addPromoCode = (promoCode) => ({
  type: cartConstants.ADD_PROMOCODE,
  data: promoCode,
});
/*
reset cart message on close of cart message notification
 */
export const resetCartMessages = () => ({
  type: cartConstants.RESET_CART_MESSAGE,
});
/**
 * Action removes the give promocode from the state tree.
 * */

export const removePrmCode = (promoCode) => ({
  type: cartConstants.REMOVE_PROMOCODE,
  data: promoCode,
});

/**
 * Service call to remove the given promo code
 * */

export const removePromoCodeAPI = (promoCode, orderId, url) => {
  const data = {
    /** TODO:Confirm is userInfo node will be populated by backend */
    barCode: promoCode,
    orderId,

  };
  /** TODO:Remove dummy call once response is confirmed */
  return axios.post(url, data);
  // return axios.get("http://echo.jsontest.com/success/true/validPromo/false");
};

/**
 * Action thunk to trigger service call to remove promo code and other loading utility actions.
 * */
export const removePromoCode = (promoCode) => (dispatch, getState) => {
  dispatch(asyncFetch());
  /* Fetching order id from state tree */
  const state = getState();
  const orderId = state.get('cartData').get('output').get('orderId');
  const url = state.get('cartData').get('output').get('removePromoCodeURL');

  removePromoCodeAPI(promoCode, orderId, url).then((response) => {
    if (response.data.statusCode === cartConstants.API_SUCCESS_CODE) {
      dispatch(asyncFetchSuccess());
      dispatch(resetCartItems(response.data));
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
    dispatch(asyncFetchSuccess());
    // dispatch(removePrmCode(promoCode));
  }).catch((err) => {
    console.log(err);// eslint-disable-line no-console
    dispatch(asyncFetchFailed());// on API failure
    dispatch(hideNotification());
  });
};

/**
 * Service call to handle zip code changes
 * */
export const changeZipAPI = (zipCode, orderId, url) => {
  const data = { zipCode, orderId };
  /** TODO:Replace with actual service */
  return axios.post(url, data);
};

/**
 * Action thunk to be called when zip code is changed in due today section.
 * */

export const changeZipCode = (zipCode) => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState();
  const orderId = state.get('cartData').get('output').get('orderId');
  const url = state.get('cartData').get('output').get('changeZipCodeURL');

  changeZipAPI(zipCode, orderId, url).then((resp) => {
    /** TODO:Remove dummy data once response is confirmed */
    /** TODO:Two actions are triggered below, check for race conditions */
    const responseData = resp.data;

    if (responseData.statusCode === cartConstants.API_SUCCESS_CODE) {
      if (responseData.output.cartMessages.cartReadyforCheckout === true) {
        dispatch(asyncFetchSuccess({ validZip: true }));
        dispatch(toggleEnterZip({ isEnterZipDisplay: false }));
        dispatch(resetCartItems(responseData));
      } else {
        dispatch(asyncFetchSuccess({ validZip: false }));
        dispatch(resetCartItems(responseData));// Needed since cartmessage has the service error.
      }
      dispatch(asyncFetchSuccess());
    } else {
      dispatch(asyncFetchSuccess({ validZip: false }));
      dispatch(showErrorNotification(getErrorMap(responseData.errorMap)));
    }
  }).catch((err) => {
    console.log(err);// eslint-disable-line no-console
    dispatch(asyncFetchFailed());// on API failure
    dispatch(hideNotification());
  });
};

/**
 * Action to update the given zip code in the application state tree.
 * TODO: confirm the type of response.
 * */

export const changeZipCodeSuccess = (responseData) => ({
  type: cartConstants.UPDATE_ZIPCODE,
  data: responseData,
});

export const initiateCheckoutAPI = (url) => axios.post(url);

const updatePaypalPaymentInfoAPI = (url) => axios.post(url);

export const initiateCheckout = (paypalEnabled, masterpassEnabled, masterPassErrorMsg) => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState();
  const url = state.get('cartData').get('output').get('initiateCheckoutURL');
  const paypalApi = state.get('cartData').get('output').get('paypalApi');
  const masterpassConfigInfo = state.get('cartData').get('output').get('masterpassConfigInfo');
  const masterPassConfigData = masterpassConfigInfo && masterpassConfigInfo.toJS();
  initiateCheckoutAPI(url).then((response) => {
    const goToSuccessURL = response.data.output && response.data.output.goToSuccessURL;
    if (response.data.statusCode !== cartConstants.API_SUCCESS_CODE && (typeof goToSuccessURL !== typeof undefined && goToSuccessURL !== null)) {
      window.location.href = goToSuccessURL;
    } else if (response.data.statusCode === cartConstants.API_SUCCESS_CODE) {
      dispatch(asyncFetch());
      if (paypalEnabled === true) {
        updatePaypalPaymentInfoAPI(paypalApi).then((payPalResp) => {
          if (payPalResp.data.statusCode === cartConstants.API_SUCCESS_CODE) {
            window.location.href = payPalResp.data.output;
          } else {
            dispatch(showErrorNotification(getErrorMap(payPalResp.data.errorMap)));
          }
          dispatch(asyncFetchSuccess());
        }).catch((err) => {
          console.log(err);// eslint-disable-line no-console
          dispatch(asyncFetchFailed()); // on API failure
          dispatch(hideNotification());
          // hashHistory.push('/genericError');
        });
      } else if (masterpassEnabled === true) {
        try {
          window.masterpass.checkout(masterPassConfigData);
        } catch (err) {
          console.log(err); // eslint-disable-line  no-console
          dispatch(asyncFetchFailed()); // on API failure
          dispatch(showErrorNotification(masterPassErrorMsg));
        }
      } else {
        window.location.href = response.data.output.goToSuccessURL;
      }
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
    dispatch(asyncFetchSuccess());
  }).catch((err) => {
    console.log(err);// eslint-disable-line no-console
    dispatch(asyncFetchFailed());// on API failure
    dispatch(hideNotification());
  });
};

const setEmailResponse = (data) => ({
  type: cartConstants.ACCOUNT_EMAIL_SENT,
  data,
});

/**
 * Service call to send email to account owner
 * */
export const sendEmailAPI = () => {
  const data = { sendSpecialOffers: false };
  /** TODO:Replace with actual service */
  return axios.post(cartConstants.API_EMAIL_CART, data);
};

/**
 * Action thunk to be called when email cart
 * */

export const sendEmailCart = () => (dispatch) => {
  dispatch(asyncFetch());
  // dispatch(notificationActions.hideNotification());
  sendEmailAPI().then((resp) => {
    if (resp.data.statusCode === cartConstants.API_SUCCESS_CODE) {
      dispatch(setEmailResponse({ emailResponse: resp.data.output }));
    } else {
      dispatch(showErrorNotification(getErrorMap(resp.data.errorMap)));
    }
    dispatch(asyncFetchSuccess());
    // dispatch(notificationActions.showInfoNotification(resp.data.output.cartSavedMessage));

    hashHistory.push('/');
  }).catch((err) => {
    console.log(err); // eslint-disable-line no-console
    dispatch(asyncFetchFailed());// on API failure
    dispatch(hideNotification());
  });
};

/**
 * Action to reset the application state with new cartjson
 *
 * */
export const resetCartItems = (response) => ({
  type: cartConstants.RESET_CART,
  data: response,
});

/**
 * Service call to clear the cart completely.
 * * */

export const clearCartAPI = (orderId, url) => {
  const data = {
    orderId,
  };
  return axios.post(url, data);
};

/**
 * Action thunk to dispatch loading utilities and clear the cart items.
 * */

export const clearCart = () => (dispatch, getState) => {
  dispatch(asyncFetch());

  /* Fetch order id and accessories only flag form application state */
  const state = getState();
  const orderId = state.get('cartData').get('output').get('orderId');
  const url = state.get('cartData').get('output').get('clearCartURL');
  // const removeDeviceURL = state.get('cartData').get('output').get('removeDeviceURL');

  /* TODO: find a elegant solution to change async state and call fetch in a single action creator */

  clearCartAPI(orderId, url).then((res) => {
    const { data } = res;
    if (res.data.statusCode === cartConstants.API_SUCCESS_CODE) {
      dispatch(resetCartItems(data));
      updateCartCount(); // updates cart count in gnav
    } else {
      dispatch(showErrorNotification(getErrorMap(res.data.errorMap)));
    }
    dispatch(asyncFetchSuccess());
  }).catch((err) => {
    console.log(err); // eslint-disable-line no-console
    dispatch(asyncFetchFailed());// on API failure
    dispatch(hideNotification());
  });
};

/**
 * Service call to save cart.
 * * */

export const saveCartAPI = (orderId) => {
  const saveCartURI = cartConstants.API_SAVE_CART;
  const data = {
    orderId,
  };
  return axios.post(saveCartURI, data);
};

/**
 * Action thunk to dispatch loading utilities and saving the cart items.
 * */

export const saveCart = () => (dispatch, getState) => {
  dispatch(asyncFetch());

  /* Fetch order id and accessories only flag form application state */
  const state = getState();
  const orderId = state.get('cartData').get('output').get('orderId');
  // let standaloneAccessories = state.get('cartData').get('standaloneAccessories');

  /* TODO: find a elegant solution to change async state and call fetch in a single action creator */

  saveCartAPI(orderId).then((axiosResp) => {
    /* TODO:Remove dummy data with actual response */
    const response = axiosResp.data;
    dispatch(asyncFetchSuccess(response.output));

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }).catch((err) => {
    console.log(err); // eslint-disable-line no-console
    dispatch(asyncFetchFailed());// on API failure
    dispatch(hideNotification());
  });
};

/**
 * Service call to remove the selected cart item.
 * */

const removeDeviceAPI = (commerceItemId, orderId, flow, url) => {
  const data = {
    action: 'REMOVE',
    commerceItemId,
    orderId,
    flow,
  };

  /** *TODO: Replace with actual remove cart item service */
  return axios.post(url, data);
};

/**
 * Service call to remove the selected cart item.
 * */

const removeCPC_DeviceAPI = (commerceItemId, orderId, flow, url, mtn) => {
  const data = {
    action: 'REMOVE',
    commerceItemId,
    orderId,
    flow,
    mtn,
  };

  /** *TODO: Replace with actual remove cart item service */
  return axios.post(url, data);
};

const removeDeviceStore = ({ commerceItemId, flow }) => (dispatch,
  getState) => {
  dispatch(asyncFetch());

  const state = getState().get('cartData').toJS();
  const { orderId } = state.output;
  const url = state.output.addOrUpdateDeviceURL;

  removeDeviceAPI(commerceItemId, orderId, flow, url).then((response) => {
    if (response.data.statusCode === cartConstants.API_SUCCESS_CODE) {
      const { data } = response;
      dispatch(resetCartItems(data));
      updateCartCount(); // updates cart count in gnav
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
    dispatch(asyncFetchSuccess());
  }).catch((err) => {
    console.log(err); // eslint-disable-line no-console
    dispatch(asyncFetchFailed());// on API failure
    dispatch(hideNotification());
  });
};

/**
 * Action thunk to dispatch loading utils and also trigger service call
 * to remove the selected item.
 * */

export const removeDevice = ({ commerceItemId, flow, mtn }) => (dispatch,
  getState) => {
  dispatch(asyncFetch());

  const state = getState().get('cartData').toJS();
  const { orderId } = state.output;
  const isMixAndMatch = state.output.isHLLPlanInOrder || false;
  const removeDeviceURL = state.output.removeDeviceURL || null;
  const enableRemoveDeviceAndMMPlan = state.output.enableRemoveDeviceAndMMPlan || false;

  if (removeDeviceURL && isMixAndMatch && enableRemoveDeviceAndMMPlan) {
    removeCPC_DeviceAPI(commerceItemId, orderId, flow, removeDeviceURL, mtn).then((response) => {
      dispatch(asyncFetchSuccess());
      if (response.data.statusCode === cartConstants.API_SUCCESS_CODE) {
        dispatch(removeDeviceStore({ commerceItemId, flow }));
      } else {
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      }
    }).catch((err) => {
      console.log(err); // eslint-disable-line no-console
    });
  } else {
    dispatch(removeDeviceStore({ commerceItemId, flow }));
  }
};

/*
 Remove standalone accessory
 */
const removeAccessoryAPI = ({
  url, ...restParams
}) => {
  const data = {
    action: 'REMOVE',
    accQty: 1,
    ...restParams,
  };

  return axios({
    method: 'post',
    url,
    data,
  });
};

export const removeStandAloneAccessory = (params) => (dispatch, getState) => {
  dispatch(asyncFetch());

  const state = getState();
  const orderId = state.get('cartData').get('output').get('orderId');
  const url = state.get('cartData')
    .get('output')
    .get('addOrRemoveAccessoryURL');

  removeAccessoryAPI({ orderId, url, ...params }).then((response) => {
    if (response.data.statusCode === cartConstants.API_SUCCESS_CODE) {
      const { data } = response;
      dispatch(resetCartItems(data));
      updateCartCount(); // updates cart count in gnav
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
    dispatch(asyncFetchSuccess());
  }).catch((err) => {
    console.log(err); // eslint-disable-line no-console
    dispatch(asyncFetchFailed());// on API failure
    dispatch(hideNotification());
  });
};
export const removeAccessoryBundle = (params) => (dispatch, getState) => {
  dispatch(asyncFetch());

  const state = getState();
  const orderId = state.get('cartData').get('output').get('orderId');
  const url = state.get('cartData')
    .get('output')
    .get('addOrRemoveAccessoryURL');

  removeAccessoryAPI({ orderId, url, ...params }).then((response) => {
    if (response.data.statusCode === cartConstants.API_SUCCESS_CODE) {
      const { data } = response;
      dispatch(resetCartItems(data));
      updateCartCount(); // updates cart count in gnav
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
    dispatch(asyncFetchSuccess());
  }).catch((err) => {
    console.log(err); // eslint-disable-line no-console
    dispatch(asyncFetchFailed());// on API failure
    dispatch(hideNotification());
  });
};
const addRecommAccessoryToCartAPI = ({ url, ...restParams }) => {
  const data = {
    ...restParams,
    action: 'add',
    cartJson: true,
  };
  return axios({
    method: 'post',
    url,
    data,
  });
};
export const addRecommAccessoryToCart = (params) => (dispatch, getState) => {
  dispatch(asyncFetch());

  const state = getState();
  const url = state.get('cartData')
    .get('output')
    .get('addOrRemoveAccessoryURL');

  addRecommAccessoryToCartAPI({ ...params, url }).then((response) => {
    if (response.data.statusCode === cartConstants.API_SUCCESS_CODE) {
      const { data } = response;
      dispatch(resetCartItems(data));
      updateCartCount(); // updates cart count in gnav
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
    dispatch(asyncFetchSuccess());
    window.scroll(0, 0);
  }).catch((err) => {
    console.log(err); // eslint-disable-line no-console
    dispatch(asyncFetchFailed());// on API failure
    dispatch(hideNotification());
  });
};


/*
Recommended accessories actions
 */
function recommAccAsyncFetch() {
  return {
    type: cartConstants.RECOMM_ACC_FETCH,
  };
}


function recommAccAsyncFetchSuccess(data) {
  window.hideLoader();
  return {
    type: cartConstants.RECOMM_ACC_FETCH_SUCCESS,
    data,
  };
}


function recommAccAsyncFetchFailed() {
  window.hideLoader();
  return {
    type: cartConstants.RECOMM_ACC_FETCH_FAILURE,
  };
}


export function recommAccInvalidateAsyncFetch() {
  window.hideLoader();
  return {
    type: cartConstants.RECOMM_ACC_FETCH_INVALIDATE,
  };
}


const getRecommendedAccAPI = (url) => axios({
  method: 'get',
  url,
  params: {
    format: 'json',
  },
});

export const getRecommendedAcc = (url) => (dispatch) => {
  // dispatch(asyncFetch());
  dispatch(recommAccAsyncFetch());
  getRecommendedAccAPI(url).then((response) => {
    if (response.data.statusCode === cartConstants.API_SUCCESS_CODE) {
      const { data } = response;

      dispatch(recommAccAsyncFetchSuccess(data));
    }
    dispatch(asyncFetchSuccess());
  }).catch((err) => {
    console.log(err); // eslint-disable-line no-console
    dispatch(recommAccAsyncFetchFailed(err));
    dispatch(asyncFetchFailed());// on API failure
    dispatch(hideNotification());
  });
};

/*
Recommended accessories PDP
 */
function recommAccPDPAsyncFetch() {
  window.showLoader();
  return {
    type: cartConstants.RECOMM_ACC_PDP_FETCH,
  };
}


function recommAccPDPAsyncFetchSuccess(data) {
  return {
    type: cartConstants.RECOMM_ACC_FETCH_PDP_SUCCESS,
    data,
  };
}


function recommAccPDPAsyncFetchFailed() {
  return {
    type: cartConstants.RECOMM_ACC_FETCH_PDP_FAILURE,
  };
}


export function recommAccPDPInvalidateAsyncFetch() {
  return {
    type: cartConstants.RECOMM_ACC_FETCH_PDP_INVALIDATE,
  };
}

const getRecommendedAccProductDetailsAPI = ({ url, productID }) => axios({
  method: 'get',
  url,
  params: {
    format: 'json',
    accProdId: productID,
  },
});

export const getRecommendedAccProductDetails = (props) => (dispatch) => {
  dispatch(asyncFetch());
  dispatch(recommAccPDPAsyncFetch());
  getRecommendedAccProductDetailsAPI(props).then((response) => {
    if (response.data.statusCode === cartConstants.API_SUCCESS_CODE) {
      const { data } = response;

      dispatch(recommAccPDPAsyncFetchSuccess(data));
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
    dispatch(asyncFetchSuccess());
  }).catch((err) => {
    console.log(err); // eslint-disable-line no-console
    dispatch(recommAccPDPAsyncFetchFailed(err));
    dispatch(asyncFetchFailed());// on API failure
    dispatch(hideNotification());
  });
};

/*
 Remove tradein device
 */
/* const updateTradeInDeviceFromCartAPI = (url) => axios({
  method: 'get',
  url,
  params: {
    json: true,
  },
});*/

const removeTradeInDeviceFromCartAPI = ({
  url, ...dataParams
}) => {
  const data = {
    ...dataParams,
  };

  return axios({
    method: 'post',
    url,
    data,
  });
};

export const removeTradeInDeviceFromCart = ({ ...params }) => (dispatch) => {
  dispatch(asyncFetch());
  // const state = getState();
  // const url = state.get('cartData').get('output').get('removeTradeInURL');
  const url = '/od/trade-in/removeTradeIn';
  removeTradeInDeviceFromCartAPI({ ...params, url }).then((response) => {
    // response.data = {"output":{"success":true,"tradeinDeviceRemoved":true,"errorMessage":null},"errorMap":null,"statusMessage":null,"statusCode":"00"};
    if (response.data.statusCode === cartConstants.API_SUCCESS_CODE) {
      /* dispatch(asyncFetchSuccess());
      const updateUrl = state.get('cartData')
        .get('output')
        .get('cartUrl');
      updateTradeInDeviceFromCartAPI(updateUrl).then((axiosResp) => {
        const responseData = axiosResp.data;
        dispatch(asyncFetchSuccess(responseData));

        if (responseData.statusCode === cartConstants.API_SUCCESS_CODE) {
          dispatch(resetCartItems(responseData));
        } else {
          dispatch(showErrorNotification(getErrorMap(responseData.errorMap)));
        }
      }).catch((err) => {
        console.log(err);// eslint-disable-line no-console
        dispatch(asyncFetchFailed());// on API failure
        dispatch(hideNotification());
      });*/
      window.location.reload();
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
    dispatch(asyncFetchSuccess());
  }).catch((err) => {
    console.log(err); // eslint-disable-line no-console
    dispatch(asyncFetchFailed());// on API failure
    dispatch(hideNotification());
  });
};


export const showMasterPassError = (error) => (dispatch) => {
  dispatch(showErrorNotification(error));
};

/*
Masterpass 3D secure
 */
export const handleCardinalResponseUrlApi = (data, jwt, url) => axios({
  method: 'post',
  url,
  data: { cardinalJWTToken: jwt },
});

export const handle3dPaymentValidated = (data, jwt) => (dispatch, getState) => {
  const state = getState().toJS();
  const { handleCardinalResponseURL } = state;

  handleCardinalResponseUrlApi(data, jwt, handleCardinalResponseURL).then((response) => {
    dispatch(asyncFetchSuccess());// action to hide loader
    if (response.data.statusCode === cartConstants.API_SUCCESS_CODE) {
      dispatch(resetCartItems(response.data));
      dispatch(hideNotification());
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFailed());// on API failure
    dispatch(hideNotification());
  });
};
