/* eslint-disable */
import axios from 'axios';
import * as notificationActions from '../common/NotificationBar/actions';
import { getErrorMap } from './../common/Helpers';
import {
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_INVALIDATE,
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
function asyncFetchSuccess() {
  return {
    type: ASYNC_FETCH_SUCCESS,
  };
}

/* *
 * Action displays API error on the page.
 * */
function asyncFetchFailure() {
  return {
    type: ASYNC_FETCH_FAILURE,
  };
}
/* *
 * Action clears the loader and also data in data node.
 * */
function invalidateAsyncFetch() {
  return {
    type: ASYNC_FETCH_INVALIDATE,
  };
}
// Source attribute to be implemented at a later date
export const callCheckoutAPI = (url) => {
  // return axios.get("http://www.mocky.io/v2/59af10f113000019090359b6");
  // const data = {
  //   source,
  // }
  // return axios.post(url, data);
  return axios.post(url);
}


export const initiateCheckout = () => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState();
  console.log(state);
  // const source = state.get('details').get('output').get('source');
  const url = state.get('details').get('output').get('confirmURL');
  // const spinnerErrorMsg = state.get('cqContent').get('error').get('SPINNER_ERROR_MSG');

  callCheckoutAPI(url).then((response) => {
    console.log(response);
    if (typeof response.status !== 'undefined' && response.status === 500) {
      dispatch(asyncFetchFailure());
      // The message should come from CQ JSON
      // dispatch(notificationActions.showErrorNotification(spinnerErrorMsg));
    } else if ((response.data.output !== null && typeof response.data.output.goToSuccessURL !== 'undefined')) {
      dispatch(asyncFetchSuccess());
      window.location.href = response.data.output.goToSuccessURL;
    } else {
      dispatch(asyncFetchFailure());
      dispatch(notificationActions.showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch((error) => {
    console.log(error);
    console.log('***Error during Initiate Checkout***');
    dispatch(asyncFetchFailure());
    // The message should come from CQ JSON
    // dispatch(notificationActions.showErrorNotification(spinnerErrorMsg));
  });
};
