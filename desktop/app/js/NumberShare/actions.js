import axios from 'axios';
import { hashHistory } from './../store';
import {
  API_SUCCESS_CODE,
  ASYNC_FETCH,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_SUCCESS,
  FETCH_DEVICE_IMG_SUCCESS,
  SET_E911_DATA,
  TOGGLE_EMERGENCY_MODAL,
  FETCH_SELECTED_MTN,
} from './constants';

import { hideNotification, showErrorNotification } from './../common/NotificationBar/actions';

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
 * Action clears the loader on the page.
 * */
function asyncFetchSucess() {
  return {
    type: ASYNC_FETCH_SUCCESS,
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
/**
 * Fetch device image
 * **/
function fetchDeviceImageSuccess(deviceDetails) {
  return {
    type: FETCH_DEVICE_IMG_SUCCESS,
    deviceDetails,
  };
}
function fetchDeviceImageAPI(params) {
  return axios({
    method: 'get',
    url: '/od/cust/auth/device/deviceImage/',
    params,
  });
}

export const fetchDeviceImage = (params) => ((dispatch) => (
  fetchDeviceImageAPI(params).then((response) => {
    // dispatch(asyncFetchSucess());// action to hide loader
    if (response.data.statusCode === API_SUCCESS_CODE) {
      dispatch(fetchDeviceImageSuccess(response.data.output));
      dispatch(hideNotification());
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
    dispatch(hideNotification());
    // hashHistory.push('/genericError');
  })));


export const setEmergencyContactInfo = (output) => (
  {
    type: SET_E911_DATA,
    output,
  }
);

export const toggleEmergencyContactModal = (flag) => { // eslint-disable-line
  return {
    type: TOGGLE_EMERGENCY_MODAL,
    flag,
  };
};

export const selectedMtn = (mtn) => { // eslint-disable-line
  return {
    type: FETCH_SELECTED_MTN,
    selectedMtn: mtn,
  };
};

export function addDeviceShare(productInfo) {
  return function submitNumberShare(dispatch) {
    dispatch(asyncFetch());
    addDeviceShareAPI(productInfo).then((response) => {
      dispatch(asyncFetchSucess());// action to hide loader
      if (response.data.statusCode === API_SUCCESS_CODE) {
        /* if (response.data.isE911Enabled === true) {
          dispatch(toggleEmergencyContactModal(true));
          updateEmergencyContactInfo(dispatch, response.data.redirectURL);
        } else { */
        window.location.href = response.data.redirectURL;
        // }
        dispatch(hideNotification());
      } else {
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      }
    }).catch((e) => {
      console.log(e);
      dispatch(asyncFetchFalied());// on API failure
      dispatch(hideNotification());
      hashHistory.push('/genericError');
    });
  };
}

const addDeviceShareAPI = (productInfo) => {
  const {
    redirectUrl, mtn, commerceItemId, e911FormData,
  } = productInfo;
  return axios({
    method: 'post',
    url: redirectUrl,
    data: { action: 'G', trunkMTN: mtn, hostCommerceItemId: commerceItemId, e911FormData },
  });
};

export function getEmergencyAddress() {
  return function updateEmergencyContactInfo(dispatch) {
    dispatch(asyncFetch());
    emergencyContactInfoAPI('/od/cust/auth/getE911Address').then((response) => {
      if (response.data.statusCode === API_SUCCESS_CODE) {
        dispatch(setEmergencyContactInfo(response.data.output));
        dispatch(toggleEmergencyContactModal(true));
        dispatch(hideNotification());
      } else {
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      }
      dispatch(asyncFetchSucess());// action to hide loader
    }).catch(() => {
      dispatch(asyncFetchFalied());// on API failure
      dispatch(hideNotification());
      hashHistory.push('/genericError');
    });
  };
}

const emergencyContactInfoAPI = (url) => {// eslint-disable-line
  return axios({
    method: 'get',
    url: url + '?format=json',
  });
};


const submmitEmergencyContactAPI = (params) => {
  const { updateAddressUrl, ...formData } = params;
  return axios({
    method: 'post',
    url: updateAddressUrl,
    data: formData,
  });
};

export const submmitEmergencyContact = (params, errorMsg) => {// eslint-disable-line
  return (dispatch) => {
    dispatch(asyncFetch());
    submmitEmergencyContactAPI(params).then((res) => {
      if (res.data.statusCode === API_SUCCESS_CODE) {
        if (res.data.errorMap) {
          // dispatch(showErrorNotificationInModal(getErrorMap(res.data.errorMap)));
        } else {
          window.location.href = res.data.output.redirectUrl;
          dispatch(hideNotification());
        }
      } else {
        dispatch(showErrorNotification(getErrorMap(res.data.output.errorMap)));
      }
      dispatch(asyncFetchSucess());// action to hide loader
    }).catch(() => {
      dispatch(asyncFetchFalied());// on API failure
      dispatch(hideNotification());
      // dispatch(showErrorNotificationInModal(getErrorMap({ msg: errorMsg })));
    });
  };
};
