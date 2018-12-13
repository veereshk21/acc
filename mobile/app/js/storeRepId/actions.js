import request from 'axios';
import { history } from './../store';
import { showErrorNotification, hideNotification } from './../common/NotificationBar/actions';
import * as Constants from './constants';
import { getErrorMap } from './../common/Helpers';

/* *
 * Action sets a loader to be shown on page
 * */
export function asyncFetch() {
  return {
    type: Constants.ASYNC_FETCH,
  };
}
/* *
 * Action clears the loader on the page.
 * */
export function asyncFetchSuccess() {
  return {
    type: Constants.ASYNC_FETCH_SUCCESS,
  };
}

/* *
 * Action displays API error on the page.
 * */
export function asyncFetchFailed() {
  return {
    type: Constants.ASYNC_FETCH_FAILURE,
  };
}
/* *
 * Action clears the loader and also data in data node.
 * */
export function invalidateAsyncFetch() {
  return {
    type: Constants.ASYNC_FETCH_INVALIDATE,
  };
}

const validateRepIdAPI = (salesRepId, url) => {
  const requestParams = {
    salesRepId,
    updateRepIdToOrder: true,
  };

  return request({
    method: 'post',
    url,
    data: requestParams,
  });
};

const setStoreRepInfo = (data) => ({
  type: Constants.VALID_STORE_REP,
  data,
});

export function validateRepId(salesRepId, url) {
  return function (dispatch) {
    dispatch(asyncFetch());
    validateRepIdAPI(salesRepId, url).then((response) => { // eslint-disable-line
      dispatch(asyncFetchSuccess());// action to hide loader

      if (response.data.statusCode === Constants.API_SUCCESS_CODE && response.data.output.validSalesRepId === true) {
        dispatch(setStoreRepInfo(response.data.output));
        dispatch(hideNotification());
      } else {
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      }
    }).catch((error) => {
      console.log('Catch Execption:', error);
      dispatch(asyncFetchFailed());// on API failure
      dispatch(hideNotification());
      history.push('/genericError');
    });
  };
}
