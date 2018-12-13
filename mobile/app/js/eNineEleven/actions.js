import request from 'axios';
import { reset } from 'redux-form';
import { hashHistory } from './../store';
import { showErrorNotification } from './../common/NotificationBar/actions';
import { getErrorMap } from './../common/Helpers';
import {
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
  UPDATE_ADDRESSINFO_RESPONSE,
  ADDRESS_VALIDATION_FAILED,
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

function addressValidation() {
  return {
    type: ADDRESS_VALIDATION_FAILED,
  };
}

export const updateAddressInfo = (response) => ({
  type: UPDATE_ADDRESSINFO_RESPONSE,
  data: response,
});

function submitAddressUpdateAPI(data, url) {
  const requestParams = data;
  return request({
    method: 'post',
    url,
    data: requestParams,
  });
}
export const onUpdateAddress = (data, url) => function (dispatch) {
  dispatch(asyncFetch());// action to show loader
  submitAddressUpdateAPI(data, url).then((response) => {
    if (!response.data.success) {
      dispatch(addressValidation());
      dispatch(asyncFetchFalied());
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    } else if (response.data.success) {
      dispatch(asyncFetchSucess());
      if (response.data.output.redirectUrl) {
        window.location.href = response.data.output.redirectUrl;
      } else if (response.data.output.addressInfo) {
        dispatch(updateAddressInfo(response.data));
        hashHistory.push('/addressOptions');
      } else {
        dispatch(reset('addressInfoForm'));
      }
    }
  }).catch(() => {
    dispatch(asyncFetchFalied());// on API failure
    dispatch(showErrorNotification('We are facing some issues with our backend systems. Please try after sometime.'));
  });
};
