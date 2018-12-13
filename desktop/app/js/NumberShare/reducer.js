import { fromJS } from 'immutable';
import * as constants from './constants';

/**
 * Reducer to handle all async calls and show/hide loader accordingly. This is common for the entire page.
 * @param state : async status i.e isFetching, error
 * @param action : data and type
 * @returns {*} an Object denoting
 */
export const asyncCallStatus = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case constants.ASYNC_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case constants.ASYNC_FETCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case constants.ASYNC_FETCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case constants.ASYNC_FETCH_INVALIDATE:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};

export const deviceDetails = (state = {}, action) => {
  switch (action.type) {
    case constants.FETCH_DEVICE_IMG_SUCCESS:
      return action.deviceDetails;
    default:
      return state;
  }
};

export const cqContent = (state = {}, action) => {
  const immutableCQContent = fromJS({ label: {}, error: {}, html: {} });
  switch (action.type) {
    default:
      return immutableCQContent.mergeDeep(state);
  }
};

export const numberShare = (state = {}) => state;

export const emergencyContactInfo = (state = {}, action) => {
  switch (action.type) {
    case constants.SET_E911_DATA:
      return state.mergeDeep(fromJS(action.output));
    case constants.TOGGLE_EMERGENCY_MODAL:
      return state.mergeDeep(fromJS({ showEmergencyModal: action.flag }));
    case constants.SHOW_ERROR_MSG_MODAL:
      return state.mergeDeep(fromJS({ emergencyAddressError: action.msg }));
    default:
      return fromJS({ showEmergencyModal: false }).mergeDeep(state);
  }
};

export const selectedMtn = (state = {}, action) => {
  switch (action.type) {
    case constants.FETCH_SELECTED_MTN:
      return action.selectedMtn;
    default:
      return state;
  }
};
