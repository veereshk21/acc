import * as Constants from './constants';

export const changeMDNSelectionView = (state = Constants.MDN_SELECTION_VIEW, action) => {
  switch (action.type) {
    case Constants.CHANGE_MDN_SELECTION_VIEW:
      return action.view;
    default:
      return state;
  }
};

export const selectedMDN = (state = null, action) => {
  switch (action.type) {
    case Constants.CHANGE_MDN_SELECTED:
      return action.payload;
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

