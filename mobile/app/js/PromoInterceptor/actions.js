import request from 'axios';

/* *
 * Action sets a loader to be shown on page
 * */
export const asyncFetch = () => ({
  type: 'ASYNC_FETCH',
});
/* *
 * Action clears the loader on the page.
 * */
export const asyncFetchSucess = (data = {}) => ({
  type: 'ASYNC_FETCH_SUCCESS',
  data,
});

/* *
 * Action displays API error on the page.
 * */
export const asyncFetchFailed = () => ({
  type: 'ASYNC_FETCH_FAILURE',
});

function dispatchPromoDetails(data) {
  return {
    type: 'PROMO_DETAILS',
    data,
  };
}

function dispatchModalDetails(data) {
  return {
    type: 'ELIGIBILITY_DETAILS',
    data,
  };
}

export const getPromoDetails = (url, promoId) => (dispatch) => {
  dispatch(asyncFetch());
  request.get(`${url}?promoId=${promoId}`).then((response) => {
    dispatch(asyncFetchSucess());
    if (response.data.statusCode === '00') {
      dispatch(dispatchPromoDetails(response.data.output));
      window.location.href = `#/promoOffer/${promoId}`;
    }
  }).catch(() => {
    dispatch(asyncFetchFailed());
  });
};

export const getModalDetails = (url) => (dispatch) => {
  request.get(url).then((response) => {
    dispatch(dispatchModalDetails(response.data));
  });
};
