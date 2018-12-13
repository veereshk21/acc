import axios from 'axios';
import * as Constants from './constants';
import { getErrorMap } from './../common/Helpers';
import { showErrorNotification } from '../common/NotificationBar/actions';
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
export function asyncFetchSucess() {
  return {
    type: Constants.ASYNC_FETCH_SUCCESS,
  };
}

/* *
 * Action displays API error on the page.
 * */
export function asyncFetchFalied() {
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

export const clearCartAPI = (actionData, clearCartLink) => {
  const data = {
    action: actionData,
  };
  return axios.post(clearCartLink, data);
};

export const clearCart = (actionData, clearCartLink) => (dispatch) => {
  dispatch(asyncFetch());
  clearCartAPI(actionData, clearCartLink).then((res) => {
    dispatch(asyncFetchSucess());
    const response = res.data;
    if (response.statusCode === '00') {
      window.location.href = response.output.redirectUrl;
    } else {
      const errorMap = response.errorMap || response.ErrorMap;
      dispatch(showErrorNotification(getErrorMap(errorMap)));
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());
  });
};
