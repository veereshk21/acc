
export const calculateTimeRemaining = (givenDate) => {
  const formattedGivenDate = new Date(givenDate);
  const today = new Date();
  const msDiff = typeof window.duration !== 'undefined' ? window.duration : (formattedGivenDate - today);
  console.log(msDiff);
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

export const getNotificationCssClass = (type, section) => {
  switch (type) {
    case 'error':
      return `staticNotification staticNotificationErrors ${section || ''}`;
    case 'warning':
      return `staticNotification staticNotificationWarnings ${section || ''}`;
    case 'success':
      return `staticNotification staticNotificationSuccess ${section || ''}`;
    default:
      return `staticNotification staticNotificationInfo ${section || ''}`;
  }
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

export const capitalize = (text) => (
  text && (text.toLowerCase()).replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
);

export const redirectToMainPage = (props) => {
  props.history.push('/');
  window.location.reload();
};
