import { fromJS } from 'immutable';
import * as Constants from './constants';

/* Init state data for all reducers */
const pageJSON = window.accessoriesJSON && window.accessoriesJSON.output ? window.accessoriesJSON.output : {};
const accessoriesInitState = fromJS(pageJSON);
const asyncCallInitState = fromJS({ isFetching: false, error: false, data: {} });

/**
 * Accessories page main reducer
 * @param {object} state - page state reference
 * @param {object} action - accepts action type and payload for selected state
 */
export const accessoriesReducer = (state = accessoriesInitState, action) => {
  switch (action.type) {
    case Constants.RESET_ACCESSORIES:
      return state.mergeDeep(action.data);

    default:
      return state;
  }
};

/**
 * Loader specific status reducer
 * @param {object} state - page state reference
 * @param {object} action - accepts action type and payload for selected state
 */
export const asyncCallStatus = (state = asyncCallInitState, action) => {
  switch (action.type) {
    case Constants.ASYNC_FETCH:
      return state.mergeDeep({ isFetching: true, error: false });

    case Constants.ASYNC_FETCH_SUCCESS:
      return state.mergeDeep({ isFetching: false, error: false, data: action.data });

    case Constants.ASYNC_FETCH_FAILURE:
      return state.mergeDeep({ isFetching: false, error: true });

    case Constants.ASYNC_FETCH_INVALIDATE:
      return state.mergeDeep({ isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};

/**
 * CQ JSON specific reducer
 * @param {object} state - page state reference
 * @param {object} action - accepts action type and payload for selected state
 */
export const cqContent = (state = {}, action) => {
  const immutableCQContent = fromJS({ label: {}, error: {}, html: {} });
  switch (action.type) {
    default:
      return immutableCQContent.mergeDeep(state);
  }
};
