import * as constants from './constants';

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
