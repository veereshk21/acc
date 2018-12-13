/* eslint-disable arrow-body-style */
export const hideNotification = () => {
  return {
    type: 'common/HIDE_NOTIFICATION',
  };
};


export const showErrorNotification = (message) => {
  return {
    type: 'common/SHOW_NOTIFICATION',
    data: Object.assign({}, { message, type: 'error' }),
  };
};


export const showInfoNotification = (message) => {
  return {
    type: 'common/SHOW_NOTIFICATION',
    data: Object.assign({}, { message, type: 'info' }),
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
