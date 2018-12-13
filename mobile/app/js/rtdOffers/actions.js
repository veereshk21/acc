import axios from 'axios';
import * as constants from './constants';

export const asyncFetch = () => ({
  type: constants.ASYNC_FETCH,
});

/**
 * Action clears the loader on the page.
 * */
export const asyncFetchSuccess = (response) => ({
  type: constants.ASYNC_FETCH_SUCCESS,
  data: response,
});

export const asyncFetchFailure = () => ({
  type: constants.ASYNC_FETCH_FAILURE,
});

export const acceptMyOfferAPI = (url) => axios.get(url);

export const acceptMyOffer = (url) => (dispatch) => {
  dispatch(asyncFetch());

  acceptMyOfferAPI(url).then((resp) => {
    dispatch(asyncFetchSuccess());
    window.location.href = resp.data.output.redirectURL;
  }).catch((err) => {
    dispatch(asyncFetchFailure());
    console.log('***Error while adding Protection***'); // eslint-disable-line no-console
    console.error(err); // eslint-disable-line no-console
  });
};

const aalWithofferAPI = (redirectURL, offerId) => {
  /* Added selectedOption request param to URI as per iconic needs */
  const aalWithOfferAPIURL = redirectURL + '?offerId=' + offerId;
  return axios.get(aalWithOfferAPIURL);
};

export const aalWithOffer = (redirectURL, offerId) => (dispatch) => {
  dispatch(asyncFetch());
  aalWithofferAPI(redirectURL, offerId).then((res) => {
    dispatch(asyncFetchSuccess());
    const response = res.data;
    if (response.redirectURL) {
      window.location.href = response.redirectURL;
    }
  }).catch((error) => {
    dispatch(asyncFetchFailure());// on API failure
    console.log('***Error while adding Promo***'); // eslint-disable-line no-console
    console.error(error); // eslint-disable-line no-console
    return false;
  });
};

export const cancelOfferRedirect = (redirectURL) => {
  window.location.href = redirectURL;
};
