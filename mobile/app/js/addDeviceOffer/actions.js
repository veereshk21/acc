/* eslint-disable consistent-return */
import request from 'axios';
import { isEmpty } from 'lodash';
import { history } from './../store';

import { showErrorNotification } from './../common/NotificationBar/actions';

import { getErrorMap } from './../common/Helpers';

import {
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
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

function submitActionAPI(data, url) {
  const requestParams = data;
  return request({
    method: 'post',
    url,
    data: requestParams,
  });
}
function checkResponse(getRes) {
  return (getRes === undefined || getRes === null || isEmpty(getRes));
}
export const submitAction = (data, url) => function (dispatch) {
  dispatch(asyncFetch());// action to show loader
  submitActionAPI(data, url).then((response) => {
    if (checkResponse(response.data.output) && checkResponse(response.data.errorMap)) {
      history.push('/genericError');
      return false;
    } else if (response.data.output && (response.data.output.success === true || response.data.output.success === 'true')) {
      dispatch(asyncFetchSucess());
      window.location.href = response.data.output.redirectUrl;
    } else {
      dispatch(asyncFetchSucess());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
    dispatch(showErrorNotification('We are facing some issues with our backend systems. Please try after sometime.'));
  });
};
