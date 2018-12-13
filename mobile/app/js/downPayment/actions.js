import axios from 'axios';
import { hashHistory } from './../store';
import {
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
} from './constants';

const checkoutURL = window.downPaymentJSON.output.checkoutRedirectUrl;


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

export const callCheckoutAPI = () => axios.post(checkoutURL);


export const initiateCheckout = () => (dispatch) => {
  dispatch(asyncFetch());// action to show loader
  callCheckoutAPI().then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    window.location.href = response.data.output.goToSuccessURL;
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
    hashHistory.push('/genericError');
  });
};
