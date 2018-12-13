
import { fromJS } from 'immutable';

import {
  ASYNC_FETCH,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_INVALIDATE,
  ASYNC_FETCH_SUCCESS,
  FETCH_DEVICE_IMAGE,
  FETCH_DEVICE_IMAGE_SUCCESS,
  FETCH_ACCESSORIES_BUNDLE_SUCCESS,
  TRIGGER_EVENT,
} from './constants';


/**
 * Reducer to handle all async calls and show/hide loader accordingly.
 * This is common for the entire page.
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

export const cqContent = (state = {}, action) => {
  const immutableCQContent = fromJS({ label: {}, error: {}, html: {} });
  switch (action.type) {
    default:
      return immutableCQContent.mergeDeep(state);
  }
};

export const data = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const appleCare = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export function deviceImage(state = { isFetching: true }, action) {
  switch (action.type) {
    case FETCH_DEVICE_IMAGE:
      return Object.assign({}, state, { isFetching: true });
    case FETCH_DEVICE_IMAGE_SUCCESS:
      return Object.assign({}, state, { isFetching: false, deviceImage: action.deviceImage });
    default:
      return state;
  }
}

export function bundleAccessories(state = { isFetching: true }, action) {
  switch (action.type) {
    case FETCH_ACCESSORIES_BUNDLE_SUCCESS:
      return Object.assign({}, state, { isFetching: false, bundleAccessories: action.bundleAccessories });
    default:
      return state;
  }
}

export const triggerSeeDetailsOverlay = (state = false, action) => {
  switch (action.type) {
    case TRIGGER_EVENT:
      return true;
    default:
      return state;
  }
};
