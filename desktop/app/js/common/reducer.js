// eslint-disable-next-line
export const showFeedbackForm = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_FEEDBACK':
      return true;
    case 'HIDE_FEEDBACK':
      return false;
    default:
      return Object.assign({}, action);
  }
};
