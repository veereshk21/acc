/**
 * Created by santhra  on 6/15/2017.
 */
import axios from 'axios';
import * as constants from './constants';
import { hashHistory } from './../store';

/**
 * Action sets a loader to be shown on page
 * */


/** Utility to fetch errors from error map object */
const _date = new Date();


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

export function getMoreInfoAction(response) {
  return {
    type: constants.GET_MORE_INFO,
    data: response,
  };
}

export function getExpressInfoAction(response) {
  return {
    type: constants.GET_EXPRESS_CONFIG_INFO,
    data: response,
  };
}

export function getInventoryInfoAction(response) {
  return {
    type: constants.GET_INVENTORY_INFO,
    data: response,
  };
}

export const getMoreInfoApi = () => (dispatch) => {
  axios.get(window.moreDetails).then((resp) => {
    const responseData = resp.data;
    dispatch(getMoreInfoAction(responseData));
    hashHistory.push('/moreDetails');
  }).catch((err) => {
    console.log(err);
  });
};


export const getPageJSONAPI = () => (dispatch) => {
  axios.get(window.expressconfig + '?ts=' + _date.getTime(), { cache: false }).then((resp) => {
    const expressConfig = resp.data;
    axios.get(window.expressconfiginventory + '?ts=' + _date.getTime(), { cache: false }).then((response) => {
      const responseData = response.data;
      dispatch(getExpressInfoAction(expressConfig.Page));
      dispatch(getInventoryInfoAction(responseData.output));
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
};

