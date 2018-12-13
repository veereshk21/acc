export const deviceProtectionList = (state = {
  isFetching: false, fetched: false, error: false, data: null, cq: null,
}, action) => {
  switch (action.type) {
    case 'common/GET_PROTECTION_OPTIONS':
      return Object.assign({}, state, {
        isFetching: false, fetched: true, error: false, data: action.data.output.mtnDeviceInfo, cq: action.data.output.cq,
      });
    case 'common/CLEAR_PROTECTION_OPTIONS':
      return Object.assign({}, state, {
        isFetching: false, fetched: false, error: false, data: null, cq: null,
      });

    default:
      return state;
  }
};
