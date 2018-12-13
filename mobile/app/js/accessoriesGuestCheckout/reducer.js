import { fromJS } from 'immutable';

import {
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_INVALIDATE,
  ASYNC_FETCH_WITHMESSAGE,
  RESET_STATE,
  SAME_AS_SHIPPING,
  SHIP_TO_TYPE,
  CYBER_SOURCE_DATA,
} from './constants';


/**
 * Reducer to handle all async calls and show/hide loader accordingly. This is common for the entire page.
 * @param state : async status i.e isFetching, error
 * @param action : data and type
 * @returns {*} an Object denoting
 */
export const asyncCallStatus = (state = {
  isFetching: false, error: false, data: {}, showLoaderMessage: false,
}, action) => {
  switch (action.type) {
    case ASYNC_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case ASYNC_FETCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case ASYNC_FETCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case ASYNC_FETCH_INVALIDATE:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });
    case ASYNC_FETCH_WITHMESSAGE:
      return Object.assign({}, state, {
        isFetching: true, error: false, showLoaderMessage: true,
      });

    default:
      return state;
  }
};


/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** *
 * * ** ** ** ** **ISPU reducer* ** ** ** ** ** ** *
 * ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

export const cqContent = (state = {}, action) => {
  const immutableCQContent = fromJS({ label: {}, error: {}, html: {} });
  switch (action.type) {
    default:
      return immutableCQContent.mergeDeep(state);
  }
};


/**
 * Main checkout reducer which is used to reset the checkout view and data, the entire window json is added as a new object orderDetails
 * @param state : an empty array , populated by intialState in createStore
 * @param action : data and type
 * @returns {*} by default a combinedReducer which acts on individual parts of the state tree.
 */
export const orderDetails = (state = {}, action) => {
  switch (action.type) {
    case RESET_STATE: {
      const newState = fromJS(action.data);
      return newState;
    }
    default:
      return state;
    // return state;
  }
};
export const shipToType = (state = {}, action) => {
  switch (action.type) {
    case SHIP_TO_TYPE: {
      return Object.assign({}, state, {
        shipToType: action.data,
      });
    }
    default:
      return state;
    // return state;
  }
};
export const billingState = (state = {
  sameAsShipping: true,
}, action) => {
  switch (action.type) {
    case SAME_AS_SHIPPING: {
      return Object.assign({}, state, {
        sameAsShipping: action.data,
      });
    }
    default:
      return state;
    // return state;
  }
};

export const cyberSourceData = (state = fromJS({}), action) => {
  switch (action.type) {
    case CYBER_SOURCE_DATA: {
      const newState = fromJS(action.data);
      return newState;
    }
    default:
      return state;
  }
};