/**
 * Created by hmahad on 2/16/2017.
 */

import axios from 'axios';
import * as constants from './constants';
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

export const addProtectionAPI = (url, data) => axios.post(url, data);

export const addSelectedProtection = (url, data) => (dispatch) => {
  dispatch(asyncFetch());

  addProtectionAPI(url, data).then((resp) => {
    dispatch(asyncFetchSuccess());

    // let resp = {
    //   "data": {
    //     "statusCode": "01",
    //     "errorMap": {"03": "Some error has occurred try again later"},
    //     "output": {
    //       "addPlanFeatureFlg": "true",
    //       "redirectUrl": "/digital/cart/getCartDetails"
    //     },
    //     "statusMessage": "Service completed Successfully."
    //   }
    // };

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
export const getSelectedProtectionData = (data) => (dispatch) => {
  dispatch({
    type: constants.SELECTED_PROTECTION_DATA,
    data,
  });
};

export const updateBtnState = () => (dispatch) => {
  dispatch({
    type: constants.BTN_STATE,
  });
};
