/* eslint-disable prefer-destructuring */
import axios from 'axios';
import * as _ from 'lodash';
import { hashHistory } from './../store';

import * as constants from './constants';
import { showErrorNotification, hideNotification } from './../common/NotificationBar/actions';
import { getErrorMap } from './../common/Helpers';

export const asyncFetch = () => ({
  type: constants.ASYNC_FETCH,
});

/**
 * Action clears the loader on the page.
 * */
export const asyncFetchSuccess = (response) => ({
  type: constants.ASYNC_FETCH_SUCCESS,
  data: response,

});

/* *
 * Action displays API error on the page.
 * */
export function asyncFetchFalied() {
  return {
    type: constants.ASYNC_FETCH_FAILURE,
  };
}

export const getCall = (url) => axios({
  method: 'get',
  url,
});

export const postCall = (url, data) => axios({
  method: 'post',
  url,
  data,
});

function checkResponse(getRes) {
  return (getRes === undefined || getRes === null || _.isEmpty(getRes));
}


export const getMakeListAPI = (data) => (dispatch) => {
  dispatch(asyncFetch());
  dispatch(hideNotification());
  const url = data.url + '?year=' + data.selected;
  getCall(url).then((response) => {
    dispatch(setCarMakeList(response.data));
    dispatch(asyncFetchSuccess());
  }).catch(() => {
    dispatch(asyncFetchFalied());
  });
};

export function setCarMakeList(response) {
  return {
    type: 'SET_MAKE_LIST',
    data: response,
  };
}


export const getModelListAPI = (data) => (dispatch) => {
  dispatch(asyncFetch());
  dispatch(hideNotification());
  axios.get(data.url + '?year=' + data.year + '&make=' + data.make).then((resp) => {
    const responseData = resp.data;
    dispatch(setModelList(responseData));
    dispatch(asyncFetchSuccess());
  }).catch(() => {
    dispatch(asyncFetchFalied());
  });
};

export function setModelList(response) {
  return {
    type: 'SET_MODEL_COLOR_LIST',
    data: response,
  };
}

export function setEmailDetails(response) {
  return {
    type: 'SET_EMAIL_DETAILS',
    data: response,
  };
}


export function validateCarDetails(data) {
  return function (dispatch) {
    dispatch(hideNotification());
    dispatch(asyncFetch());
    validateCarDetailsAPI(data).then((response) => {
      if (checkResponse(response.data) && checkResponse(response.data.ErrorMap)) {
        hashHistory.push('/genericError');
        return false;
      } else if (response.data && (response.data.success === true || (response.data.success === false && response.data.errormsgs))) {
        dispatch(asyncFetchSuccess());
        if (response.data.errormsgs) {
          dispatch(showErrorNotification(response.data.errormsgs));
          dispatch(setSelectedDetails({ color: '' }));
        }
        dispatch(setIsCarDetailsValid(response.data));
      } else {
        dispatch(asyncFetchSuccess());
        dispatch(setSelectedDetails({ color: '' }));
        dispatch(showErrorNotification(getErrorMap(response.data.ErrorMap)));
      }
      return false;
    }).catch(() => {
      dispatch(asyncFetchFalied());// on API failure
      hashHistory.push('/genericError');
    });
  };
}

const validateCarDetailsAPI = (data) => axios.get(data.url, {
  params: {
    year: data.year,
    make: data.make,
    model: data.model,
    color: data.color,
    deviceVariant: data.deviceVariant,
  },
});

export function setIsCarDetailsValid(response) {
  return {
    type: 'HUM_CONFIG_ISVALID',
    data: response,
  };
}

export function setSelectedDetails(response) {
  return {
    type: 'SET_SELECTED_DETAILS',
    data: response,
  };
}

export function suggestHumWebsiteEnable(response) {
  return {
    type: 'SUGGEST_HUM_WEBSITE_BUTTON',
    data: response,
  };
}

export function submitConfigDetails(data) {
  return function (dispatch) {
    dispatch(hideNotification());
    dispatch(asyncFetch());
    const url = data.url;
    submitConfigDetailsAPI(data.selectedData, url).then((response) => {
      const configDetailData = response.data;

      if (configDetailData && configDetailData.errorMap) {
        dispatch(suggestHumWebsiteEnable({
          showHumWebsiteButton: true,
          goToLink: configDetailData.output.redirectUrl,
        }));
        dispatch(showErrorNotification(getErrorMap(configDetailData.errorMap)));
        dispatch(asyncFetchFalied());
        return false;
      }
      window.location.href = configDetailData.output.redirectUrl;
      return false;
    }).catch(() => {
      dispatch(asyncFetchFalied());
      hashHistory.push('/genericError');
    });
  };
}


const submitConfigDetailsAPI = (selectedData, url) => { //eslint-disable-line
  const requestParams = {
    year: selectedData.year,
    make: selectedData.make,
    model: selectedData.model,
    color: selectedData.color,
    contractTerm: selectedData.contractTerm,
    emailAddress: selectedData.enteredEmailId,
  };

  return axios({
    method: 'post',
    url,
    data: requestParams,
  });
};

const addUpdatePlanFeature = (selectedData, url) => {  //eslint-disable-line
  addUpdatePlanFeatureAPI(selectedData, url).then((response) => {
    if (checkResponse(response.data.output) && checkResponse(response.data.output.ErrorMap)) {
      hashHistory.push('/genericError');
      return false;
    } else if (response.data.output && response.data.output.redirectUrl) {
      window.location.href = response.data.output.redirectUrl;
    }
    return false;
  }).catch(() => {
    hashHistory.push('/genericError');
  });
};

const addUpdatePlanFeatureAPI = (selectedData, url) => {
  const requestParams = {
    year: selectedData.year,
    make: selectedData.make,
    model: selectedData.model,
    color: selectedData.color,
    contractTerm: selectedData.contractTerm,
    emailAddress: selectedData.enteredEmailId,
  };

  return axios({
    method: 'post',
    url,
    data: requestParams,
  });
};
