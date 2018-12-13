/* Reducer internal methods */
/* eslint-disable arrow-body-style, no-param-reassign */


/**
 * Initial values for the Notification state in store
 * @type {{isNotificationVisible: boolean, message: string, type: string, cta: string, notifications: Array, currentPage: string}}
 */

const notificationInitState = {
  isNotificationVisible: false,
  message: '',
  type: '',
  cta: '',
  notifications: [],
  currentPage: '',
};


const checkPageNotification = (pageName, notifications = []) => {
  const message = notifications.filter((item) => {
    return item.page === pageName;
  });

  if (message.length) {
    return {
      currentPage: pageName,
      isNotificationVisible: true,
      message: message[0].message,
      type: message[0].type,
    };
  }

  return {
    currentPage: pageName,
    isNotificationVisible: false,
    message: '',
    type: '',
  };
};

const addOrUpdatePageNotification = (state, data) => {
  const updatedNotification = [];
  let updatedStatus = false;

  state.notifications.map((item) => { // eslint-disable-line
    if (item.page === state.currentPage) {
      item.message = data.message;
      item.type = data.type;
      updatedStatus = true;
    }
    updatedNotification.push(item);
  });

  if (!updatedStatus) {
    updatedNotification.push({
      page: state.currentPage,
      message: data.message,
      type: data.type,
    });
  }

  return updatedNotification;
};

const clearPageNotification = (state) => {
  return state.notifications.filter((item) => {
    return item.page !== state.currentPage;
  });
};


/**
 * Main reducer for notification state in store.
 * @param state
 * @param action
 * @returns {*}
 */
export const notification = (state = notificationInitState, action) => {
  switch (action.type) {
    case 'common/SHOW_NOTIFICATION':
      return Object.assign({}, state, {
        isNotificationVisible: true,
        message: action.data.message,
        type: action.data.type,
        notifications: addOrUpdatePageNotification(state, action.data),
      });

    case 'common/HIDE_NOTIFICATION':
      return Object.assign({}, state, {
        isNotificationVisible: false,
        message: '',
        notifications: clearPageNotification(state),
      });

    case 'common/SHOW_NOTIFICATION_CTA':
      return Object.assign({}, state, {
        message: action.data.message,
        type: action.data.type,
        cta: action.data.cta,
      });

    case 'common/CHECK_NOTIFICATION':
      return Object.assign({}, state, checkPageNotification(action.data.pageName, state.notifications));


    default:
      return state;
  }
};
