import { COST_CLARIFIER_LOAD_DATA, HIDE_COST_CLARIFIER } from './Constants';

export const updateCostClarifier = (state = { show: true }, action) => {
  switch (action.type) {
    case COST_CLARIFIER_LOAD_DATA: {
      return Object.assign({}, state, action.data, { show: true });
    }
    case HIDE_COST_CLARIFIER: {
      return Object.assign(state, { show: false });
    }
    default:
      return state;
  }
};
