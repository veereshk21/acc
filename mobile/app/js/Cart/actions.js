/**
 * Created by hmahad on 1/4/2017.
 * Cart Page Actions
 */
import axios from 'axios';
import { hashHistory } from './../store';

import * as cartConstants from './constants';

import * as notificationActions from '../common/NotificationBar/actions';
import { hideOffersBanner } from './../common/MyOfferBanner/actions';
import { getErrorMap, updateCartCount } from './../common/Helpers';
import { hideCostClarifier } from './../common/CostHeader/actions';

const getCartClearMessage = (fieldName) => {
  let updateMsg = {};
  switch (fieldName) {
    case 'cartMessages':
      updateMsg = {
        cartMessages: {
          message: null,
        },
      };
      break;
    case 'cpcSuccessful':
      updateMsg = {
        cpcSucessful: false,
      };
      break;
    case 'showPreOrderMsg':
      updateMsg = {
        isPOBODeviceInCart: false,
      };
      break;
    default:
      updateMsg = {};
  }

  return updateMsg;
};

/**
 *
 * @param cartView string
 * @returns {{type, data: *}}
 */
export function changeCartView(cartView) {
  return {
    type: cartConstants.CHANGE_CARTVIEW,
    data: cartView,
  };
}
/**
 * Action sets a loader to be shown on page
 * */
export const asyncFetch = () => {
  window.showLoader();
  return {
    type: cartConstants.ASYNC_FETCH,
  };
};

/**
 * Action clears the loader on the page.
 * */
export const asyncFetchSuccess = (response) => {
  window.hideLoader();

  return {
    type: cartConstants.ASYNC_FETCH_SUCCESS,
    data: response,
  };
};


/**
 * Action clears the loader and also data in data node.
 * */
export const asyncFetchClear = () => ({
  type: cartConstants.ASYNC_FETCH_CLEAR,
});

/**
 * Action sets a hide loader on error
 * */
export const asyncFetchFailure = () => {
  window.hideLoader();
  return {
    type: cartConstants.ASYNC_FETCH_FAILURE,
  };
};


/**
 * Service call to clear the cart completely.
 * * */

export const clearCartAPI = (orderId, url) => {
  const data = {
    orderId,
  };
  return axios.post(url, data);

  // return axios.get("http://echo.jsontest.com/success/true/cartEmpty/true");
};


/**
 * Action thunk to dispatch loading utilities and clear the cart items.
 * */

export const clearCart = () => (dispatch, getState) => {
  dispatch(asyncFetch());

  /* Fetch order id and accessories only flag form application state */
  const state = getState();
  const orderId = state.get('cartData').get('orderId');
  const url = state.get('cartData').get('clearCartURL');

  // let standaloneAccessories = state.get('cartData').get('standaloneAccessories');

  /* TODO: find a elegant solution to change async state and call fetch in a single action creator */

  clearCartAPI(orderId, url).then((axiosResp) => {
    /* TODO:Remove dummy data with actual response */
    const response = axiosResp.data;
    dispatch(asyncFetchSuccess(response.output));
    updateCartCount(); // updates cart count in gnav
    // hide offers banner if there is no itmes in cart
    if (response.output.cartItemCount < 1) {
      dispatch(hideOffersBanner());
    }
    dispatch(notificationActions.hideNotification());
    dispatch(resetCartItems(response.output));
    dispatch(hideCostClarifier());
  }).catch((err) => {
    console.log(err);
  });
};
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
      window.location.reload();
    } else {
      // dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      dispatch(notificationActions.showErrorNotification(getErrorMap(response.data.errorMap)));
    }
    dispatch(asyncFetchSuccess());
  }).catch((err) => {
    console.log(err); // eslint-disable-line no-console
    dispatch(asyncFetchFailure());
  });
};

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
  const orderId = state.get('cartData').get('orderId');
  const url = state.get('cartData').get('applyPromoCodeURL');
  applyPromoCodeAPI(promoCode, orderId, url).then((axiosResp) => {
    /** TODO:Remove once valid response is confirmed */
    const responseData = axiosResp.data;
    dispatch(asyncFetchSuccess(responseData));

    if (responseData.statusCode === '00') {
      if (responseData.errorMap && Object.keys(responseData.errorMap).length > 0) {
        /* Some error has occurred , show notification if errorMap is not empty. */
        dispatch(notificationActions.showErrorNotification(getErrorMap(responseData.errorMap)));
      } else {
        dispatch(notificationActions.showInfoNotification('Promo applied successfully'));
        /* use data from output node. */
        dispatch(resetCartItems(responseData.output));
        /* redirect to cart summary */
        hashHistory.push('/');
      }
    } else if (responseData.statusCode !== '00') {
      /* Some error has occurred while adding promocode, do not redirect to cart summary or use data from output node */
      if (Object.keys(responseData.errorMap).length > 0) {
        dispatch(notificationActions.showErrorNotification((getErrorMap(responseData.errorMap))));
      } else {
        // Fallback in case errorMap is not populated from backend.
        dispatch(notificationActions.showErrorNotification('Some error has occured , Please try again later'));
      }
    }
  }).catch((err) => {
    console.log(err);
    dispatch(asyncFetchFailure());
  });
};

