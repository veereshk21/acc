/**
 * Created by mambig on 7/20/17.
 */
import axios from 'axios';

import { SESSION_ASYNC_FETCH, SESSION_ASYNC_FETCH_SUCCESS, SESSION_ASYNC_FETCH_FAILURE } from './constants';

export function extendSession() {
  return {
    type: SESSION_ASYNC_FETCH,
  };
}
/* *
 * Action clears the loader on the page.
 * */
export function extendSessionSucess(data) { //eslint-disable-line
  return {
    type: SESSION_ASYNC_FETCH_SUCCESS,
    data,
  };
}

/* *
 * Action displays API error on the page.
 * */
export function extendSessionFalied() { //eslint-disable-line
  return {
    type: SESSION_ASYNC_FETCH_FAILURE,
  };
}
/**
 * axios interceptor to intercept any outgoing API call
 * @param cbSuccess - called on API success
 * @param cbError - called on API failure
 */
export const interceptRequests = (cbSuccess, cbError) => {
  axios.interceptors.response.use((response) => {
    if (cbSuccess && typeof cbSuccess === 'function') {
      cbSuccess(response);
    }
    return response;
  }, (error) => {
    if (cbError && typeof cbError === 'function') {
      cbError(error);
    }
    return Promise.reject(error);
  });
};


function keepSessionAlivePromise(continueSessionURL) {
  return axios.get(continueSessionURL);
}
/**
 * API to reset the session and keep it alive
 * @returns {Function}
 */
export const keepSessionAlive = (continueSessionURL) => () => keepSessionAlivePromise(continueSessionURL);
