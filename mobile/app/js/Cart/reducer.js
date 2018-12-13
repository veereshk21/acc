/**
 * Created by hmahad on 1/4/2017.
 * Reducers for CART page
 */
import { combineReducers } from 'redux-immutable';
import { fromJS, List } from 'immutable';
import * as cartConstants from './constants';


/**
 * Determines the current view of cart
 * @param state  string denoting the current cart view
 * @param action :data and type
 * @returns {string} new string denoting the current cart view.
 */
export const cartView = (state = 'CART', action) => {
  switch (action.type) {
    case cartConstants.CHANGE_CARTVIEW:
      return action.data;
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
 * Sub reducer which determines if the cart is empty, hold a data node to store custom data which can be used instantly by
 * components.
 * @param state : emptyCartFlag from cartData
 * @param action : data and type
 * @returns {boolean}
 */
export const emptyCartFlag = (state = false, action) => {
  switch (action.type) {
    case cartConstants.EMPTY_CART:
      return action.data;
    default:
      return state;
  }
};

export const asyncCallStatus = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case cartConstants.ASYNC_FETCH:
      return Object.assign({}, state, { isFetching: true, error: false });

    case cartConstants.ASYNC_FETCH_SUCCESS:
      return Object.assign({}, state, { isFetching: false, error: false, data: action.data });

    case cartConstants.ASYNC_FETCH_FAILURE:
      return Object.assign({}, state, { isFetching: false, error: true });

    case cartConstants.ASYNC_FETCH_CLEAR:
      return Object.assign({}, state, { isFetching: false, error: false, data: {} });

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


export const selectedProtectionFeature = (state = null, action) => {
  switch (action.type) {
    case cartConstants.SELECT_PROTECTION_FEATURE:
      return action.sfoSkuId;
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
 * Main cart reducer which is used to reset the cart view and data, the entire window json is added as a new object cartData
 * @param state : an empty array , populated by intialState in createStore
 * @param action : data and type
 * @returns {*} by default a combinedReducer which acts on individual parts of the state tree.
 */
export const cartData = (state = {}, action) => {
  switch (action.type) {
    case cartConstants.RESET_CART: {
      const newState = fromJS(action.data);
      return newState;
    }

    case cartConstants.CLEAR_CART_MESSAGE: {
      return state.mergeDeep(action.data);
    }

    case cartConstants.SET_C2C_FLAG: {
      return state.mergeDeep(action.data);
    }

    default:
      return combineReducers({
        promoCodes,
        taxDetails,
        emptyCartFlag,
      })(fromJS(state), action);
  }
};

