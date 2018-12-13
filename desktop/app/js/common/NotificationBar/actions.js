/* eslint-disable arrow-body-style */

import { NOTIFICATION_ERROR_CSS_CLASS, NOTIFICATION_WARNING_CSS_CLASS, NOTIFICATION_SUCCESS_CSS_CLASS, NOTIFICATION_INFO_CSS_CLASS } from './../Constants';

export const hideNotification = () => {
  return {
    type: 'common/HIDE_NOTIFICATION',
  };
};


export const showErrorNotification = (message, section) => {
  return {
    type: 'common/SHOW_NOTIFICATION',
    data: Object.assign({}, { message, section, type: NOTIFICATION_ERROR_CSS_CLASS }),
  };
};


export const showInfoNotification = (message, section) => {
  return {
    type: 'common/SHOW_NOTIFICATION',
    data: Object.assign({}, { message, section, type: NOTIFICATION_INFO_CSS_CLASS }),
  };
};

export const showWarningNotification = (message, section, noClose) => {
  return {
    type: 'common/SHOW_NOTIFICATION',
    data: Object.assign({}, { message, section, noClose, type: NOTIFICATION_WARNING_CSS_CLASS }),
  };
};

export const showSuccessNotification = (message, section) => {
  return {
    type: 'common/SHOW_NOTIFICATION',
    data: Object.assign({}, { message, section, type: NOTIFICATION_SUCCESS_CSS_CLASS }),
  };
};

export const showInfoCTA = (message, ctatext) => {
  return {
    type: 'common/SHOW_NOTIFICATION_CTA',
    data: Object.assign({}, { message, type: 'info', cta: ctatext }),
  };
};

export const checkNotification = (pageName) => {
  return {
    type: 'common/CHECK_NOTIFICATION',
    data: Object.assign({}, { pageName }),
  };
};

export const setHeight = (height) => {
  return {
    type: 'common/SET_HEIGHT',
    data: { height },
  };
};
