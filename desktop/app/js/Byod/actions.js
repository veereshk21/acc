import request from 'axios';

import { hashHistory } from './../store';
import * as Constants from './constants';
import { showErrorNotification, hideNotification } from './../common/NotificationBar/actions';
// import logger from './../../../server/logger';
import { getErrorMap } from './../common/Helpers';


export const setSelectedDeviceAction = (device) => ({
  type: Constants.SELECTED_DEVICE_TYPE,
  device,
});
export const setSelectedIMEI = (imei) => ({
  type: Constants.SELECTED_IMEI,
  imei,
});
export const setIMEIAPIResponse = (res) => ({
  type: Constants.VALIDATE_IMEI_RESPONSE,
  res,
});
export const setValidateSimResponse = (res) => ({
  type: Constants.VALIDATE_SIM_RESPONSE,
  res,
});
export const setCheckedDevicesResponse = (res) => ({
  type: Constants.CHECKED_DEVICES_RESPONSE,
  res,
});
export const setSearchResults = (res) => ({
  type: Constants.SEARCH_RESULTS,
  res,
});
export const setUserInputAction = (model) => ({
  type: Constants.INPUT_VAL,
  model,
});
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
function asyncFetchSucess(data = {}) {
  return {
    type: Constants.ASYNC_FETCH_SUCCESS,
    data,
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
export const invalidateAsyncFetch = () => ({
  type: Constants.ASYNC_FETCH_INVALIDATE,
});

function postRequest(obj, url) {
  return request({
    method: 'post',
    url,
    data: obj,
  });
}

const getAPI = (url, paramaters) => request.get(url, { params: paramaters });

export const validateIMEI = (obj, url) => (dispatch, getState) => {
  const state = getState().toJS();
  const { skipSimUrl } = state.pageJSON;
  dispatch(asyncFetch());// action to show loader
  postRequest(obj, url).then((response) => {
    if (response.data.statusCode === '00') {
      if (!response.data.output.simRequired) {
        /* 3g redirection */
        postRequest({ deviceId: response.data.output.deviceId }, skipSimUrl).then((res) => {
          dispatch(setCheckedDevicesResponse(res.data.output.checkedDevices));
          // const data = { ...res.data, simRequired: response.data.output.simRequired };
          dispatch(setValidateSimResponse(res.data));
          hashHistory.push('/simStatus');
          dispatch(asyncFetchSucess());
        }).catch((err) => {
          dispatch(asyncFetchFailed());
          // logger.error(err);
          console.error(err); // eslint-disable-line
        });
      } else {
        dispatch(setSelectedIMEI(obj.selectedDevice));
        dispatch(setIMEIAPIResponse(response.data));
        dispatch(setCheckedDevicesResponse(response.data.output.checkedDevices));
        hashHistory.push('/sim');
        dispatch(asyncFetchSucess());
      }
    } else {
      dispatch(setIMEIAPIResponse(response.data));
      dispatch(asyncFetchSucess());// action to hide loader
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), 'showErrorNotification'));
      // dispatch(showErrorNotification(getErrorMap({ DT_OD_BYOD_CHECKED_DEVICE_ERROR })));
    }
  }).catch((err) => {
    dispatch(asyncFetchFailed());
    // logger.error(err);
    console.error(err); // eslint-disable-line
  });
};


export const validateSIM = (obj, url) => (dispatch) => {
  dispatch(asyncFetch());// action to show loader
  postRequest(obj, url).then((response) => {
    if (response.data.statusCode === '00') {
      dispatch(setSelectedIMEI(obj));
      postRequest({}, response.data.output.redirectUrl).then((res) => {
        dispatch(setCheckedDevicesResponse(res.data.output.checkedDevices));
        dispatch(setValidateSimResponse(res.data));
        hashHistory.push('/simStatus');
        dispatch(asyncFetchSucess());
      }).catch((err) => {
        dispatch(asyncFetchFailed());
        // logger.error(err);
        console.error(err); // eslint-disable-line
      });
    } else {
      dispatch(setValidateSimResponse(response.data));
      // dispatch(setIMEIAPIResponse({}));
      // hashHistory.push('/sim');
    }
    dispatch(asyncFetchSucess());
  }).catch((err) => {
    dispatch(asyncFetchFailed());
    // logger.error(err);
    console.error(err); // eslint-disable-line
  });
};

