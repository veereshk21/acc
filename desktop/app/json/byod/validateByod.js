exports.imei = {
  output: {
    simRequired: true,
    is4GDevice: true,
    nextTemplate: 'checkSim',
    skipExplorePlans: false,
    displayPrepaid: false,
    displayPostpaid: true,
    is3GDevice: false,
    deviceId: '354407063740483',
    deviceName: 'iPhone 6 64GB Silver',
    imageUrl: 'apple_iPhoneSE_rsGld',
    zipCode: '',
    deviceTypeName: 'Smartphone',
    connectedCar: false,
    basicPhone: false,
    dataOnlyDevice: false,
    smartPhone: true,
    message: 'Congratulations! Your device works on the Verizon Wireless network.',
    checkedDevices: [{
      deviceId: '354407063740483',
      deviceName: 'iPhone 6 64GB Silver',
      imageUrl: 'apple_iPhoneSE_rsGld',
      simId: '11111111111111111',
    }, {
      deviceId: '354407063740483',
      deviceName: 'iPhone 6 64GB Silver',
      imageUrl: 'apple_iPhoneSE_rsGld',
      simId: '11111111111111111',
    }],
  },
  errorMap: null,
  statusMessage: 'Service completed Successfully.',
  statusCode: '00',
};

/* exports.imei = 
  {"output":{"is4GDevice":true,"nextTemplate":"checkSim","skipExplorePlans":false,"displayPrepaid":false,"displayPostpaid":true,"is3GDevice":false,"deviceId":"354407064090227","deviceName":"iPhone 6 64GB Silver","imageUrl":"apple-iphone-6-spacegray","zipCode":"","deviceTypeName":"Smartphone","simRequired":true,"checkedDevices":[{"deviceId":"354407064090227","deviceName":"iPhone 6 64GB Silver","imageUrl":"apple-iphone-6-spacegray","simId":null}],"connectedCar":false,"basicPhone":false,"smartPhone":true,"dataOnlyDevice":false},"errorMap":null,"statusMessage":"Service completed Successfully.","statusCode":"00"};
 */
// exports.imei = {"output":null,"errorMap":{"statusMessage":"Device ID length has to be either 11, 14, 15 or 18 digits."},"statusMessage":"Device ID length has to be either 11, 14, 15 or 18 digits.","statusCode":"01"};

exports.sim = {
  statusCode: '00',
  errorMap: null,
  output: {
    message: 'The SIM ID you enetred is not valid. Please try again and ensure that there are no spaces or special characters',
    checkedDevices: [{
      deviceId: '354407063740483',
      deviceName: 'iPhone 6 64GB Silver',
      imageUrl: 'apple_iPhoneSE_rsGld',
      simId: '11111111111111111',
    }, {
      deviceId: '354407063740483',
      deviceName: 'iPhone 6 64GB Silver',
      imageUrl: 'apple_iPhoneSE_rsGld',
      simId: '11111111111111111',
    }],
  },
  statusMessage: 'Service completed Successfully.',
};

/* exports.sim = 
{"output":null,"errorMap":{"statusMessage":"The SIM ID you entered cannot be activated at this time. Please contact Customer Service at 800-922-0204 for assistance."},"statusMessage":"The SIM ID you entered cannot be activated at this time. Please contact Customer Service at 800-922-0204 for assistance.","statusCode":"01"};
 */
exports.addsim = {
  statusCode: '00',
  errorMap: null,
  output: {
    message: 'You are all set. sim added successfully.',
    checkedDevices: [{
      deviceId: '354407063740483',
      deviceName: 'iPhone 6 64GB Silver',
      imageUrl: 'apple_iPhoneSE_rsGld',
      simId: '11111111111111111',
    }, {
      deviceId: '354407063740483',
      deviceName: 'iPhone 6 64GB Silver',
      imageUrl: 'apple_iPhoneSE_rsGld',
      simId: '11111111111111111',
    }],
  },
  statusMessage: 'Service completed Successfully.',
};

exports.removeDevice = {
  statusCode: '00',
  errorMap: null,
  output: {
    message: 'Device has been succesfully removed',
    redirectUrl: '/od/cust/auth/portin/prompt',
    checkedDevices: [{
      deviceId: '354407063740483',
      deviceName: 'iPhone 6 64GB Silver',
      imageUrl: 'apple_iPhoneSE_rsGld',
      simId: '11111111111111111',
    }],
  },
  statusMessage: 'Service completed Successfully.',
};

exports.skipSim = {
  statusCode: '00',
  output: {
    success: true,
    redirectUrl: '/od/cust/auth/portin/prompt',
    checkedDevices: [{
      deviceId: '354407063740483',
      deviceName: 'iPhone 6 64GB Silver',
      imageUrl: 'apple_iPhoneSE_rsGld',
      simId: '11111111111111111',
    }],
  },
  errorMap: null,
  statusMessage: 'Service completed Successfully.',
};
