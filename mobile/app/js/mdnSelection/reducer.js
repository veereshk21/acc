import { fromJS } from 'immutable';
import * as Constants from './constants';

export const changeMDNSelectionView = (state = Constants.MDN_SELECTION_VIEW, action) => {
  switch (action.type) {
    case Constants.CHANGE_MDN_SELECTION_VIEW:
      return action.view;
    default:
      return state;
  }
};

/**
 * Added for ICONIC - changing accountLevelInEligibleDetails on async call success
 * */

export const accountLevelInEligibleDetails = (state = {}, action) => {
  switch (action.type) {
    case Constants.AAL_API_SUCCESS: {
      return fromJS(action.data);
    }
    default:
      return state;
  }
};


export const selectedMDN = (state = null, action) => {
  switch (action.type) {
    case Constants.LOAN_INFO_PREORDER:
      return action.data.output.mtnDetailsList[0];
    case Constants.CHANGE_MDN_SELECTED:
      return action.payload;
    default:
      return state;
  }
};
export const asyncCallStatus = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case 'ASYNC_FETCH':
      return Object.assign({}, state, { isFetching: true, error: false });

    case 'ASYNC_FETCH_SUCCESS':
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case 'ASYNC_FETCH_FAILURE':
      return Object.assign({}, state, { isFetching: false, error: true });

    case 'ASYNC_FETCH_INVALIDATE':
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};
export const loaderFlag = (state = false, action) => {
  switch (action.type) {
    case 'loader':
      return action.payload;
    default:
      return state;
  }
};

export const submitAgreementResponse = (state = null, action) => {
  switch (action.type) {
    case Constants.SUBMIT_AGREEMENT:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

export const cancelPendingOrderResponse = (state = null, action) => {
  switch (action.type) {
    case Constants.CANCEL_PENDING_ORDER:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

export const preOrderResponse = (state = null, action) => {
  switch (action.type) {
    case Constants.LOAN_INFO_PREORDER:
      return Object.assign({}, state, action.data.output);
    default:
      return state;
  }
};
