/**
 * Created by hmahad on 2/16/2017.
 */
import { fromJS } from 'immutable';
import * as constants from './constants';

export const protectionData = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const selectedProtectionData = (state = {}, action) => {
  switch (action.type) {
    case constants.SELECTED_PROTECTION_DATA:
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
const _protectionData = window.protectionJSON ? window.protectionJSON : null;
const _mtnInfo = _protectionData ? _protectionData.output.mtnDeviceInfo : null;
const _equipmentProtectionList = _mtnInfo ? _mtnInfo.equipmentProtectionList : [];
const _preselected = _equipmentProtectionList.length > 0 && _equipmentProtectionList.filter((item) => item.preSelected === true);
const _bool = !(_preselected.length > 0);
export const btnState = (state = _bool, action) => {
  switch (action.type) {
    case constants.BTN_STATE:
      return false;
    default:
      return state;
  }
};
