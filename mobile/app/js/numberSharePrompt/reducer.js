import * as types from './constants';

const selectedOption = window.numberShareJSON.output.options.filter((option) => option.defaultSelection === true)[0];

const defaultCqJson = {
  html: {},
  label: {},
  error: {},
};

const cqJSON = window.cqJSON && Object.keys(window.cqJSON).length ? window.cqJSON : defaultCqJson;

const initialState = {
  numberShareOptions: window.numberShareJSON.output.options,
  goToUrl: (selectedOption) ? selectedOption.gotoUrl : null,
  cqKeys: cqJSON,
};
/**
 *
 * @param state
 * @param action
 * @returns {*}
 */
export const numberSharePromptReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_NUMBER_SHARE_OPTION:
      return Object.assign({}, state, { goToUrl: action.goToUrl });
    default:
      return state;
  }
};
