const tradeinJSON = {
  output: {
    options: [
      {
        optionText: "Yes, trade in this device I'm upgrading.",
        displayName: 'KENNY BOWER',
        mtn: '909.625.3322',
        maxAppraisalPrice: '56.00',
        defaultSelection: false,
        gotoUrl: '/digital/tradein/questions?deviceStorage=16GB&deviceColor=Black&deviceImageUrl=https%3A%2F%2Fmobile.vzw.com%2FhybridClient%2Fis%2Fimage%2FVerizonWireless%2FSamsung_Galaxy_S5_Black%3F%24device-med%24&deviceActive=true&modelId=101333&deviceProdId=dev4120030&deviceId=990004801994496&tradeInMTN=9096253322&deviceDisplayName=KENNY+BOWER&deviceLastActiveDate=Last+Active%3A+N%2FA',
      },
      {
        optionText: "Yes, trade in a different device that's been active on my account.",
        displayName: '',
        mtn: '',
        maxAppraisalPrice: '56.00',
        defaultSelection: false,
        gotoUrl: '/digital/tradein/selectDevice',
      },
      {
        optionText: "No, I won't be trading in a device.",
        displayName: '',
        mtn: '',
        maxAppraisalPrice: '',
        defaultSelection: false,
        gotoUrl: '/digital/cart/getCartDetails',
      },
    ],
  },
  ErrorMap: null,
  statusMessage: 'Service completed Successfully.',
  statusCode: '00',
};


export default tradeinJSON;
