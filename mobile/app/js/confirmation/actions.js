import axios from 'axios';
// import { hashHistory } from './../store';
import * as Constants from './constants';
import { hideNotification } from './../common/NotificationBar/actions';


/* *
 * Action clears the loader on the page.
 * */
function asyncFetchSuccess(data) {
  return {
    type: Constants.ASYNC_FETCH_SUCCESS,
    data,
  };
}

/* *
 * Action displays API error on the page.
 * */
function asyncFetchFailed() {
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

/*
Recommended accessories actions
 */
function recommAccAsyncFetch() {
  return {
    type: Constants.RECOMM_ACC_FETCH,
  };
}


function recommAccAsyncFetchSuccess(data) {
  return {
    type: Constants.RECOMM_ACC_FETCH_SUCCESS,
    data,
  };
}


function recommAccAsyncFetchFailed() {
  return {
    type: Constants.RECOMM_ACC_FETCH_FAILURE,
  };
}


export function recommAccInvalidateAsyncFetch() {
  return {
    type: Constants.RECOMM_ACC_FETCH_INVALIDATE,
  };
}


const getRecommendedAccAPI = (url) => axios({
  method: 'get',
  url,
  params: {
    format: 'json',
  },
});

export const getRecommendedAcc = (url) => (dispatch) => {
  dispatch(recommAccAsyncFetch());
  getRecommendedAccAPI(url).then((response) => {
    if (response.data.statusCode === Constants.API_SUCCESS_CODE) {
      const { data } = response;
      dispatch(recommAccAsyncFetchSuccess(data));
    }
    dispatch(asyncFetchSuccess());
  }).catch((err) => {
    console.log(err); // eslint-disable-line no-console
    dispatch(recommAccAsyncFetchFailed(err));
    dispatch(asyncFetchFailed());// on API failure
    dispatch(hideNotification());
  });
};
