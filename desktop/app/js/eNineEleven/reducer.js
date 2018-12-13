import { fromJS } from 'immutable';
import {
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_INVALIDATE,
  UPDATE_ADDRESSINFO_RESPONSE,
  ADDRESS_VALIDATION_FAILED,
  SET_E911_UPDATE_BILL_DATA,
} from './constants';


/**
 * Reducer to handle all async calls and show/hide loader accordingly. This is common for the entire page.
 * @param state : async status i.e isFetching, error
 * @param action : data and type
 * @returns {*} an Object denoting
 */
export const asyncCallStatus = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case ASYNC_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case ASYNC_FETCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case ASYNC_FETCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case ASYNC_FETCH_INVALIDATE:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};

export const showWarningMessage = (state = { showWarnings: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case ADDRESS_VALIDATION_FAILED:
      return Object.assign({}, state, { showWarnings: true, error: false });

    default:
      return state;
  }
};

export const updateEmergencyContactInfo = (state = {}, action) => {
  switch (action.type) {
    case SET_E911_UPDATE_BILL_DATA:
      return Object.assign({}, state, { emergenceContactInfo: action.output });
    default:
      return state;
  }
};

export const addressInfoDetails = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ADDRESSINFO_RESPONSE: {
      const newState = fromJS(action.data);
      return newState;
    }
    default:
      return state;
  }
};
