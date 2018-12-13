
import {
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_CLEAR,
  SELECTED_DEVICE_TYPE,
  SELECTED_IMEI,
  VALIDATE_IMEI_RESPONSE,
  SEARCH_RESULTS_INPUT,
  SEARCH_RESULTS_LINK,
  SEARCH_RESULTS_BRAND,
  INPUT_VAL,
} from './constants';

export const asyncCallStatus = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case ASYNC_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case ASYNC_FETCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case ASYNC_FETCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case ASYNC_FETCH_CLEAR:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};

const _model = {
  modelName: null, deviceCategory: 'Other', make: null, carrier: null, imageUrl: null, os: null,
};

export const main = (state = {
  selectedDevice: 'Smartphone', resultsInput: null, resultsLink: null, resultsBrand: null, model: _model,
}, action) => {
  switch (action.type) {
    case SELECTED_DEVICE_TYPE:
      return Object.assign({}, state, { selectedDevice: action.device });
    case INPUT_VAL:
      return Object.assign({}, state, { model: action.model });
    case SELECTED_IMEI:
      return Object.assign({}, state, action.imei);
    case SEARCH_RESULTS_INPUT: {
      return Object.assign({}, state, { resultsInput: action.res });
    }
    case SEARCH_RESULTS_LINK: {
      return Object.assign({}, state, { resultsLink: action.res });
    }
    case SEARCH_RESULTS_BRAND: {
      return Object.assign({}, state, { resultsBrand: action.res });
    }
    default:
      return state;
  }
};
export const iMEIResponse = (state = {}, action) => {
  switch (action.type) {
    case VALIDATE_IMEI_RESPONSE:
      return Object.assign({}, state, { output: action.res });
    default:
      return state;
  }
};
