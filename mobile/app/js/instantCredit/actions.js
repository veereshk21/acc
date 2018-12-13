/**
 * created on 7/6/2017.
 */

import axios from 'axios';
import * as constants from './constants';
// import { hashHistory } from './../store';
import { showErrorNotification } from './../common/NotificationBar/actions';
import { getErrorMap } from './../common/Helpers';

export const asyncFetch = () => ({
  type: constants.ASYNC_FETCH,
});

/**
 * Action clears the loader on the page.
 * */
export const asyncFetchSuccess = (response) => ({
  type: constants.ASYNC_FETCH_SUCCESS,
  data: response,

});

export const addItemAPI = (url, data) => axios.post(url, data);

export const addSelectedItem = (url, data) => (dispatch) => {
  dispatch(asyncFetch());
  /* Fetch application state */
  // const stateData = setState();

  addItemAPI(url, data).then((resp) => {
    dispatch(asyncFetchSuccess());
    if (resp.data.statusCode === '00') {
      window.location.href = resp.data.output.redirectUrl;
    } else {
      dispatch(asyncFetchSuccess());
      dispatch(showErrorNotification(getErrorMap(resp.data.errorMap)));
    }
  }).catch((err) => {
    console.log('***Error while adding Protection***'); // eslint-disable-line no-console
    console.error(err); // eslint-disable-line no-console
  });
};
