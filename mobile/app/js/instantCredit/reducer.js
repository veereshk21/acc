/**
 * Created on 7/6/2017.
 */
import { fromJS } from 'immutable';
import * as constants from './constants';

export const instantCreditData = (state = {}, action) => {
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

/**
 * Reducer return empty html,label,error nodes in case backend doesnt send any one of them.
 * @param state
 * @param action
 * @returns {any}
 */
export const cqContent = (state = {}, action) => {
  const immutableCQContent = fromJS({ label: {}, error: {}, html: {} });
  switch (action.type) {
    default:
      return immutableCQContent.mergeDeep(state);
  }
};
