const pageJSON = {
  output: {
    promoType: "TRADEIN", // multi, bogo, tradeIn
    ajaxURL: '/od/cust/auth/getPromoDetails',
    promoTitle: 'Great, so what do you want to do with your second phone?', // to be controlled by promo team based on device configured
    promoSubTitle: 'Great, so what do you want to do with your second phone?', // to be controlled by promo team based on device configured
    promoMessage: {
      title: "Buy the latest iPhone & get iPhone 8 64GB on us. That's $29.16/mo. ",
      subtitle: "Here's what you need to know.",
      description: "<p>You'll be paying full price for two iPhone 8, 8 Plus or X devices over 24 months, then you'll see a credit of $29.16/mo over 24 months starting in 1-2 billing cycles. </p><br/><p>Just so you know, this offer ends when the balance is fully paid or if you cancel or transfer your line.</p>",
    }, // to be controlled by shop team based on the flow.
    promoOptions: [ // Options are given based on the flow. if AAL first, the options will be shown, if upgrade, options will not be displayed
      // AAL/EUP BOGO options (existing implementation)
      {
        title: 'Add a new line',
        promoId: "",
        message: "You've added a line to your first phone so you’re already eligible for this offer. ",
        url: 'aal',
        tooltip: null,
        description: null,
        aemUrl: null,
      },
      {
        title: 'Upgrade another line',
        promoId: "",
        message: "You'll be able to pick one of your eligible phones.",
        url: 'eup',
        tooltip: null,
        description: null,
        aemUrl: null,
      },
      // BOGO option on intercept
      /* {
        title: 'BOGO',
        promoId: "123",
        message: "You've added a line to your first phone so you’re already eligible for this offer. ",
        url: '',
        tooltip: null,
        description: null,
        aemUrl: null,
      }, */
      // trade in option on intercept
      /* {
        title: 'TRADE In',
        promoId: "456",
        message: "You'll be able to pick one of your eligible phones.",
        url: '',
        tooltip: null,
        description: null,
        aemUrl: null,
      }, */
    ],
    /* eligiblePhoneDetails: "<div>something</div><div>something</div>", // html markup, will come only for EUP tradein option
    "deviceInfo": {  // only for EUP, will come only for EUP tradein option
      "displayImageURL": "https://mobile.vzw.com/hybridClient/is/image/VerizonWireless/apple_iPhoneSE_SpGry",
      "brandName": "Apple",
      "color": "Space Gray",
      "displayName": "iPhone&reg; SE",
      "capacity": "32GB",
      "deviceID": ""
    }, */
    ctas: [ // CTAs also should be configurable, type option is required to show the cta a button or link.
      {
        label: 'Continue',
        url: '',
        type: 'button',
      },
      { // extra button will come tradein option
        label: 'another trade in',
        url: 'another',
        type: 'button',
      },
      {
        label: "No thanks, I'll just upgrade one phone today",
        url: '',
        type: null,
        style: null,
      },
    ],
  },
};

export default pageJSON;
