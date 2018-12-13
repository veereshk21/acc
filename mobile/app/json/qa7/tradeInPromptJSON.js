const tradeinJSON = {
  output: {
    options: [{
      optionText: "Yes, trade in this device I'm upgrading.",
      displayName: 'BRIAN WRIGHT',
      mtn: '304.483.2879',
      maxAppraisalPrice: '150.00',
      defaultSelection: false,
      gotoUrl: '/digital/tradein/questions?deviceStorage=64GB&deviceColor=Black&deviceImageUrl=https%3A%2F%2Fss7.vzw.com%2Fis%2Fimage%2FVerizonWireless%2FSamsung_Galaxy_S6_Black%3F%24device-med%24&deviceActive=true&modelId=104565&deviceProdId=dev6640013&deviceId=990004877285373&tradeInMTN=3044832879&deviceDisplayName=BRIAN+WRIGHT&deviceLastActiveDate=Last+Active%3A+N%2FA',
    }, {
      optionText: "Yes, trade in a different device that's been active on my account.",
      displayName: '',
      mtn: '',
      maxAppraisalPrice: '150.00',
      defaultSelection: false,
      gotoUrl: '/digital/tradein/selectDevice',
    }, {
      optionText: "No, I won't be trading in a device.",
      displayName: '',
      mtn: '',
      maxAppraisalPrice: '',
      defaultSelection: false,
      gotoUrl: '/digital/device/deviceOptions/?deviceProdId=dev6640013',
    }],
  },
  ErrorMap: null,
  statusMessage: 'Service completed Successfully.',
  statusCode: '00',
};

export default tradeinJSON;
