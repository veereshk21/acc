import request from 'axios';
import { showErrorNotification, hideNotification } from './../common/NotificationBar/actions';
import { getErrorMap } from './../common/Helpers';

import {
  API_SUCCESS_CODE,
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_INVALIDATE,
} from './constants';

/* *
 * Action sets a loader to be shown on page
 * */
export const asyncFetch = () => ({
  type: ASYNC_FETCH,
});
/* *
 * Action clears the loader on the page.
 * */
export const asyncFetchSuccess = (data = {}) => ({
  type: ASYNC_FETCH_SUCCESS,
  data,
});

/* *
 * Action displays API error on the page.
 * */
const asyncFetchFailed = () => ({
  type: ASYNC_FETCH_FAILURE,
});
/* *
 * Action clears the loader and also data in data node.
 * */
export const invalidateAsyncFetch = () => ({
  type: ASYNC_FETCH_INVALIDATE,
});

const postAPI = (data, url) => (request({
  method: 'post',
  url,
  data,
}));

export const initiateCheckout = () => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState().toJS();
  const url = state.data.initiateCheckoutURL;
  postAPI({}, url).then((response) => {
    const goToSuccessURL = response.data.output && response.data.output.goToSuccessURL;
    if (response.data.statusCode === API_SUCCESS_CODE && (typeof goToSuccessURL !== typeof undefined && goToSuccessURL !== null)) {
      window.location.href = goToSuccessURL;
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
    dispatch(asyncFetchSuccess());
  }).catch((err) => {
    console.log(err); // eslint-disable-line no-console
    dispatch(hideNotification());
    dispatch(asyncFetchFailed());
    // The message should come from CQ JSON
    dispatch(showErrorNotification(state.cqContent.error.SPINNER_ERROR_MSG));
  });
};
