import axios from 'axios';
import * as constants from './constants';
import { getErrorMap } from './../common/Helpers';
import * as NotificationActions from '../common/NotificationBar/actions';

/**
 * Action sets a loader to be shown on page
 * */
const asyncFetch = () => ({
  type: constants.ASYNC_FETCH,
});

/**
 * Action clears the loader on the page.
 * */
const asyncFetchSuccess = (response) => ({
  type: constants.ASYNC_FETCH_SUCCESS,
  data: response,
});

const setSMSCapableDevices = (result) => ({
  type: constants.SMS_ENABLED_DEVICES,
  result,
});

const getSMSCapableDevicesAPI = () =>
  /** TODO:Replace with actual service */
  axios.get(constants.API_FETCH_SMS_DEVICES);

export const getSMSCapableDevices = () => (dispatch) => {
  dispatch(asyncFetch());

  getSMSCapableDevicesAPI().then((resp) => {
    const respData = resp.data;
    // let respData = fetchJSON;
    // console.log('test', respData);
    if (respData.statusCode === '00') {
      dispatch(asyncFetchSuccess(respData));
      dispatch(setSMSCapableDevices(respData.output));
    } else {
      // bad session, bad order?
    }
  }).catch((err) => {
    // error dispatch(asyncFetchSuccess(respData));
    console.log(err); // eslint-disable-line
  });
};

// ???
const setSendSMSResult = (codeSentTo) => ({
  type: constants.CODE_SENT,
  codeSentTo,
});

const sendSMSAPI = (sendSMSTo) =>
  /** TODO:Replace with actual service */
  axios.get(constants.API_SEND_SMS, { params: { sendSMSTo } });

export const sendSMS = (codeSentTo) => (dispatch) => {
  sendSMSAPI(codeSentTo).then((resp) => {
    const respData = resp.data;
    // let respData = sendSMSJSON;
    console.log('sendSMSAPI', respData);
    if (respData.statusCode === '00') {
      dispatch(setSendSMSResult(codeSentTo));

      dispatch(NotificationActions.showInfoNotification(`
        We've sent a new verification code to ${codeSentTo}
      `));
    } else {
      // bad session, bad order?
      const erroMap = respData.ErrorMap || respData.errorMap;
      dispatch(NotificationActions.showInfoNotification(getErrorMap(erroMap)));
    }
  }).catch((err) => {
    // error dispatch(asyncFetchSuccess(respData));
    console.log(err);
  });
};

const setValidateAuthCodeResp = (output) => {
  const { validAuthCode, numOfAttempts } = output;
  const type = validAuthCode ? constants.VALID_CODE : constants.INVALID_CODE;

  return {
    type,
    numOfAttempts,
  };
};

const validateAuthCodeAPI = (authCode) =>
  /** TODO:Replace with actual service */
  axios.get(constants.API_VALIDATE_AUTH_CODE, { params: { authCode } });

export const validateAuthCode = (authCode) => (dispatch) => {
  dispatch(asyncFetch());

  validateAuthCodeAPI(authCode).then((resp) => {
    const respData = resp.data;
    // let respData = validateAuthCodeJSON;
    console.log('validateAuthCode', respData);
    if (respData.statusCode === '00') {
      dispatch(asyncFetchSuccess(respData));
      dispatch(setValidateAuthCodeResp(respData.output));
    } else {
      const erroMap = respData.ErrorMap || respData.errorMap;
      dispatch(NotificationActions.showInfoNotification(getErrorMap(erroMap)));
    }
  }).catch((err) => {
    // error dispatch(asyncFetchSuccess(respData));
    console.log(err);
  });
};

export const resetInvalidAuthCode = () => ({
  type: constants.RESET_INVALID_AUTH_CODE,
});
