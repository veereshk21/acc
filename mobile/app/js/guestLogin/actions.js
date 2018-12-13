import {
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_FAILURE,
} from './constants';

/* *
 * Action sets a loader to be shown on page
 * */
export function asyncFetch() {
  return {
    type: ASYNC_FETCH,
  };
}


/* *
 * Action clears the loader on the page.
 * */
export function asyncFetchSucess(data = {}) {
  return {
    type: ASYNC_FETCH_SUCCESS,
    data,
  };
}

/* *
 * Action displays API error on the page.
 * */
export function asyncFetchFalied() {
  return {
    type: ASYNC_FETCH_FAILURE,
  };
}

