/* eslint-disable consistent-return */
import request from 'axios';
import { isEmpty as _isEmpty } from 'lodash';
import { history } from './../store';


import { showErrorNotification } from './../common/NotificationBar/actions';
import { getErrorMap } from './../common/Helpers';
import {
  FETCH_RATINGS_REVIEWS,
  CHANGE_TAB_VIEW,
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_INVALIDATE,
  CHANGE_CAPACITY,
  CHANGE_COLOR,
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
/* *
 * Action clears the loader and also data in data node.
 * */
function invalidateAsyncFetch() { // eslint-disable-line
  return {
    type: ASYNC_FETCH_INVALIDATE,
  };
}

export default function selectTab(tab) {
  return {
    type: CHANGE_TAB_VIEW,
    text: tab,
  };
}


function deviceRatingsReviewsAction(data) {
  return {
    type: FETCH_RATINGS_REVIEWS,
    data,
  };
}

function deviceRatingsReviewsPromise(accId) {
  return request.get(`https://api.bazaarvoice.com/data/reviews.json?apiversion=5.4&passkey=1zznhixfcsve28gk1m97wcfo1&include=Products&stats=Reviews&Filter=ProductId:${accId}&Sort=Helpfulness:desc&Limit=6`);
}


export const fetchDeviceRatingsReviews = (accId) => function (dispatch) {
  dispatch(asyncFetch);
  deviceRatingsReviewsPromise(accId).then((res) => {
    dispatch(asyncFetchSucess());
    return dispatch(deviceRatingsReviewsAction(res.data));
  }).catch((error) => {
    console.log(error); // eslint-disable-line
    dispatch(asyncFetchFalied());// on API failure
  });
};

export const getParameterByName = (name, url = window.location.href) => {
  const nameStr = name.replace(/[\[\]]/g, "\\$&"); // eslint-disable-line
  const regex = new RegExp("[?&]" + nameStr + "(=([^&#]*)|&|#|$)"); // eslint-disable-line
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const addAccessoryToCartAPI = (url, accProdId, accSkuId, displayName) => {
  const editDevice = location.search.indexOf('action=edit') > -1; // eslint-disable-line
  const commerceItemId = getParameterByName('accCommerceId');
  const requestParams = {
    accQty: '1',
    commerceItemId,
    accProdId,
    accSkuId,
    action: editDevice ? 'edit' : 'add',
    displayName,
  };

  return request({
    method: 'post',
    url,
    data: requestParams,
  });
};

function checkResponse(getRes) {
  return (getRes === undefined || getRes === null || _isEmpty(getRes));
}

export function addAccessoryToCart(url, accProdId, accSkuId, displayName) {
  return function (dispatch) {
    dispatch(asyncFetch());
    addAccessoryToCartAPI(url, accProdId, accSkuId, displayName).then((response) => {
      if (checkResponse(response.data.output) && checkResponse(response.data.errorMap)) {
        dispatch(asyncFetchSucess());
        history.push('/genericError');
        return false;
      } else if (response.data.output && (response.data.output.success === true || response.data.output.success === 'true')) {
        dispatch(asyncFetchSucess());
        window.location.href = response.data.output.redirectUrl;
        //  history.push('/chooseColor');
      } else {
        dispatch(asyncFetchSucess());
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
      }
    }).catch(() => {
      dispatch(asyncFetchFalied());// on API failure
      history.push('/genericError');
    });
  };
}

export function changeContractOption(contract) {
  return {
    type: 'CHANGE_CONTRACT_OPTION',
    text: contract,
  };
}
export function changeCapacity(size, skuId, displayName) {
  return {
    type: CHANGE_CAPACITY,
    size,
    skuId,
    displayName,
  };
}

export function changeColor(colorName, size, skuId, displayName) {
  return {
    type: CHANGE_COLOR,
    colorName,
    size,
    skuId,
    displayName,
  };
}

export function goToURL(url) {
  window.location.href = url;
}

export function notifyOutOfStock(msg) {
  return function (dispatch) {
    dispatch(showErrorNotification(msg));
  };
}
