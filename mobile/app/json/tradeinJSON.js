
// This comes preloaded on the page
exports.tradeinJSON = {
  output: {
    deviceList: [
      {
        mtn: '408.515.1182',
        imageUrl: 'https://mobile.vzw.com/hybridClient/is/image/VerizonWireless/apple-iPhone5S-SpGray?$device-med$',
        deviceId: '358753058425218',
        ajaxUrl: '/digital/tradein/questionnaire/?accountNumber=0972739471-1&loginMTN=4085151182&selectedMTN=4085151182',
        modelId: '100941',
        appraisalPrice: '89.0', // needs to show with two decimals
        lastActiveDate: null,
        displayName: 'Apple iPhone 5S',
        active: false, // If it has mtn, means is active, must show true
      },
      {
        mtn: '408.515.1182',
        imageUrl: 'https://mobile.vzw.com/hybridClient/is/image/VerizonWireless/apple-iphone5c-green?$device-med$',
        deviceId: '358823055395704',
        ajaxUrl: '/digital/tradein/questionnaire/?accountNumber=0972739471-1&loginMTN=4085151182&selectedMTN=4085151182',
        modelId: '101731',
        appraisalPrice: '53.0',
        lastActiveDate: null,
        displayName: 'Apple iPhone 5C',
        active: true,
      },
      {
        mtn: '831.331.8245',
        imageUrl: 'https://mobile.vzw.com/hybridClient/is/image/VerizonWireless/apple-iphone-6-spacegray?$device-med$',
        deviceId: '359297064387763',
        ajaxUrl: '/digital/tradein/questionnaire/?accountNumber=0972739471-1&loginMTN=4085151182&selectedMTN=4085151182',
        modelId: '101419',
        appraisalPrice: '250.0',
        lastActiveDate: null,
        displayName: 'Apple iPhone 6',
        active: false,
      },
      {
        mtn: '831.331.3327',
        imageUrl: 'https://mobile.vzw.com/hybridClient/is/image/VerizonWireless/apple_iphone4?$device-med$',
        deviceId: 'A1000033990BC1',
        ajaxUrl: '/digital/tradein/questionnaire/?accountNumber=0972739471-1&loginMTN=4085151182&selectedMTN=4085151182',
        modelId: '100968',
        appraisalPrice: '3.0',
        lastActiveDate: '07/17/2015',
        displayName: 'Apple iPhone 4',
        active: false,
      },
    ],
  },
  ErrorMap: null,
  statusMessage: 'Service completed Successfully.',
  statusCode: '00',
};

// this comes preloaded on the page with tradeinJSON
exports.cqJSON = {
  html: {
    OD_TRADEIN_SELECTDEVICE_TITLE: 'OD Sample Title - Select Device',
    OD_TRADEIN_SELECTDEVICE_DESC: 'Sample Description - Select Device',
  },
  label: {
    OD_TRADEIN_SELECTDEVICE_BUTTON: 'CTA text',
    OD_TRADEIN_SELECTDEVICE_GETUPTO: 'Get up to ', // Need to add
  },
  error: [
    'EMPTY_LAST_NAME_ERROR',
    'EMPTY_CITY_ERROR',
  ],
};


// ajax URL to the below is: http://localhost/digital/tradein/questionnaire
// a.k.a appraisalQuestions
exports.onSelectedDeviceAjaxResponse = {
  serviceJson: {
    output: {
      selectedDevice: {
        displayName: 'BEN PHILLIPS',
        imageUrl: 'https://mobile.vzw.com/hybridClient/is/image/VerizonWireless/apple-iphone-6-spacegray?$device-med$',
        deviceId: '359238069068388',
        colorName: 'Gray',
        storage: '64GB',
        lastActiveDate: 'Last Active: N/A',
        buttonText: null,
        buttonAction: null,
        tradeInMTN: '2482313818',
        active: true,
      },
      appraisalView: {
        title: "Let's figure out your trade-in value.",
        subtitle: 'Check everything that applies',
        buttonText: 'Next',
        promoQuestionEnabled: true, // Added feb15
        promoCode: { // Added feb15
          usersPromoCodeInput: '',
          checked: false,
        },
        ajaxUrl: '/digital/tradein/creditAjax?deviceId=359238069068388&tradeInMTN=2482313818',
        appraisalQuestions: [{
          questionId: '1',
          label: 'Can the device be powered on?',
          activationLockCheck: 'N',
        }, {
          questionId: '2',
          label: 'Is the screen free of cracks and functioning correctly?',
          activationLockCheck: 'N',
        }, {
          questionId: '3',
          label: 'Is the device free of battery damage indicated by swelling, leaking or is too hot to touch? If your phone is damaged in any of these ways, it isn’t eligible for trade in.',
          activationLockCheck: 'N',
        }, {
          questionId: '4',
          label: 'Other than the screen, is anything cracked, dented or missing?',
          activationLockCheck: 'N',
        }, {
          questionId: '5',
          label: 'Is the activation lock turned off ? (for example, Find My iPhone /Activation lock/Anti-Theft Protection)',
          activationLockCheck: 'Y',
        },
        ],
      },
      findDeviceIdView: {
        title: "Here's how to find the device ID.",
        html: null,
      },
    },
    ErrorMap: null,
    statusMessage: 'Service completed Successfully.',
    statusCode: '00',
  },
  cqJson: {
    html: {
      OD_TRADEIN_QUESTIONNAIRE_TITLE: "Let's figure out your trade-in value.",
      OD_TRADEIN_QUESTIONNAIRE_DESC: 'Check everything that applies',
      OD_TRADEIN_FINDDEVICE_TITLE: "Here's how to find the device ID.",
      OD_TRADEIN_FINDDEVICE_DESC: "<h3>First try this</h3><br/><p>Dial <span class='boldText'>*#06#</span> on the device</p><br/><h3>No Luck? Try this.</h3><br/><p>From the home screen, tap <span class='boldText'>Settings &gt; General &gt; About</span> and scroll down. The device number will be displayed as MEID</p>",
    },
    label: {
      OD_TRADEIN_SELECTED_DEVICE_ID_LABEL: 'ID: ',
      OD_TRADEIN_QUESTIONNAIRE_BUTTON: 'Next',
      OD_TRADEIN_FINDDEVICE_BUTTON: 'Find Device ID',
      OD_TRADEIN_PROMO_QUESTION_DESC: 'Promo code',
      OD_TRADEIN_PROMO_QUESTION_LABEL: 'I have a promo code for my trade-in.',
      OD_TRADEIN_PROMO_QUESTION_WARNING: 'The promo code you entered is not valid.',
    },
    error: ['EMPTY_LAST_NAME_ERROR', 'EMPTY_CITY_ERROR'],
  },
};

