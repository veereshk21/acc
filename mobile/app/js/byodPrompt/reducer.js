import { fromJS } from 'immutable';


export const byodPromptData = (state = {}, action) => {
  switch (action.type) {
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
