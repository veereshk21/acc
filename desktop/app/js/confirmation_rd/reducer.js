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

export const cqContent = (state = {}, action) => {
  const immutableCQContent = fromJS({ label: {}, error: {}, html: {} });
  switch (action.type) {
    default:
      return immutableCQContent.mergeDeep(state);
  }
};

export const billingInfo = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export const devices = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export const plans = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export const selectedShippingType = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export const shippingInfo = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export const orderDetails = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};


/*
Recommended accessories
 */

export const recommendedAccessories = (state = { isFetching: false, error: false, data: {} }, action) => {
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
