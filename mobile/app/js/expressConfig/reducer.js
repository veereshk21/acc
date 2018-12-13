/**
 * Created by santhra  on 6/15/2017.
 */
// import { fromJS } from 'immutable';
import * as constants from './constants';

export const expressConfigData = (state, action) => {
  switch (action.type) {
    case constants.GET_EXPRESS_CONFIG_INFO:
      return Object.assign({}, state, action.data);
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


export const getMoreInfoData = (state = {}, action) => {
  switch (action.type) {
    case constants.GET_MORE_INFO:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

export const getPageInfoData = (state = {}, action) => {
  switch (action.type) {
    case constants.GET_INVENTORY_INFO:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

