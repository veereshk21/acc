import request from 'axios';
import { reset } from 'redux-form';
import { showErrorNotification } from './../common/NotificationBar/actions';
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

function submitTransferAPI(data, url) {
  const requestParams = data;
  return request({
    method: 'post',
    url,
    data: requestParams,
  });
}
export const onTransferSubmit = (data, url) => function (dispatch) {
  dispatch(asyncFetch());// action to show loader
  submitTransferAPI(data, url).then((response) => {
    if (response.data.statusCode === '00') {
      window.location.href = response.data.output.redirectURL;
    } else {
      dispatch(asyncFetchSucess());// action to hide loader
      dispatch(reset('transferNumForm'));
      const errors = response.data.errorMap || response.data.ErrorMap;
      dispatch(showErrorNotification(getErrorMap(errors)));
      /* setTimeout(() => {
        dispatch(hideNotification());
      }, 5000); */
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
    dispatch(showErrorNotification('We are facing some issues with our backend systems. Please try after sometime.'));
  });
};
