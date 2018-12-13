export const TEXT_DIFFERENT_METHOD = 'other';

export const ASYNC_FETCH = 'securePIN/ASYNC_FETCH';
export const ASYNC_FETCH_SUCCESS = 'securePIN/ASYNC_FETCH_SUCCESS';
export const ASYNC_FETCH_FAILURE = 'securePIN/ASYNC_FETCH_FAILURE';
export const ASYNC_FETCH_CLEAR = 'securePIN/ASYNC_FETCH_CLEAR';

export const SMS_ENABLED_DEVICES = 'securePIN/SMS_ENABLED_DEVICES';
export const CODE_SENT = 'securePIN/CODE_SENT';
export const VALID_CODE = 'securePIN/VALID_CODE';
export const INVALID_CODE = 'securePIN/INVALID_CODE';
export const RESET_INVALID_AUTH_CODE = 'securePIN/RESET_INVALID_AUTH_CODE';

export const API_FETCH_SMS_DEVICES = window.securePinUrls.fetchSMSDevicesURL;
export const API_SEND_SMS = window.securePinUrls.sendSMSURL;
export const API_VALIDATE_AUTH_CODE = window.securePinUrls.validateAuthCodeURL;
