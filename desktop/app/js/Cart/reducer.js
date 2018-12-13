import { fromJS, List } from 'immutable';
import * as cartConstants from './constants';

/* import {
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
  ASYNC_FETCH_INVALIDATE,
  RESET_CART,
  STORE_LIST,
  MARKER_SELECTED,
  STORE_SELECTED,
  MAP_CLICKED,
  AGREEMENT_CLICKED,
  APPLE_PAY,
} from './constants'; */


/**
 * Reducer to handle all async calls and show/hide loader accordingly. This is common for the entire page.
 * @param state : async status i.e isFetching, error
 * @param action : data and type
 * @returns {*} an Object denoting
 */
export const asyncCallStatus = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case cartConstants.ASYNC_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case cartConstants.ASYNC_FETCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case cartConstants.ASYNC_FETCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case cartConstants.ASYNC_FETCH_INVALIDATE:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};

export const toggleEnterZip = (state = null, action) => {
  switch (action.type) {
    case 'ENTER_ZIP':
      return action.data;
    default:
      return state;
  }
};

export const cartData = (state = {}, action) => {
  switch (action.type) {
    case cartConstants.RESET_CART: {
      return fromJS(action.data);
    }
    case cartConstants.RESET_CART_MESSAGE: {
      return state.mergeDeep({ output: { cartMessages: { message: '' } } });
    }
    default:
      return state;
  }
};


export const accountEmailFeature = (state = {}, action) => {
  switch (action.type) {
    case cartConstants.ACCOUNT_EMAIL_SENT:
      return action.data.emailResponse;
    default:
      return state;
  }
};

/**
 * Sub reducer which holds the promocode array as initial state and acts on it.
 * @param state :promocode array from cartData
 * @param action :data and type
 * @returns {*} The updated promocode array
 */

export const promoCodes = (state = [], action) => {
  switch (action.type) {
    case cartConstants.ADD_PROMOCODE: {
      /** Done in case if promoCode array is null in  page-json, thereby null in app state tree */
      if (state === null) {
        const emptyState = List([]);
        const newState = emptyState.push(action.data);
        return newState;
      }
      const newState = state.push(action.data);
      return newState;
    }

    case cartConstants.REMOVE_PROMOCODE: {
      const keyToFind = state.findKey((item) => item === action.data);
      const newState = state.delete(keyToFind);
      return newState;
    }
    default:
      return state;
  }
};

/**
 * Sub reducer which holds taxDetails object from cartData and acts on it
 * @param state - taxDetails object
 * @param action - action data and type
 * @returns {*}  The updated taxDetails object
 */
export const taxDetails = (state = {}, action) => {
  switch (action.type) {
    case cartConstants.UPDATE_ZIPCODE: {
      const newState = state.set('cityStateString', action.data.location);
      return newState;
    }
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

/*
Preserve modal status
 */

export const modalStatus = (state = { isContinueShoppingVisible: false, showClearCartModal: false, showLandingModal: true }, action) => {
  switch (action.type) {
    case cartConstants.TOGGLE_MODAL: {
      if (action.name === 'ContinueShopping') {
        return Object.assign({}, state, { isContinueShoppingVisible: !state.isContinueShoppingVisible });
      } else if (action.name === 'ClearCart') {
        return Object.assign({}, state, { showClearCartModal: !state.showClearCartModal });
      } else if (action.name === 'LandingModal') {
        return Object.assign({}, state, { showLandingModal: !state.showLandingModal });
      }
      break;
    }
    default:
      return state;
  }
  return true;
};


/*
Recommended accessories
 */

export const recommendedAccessories = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case cartConstants.RECOMM_ACC_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case cartConstants.RECOMM_ACC_FETCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case cartConstants.RECOMM_ACC_FETCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case cartConstants.RECOMM_ACC_FETCH_INVALIDATE:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};

/*
 Recommended accessories PDP
 */

export const recommAccessProductDetails = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case cartConstants.RECOMM_ACC_PDP_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case cartConstants.RECOMM_ACC_FETCH_PDP_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case cartConstants.RECOMM_ACC_FETCH_PDP_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case cartConstants.RECOMM_ACC_FETCH_PDP_INVALIDATE:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

    default:
      return state;
  }
};
