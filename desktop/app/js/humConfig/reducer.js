
import * as constants from './constants';

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

export const humConfigData = (state, action) => {
  switch (action.type) {
    case 'HUM_CONFIG_DATA':
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export const isCarDetailsValid = (state = {}, action) => {
  switch (action.type) {
    case 'HUM_CONFIG_ISVALID':
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export const makeData = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MAKE_LIST':
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export const modelAndColorData = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MODEL_COLOR_LIST':
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export const selectedData = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_DETAILS':
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export const enteredEmailDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_EMAIL_DETAILS':
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export const onEmailError = (state = {}, action) => {
  switch (action.type) {
    case 'SUGGEST_HUM_WEBSITE_BUTTON':
      return { ...state, ...action.data };
    default:
      return state;
  }
};

