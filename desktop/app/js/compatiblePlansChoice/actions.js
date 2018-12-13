import { hashHistory } from 'react-router';
import request from 'axios';
import * as constants from './constants';
import { showErrorNotification, hideNotification } from './../common/NotificationBar/actions';
import { showMultiUpgradeModal } from './../common/MultiUpgradeModal/actions';

/* *
 * Action sets a loader to be shown on page
 * */
export function asyncFetch() {
  return {
    type: constants.ASYNC_FETCH,
  };
}
/* *
 * Action clears the loader on the page.
 * */
export function asyncFetchSuccess() {
  return {
    type: constants.ASYNC_FETCH_SUCCESS,
  };
}
/* *
 * Action displays API error on the page.
 * */
export function asyncFetchFalied() {
  return {
    type: constants.ASYNC_FETCH_FAILURE,
  };
}

const getErrorMap = (errorMap) => {
  let msg = '';
  for (const prop in errorMap) {
    msg += '<p>' + errorMap[prop] + '</p>';
  }
  return msg;
};

export const getParameterByName = (name, url = window.location.href) => {
  const nameStr = name.replace(/[\[\]]/g, "\\$&"); // eslint-disable-line
  const regex = new RegExp("[?&]" + nameStr + "(=([^&#]*)|&|#|$)"); // eslint-disable-line
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const choosePlan = (planSorId, url) => (dispatch) => {
  dispatch(asyncFetch());// action to show loader

  request({
    method: 'post',
    data: {
      planSorId,
    },
    url,
  }).then((response) => {
    dispatch(asyncFetchSuccess());// action to hide loader
    if (response.data.statusCode === constants.API_SUCCESS_CODE) {
      window.location = response.data.output.redirectUrl;
    } else if (response.data.statusCode === '1001') {
      window.legacyPlanErrorJSON = response.data;
      hashHistory.push('/legacyPlanError');
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch((err) => {
    console.log('***Error while compatiblePlansChoice func choosePlan***'); // eslint-disable-line no-console
    console.error(err); // eslint-disable-line no-console
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

export const postCall = (url, data) => request.post(url, data);

export const onClickToRedirectUrl = (url) => (dispatch) => {
  dispatch(asyncFetch());
  window.location.href = url + '?ts=' + Date.now();
};


export const setAdditionalPlanDetails = (planDetails) => ({
  type: 'SET_ADDL_PLAN_DETAILS',
  data: { planDetails },
});

export const getRequest = (url) => request.get(url);

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
