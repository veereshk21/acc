const tradeinJSON = {
  serviceJson: {
    output: {
      selectedDevice: {
        displayName: 'BRIAN WRIGHT',
        imageUrl: 'https://ss7.vzw.com/is/image/VerizonWireless/Samsung_Galaxy_S6_Black?$device-med$',
        deviceId: '990004877285373',
        colorName: 'Black',
        storage: '64GB',
        lastActiveDate: 'Last Active: N/A',
        buttonText: null,
        buttonAction: null,
        tradeInMTN: '3044832879',
        active: true,
      },
      appraisalView: {
        title: "Let's figure out your trade-in value.",
        subtitle: 'Check everything that applies',
        buttonText: 'Next',
        ajaxUrl: '/digital/tradein/creditAjax?deviceId=990004877285373&tradeInMTN=3044832879',
        promoQuestionEnabled: true,
        promoCode: {
          usersPromoCodeInput: '',
          checked: false,
        },
        appraisalQuestions: [{
          questionId: '1',
          label: 'I can turn on the device. ',
          activationLockCheck: 'N',
        }, {
          questionId: '2',
          label: 'The screen works correctly and is not cracked.',
          activationLockCheck: 'N',
        }, {
          questionId: '5',
          label: 'The battery in the device is not damaged (it is not too hot to touch, and it is not swollen or leaking). ',
          activationLockCheck: 'N',
        }, {
          questionId: '7',
          label: 'The activation lock and anti-theft protection are turned off. ',
          activationLockCheck: 'Y',
        }],
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
      TRADEIN_QUESTIONNAIRE_TITLE: "Let's figure out your trade-in value.",
      TRADEIN_QUESTIONNAIRE_DESC: 'Check everything that applies',
      TRADEIN_FINDDEVICE_TITLE: "Here's how to find the device ID.",
      TRADEIN_FINDDEVICE_DESC: "<h3>First try this</h3><br/><p>Dial <span class='boldText'>*#06#</span> on the device</p><br/><h3>No Luck? Try this.</h3><br/><p>From the home screen, tap <span class='boldText'>Settings &gt; General &gt; About</span> and scroll down. The device number will be displayed as MEID</p>",
    },
    label: {
      OD_TRADEIN_SELECTED_DEVICE_ID_LABEL: 'ID: ',
      OD_TRADEIN_QUESTIONNAIRE_BUTTON: 'Next',
      OD_TRADEIN_FINDDEVICE_BUTTON: 'Find Device ID',
      OD_TRADEIN_PROMO_QUESTION_DESC: 'Promo code',
      OD_TRADEIN_PROMO_QUESTION_LABEL: 'I have a promo code for my trade-in.',
      OD_TRADEIN_PROMO_QUESTION_WARNING: 'The promo code you entered is not valid.',
      TRADEIN_SELECTED_DEVICE_ID_LABEL: 'ID: ',
      TRADEIN_QUESTIONNAIRE_BUTTON: 'Next',
      TRADEIN_FINDDEVICE_BUTTON: 'Find Device ID',
      TRADEIN_PROMO_QUESTION_DESC: 'Promo code',
      TRADEIN_PROMO_QUESTION_LABEL: 'I have a promo code for my trade-in.',
      TRADEIN_PROMO_QUESTION_WARNING: 'The promo code you entered is not valid.',
    },
    error: {
      EMPTY_LAST_NAME_ERROR: '',
      EMPTY_CITY_ERROR: '',
    },
  },
};


export default tradeinJSON;
