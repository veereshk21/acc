import * as _ from 'lodash';
import request from 'axios';

import { showErrorNotification, showInfoNotification, hideNotification } from './../common/NotificationBar/actions';
import * as Constants from './constants';
import history from './../store';
// import Logger from './../../../server/logger';
import { getErrorMap } from './../common/Helpers';

/* *
 * Action sets a loader to be shown on page
 * */
function asyncFetch() {
  return {
    type: Constants.ASYNC_FETCH,
  };
}
/* *
 * Action clears the loader on the page.
 * */
function asyncFetchSucess() {
  return {
    type: Constants.ASYNC_FETCH_SUCCESS,
  };
}

/* *
 * Action displays API error on the page.
 * */
function asyncFetchFailed() {
  return {
    type: Constants.ASYNC_FETCH_FAILURE,
  };
}
/* *
 * Action clears the loader and also data in data node.
 * */
function invalidateAsyncFetch() { // eslint-disable-line
  return {
    type: Constants.ASYNC_FETCH_INVALIDATE,
  };
}

/* State to mainntain selected mdn array */
export const addSelectedMdn = (value, selectedMdn) => ({
  type: value ? Constants.ADD_MDN : Constants.REMOVE_MDN,
  data: selectedMdn,
});

export const changeSelectedMDN = (mdn) => ({
  type: Constants.CHANGE_MDN_SELECTED,
  payload: mdn,
});

export const changeMDNSelectionView = (mdnSelectionView) => ({
  type: Constants.CHANGE_MDN_SELECTION_VIEW,
  view: mdnSelectionView,
});


export const loader = (flag) => ({
  type: 'loader',
  payload: flag,
});

/* Ajax call for submitting upgrade/return */
const submitAgreementAction = (data) => ({
  type: Constants.SUBMIT_AGREEMENT,
  data,
});

const submitAgreementPromise = (mdn, selectedOption, deviceType, brand, deviceId, type, ajaxCallUrl) => {
  let queryString;
  if (type === 'reatailPay') {
    queryString = `${ajaxCallUrl}?flow=EUP&mtn=${mdn}&deviceType=${deviceType}&selectedOption=${selectedOption}&brand=${brand}&deviceId=${deviceId}&contractTerm=0&ts=${Date.now()}`;
  } else {
    queryString = `${ajaxCallUrl}?flow=EUP&mtn=${mdn}&deviceType=${deviceType}&selectedOption=${selectedOption}&brand=${brand}&deviceId=${deviceId}&ts=${Date.now()}`;
  }

  return request.get(queryString);
};


export const submitAgreement = (mdn, selectedOption, deviceType, brand, deviceId, type) => ((dispatch, getState) => {
  const state = getState().toJS();
  dispatch(asyncFetch());

  submitAgreementPromise(mdn, selectedOption, deviceType, brand, deviceId, type, state.ajaxCallUrl).then((res) => {
    dispatch(asyncFetchSucess());
    if (typeof res.data === typeof undefined || res.data === null || _.isEmpty(res.data)) {
      history.push('/genericError');
      return false;
    }
    return dispatch(submitAgreementAction(res.data));
  }).catch((error) => {
    dispatch(asyncFetchFailed());
    // Logger.error(error);
    console.error(error); // eslint-disable-line
    history.push('/genericError');
    return false;
  });
});

export const validateTransferUpgrade = (mdn) => {
  const transferUrl = (mdn.action === Constants.TRANSFER_ACTION) ?
    `/od/cust/auth/account/transferUpgrade?action=${mdn.action}&transferFromMTN=${mdn.transferFromMTN}&transferToMTN=${mdn.transferToMTN}` :
    `/od/cust/auth/account/transferUpgrade?action=${mdn.action}&undoTransferMTN=${mdn.undoTransferMTN}`;
  return request.get(transferUrl);
};

const MtnTransferAction = (actionType, data) => ({
  type: actionType,
  data,
});

export const userAction = (data) => ({
  type: Constants.USER_ACTION,
  data,
});

export const showModalValue = (data) => ({
  type: Constants.SHOW_MODAL,
  data,
});

export const showEUPPendingConfirmationModal = (data) => ({
  type: Constants.SHOW_EUP_PENDING_CONFIRM_MODAL,
  data,
});

const composeMessage = (transferToMTN, transferFromMTN, transferObject) =>
  `${transferObject.name[transferToMTN]} ${transferObject.deviceName[transferToMTN]}  will receive the transfer from ${transferObject.name[transferFromMTN]} ${transferObject.deviceName[transferFromMTN]}`;

export const changeSelectedTransferMDN = (mdnDetails, transferObject) => ((dispatch) => {
  dispatch(asyncFetch());

  validateTransferUpgrade(mdnDetails).then((res) => {
    dispatch(asyncFetchSucess());
    if (typeof res.data === typeof undefined || res.data === null || _.isEmpty(res.data)) {
      history.push('/genericError');
      return false;
    }
    dispatch(userAction(mdnDetails.action));
    dispatch(showModalValue(false));
    if (mdnDetails.action === Constants.TRANSFER_ACTION) {
      dispatch(showInfoNotification(composeMessage(mdnDetails.transferToMTN, mdnDetails.transferFromMTN, transferObject)));
    } else {
      dispatch(hideNotification());
    }
    return dispatch(MtnTransferAction(Constants.TRANSFER_MDN_SELECTED, res.data));
  }).catch((error) => {
    dispatch(asyncFetchFailed());
    dispatch(showErrorNotification(error));
    // Logger.error(error);
    console.error(error); // eslint-disable-line
    history.push('/genericError');
    return false;
  });
});

