import request from 'axios';
import * as _ from 'lodash';
import * as Constants from './constants';
import { hashHistory } from './../store';
import * as notificationActions from '../common/NotificationBar/actions';
import { getErrorMap } from './../common/Helpers';

export const changeMDNSelectionView = (mdnSelectionView) => ({
  type: Constants.CHANGE_MDN_SELECTION_VIEW,
  view: mdnSelectionView,
});

export const changeSelectedMDN = (mdn) => ({
  type: Constants.CHANGE_MDN_SELECTED,
  payload: mdn,
});

export const dppUpgrade = (mdnDetails = {}) => ({
  type: Constants.UPGRADE_CHECK,
  data: mdnDetails,
});
/* *
 * Action sets a loader to be shown on page
 * */
function asyncFetch() {
  return {
    type: 'ASYNC_FETCH',
  };
}
/* *
 * Action clears the loader on the page.
 * */
function asyncFetchSucess() {
  return {
    type: 'ASYNC_FETCH_SUCCESS',
  };
}

/* loading dots */
export const loader = (flag) => ({
  type: 'loader',
  payload: flag,
});

/* Ajax call for submitting upgrade/return */
const submitAgreementAction = (data) => ({
  type: Constants.SUBMIT_AGREEMENT,
  data,
});

const upgradeSelectedMDNAPI = (apiURL) =>
  /**
   * The APIURL is appended with the encrypted URL.
   * */
  request.post(apiURL);
/*
 * Update Action for Iconic Flow
 * */
export const upgradeSelectedMDN = (data, apiURL) => (dispatch) => {
  upgradeSelectedMDNAPI(apiURL + data.encryptedMTN).then((res) => {
    if (res.data) {
      dispatch(submitAgreementAction(res.data));
    }
  }).catch(() => {
    hashHistory.push('/genericError');
  });
};

const submitAgreementPromise = (mdn, selectedOption, deviceType, brand, deviceId, ajaxURL) => request.get(`${ajaxURL}?mtn=${mdn}&deviceType=${deviceType}&selectedOption=${selectedOption}&brand=${brand}&deviceId=${deviceId}`);

export const submitAgreement = (mdn, selectedOption, deviceType, brand, deviceId, ajaxURL) => ((dispatch) => {
  dispatch(asyncFetch());

  submitAgreementPromise(mdn, selectedOption, deviceType, brand, deviceId, ajaxURL).then((res) => {
    dispatch(asyncFetchSucess());
    if (typeof res.data === typeof undefined || res.data === null || _.isEmpty(res.data)) {
      hashHistory.push('/genericError');
      return false;
    }
    return dispatch(submitAgreementAction(res.data));
  }).catch(() => {
    dispatch(asyncFetchSucess());
    hashHistory.push('/genericError');
    return false;
  });
});

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
  dispatch(asyncFetch());
  cancelPendingOrderPromise(requestParams).then((res) => {//eslint-disable-line
    dispatch(asyncFetchSucess());
    if (res.data.statusCode === Constants.API_SUCCESS_CODE) {
      if (res.data === undefined || res.data === null || _.isEmpty(res.data)) {
        hashHistory.push('/genericError');
        return false;
      }
      dispatch(notificationActions.showInfoNotification('Pending order cancelled successfully'));
      dispatch(cancelPendingOrderAction(res.data));
    } else {
      dispatch(notificationActions.showErrorNotification(getErrorMap(res.data.errorMap)));
    }
  }).catch((error) => {//eslint-disable-line
    dispatch(asyncFetchSucess());
    hashHistory.push('/genericError');
    return false;
  });
});


const getLoanInfoPreOrderAction = (data) => ({
  type: Constants.LOAN_INFO_PREORDER,
  data,
});

export const getLoanInfoPreOrderAPI = (encryptedMTN, ajaxCallSelectedMTN) => {
  /* Added selectedOption request param to URI as per iconic needs */
  const getLoanInfoPreOrderAPIURL = ajaxCallSelectedMTN + encryptedMTN + '&selectedOption=' + Constants.UPGRADE;
  return request.get(getLoanInfoPreOrderAPIURL);
};


/** *
 *  Added for ICONIC - Add a Line on mdnselection page calls an action .
 * */


const resetAccountLevelInEligibleDetails = (data) => ({
  type: Constants.AAL_API_SUCCESS,
  data,
});


const initAALAPI = (url) => request.post(url);

export const initAAL = (url, isByod = false) => (dispatch, getState) => {
  const state = getState().toJS();
  const { submitByodRedirectUrl } = state;
  dispatch(asyncFetch());
  initAALAPI(url).then((res) => {
    dispatch(asyncFetchSucess());
    const response = res.data;
    if (response.statusCode === '00') {
      /** Changes for ICONIC : Redirect to appropriate pages based on response */
      const _AALInEligibleDetails = response.output.accountLevelInEligibleDetails ? response.output.accountLevelInEligibleDetails.accountLevelAALInEligibleDetails : response.output.accountLevelInEligibleDetails;
      if (typeof _AALInEligibleDetails !== 'undefined' && _AALInEligibleDetails !== null) {
        if (_AALInEligibleDetails.accountLevelInEligibleCode === 'PENDING_ORDER' || _AALInEligibleDetails.accountLevelInEligibleCode === 'PENDING_SWITCH_ORDER') {
          dispatch(resetAccountLevelInEligibleDetails(response.output.accountLevelInEligibleDetails));
          hashHistory.push('/pendingOrder');
        } else {
          dispatch(resetAccountLevelInEligibleDetails(response.output.accountLevelInEligibleDetails));
          hashHistory.push('/limitExceeded');
        }
      } else if (response.output.aalRedirect) {
        window.location.href = !isByod ? response.output.aalRedirect : submitByodRedirectUrl;
      }
    } else {
      console.log('Some error has occured while initiating AAL with statuscode-' + response.statusCode);//eslint-disable-line
    }
  }).catch((err) => {
    dispatch(asyncFetchSucess());
    console.log('Error in err', err);//eslint-disable-line
  });
};

export const getParams = (query) => {
  if (!query) {
    return {};
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params, param) => {
      const [key, value] = param.split('=');
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';  //eslint-disable-line
      return params;
    }, {});
};
/**
 * Action thunk to dispatch loading utilities and make async call to apply promo code.
 *
 * * */

export const getLoanInfoPreOrder = (encryptedMTN, ajaxCallSelectedMTN) => (dispatch) => {
  dispatch(asyncFetch());
  /* Fetching order id from state tree */
  getLoanInfoPreOrderAPI(encryptedMTN, ajaxCallSelectedMTN).then((res) => {
    const response = res.data;
    /* For iconic ,redirect if redirectURL is present , else make another async call - action call happens in componentDidMount */
    dispatch(asyncFetchSucess());
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
  }).catch(() => {
    dispatch(asyncFetchSucess());
  });
};
