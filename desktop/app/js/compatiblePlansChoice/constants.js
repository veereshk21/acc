export const RESET_STATE = 'RESET_STATE';
export const ASYNC_FETCH = 'ASYNC_FETCH';
export const ASYNC_FETCH_SUCCESS = 'ASYNC_FETCH_SUCCESS';
export const ASYNC_FETCH_FAILURE = 'ASYNC_FETCH_FAILURE';
export const ASYNC_FETCH_CLEAR = 'ASYNC_FETCH_CLEAR';

export const API_SUCCESS_CODE = '00';
export const API_FAILURE_CODE = '01';

export const SINGLE_LINE = 'singleLine';
export const MULTI_LINE = 'multiLine';
export const DATA_ONLY = 'dataOnly';

export const ZERO_PRICE = '0.00';

export const capitalize = (str) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
