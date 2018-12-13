const checkPageNotification = (pageName, notifications = []) => {
  const message = notifications.filter((item) =>
    item.page === pageName
  );

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

  state.notifications.map((item) => {
    const Item = item;
    if (item.page === state.currentPage) {
      Item.message = data.message;
      Item.type = data.type;
      updatedStatus = true;
    }
    return updatedNotification.push(Item);
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

const clearPageNotification = (state) =>
  state.notifications.filter((item) =>
    item.page !== state.currentPage
  );

const notificationInitState = {
  isNotificationVisible: false,
  noClose: false,
  message: '',
  type: '',
  cta: '',
  notifications: [],
  currentPage: '',
  section: 'page-header',
  height: 0,
};

export const notification = (state = notificationInitState, action) => {
  switch (action.type) {
    case 'common/SHOW_NOTIFICATION':
      return Object.assign({}, state, {
        isNotificationVisible: true,
        message: action.data.message,
        type: action.data.type,
        notifications: addOrUpdatePageNotification(state, action.data),
        section: (action.data.section || 'page-header'),
        noClose: action.data.noClose || false,
      });

    case 'common/HIDE_NOTIFICATION':
      return Object.assign({}, state, {
        isNotificationVisible: false,
        message: '',
        notifications: clearPageNotification(state),
        height: 0,
      });

    case 'common/SHOW_NOTIFICATION_CTA':
      return Object.assign({}, state, {
        message: action.data.message,
        type: action.data.type,
        cta: action.data.cta,
      });

    case 'common/CHECK_NOTIFICATION':
      return Object.assign({}, state, checkPageNotification(action.data.pageName, state.notifications));

    case 'common/SET_HEIGHT':
      return { ...state, height: action.data.height };

    default:
      return state;
  }
};
