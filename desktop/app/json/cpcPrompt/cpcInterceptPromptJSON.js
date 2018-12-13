const cpcInterceptPromptJSON = {
  statusCode: "00",
  errorMap: null,
  statusMessage: null,
  output: {
    declineURL: "/od/cust/auth/keepCurrentPlan",
    acceptURL: "/od/cust/auth/compatiblePlans",
    restrictedZipcodeMessage: "",
    currentPlanDetails: {
      currentPlanName: "The new Verizon Plan Medium 4 GB",
      monthlyAccessCost: "50.00",
      monthlyAccessDiscountCost: "0.00",
      totalMonthlyAccessCostForAllDevices: "105.00",
      monthlyLineAccessDetails: {
        noDevice: 4,
        totalMonthlyLineAccessCost: "55.00",
        totalMonthlyLineAccessDiscountCost: "0.00",
        upgradeDevices: [
          {
            mtn: "240.419.4309",
            deviceName: "Verizon Hum<sup>&#43;</sup>  Dark Gray",
            cost: "5.00",
            discountCost: "0.00",
            totalCost: null,
            deviceSorId: null,
            deviceCost: null
          }
        ],
        newDevices: null,
        existingDevices: [
          {
            mtn: "301.641.8503",
            deviceName: "Apple&reg; iPhone&reg; 6 Plus 64GB in Space Gray",
            cost: "20.00",
            discountCost: "0.00",
            totalCost: null,
            deviceSorId: null,
            deviceCost: null
          },
          {
            mtn: "301.717.3637",
            deviceName: "Apple&reg; iPhone&reg; 6 Plus 64GB in Gold",
            cost: "20.00",
            discountCost: "0.00",
            totalCost: null,
            deviceSorId: null,
            deviceCost: null
          },
          {
            mtn: "804.396.8352",
            deviceName: "Verizon Ellipsis&reg; Jetpack&reg; MHS800L",
            cost: "10.00",
            discountCost: "0.00",
            totalCost: null,
            deviceSorId: null,
            deviceCost: null
          }
        ]
      }
    }
  }
};
/* {
  "statusCode": "00",
  "errorMap": null,
  "statusMessage": null,
  "output": {
    "declineURL": "/od/cust/auth/keepCurrentPlan",
    "acceptURL": "/od/cust/auth/compatiblePlans",
    "restrictedZipcodeMessage": "",
    "currentPlanDetails": {
      "currentPlanName": "Data Plan 2GB",
      "monthlyAccessCost": "20.00",
      "monthlyAccessDiscountCost": "0.00",
      "totalMonthlyAccessCostForAllDevices": "40.00",
      "monthlyLineAccessDetails": {
        "noDevice": 2,
        "totalMonthlyLineAccessCost": "20.00",
        "totalMonthlyLineAccessDiscountCost": "0.00",
        "upgradeDevices": null,
        "newDevices": [
          {
            "mtn": "sku2210542",
            "deviceName": "Verizon Ellipsis 8 HD 16GB Dark Blue",
            "cost": "10.00",
            "discountCost": "0.00",
            "totalCost": null,
            "deviceSorId": null,
            "deviceCost": null,
            "dataFeatures": [],
            "msgFeatures": [],
            "minuteFeatures": null
          }
        ],
        "existingDevices": [
          {
            "mtn": "443.546.0061",
            "deviceName": "Apple&reg; iPad&reg; Pro 128GB in Space Gray",
            "cost": "10.00",
            "discountCost": "0.00",
            "totalCost": null,
            "deviceSorId": null,
            "deviceCost": null,
            "dataFeatures": null,
            "msgFeatures": null,
            "minuteFeatures": null
          }
        ]
      },
      "planCategoryCode": "50"
    },
    "planNAFs": [
      {
        "skuId": "sku610038",
        "price": "30.0",
        "discount": "0.0",
        "finalPrice": "30.0",
        "currentPlan": false,
        "planId": "plan160006",
        "planSorId": "86504",
        "planType": "multiLine",
        "planImage": "4gb_011918",
        "planName": "Data Plan 4GB",
        "planDesc": null
      },
      {
        "skuId": "sku610118",
        "price": "260.0",
        "discount": "0.0",
        "finalPrice": "260.0",
        "currentPlan": false,
        "planId": "plan120008",
        "planSorId": "87185",
        "planType": "multiLine",
        "planImage": "40gb_011918",
        "planName": "Small Business Data 40GB",
        "planDesc": null
      },
      {
        "skuId": "sku960313",
        "price": "560.0",
        "discount": "0.0",
        "finalPrice": "560.0",
        "currentPlan": false,
        "planId": "plan520006",
        "planSorId": "90431",
        "planType": "multiLine",
        "planImage": "80gb_011918",
        "planName": "Small Business Data 80GB",
        "planDesc": null
      },
      {
        "skuId": "sku1040338",
        "price": "410.0",
        "discount": "0.0",
        "finalPrice": "410.0",
        "currentPlan": false,
        "planId": "plan160006",
        "planSorId": "90910",
        "planType": "multiLine",
        "planImage": "60gb_011918",
        "planName": "Data Plan 60GB",
        "planDesc": null
      },
      {
        "skuId": "sku1040339",
        "price": "710.0",
        "discount": "0.0",
        "finalPrice": "710.0",
        "currentPlan": false,
        "planId": "plan160006",
        "planSorId": "90912",
        "planType": "multiLine",
        "planImage": "100gb_011918",
        "planName": "Data Plan 100GB",
        "planDesc": null
      },
      {
        "skuId": "sku610119",
        "price": "335.0",
        "discount": "0.0",
        "finalPrice": "335.0",
        "currentPlan": false,
        "planId": "plan120008",
        "planSorId": "87186",
        "planType": "multiLine",
        "planImage": "50gb_011918",
        "planName": "Small Business Data 50GB",
        "planDesc": null
      },
      {
        "skuId": "sku960282",
        "price": "20.0",
        "discount": "0.0",
        "finalPrice": "20.0",
        "currentPlan": true,
        "planId": "plan160006",
        "planSorId": "90525",
        "planType": "multiLine",
        "planImage": "2gb_011918",
        "planName": "Data Plan 2GB",
        "planDesc": null
      },
      {
        "skuId": "sku1040336",
        "price": "560.0",
        "discount": "0.0",
        "finalPrice": "560.0",
        "currentPlan": false,
        "planId": "plan160006",
        "planSorId": "90911",
        "planType": "multiLine",
        "planImage": "80gb_011918",
        "planName": "Data Plan 80GB",
        "planDesc": null
      },
      {
        "skuId": "sku610117",
        "price": "185.0",
        "discount": "0.0",
        "finalPrice": "185.0",
        "currentPlan": false,
        "planId": "plan120008",
        "planSorId": "87184",
        "planType": "multiLine",
        "planImage": "30gb_011918",
        "planName": "Small Business Data 30GB",
        "planDesc": null
      },
      {
        "skuId": "sku960308",
        "price": "710.0",
        "discount": "0.0",
        "finalPrice": "710.0",
        "currentPlan": false,
        "planId": "plan520006",
        "planSorId": "90429",
        "planType": "multiLine",
        "planImage": "100gb_011918",
        "planName": "Small Business Data 100GB",
        "planDesc": null
      },
      {
        "skuId": "sku1040338",
        "price": "410.0",
        "discount": "0.0",
        "finalPrice": "410.0",
        "currentPlan": false,
        "planId": "plan160006",
        "planSorId": "90910",
        "planType": "multiLine",
        "planImage": "60gb_011918",
        "planName": "Data Plan 60GB",
        "planDesc": null
      },
      {
        "skuId": "sku1040336",
        "price": "560.0",
        "discount": "0.0",
        "finalPrice": "560.0",
        "currentPlan": false,
        "planId": "plan160006",
        "planSorId": "90911",
        "planType": "multiLine",
        "planImage": "80gb_011918",
        "planName": "Data Plan 80GB",
        "planDesc": null
      },
      {
        "skuId": "sku1180291",
        "price": "1400.0",
        "discount": "0.0",
        "finalPrice": "1400.0",
        "currentPlan": false,
        "planId": "plan1360004",
        "planSorId": "91520",
        "planType": "multiLine",
        "planImage": "200gb_011918",
        "planName": "Small Business Data 200GB",
        "planDesc": null
      },
      {
        "skuId": "sku610028",
        "price": "50.0",
        "discount": "0.0",
        "finalPrice": "50.0",
        "currentPlan": false,
        "planId": "plan160006",
        "planSorId": "86506",
        "planType": "multiLine",
        "planImage": "8gb_011918",
        "planName": "Data Plan 8GB",
        "planDesc": null
      },
      {
        "skuId": "sku1040338",
        "price": "410.0",
        "discount": "0.0",
        "finalPrice": "410.0",
        "currentPlan": false,
        "planId": "plan160006",
        "planSorId": "90910",
        "planType": "multiLine",
        "planImage": "60gb_011918",
        "planName": "Data Plan 60GB",
        "planDesc": null
      },
      {
        "skuId": "sku1040336",
        "price": "560.0",
        "discount": "0.0",
        "finalPrice": "560.0",
        "currentPlan": false,
        "planId": "plan160006",
        "planSorId": "90911",
        "planType": "multiLine",
        "planImage": "80gb_011918",
        "planName": "Data Plan 80GB",
        "planDesc": null
      },
      {
        "skuId": "sku1180292",
        "price": "1025.0",
        "discount": "0.0",
        "finalPrice": "1025.0",
        "currentPlan": false,
        "planId": "plan1360004",
        "planSorId": "91521",
        "planType": "multiLine",
        "planImage": "150gb_011918",
        "planName": "Small Business Data 150GB",
        "planDesc": null
      },
      {
        "skuId": "sku610033",
        "price": "40.0",
        "discount": "0.0",
        "finalPrice": "40.0",
        "currentPlan": false,
        "planId": "plan160006",
        "planSorId": "86505",
        "planType": "multiLine",
        "planImage": "6gb_011918",
        "planName": "Data Plan 6GB",
        "planDesc": null
      },
      {
        "skuId": "sku960312",
        "price": "410.0",
        "discount": "0.0",
        "finalPrice": "410.0",
        "currentPlan": false,
        "planId": "plan520006",
        "planSorId": "90430",
        "planType": "multiLine",
        "planImage": "60gb_011918",
        "planName": "Small Business Data 60GB",
        "planDesc": null
      },
      {
        "skuId": "sku1040339",
        "price": "710.0",
        "discount": "0.0",
        "finalPrice": "710.0",
        "currentPlan": false,
        "planId": "plan160006",
        "planSorId": "90912",
        "planType": "multiLine",
        "planImage": "100gb_011918",
        "planName": "Data Plan 100GB",
        "planDesc": null
      },
      {
        "skuId": "sku1040339",
        "price": "710.0",
        "discount": "0.0",
        "finalPrice": "710.0",
        "currentPlan": false,
        "planId": "plan160006",
        "planSorId": "90912",
        "planType": "multiLine",
        "planImage": "100gb_011918",
        "planName": "Data Plan 100GB",
        "planDesc": null
      }
    ]
  }
}; */
/* {
  "statusCode": "00",
  "errorMap": null,
  "statusMessage": null,
  "output": {
    "declineURL": "/od/cust/auth/keepCurrentPlan",
    "acceptURL": "/od/cust/auth/compatiblePlans",
    "restrictedZipcodeMessage": "",
    "currentPlanDetails": {
      "currentPlanName": "Nationwide Talk - 700",
      "monthlyAccessCost": "50.00",
      "monthlyAccessDiscountCost": "0.00",
      "totalMonthlyAccessCostForAllDevices": "79.97",
      "monthlyLineAccessDetails": {
        "noDevice": 3,
        "totalMonthlyLineAccessCost": "29.97",
        "totalMonthlyLineAccessDiscountCost": "0.00",
        "upgradeDevices": null,
        "newDevices": [
          {
            "mtn": "sku2680531",
            "deviceName": "Apple iPhone&reg; X 64GB Space Gray",
            "cost": "9.99",
            "discountCost": "0.00",
            "totalCost": null,
            "deviceSorId": null,
            "deviceCost": null,
            "dataFeatures": [
              {
                "sfoSorId": "76386",
                "displayName": "4GB Data Bundle with Personal Email & Mobile Hotspot",
                "price": "50.00",
                "sfoRecommendationText": "4GB Data w/ Hotspot",
                "sorSfoType": "DATA",
                "sfoSkuId": "sku400390"
              },
              {
                "sfoSorId": "76391",
                "displayName": "7GB Data Bundle with Personal Email & Mobile Hotspot",
                "price": "70.00",
                "sfoRecommendationText": "7GB Data w/ Hotspot",
                "sorSfoType": "DATA",
                "sfoSkuId": "sku400420"
              },
              {
                "sfoSorId": "76376",
                "displayName": "5GB Data Bundle with Personal Email",
                "price": "50.00",
                "sfoRecommendationText": "5GB Data",
                "sorSfoType": "DATA",
                "sfoSkuId": "sku400405"
              },
              {
                "sfoSorId": "76379",
                "displayName": "10GB Data Bundle with Personal Email",
                "price": "80.00",
                "sfoRecommendationText": "10GB Data",
                "sorSfoType": "DATA",
                "sfoSkuId": "sku400362"
              },
              {
                "sfoSorId": "76375",
                "displayName": "2GB Data Bundle with Personal Email",
                "price": "30.00",
                "sfoRecommendationText": "2GB Data",
                "sorSfoType": "DATA",
                "sfoSkuId": "sku400376"
              },
              {
                "sfoSorId": "76393",
                "displayName": "12GB Data Bundle with Personal Email & Mobile Hotspot",
                "price": "100.00",
                "sfoRecommendationText": "12GB Data w/ Hotspot",
                "sorSfoType": "DATA",
                "sfoSkuId": "sku400371"
              }
            ],
            "msgFeatures": [
              {
                "sfoSorId": "76901",
                "displayName": "1000 Messages",
                "price": "10.00",
                "sfoRecommendationText": "1000 Messages",
                "sorSfoType": "MESG",
                "sfoSkuId": "sku401728"
              }
            ],
            "minuteFeatures": null
          },
          {
            "mtn": "sku26805781",
            "deviceName": "Apple iPhone&reg; X 64GB Space Gray",
            "cost": "9.99",
            "discountCost": "0.00",
            "totalCost": null,
            "deviceSorId": null,
            "deviceCost": null,
            "dataFeatures": [
              {
                "sfoSorId": "76386",
                "displayName": "4GB Data Bundle with Personal Email & Mobile Hotspot",
                "price": "50.00",
                "sfoRecommendationText": "4GB Data w/ Hotspot",
                "sorSfoType": "DATA",
                "sfoSkuId": "sku400390"
              },
              {
                "sfoSorId": "76391",
                "displayName": "7GB Data Bundle with Personal Email & Mobile Hotspot",
                "price": "70.00",
                "sfoRecommendationText": "7GB Data w/ Hotspot",
                "sorSfoType": "DATA",
                "sfoSkuId": "sku400420"
              },
              {
                "sfoSorId": "76376",
                "displayName": "5GB Data Bundle with Personal Email",
                "price": "50.00",
                "sfoRecommendationText": "5GB Data",
                "sorSfoType": "DATA",
                "sfoSkuId": "sku400405"
              },
              {
                "sfoSorId": "76379",
                "displayName": "10GB Data Bundle with Personal Email",
                "price": "80.00",
                "sfoRecommendationText": "10GB Data",
                "sorSfoType": "DATA",
                "sfoSkuId": "sku400362"
              },
              {
                "sfoSorId": "76375",
                "displayName": "2GB Data Bundle with Personal Email",
                "price": "30.00",
                "sfoRecommendationText": "2GB Data",
                "sorSfoType": "DATA",
                "sfoSkuId": "sku400376"
              },
              {
                "sfoSorId": "76393",
                "displayName": "12GB Data Bundle with Personal Email & Mobile Hotspot",
                "price": "100.00",
                "sfoRecommendationText": "12GB Data w/ Hotspot",
                "sorSfoType": "DATA",
                "sfoSkuId": "sku400371"
              }
            ],
            "msgFeatures": [
              {
                "sfoSorId": "76901",
                "displayName": "1000 Messages",
                "price": "10.00",
                "sfoRecommendationText": "1000 Messages",
                "sorSfoType": "MESG",
                "sfoSkuId": "sku401728"
              }
            ],
            "minuteFeatures": null
          }
        ],
        "existingDevices": [
          {
            "mtn": "610.216.0447",
            "deviceName": "Verizon Wireless Escapade&reg;",
            "cost": "9.99",
            "discountCost": "0.00",
            "totalCost": null,
            "deviceSorId": null,
            "deviceCost": null,
            "dataFeatures": null,
            "msgFeatures": null,
            "minuteFeatures": null
          },
          {
            "mtn": "610.217.5779",
            "deviceName": "Verizon Wireless Escapade&reg;",
            "cost": "9.99",
            "discountCost": "0.00",
            "totalCost": null,
            "deviceSorId": null,
            "deviceCost": null,
            "dataFeatures": null,
            "msgFeatures": null,
            "minuteFeatures": null
          }
        ]
      },
      "planCategoryCode": "44"
    }
  }
}; */
/* {
  "statusCode": "00",
  "errorMap": null,
  "statusMessage": null,
  "output": {
    "declineURL": "/od/cust/auth/keepCurrentPlan",
    "acceptURL": "/od/cust/auth/compatiblePlans",
    "restrictedZipcodeMessage": "",
    "currentPlanDetails": {
      "currentPlanName": "MORE Everything&reg; Unlimited Talk, Text & 500MB",
      "monthlyAccessCost": "20.0",
      "monthlyAccessDiscountCost": "0.0",
      "totalMonthlyAccessCostForAllDevices": "120.0",
      "monthlyLineAccessDetails": {
        "noDevice": 3,
        "totalMonthlyLineAccessCost": "100.0",
        "totalMonthlyLineAccessDiscountCost": "0.0",
        "upgradeDevices": [
          {
            "mtn": "8082287051",
            "deviceName": "iPhone&reg; X",
            "cost": "40.0",
            "discountCost": "0.0"
          }
        ],
        "newDevices": [
          {
            "mtn": "sku2680531",
            "deviceName": "iPhone&reg; X",
            "cost": "40.0",
            "discountCost": "0.0"
          }
        ],
        "existingDevices": [
          {
            "mtn": "8082287051",
            "deviceName": "iPhone&reg; X",
            "cost": "30.0",
            "discountCost": "0.0"
          },
          {
            "mtn": "8089274167",
            "deviceName": "iPhone&reg; X",
            "cost": "30.0",
            "discountCost": "0.0"
          }
        ]
      }
    },
    "multiUpgradeDetails": {
      "displayModal": true,
      "nextMtnToUpgrade": "123",
      "pendingUpgrdeMtns": [
        "123",
        "122"
      ],
      "cartURL": "/od/cust/auth/cart/getCartDetails",
      "upgradeURL": "/od/cust/auth/shop?flow=EUP&t=gM0Wgj5dDdI="
    }
  }
} */

export default cpcInterceptPromptJSON;
