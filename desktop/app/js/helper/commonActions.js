/**
 * Action sets a loader to be shown on page
 * */
export const asyncFetch = (actionType) => {
  window.showLoader();
  return {
    type: actionType,
  };
};

/**
 * Action clears the loader on the page.
 * */
export const asyncFetchSuccess = (actionType, content) => {
  window.hideLoader();

  return {
    type: actionType,
    data: content,
  };
};


/**
 * Action clears the loader and also data in data node.
 * */
export const asyncFetchClear = (actionType) => ({
  type: actionType,
});

/**
 * Action sets a hide loader on error
 * */
export const asyncFetchFailure = (actionType) => {
  window.hideLoader();
  return {
    type: actionType,
  };
};

/**
 * Utility to fetch errors from errorMap
 */
export const getErrorMap = (errorMap) => {
  let msg = '';
  for (const prop in errorMap) {
    msg += '<p>' + errorMap[prop] + '</p>';
  }
  return msg;
};

/**
 * set dispatch content
 */
export const setDispatchContent = (actionType, data) => ({
  type: actionType,
  data,
});
