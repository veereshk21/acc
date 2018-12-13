exports.promoDetailsBogoJSON = {
  output: {
    promoTitle: 'Great, so what do you want to do with your second phone?',
    promoMessage: {
      title: "Buy the latest iPhone & get iPhone 8 64GB on us. That's $29.16/mo. ",
      subtitle: "Here's what you need to know.",
      description: "<p>You'll be paying full price for two iPhone 8, 8 Plus or X devices over 24 months, then you'll see a credit of $29.16/mo over 24 months starting in 1-2 billing cycles. </p><br/><p>Just so you know, this offer ends when the balance is fully paid or if you cancel or transfer your line.</p>",
    },
    promoOptions: [
      {
        title: 'Add a new line',
        message: "You've added a line to your first phone so you’re already eligible for this offer. ",
        url: '',
        tooltip: null,
        description: null,
        aemUrl: null,
      },
      {
        title: 'Upgrade another line',
        message: "You'll be able to pick one of your eligible phones.",
        url: '',
        tooltip: null,
        description: null,
        aemUrl: null,
      },
    ],
    ctas: [ // CTAs also should be configurable, type option is required to show the cta a button or link.
      {
        label: 'Continue',
        url: '',
        type: 'button',
        style: 'primary', // primary : black button, secondary: white button
      },
      {
        label: "No thanks, I'll just upgrade one phone today",
        url: '',
        type: null,
      },
    ],
  },
  errorMap: null,
  statusCode: "00",
  statusMessage: "completed"
};

exports.promoDetailsTradeInJSON = {
  output: {
    promoTitle: 'Great, so what do you want to do with your second phone?',
    promoMessage: {
      title: "Buy the latest iPhone & get iPhone 8 64GB on us. That's $29.16/mo. ",
      subtitle: "Here's what you need to know.",
      description: "<p>You'll be paying full price for two iPhone 8, 8 Plus or X devices over 24 months, then you'll see a credit of $29.16/mo over 24 months starting in 1-2 billing cycles. </p><br/><p>Just so you know, this offer ends when the balance is fully paid or if you cancel or transfer your line.</p>",
    },
    promoOptions: [
      {
        title: "",
        message: "",
        url: '',
      }
    ],
    eligiblePhoneDetails: "testing", //html markup, will come only for EUP tradein option
    "deviceInfo": {  // only for EUP, will come only for EUP tradein option
      "displayImageURL": "https://mobile.vzw.com/hybridClient/is/image/VerizonWireless/apple_iPhoneSE_SpGry",
      "brandName": "Apple",
      "color": "Space Gray",
      "displayName": "iPhone&reg; SE",
      "capacity": "32GB"
    },
    ctas: [ // CTAs also should be configurable, type option is required to show the cta a button or link.
      {
        label: 'start trade in',
        url: 'new',
        type: 'button',
        style: 'primary', // primary : black button, secondary: white button
      },
      { // extra button will come tradein option
        label: 'another trade in',
        url: 'another',
        type: 'button',
        style: 'secondary', // primary : black button, secondary: white button
      },
      {
        label: "No thanks, I'll just upgrade one phone today",
        url: '',
        type: null,
      },
    ],
  },
  errorMap: null,
  statusCode: "00",
  statusMessage: "completed"
};
