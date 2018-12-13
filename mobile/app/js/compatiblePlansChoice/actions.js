import request from 'axios';
import { hashHistory } from './../store';
import * as constants from './constants';
import { showErrorNotification, hideNotification } from './../common/NotificationBar/actions';
import { getErrorMap } from './../common/Helpers';

/* *
 * Action sets a loader to be shown on page
 * */
export function asyncFetch() {
  return {
    type: constants.ASYNC_FETCH,
  };
}
/* *
 * Action clears the loader on the page.
 * */
export function asyncFetchSucess() {
  return {
    type: constants.ASYNC_FETCH_SUCCESS,
  };
}
/* *
 * Action displays API error on the page.
 * */
export function asyncFetchFalied() {
  return {
    type: constants.ASYNC_FETCH_FAILURE,
  };
}


export const getParameterByName = (name, url = window.location.href) => {
  const nameStr = name.replace(/[\[\]]/g, '\\$&'); // eslint-disable-line
  const regex = new RegExp('[?&]' + nameStr + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const choosePlan = (planSorId, url) => (dispatch) => {
  const url_ts = url; // + '?ts=' + Date.now();
  const editPlan = getParameterByName('editPlan');
  const planCommId = getParameterByName('planCommId');
  const data = {
    planSorId,
  };
  if (editPlan !== null) {
    data.editPlan = editPlan;
  }
  if (planCommId !== null) {
    data.planCommId = planCommId;
  }
  dispatch(asyncFetch());// action to show loader
  request({
    method: 'post',
    data: {
      planSorId,
    },
    url: url_ts,
  }).then((response) => {
    dispatch(asyncFetchSucess());// action to hide loader
    if (response.data.statusCode === constants.API_SUCCESS_CODE) {
      window.location = response.data.output.redirectUrl; // + '?ts=' + Date.now();
    } else if (response.data.statusCode === '1001') {
      window.legacyPlanErrorJSON = response.data;
      hashHistory.push('/legacyPlanError');
    } else {
      dispatch(showErrorNotification(getErrorMap(response.data.errorMap)));
    }
  }).catch((err) => {
    console.log('***Error while compatiblePlansChoice func choosePlan***'); // eslint-disable-line no-console
    console.error(err); // eslint-disable-line no-console
    dispatch(hideNotification());
    hashHistory.push('/genericError');
  });
};

export const postCall = (url, data) => request.post(url, data);

export const onClickToRedirectUrl = (url) => (dispatch) => {
  dispatch(asyncFetch());
  window.location.href = url; // + '?ts=' + Date.now();
};

export const setAdditionalPlanDetails = (planDetails) => ({
  type: 'SET_ADDL_PLAN_DETAILS',
  data: { planDetails },
});
export const setCurrentPlan = (planSorId) => ({
  type: constants.SET_CURRENT_PLAN,
  planSorId,
});

// plan compare
const requestPlanCompare = () => ({
  type: constants.REQUEST_PLANS_COMPARE,
});
const successPlanCompare = (data) => ({
  type: constants.SUCCESS_PLANS_COMPARE,
  data,
});

const failurePlanCompare = (err) => ({
  type: constants.FAILURE_PLANS_COMPARE,
  err,
});

export const invalidatePlanCompare = () => ({
  type: constants.INVALIDATE_PLANS_COMPARE,
});


const getComparePlansDataAPI = ({ planSorId, plansPage, comparePlanURL }) =>
  /* return new Promise((resolve, reject)=>{
    const compareJSON = require("./../../json/planCompareJSON");
    resolve({data:compareJSON.default})
  });
*/
  request({
    method: 'get',
    params: { planSorId, plansPage },
    url: comparePlanURL,
  });

export const getComparePlansData = (params) => (dispatch) => {
  dispatch(requestPlanCompare());
  getComparePlansDataAPI(params).then((res) => {
    if (res.data.statusCode === constants.API_SUCCESS_CODE) {
      dispatch(successPlanCompare(res.data.output));
    } else {
      dispatch(showErrorNotification(getErrorMap(res.data.errorMap)));
    }
  }).catch(() => {
    dispatch(failurePlanCompare());
  });
};
