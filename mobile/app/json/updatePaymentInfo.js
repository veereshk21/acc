/**
 * Created by sgumma on 20-02-2017.
 */
exports.updatePaymentInfo = {
  "statusCode": "00",
  "errorMap": {
    "ss": "sadfsdfasdfsadfasdf"
  },
  "output": {
    "tmpMdOpted": false, /* REMOVE */
    "stepsCompleted": {
      "billingAddress": false,
      "shippingAddress": false,
      "deliveryInfo": false,
      "paymentInfo": false
    },
    "checkoutStates": {  /* REMOVE */
      "shippingAddressRequired": false,
      "shippingAddressChangeRequired": false,
      "shippingMethodRequired": false,
      "paymentRequired": false,
      "pastDuePaymentRequired": false,
      "showPaymentSection": true,
      "showShippingAddress": true,
      "showDeliveryMethod": true,
      "newCard": false,
      "cvvNeeded": false
    },
    "shippingInfo": {
      "shippingInfoUpdated": false,
      "ispuEligibleFlag": false,
      "addressInfo": {
        "firstName": "KENNY",
        "lastName": "WRIGHT",
        "companyName": null,
        "address1": "2509 POLLY JEFFERSON WAY",
        "address2": null,
        "city": "Oak Hill",
        "state": "VA",
        "zipcode": "20171",
        "businessName": null,
        "postalCode": null,
        "email": "MOHAN.BOJEDLA@VZW.COM",
        "phoneNumber": "6037667350"
      },
      "contactInfo": {  /* REMOVE */
        "emailAddress": "MOHAN.BOJEDLA@VZW.COM",
        "phoneNumber": "6037667350",
        "firstName": "KENNY",
        "lastName": "WRIGHT",
        "smsMdn": null,
        "activeSMSCapableMtnList": [
          "7035870496",
          "2026175918",
          "7034399175",
          "2404000906"
        ]
      },
      "shippingTypesInfo": [  /* REMOVE FOR ORDER CONFIRMATION DESKTOP */
        {
          "estimatedDeliveryDate": null,
          "estimatedDeliveryDateText": null,
          "shippingDescription": "2 DAY BY 8PM",
          "shippingOptionId": "SHP002",
          "shippingCost": "0.00",
          "shortDescription": "2 DAY BY 8PM",
          "active": false,
          "addedShippingOptionId": true,
          "signatureRequired": "true",
          "description": null,
          "depletionLocationCode": null,
          "sddAvailableWindows": null
        },
        {
          "estimatedDeliveryDate": null,
          "estimatedDeliveryDateText": null,
          "shippingDescription": "2 Day by 8pm",
          "shippingOptionId": "SHP003",
          "shippingCost": "6.99",
          "shortDescription": "2 Day by 8pm",
          "active": true,
          "addedShippingOptionId": false,
          "signatureRequired": "true",
          "description": null,
          "depletionLocationCode": null,
          "sddAvailableWindows": null
        },
        {
          "estimatedDeliveryDate": null,
          "estimatedDeliveryDateText": null,
          "shippingDescription": "Next Day by 8pm",
          "shippingOptionId": "SHP004",
          "shippingCost": "12.99",
          "shortDescription": "Next Day by 8pm",
          "active": true,
          "addedShippingOptionId": false,
          "signatureRequired": "true",
          "description": null,
          "depletionLocationCode": null,
          "sddAvailableWindows": null
        },
        {
          "estimatedDeliveryDate": null,
          "estimatedDeliveryDateText": null,
          "shippingDescription": "Next Day by 10:30am",
          "shippingOptionId": "SHP005",
          "shippingCost": "14.99",
          "shortDescription": "Next Day by 10:30am",
          "active": true,
          "addedShippingOptionId": false,
          "signatureRequired": "true",
          "description": null,
          "depletionLocationCode": null,
          "sddAvailableWindows": null
        }
      ],
      "storeDetail": {
        "storeHeader": null,
        "storeName": null,
        "storeAddress": null,
        "deviceAvailable": false,
        "distance": null,
        "appendedStoreTiming": null,
        "longitude": null,
        "storeId": null,
        "netaceLocationCode": null,
        "latitude": null,
        "seoUrlName": null,
        "storeClosingTime": null
      },
      "tradeIn": false,  /* REMOVE */
      "tradeInAddress": null,  /* REMOVE */
      "nonSddEligibleMsg": null,
      "selectedSDDWindow": null,
      "poboMessage": null,  /* REMOVE */
      "ispudetailsInfo": {
        "storeAddress": null,
        "storeHours": null,
        "storeId": null,
        "storeName": null,
        "phoneNumber": null,
        "distance": null,
        "totalItems": 0,
        "availItems": 0,
        "latitdude": 0.0,
        "longtitude": 0.0,
        "availItemName": null
      }
    },
    "billingInfo": {
      "billToAccountEligible": true,
      "creditCardZipEditable": true,
      "billingAddress": {
        "firstName": "KENNY",
        "lastName": "WRIGHT",
        "businessName": null,
        "zipcode": "20171",
        "state": "VA",
        "address2": null,
        "address1": "2509 POLLY JEFFERSON WAY",
        "companyName": null,
        "city": "Oak Hill"
      },
      "masterpass3DSecure": null,
      "billToAccountNumber": "XXXX-XXXX-XXXX-0001",  /* REMOVE */
      "creditCardInfo": {
        "savedCardNickName": null,
        "preselectCard": null,
        "creditCardNumber": "XXXX-XXXX-XXXX-1111",
        "creditCardExpMonth": "03",
        "creditCardExpYear": "2025",
        "billingZipCode": null,
        "creditCardType": "visa",
        "creditCardVerificationNumber": null,
        "creditCardBIN": null,
        "cvvRequired": false
      },
      "selectedPaymentMode": "newCard",
      "giftCardList": [

      ],
      "savedCardInfo": [  /* REMOVE */
        {
          "savedCardNickName": "BOGUS",
          "preselectCard": null,
          "creditCardNumber": "XXXX-XXXX-XXXX-1204",
          "creditCardExpMonth": "12",
          "creditCardExpYear": "29",
          "billingZipCode": "20171",
          "creditCardType": "visa",
          "creditCardVerificationNumber": null,
          "creditCardBIN": "405466",
          "cvvRequired": true
        }
      ],
      "applePayResponseInfo": null,
      "masterpassResponseInfo": {
        "emailAddress": null,
        "cardType": null,
        "lastDigits": null,
        "creditCardBIN": null
      },
      "masterpassError": false,
      "masterpassErrorMessage": null,
      "paypalEmailAddress": null,
      "expirationMonths": [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ],
      "expirationYears": [
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
        "2027"
      ]
    },
    "tradeInPromoDetails": null,  /* REMOVE */
    "transformedTradeInPromoDetails": null,  /* REMOVE */
    "deviceConfigInfo": {  /* REMOVE */
      "devices": [

      ],
      "npaNxxdetails": {
        "zipCode": null,
        "state": null,
        "city": null,
        "success": false,
        "mtns": null,
        "states": null,
        "cities": null
      },
      "deviceAddressUpdated": false,
      "accessories": null
    },
    "termsAndConditionsInfo": null,  /* REMOVE */
    "orderId": "SDC0ccc5cfbe9cd5c58171c728d0b15cafd{d6}",
    "dueToday": "243.77",
    "dueMonthly": "0.00",
    "totalDueMonthlyPlanAndDevice": "0.00",  /* REMOVE */
    "displayUpgradeFee": false,  /* REMOVE */
    "subtotalDueToday": "229.97",
    "totalOrderTax": "13.80",
    "depositAmount": "0.00",  /* REMOVE */
    "employeeDiscount": "243.77",
    "saveAmount": "0.00",
    "totalUpgradeFee": "0.00",  /* REMOVE */
    "recycleDeviceAppraise": "0.0",  /* REMOVE */
    "edgeOrderTotalDownPayment": "0.00",  /* REMOVE */
    "flow": "NAO",
    "states": [
      "AK",
      "AL",
      "AR",
      "AZ",
      "CA",
      "CO",
      "CT",
      "DC",
      "DE",
      "FL",
      "GA",
      "HI",
      "IA",
      "ID",
      "IL",
      "IN",
      "KS",
      "KY",
      "LA",
      "MA",
      "MD",
      "ME",
      "MI",
      "MN",
      "MO",
      "MS",
      "MT",
      "NC",
      "ND",
      "NE",
      "NH",
      "NJ",
      "NM",
      "NV",
      "NY",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VA",
      "VT",
      "WA",
      "WI",
      "WV",
      "WY"
    ],
    "authInfo": {
      "clients": {
        "CARDINAL3DSECURE": {
          "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJTREMwY2NjNWNmYmU5Y2Q1YzU4MTcxYzcyOGQwYjE1Y2FmZHtkNn0iLCJpYXQiOjE1MjQwODczMDksImlzcyI6IjU5ZjlkMjdiMmVlNThmMWRlMDg3NzU4NCIsIk9yZ1VuaXRJZCI6IjU1ZWY0OGUzZjcyM2FhNDMxYzlkZjE0ZSIsIlBheWxvYWQiOnsiT3JkZXJEZXRhaWxzIjp7IkN1cnJlbmN5Q29kZSI6IlVTRCIsIkFtb3VudCI6IjI0Mzc3IiwiT3JkZXJOdW1iZXIiOiJTREMwY2NjNWNmYmU5Y2Q1YzU4MTcxYzcyOGQwYjE1Y2FmZHtkNn0iLCJUcmFuc2FjdGlvbklkIjoiNDE3ZTIwZjItYWIxMy00MTU4LTk5ZjYtYTczZWU1YzM1OTExIn19LCJPYmplY3RpZnlQYXlsb2FkIjp0cnVlLCJSZWZlcmVuY2VJZCI6IlBPUzFlNDRjZWRiLWJiNzktNGUxZi05ODMzLWNkODIzYjUyMmYwYXtkNn0iLCJleHAiOjE1MjQwOTQ1MDl9.XX2ng7JC3iliLVa1SjT2SWlbVCPT7CXBZMCfph2nvTM",
          "tokenType": "JWT",
          "featuresList": {
            "binDetection": true
          }
        }
      }
    },
    "giftCard1Info": null,  /* REMOVE */
    "giftCard2Info": null, /* REMOVE */
    "opalImpersonator": null,
    "stackableDataDescription": null,  /* REMOVE */
    "stackbleDataAggregateTotals": null,  /* REMOVE */
    "edgeUpBuyOutAmount": "0.0",  /* REMOVE */
    "edgeupBuyOutMtnList": null,  /* REMOVE */
    "tapFeatureDetails": null,  /* REMOVE */
    "promotionList": null,
    "cpcOrder": false,  /* REMOVE */
    "instantCreditAmount": "0.0",  /* REMOVE */
    "loginMTN": null,  /* REMOVE */
    "standaloneAccessories": true,
    "amountAfterInstantCredit": "0.0",  /* REMOVE */
    "datagapDisclosureAgreement": null,  /* REMOVE */
    "pastDueAmount": "0.00",  /* REMOVE */
    "pastDueExist": false,  /* REMOVE */
    "pastDueAmountPaid": false,  /* REMOVE */
    "plans": null,  /* REMOVE */
    "devices": {  /* REMOVE */
      "dueMonthly": 0.0,
      "totalActivationFee": 0.0,
      "deviceTotalDueMonthly": 0.0,
      "dueToday": 0.0,
      "accessories": [

      ],
      "accessoriesBundle": [

      ],
      "items": null,
      "buddyUpgrade": false
    },
    "masterpassConfigInfo": null,
    "masterpassEnabled": false,
    "paymentMethodRedesign": true,
    "accessories": [
      {
        "scene7ImageUrl": "https://ss7.vzw.com/is/image/VerizonWireless/casemate-brilliance-iridescent-case-protector-bndl-cm035554-iset?$acc-med$",
        "name": "Iridescent Case and Glass Screen Protector Bundle for iPhone 7/6s/6",
        "actualPrice": 79.99,
        "originalPrice": 79.99,
        "percentageOffTxt": null,
        "itemTotal": 79.99,
        "quantity": 1,
        "commerceItemId": "SDC0ccc5cfbe9cd5c58171c728d0b15cafd{d6}_accessory_1",
        "color": null,
        "size": null,
        "inventoryStatus": "",
        "inventoryAvailableDate": "",
        "prodId": "acc7280064",
        "skuId": "sku2290268",
        "sorId": "CM035554",
        "promoMessage": null,
        "hasEcpdDiscount": false,
        "mobileAppImageName": "",
        "imageUrl": "https://ss7.vzw.com/is/image/VerizonWireless/casemate-brilliance-iridescent-case-protector-bndl-cm035554-iset?$acc-med$",
        "hasBogoDiscount": false,
        "price": 79.99,
        "discountPrice": 0.0,
        "retailPrice": 79.99,
        "associatedDeviceSkus": null,
        "prodName": "",
        "discounted": false
      },
      {
        "scene7ImageUrl": "https://ss7.vzw.com/is/image/VerizonWireless/ue-wonderboom-bluetooth-speaker-phantom-black-uewndrboomblk-iset?$acc-med$",
        "name": "WONDERBOOM",
        "actualPrice": 99.99,
        "originalPrice": 99.99,
        "percentageOffTxt": null,
        "itemTotal": 99.99,
        "quantity": 1,
        "commerceItemId": "SDC0ccc5cfbe9cd5c58171c728d0b15cafd{d6}_accessory_2",
        "color": "Phantom Black",
        "size": null,
        "inventoryStatus": "",
        "inventoryAvailableDate": "",
        "prodId": "acc7400036",
        "skuId": "sku2320116",
        "sorId": "UEWNDRBOOMBLK",
        "promoMessage": null,
        "hasEcpdDiscount": false,
        "mobileAppImageName": "",
        "imageUrl": "https://ss7.vzw.com/is/image/VerizonWireless/ue-wonderboom-bluetooth-speaker-phantom-black-uewndrboomblk-iset?$acc-med$",
        "hasBogoDiscount": false,
        "price": 99.99,
        "discountPrice": 0.0,
        "retailPrice": 99.99,
        "associatedDeviceSkus": null,
        "prodName": "",
        "discounted": false
      },
      {
        "scene7ImageUrl": "https://ss7.vzw.com/is/image/VerizonWireless/google-joplin-chalk-ga00210-us-iset?$acc-med$",
        "name": "Google Home Mini",
        "actualPrice": 49.99,
        "originalPrice": 49.99,
        "percentageOffTxt": null,
        "itemTotal": 49.99,
        "quantity": 1,
        "commerceItemId": "SDC0ccc5cfbe9cd5c58171c728d0b15cafd{d6}_accessory_3",
        "color": "Chalk",
        "size": null,
        "inventoryStatus": "",
        "inventoryAvailableDate": "",
        "prodId": "acc8680049",
        "skuId": "sku2670214",
        "sorId": "GA00210-US",
        "promoMessage": null,
        "hasEcpdDiscount": false,
        "mobileAppImageName": "",
        "imageUrl": "https://ss7.vzw.com/is/image/VerizonWireless/google-joplin-chalk-ga00210-us-iset?$acc-med$",
        "hasBogoDiscount": false,
        "price": 49.99,
        "discountPrice": 0.0,
        "retailPrice": 49.99,
        "associatedDeviceSkus": null,
        "prodName": "",
        "discounted": false
      }
    ],
    "accessoriesBundle": null,
    "taxes": [
      {
        "name": "Taxes & Fees",
        "price": "13.80",
        "discountPrice": "0.00",
        "retailPrice": "0.00",
        "originalPrice": "0.00",
        "city": "Oak Hill",
        "state": "VA",
        "taxCalculated": true,
        "taxNotCalculatedMsg": null
      }
    ],
    "dueMonthlyView": {  /* REMOVE */
      "title": null,
      "dueMonthlyPrice": null,
      "items": null,
      "tmpMd": null
    },
    "dueTodayView": {
      "title": "Due Today",
      "dueTodayPrice": "243.77",
      "items": [

      ],
      "accessories": [
        {
          "name": "Iridescent Case and Glass Screen Protector Bundle for iPhone 7/6s/6",
          "size": null,
          "color": null,
          "quantity": "1",
          "price": "79.99",
          "wasPrice": "79.99",
          "deviceProductDisplayName": "",
          "label": "Price",
          "discounted": false,
          "discountPercentage": 0.0,
          "discountPrice": 0.0
        },
        {
          "name": "WONDERBOOM",
          "size": null,
          "color": "Phantom Black",
          "quantity": "1",
          "price": "99.99",
          "wasPrice": "99.99",
          "deviceProductDisplayName": "",
          "label": "Price",
          "discounted": false,
          "discountPercentage": 0.0,
          "discountPrice": 0.0
        },
        {
          "name": "Google Home Mini",
          "size": null,
          "color": "Chalk",
          "quantity": "1",
          "price": "49.99",
          "wasPrice": "49.99",
          "deviceProductDisplayName": "",
          "label": "Price",
          "discounted": false,
          "discountPercentage": 0.0,
          "discountPrice": 0.0
        }
      ],
      "accessoriesBundle": [

      ],
      "additionalCharges": {
        "title": "Additional Charges",
        "items": [
          {
            "name": "Taxes & Fees",
            "price": "13.80",
            "description": "Oak Hill, VA"
          },
          {
            "name": "FREE 2 Day by 8pm",
            "price": "0.00",
            "description": null
          }
        ]
      },
      "price": null
    },
    "cartDetailURL": "/od/cust/auth/cart/getCartDetails",
    "smsAuthenticationComplete": false,  /* REMOVE */
    "securePinPageUrl": "/od/cust/auth/checkout/securePin",  /* REMOVE */
    "fetchSMSDevicesUrl": "/od/cust/auth/checkout/fetchSMSEnabledDevices",  /* REMOVE */
    "sendSMSUrl": null,  /* REMOVE */
    "validateAuthCodeUrl": null,  /* REMOVE */
    "totalActivationFee": "0.00",  /* REMOVE */
    "itemOnJaxPlan": false,  /* REMOVE */
    "comboOrder": false,  /* REMOVE */
    "anyLineFreeVO": null,  /* REMOVE */
    "giftCardsEnabled": true,
    "giftCardsLimit": 2,
    "giftCardsUsed": 0,
    "submitGiftCardURL": "/od/cust/auth/checkout/updateGiftCard",
    "checkGiftCardBalanceURL": "/od/cust/auth/checkout/checkGiftCardBalance",
    "removeGiftCardURL": "/od/cust/auth/checkout/removeGiftCard",
    "balanceCreditCardAmount": "243.77",
    "totalGiftCardAmount": "0.00",
    "reasonErrorCode": null,  /* REMOVE */
    "reasonErrorMsg": null,  /* REMOVE */
    "validAuthCode": false,  /* REMOVE */
    "numOfAttempts": 0,  /* REMOVE */
    "promoBanners": {
      "PROMO_BANNER_1": "Want it by tomorrow? Order by 11pm ET with Next Day Shipping",
      "PROMO_BANNER_2": "Free shipping or in-store pickup.",
      "PROMO_BANNER_3": "Online only. 14 days return policy."
    },
    "cancelCartURL": "/od/cust/auth/cart/clearCart",
    "payPalEnabled": true,
    "securePinEligible": true,
    "ispuBTAPaymentUpdated": false,
    "iconicFlow": true,
    "updatePaymentInfoURL": "/od/cust/auth/checkout/updatePaymentInfo",
    "updateShippingInfoURL": "/od/cust/auth/checkout/updateShippingInfo",
    "handleCardinalResponseURL": "/od/cust/auth/checkout/handleCardinal3DResponse",
    "pastDueCheckoutURL": "/od/cust/auth/checkout/pastDueCheckout",  /* REMOVE */
    "updateDeviceServiceAddressURL": "/od/cust/auth/checkout/updateDeviceServiceAddress",  /* REMOVE */
    "submitOrderURL": "/od/cust/auth/checkout/submitOrder",
    "storeDetailsURL": "/od/cust/auth/checkout/storeDetails",
    "mainViewSubTitle": null,
    "pieEnabled": true,
    "googleMapAPI": {
      "client": "gme-verizonwireless2",
      "channel": "vzw-mobile",
      "draggable": true
    },
    "selectedShippingType": {
      "type": "SHIPPING",
      "shippingTypeName": "FREE 2 Day by 8pm",
      "price": 0.0,
      "discountPrice": 0.0,
      "estimatedDeliveryDate": null
    },
    "applePaymentRequest": {
      "totalAmount": "243.77",
      "orderTotalLabel": "VERIZON (TOTAL PENDING)",
      "showAvailableShippingOptions": false,
      "requestBillingInfoFromApple": [
        "postalAddress"
      ],
      "requestShippingInfoFromApple": [
        "email"
      ],
      "lineItems": [
        {
          "label": "PAYMENT NOT PROCESSED UNTIL WE VERIFY YOUR ORDER",
          "amount": "0.0",
          "type": "pending"
        }
      ]
    },
    "applePayEnabled": true,
    "appleMerchantIdentifier": "merchant.com.vzw.test"
  }
};

