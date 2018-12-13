/* eslint linebreak-style: ["error", "windows"] */
/* eslint-disable no-console */
import request from 'axios';
// import Logger from './../../../server/logger';
// const Logger = require('../../../server/logger');

import {
  ASYNC_FETCH,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_INVALIDATE,
  ASYNC_FETCH_SUCCESS,
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

const aalWithofferAPI = (redirectURL, offerId) => {
  /* Added selectedOption request param to URI as per iconic needs */
  const aalWithOfferAPIURL = redirectURL + '?offerId=' + offerId;
  return request.get(aalWithOfferAPIURL);
};

export const aalWithOffer = (redirectURL, offerId) => (dispatch) => {
  dispatch(asyncFetch());
  aalWithofferAPI(redirectURL, offerId).then((res) => {
    dispatch(asyncFetchSuccess());
    const response = res.data;
    if (response.redirectURL) {
      window.location.href = response.redirectURL;
    }
  }).catch((error) => {
    dispatch(asyncFetchFalied());// on API failure
    console.log(error);
    history.push('/genericError');
    return false;
  });
};

export const cancelOfferRedirect = (redirectURL) => {
  window.location.href = redirectURL;
};
