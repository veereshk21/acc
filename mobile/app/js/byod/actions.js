/**
 * Created by hmahad on 08/06/17.
 */

import request from 'axios';
import { hashHistory } from './../store';
import { showErrorNotification } from './../common/NotificationBar/actions';
import { getErrorMap } from './../common/Helpers';
import {
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
  SELECTED_DEVICE_TYPE,
  SELECTED_IMEI,
  VALIDATE_IMEI_RESPONSE,
  SEARCH_RESULTS_INPUT,
  SEARCH_RESULTS_LINK,
  SEARCH_RESULTS_BRAND,
  INPUT_VAL,
} from './constants';

export const setSelectedDeviceAction = (device) => ({
  type: SELECTED_DEVICE_TYPE,
  device,
});
export const setSelectedIMEI = (imei) => ({
  type: SELECTED_IMEI,
  imei,
});
export const setIMEIAPIResponse = (res) => ({
  type: VALIDATE_IMEI_RESPONSE,
  res,
});
export const setSearchResults = (type, res) => ({
  type,
  res,
});
export const setUserInputAction = (model) => ({
  type: INPUT_VAL,
  model,
});
/* *
 * Action sets a loader to be shown on page
 * */
function asyncFetch() {
  return {
    type: ASYNC_FETCH,
  };
}


/* *
 * Action clears the loader on the page.
 * */
function asyncFetchSucess(data = {}) {
  return {
    type: ASYNC_FETCH_SUCCESS,
    data,
  };
}

/* *
 * Action displays API error on the page.
 * */
function asyncFetchFalied() {
  return {
    type: ASYNC_FETCH_FAILURE,
  };
}

function submitIMEIAPI(obj, url) {
  return request({
    method: 'post',
    url,
    data: obj,
  });
}
function submitSIMAPI(obj, url) {
  return request({
    method: 'post',
    url,
    data: obj,
  });
}

function submitAddSimAPI(obj, url) {
  return request({
    method: 'post',
    url,
    data: obj,
  });
}

function submitSkipSimAPI(obj, url) {
  return request({
    method: 'post',
    url,
    data: obj,
  });
}

function submitSearch(obj, url) {
  return request({
    method: 'post',
    url,
    data: obj,
  });
}
export const validateIMEI = (obj, url) => function (dispatch) {
  dispatch(asyncFetch());// action to show loader
  submitIMEIAPI(obj, url).then((response) => {
    if (response.data.statusCode === '00') {
      const { output } = response.data;
      dispatch(setSelectedIMEI(obj));
      dispatch(setIMEIAPIResponse(output));
      // if (state.pageJSON.smsAuthComplete) {
      hashHistory.push('/byodStatus');
      // } else {
      //   window.location.href = 'od/cust/auth/checkout/securePin?referrer=' + encodeURIComponent('/od/cust/auth/byod/bring-your-own-device#byodStatus');
      // }

      dispatch(asyncFetchSucess());
    } else {
      dispatch(setIMEIAPIResponse(response.data));
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch((err) => {
    dispatch(asyncFetchFalied());
    console.log(err);
  });
};

export const validateSIM = (obj, url) => function (dispatch) {
  dispatch(asyncFetch());// action to show loader

  submitSIMAPI(obj, url).then((response) => {
    if (response.data.statusCode === '00') {
      dispatch(setSelectedIMEI(obj));
      dispatch(setIMEIAPIResponse(response.data.output));
      const { redirectUrl } = response.data.output;
      window.location.href = redirectUrl;
      dispatch(asyncFetchSucess());
    } else {
      dispatch(asyncFetchFalied());
      dispatch(setIMEIAPIResponse(response.data));
      const _errorMap = response.data.errorMap || response.data.ErrorMap;
      dispatch(showErrorNotification(getErrorMap(_errorMap)));
    }
  }).catch((err) => {
    dispatch(asyncFetchFalied());
    console.log(err);
  });
};

export const addNewSim = (obj, url) => function (dispatch) {
  dispatch(asyncFetch());// action to show loader
  submitAddSimAPI(obj, url).then((response) => {
    if (response.data.statusCode === '00') {
      dispatch(setIMEIAPIResponse(response.data.output));
      const { redirectUrl } = response.data.output;
      window.location.href = redirectUrl;
      dispatch(asyncFetchSucess());
    } else {
      dispatch(asyncFetchFalied());
      dispatch(setIMEIAPIResponse(response.data));
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch((err) => {
    dispatch(asyncFetchFalied());
    console.log(err);
  });
};

export const skipAddSim = (obj, url) => function (dispatch) {
  dispatch(asyncFetch());// action to show loader
  submitSkipSimAPI(obj, url).then((response) => {
    if (response.data.statusCode === '00') {
      dispatch(setIMEIAPIResponse(response.data.output));
      const { redirectUrl } = response.data.output;
      window.location.href = redirectUrl;
      dispatch(asyncFetchSucess());
    } else {
      dispatch(asyncFetchFalied());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch((err) => {
    dispatch(asyncFetchFalied());
    console.log(err);
  });
};

export const searchDevice = (obj, url, qs) => function (dispatch) {
  dispatch(asyncFetch());// action to show loader
  // const url = '/od/cust/auth/byod/searchDevices' + (window.location.port !== '' && qs);
  if (window.location.port !== '') {
    url += qs; //eslint-disable-line
  }
  let type = null;
  switch (qs) {
    case '/responselist':
      type = SEARCH_RESULTS_INPUT;
      break;
    case '/responsebrands':
      type = SEARCH_RESULTS_LINK;
      break;
    case '/responsedevices':
      type = SEARCH_RESULTS_BRAND;
      break;
    default:
      type = null;
  }
  submitSearch(obj, url).then((response) => {
    if (qs === '/responsedevices' || qs === '/responsebrands') {
      if (response.data.output === null) {
        hashHistory.push('/imei');
      }
    }
    if (response.data.statusCode === '00') {
      dispatch(setSearchResults(type, response.data.output.deviceDetails));
      if (qs === '/responsedevices') {
        hashHistory.push('/deviceModel');
      }
      dispatch(asyncFetchSucess());
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      dispatch(asyncFetchFalied());
    }
  }).catch((err) => {
    dispatch(asyncFetchFalied());
    console.log(err);
  });
};

export const setSelectedDevice = (obj) => ((dispatch) => {
  dispatch(setSelectedDeviceAction(obj));
});
export const setUserInput = (obj) => ((dispatch) => {
  dispatch(setUserInputAction(obj));
});
