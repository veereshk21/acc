/**
 * Created by sgumma on 22-02-2017.
 */
import request from 'axios';
import {
  ASYNC_FETCH,
  ASYNC_FETCH_SUCCESS,
  ASYNC_FETCH_CLEAR,
} from './constants';

/**
 * Action sets a loader to be shown on page
 * */
export const asyncFetch = () => ({
  type: ASYNC_FETCH,
});

/**
 * Action clears the loader on the page.
 * */
export const asyncFetchSucess = (response) => ({
  type: ASYNC_FETCH_SUCCESS,
  data: response,

});

/**
 * Action clears the loader and also data in data node.
 * */
export const asyncFetchClear = () => ({
  type: ASYNC_FETCH_CLEAR,
});

function postFeedbackAPI(data) {
  return request({
    method: 'post',
    url: '/digital/feedback/customer/save',
    data,
  });
}

export const postFeedback = (data) => function (dispatch) {
  dispatch(asyncFetch());// action to show loader

  postFeedbackAPI(data).then(() => {
    dispatch(asyncFetchSucess());// action to hide loader eslint
    window.location.reload();
  }).catch(() => {
  });
};
