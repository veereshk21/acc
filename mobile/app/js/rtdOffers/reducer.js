/**
 * Created by santhra  on 6/15/2017.
 */
/*
 *
 * Homepage reducer
 *
 */

import { fromJS } from 'immutable';
import * as Constants from './constants';

const initialState = fromJS({});
const asyncCallInitState = fromJS({ isFetching: false, error: false, data: {} });

export const asyncCallStatus = (state = asyncCallInitState, action) => {
  switch (action.type) {
    case Constants.ASYNC_FETCH:
      return state.mergeDeep({ isFetching: true, error: false });

    case Constants.ASYNC_FETCH_SUCCESS:
      return state.mergeDeep({ isFetching: false, error: false, data: action.data });

    case Constants.ASYNC_FETCH_FAILURE:
      return state.mergeDeep({ isFetching: false, error: true });

    default:
      return state;
  }
};

function rtdOfferReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default rtdOfferReducer;
