/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable no-console */
import request from 'axios';
import qs from 'qs';
// import Logger from './../../../server/logger';
// const Logger = require('../../../server/logger');

import {
  ASYNC_FETCH,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_INVALIDATE,
  ASYNC_FETCH_SUCCESS,
} from './constants';
// import { showErrorNotification } from './../common/NotificationBar/actions';

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
function invalidateAsyncFetch() { // eslint-disable-line
  return {
    type: ASYNC_FETCH_INVALIDATE,
  };
}

/**
 * Action clears the loader on the page.
 * */
export const asyncFetchSuccess = (response) => ({
  type: ASYNC_FETCH_SUCCESS,
  data: response,

});

export { asyncFetch, asyncFetchFalied };
