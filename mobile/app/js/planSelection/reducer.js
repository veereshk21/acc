/**
 * Created by santhra  on 6/19/2017.
 */
import * as constants from './constants';

export const preOrderPlanData = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};


export const isFetching = (state = false, action) => {
  switch (action.type) {
    case constants.ASYNC_FETCH:
      return true;

    case constants.ASYNC_FETCH_SUCCESS:
      return false;

    case constants.ASYNC_FETCH_FAILURE:
      return false;

    default:
      return state;
  }
};

export const comparePlanDetails = (state = {}, action) => {
  switch (action.type) {
    case constants.COMPARE_PLAN: {
      return Object.assign({}, state, action.data);
    }
    default:
      return state;
  }
};

