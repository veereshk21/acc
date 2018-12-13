/**
 * Created by santhra  on 6/15/2017.
 */
import axios from 'axios';
import * as constants from './constants';


export const getParameterByName = (name, url = window.location.href) => {
  const nameStr = name.replace(/[\[\]]/g, '\\$&'); // eslint-disable-line
  const regex = new RegExp('[?&]' + nameStr + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

/**
 * Action sets a loader to be shown on page
 * */
export const asyncFetch = () => ({
  type: constants.ASYNC_FETCH,
});

/**
 * Action clears the loader on the page.
 * */
export const asyncFetchSuccess = () => ({
  type: constants.ASYNC_FETCH_SUCCESS,
});


/** Utility to fetch errors from error map object */
export const getComparePlanSuccess = (response) => (
  {
    type: constants.COMPARE_PLAN,
    data: response,
  });

export const getComparePlanAPI = (comparePlanURI, comparePlanSku) => axios.post(comparePlanURI, { planSorId: comparePlanSku });
// return axios.get("http://www.mocky.io/v2/59b49477100000ef18236be6");


export const getComparePlanDetails = (comparePlanURI, comparePlanSku) => (dispatch) => {
  dispatch(asyncFetch());
  getComparePlanAPI(comparePlanURI, comparePlanSku).then((res) => {
    /* TODO:REMOVE DUMMY RESPONSE */
    const response = res.data;
    dispatch(getComparePlanSuccess(response.output));
    dispatch(asyncFetchSuccess());
  });
};