exports.backendExpectJSONInputFromQuestionnaireFormat = {  // Instead of ajax call they want post
  deviceId: 358823055395704,
  tradeInMtn: '4256812254',
  questions: [
    {
      questionId: '1',
      questionAns: 'YES',
    },
    {
      questionId: '2',
      questionAns: 'YES',
    },
    {
      questionId: '5',
      questionAns: 'YES',
    },
    {
      questionId: '7',
      questionAns: 'YES',
    },
  ],
  userInfo: {
    accountNumber: '0972739471-00001',
    loginMTN: '4085151182',
  },
};

exports.outputForCredit = {
  serviceJson: {
    output: {
      data: {
        appraisalStatus: 'true',
        appraisalAmount: '1.00',
        promoCreditAmount: '3.00',
        declineButtonLink: '/digital/smartphones/',
        acceptButtonLink: '/digital/tradein/submit?appraiseReferenceID=A23M156B',
        killSwitch: true,
        continueOptionLink: '/digital/smartphones/',
        tradeinDifferentOptionLink: '/digital/tradein/selectDevice',
        appraiseReferenceID: 'A23M156B',
        validPromoCode: false,
        tradeInPromoAdded: false,
      },
    },
    ErrorMap: null,
    statusMessage: 'Service completed Successfully.',
    statusCode: '00',
  },
  cqJson: {
    html: {
      OD_TRADEIN_APPRAISAL_TITLE: 'Great, your estimated trade-in value is $',
      OD_TRADEIN_APPRAISAL_DESC: "You'll get a prepaid box for your trade in. This is only an estimate until we get your phone. The value may change in your cart based on promotions. You'll get a credit in 2-3 bill cycles.",
      OD_TRADEIN_APPRAISAL_FMI_ON_DESC: "You'll receive your credit in 1-2 bill cycles. This is just an estimate until we get your phone and can check it out.",
      OD_TRADEIN_APPRAISAL_FMI_OFF_DESC: "You'll receive your credit in 1-2 bill cycles. This is just an estimate until we get your phone. Please keep Find My iPhone turned off to get your credit.",
      OD_TRADEIN_APPRAISAL_NO_VALUE_TITLE: "We can't give you credit for your device",
      OD_TRADEIN_APPRAISAL_NO_VALUE_OPTION_1_TEXT: 'Continue with order',
      OD_TRADEIN_APPRAISAL_NO_VALUE_OPTION_2_TEXT: 'Trade in a different device',
      OD_TRADEIN_APPRAISAL_NO_VALUE_DESC: 'You can continue with your order or trade in a different device.',
      OD_TRADEIN_APPRAISAL_IMAGE_URL: 'https://mobile.vzw.com/hybridClient/is/image/VerizonWireless/Trade_in_Credit_Graphic',
      OD_TRADEIN_IOS_WARNING_TITLE: 'You need to turn off Find My iPhone on your old device.',
      OD_TRADEIN_IOS_WARNING_DESC: "Instructions on how to turn off Find My iPhone will be in the trade-in box. If you don't turn it off, then your trade-in value will be $0.",
    },
    label: {
      OD_TRADEIN_APPRAISAL_DECLINE_BUTTON: 'No Thanks',
      OD_TRADEIN_APPRAISAL_ACCEPT_BUTTON: 'Accept Credit',
      OD_TRADEIN_APPRAISAL_NO_VALUE_BUTTON: 'Next',
      OD_TRADEIN_IOS_WARNING_BUTTON_TEXT: 'Next',
      OD_TRADEIN_IPHONE_TURNOFF_TITLE: 'You need to turn off \'Find My iPhone\' on your old device.',
      OD_TRADEIN_IPHONE_TURNOFF_DESC: 'Instructions on how to turn off Find My iPhone will be in the trade-in box. If you don\'t turn it off, then your trade in value will be $0.',
      OD_TRADEIN_IPHONE_TURNOFF_NEXT_CTA: 'Next',
    },
    error: [
      'EMPTY_LAST_NAME_ERROR',
      'EMPTY_CITY_ERROR',
    ],
  },
};

