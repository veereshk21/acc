import { fromJS } from 'immutable';

export const asyncCallStatus = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case 'ASYNC_FETCH':
      return Object.assign({}, state, { isFetching: true, error: false });

    case 'ASYNC_FETCH_SUCCESS':
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case 'ASYNC_FETCH_FAILURE':
      return Object.assign({}, state, { isFetching: false, error: true });

    case 'ASYNC_FETCH_INVALIDATE':
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};

export const data = (state = {}, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export const cqContent = (state = {}, action) => {
  const immutableCQContent = fromJS({ label: {}, error: {}, html: {} });
  switch (action.type) {
    default:
      return immutableCQContent.mergeDeep(state);
  }
};

export const promoDetails = (state = null, action) => {
  switch (action.type) {
    case 'PROMO_DETAILS':
      return fromJS(action.data);

    default:
      return state;
  }
};

export const eligibleModalDetails = (state = null, action) => {
  switch (action.type) {
    case 'ELIGIBILITY_DETAILS':
      return fromJS(action.data);

    default:
      return state;
  }
};
