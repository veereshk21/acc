import { find, reject } from 'lodash';
import * as constants from './constants';

const initialState = {
  loginMTN: window.securePinUrls.loginMTN,
  codeSentTo: '',
  invalidAuthCode: false,
};

function splitDeviceDetails(mdn, deviceDetailsList) {
  return {
    current: find(deviceDetailsList, { mtn: mdn }),
    others: reject(deviceDetailsList, { mtn: mdn }),
  };
}

export function securePIN(state = initialState, action) {
  switch (action.type) {
    case constants.SMS_ENABLED_DEVICES: {
      const split = splitDeviceDetails(state.loginMTN, action.result.deviceDetails);
      return {
        ...state,
        currentDevice: split.current ? split.current : split.others[0],
        otherDevices: split.others,
        referrer: action.result.referrer,
      };
    }
    case constants.CODE_SENT: {
      const { codeSentTo } = action;

      const newState = {
        ...state,
        codeSentTo,
      };

      if (newState.currentDevice.mtn === codeSentTo) {
        newState.currentDevice.numberOfSMSRequestsIn24Hours++; // eslint-disable-line
      } else {
        newState.otherDevices.forEach((device) => {
          if (device.mtn === codeSentTo) {
            device.numberOfSMSRequestsIn24Hours++; // eslint-disable-line
          }
        });
      }
      return newState;
    }
    case constants.VALID_CODE:
      // TODO: redirect
      window.location = state.referrer;
      return { ...state };
    case constants.INVALID_CODE: {
      const { numOfAttempts } = action;

      return {
        ...state,
        numOfAttempts,
        invalidAuthCode: true,
      };
    }
    case constants.RESET_INVALID_AUTH_CODE:
      return {
        ...state,
        invalidAuthCode: false,
      };
    default:
      return state;
  }
}

export const asyncCallStatus = (state = { isFetching: false, error: false, data: {} }, action) => {
  switch (action.type) {
    case constants.ASYNC_FETCH:
      return { ...state, isFetching: true, error: false };
    case constants.ASYNC_FETCH_SUCCESS:
      return {
        ...state, isFetching: false, error: false, data: action.data,
      };
    case constants.ASYNC_FETCH_FAILURE:
      return { ...state, isFetching: false, error: true };
    case constants.ASYNC_FETCH_CLEAR:
      return {
        ...state, isFetching: false, error: false, data: {},
      };
    default:
      return state;
  }
};
