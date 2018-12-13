import axios from 'axios';
import * as notificationActions from '../common/NotificationBar/actions';
import { getErrorMap } from './../common/Helpers';
import {
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
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

export const callCheckoutAPI = (source, url) => {
  const data = {
    source,
  };
  return axios.post(url, data);
};


export const initiateCheckout = () => (dispatch, getState) => {
  dispatch(asyncFetch());
  const state = getState();
  const source = state.get('details').get('output').get('source');
  const url = state.get('details').get('output').get('confirmURL');

  callCheckoutAPI(source, url).then((response) => {
    if (typeof response.status !== 'undefined' && response.status === 500) {
      dispatch(asyncFetchFailure());
    } else if ((response.data.output !== null && typeof response.data.output.goToSuccessURL !== 'undefined')) {
      dispatch(asyncFetchSuccess());
      window.location = response.data.output.goToSuccessURL;
    } else {
      dispatch(asyncFetchFailure());
      dispatch(notificationActions.showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch(() => {
    dispatch(asyncFetchFailure());
  });
};
