/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable no-console */
import request from 'axios';
import qs from 'qs';
// import Logger from './../../../server/logger';
// const Logger = require('../../../server/logger');

import {
  ASYNC_FETCH,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_INVALIDATE,
  ASYNC_FETCH_SUCCESS,
  FETCH_DEVICE_IMAGE,
  FETCH_DEVICE_IMAGE_SUCCESS,
  FETCH_ACCESSORIES_BUNDLE_SUCCESS,
  TRIGGER_EVENT,
} from './constants';
import { showErrorNotification, showWarningNotification } from './../common/NotificationBar/actions';

const getErrorMap = (errorMap) => {
  let msg = '';
  for (const prop in errorMap) {
    msg += '<p>' + errorMap[prop] + '</p>';
  }
  return msg;
};

/* *
 * Action sets a loader to be shown on page
 * */
function asyncFetch() {
  return {
    type: ASYNC_FETCH,
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

/* *
 * Action clears the loader and also data in data node.
 * */
function invalidateAsyncFetch() { // eslint-disable-line
  return {
    type: ASYNC_FETCH_INVALIDATE,
  };
}

function asyncFetchDeviceImage() {
  return {
    type: FETCH_DEVICE_IMAGE,
  };
}

function asyncFetchDeviceImageSuccess(data) {
  return {
    type: FETCH_DEVICE_IMAGE_SUCCESS,
    ...data,
  };
}

function asyncFetchAccessoriesBundleSuccess(data) {
  return {
    type: FETCH_ACCESSORIES_BUNDLE_SUCCESS,
    ...data,
  };
}

/**
 * Action clears the loader on the page.
 * */
export const asyncFetchSuccess = (response) => ({
  type: ASYNC_FETCH_SUCCESS,
  data: response,

});

export const getCall = (url) => request.get(url);

export const postCall = (url, data) => request.post(url, data);

export const addProtectionAPI = (url, data) => request.post(url, data);


export const addSelectedProtection = (url, data, legacyPlanFlag = false, cpcskip = false) => (dispatch) => { // eslint-disable-line
  dispatch(asyncFetch());

  if (legacyPlanFlag && !cpcskip) {
    window.location.href = url + '?' + qs.stringify(data);
    return;
  }

  if (cpcskip) {
    const query_url = url + '?' + qs.stringify(data);
    getCall(query_url).then((resp) => {
      postCall(resp.data.output.nextAjaxCall, {}).then((response) => {
        window.location.href = response.data.output.redirectUrl;
      });
    });
    return;
  }

  addProtectionAPI(url, data).then((resp) => {
    dispatch(asyncFetchSuccess());

    if (resp.data.statusCode === '00') {
      window.location.href = resp.data.output.redirectUrl;
    } else {
      dispatch(asyncFetchSuccess());
      dispatch(showErrorNotification(getErrorMap(resp.data.errorMap)));
    }
  }).catch((err) => {
    dispatch(asyncFetchFalied());// on API failure
    // Logger.error(err);
    console.log('***Error while adding Protection***');
    console.error(err); // eslint-disable-line
  });
};

// to fetch device image
function deviceImagePromise(params) {
  return request.get('/od/cust/auth/device/deviceImage/?deviceProdId=' + params.deviceProdId + '&deviceSkuId=' + params.deviceSkuId);
}

export const fetchDeviceImage = (params) => function (dispatch) { // eslint-disable-line
  dispatch(asyncFetchDeviceImage());
  request.all([deviceImagePromise(params)]).then(request.spread((deviceImage) => { // eslint-disable-line
    return dispatch(asyncFetchDeviceImageSuccess({
      deviceImage: deviceImage.data.output,
    }));
  })).catch((err) => {
    // Logger.error(err);
    console.error(err); // eslint-disable-line
    dispatch(asyncFetchFalied());// on API failure
  });
};

// to fetch accessories bundle
function accessoriesBundlePromise(url) {
  return request.get(url);
}

export const fetchAccessoriesBundle = (url) => function (dispatch) { // eslint-disable-line
  request.all([accessoriesBundlePromise(url)]).then(request.spread((accessories) => { // eslint-disable-line
    return dispatch(asyncFetchAccessoriesBundleSuccess({
      bundleAccessories: accessories.data.output.bundleAccessories,
    }));
  })).catch((err) => {
    // Logger.error(err);
    console.error(err); // eslint-disable-line
    dispatch(asyncFetchFalied());// on API failure
  });
};

export const showIneligible = (message) => (dispatch) => {
  dispatch(showWarningNotification(message, 'page-header', true));
  dispatch({
    type: TRIGGER_EVENT,
  });
};
