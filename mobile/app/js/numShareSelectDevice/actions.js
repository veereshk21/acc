import request from 'axios';
import * as _ from 'lodash';
import { hashHistory } from './../store';
import * as Constants from './constants';


export const changeMDNSelectionView = (mdnSelectionView) => ({
  type: Constants.CHANGE_MDN_SELECTION_VIEW,
  view: mdnSelectionView,
});

export const changeSelectedMDN = (mdn) => ({
  type: Constants.CHANGE_MDN_SELECTED,
  payload: mdn,
});


/* loading dots */
export const loader = (flag) => ({
  type: 'loader',
  payload: flag,
});

const submitAgreementPromise = (url, mdnDetails) => {
  const requestParams = {
    action: 'G',
    trunkMTN: mdnDetails.mtn,
    hostCommerceItemId: mdnDetails.commerceItemId,
  };
  return request({
    method: 'post',
    url,
    data: requestParams,
  });
};

export const submitAgreement = (url, mdnDetails) => ((dispatch) => {
  dispatch(loader(true));

  // eslint-disable-next-line consistent-return
  submitAgreementPromise(url, mdnDetails).then((res) => {
    dispatch(loader(false));
    if (typeof res.data === 'undefined' || res.data === null || _.isEmpty(res.data)) {
      hashHistory.push('/genericError');
      return false;
    }
    window.location = res.data.redirectURL;
    // eslint-disable-next-line no-unused-vars
  }).catch((error) => {
    hashHistory.push('/genericError');
    return false;
  });
});
