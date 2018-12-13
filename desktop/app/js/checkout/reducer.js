import { fromJS } from 'immutable';

import {
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_INVALIDATE,
  RESET_STATE,
  STORE_LIST,
  MARKER_SELECTED,
  STORE_SELECTED,
  MAP_CLICKED,
  AGREEMENT_CLICKED,
  APPLE_PAY,
  UPDATE_EDIT_STATE,
  ISPU_PAGE_INCREASE,
  ISPU_PAGE_DECREASE,
  ISPU_UPDATE_LAT_LNG,
  ISPU_CLEAR_STORES_PAGENUM,
  ISPU_SHOW_MORE_STORES,
  ISPU_HIDE_SHOW_MORE_BUTTON,
  ISPU_UPDATE_NEXT_URL,
  HIDE_INSTANT_CREDIT_UPDATED,
} from './constants';


/**
 * Reducer to handle all async calls and show/hide loader accordingly. This is common for the entire page.
 * @param state : async status i.e isFetching, error
 * @param action : data and type
 * @returns {*} an Object denoting
 */
export const asyncCallStatus = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case ASYNC_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case ASYNC_FETCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case ASYNC_FETCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case ASYNC_FETCH_INVALIDATE:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};


/* ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** *
 * * ** ** ** ** **ISPU reducer* ** ** ** ** ** ** *
 * ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** */

export const storeDetails = (state = { ispuPagination: 1, displayShowMore: false }, action) => {
  switch (action.type) {
    case STORE_LIST:
      return Object.assign({}, state, { storeList: action.data.storeList }, {
        selectedStoreId: null, navigateToStoreDetail: false, zipCode: action.data.zipCode, mapOnlyView: false, reRenderMaps: true,
      });
    case MARKER_SELECTED:
      return Object.assign({}, state, {
        selectedStoreId: action.storeId, navigateToStoreDetail: false, mapOnlyView: false, reRenderMaps: action.reRenderMaps,
      });
    case STORE_SELECTED:
      return Object.assign({}, state, { selectedStoreId: action.storeId, navigateToStoreDetail: true, reRenderMaps: false });
    case MAP_CLICKED:
      return Object.assign({}, state, { selectedStoreId: null, mapOnlyView: true, reRenderMaps: true });
    case ISPU_PAGE_INCREASE:
      return Object.assign({}, state, { ispuPagination: (state && state.ispuPagination ? state.ispuPagination + 1 : '') });
    case ISPU_PAGE_DECREASE:
      return Object.assign({}, state, { ispuPagination: (state && state.ispuPagination ? state.ispuPagination - 1 : '') });
    case ISPU_UPDATE_LAT_LNG:
      return Object.assign({}, state, { zipLatLng: action.data.latLng });
    case ISPU_CLEAR_STORES_PAGENUM:
      return Object.assign({}, state, { ispuPagination: 1, storeList: [], displayShowMore: false });
    case ISPU_SHOW_MORE_STORES:
      return Object.assign({}, state, (state && state.storeList ? { storeList: state.storeList.concat(action.data.storesList) } : { storeList: action.data.storesList }));
    case ISPU_HIDE_SHOW_MORE_BUTTON:
      return Object.assign({}, state, { displayShowMore: !state.displayShowMore });
    case ISPU_UPDATE_NEXT_URL:
      return Object.assign({}, state, { nextURL: action.data.nextURL });
    default:
      return state;
  }
};

export const customerAgreement = (state = {}, action) => {
  switch (action.type) {
    case AGREEMENT_CLICKED: {
      const agreement = {};
      agreement[action.agreementState.name] = action.agreementState.state;
      return Object.assign({}, state, agreement);
    }
    default:
      return state;
  }
};

export const cqContent = (state = {}, action) => {
  const immutableCQContent = fromJS({ label: {}, error: {}, html: {} });
  switch (action.type) {
    default:
      return immutableCQContent.mergeDeep(state);
  }
};


/**
 * Main checkout reducer which is used to reset the checkout view and data, the entire window json is added as a new object orderDetails
 * @param state : an empty array , populated by intialState in createStore
 * @param action : data and type
 * @returns {*} by default a combinedReducer which acts on individual parts of the state tree.
 */
export const orderDetails = (state = {}, action) => {
  switch (action.type) {
    case RESET_STATE: {
      if (window.reviewOrderUpdated) {
        window.reviewOrderUpdated();
      }
      window.reviewOrderJSON.output = action.data;
      const newState = fromJS(action.data);
      return newState;
    }
    default:
      return state;
    // return state;
  }
};

export const applePayAvailable = (state = {}, action) => {
  switch (action.type) {
    case APPLE_PAY: {
      const { canMakePayments } = action;
      return canMakePayments;
    }
    default:
      return state;
    // return state;
  }
};
export const editState = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_EDIT_STATE: {
      const newState = { ...state.toJS(), [action.data.section]: action.data.value };
      return fromJS(newState);
    }
    default:
      return state;
  }
};

export const instantCreditAllocationsChanged = (state = false, action) => {
  switch (action.type) {
    case HIDE_INSTANT_CREDIT_UPDATED: {
      return false;
    }
    case RESET_STATE: {
      const newState = action.data.checkoutStates.instantCreditAllocationsChanged;
      return newState;
    }
    default:
      return state;
  }
};
