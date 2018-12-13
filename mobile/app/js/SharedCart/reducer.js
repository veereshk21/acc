import { fromJS } from 'immutable';
import * as Constants from './constants';

/**
 * SharedCartOverlay page main reducer
 * @param {object} state - page state reference
 * @param {object} action - accepts action type and payload for selected state
 */
export const sharedCartData = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

/**
 * Loader specific status reducer
 * @param {object} state - page state reference
 * @param {object} action - accepts action type and payload for selected state
 */
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
