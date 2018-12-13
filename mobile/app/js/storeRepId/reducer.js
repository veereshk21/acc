import * as Constants from './constants';

/**
 *
 * @param state
 * @param action
 * @returns {*}
 */
export const userInfo = (state = {}, action) => {
  switch (action.type) {
    case Constants.VALID_STORE_REP:
      return Object.assign({}, state, { ...action.data });
    default:
      return state;
  }
};
