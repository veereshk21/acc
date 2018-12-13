import * as Constants from './constants';

const initialUserState = {
  mdnList: [],
  mdnTransferList: [],
};
const asyncCallStatusInit = { isFetching: false, error: false, data: {} };

export const changeMDNSelectionView = (state = Constants.MDN_SELECTION_VIEW, action) => {
  switch (action.type) {
    case Constants.CHANGE_MDN_SELECTION_VIEW:
      return action.view;
    default:
      return state;
  }
};

export const asyncCallStatus = (state = asyncCallStatusInit, action) => {
  switch (action.type) {
    case Constants.ASYNC_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case Constants.ASYNC_FETCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case Constants.ASYNC_FETCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case Constants.ASYNC_FETCH_INVALIDATE:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};

/* Maintain list of mdn selection */
export const selectedMdnDetails = (state = initialUserState, action) => {
  switch (action.type) {
    case Constants.ADD_MDN:
      return { ...state, mdnList: [...state.mdnList, action.data] };
    case Constants.REMOVE_MDN:
      return { ...state, mdnList: [...state.mdnList.slice(0, action.data), ...state.mdnList.slice(action.data + 1)] };
    default:
      return state;
  }
};

export const transferUpgrade = (state = null, action) => {
  switch (action.type) {
    case Constants.TRANSFER_MDN_SELECTED:
      return Object.assign({}, state, action.data.output);
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

export const submitAgreementResponse = (state = null, action) => {
  switch (action.type) {
    case Constants.SUBMIT_AGREEMENT:
      return Object.assign({}, state, action.data);
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

export const preOrderResponse = (state = null, action) => {
  switch (action.type) {
    case Constants.LOAN_INFO_PREORDER:
      return Object.assign({}, state, action.data.output);
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

export const userAction = (state = null, action) => {
  switch (action.type) {
    case Constants.USER_ACTION:
      return action.data;
    default:
      return state;
  }
};

export const showModal = (state = false, action) => {
  switch (action.type) {
    case Constants.SHOW_MODAL:
      return action.data;
    default:
      return state;
  }
};

export const showEUPPendingConfirmation = (state = false, action) => {
  switch (action.type) {
    case Constants.SHOW_EUP_PENDING_CONFIRM_MODAL:
      return action.data;
    default:
      return state;
  }
};
