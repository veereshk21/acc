/**
 * Created by sgumma on 22-02-2017.
 */
import * as errorConstants from './constants';


export const asyncCallStatus = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case errorConstants.ASYNC_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case errorConstants.ASYNC_FETCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case errorConstants.ASYNC_FETCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case errorConstants.ASYNC_FETCH_CLEAR:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};

export const onAjaxResponse = (state = null, action) => {
  switch (action.type) {
    case errorConstants.GET_NEXT_OPTIONS:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};
