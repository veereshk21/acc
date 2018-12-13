
import * as Constants from './constants';

export const asyncCallStatus = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case Constants.ASYNC_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case Constants.ASYNC_FETCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case Constants.ASYNC_FETCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case Constants.ASYNC_FETCH_CLEAR:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    case Constants.ASYNC_FETCH_INVALIDATE:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};

export const main = (state = { selectedDevice: undefined, selectedImei: undefined }, action) => {
  switch (action.type) {
    case Constants.SELECTED_DEVICE_TYPE:
      return Object.assign({}, state, { selectedDevice: action.device });
    case Constants.INPUT_VAL:
      return Object.assign({}, state, { model: action.model });
    case Constants.SELECTED_IMEI:
      return Object.assign({}, state, { selectedImei: action.imei });
    default:
      return state;
  }
};
export const iMEIResponse = (state = {}, action) => {
  switch (action.type) {
    case Constants.VALIDATE_IMEI_RESPONSE:
      return Object.assign({}, state, { output: action.res });
    default:
      return state;
  }
};
export const simValidationResponse = (state = {}, action) => {
  switch (action.type) {
    case Constants.VALIDATE_SIM_RESPONSE:
      return Object.assign({}, state, { output: action.res });
    default:
      return state;
  }
};

const initalCheckedDeviceState = window.byodJSON.output.checkedDevices;
export const checkedDevicesResponse = (state = { output: initalCheckedDeviceState }, action) => {
  switch (action.type) {
    case Constants.CHECKED_DEVICES_RESPONSE:
      return Object.assign({}, state, { output: action.res });
    default:
      return state;
  }
};
