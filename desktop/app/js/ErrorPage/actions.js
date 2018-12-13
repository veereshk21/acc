/**
 * Created by sgumma on 22-02-2017.
 */
import axios from 'axios';
import * as errorConstants from './constants';

/**
 * Action sets a loader to be shown on page
 * */
export const asyncFetch = () => ({
  type: errorConstants.ASYNC_FETCH,
});

/**
 * Action clears the loader on the page.
 * */
export const asyncFetchSuccess = (response) => ({
  type: errorConstants.ASYNC_FETCH_SUCCESS,
  data: response,

});

const getNextOptions = (data) => ({
  type: errorConstants.GET_NEXT_OPTIONS,
  data,
});

/**
 * Action clears the loader and also data in data node.
 * */
export const asyncFetchClear = () => ({
  type: errorConstants.ASYNC_FETCH_CLEAR,
});

const processNextAjax = (url) => axios.get(`${url}`);
export const onAjaxRequest = (url) => ((dispatch) => {
  dispatch(asyncFetch());
  processNextAjax(url).then((response) => {
    const resp = response.data;
    dispatch(asyncFetchSuccess(resp.output));
    dispatch(getNextOptions(resp));
  }).catch(() => {
  });
});
