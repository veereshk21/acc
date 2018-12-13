import * as constants from './constants';

export function additionalPlanDetailsReducer(state = {}, action) {
  let tempState = state;
  switch (action.type) {
    case 'SET_ADDL_PLAN_DETAILS':
      // If user closes plandetails modal, clear the state
      if (!action.data.planDetails) {
        tempState = {};
      }
      return Object.assign({}, state, action.data.planDetails);
    default:
      return tempState;
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
