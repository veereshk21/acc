import request from 'axios';
import { isEmpty as _isEmpty } from 'lodash';
import { history } from './../store';
import * as Constants from './constants';
import { showErrorNotification, showInfoNotification } from './../common/NotificationBar/actions';
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


const addAccessoryToCartAPI = (url, accProdId, accSkuId, accName) => {
  const requestParams = {
    accQty: '1',
    accProdId,
    accSkuId,
    accName,
    action: 'add',
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

export function addAccessoryToCart(url, accProdId, accSkuId, accName) {
  return function (dispatch) {
    dispatch(asyncFetch());
    addAccessoryToCartAPI(url, accProdId, accSkuId, accName).then((response) => { // eslint-disable-line
      if (checkResponse(response.data.output) && checkResponse(response.data.errorMap)) {
        dispatch(asyncFetchSucess());
        history.push('/genericError');
        return false;
      } else if (response.data.output && (response.data.output.success === true || response.data.output.success === 'true')) {
        dispatch(asyncFetchSucess());
        dispatch(showInfoNotification(response.data.output.successMessage));
        /* setTimeout(() => {
          dispatch(hideNotification())
        }, 5000) */
      } else {
        dispatch(asyncFetchSucess());
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
        /* setTimeout(() => {
          dispatch(hideNotification())
        }, 5000) */
      }
    }).catch(() => {
      dispatch(asyncFetchFalied());// on API failure
      history.push('/genericError');
    });
  };
}

const addAccessoryBundleToCartAPI = (url, accSkuId, accName) => {
  const requestParams = {
    accQty: '1',
    accProdId: accSkuId,
    accSkuId,
    accName,
    action: 'add',
  };

  return request({
    method: 'post',
    url,
    data: requestParams,
  });
  // return request.get('http://www.mocky.io/v2/59ee9b522e0000cf011c5bc9');
};

export function addAccessoryBundleToCart(url, accSkuId, accName) {
  return function (dispatch) {
    dispatch(asyncFetch());
    addAccessoryBundleToCartAPI(url, accSkuId, accName).then((response) => {
      if (response.data.statusCode === '00') {
        window.location.href = response.data.output.redirectUrl;
      } else {
        dispatch(asyncFetchSucess());
        dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
        // setTimeout(() => {
        //   dispatch(hideNotification());
        // }, 5000);
      }
    }).catch(() => {
      dispatch(asyncFetchFalied());// on API failure
      history.push('/genericError');
    });
  };
}
