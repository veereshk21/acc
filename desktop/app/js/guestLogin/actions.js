/* eslint-disable */
import axios from 'axios';
import { hideNotification } from '../common/NotificationBar/actions';
import { getErrorMap } from './../common/Helpers';
import { hashHistory } from './../store';
import {
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_INVALIDATE,
  SET_COLOR,
  SET_SIZE,
  SET_PRICE,
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

const postAPI = (data, url) => (axios.request({
  method: 'post',
  url,
  data,
}));

const getAPI = (url, parameters) => axios.request({
  method: 'get',
  url,
  params: parameters,
});

export const submitLogin = () => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState().toJS();
  const url = state.guestLoginDetails.amLoginURL + state.guestLoginDetails.amRedirectCheckoutURL;
  const data = {
    IDToken1: state.form.guestLoginForm.values.userName,
    IDToken2: state.form.guestLoginForm.values.password,
    rememberUserNameCheckBoxExists: state.form.guestLoginForm.values.rememberMe || false,
  };
  getAPI(url, data).then((response) => {
    if (response.data.statusCode === '00') {
      dispatch(hideNotification());
      dispatch(asyncFetchSucess({ ...response.data.output }));// action to hide loader
    } else {
      dispatch(asyncFetchSucess());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Catch Execption:', error);
    dispatch(asyncFetchFailure());
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};
