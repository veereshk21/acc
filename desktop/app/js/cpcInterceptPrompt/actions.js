import axios from 'axios';

import { hashHistory } from './../store';
import { showErrorNotification } from './../common/NotificationBar/actions';
import { showMultiUpgradeModal } from './../common/MultiUpgradeModal/actions';
import * as constants from './constants';

export const asyncFetch = () => ({
  type: constants.ASYNC_FETCH,
});

export const asyncFetchSuccess = (response) => ({
  type: constants.ASYNC_FETCH_SUCCESS,
  data: response,
});

export const getRequest = (url) => axios.get(url);

function postRequest(obj, url) {
  return axios({
    method: 'post',
    url,
    data: obj,
  });
}

export const cpcInterceptPromptDeclineAPI = (url, data) => axios.post(url, data);

export const onCpcInterceptPromptDecline = (url, data = {}) => (dispatch) => {
  dispatch(asyncFetch());

  cpcInterceptPromptDeclineAPI(url, data).then((resp) => {
    dispatch(asyncFetchSuccess());

    if (resp.data.statusCode === '00') {
      window.location.href = resp.data.output.redirectUrl;
    } else {
      dispatch(asyncFetchSuccess());
      dispatch(showErrorNotification(getErrorMap(resp.data.errorMap)));
    }
  }).catch((err) => {
    console.log('***Error while cpcInterceptPromptDecline***'); // eslint-disable-line no-console
    console.error(err); // eslint-disable-line no-console
  });
};

export const multiUpgradeCheck = (url, data) => (dispatch) => {
  dispatch(asyncFetch());

  getRequest(url).then((resp) => {
    dispatch(asyncFetchSuccess());
    if (resp.data.statusCode === '00') {
      dispatch(showMultiUpgradeModal(data));
    } else {
      hashHistory.push('/genericError');
    }
  });
};

export const dataOptionsNW = (url, data) => (dispatch) => {
  dispatch(asyncFetch());

  postRequest(data, url).then((resp) => {
    dispatch(asyncFetchSuccess());
    if (resp.data.statusCode === '00') {
      window.location.href = resp.data.output.redirectUrl;
    } else {
      hashHistory.push('/genericError');
    }
  });
};

const getErrorMap = (errorMap) => {
  let msg = '';
  for (const prop in errorMap) {
    msg += '<p>' + errorMap[prop] + '</p>';
  }
  return msg;
};
