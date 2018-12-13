import request from 'axios';
import * as notificationActions from '../common/NotificationBar/actions';
import { getErrorMap } from './../common/Helpers';
// import npanxxJSON from '../../json/npanxxJSON';

import {
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_INVALIDATE,
  UPDATE_NPANXX_DATA,
} from './constants';

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
/* *
 * Action clears the loader and also data in data node.
 * */
function invalidateAsyncFetch() {  //eslint-disable-line
  return {
    type: ASYNC_FETCH_INVALIDATE,
  };
}
/**
 * Action to reset the application state
 *
 * */
export const updateNpanxxData = (response) => ({
  type: UPDATE_NPANXX_DATA,
  data: response,
});

function fetchMtnsAPI(zipCode, ajaxCallUrl) {
  return request.get(ajaxCallUrl + '?zipCode=' + zipCode + '&fetchNpaNxx=true');
}
export const fetchMtns = (zipCode, ajaxCallUrl) => function (dispatch) {
  dispatch(asyncFetch());// action to show loader

  fetchMtnsAPI(zipCode, ajaxCallUrl).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    dispatch(updateNpanxxData(response.data.output));// update the page with fresh data
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
  });
};
function submitNpanxxAPI(npanxxInfo, orderId, commerceItemId, submitUrl) {
  const requestParams = {
    zipCode: npanxxInfo.zipCode,
    npaNxxNumber: npanxxInfo.selectedMtn,
    commerceItemId,
    orderId,
  };
  return request({
    method: 'post',
    url: submitUrl,
    data: requestParams,
  });
}
export const submitNpanxx = (npanxxInfo, orderId, commerceItemId, submitUrl) => function (dispatch) {
  dispatch(asyncFetch());// action to show loader
  submitNpanxxAPI(npanxxInfo, orderId, commerceItemId, submitUrl).then((response) => {
    if (response.data.errorMap === null || response.data.ErrorMap === null) {
      window.location.href = response.data.output.redirectURL;
    } else {
      dispatch(notificationActions.showErrorNotification(getErrorMap(response.data.errorMap)));
      dispatch(asyncFetchSucess());// action to hide loader
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
  });
};
