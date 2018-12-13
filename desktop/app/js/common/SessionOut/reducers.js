import * as constants from './constants';

export const sessionExtension = (state = { isSessionExtended: true, error: false }, action) => {
  switch (action.type) {
    case constants.SESSION_ASYNC_FETCH:
      return Object.assign({}, state, { isSessionExtended: false, error: false });

    case constants.SESSION_ASYNC_FETCH_SUCCESS:
      return Object.assign({}, state, { isSessionExtended: true, error: false });

    case constants.SESSION_ASYNC_FETCH_FAILURE:
      return Object.assign({}, state, { isSessionExtended: false, error: true });

    default:
      return state;
  }
};
