
// Taken from Switcher Project
export const allowOnlyMoney = (value) => {
  if (!value) {
    return value;
  }
  // Reject other than numbers and dot/decimal
  return value.replace(/[^\d|\.]/g, ''); // eslint-disable-line
};
export const allowOnlyMoneyWithOnly2Digits = (value) => { // eslint-disable-line
  if (!value) {
    return value;
  }
  const decimals = value.split('.');
  const regex = /^[0-9]\d*(\.\d{2})?$/;
  if (regex.test(value) || (decimals.length < 3 && decimals[1].length < 3)) {
    return value;
  }
};
export const allowOnlyNumbers = (value) => {
  if (!value) {
    return value;
  }
  // Reject other than numbers
  return value.replace(/[^\d]/g, '');
};

export const allowOnlyNumbersForZip = (value) => {
  if (!value) {
    return value;
  }
  // Reject other than numbers
  const retval = value.replace(/[^\d]/g, '');
  if (retval.length > 5) {
    return retval.substring(0, 5);
  }
  return retval;
};

export const isValidAccountNumber = (value) => {
  if (!value) {
    return value;
  }
  // Account numbers allowinf only 30 digits
  return value.replace(/[^\d]/g, '').slice(0, 30);
};

export const allowOnlyLetters = (value) => {
  if (!value) {
    return value;
  }
  //  Reject other than letters
  return value.replace(/[^A-Za-z\s]/g, '');
};

export const allowOnlyAlphaNumerics = (value) => {
  if (!value) {
    return value;
  }
  //  Reject other than AlphaNumerics
  return value.replace(/[^A-Za-z\d]/g, '');
};

export const normalizeCC = (value) => {
  if (!value) {
    return value;
  }
  return value.replace(/[^\d]/g, '').slice(0, 16);
};

export const normalizeAccountPin = (value) => {
  if (!value) {
    return value;
  }
  return value.replace(/[^\d]/g, '').slice(0, 4);
};
export const normalizeCCV = (value, length) => {
  if (!value) {
    return value;
  }
  return value.replace(/[^\d]/g, '').slice(0, length);
};
export const normalizeZipCode = (value) => {
  if (!value) {
    return value;
  }
  // Reject other than numbers and hypen
  return value.replace(/[^\d-]/g, '');
};

export const formatPhoneNumber = (number) =>
  '(' + number.slice(0, 3) + ')' + number.slice(3, 6) + '-' + number.slice(6, 10);

export const normalizeNpaNxxPhoneNumber = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\dxX]/g, '');
  if (!previousValue || value.length > previousValue.length) {
    if (onlyNums.length === 3) {
      return onlyNums + '.';
    }
    if (onlyNums.length === 6) {
      return onlyNums.slice(0, 3) + '.' + onlyNums.slice(3, 6) + '.';
    }
    if (onlyNums.length === 10) {
      return onlyNums.slice(0, 3) + '.' + onlyNums.slice(3, 6) + '.' + onlyNums.slice(6, 10);
    }
  }
  if (onlyNums.length <= 3) {
    return onlyNums;
  }
  if (onlyNums.length <= 6) {
    return onlyNums.slice(0, 3) + '.' + onlyNums.slice(3, 6);
  }
  return onlyNums.slice(0, 3) + '.' + onlyNums.slice(3, 6) + '.' + onlyNums.slice(6, 10);
};
export const normalizePhoneNumber = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  if (!previousValue || value.length > previousValue.length) {
    if (onlyNums.length === 3) {
      return onlyNums + '.';
    }
    if (onlyNums.length === 6) {
      return onlyNums.slice(0, 3) + '.' + onlyNums.slice(3, 6) + '.';
    }
    if (onlyNums.length === 10) {
      return onlyNums.slice(0, 3) + '.' + onlyNums.slice(3, 6) + '.' + onlyNums.slice(6, 10);
    }
  }
  if (onlyNums.length <= 3) {
    return onlyNums;
  }
  if (onlyNums.length <= 6) {
    return onlyNums.slice(0, 3) + '.' + onlyNums.slice(3, 6);
  }
  return onlyNums.slice(0, 3) + '.' + onlyNums.slice(3, 6) + '.' + onlyNums.slice(6, 10);
};