/**
 * Action updates the new promo code in app state tree.
 * */
export const addPromoCode = (promoCode) => ({
  type: cartConstants.ADD_PROMOCODE,
  data: promoCode,
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
  const orderId = state.get('cartData').get('orderId');
  const url = state.get('cartData').get('removePromoCodeURL');

  removePromoCodeAPI(promoCode, orderId, url).then((resp) => {
    const response = resp.data;
    dispatch(asyncFetchSuccess(response));
    dispatch(resetCartItems(response.output));
    // dispatch(removePrmCode(promoCode));
  }).catch((err) => {
    dispatch(asyncFetchFailure());
    dispatch(notificationActions.showErrorNotification(err));
    console.log(err);
  });
};


/**
 * Service call to handle zip code changes
 * */
export const changeZipAPI = (zipCode, orderId, url) => {
  const data = { zipCode, orderId };
  /** TODO:Replace with actual service */
  return axios.post(url, data);
  // return axios.get("http://echo.jsontest.com/success/true/validZip/true/location/Newyork/state/NY/tax/70.99");
};


/**
 * Action thunk to be called when zip code is changed in due today section.
 * */

export const changeZipCode = (zipCode) => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState();
  const orderId = state.get('cartData').get('orderId');
  const url = state.get('cartData').get('changeZipCodeURL');

  changeZipAPI(zipCode, orderId, url).then((resp) => {
    /** TODO:Remove dummy data once response is confirmed */
    /** TODO:Two actions are triggered below, check for race conditions */
    const responseData = resp.data;


    if (responseData.statusCode === '00') {
      if (responseData.output.cartMessages.cartReadyforCheckout === true) {
        dispatch(asyncFetchSuccess({ validZip: true }));
        dispatch(resetCartItems(responseData.output));
      } else {
        dispatch(asyncFetchSuccess({ validZip: false }));
        dispatch(resetCartItems(responseData.output));// Needed since cartmessage has the service error.
      }
    } else {
      dispatch(asyncFetchSuccess({ validZip: false }));
    }
  }).catch((err) => {
    console.log(err);
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

/**
 * Service call to remove the selected cart item.
 * */

export const removeCartItemAPI = (deviceCommerceId, orderId, flow, url) => {
  const data = {
    action: 'REMOVE',
    commerceItemId: deviceCommerceId,
    orderId,
    flow,
  };

  /** *TODO: Replace with actual remove cart item service */
  return axios.post(url, data);

  // return axios.get("http://echo.jsontest.com/success/true/validPromo/false");
};

export const removeAccessoryItemAPI = (deviceCommerceId, skuId, prodId, orderId, url) => {
  const data = {
    action: 'REMOVE',
    commerceItemId: deviceCommerceId,
    accSkuId: skuId,
    accProdId: prodId,
    accQty: 1,
    orderId,
  };

  /** *TODO: Replace with actual remove cart item service */
  return axios.post(url, data);

  // return axios.get("http://echo.jsontest.com/success/true/validPromo/false");
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

const removeDeviceStore = ({ commerceItemId, flow }) => (
  dispatch,
  getState
) => {
  dispatch(asyncFetch());

  const state = getState().get('cartData').toJS();
  const { orderId } = state;
  const url = state.addOrUpdateDeviceURL;

  removeDeviceAPI(commerceItemId, orderId, flow, url).then((response) => {
    if (response.data.statusCode === cartConstants.API_SUCCESS_CODE) {
      const { data } = response;
      dispatch(resetCartItems(data.output));
      updateCartCount(); // updates cart count in gnav
    } else {
      dispatch(notificationActions.showErrorNotification(getErrorMap(response.data.errorMap)));
    }
    dispatch(asyncFetchSuccess());
  }).catch((err) => {
    console.log(err); // eslint-disable-line no-console
    dispatch(asyncFetchSuccess());// on API failure
  });
};

/**
 * Action thunk to dispatch loading utils and also trigger service call
 * to remove the selected item.
 * */

export const removeDevice = ({ commerceItemId, flow, mtn }) => (
  dispatch,
  getState
) => {
  dispatch(asyncFetch());

  const state = getState().get('cartData').toJS();
  console.log(state);
  const { orderId } = state;
  const isMixAndMatch = state.isHLLPlanInOrder || false;
  const removeDeviceURL = state.removeDeviceURL || null;

  if (removeDeviceURL && isMixAndMatch) {
    removeCPC_DeviceAPI(commerceItemId, orderId, flow, removeDeviceURL, mtn).then((response) => {
      if (response.data.statusCode === cartConstants.API_SUCCESS_CODE) {
        dispatch(removeDeviceStore({ commerceItemId, flow }));
      } else {
        dispatch(notificationActions.showErrorNotification(getErrorMap(response.data.errorMap)));
      }
      dispatch(asyncFetchSuccess());
    }).catch((err) => {
      console.log(err); // eslint-disable-line no-console
    });
  } else {
    dispatch(removeDeviceStore({ commerceItemId, flow }));
  }
};


/**
 * Action thunk to dispatch loading utils and also trigger service call
 * to remove the selected item.
 * */

export const removeCartItem = (deviceObj) => (dispatch, getState) => {
  dispatch(asyncFetch());

  const state = getState();
  const orderId = state.get('cartData').get('orderId');
  const url = state.get('cartData').get('addOrUpdateDeviceURL');
  const deviceCommerceId = deviceObj.commerceItemId;
  const { flow } = deviceObj;


  removeCartItemAPI(deviceCommerceId, orderId, flow, url).then((response) => {
    const resp = response.data;
    dispatch(asyncFetchSuccess(resp));
    dispatch(resetCartItems(resp.output));
    updateCartCount(); // updates cart count in gnav
  }).catch((err) => {
    console.log(err);
  });
};


export const removeAccessoryItem = (deviceCommerceId, skuId, prodId) => (dispatch, getState) => {
  dispatch(asyncFetch());

  const state = getState();
  const orderId = state.get('cartData').get('orderId');
  const url = state.get('cartData').get('addOrRemoveAccessoryURL');

  removeAccessoryItemAPI(deviceCommerceId, skuId, prodId, orderId, url).then((response) => {
    /* TODO:Remove dummy data once actual response is received */

    const resp = response.data;
    dispatch(asyncFetchSuccess(resp));
    dispatch(resetCartItems(resp.output));
    updateCartCount(); // updates cart count in gnav
  }).catch((err) => {
    console.log(err);
  });
};

const setSelectedProtectionOption = (sfoSkuId) => ({
  type: cartConstants.SELECT_PROTECTION_FEATURE,
  sfoSkuId,
});

/* Protection Options */
const setProtectionOptions = (data) => ({
  type: 'common/GET_PROTECTION_OPTIONS',
  data,
});

export const clearProtectionOptions = () => ({
  type: 'common/CLEAR_PROTECTION_OPTIONS',
  data: {},
});

// This doesn't seem to be used anymore
const getProtectionOptionsAPI = (flow, mtn, deviceSORId) => axios.get(`/od/cust/auth/cart/getCompatibleFeatures?upgradeDeviceSORId=${deviceSORId}&upgradeDeviceMTN=${mtn}&flow=${flow}&featureType=INS`);

export const saveProtectionOptionsAPI = (data, url) => axios.post(url, data);


export const getProtectionOptions = (flow, mtn, deviceSORId) => ((dispatch) => {
  dispatch(asyncFetch());


  getProtectionOptionsAPI(flow, mtn, deviceSORId).then((response) => {
    const resp = response.data;
    dispatch(asyncFetchSuccess(resp.output));
    dispatch(setProtectionOptions(resp));
  }).catch((error) => {
    console.log(error);
  });
});

export const saveProtectionOptions = (data) => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState();
  const url = state.get('cartData').get('addOrUpdateFeatureURL');

  saveProtectionOptionsAPI(data, url).then((resp) => {
    /** TODO:Remove dummy data once response is confirmed */
    /** TODO:Two actions are triggered below, check for race conditions */
    const responseData = resp.data;

    if (responseData.statusCode === '00') {
      if (responseData.output.cartMessages.cartReadyforCheckout === true) {
        dispatch(asyncFetchSuccess({ validProtection: true }));
        dispatch(resetCartItems(responseData.output));
      } else {
        dispatch(asyncFetchSuccess({ validProtection: false }));
        dispatch(resetCartItems(responseData.output));// Needed since cartmessage has the service error.
      }
      dispatch(setSelectedProtectionOption(data.featureSkuId));// preserve selected protection sfoSkuId in state so that it can be preselected when the customer comes back.
    } else {
      dispatch(asyncFetchSuccess({ validProtection: false }));
    }
  }).catch((err) => {
    console.log(err);
  });
};

export const callCheckoutAPI = (url) =>
  // return axios.get("http://www.mocky.io/v2/59af10f113000019090359b6");
  axios.post(url);


export const initiateCheckout = () => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState();
  const url = state.get('cartData').get('initiateCheckoutURL');
  const spinnerErrorMsg = state.get('cqContent').get('error').get('SPINNER_ERROR_MSG');

  callCheckoutAPI(url).then((response) => {
    if (typeof response.status !== 'undefined' && response.status === 500) {
      dispatch(asyncFetchFailure());
      // The message should come from CQ JSON
      dispatch(notificationActions.showErrorNotification(spinnerErrorMsg));
    } else if ((response.data.output !== null && typeof response.data.output.goToSuccessURL !== 'undefined')) {
      dispatch(asyncFetchSuccess());
      window.location.href = response.data.output.goToSuccessURL;
    } else {
      dispatch(asyncFetchFailure());
      dispatch(notificationActions.showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch(() => {
    console.log('***Error during Initiate Checkout***');
    dispatch(asyncFetchFailure());
    // The message should come from CQ JSON
    dispatch(notificationActions.showErrorNotification(spinnerErrorMsg));
  });
};

/**
 * Action to clear message present in cart on page load
 *
 * */
export const clearCartMessage = (clearField) => ({
  type: cartConstants.CLEAR_CART_MESSAGE,
  data: getCartClearMessage(clearField),
});

export const removeAccessoryBundleItemAPI = (skuId, accName, commerceItemId, orderId, url) => {
  const data = {
    action: 'REMOVE',
    commerceItemId,
    accSkuId: skuId,
    accProdId: skuId,
    accQty: 1,
    orderId,
    accName,
  };
  return axios.post(url, data);
};

export const removeAccessoryBundleItem = (accName, skuId, commerceItemId) => (dispatch, getState) => {
  dispatch(asyncFetch());

  const state = getState();
  const orderId = state.get('cartData').get('orderId');
  const url = state.get('cartData').get('addOrRemoveAccessoryURL');
  // const url = '/od/cust/auth/cart/addOrRemoveAccessory';
  removeAccessoryBundleItemAPI(skuId, accName, commerceItemId, orderId, url).then((response) => {
    const resp = response.data;
    dispatch(asyncFetchSuccess(resp));
    dispatch(resetCartItems(resp.output));
    updateCartCount(); // updates cart count in gnav
  }).catch((err) => {
    dispatch(asyncFetchFailure());
    console.log(err);
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
  sendEmailAPI().then((resp) => {
    dispatch(asyncFetchSuccess());
    // console.log(resp.data.output);
    dispatch(setEmailResponse({ emailResponse: resp.data.output }));
    hashHistory.push('/');
  }).catch((err) => {
    dispatch(asyncFetchFailure());
    console.log(err);
  });
};

export const clickToCallUpdate = (submitCCInfo) => {
  if (typeof window.vzwDL !== 'undefined' && window.vzwDL !== null && typeof window.vzwDL.page !== 'undefined' && window.vzwDL.page !== null) {
    const productID = window.vzwDL.page.productId;
    const title = window.vzwDL.page.pageName;
    const flow = window.vzwDL.page.flowName;
    axios
      .get('/od/cust/auth/cart/clickToCallUpdate', {
        params: {
          SORId: productID,
          pageTitle: title,
          flow,
          submitCCInfo,
        },
      })
      .then((res) => {
        if (typeof res.data !== 'undefined' && res.data !== null && typeof res.data.output !== 'undefined' && res.data.output !== null) {
          window.vzgn_c2cuniqueId = res.data.output.referenceNum;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export const setC2CFlag = () => ({
  type: cartConstants.SET_C2C_FLAG,
  data: { c2cFlag: true },
});
