import request from 'axios';
import { COST_CLARIFIER_LOAD_DATA, HIDE_COST_CLARIFIER } from './Constants';

export const dispatchCostClarifier = (data) => (dispatch) => {
  dispatch({
    type: COST_CLARIFIER_LOAD_DATA,
    data,
  });
};

export const getCostClarifierDetails = (data, url) => (dispatch) => {
  request.post(url, data).then((response) => {
    if (response.data.statusCode === '00') {
      if (response.data.output) dispatch(dispatchCostClarifier(response.data.output));
    }
  }).catch((err) => {
    console.error('Catch Execption:', err);
  });
};

export const hideCostClarifier = () => (dispatch) => {
  dispatch({
    type: HIDE_COST_CLARIFIER,
  });
};
