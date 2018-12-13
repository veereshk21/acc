/**
 * returns new state for loader state
 */
export const asyncCallStatus = (state = { isFetching: false, error: false, data: {} }, action, actionTypes) => {
  switch (action.type) {
    case actionTypes.ASYNC_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case actionTypes.ASYNC_FETCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case actionTypes.ASYNC_FETCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case actionTypes.ASYNC_FETCH_CLEAR:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};