export const addNewSim = (obj, url) => (dispatch) => {
  dispatch(asyncFetch());// action to show loader
  postRequest(obj, url).then((response) => {
    if (response.data.statusCode === '00') {
      dispatch(setValidateSimResponse(response.data));
      dispatch(setCheckedDevicesResponse(response.data.output.checkedDevices));
      hashHistory.push('/simStatus');
    } else {
      dispatch(setIMEIAPIResponse(response.data));
    }
    dispatch(asyncFetchSucess());
  }).catch((err) => {
    dispatch(asyncFetchFailed());
    // logger.error(err);
    console.error(err); // eslint-disable-line
  });
};

export const redirectionCall = (obj, url) => (dispatch) => {
  dispatch(asyncFetch());// action to show loader
  postRequest(obj, url).then((response) => {
    if (response.data.statusCode === '00') {
      const { redirectUrl, redirectURL } = response.data.output;
      window.location = redirectURL || redirectUrl;
      dispatch(asyncFetchSucess());
    }
  }).catch((err) => {
    dispatch(asyncFetchFailed());
    // logger.error(err);
    console.error(err); // eslint-disable-line
  });
};

export const removeDevice = (url, deviceId, simId) => (dispatch) => {
  dispatch(asyncFetch());
  const data = { deviceId, simId };
  postRequest(data, url).then((response) => {
    if (response.data.statusCode === '00') {
      dispatch(asyncFetchSucess());
      dispatch(setCheckedDevicesResponse(response.data.output.checkedDevices));
      if (response.data.output.checkedDevices === null) {
        hashHistory.push('/');
      }
    }
  }).catch((error) => {
    dispatch(asyncFetchFailed());
    // logger.error(error);
    console.error(error); // eslint-disable-line
  });
};

export const setSelectedDevice = (obj) => ((dispatch) => {
  dispatch(setSelectedDeviceAction(obj));
});
export const setUserInput = (obj) => ((dispatch) => {
  dispatch(setUserInputAction(obj));
});

export const fetchSMSDevices = () => (dispatch, getState) => {
  dispatch(asyncFetch());// action to show loader
  const state = getState().toJS();
  const flowParam = '?flow=byod';
  const url = state.pageJSON.fetchSMSDevicesUrl + flowParam;
  getAPI(url).then((response) => {
    if (response.data.statusCode === Constants.API_SUCCESS_CODE) {
      dispatch(asyncFetchSucess({ smsDevicesFetched: true, ...response.data }));// action to hide loader
      dispatch(hideNotification());
    } else {
      dispatch(asyncFetchSucess());// action to hide loader
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), Constants.NOTIFICATIONS.SECURE_PIN));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFailed());
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

export const sendSMS = (sendSMSTo) => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState().toJS();
  const flowParam = '?flow=byod';
  const url = state.pageJSON.sendSMSUrl + flowParam;
  getAPI(url, { sendSMSTo }).then((response) => {
    if (response.data.statusCode === '00') {
      dispatch(asyncFetchSucess({ sentSMS: true, ...response.data.output }));// action to hide loader
    } else {
      dispatch(asyncFetchSucess());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), Constants.NOTIFICATIONS.SECURE_PIN));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFailed());
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

export const validateAuthCode = (authCode) => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState().toJS();
  const flowParam = '?flow=byod';
  const url = state.pageJSON.validateAuthCodeUrl + flowParam;
  getAPI(url, { authCode }).then((response) => {
    const respData = response.data;
    dispatch(asyncFetchSucess());
    if (respData.statusCode === '00') {
      dispatch(hideNotification());
      dispatch(asyncFetchSucess({ smsAuthenticationComplete: true }));
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap), Constants.NOTIFICATIONS.SECURE_PIN));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFailed());
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};