exports.questionsAjaxResponse = {
  "serviceJson": {
    "output": {
      "selectedDevice": {
        "displayName": "JAKE HERNANDEZ",
        "imageUrl": "https://ss7.vzw.com/is/image/VerizonWireless/Motorola_Droid_Maxx_16GB_Red?$device-med$",
        "deviceId": "990005335615119",
        "colorName": "Red",
        "storage": "16GB",
        "lastActiveDate": "Last Active: N/A",
        "buttonText": null,
        "buttonAction": null,
        "tradeInMTN": "8109904665",
        "active": true
      },
      "appraisalView": {
        "title": "Let's figure out your trade-in value.",
        "subtitle": "Check everything that applies",
        "buttonText": "Next",
        "ajaxUrl": "/digital/tradein/creditAjax?deviceId=990005335615119&tradeInMTN=8109904665",
        "promoQuestionEnabled": true,
        "promoCode": {
          "usersPromoCodeInput": "",
          "checked": false
        },
        "appraisalQuestions": [{
          "questionId": "1",
          "label": "I can turn on the device. ",
          "activationLockCheck": "N"
        }, {
          "questionId": "2",
          "label": "The screen works correctly and is not cracked.",
          "activationLockCheck": "N"
        }, {
          "questionId": "5",
          "label": "The battery in the device is not damaged (it is not too hot to touch, and it is not swollen or leaking). ",
          "activationLockCheck": "N"
        }]
      },
      "findDeviceIdView": {
        "title": "Here's how to find the device ID.",
        "html": null
      }
    },
    "ErrorMap": null,
    "statusMessage": "Service completed Successfully.",
    "statusCode": "00"
  },
  "cqJson": {
    "html": {
      "OD_TRADEIN_QUESTIONNAIRE_TITLE": "Let's figure out your trade-in value.",
      "OD_TRADEIN_QUESTIONNAIRE_DESC": "Check everything that applies",
      "OD_TRADEIN_FINDDEVICE_TITLE": "Here's how to find the device ID.",
      "OD_TRADEIN_FINDDEVICE_DESC": "<h3 class='color_000 fontSize_5'>First try this</h3><br/><p>Dial <span class='boldText'>*#06#</span> on the device</p><br/><h3 class='color_000 fontSize_5'>No Luck? Try this.</h3><br/><p>From the home screen, tap <span class='boldText'>Settings &gt; General &gt; About</span> and scroll down. The device number will be displayed as MEID</p>",
      "TRADEIN_QUESTIONNAIRE_TITLE": "Let's figure out your trade-in value.",
      "TRADEIN_QUESTIONNAIRE_DESC": "Check everything that applies",
      "TRADEIN_FINDDEVICE_TITLE": "Here's how to find the device ID.",
      "TRADEIN_FINDDEVICE_DESC": "<h3>First try this</h3><br/><p>Dial <span class='boldText'>*#06#</span> on the device</p><br/><h3>No Luck? Try this.</h3><br/><p>From the home screen, tap <span class='boldText'>Settings &gt; General &gt; About</span> and scroll down. The device number will be displayed as MEID</p>"
    },
    "label": {
      "OD_TRADEIN_SELECTED_DEVICE_ID_LABEL": "ID: ",
      "OD_TRADEIN_QUESTIONNAIRE_BUTTON": "Next",
      "OD_TRADEIN_FINDDEVICE_BUTTON": "Find Device ID",
      "OD_TRADEIN_PROMO_QUESTION_DESC": "Promo code",
      "OD_TRADEIN_PROMO_QUESTION_LABEL": "I have a promo code for my trade-in.",
      "OD_TRADEIN_PROMO_QUESTION_WARNING": "The promo code you entered is not valid.",
      "TRADEIN_SELECTED_DEVICE_ID_LABEL": "ID: ",
      "TRADEIN_QUESTIONNAIRE_BUTTON": "Next",
      "TRADEIN_FINDDEVICE_BUTTON": "Find Device ID",
      "TRADEIN_PROMO_QUESTION_DESC": "Promo code",
      "TRADEIN_PROMO_QUESTION_LABEL": "I have a promo code for my trade-in.",
      "TRADEIN_PROMO_QUESTION_WARNING": "The promo code you entered is not valid."
    },
    "error": {
      "EMPTY_LAST_NAME_ERROR": "",
      "EMPTY_CITY_ERROR": ""
    }
  }
};
