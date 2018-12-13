export const validateCreditCardMonth = (expiryMonth, expiryYear = 0) => {
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


export const validateCardExpiryYear = (expiryYear) => {
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

export const allowOnlyNumbers = (value) => {
  if (!value) {
    return value;
  }
  // Reject other than numbers
  return value.replace(/[^\d]/g, '');
};

export const normalizeZipCode = (value) => {
  if (!value) {
    return value;
  }
  // Reject other than numbers and hypen
  return value.replace(/[^\d-]/g, '');
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

export const isValidZipCode = (ZipCode) => (/^\d{5}-\d{4}$|^\d{5}$/.test(ZipCode));
