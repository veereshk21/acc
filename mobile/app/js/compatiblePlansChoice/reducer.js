import * as constants from './constants';

export function additionalPlanDetailsReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_ADDL_PLAN_DETAILS':
      return Object.assign({}, state, action.data.planDetails);
    default:
      return state;
  }
}

export const asyncCallStatus = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case constants.ASYNC_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case constants.ASYNC_FETCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case constants.ASYNC_FETCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case constants.ASYNC_FETCH_CLEAR:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};

export const currentPlan = (state = '', action) => {
  switch (action.type) {
    case constants.SET_CURRENT_PLAN: {
      return state = action.planSorId; // eslint-disable-line
    }
    default:
      return state;
  }
};

export const comparePlans = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case constants.REQUEST_PLANS_COMPARE:
      return Object.assign({}, state, { isFetching: true, error: false });

    case constants.SUCCESS_PLANS_COMPARE:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data || {} });

    case constants.FAILURE_PLANS_COMPARE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case constants.INVALIDATE_PLANS_COMPARE:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};
