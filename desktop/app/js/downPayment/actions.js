import request from 'axios';
import { hashHistory } from './../store';
import { showErrorNotification, hideNotification } from './../common/NotificationBar/actions';
import { getErrorMap } from './../common/Helpers';

import {
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_INVALIDATE,
} from './constants';

const asyncFetch = () => ({
  type: ASYNC_FETCH,
});

const asyncFetchSucess = (data = {}) => ({
  type: ASYNC_FETCH_SUCCESS,
  data,
});

const asyncFetchFalied = () => ({
  type: ASYNC_FETCH_FAILURE,
});

export const invalidateAsyncFetch = () => ({
  type: ASYNC_FETCH_INVALIDATE,
});

const postAPI = (data, url) => (request({
  method: 'post',
  url,
  data,
}));

export const initiateCheckout = (url) => (dispatch) => {
  dispatch(asyncFetch());
  postAPI({}, url).then((response) => {
    dispatch(hideNotification());
    dispatch(asyncFetchSucess());
    if ((response.data.output && typeof response.data.output.goToSuccessURL !== 'undefined')) {
      window.location = response.data.output.goToSuccessURL;
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(hideNotification());
    dispatch(asyncFetchFalied());
    hashHistory.push('/genericError');
  });
};