exports.update3DSecure = { "output": { "tmpMdOpted": false, "checkoutStates": { "shippingAddressRequired": false, "shippingAddressChangeRequired": false, "shippingMethodRequired": false, "paymentRequired": false, "pastDuePaymentRequired": false, "showPaymentSection": true, "showShippingAddress": true, "showDeliveryMethod": true, "newCard": false, "cvvNeeded": false }, "shippingInfo": { "shippingInfoUpdated": false, "ispuEligibleFlag": true, "addressInfo": { "firstName": "BEN", "lastName": "MANUEL", "companyName": null, "address1": "3105 WAXHAW INDIAN TRAIL RD S", "address2": null, "city": "Waxhaw", "state": "NC", "zipcode": "28173", "businessName": null, "postalCode": null, "email": "VZW@VZW.COM", "phoneNumber": "4019740024" }, "contactInfo": { "emailAddress": "VZW@VZW.COM", "phoneNumber": "4019740024", "firstName": "BEN", "lastName": "MANUEL", "smsMdn": null, "activeSMSCapableMtnList": ["7046546240", "7042198578", "7049071820", "7046350012", "7044431604", "7047716207"] }, "shippingTypesInfo": [{ "estimatedDeliveryDate": "2018-02-23 00:00:00", "shippingDescription": "Free 2 Day by 8pm", "shippingOptionId": "SHP002", "shippingCost": "0.00", "shortDescription": "Free 2 Day by 8pm", "active": true, "addedShippingOptionId": true, "signatureRequired": "true", "description": "Estimated to arrive on Fri, Feb 23 if ordered by 4pm today. Signature required." }], "storeDetail": { "storeHeader": null, "storeName": null, "storeAddress": null, "deviceAvailable": false, "distance": null, "appendedStoreTiming": null, "longitude": null, "storeId": null, "netaceLocationCode": null, "latitude": null, "seoUrlName": null, "storeClosingTime": null }, "tradeIn": false, "tradeInAddress": { "firstName": "BEN", "lastName": "MANUEL", "address1": "3105 WAXHAW INDIAN TRAIL RD S", "address2": null, "city": "Waxhaw", "state": "NC", "zipcode": "28173", "companyName": null }, "ispudetailsInfo": { "storeAddress": null, "storeHours": null, "storeId": null, "storeName": null, "phoneNumber": null, "distance": null, "totalItems": 0, "availItems": 0, "latitdude": 0.0, "longtitude": 0.0, "availItemName": null } }, "billingInfo": { "billToAccountEligible": false, "creditCardZipEditable": false, "billingAddress": { "firstName": "BEN", "lastName": "MANUEL", "businessName": null, "zipcode": "28173", "state": "NC", "address2": null, "address1": "3105 WAXHAW INDIAN TRAIL RD S", "companyName": null, "city": "Waxhaw" }, "masterpass3DSecure": null, "billToAccountNumber": null, "creditCardInfo": { "savedCardNickName": null, "preselectCard": null, "creditCardNumber": "XXXX-XXXX-XXXX-0002", "creditCardExpMonth": "01", "creditCardExpYear": "2020", "billingZipCode": null, "creditCardType": "visa", "creditCardVerificationNumber": null }, "selectedPaymentMode": "newCard", "giftCardList": [], "savedCardInfo": [], "applePayResponseInfo": null, "masterpassResponseInfo": { "emailAddress": null, "cardType": null, "lastDigits": null }, "masterpassError": false, "masterpassErrorMessage": null, "paypalEmailAddress": null, "expirationMonths": ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"], "expirationYears": ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027"] }, "tradeInPromoDetails": null, "transformedTradeInPromoDetails": null, "deviceConfigInfo": { "devices": [{ "deviceId": "SDC2e9d1158c60e80e03d1ad9dc9207cd45{d6}_device_1", "deviceName": "iPhone&reg; X", "deviceSetupMode": null, "mtnNumber": null, "flow": "AAL", "serviceAddress": { "firstName": "BEN", "lastName": "MANUEL", "address1": "3105 WAXHAW INDIAN TRAIL RD S", "address2": "", "city": "Waxhaw", "state": "NC", "zipCode": "28173", "emailAddress": "VZW@VZW.COM", "phoneNumber": "4019740024" }, "deviceImageUrl": "https://ss7.vzw.com/is/image/VerizonWireless/iPhoneX-Svr?$device-med$&fmt=jpeg&wid=75&hei=150", "mobileAppImageName": null, "npaNxxnumber": "704-219-XXXX" }], "npaNxxdetails": { "zipCode": null, "state": null, "city": null, "success": false, "mtns": null, "states": null, "cities": null }, "deviceAddressUpdated": false, "accessories": null }, "termsAndConditionsInfo": { "edgeTerms": [], "partialMonthChargesText": null, "promotionTextCPC": null, "agreementText": "<h4>Customer Agreement</h4>\r\r<p><em>(Para una copia de este documento en espanol, visite nuestro website: vzw.com/espanol.)</em></p>\r\r<p><strong>Thanks for choosing Verizon. In this Customer Agreement (\"Agreement\"), you'll find important information about your wireless Service, including:</strong><br />\r\r<li><strong>our ability to make changes to your Service or this Agreement's terms,</strong></li> <li><strong>our liability if things don't work as planned and how any disputes between us must be resolved in arbitration or small claims court.</strong></li></p>\r\r<h4>My Service</h4>\r\r<p><strong>Your Service terms and conditions are part of this Agreement.</strong> Your Plan includes your monthly allowances and features, where you can use them (your \"Coverage Area\"), and their monthly and pay&ndash;per&ndash;use charges. You can also subscribe to several Optional Services, like international service plans or equipment protection services. Together, your Plan, features you use, and any Optional Services you select are your Service. Your billing and shipping addresses, and your primary place of use, must be within the areas served by the network Verizon owns and operates. The current version of this Agreement and the terms and conditions for your Service are available online at verizonwireless.com</p>\r\r<p>By using the Service you are agreeing to every provision of this Agreement whether or not you have read it. This agreement also applies to anyone who uses your Service.</p> \r\r<h4>Cancellation</h4>\r<p><strong>You can cancel a line of Service within 14 days of accepting this Agreement without having to pay an early termination fee as long as you return, within the applicable return period, any equipment you purchased from us or one of our authorized agents at a discount in connection with your acceptance of this Agreement, but you'll still have to pay for your Service through that date. If you signed up for Prepaid Service, no refunds will be granted after 14 days or if your account has been activated. See vzw.com/returnpolicy for complete details and information on returning your equipment.</strong></p>\r\r<h4>My Privacy</h4>\r\r<p>We collect personal information about you. By entering into this Agreement, you consent to our data collection, use and sharing practices described in our Privacy Policy. It is your responsibility to notify people who connect devices through your mobile hotspot, Jetpack or wireless router that we will collect, use and share information about their device and use of the Service in accordance with our Privacy Policy. We provide you with choices to limit, in certain circumstances, our use of the data we have about you. You can review these choices at Verizon.com/Privacy#Limits. If there are additional specific advertising and marketing practices for which your consent is necessary, we will seek your consent (such as through the privacy&ndash;related notices you receive when you purchase or use our products and services) before engaging in those practices. You can find out how we use, share and protect the information we collect about you in the Verizon Privacy Policy, available at verizon.com/privacy.</p>\r\r<p>If you subscribe to Service for which usage charges are billed at the end of the billing period (\"Postpay Service\"), we may investigate your credit history at any time. If you'd like the name and address of any credit agency that gives us a credit report about you, just ask.</p>\r\r<p>Many services and applications offered through your device may be provided by third parties. Before you use, link to or download a service or application provided by a third party, you should review the terms of such service or application and applicable privacy policy. Personal information you submit may be read, collected or used by the service or application provider and/or other users of those forums.</p>\r\r<p>You consent to allow Verizon and anyone who collects on our behalf to contact you about your account status, including past due or current charges, using prerecorded calls, email and calls or messages delivered by an automatic telephone dialing system to any wireless phone number, other contact number or email address you provide. Verizon will treat any email address you provide as your private email that is not accessible by unauthorized third parties. Unless you notify us that your wireless service is based in a different time zone, calls will be made to your cellular device during permitted calling hours based upon the time zone affiliated with the mobile telephone number you provide.</p>\r\r<h4>What happens if my Postpay Service is canceled before the end of my contract term?</h4>\r\r<p>If you're signing up for Postpay Service, you're agreeing to subscribe to a line of Service either on a month&ndash;to&ndash;month basis or for a minimum contract term, as shown on your receipt or order confirmation. (If your Service is suspended without billing or at a reduced billing rate, that time doesn't count toward completing your contract term.) Once you've completed your contract term, you'll automatically become a customer on a month&ndash;to&ndash;month basis for that line of Service. <strong>If you cancel a line of Service, or if we cancel it for good cause, during its contract term, you'll have to pay an early termination fee. If your contract term results from your purchase of an advanced device, your early termination fee will be &#36;350, which will decline by &#36;10 per month upon completion of months 7&ndash;17, &#36;20 per month upon completion of months 18&ndash;22, &#36;60 upon completion of month 23 and will be &#36;0 upon completion of the contract term. For other contract terms entered into on or after November 14, 2014, your early termination fee will be &#36;175, which will decline by &#36;5 per month upon completion of months 7&ndash;17, &#36;10 per month upon completion of months 18&ndash;22, &#36;30 upon completion of month 23 and will be &#36;0 upon completion of your contract term. If you cancel service, you may have to immediately pay off the remaining balance on any device agreement. Cancellations will become effective on the last day of that month's billing cycle,</strong> and you are responsible for all charges incurred until then. Also, if you bought your wireless device from an authorized agent or third&ndash;party vendor, you should check whether it charges a separate termination fee.</p>\r\r<h4>Can I take my wireless phone number to another carrier?</h4>\r\r<p>You may be able to transfer, or \"port\", your wireless phone number to another carrier. If you port a number from us, we'll treat it as though you asked us to cancel your Service for that number. After the porting is completed, you won't be able to use our service for that number, but you'll remain responsible for all fees and charges through the end of that billing cycle, just like any other cancellation. If you're a Prepaid customer, you won't be entitled to a refund of any balance on your account. If you port a number to us, please be aware that we may not be able to provide some services right away, such as 911 location services. You don't have any rights to your wireless phone number, except for any right you may have to port it.</p>\r\r<h4>Can I have someone else manage my Postpay account?</h4>\r\r<p>No problem &ndash; just tell us by phone, in person, or in writing. You can appoint someone to manage your Postpay account. The person you appoint will be able to make changes to your account, including adding new lines of Service, buying new wireless devices, and extending your contract term. Any changes that person makes will be treated as modifications to this Agreement.</p>\r\r\r\r<h4>Can Verizon change this Agreement or my Service?</h4>\r\r<p>We may change prices or any other term of your Service or this Agreement at any time, but we'll provide notice first, including written notice if you have Postpay Service. If you use your Service after the change takes effect that means you're accepting the change. If you're a Postpay customer and a change to your Plan or this Agreement has a material adverse effect on you, you can cancel the line of Service that has been affected within 60 days of receiving the notice with no early termination fee if we fail to negate the change after you notify us of your objection to it. Notwithstanding this provision, if we make any changes to the dispute resolution provision of this Agreement, such changes will not affect the resolution of any disputes that arose before such change.</p>\r\r\r\r<h4>My wireless device</h4>\r\r\r\r<p>Your wireless device must comply with Federal Communications Commission regulations, be certified for use on our network, and be compatible with your Service. Please be aware that we may change your wireless device's software, applications or programming remotely, without notice. This could affect your stored data, or how you've programmed or use your wireless device. By activating Service that uses a SIM (Subscriber Identity Module) card, you agree we own the intellectual property and software in the SIM card, that we may change the software or other data in the SIM card remotely and without notice, and we may utilize any capacity in the SIM card for administrative, network, business and/or commercial purposes.</p>\r\r\r<h4>Where and how does Verizon wireless Service work?</h4>\r\r\r\r<p>Wireless devices use radio transmissions, so unfortunately you can't get Service if your device isn't in range of a transmission signal. And please be aware that even within your Coverage Area, many things can affect the availability and quality of your Service, including network capacity, your device, terrain, buildings, foliage and weather.</p>\r\r\r<h4>How does Verizon calculate my charges?</h4>\r\r<p>You agree to pay all access, usage and other charges that you or any other user of your wireless device incurred. If multiple wireless devices are associated with your account, you agree to pay all charges incurred by users of those wireless devices. For charges based on the amount of time used or data sent or received, we'll round up any fraction to the next full minute or, depending on how you're billed for data usage, the next full megabyte or gigabyte. For outgoing calls, usage time starts when you first press <strong>Send</strong> or the call connects to a network, and for incoming calls, it starts when the call connects to a network (which may be before it rings). Usage time may end several seconds after you press <strong>End</strong> or after the call disconnects. For calls made on our network, we charge only for calls that are answered, including by machines. For Postpay Service, usage cannot always be processed right away and may be included in a later bill, but the usage will still count towards your allowance for the month when the Service was used.</p>\r\r<h4>What Charges are set by Verizon?</h4>\r\r<p>Our charges may also include Federal Universal Service, Regulatory\rand Administrative Charges, and we may also include other charges related to our governmental costs. We set these charges; they aren't taxes, they aren't required by law, they are not necessarily related to anything the government does, they are kept by us in whole or in part, and the amounts and what they pay for may change.</p>\r\r\r<h4>Government Taxes, Fees and Surcharges</h4>\r\r<p>You must pay all taxes, fees and surcharges set by federal, state and local governments. Please note that we may not always be able to notify you in advance of changes to these charges.</p>\r\r\r<h4>What is roaming?</h4>\r\r<p>You're \"roaming\" whenever your wireless device connects to a network outside your Coverage Area or connects to another carrier's network, which could happen even within your Coverage Area. There may be higher rates or extra charges (including charges for long distance, tolls or calls that don't connect), and your data service may be limited or slowed, when roaming.</p>\r\r\r<h4>How can I prevent unintended charges on my bill?</h4>\r\r<p>Many services and applications are accessible on or through wireless devices, including purchases of games, movies, music and other content. Some of these services are provided by Verizon. Others are provided by third parties that may offer the option to bill the charges to your Verizon bill or other methods of payment. Charges may be one&ndash;time or recurring.\rThe amount and frequency of the charges will be disclosed to you or the person using your device or a device associated with your account at the time a purchase is made. If the purchaser chooses to have the charges billed to your account, such charges will become part of the amount due for that billing cycle. Verizon offers tools to block or restrict these services, and to block all billing for third&ndash;party services on your Verizon wireless bill, at verizonwireless.com/myverizon.  We do not support calls to 900, 976 and certain other international premium rate numbers.</p>\r\r\r<h4>How and when can I dispute charges?</h4>\r\r<p>If you're a Postpay customer, you can dispute your bill within 180 days of receiving it, but unless otherwise provided by law or unless you're disputing charges because your wireless device was lost or stolen, you still have to pay all charges until the dispute is resolved. If you're a Prepaid customer, you can dispute a charge within 180 days of the date the disputed charge was incurred. <strong>YOU MAY CALL US TO DISPUTE CHARGES ON YOUR BILL OR ANY SERVICE(S) FOR WHICH YOU WERE BILLED, BUT IF YOU WISH TO PRESERVE YOUR RIGHT TO BRING AN ARBITRATION OR SMALL CLAIMS CASE REGARDING SUCH DISPUTE, YOU MUST WRITE TO US AT THE CUSTOMER SERVICE ADDRESS ON YOUR BILL, OR SEND US A COMPLETED NOTICE OF DISPUTE FORM (AVAILABLE AT VERIZONWIRELESS.COM), WITHIN THE 180&ndash;DAY PERIOD MENTIONED ABOVE. IF YOU DO NOT NOTIFY US IN WRITING OF SUCH DISPUTE WITHIN THE 180&ndash;DAY PERIOD, YOU WILL HAVE WAIVED YOUR RIGHT TO DISPUTE THE BILL OR SUCH SERVICE(S) AND TO BRING AN ARBITRATION OR SMALL CLAIMS CASE REGARDING ANY SUCH DISPUTE.</strong></p>\r\r\r<h4>What are my rights for dropped calls or interrupted Service?</h4>\r\r<p>If you drop a call in your Coverage Area, redial. If it's answered within 5 minutes, call us within 90 days if you're a Postpay customer, or within 45 days if you're a Prepaid customer, and we'll give you a 1&ndash;minute airtime credit. If you're a Postpay customer and you lose Service in your Coverage Area for more than 24 hours in a row and we're at fault, call us within 180 days and we'll give you a credit for the time lost. Please be aware that these are your only rights for dropped calls or interrupted Service.</p>\r\r\r\r<h4>Billing and Payments</h4>\r\r<p>If you're a Postpay customer and we don't get your payment on time, we will charge you a late fee of up to 1.5 percent per month (18 percent per year) on the unpaid balance, or a flat &#36;5 per month, whichever is greater, if allowed by law in the state of your billing address. (If you choose to have your Service billed by another company (pursuant to a Verizon&ndash;approved program), late fees are set by that company and may be higher than our late fees.) Late fees are part of the rates and charges you agree to pay. If you fail to pay on time and we refer your account(s) to a third party for collection, a collection fee will be assessed and will be due at the time of the referral to the third party. The fee will be calculated at the maximum percentage permitted by applicable law, not to exceed 18 percent. We may require a deposit at the time of activation or afterward, or an increased deposit. We'll pay simple interest on any deposit at the rate the law requires. We may apply deposits or payments in any order to any amounts you owe us on any account. If your final credit balance is less than &#36;1, we will refund it only if you ask. If your service is suspended or terminated, you may have to pay a fee to have service reactivated.</p>\r\r<p>If you're a Prepaid customer, you may replenish your balance at any time before the expiration date by providing us with another payment. If you maintain a Prepaid account balance, it may not exceed &#36;1,000 and you may be prevented from replenishing if your balance reaches &#36;1,000. We may apply your payments to any amounts you may owe us if your earlier account replenishment payments had been reversed. We will suspend service when your account reaches the expiration date and any unused balance will be forfeited.</p>\r<p>We may charge you up to &#36;25 for any returned check.</p>\r\r<h4>What if my wireless device gets lost or stolen?</h4>\r\r<p>We're here to help. It's important that you notify us right away, so we can suspend your Service to keep someone else from using it. If you're a Postpay customer and your wireless device is used after the loss or theft but before you report it, and you want a credit for any charges for that usage, we're happy to review your account activity and any other information you'd like us to consider. Keep in mind that you may be held responsible for the charges if you delayed reporting the loss or theft without good reason, but you don't have to pay any charges you dispute while they are being investigated. If you are a California customer and we haven't given you a courtesy suspension of recurring monthly charges during the past year, we'll give you one for 30 days or until you replace or recover your wireless device, whichever comes first.</p>\r\r\r<h4>What are Verizon's  rights to limit or end Service or end this Agreement?</h4>\r\r<p>We can, without notice, limit, suspend or end your Service or any agreement with you for\rany good cause, including, but not limited to: (1) if you: (a) breach this agreement; (b) resell your Service; (c) use your Service for any illegal purpose, including use that violates trade and economic sanctions and prohibitions promulgated by any US governmental agency;\r(d) install, deploy or use any regeneration equipment or similar mechanism (for example, a repeater) to originate, amplify, enhance, retransmit or regenerate an RF signal without our permission; (e) steal from or lie to us; or, if you're a Postpay customer; (f) do not pay your bill on time; (g) incur charges larger than a required deposit or billing limit, or materially in excess of your monthly access charges (even if we haven't yet billed the charges); (h) provide credit information we can't verify; or (i) are unable to pay us or go bankrupt; or (2) if you, any user of your device or any line of service on your account, or any account manager on your account: (a) threaten, harass, or use vulgar and/or inappropriate language toward our representatives; (b) interfere with our operations; (c) \"spam,\" or engage in other abusive messaging or calling; (d) modify your device from its manufacturer's specifications; or (e) use your Service in a way that negatively affects our network or other customers. We can also temporarily limit your Service for any operational or governmental reason.</p>\r\r\r<h4>Am I eligible for special discounts?</h4>\r\r<p>If you're a Postpay customer, you may be eligible for a discount if you are and remain affiliated with an organization that has an agreement with us. Unless your discount is through a government employee discount program, we may share certain information about your Service (including your name, your wireless telephone number and your total monthly charges) with your organization from time to time to make sure you're still eligible. We may adjust or remove your discount according to your organization's agreement with us, and remove your discount if your eligibility ends or your contract term expires. In any case, this won't be considered to have a material adverse effect on you.</p>\r\r\r<h4>DISCLAIMER OF WARRANTIES</h4>\r\r<p><strong>We make no representations or warranties, express or implied, including, to the extent permitted by applicable law, any implied warranty of merchantability or fitness for a particular purpose, about your Service, your wireless device, or any applications you access through your wireless device. We do not warrant that your wireless device will work perfectly or will not need occasional upgrades or modifications, or that it will not be negatively affected by network&ndash;related modifications, upgrades or similar activity. If you download or use applications, services or software provided by third parties (including voice applications), 911 or E911, or other calling functionality, may work differently than services offered by us, or may not work at all. Please review all terms and conditions of such third&ndash;party products. Verizon Wireless is not responsible for any third&ndash;party information, content, applications or services you access, download or use on your device. You are responsible for maintaining virus and other Internet security protections when accessing these third&ndash;party products or services. For additional information, visit the Verizon Content Policy at responsibility.verizon.com/contentpolicy</strong></p>\r\r<h4>WAIVERS AND LIMITATIONS OF LIABILITY</h4>\r\r<p><strong>You and Verizon both agree to limit claims against each other for damages or other monetary relief to direct damages. This limitation and waiver will apply regardless of the theory of liability. That means neither of us will try to get any indirect, special, consequential, treble or punitive damages from the other. This limitation and waiver also applies if you bring a claim against one of our suppliers, to the extent we would be required to indemnify the supplier for the claim.</strong> You agree we aren't responsible for problems caused by you or others, or by any act of God. You also agree we aren't liable for missed or deleted voice mails or other messages, or for any information (like pictures) that gets lost or deleted if we work on your device. If another wireless carrier is involved in any problem (for example, while you're roaming), you also agree to any limitations of liability that it imposes.</p>\r\r\r<div style=\"width:auto;height:auto;border:2px solid black; padding: 5px;\">\r\r<h4>HOW DO I RESOLVE DISPUTES WITH VERIZON?</h4>\r\r<p><strong>WE HOPE TO MAKE YOU A HAPPY CUSTOMER, BUT IF THERE'S AN ISSUE THAT NEEDS TO BE RESOLVED, THIS SECTION OUTLINES WHAT'S EXPECTED OF BOTH OF US.</strong></p>\r\r\r\r<p><strong>YOU AND VERIZON BOTH AGREE TO RESOLVE DISPUTES ONLY BY ARBITRATION OR IN SMALL CLAIMS COURT. YOU UNDERSTAND THAT BY THIS AGREEMENT YOU ARE GIVING UP THE RIGHT TO BRING A CLAIM IN COURT OR IN FRONT OF A JURY. WHILE THE PROCEDURES MAY BE DIFFERENT, AN ARBITRATOR CAN AWARD YOU THE SAME DAMAGES AND RELIEF, AND MUST HONOR THE SAME TERMS IN THIS AGREEMENT, AS A COURT WOULD. IF THE LAW ALLOWS FOR AN AWARD OF ATTORNEYS' FEES, AN ARBITRATOR CAN AWARD THEM TOO. WE ALSO BOTH AGREE THAT:</strong></p>\r\r<p>(1) THE FEDERAL ARBITRATION ACT APPLIES TO THIS AGREEMENT. EXCEPT FOR SMALL CLAIMS COURT CASES, ANY DISPUTE THAT IN ANY WAY RELATES TO OR ARISES OUT OF THIS AGREEMENT OR FROM ANY EQUIPMENT, PRODUCTS AND SERVICES YOU RECEIVE FROM US (OR FROM ANY ADVERTISING FOR ANY SUCH PRODUCTS OR SERVICES), INCLUDING ANY DISPUTES YOU HAVE WITH OUR EMPLOYEES OR AGENTS, WILL BE RESOLVED BY ONE OR MORE NEUTRAL ARBITRATORS BEFORE THE AMERICAN ARBITRATION ASSOCIATION (\"AAA\") OR BETTER BUSINESS BUREAU (\"BBB\"). YOU CAN ALSO BRING ANY ISSUES YOU MAY HAVE TO THE ATTENTION OF FEDERAL, STATE, OR LOCAL GOVERNMENT AGENCIES, AND IF THE LAW ALLOWS, THEY CAN SEEK RELIEF AGAINST US FOR YOU. THIS AGREEMENT TO ARBITRATE CONTINUES TO APPLY EVEN AFTER YOU HAVE STOPPED RECEIVING SERVICE FROM US.</p>\r\r\r\r<p>(2) UNLESS YOU AND VERIZON AGREE OTHERWISE, THE ARBITRATION WILL TAKE PLACE IN THE COUNTY OF YOUR BILLING ADDRESS. FOR CLAIMS OVER $10,000, THE AAA'S CONSUMER ARBITRATION RULES WILL APPLY. FOR CLAIMS OF $10,000 OR LESS, THE PARTY BRINGING THE CLAIM CAN CHOOSE EITHER THE AAA'S CONSUMER ARBITRATION RULES OR THE BBB'S RULES FOR BINDING ARBITRATION OR, ALTERNATIVELY, CAN BRING AN INDIVIDUAL ACTION IN SMALL CLAIMS COURT. YOU CAN GET PROCEDURES, RULES AND FEE INFORMATION FROM THE AAA (WWW.ADR.ORG), THE BBB (WWW.BBB.ORG) OR FROM US. FOR CLAIMS OF $10,000 OR LESS, YOU CAN CHOOSE WHETHER YOU'D LIKE THE ARBITRATION CARRIED OUT BASED ONLY ON DOCUMENTS SUBMITTED TO THE ARBITRATOR, OR BY A HEARING IN PERSON OR BY PHONE.</p>\r\r\r\r<p><strong>(3) THIS AGREEMENT DOESN'T ALLOW CLASS OR COLLECTIVE ARBITRATIONS EVEN IF THE AAA OR BBB PROCEDURES OR RULES WOULD. NOTWITHSTANDING ANY OTHER PROVISION OF THIS AGREEMENT, THE ARBITRATOR MAY AWARD MONEY OR INJUNCTIVE RELIEF ONLY IN FAVOR OF THE INDIVIDUAL PARTY SEEKING RELIEF AND ONLY TO THE EXTENT NECESSARY TO PROVIDE RELIEF WARRANTED BY THAT PARTY'S INDIVIDUAL CLAIM. NO CLASS OR REPRESENTATIVE OR PRIVATE ATTORNEY GENERAL THEORIES OF LIABILITY OR PRAYERS FOR RELIEF MAY BE MAINTAINED IN ANY ARBITRATION HELD UNDER THIS AGREEMENT. ANY QUESTION REGARDING THE ENFORCEABILITY OR INTERPRETATION OF THIS PARAGRAPH SHALL BE DECIDED BY A COURT AND NOT THE ARBITRATOR.</strong></p>\r\r\r\r<p>(4) IF EITHER OF US INTENDS TO SEEK ARBITRATION UNDER THIS AGREEMENT, THE PARTY SEEKING ARBITRATION MUST FIRST NOTIFY THE OTHER PARTY OF THE DISPUTE IN WRITING AT LEAST 30 DAYS IN ADVANCE OF INITIATING THE ARBITRATION. NOTICE TO VERIZON SHOULD BE SENT TO VERIZON WIRELESS DISPUTE RESOLUTION MANAGER, ONE VERIZON WAY, BASKING RIDGE, NJ 07920. THE NOTICE MUST DESCRIBE THE NATURE OF THE CLAIM AND THE RELIEF BEING SOUGHT. IF WE ARE UNABLE TO RESOLVE OUR DISPUTE WITHIN 30 DAYS, EITHER PARTY MAY THEN PROCEED TO FILE A CLAIM FOR ARBITRATION. WE'LL REIMBURSE ANY FILING FEE THAT THE AAA OR BBB CHARGES YOU FOR ARBITRATION OF THE DISPUTE. IF YOU PROVIDE US WITH SIGNED WRITTEN NOTICE THAT YOU CANNOT PAY THE FILING FEE, VERIZON WILL PAY THE FEE DIRECTLY TO THE AAA OR BBB. IF THAT ARBITRATION PROCEEDS, WE'LL ALSO PAY ANY ADMINISTRATIVE AND ARBITRATOR FEES CHARGED LATER.</p>\r\r\r<p>(5) WE ALSO OFFER CUSTOMERS THE OPTION OF PARTICIPATING IN A FREE INTERNAL MEDIATION PROGRAM. THIS PROGRAM IS ENTIRELY VOLUNTARY AND DOES NOT AFFECT EITHER PARTY'S RIGHTS IN ANY OTHER ASPECT OF THESE DISPUTE RESOLUTION PROCEDURES. IN OUR VOLUNTARY MEDIATION PROGRAM, WE WILL ASSIGN AN EMPLOYEE WHO'S NOT DIRECTLY INVOLVED IN THE DISPUTE TO HELP BOTH SIDES REACH AN AGREEMENT. THAT PERSON HAS ALL THE RIGHTS AND PROTECTIONS OF A MEDIATOR AND THE PROCESS HAS ALL OF THE PROTECTIONS ASSOCIATED WITH MEDIATION. FOR EXAMPLE, NOTHING SAID IN THE MEDIATION CAN BE USED LATER IN AN ARBITRATION OR LAWSUIT. IF YOU'D LIKE TO KNOW MORE, PLEASE CONTACT US AT VERIZONWIRELESS.COM OR THROUGH CUSTOMER SERVICE. IF YOU'D LIKE TO START THE MEDIATION PROCESS, PLEASE GO TO VERIZONWIRELESS.COM OR CALL CUSTOMER SERVICE FOR A NOTICE OF DISPUTE FORM TO FILL OUT, AND MAIL, FAX OR EMAIL IT TO US ACCORDING TO THE DIRECTIONS ON THE FORM.</p>\r\r\r\r<p>(6) WE MAY, BUT ARE NOT OBLIGATED TO, MAKE A WRITTEN SETTLEMENT OFFER ANYTIME BEFORE THE ARBITRATION HEARING. THE AMOUNT OR TERMS OF ANY SETTLEMENT OFFER MAY NOT BE DISCLOSED TO THE ARBITRATOR UNTIL AFTER THE ARBITRATOR ISSUES AN AWARD ON THE CLAIM. IF YOU DON'T ACCEPT THE OFFER AND THE ARBITRATOR AWARDS YOU AN AMOUNT OF MONEY THAT'S MORE THAN OUR OFFER BUT LESS THAN $5,000, OR IF WE DON'T MAKE YOU AN OFFER, AND THE ARBITRATOR AWARDS YOU ANY AMOUNT OF MONEY BUT LESS THAN $5,000, THEN WE AGREE TO PAY YOU $5,000 INSTEAD OF THE AMOUNT AWARDED. IN THAT CASE WE ALSO AGREE TO PAY ANY REASONABLE ATTORNEYS' FEES AND EXPENSES, REGARDLESS OF WHETHER THE LAW REQUIRES IT FOR YOUR CASE. IF THE ARBITRATOR AWARDS YOU MORE THAN $5,000, THEN WE WILL PAY YOU ONLY THAT AMOUNT.</p>\r\r\r\r<p>(7) AN ARBITRATION AWARD AND ANY JUDGMENT CONFIRMING IT APPLY ONLY TO THAT SPECIFIC CASE; IT CAN'T BE USED IN ANY OTHER CASE EXCEPT TO ENFORCE THE AWARD ITSELF.</p>\r\r\r\r<p><strong>(8) IF FOR SOME REASON THE PROHIBITION ON CLASS ARBITRATIONS SET FORTH IN SUBSECTION (3) CANNOT BE ENFORCED AS TO ALL OR PART OF A DISPUTE, THEN THE AGREEMENT TO ARBITRATE WILL NOT APPLY TO THAT DISPUTE OR PART OF THE DISPUTE.</strong></p>\r\r\r\r<p><strong>(9) IF FOR ANY REASON A CLAIM PROCEEDS IN COURT RATHER THAN THROUGH ARBITRATION, YOU AND VERIZON AGREE THAT THERE WILL NOT BE A JURY TRIAL. YOU AND VERIZON UNCONDITIONALLY WAIVE ANY RIGHT TO TRIAL BY JURY IN ANY ACTION, PROCEEDING OR COUNTERCLAIM ARISING OUT OF OR RELATING TO THIS AGREEMENT IN ANY WAY. IN THE EVENT OF LITIGATION, THIS PARAGRAPH MAY BE FILED TO SHOW A WRITTEN CONSENT TO A TRIAL BY THE COURT.</strong></p></div>\r\r\r\r<h4>About this Agreement</h4>\r\r\r\r<p>If we don't enforce our rights under this agreement in one instance, that doesn't mean we won't or can't enforce those rights in any other instance. You cannot assign this Agreement or any of your rights or duties under it without our permission. However, we may assign this Agreement or any debt you owe us without notifying you. <strong>If you're a Postpay customer, please note that many notices we send to you will show up as messages on your monthly bill. If you have online billing, those notices will be deemed received by you when your online bill is available for viewing. If you get a paper bill, those notices will be deemed received by you three days after we mail the bill to you. If we send other notices to you, they will be considered received immediately if we send them to your wireless device, or to any email or fax number you've given us, or after three days if we mail them to your billing address. If you need to send notices to us, please send them to the customer service address on your latest bill.</strong></p>\r\r\r\r<p><strong>If you're a Prepaid customer and we send notices to you, they will be considered received immediately if we send them to your wireless device or to any email or fax number you've given us, or if we post them as a precall notification on your Service, or after three days if we mail them to the most current address we have for you. If you need to send notices to us, please send them to the Customer Service Prepaid address at verizonwireless.com/contactus</strong></p>\r\r<p><strong>If any part of this agreement, including anything regarding the arbitration process (except for the prohibition on class arbitrations as explained in part 8 of the dispute resolution section above), is ruled invalid, that part may be removed from this agreement.</strong></p>\r\r\r\r<p><strong>This agreement and the documents it incorporates form the entire agreement between us. You can't rely on any other documents, or on what's said by any Sales or Customer Service Representatives, and you have no other rights regarding Service or this agreement.</strong> This Agreement isn't for the benefit of any third party except our parent companies, affiliates, subsidiaries, agents, and predecessors and successors in interest. Except where we've agreed otherwise elsewhere in this agreement, this agreement and any disputes covered by it are governed by federal law and the laws of the state encompassing the area code of your wireless phone number when you accepted this agreement, without regard to the conflicts of laws and rules of that state.</p>\r\r\r\r<p>Last Updated: 10/20/17</p>", "eppTermsAndConditions": null, "eppCustomerType": false, "tradeinTermsandConditions": null, "humAgreement": null }, "orderId": "SDC2e9d1158c60e80e03d1ad9dc9207cd45{d6}", "dueToday": "1067.49", "dueMonthly": "0.00", "depositAmount": "0.00", "employeeDiscount": "1067.49", "saveAmount": "0.00", "totalUpgradeFee": "0.00", "recycleDeviceAppraise": "0.0", "edgeOrderTotalDownPayment": "0.00", "flow": "AAL", "states": ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"], "authInfo": null, "giftCard1Info": null, "giftCard2Info": null, "opalImpersonator": null, "stackableDataDescription": null, "stackbleDataAggregateTotals": null, "edgeUpBuyOutAmount": "0.0", "edgeupBuyOutMtnList": null, "tapFeatureDetails": null, "promotionList": null, "cpcOrder": false, "instantCreditAmount": "0.0", "standaloneAccessories": false, "amountAfterInstantCredit": "0.0", "datagapDisclosureAgreement": null, "pastDueAmount": "0.00", "pastDueExist": false, "pastDueAmountPaid": false, "plans": { "dueMonthly": "0.00", "dueToday": "0.00", "planOnlyDueMonthly": "0.00", "items": [{ "planType": "Go Unlimited", "lineAccessCharges": [{ "name": "SMARTPHONE", "mtn": null, "price": "45.00", "discountPrice": "0.00", "retailPrice": "0.00", "hasEcpdDiscount": false, "promoMessage": null, "originalPrice": "0.00", "disountedInstantCreditAmt": "0.00", "instantCreditAmount": "0.00", "amountAfterInstantCredit": "0.00" }], "accountAccess": { "name": "Go Unlimited", "mtn": null, "price": "0.00", "discountPrice": "0.00", "retailPrice": "0.00", "hasEcpdDiscount": false, "promoMessage": null, "originalPrice": "0.00", "disountedInstantCreditAmt": "0.00", "instantCreditAmount": "0.00", "amountAfterInstantCredit": "0.00" }, "accountLevelFeatures": null, "totalMonthlyPlanCost": "0.00", "spoBadgeMessage": null, "planDisplayName": "Go Unlimited", "planImageURL": null, "planLetter": null, "planDescrption": null, "planDescription": null }], "upgradeDevices": [], "newDevices": [{ "name": "iPhone&reg; X", "price": "45.00", "discountPrice": 0.0, "hasEcpdDiscount": false, "mtn": null }], "existingDevices": [{ "name": "Apple&reg; iPhone&reg; 8 256GB in Gold", "price": "45.00", "discountPrice": 0.0, "hasEcpdDiscount": false, "mtn": "7042198578" }, { "name": "Apple&reg; iPhone&reg; 8 64GB in Space Gray", "price": "45.00", "discountPrice": 0.0, "hasEcpdDiscount": false, "mtn": "7044431604" }, { "name": "Apple&reg; iPhone&reg; X 64GB in Space Gray", "price": "45.00", "discountPrice": 0.0, "hasEcpdDiscount": false, "mtn": "7046350012" }, { "name": "Samsung Galaxy Tab&reg; E (8.0&rdquo;) in Black", "price": "20.00", "discountPrice": 0.0, "hasEcpdDiscount": false, "mtn": "7046546240" }, { "name": "Samsung Galaxy S8 64GB in Midnight Black", "price": "45.00", "discountPrice": 0.0, "hasEcpdDiscount": false, "mtn": "7047716207" }, { "name": "Apple&reg; iPhone&reg; 8 64GB in Space Gray", "price": "45.00", "discountPrice": 0.0, "hasEcpdDiscount": false, "mtn": "7049071820" }], "dueMonthlyPlanWithLAC": "290.00", "discountedDueMonthlyPlanWithLAC": "0.00" }, "devices": { "dueMonthly": 0.0, "totalActivationFee": 0.0, "deviceTotalDueMonthly": 0.0, "dueToday": 999.99, "accessories": [], "accessoriesBundle": [], "items": [{ "deviceName": "iPhone&reg; X", "dueMonthly": "0.00", "dueToday": "999.99", "upgradeFee": "0.00", "activationFee": "30.00", "dueTodayOriginal": 999.99, "dueMonthlyOriginal": 0.0, "mtn": null, "deviceImageUrl": "https://ss7.vzw.com/is/image/VerizonWireless/iPhoneX-Svr?$device-med$&fmt=jpeg&wid=75&hei=150", "protectionFeature": { "name": "Decline Equipment Protection", "mtn": null, "price": "0.00", "discountPrice": "0.00", "retailPrice": "0.00", "hasEcpdDiscount": false, "promoMessage": null, "originalPrice": "0.00", "disountedInstantCreditAmt": "0.00", "instantCreditAmount": "0.00", "amountAfterInstantCredit": "0.00" }, "optionalFeatures": [], "installmentBalance": "0.00", "edgeRetailPrice": "999.99", "edgeItemDownPaymentAmount": "0.00", "mailInRebateAmount": "0.00", "transferredFromMtn": null, "devicePromotionList": [], "bicOfferApplied": false, "bicContractPrice": "0.00", "bicDiscountedContractPrice": "0.00", "bicAdditionalContractText": null, "bicMessageMap": null, "edgeUpAmount": 0.0, "displayDeviceDueMonthly": 0.0, "deviceLACFee": "45.00", "manufactureName": "Apple", "color": "Silver", "size": "64GB", "displayName": "iPhone&reg; X", "contractTerm": "0", "edgeUpBuyOutAmount": 0.0, "fullRetailPrice": "999.99", "alwaysEligibleForUpgrade": false, "numberShareDevice": false, "activationFeeText": null, "numberSharedMtn": null, "promoContentText": null, "itemOnJaxPlan": true, "humCarDetails": null, "simDetails": null, "imeiId": null, "displayImeiId": null, "promoOfferText": null, "promoApplied": false, "commerceItemId": "SDC2e9d1158c60e80e03d1ad9dc9207cd45{d6}_device_1", "loanTerm": 24, "sbdHeaderMsg": null, "percentage": 50, "waivedActivationFeePromo": false, "flow": "AAL", "disountedInstantCreditAmt": "0.00", "instantCreditAmount": "0.00", "amountAfterInstantCredit": "0.00", "accessory": false, "edgeDevice": false, "eupdevice": false }], "buddyUpgrade": false }, "masterpassConfigInfo": { "checkoutId": "900f7d9b6a974cee9e0cad74fe8c1c20", "allowedCardTypes": ["master", "amex", "diners", "discover", "jcb", "maestro", "visa"], "shippingLocationProfile": "US", "amount": "1067.49", "cartId": "SDC2e9d1158c60e80e03d1ad9dc9207cd45{d6}", "currency": "USD", "suppress3Ds": false, "callbackUrl": "http://localhost/od/cust/auth/checkout/masterpass/paymentData" }, "masterpassEnabled": true, "paymentMethodRedesign": true, "accessories": null, "accessoriesBundle": null, "taxes": [{ "name": "Taxes & Fees", "price": "67.50", "discountPrice": "0.00", "retailPrice": "0.00", "originalPrice": "0.00", "city": "Waxhaw", "state": "NC", "taxCalculated": true, "taxNotCalculatedMsg": null }], "dueMonthlyView": { "title": "Due Monthly (device only)", "dueMonthlyPrice": "0.00", "items": [{ "name": "iPhone&reg; X", "description": "iPhone&reg; X", "manufacturer": "Apple", "color": "Silver", "size": "64GB", "priceBreakDown": [{ "lable": "Decline Equipment Protection", "price": "0.00", "description": null, "linkText": null, "linkUrl": null, "originalPrice": 0.0, "tmpMdOpted": false, "discountedEdgeRetailPrice": null, "sbdPromoMsg": null, "sbdDiscountAmount": 0.0, "sbdItemMonthlyAmount": 0.0, "itemRetailPrice": 0.0, "itemMonthlyPrice": 0.0, "itemStrikeThroughPrice": 0.0, "noOfBicOccurences": 0 }], "edge": false }], "tmpMd": null }, "dueTodayView": { "title": "Due Today", "dueTodayPrice": "1067.49", "items": [{ "name": "iPhone&reg; X", "description": "iPhone&reg; X", "manufacturer": "Apple", "color": "Silver", "size": "64GB", "priceBreakDown": [{ "lable": "Full retail device price", "price": "999.99", "description": null, "linkText": null, "linkUrl": null, "originalPrice": 0.0, "tmpMdOpted": false, "discountedEdgeRetailPrice": null, "sbdPromoMsg": null, "sbdDiscountAmount": 0.0, "sbdItemMonthlyAmount": 0.0, "itemRetailPrice": 0.0, "itemMonthlyPrice": 0.0, "itemStrikeThroughPrice": 0.0, "noOfBicOccurences": 0 }], "edge": false }], "accessories": [], "accessoriesBundle": [], "additionalCharges": { "title": "Additional Charges", "items": [{ "name": "Taxes & Fees", "price": "67.50", "description": "Waxhaw, NC" }, { "name": "FREE 2 Day by 8pm", "price": "0.00", "description": null }] }, "price": null }, "cartDetailURL": "/od/cust/auth/cart/getCartDetails", "smsAuthenticationComplete": false, "securePinPageUrl": "/od/cust/auth/checkout/securePin", "fetchSMSDevicesUrl": "digital/checkout/fetchSMSEnabledDevices", "totalActivationFee": "30.00", "itemOnJaxPlan": true, "comboOrder": false, "anyLineFreeVO": null, "giftCardsEnabled": true, "giftCardsLimit": 2, "giftCardsUsed": 0, "submitGiftCardURL": "/od/cust/auth/checkout/updateGiftCard", "checkGiftCardBalanceURL": "/od/cust/auth/checkout/checkGiftCardBalance", "removeGiftCardURL": null, "balanceCreditCardAmount": "1067.49", "totalGiftCardAmount": "0.00", "payPalEnabled": true, "securePinEligible": true, "ispuBTAPaymentUpdated": false, "iconicFlow": true, "updatePaymentInfoURL": "/od/cust/auth/checkout/updatePaymentInfo", "updateShippingInfoURL": "/od/cust/auth/checkout/updateShippingInfo", "handleCardinalResponseURL": null, "pastDueCheckoutURL": "/od/cust/auth/checkout/pastDueCheckout", "updateDeviceServiceAddressURL": "/od/cust/auth/checkout/updateDeviceServiceAddress", "submitOrderURL": "/od/cust/auth/checkout/submitOrder", "storeDetailsURL": "/od/cust/auth/checkout/storeDetails", "mainViewSubTitle": null, "pieEnabled": true, "googleMapAPI": { "client": "gme-verizonwireless2", "channel": "vzw-mobile", "draggable": true }, "selectedShippingType": { "type": "SHIPPING", "shippingTypeName": "FREE 2 Day by 8pm", "price": 0.0, "discountPrice": 0.0, "estimatedDeliveryDate": null }, "applePaymentRequest": { "totalAmount": "1067.49", "orderTotalLabel": "VERIZON (TOTAL PENDING)", "showAvailableShippingOptions": false, "requestBillingInfoFromApple": ["postalAddress"], "requestShippingInfoFromApple": ["email"], "lineItems": [{ "label": "PAYMENT NOT PROCESSED UNTIL WE VERIFY YOUR ORDER", "amount": "0.0", "type": "pending" }] }, "applePayEnabled": true, "appleMerchantIdentifier": "merchant.com.vzw.test" }, "errorMap": null, "statusMessage": null, "statusCode": "00" }
