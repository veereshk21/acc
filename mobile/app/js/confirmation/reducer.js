/*
 *
 * Confirmation reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

/**
 * Reducer to handle all async calls and show/hide loader accordingly. This is common for the entire page.
 * @param state : async status i.e isFetching, error
 * @param action : data and type
 * @returns {*} an Object denoting
 */
export const asyncCallStatus = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case Constants.ASYNC_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case Constants.ASYNC_FETCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case Constants.ASYNC_FETCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case Constants.ASYNC_FETCH_INVALIDATE:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};

export const confirmationReducer = (state, action) => {
  switch (action.type) {
    case Constants.CN_ACTION_DONE:
      return state.merge(fromJS(action.data.output));
    case Constants.CN_ACTION_NOT_NOW:
      return state.merge(fromJS(action.data.output));
    case Constants.CN_ACTION_LEARN_HOW:
      return state.merge(fromJS(action.data.output));
    default:
      return state;
  }
};

/*
Recommended accessories
 */

export const recommendedAccessoriesReducer = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case Constants.RECOMM_ACC_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case Constants.RECOMM_ACC_FETCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case Constants.RECOMM_ACC_FETCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case Constants.RECOMM_ACC_FETCH_INVALIDATE:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};
