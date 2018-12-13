//AJAX Call url:https://vzwqa2.verizonwireless.com/digital/device/deviceDetails/?deviceProdId=dev8760015&contractTerm=0&deviceSkuId=sku2720040

const deviceDetails = {
  "statusCode": "00",
  "output": {
    "productDetails": {
      "deviceId": "dev8760015",
      "displayName": "Apple&reg; Watch Series 3 Stainless Steel 42mm Case with Milanese Loop",
      "description": "Smart activity coaching. An enhanced Heart Rate app. Your favorite playlists right on your wrist. A built-in altimeter. And a more powerful processor that lets Siri speak to you. Introducing Apple Watch Series 3. Now you can be more active, motivated, and connected than ever.",
      "brandName": "Apple",
      "displayImageURL": "https://ss7.vzw.com/is/image/VerizonWireless/Watch42S3-StainlessSteelSpaceBlack-MilaneseSpaceBlack_a_MR1L2LL-A?$device-lg$",
      "promotionDetail": null,
      "shortDescription": "Smart activity coaching. An enhanced Heart Rate app. Your favorite playlists right on your wrist. A built-in altimeter. And a more powerful processor that lets Siri speak to you. Introducing Apple Wat",
      "downPaymentLink": "",
      "downPaymentToolTip": "",
      "shippingDateLabel": null,
      "priceObject": [
        {
          "price": "33.33",
          "description": "$0 Down (for qualified customers) $33.33/mo for 24 months; 0% APR Retail Price: $799.99",
          "downPayment": 0,
          "strikeOutPrice": null,
          "priceText": "$33.33 /mo. 24 Monthly Payments",
          "priceDetail": "/mo.",
          "selected": false,
          "contractTerm": 99,
          "contractDescription": "$0 Down (for qualified customers) $33.33/mo for 24 months; 0% APR Retail Price: $799.99"
        },
        {
          "price": "799.99",
          "description": "No Early Termination Fee",
          "downPayment": 0,
          "strikeOutPrice": null,
          "priceText": "$799.99 Retail Price",
          "priceDetail": null,
          "selected": true,
          "contractTerm": 0,
          "contractDescription": "No Early Termination Fee"
        }
      ],
      "annualUpgradeEligible": false,
      "devicePaymentPercentage": null,
      "upgradeOptionCode": null,
      "upgradeOptionEligiblePDPLbl": null,
      "upgradeOptionEligiblePDPTip": null,
      "shippingDateStatusCode": 1001,
      "promoCodes": null,
      "connectedDevice": true,
      "numberShareEligible": true,
      "volteEnabled": false,
      "editCart": false,
      "e911AddressRequired": true,
      "rio": true
    },
    "technicalSpecifications": {
      "sectionTitle": "Here's a look at the specs.",
      "techSpecsDetails": [
        {
          "title": "Width & Height",
          "detailedText": " & ",
          "techSpecsFlag": true
        }
      ]
    },
    "appfeatures": [
      {
        "featureTitle": "",
        "title": "Stay connected away from your phone.",
        "bodyText": "Make calls, send texts, stream music, set reminders and get notifications from your favorite appâ€“all with just your watch.",
        "image": "https://ss7.vzw.com/is/image/VerizonWireless/pdp-feature1-mf-apple-watch-s3?&scl=1?$device-lg$"
      },
      {
        "featureTitle": "",
        "title": "Take your workout further.",
        "bodyText": "Stay in touch while you work out and keep track of your fitness goals with the Workout App. See how far and high you go with GPS and altimeter, or track your laps in the pool with its swim proof design.",
        "image": "https://ss7.vzw.com/is/image/VerizonWireless/pdp-feature2-mf-apple-watch-s3?$device-lg$"
      },
      {
        "featureTitle": "",
        "title": "Three rings. One goal.",
        "bodyText": "Make closing all three Activity rings your goal each day, with a little nudge from the Smart Coach when you need it. Share your achievements with friends and family to stay motivated.",
        "image": "https://ss7.vzw.com/is/image/VerizonWireless/pdp-feature3-mf-apple-watch-s3?$device-lg$"
      },
      {
        "featureTitle": "",
        "title": "Keep your body top of mind.",
        "bodyText": "The Health App is the one app for all your health and fitness data. Keep tabs on your resting, walking and workout recovery heart rate, or relax your body with the Breathe App.",
        "image": "https://ss7.vzw.com/is/image/VerizonWireless/pdp-feature4-mf-apple-watch-s3?$device-lg$"
      },
      {
        "featureTitle": "",
        "title": "Run your day. Right from your wrist.",
        "bodyText": "All-Day Assistant helps you stay connected. Send messages, make calls and get meeting invitationsâ€“no phone required. Siri is faster and smarter and now speaks from your watch.",
        "image": "https://ss7.vzw.com/is/image/VerizonWireless/pdp-feature5-mf-apple-watch-s3?$device-lg$"
      }
    ],
    "promoFeatures": [],
    "goToSuccessUrl": "/digital/mtnDetail?deviceProdId=dev8760015&annualUpgradeEligible=false",
    "cpcDevice": false,
    "cpcContractTermList": null,
    "cpcGoToUrl": null,
    "gridwallUrl": "/digital/smartphones/?flow=EUP",
    "showSplashScreen": false,
    "showAnnualUpgradeWarning": false,
    "outOfStock": true,
    "deviceSORIDForFeature": "MR1L2LL/A",
    "deviceMaxLimitReached": false,
    "cartUrl": "/digital/cart/getCartDetails",
    "splashScreenTitle": "Upgrade right here, right now.",
    "splashScreenDescription": "Trade in a device for up to $200, customize a new one, and we'll help you transfer what's important.",
    "showCompatibilityMessage": true,
    "deviceCompatibleMessage": {
      "title": "You have to pair this device to compatible Apple iPhone already in your account or in your cart.",
      "message": "Compatible Apple smartphones are:",
      "devices": [
        "iPhone 6",
        "iPhone 6 Plus",
        "iPhone 6s",
        "iPhone 6s Plus",
        "iPhone 7",
        "iPhone 7 Plus"
      ]
    }
  },
  "errorMap": null,
  "statusMessage": "Service completed Successfully."
};

export default deviceDetails;
