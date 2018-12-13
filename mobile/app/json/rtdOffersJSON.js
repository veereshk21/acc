/*
Created by Gautam on 04/09/2017
*/

exports.rtdOfferJSON ={
      "statusCode": "00",
      "errorMap": null,
      "output": {
        "offerListPageTitle":"We're going to make you an offer you can't resist",
        "offerListDescription":"Explore limited-time offers for your plan and devices.",
        "offerListPrimaryCTA": {
            "label": "Skip and Continue",
            "redirectURL": "/digital/cart/getCartDetails",

          },
        "selectOfferSecondaryCTA": {
            "label": "No Thanks",
            "redirectURL": "/digital/shoplanding/",

          },
          "selectOfferPrimaryCTA": {
            "label": "Continue",
            "redirectURL": "/digital/cart/getCartDetails",

          },
          "selectOfferLegalCopy":"Please note accepting this offer may make you ineligible for other offers",
          "selectOfferDisclaimerText":"This offer is subject to special ",
          "selectOfferDisclaimerLink":"Terms and Conditions",
          "selectOfferOptionTitle":"Select an eligible line",
          "selectOfferDisclaimerCopy":{
            "title":"Terms and conditions",
            "copyText":"Loreum ipsum",
          },
        "offers": [
        {
          "isPromoAvailable":true,
          "title": "Online only. $30 upgrade fee waived",
          "displayImage": true,
          "imgURL": "//scache.vzw.com/onedigital/shop/mobile/build/images/get-started-w80.svg",
          "linkText":"Learn how",
          "offerTitleText":"Available for",
          "offerId":"OFFEREEES",
          "availableMTNs":[
            {
              "nickName":"Daniel's Iphone",
              "mtn":"983.456.7171",
              "selected":true
            },
            {
              "nickName":"Sarah's Iphone",
              "mtn":"983.456.7172",
              "selected":false
            }
          ]
        },
        {
          "isPromoAvailable":true,
          "title": "Online only. $30 upgrade fee waived",
          "displayImage": true,
          "imgURL": "//scache.vzw.com/onedigital/shop/mobile/build/images/get-started-w80.svg",
          "linkText":"Learn how",
          "offerTitleText":"Available for",
          "offerId":"OFFEREEES222",
          "availableMTNs":[
            {
              "nickName":"Daniel's Iphone",
              "mtn":"983.456.7171"
            }
          ]
        }
        ]
      }
    }
