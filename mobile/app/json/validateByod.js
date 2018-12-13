exports.imei = {
  "output": {
    "is4GDevice": true,
    "nextTemplate": "checkSim",
    "skipExplorePlans": false,
    "displayPrepaid": false,
    "displayPostpaid": true,
    "is3GDevice": false,
    "simRequired": true,
    "deviceId": "355839085705467",
    "deviceName": "iPhone 7 Plus Black 256GB",
    "imageUrl": "",
    "zipCode": "",
    "deviceTypeName": "Smartphone",
    "connectedCar": false,
    "dataOnlyDevice": false,
    "smartPhone": true,
    "basicPhone": false
  },
  "errorMap": null,
  "statusMessage": "Service completed Successfully.",
  "statusCode": "00"
};
exports.sim = {
  statusCode: '00',
  errorMap: null,
  output: {
    redirectUrl: '/'
  },
  statusMessage: 'Service completed Successfully.',
};
exports.addsim = {
  statusCode: '00',
  errorMap: null,
  output: {
    success: true,
    redirectUrl: "/od/cust/auth/portin/prompt"
  },
  statusMessage: 'Service completed Successfully.',
};
exports.skipSim = {
  statusCode: '01',
  output: {
    success: true,
    redirectUrl: "/od/cust/auth/portin/prompt"
  },
  errorMap: null,
  statusMessage: 'Service completed Successfully.',
};
