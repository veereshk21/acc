var byodJSON = {
  output: {
    validateIMEIUrl: "/od/cust/auth/byod/validateIMEI",
    addSimUrl: "/od/cust/auth/byod/addNewSIM",
    skipSimUrl: "/od/cust/auth/byod/skipSIM",
    searchDevicesUrl: "/od/cust/auth/byod/searchDevices",
    validateSIMUrl: "/od/cust/auth/byod/validateSIM",
    removeDeviceUrl: "/od/cust/auth/byod/removeDevice",
    fetchSMSDevicesUrl: "/od/cust/auth/checkout/fetchSMSEnabledDevices",
    sendSMSUrl: "/od/cust/auth/checkout/sendSMS",
    validateAuthCodeUrl: "/od/cust/auth/checkout/validateAuthCode",
    byodLandingUrl: "/od/cust/auth/byod/bring-your-own-device",
    securePinEnabled: true,
    checkoutRedirectionUrl: "",
    shopDevicesUrl: "/od/cust/auth/shoplanding/",
    previousDevicesAvailable: false,
    devices: [],
    checkedDevices: null,
    "planDetails": {
      "name": "The new Verizon Plan Large 8 GB",
      "data": "8GB",
      "minutes": "Unlimited",
      "messages": "Unlimited",
      "devices": [
        "6 Smartphone",
        "2 Tablet"
      ],
      "redirectUrl": "URL NEEDED"
    },
  },
  errorMap: null,
  statusMessage: "Service completed Successfully.",
  statusCode: "00"
};

/* var byodJSON = {
  "output": {
    "validateIMEIUrl": "/od/cust/auth/byod/validateIMEI",
    "addSimUrl": "/od/cust/auth/byod/addNewSIM",
    "skipSimUrl": "/od/cust/auth/byod/skipSIM",
    "searchDevicesUrl": "/od/cust/auth/byod/searchDevices",
    "validateSIMUrl": "/od/cust/auth/byod/validateSIM",
    "removeDeviceUrl": "/od/cust/auth/byod/removeDevice",
    "checkoutRedirectionUrl": "",
    "shopDevicesUrl": "",
    "previousDevicesAvailable": "true",
    "devices": [
      {
        "displayMtn": "4104581617",
        "deviceName": null,
        "imageUrl": "",
        "nickname": null,
        "deviceId": "353819081999712"
      },
      {
        "displayMtn": "4102073335",
        "deviceName": null,
        "imageUrl": "",
        "nickname": null,
        "deviceId": "354736075474016"
      },
      {
        "displayMtn": "4109995459",
        "deviceName": null,
        "imageUrl": "",
        "nickname": null,
        "deviceId": "354736075474016"
      },
      {
        "displayMtn": "4102073336",
        "deviceName": null,
        "imageUrl": "",
        "nickname": null,
        "deviceId": "355889064516815"
      },
      {
        "displayMtn": "4103363625",
        "deviceName": null,
        "imageUrl": "",
        "nickname": null,
        "deviceId": "358810052515541"
      }
    ],
    "checkedDevices": [{
      "deviceId": "354407063740483",
      "deviceName": "iPhone 6 64GB Silver",
      "imageUrl": "apple_iPhoneSE_rsGld",
      "simId": "111111111111"
    }, {
      "deviceId": "354407063740484",
      "deviceName": "iPhone 6 64GB Silver",
      "imageUrl": "apple_iPhoneSE_rsGld",
      "simId": "111111111111"
    }],
    "planDetails": {
      "name": "Go Unlimited",
      "data": "Unlimited",
      "minutes": "Unlimited",
      "messages": "Unlimited",
      "devices": "1 3g Smartphone",
      "redirectUrl": ""
    }
  },
  "errorMap": null,
  "statusMessage": "Service completed Successfully.",
  "statusCode": "00"
} */

export default byodJSON;