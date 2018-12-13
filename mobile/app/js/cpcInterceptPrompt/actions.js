import axios from 'axios';
import * as constants from './constants';
import { showErrorNotification } from './../common/NotificationBar/actions';
import { getErrorMap } from './../common/Helpers';

export const asyncFetch = () => ({
  type: constants.ASYNC_FETCH,
});

export const asyncFetchSuccess = (response) => ({
  type: constants.ASYNC_FETCH_SUCCESS,
  data: response,
});

export const asyncFetchFailure = (response) => ({
  type: constants.ASYNC_FETCH_FAILURE,
  data: response,
});


export const cpcInterceptPromptDeclineAPI = (url, data) => axios.post(url, data);

export const onCpcInterceptPromptDecline = (url, data = {}) => (dispatch) => {
  const url_ts = url;// + '?ts=' + Date.now();

  dispatch(asyncFetch());
  cpcInterceptPromptDeclineAPI(url_ts, data).then((resp) => {
    dispatch(asyncFetchSuccess());
    if (resp.data.statusCode === '00') {
      window.location.href = resp.data.output.redirectUrl;// + '?ts=' + Date.now();
    } else {
      dispatch(asyncFetchSuccess());
      dispatch(showErrorNotification(getErrorMap(resp.data.errorMap)));
    }
  }).catch((err) => {
    dispatch(asyncFetchFailure());
    console.log('***Error while cpcInterceptPromptDecline***'); // eslint-disable-line no-console
    console.error(err); // eslint-disable-line no-console
  });
};

