import * as types from './constants';

const defaultCqJson = {
  html: {
    OD_APPLE_CARE_TITLE: 'Apple AppleCare+ for iPhone 7 &amp; iPhone 6 Series',
    OD_APPLE_CARE_DESCRIPTION: 'AppleCare+ for iPhone 7 &amp; iPhone 6 Series extends service and support coverage to 2 years from the purchase date of the service and includes coverage up to 2 incidents of accidental damage from handling, each subject to a service fee plus tax.',
    OD_APPLE_CARE_YES_OPTION: '<span>Add <strong>AppleCare+ for iPhone 7  iPhone 6 Series</strong> [ Add <span class="highlight">$PRICE$</span> due today ]</span>',
  },
  label: {
    OD_APPLE_CARE_NO_OPTION: 'None',
    OD_APPLE_CARE_APPLY: 'Apply',
  },
  error: {},
};

const cqJSON = window.cqJSON && Object.keys(window.cqJSON).length ? window.cqJSON : defaultCqJson;

const initialState = {
  statusCode: '00',
  output: {
    appleCareSelected: false,
    appleCareCost: '$129.97',
    deviceID: '654546465465',
    goToUrl: '/od/cust/auth/cart/getCartDetails',
  },
  errorMap: null,
};
/**
 *
 * @param state
 * @param action
 * @returns {*}
 */
export const appleCare = (state = initialState.output, action) => {
  switch (action.type) {
    case types.CHANGE_TRADEIN_OPTION:
      return Object.assign({}, state, { goToUrl: action.goToUrl });
    default:
      return state;
  }
};

export const cq = (state = cqJSON, action) => {
  switch (action.type) {
    case types.CHANGE_TRADEIN_OPTION:
      return Object.assign({}, state, { goToUrl: action.goToUrl });
    default:
      return state;
  }
};