const getLoanInfoPreOrderAction = (data) => ({
  type: Constants.LOAN_INFO_PREORDER,
  data,
});

const getLoanInfoPreOrderAPI = (encryptedMTN, ajaxCallSelectedMTN) => {
  /* Added selectedOption request param to URI as per iconic needs */
  const getLoanInfoPreOrderAPIURL = ajaxCallSelectedMTN + encryptedMTN + '&selectedOption=' + Constants.UPGRADE + '&declineOffer=' + Constants.DECLINE_OFFER;
  return request.get(getLoanInfoPreOrderAPIURL);
};
const getUpgradeWithofferAPI = (redirectURL, encryptedMTN, offerId) => {
  /* Added selectedOption request param to URI as per iconic needs */
  const getUpgradeWithOfferAPIURL = redirectURL + '?t=' + encryptedMTN + '&offerId=' + offerId;
  return request.get(getUpgradeWithOfferAPIURL);
};

export const getParams = (query) => {
  if (!query) {
    return {};
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params, param) => {
      const [key, value] = param.split('=');
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';  // eslint-disable-line
      return params;
    }, {});
};
export const upgradeWithOffer = (redirectURL, encryptedMTN, offerId) => (dispatch) => {
  dispatch(asyncFetch());
  getUpgradeWithofferAPI(redirectURL, encryptedMTN, offerId).then((res) => {
    dispatch(asyncFetchSucess());
    const response = res.data;
    if (response.output.redirectURL) {
      window.location.href = response.output.redirectURL;
    }
  }).catch((error) => {
    dispatch(asyncFetchFailed());
    console.log(error);
    history.push('/genericError');
    return false;
  });
};

export const getLoanInfoPreOrder = (encryptedMTN, ajaxCallSelectedMTN) => (dispatch) => {
  dispatch(asyncFetch());

  getLoanInfoPreOrderAPI(encryptedMTN, ajaxCallSelectedMTN).then((res) => {
    dispatch(asyncFetchSucess());
    const response = res.data;
    /* For iconic ,redirect if redirectURL is present , else make another async call - action call happens in componentDidMount */
    if (response.output.redirectURL) {
      window.location.href = response.output.redirectURL;
    } else if (response.output.redirectURL === null && (typeof response.output.mtnDetailsList === 'undefined')) {
      // dispatch(checkTradeInStatus());
      const urlParams = getParams(window.location.search.substring(1));
      if (typeof urlParams.tradeinSelected !== 'undefined' && (urlParams.tradeinSelected === 'true' || urlParams.tradeinSelected === true)) {
        window.location.href = '/od/cust/auth/promos/device-trade-in';
      } else {
        window.location.href = '/od/cust/auth/cart/getCartDetails';
      }
      dispatch(getLoanInfoPreOrderAction(response));
    } else {
      dispatch(getLoanInfoPreOrderAction(response));
    }
  }).catch((error) => {
    dispatch(asyncFetchFailed());
    // Logger.error(error);
    console.error(error); // eslint-disable-line
    history.push('/genericError');
    return false;
  });
};

const cancelPendingOrderAction = (data) => ({
  type: Constants.CANCEL_PENDING_ORDER,
  data,
});

const cancelPendingOrderPromise = (requestParams) => {
  const { url, selectedMTN } = requestParams;

  return request({
    method: 'post',
    url,
    data: { selectedMTN },
  });
};

export const cancelPendingOrder = (requestParams) => ((dispatch) => {
  dispatch(loader(true));
  cancelPendingOrderPromise(requestParams).then((res) => {
    dispatch(loader(false));
    if (res.data === undefined || res.data == null || _.isEmpty(res.data)) {
      history.push('/genericError');
      return false;
    }
    if (res.data.errorMap) {
      dispatch(showEUPPendingConfirmationModal(res.data));
    } else if (requestParams.orderType === 'EUP') {
      dispatch(showEUPPendingConfirmationModal(true));
    }
    return dispatch(cancelPendingOrderAction(res.data));
  }).catch((error) => {
    console.log('cancelPendingOrder --> Error', error);// eslint-disable-line
    history.push('/genericError');
    return false;
  });
});


export const clearCartAPI = (clearCartLink) => request.post(clearCartLink);

export const clearCart = (clearCartLink) => (dispatch) => {
  dispatch(asyncFetch());
  clearCartAPI(clearCartLink).then((res) => {
    dispatch(asyncFetchSucess());
    const response = res.data;
    if (response.statusCode === '00') {
      window.location.href = response.output.redirectUrl;
    } else {
      const errorMap = response.errorMap || response.ErrorMap;
      dispatch(showErrorNotification(getErrorMap(errorMap)));
    }
  }).catch(() => {
    dispatch(asyncFetchFailed());
  });
};
