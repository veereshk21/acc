import { fromJS } from 'immutable';

import {
  RESET_STATE,
} from './constants';

export const cqContent = (state = {}, action) => {
  const immutableCQContent = fromJS({ label: {}, error: {}, html: {} });
  switch (action.type) {
    default:
      return immutableCQContent.mergeDeep(state);
  }
};

export const data = (state = {}, action) => {
  switch (action.type) {
    case RESET_STATE: {
      const newState = fromJS(action.data);
      return newState;
    }
    default:
      return state;
  }
};
