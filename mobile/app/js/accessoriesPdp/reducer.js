/*
 *
 * Acessories PDP reducer
 *
 */
import { fromJS } from 'immutable';

import * as types from './constants';

/* Store init for all reducers */
const tabsInit = fromJS([
  { tabName: 'Features', flag: true },
  { tabName: 'Reviews', flag: false },
  { tabName: 'Specs', flag: false },
]);

const accPdpPageInit = fromJS(window.accessoriesPdpJSON.output);

/**
 * Reducer to handle all async calls and show/hide loader accordingly.
 * This is common for the entire page.
 * @param state : async status i.e isFetching, error
 * @param action : data and type
 * @returns {*} an Object denoting
 */
export const asyncCallStatus = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case types.ASYNC_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case types.ASYNC_FETCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case types.ASYNC_FETCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case types.ASYNC_FETCH_INVALIDATE:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};
const getSelectedSkuDetails = (skuDetails) => {
  let selectedSkuDetails = skuDetails.find((sku) => (sku.preSelected === true)); // Will be true only when the item is added to cart
  if (selectedSkuDetails) {
    return selectedSkuDetails;
  }
  const selectedSkuId = window.location.hash.split('skuId=')[1];
  if (selectedSkuId) {
    selectedSkuDetails = skuDetails.find((sku) => (sku.skuId === selectedSkuId));
  } else {
    return skuDetails[0];
  }
  return selectedSkuDetails;
};

const selectedSkuDetails = (window.accessoriesPdpJSON.output) ? getSelectedSkuDetails(window.accessoriesPdpJSON.output.skuDetails) : {};
const initialState = (window.accessoriesPdpJSON.output) ? {
  deviceSkus: window.accessoriesPdpJSON.output.skuDetails,
  selectedColor: (selectedSkuDetails) ? selectedSkuDetails.colorName : '',
  displayName: (selectedSkuDetails) ? selectedSkuDetails.displayName : '',
  selectedCapacity: (selectedSkuDetails) ? selectedSkuDetails.size : '',
  accId: window.accessoriesPdpJSON.output.accId,
  skuId: (selectedSkuDetails) ? selectedSkuDetails.skuId : '',
  addToCartUrl: window.accessoriesPdpJSON.output.addToCartURL,
  cqJSON: typeof window.cqJSON !== typeof undefined && Object.keys(window.cqJSON).length > 0 ? window.cqJSON : {
    html: {},
    label: {},
    error: {},
  },
} : {};

export const customizeDeviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_CAPACITY:
      return Object.assign({}, state, { selectedCapacity: action.size }, { skuId: action.skuId });
    case types.CHANGE_COLOR:
      return Object.assign({}, state, { selectedColor: action.colorName }, { selectedCapacity: action.size }, { skuId: action.skuId });
    default:
      return state;
  }
};

export function tabs(state = tabsInit, action) {
  const prevState = state.toJSON();
  switch (action.type) {
    case types.CHANGE_TAB_VIEW: {
      const newState = [];
      prevState.forEach((tab) => {
        if (action.text === tab.tabName) {
          newState.push({
            tabName: tab.tabName,
            flag: true,
          });
        } else {
          newState.push({
            tabName: tab.tabName,
            flag: false,
          });
        }
      });
      return fromJS(newState);
    }
    default:
      return fromJS(prevState);
  }
}

export function output(state = accPdpPageInit, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export function deviceRatingsReviewsReducer(state = fromJS({}), action) {
  switch (action.type) {
    case types.FETCH_RATINGS_REVIEWS:
      return state.mergeDeep(action.data);
    default:
      return state;
  }
}

export function cqKeys(state = {}, action) {
  const immutableCQKeys = fromJS({ label: {}, error: {}, html: {} });
  switch (action.type) {
    default:
      return immutableCQKeys.mergeDeep(state);
  }
}