export const isAccountPinValid = (pin) => {
  const incrementPattern = '0123456789';
  const decrementPattern = '9876543210';
  if (incrementPattern.indexOf(pin) === -1 && decrementPattern.indexOf(pin) === -1 && !/^(\d)\1+$/.test(pin)) {
    return (/^\d{4}$/.test(pin));
  }
  return false;
};

export const isValidDate = (year, month) => {
  const currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;
  currentMonth = currentMonth < 10 ? '0' + currentMonth : currentMonth;
  if (year <= currentYear) {
    if (month < currentMonth) {
      return false;
    }
  }
  return true;
};

export const isValidName = (name) => (/^[a-zA-Z]+$/.test(name));

export const isValidNameWithSpace = (name) => (/^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(name));

export const isValidCity = (name) => (/^[a-zA-Z\s]+$/.test(name));

export const isValidZipCode = (ZipCode) => (/^\d{5}-\d{4}$|^\d{5}$/.test(ZipCode));

// export const isValidLocationCode = (LocationCode) => (/^\d{5}-\d{4}$|^\d{5}$/.test(LocationCode));

// export const isValidOrderNumber = (OrderNumber) => (/^\d{5}-\d{4}$|^\d{5}$/.test(OrderNumber));
// eslint-disable-next-line
export const isValidAddress = (AddressOne) => (/^[a-zA-Z0-9\-\. ',#&;/\s]+$/i.test(AddressOne));

export const isValidCreditCardNumber = (value) => (/^4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}$/i.test(value) || /^(62[0-9]{14,17})$/i.test(value));

export const isValidPhoneNumber = (phone) => (/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/i.test(phone));

export const isValidNANPPhoneNumber = (phone) => (/^\(?([2-9]{1})\)?([0-9]{2})\)?[.]?([2-9]{1})\)?([0-9]{2})[.]?([0-9]{4})$/.test(phone));

export const isValidSSN = (ssn) => (/^\d{9}$/.test(ssn));

export const isValidCreditCardCVC = (value, cvvLength) => (!(!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/i.test(value) || value.toString().length < cvvLength || value.toString().length > cvvLength));

// eslint-disable-next-line
export const isValidEmail = (value) => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value));

export const states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];

export const isValidCreditCardMonth = (expiryMonth, expiryYear = 0) => {
  const _month = new Date().getMonth() + 1;
  const _year = new Date().getFullYear();

  let isValid = true;
  if (Number(expiryMonth) > 0 && !/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/i.test(expiryMonth) === false && Number(expiryMonth) <= 12) {
    if (parseInt(expiryYear, 10) > 0) { // if year is entered
      if (parseInt(expiryYear, 10) === _year && parseInt(expiryMonth, 10) < _month) { // if year is same as current year, month should be greater than current one.
        isValid = false;
      }
    }
  } else {
    isValid = false;
  }
  return isValid;
};

export const isValidCreditCardExpiryYear = (expiryYear) => {
  let isValid = true;
  const _year = new Date().getFullYear();
  if (Number(expiryYear) > 0 && !/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/i.test(expiryYear) === false) {
    if (parseInt(expiryYear, 10) < _year) {
      isValid = false;
    }
  } else {
    isValid = false;
  }
  return isValid;
};

export const getCardType = (cardNumber) => {
  let cardType = null;
  const cardTypeRegEx = [
    {
      expression: /^4[0-9]{12}(?:[0-9]{3})?$/,
      type: 'visa',
    },
    {
      expression: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
      type: 'mastercard',
    },
    {
      expression: /^3[47][0-9]{13}$/,
      type: 'amex',
    },
    {
      expression: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      type: 'dinersclub',
    },
    {
      expression: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      type: 'discover',
    },
    {
      expression: /^(?:2131|1800|35\d{3})\d{11}/,
      type: 'jcb',
    },
    {
      expression: /(^(2014)|^(2149))\d{11}$/,
      type: 'enroute',
    },
    {
      expression: /^(62[0-9]{14,17})$/,
      type: 'discover', // Union pay
    },
  ];

  cardTypeRegEx.forEach((regex) => {
    const re = new RegExp(regex.expression);
    if (re.test(cardNumber.toString()) === true) {
      cardType = regex.type;
      return true;
    }
    return false;
  });

  return cardType;
};

export const isDeviceValid = (deviceId) => (/^[0-9]{11,16}|[a-fA-F0-9]{8,14}$/.test(deviceId));
