import { NOTIFICATION_ERROR_CSS_CLASS, NOTIFICATION_WARNING_CSS_CLASS, NOTIFICATION_SUCCESS_CSS_CLASS } from './../Constants';

export const calculateTimeRemaining = (givenDate) => {
  const formattedGivenDate = new Date(givenDate);
  const today = new Date();
  const msDiff = typeof window.duration !== 'undefined' ? window.duration : (formattedGivenDate - today);
  // console.log(msDiff);
  return !((msDiff < 0));
};

export const getCookie = (name) => {
  const pattern = RegExp(name + '=.[^;]*');
  const matched = document.cookie.match(pattern);
  if (matched) {
    const cookie = matched[0].split('=');
    return cookie[1];
  }
  return false;
};

export const setCookie = (cookieName, value) => {
  document.cookie = cookieName + '=' + value + ';path=/';
};

export const isTouchDevice = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export const getErrorMap = (errorMap) => {
  const fallback = 'There is a problem with one of our systems. Please try again later.';
  let msg = '';
  for (const prop in errorMap) {
    msg += '<p>' + errorMap[prop] + '</p>';
  }
  if (msg.length < 2) {
    msg = fallback;
  }
  return msg;
};

export const updateCartCount = () => {
  try {
    if (window.gnav) {
      const cartCount = window.gnav.getCookie('loggedIn') ? window.gnav.getCookie('gnCartCount') : window.gnav.getCookie('prospectCartCount');
      if (cartCount) {
        window.gnav.updateCartCountCookie(parseInt(cartCount, 10));
      } else {
        window.gnav.updateCartCountCookie(0);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const parsePrice = (priceStr) => parseFloat(priceStr, 10);

export const getNotificationCssClass = (type, section) => {
  switch (type) {
    case NOTIFICATION_ERROR_CSS_CLASS:
      return `notification notificationErrors ${section || ''}`;
    case NOTIFICATION_WARNING_CSS_CLASS:
      return `notification notificationWarnings ${section || ''}`;
    case NOTIFICATION_SUCCESS_CSS_CLASS:
      return `notification notificationSuccess ${section || ''}`;
    default:
      return `notification notificationInfo ${section || ''}`;
  }
};

export const getDeviceType = (str) => {
  let deviceType = null;
  function multiIncludes(values) {
    const re = new RegExp(values.join('|'));
    return re.test(str);
  }
  const SMARTPHONE = ['Smartphone', 'smartphone'];
  const TABLET = ['Tablet', 'tablet'];
  const CONNECTEDDEVICE = ['Connected', 'Connected'];
  const BASICPHONE = ['Basic', 'Basic'];
  if (multiIncludes(SMARTPHONE)) {
    deviceType = 'smartphone';
  } else if (multiIncludes(TABLET)) {
    deviceType = 'tablet';
  } else if (multiIncludes(CONNECTEDDEVICE)) {
    deviceType = 'connected device';
  } else if (multiIncludes(BASICPHONE)) {
    deviceType = 'basic phone';
  } else {
    deviceType = 'device';
  }
  return deviceType;
};

export const capitalize = (text) => (
  text && (text.toLowerCase()).replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
);

export const redirectToMainPage = (props) => {
  props.history.push('/');
  window.location.reload();
};

export const queryStringToObj = () => {
  const search = window.location.search && window.location.search.substring(1);
  const regex = /^(true|false)/g;
  const obj = {};
  if (search) {
    search.replace(/([^=&]+)=([^&]*)/g, (m, key, value) => {
      obj[decodeURIComponent(key)] = regex.test(value) ? value === 'true' : decodeURIComponent(value);
    });
  }
  return obj;
};
