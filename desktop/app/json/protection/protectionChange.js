/**
 * Created by mambig on 6/5/17.
 */
const protectionJSON = 
/*
{
  "output": {
    "mtnDeviceInfo": {
      "mtn": null,
      "equipmentProtectionList": [
        {
          "sorSfoType": "SPO",
          "priceTerm": "/mo",
          "sfoSkuId": "sku2880234",
          "price": "39.00",
          "wasPrice": "39.00",
          "introText": "<ul><li>Protect any three lines for a single rate</li>\r<li>Cover loss, theft, damage (including liquid), and defects</li>\r<li>As soon as next&ndash;day device replacement</li>\r<li>Virtually unlimited access to expert device support</li>\r<li>Fast cracked screen repair for select smartphones (subject to parts availability)<sup>1</sup></li>\r<li>International fulfillment options<sup>2</sup></li></ul>",
          "displayName": "Total Mobile Protection Multi-Device",
          "preSelected": false,
          "sfoSORId": "1167",
          "hasEcpdDiscount": false,
          "defaultDisplayFlag": false,
          "additionalTapList": [
            {
              "devices": "3",
              "claims": "9",
              "price": "Included",
              "skuId": "sku2880239",
              "additionalTAPFeatureAvailable": false,
              "preSelected": false
            },
            {
              "devices": "4",
              "claims": "12",
              "price": "9.00",
              "skuId": "sku2300176",
              "additionalTAPFeatureAvailable": false,
              "preSelected": true
            }
          ],
          "freeTrial": false,
          "freeTrailLabel": null,
          "tmpMdPlan": true
        },
        {
          "sorSfoType": "INSUR,D",
          "priceTerm": "/mo",
          "sfoSkuId": "sku401064",
          "price": "0.00",
          "wasPrice": "0.00",
          "introText": "If your device is lost, stolen, damaged, or experiences a post&ndash;warranty defect, the replacement cost may be as high as the retail price. You only have 30 days to enroll in coverage after your device activation.",
          "displayName": "Decline Equipment Protection",
          "preSelected": false,
          "sfoSORId": "66332",
          "hasEcpdDiscount": false,
          "defaultDisplayFlag": false,
          "additionalTapList": null,
          "freeTrial": false,
          "freeTrailLabel": null,
          "tmpMdPlan": false
        },
        {
          "sorSfoType": "INSUR,G",
          "priceTerm": "/mo",
          "sfoSkuId": "sku401075",
          "price": "3.50",
          "wasPrice": "7.00",
          "introText": "<ul><li>Virtually unlimited access to expert device support</li></ul>",
          "displayName": "Tech Coach",
          "preSelected": false,
          "sfoSORId": "77963",
          "hasEcpdDiscount": true,
          "defaultDisplayFlag": false,
          "additionalTapList": null,
          "freeTrial": false,
          "freeTrailLabel": null,
          "tmpMdPlan": false
        },
        {
          "sorSfoType": "INSUR,W",
          "priceTerm": "/mo",
          "sfoSkuId": "sku401085",
          "price": "1.50",
          "wasPrice": "3.00",
          "introText": "<ul><li> Coverage for post&ndash;warranty defects</li></ul>",
          "displayName": "Extended Warranty",
          "preSelected": false,
          "sfoSORId": "79184",
          "hasEcpdDiscount": true,
          "defaultDisplayFlag": false,
          "additionalTapList": null,
          "freeTrial": false,
          "freeTrailLabel": null,
          "tmpMdPlan": false
        },
        {
          "sorSfoType": "INSUR,W",
          "priceTerm": "/mo",
          "sfoSkuId": "sku1230437",
          "price": "9.00",
          "wasPrice": "9.00",
          "introText": "<ul><li>Cover loss, theft, damage (including liquid), and post&ndash;warranty defects</li>\r<li>As soon as next&ndash;day device replacement</li>\r<li>Fast cracked screen repair for select smartphones (subject to parts availability)<sup>1</sup></li>\r<li>International fulfillment options<sup>2</sup></li></ul>",
          "displayName": "Total Equipment Coverage",
          "preSelected": false,
          "sfoSORId": "81495",
          "hasEcpdDiscount": false,
          "defaultDisplayFlag": false,
          "additionalTapList": null,
          "freeTrial": false,
          "freeTrailLabel": null,
          "tmpMdPlan": false
        },
        {
          "sorSfoType": "INSUR,I",
          "priceTerm": "/mo",
          "sfoSkuId": "sku2880124",
          "price": "6.75",
          "wasPrice": "6.75",
          "introText": "<ul><li>Cover loss, theft, and damage (including liquid)</li>\r<li>As soon as next&ndash;day device replacement</li>\r<li>Fast cracked screen repair for select smartphones (subject to parts availability)<sup>1</sup></li>\r<li>International fulfillment options<sup>2</sup></li></ul>",
          "displayName": "Wireless Phone Protection",
          "preSelected": false,
          "sfoSORId": "85913",
          "hasEcpdDiscount": false,
          "defaultDisplayFlag": false,
          "additionalTapList": null,
          "freeTrial": false,
          "freeTrailLabel": null,
          "tmpMdPlan": false
        },
        {
          "sorSfoType": "INSUR,I",
          "priceTerm": "/mo",
          "sfoSkuId": "sku2880128",
          "price": "13.00",
          "wasPrice": "13.00",
          "introText": "<ul><li>Cover loss, theft, damage (including liquid), and post&ndash;warranty defects</li>\r<li>As soon as next&ndash;day device replacement</li>\r<li>Virtually unlimited access to expert device support</li>\r<li>Fast cracked screen repair for select smartphones (subject to parts availability)<sup>1</sup></li>\r<li>International fulfillment options<sup>2</sup></li></ul>\r",
          "displayName": "Total Mobile Protection",
          "preSelected": false,
          "sfoSORId": "85915",
          "hasEcpdDiscount": false,
          "defaultDisplayFlag": false,
          "additionalTapList": null,
          "freeTrial": false,
          "freeTrailLabel": null,
          "tmpMdPlan": false
        }
      ],
      "tapFeatureInfo": null,
      "tapExist": false,
      "tapEligible": true,
      "tapMsg": null,
      "tpmdHeader": null,
      "tpmdDescription": null,
      "tpmdButtonText": null,
      "tmprefreshOptionAvailable": false
    },
    "bundleItemInCart": null,
    "cq": null,
    "saveUrl": "/od/cust/auth/protection/addUpdatePlanFeature/",
    "commerceItemId": null,
    "deviceSkuId": "sku3140153",
    "deviceProdId": "dev10480014",
    "editProtection": false,
    "deviceProtectionRequired": false,
    "fromEditDeviceForEUP": false,
    "bundleAccessoriesURL": "/od/cust/auth/accessories/?format=json",
    "throttleAccessoriesBundle": false,
    "multiUpgradeDetails": null,
    "smartFamilyInfo": null,
    "editSmartFamily": false,
    "deviceImageInfo": {
      "displayImageURL": "https://ss7.vzw.com/is/image/VerizonWireless/samsung-galaxy-note9-blue?$device-lg$",
      "brandName": "Samsung",
      "color": "Ocean Blue",
      "displayName": "Galaxy Note9",
      "capacity": "128null"
    },
    "carouselImagesInfo": {
      "set": "{\"set\":{\"pv\":\"1.0\",\"type\":\"media_set\",\"n\":\"VerizonWireless/samsung-galaxy-note9-blue-mms\",\"item\":[{\"i\":{\"n\":\"VerizonWireless/samsung-galaxy-note9-blue\"},\"s\":{\"n\":\"VerizonWireless/samsung-galaxy-note9-blue\"},\"dx\":\"1679\",\"dy\":\"3500\",\"iv\":\"gjBvD3\"},{\"type\":\"img_set\",\"set\":{\"type\":\"img_set\",\"n\":\"VerizonWireless/samsung-galaxy-note9-blue_IMAGESETS\",\"item\":[{\"i\":{\"n\":\"VerizonWireless/samsung-galaxy-note9-blue\"},\"s\":{\"n\":\"VerizonWireless/samsung-galaxy-note9-blue\"},\"dx\":\"1679\",\"dy\":\"3500\",\"iv\":\"gjBvD3\"},{\"i\":{\"n\":\"VerizonWireless/samsung-galaxy-note9-blue-back\"},\"s\":{\"n\":\"VerizonWireless/samsung-galaxy-note9-blue-back\"},\"dx\":\"1681\",\"dy\":\"3500\",\"iv\":\"HQ6w93\"},{\"i\":{\"n\":\"VerizonWireless/samsung-galaxy-note9-blue-right\"},\"s\":{\"n\":\"VerizonWireless/samsung-galaxy-note9-blue-right\"},\"dx\":\"194\",\"dy\":\"3500\",\"iv\":\"HEtv30\"},{\"i\":{\"n\":\"VerizonWireless/samsung-galaxy-note9-blue-left\"},\"s\":{\"n\":\"VerizonWireless/samsung-galaxy-note9-blue-left\"},\"dx\":\"193\",\"dy\":\"3500\",\"iv\":\"1kgv32\"}]},\"s\":{\"n\":\"VerizonWireless/samsung-galaxy-note9-blue_IMAGESETS\"},\"iv\":\"Y_ief3\"}]}}",
      "skuImageName": "samsung-galaxy-note9-blue"
    },
    "applecare": [
      {
        "desc": "AppleCare+ for iPhone 8 Plus, 7 Plus, 6s Plus, or 6 Plus extends service and support coverage to 2 years from the purchase date of the service and includes coverage up to 2 incidents of accidental damage from handling, each subject to a service fee plus tax.",
        "name": "AppleCare+ for iPhone 8 Plus, 7 Plus, 6s Plus, or 6 Plus",
        "productid": "acc8720004",
        "skuid": "sku2680071",
        "price": "149.97",
        "discountedprice": "",
        "imageurl": "https://ss7.vzw.com/is/image/VerizonWireless/applecareplus-cc3000?$acc-med$",
        "incart": false,
        "commerceItemId": ""
      }
    ]
  },
  "errorMap": null,
  "statusMessage": "getProtectionFeatures",
  "statusCode": "00"
};
*/

{
  "protectionJSON": {
    "output": {
      "mtnDeviceInfo": {
        "mtn": null,
        "equipmentProtectionList": [
          {
            "sorSfoType": "SPO",
            "priceTerm": "/mo",
            "sfoSkuId": "sku2880234",
            "price": "39.00",
            "wasPrice": "39.00",
            "introText": "<p>Protect Any 3 Lines</p><ul><li>As soon as next&ndash;day replacements for loss, theft, damage (incl. liquid) &amp; post&ndash;warranty defects</li><li>Fast cracked screen repair for select smartphones (subject to parts availability)<sup>1</sup></li><li>Global fulfillment options <sup>2</sup></li></ul><p>All Eligible Devices</p><ul><li>Expert support with Tech Coach</li></ul><p>Products available separately</p>",
            "displayName": "Total Mobile Protection Multi-Device",
            "preSelected": false,
            "sfoSORId": "1167",
            "hasEcpdDiscount": false,
            "defaultDisplayFlag": false,
            "additionalTapList": [
              {
                "devices": "3",
                "claims": "9",
                "price": "Included",
                "skuId": "sku2880234",
                "additionalTAPFeatureAvailable": false,
                "preSelected": true
              },
              {
                "devices": "4",
                "claims": "12",
                "price": "9.00",
                "skuId": "sku2300176",
                "additionalTAPFeatureAvailable": false,
                "preSelected": false
              },
              {
                "devices": "5",
                "claims": "15",
                "price": "18.00",
                "skuId": "sku2300176",
                "additionalTAPFeatureAvailable": false,
                "preSelected": false
              },
              {
                "devices": "6",
                "claims": "18",
                "price": "27.00",
                "skuId": "sku2300176",
                "additionalTAPFeatureAvailable": false,
                "preSelected": false
              },
              {
                "devices": "7",
                "claims": "21",
                "price": "36.00",
                "skuId": "sku2300176",
                "additionalTAPFeatureAvailable": false,
                "preSelected": false
              },
              {
                "devices": "8",
                "claims": "24",
                "price": "45.00",
                "skuId": "sku2300176",
                "additionalTAPFeatureAvailable": false,
                "preSelected": false
              }
            ],
            "freeTrial": false,
            "sequence": 1,
            "tmpB2BMdPlan": false,
            "tmpMdPlan": true,
            "vzMdPlan": false,
            "freeTrailLabel": null
          },
          {
            "sorSfoType": "INSUR,I",
            "priceTerm": "/mo",
            "sfoSkuId": "sku2880128",
            "price": "13.00",
            "wasPrice": "13.00",
            "introText": "<ul><li>As soon as next&ndash;day replacements for loss, theft, damage (incl. liquid) &amp; post&ndash;warranty defects</li>\r<li>Fast cracked screen repair for select smartphones (subject to parts availability)<sup>1</sup></li>\r<li>Global fulfillment options <sup>2</sup></li>\r<li>Expert support with Tech Coach</li></ul>\r<p>Products available separately</p>",
            "displayName": "Total Mobile Protection",
            "preSelected": false,
            "sfoSORId": "85915",
            "hasEcpdDiscount": false,
            "defaultDisplayFlag": false,
            "additionalTapList": null,
            "freeTrial": false,
            "sequence": 1,
            "tmpB2BMdPlan": false,
            "tmpMdPlan": false,
            "vzMdPlan": false,
            "freeTrailLabel": null
          },
          {
            "sorSfoType": "INSUR,W",
            "priceTerm": "/mo",
            "sfoSkuId": "sku1230437",
            "price": "9.00",
            "wasPrice": "9.00",
            "introText": "<ul><li>As soon as next&ndash;day device replacement for loss, theft, damage (incl. liquid) &amp; post&ndash;warranty defects</li>\r<li>Fast cracked screen repair for select smartphones (subject to parts availability)<sup>1</sup></li>\r<li>Global fulfillment options<sup>2</sup></li></ul>",
            "displayName": "Total Equipment Coverage",
            "preSelected": false,
            "sfoSORId": "81495",
            "hasEcpdDiscount": false,
            "defaultDisplayFlag": false,
            "additionalTapList": null,
            "freeTrial": false,
            "sequence": 2,
            "tmpB2BMdPlan": false,
            "tmpMdPlan": false,
            "vzMdPlan": false,
            "freeTrailLabel": null
          },
          {
            "sorSfoType": "INSUR,I",
            "priceTerm": "/mo",
            "sfoSkuId": "sku2880124",
            "price": "6.75",
            "wasPrice": "6.75",
            "introText": "<ul><li>As soon as next&ndash;day device replacements for loss, theft &amp; damage (incl. liquid)</li>\r<li>Fast cracked screen repair for select smartphones (subject to parts availability)<sup>1</sup></li>\r<li>Global fulfillment options<sup>2</sup></li></ul>",
            "displayName": "Wireless Phone Protection",
            "preSelected": false,
            "sfoSORId": "85913",
            "hasEcpdDiscount": false,
            "defaultDisplayFlag": false,
            "additionalTapList": null,
            "freeTrial": false,
            "sequence": 3,
            "tmpB2BMdPlan": false,
            "tmpMdPlan": false,
            "vzMdPlan": false,
            "freeTrailLabel": null
          },
          {
            "sorSfoType": "INSUR,W",
            "priceTerm": "/mo",
            "sfoSkuId": "sku401085",
            "price": "3.00",
            "wasPrice": "3.00",
            "introText": "<ul><li> Coverage for post&ndash;warranty defects</li></ul>",
            "displayName": "Extended Warranty",
            "preSelected": false,
            "sfoSORId": "79184",
            "hasEcpdDiscount": false,
            "defaultDisplayFlag": false,
            "additionalTapList": null,
            "freeTrial": false,
            "sequence": 4,
            "tmpB2BMdPlan": false,
            "tmpMdPlan": false,
            "vzMdPlan": false,
            "freeTrailLabel": null
          },
          {
            "sorSfoType": "INSUR,G",
            "priceTerm": "/mo",
            "sfoSkuId": "sku401075",
            "price": "7.00",
            "wasPrice": "7.00",
            "introText": "<ul><li>Unlimited access to expert device support</li></ul>",
            "displayName": "Tech Coach",
            "preSelected": false,
            "sfoSORId": "77963",
            "hasEcpdDiscount": false,
            "defaultDisplayFlag": false,
            "additionalTapList": null,
            "freeTrial": false,
            "sequence": 5,
            "tmpB2BMdPlan": false,
            "tmpMdPlan": false,
            "vzMdPlan": false,
            "freeTrailLabel": null
          },
          {
            "sorSfoType": "INSUR,D",
            "priceTerm": "/mo",
            "sfoSkuId": "sku401064",
            "price": "0.00",
            "wasPrice": "0.00",
            "introText": "If your device is lost, stolen, damaged, or experiences a post&ndash;warranty defect, the replacement cost may be as high as the retail price. You only have 30 days to enroll in coverage after your device activation.",
            "displayName": "Decline Equipment Protection",
            "preSelected": false,
            "sfoSORId": "66332",
            "hasEcpdDiscount": false,
            "defaultDisplayFlag": false,
            "additionalTapList": null,
            "freeTrial": false,
            "sequence": 6,
            "tmpB2BMdPlan": false,
            "tmpMdPlan": false,
            "vzMdPlan": false,
            "freeTrailLabel": null
          }
        ],
        "tapFeatureInfo": null,
        "tapExist": false,
        "tapEligible": true,
        "tapMsg": null,
        "tpmdHeader": null,
        "tpmdDescription": null,
        "tpmdButtonText": null,
        "vzProtectEnabled": false,
        "vzProtectState": "MO",
        "tmpB2BExist": false,
        "vzMdEligible": true,
        "vzMdRestrictedDevice": null,
        "inEligibleOverlay": null,
        "inEligibleFeatureMsgInfo": null,
        "tmprefreshOptionAvailable": false
      },
      "bundleItemInCart": null,
      "cq": null,
      "saveUrl": "/od/cust/auth/protection/addUpdatePlanFeature/",
      "commerceItemId": null,
      "deviceSkuId": "sku3180116",
      "deviceProdId": "dev10640020",
      "editProtection": false,
      "deviceProtectionRequired": false,
      "fromEditDeviceForEUP": false,
      "bundleAccessoriesURL": "/od/cust/auth/accessories/?format=json",
      "throttleAccessoriesBundle": false,
      "multiUpgradeDetails": null,
      "smartFamilyInfo": null,
      "editSmartFamily": false,
      "deviceImageInfo": {
        "displayImageURL": "https://ss7.vzw.com/is/image/VerizonWireless/apple-iphonexs-spacegrey?$device-lg$",
        "brandName": "Apple",
        "color": "Space Gray",
        "displayName": "iPhone&reg; XS",
        "capacity": "64null"
      },
      "carouselImagesInfo": {
        "set": "{\"set\":{\"pv\":\"1.0\",\"type\":\"media_set\",\"n\":\"VerizonWireless/apple-iphonexs-spacegrey-mms\",\"item\":[{\"i\":{\"n\":\"VerizonWireless/apple-iphonexs-spacegrey\"},\"s\":{\"n\":\"VerizonWireless/apple-iphonexs-spacegrey\"},\"dx\":\"1250\",\"dy\":\"2500\",\"iv\":\"LyWvN1\"},{\"type\":\"img_set\",\"set\":{\"type\":\"img_set\",\"n\":\"VerizonWireless/apple-iphonexs-spacegrey_IMAGESETS\",\"item\":[{\"i\":{\"n\":\"VerizonWireless/apple-iphonexs-spacegrey\"},\"s\":{\"n\":\"VerizonWireless/apple-iphonexs-spacegrey\"},\"dx\":\"1250\",\"dy\":\"2500\",\"iv\":\"LyWvN1\"},{\"i\":{\"n\":\"VerizonWireless/apple-iphonexs-spacegrey-side\"},\"s\":{\"n\":\"VerizonWireless/apple-iphonexs-spacegrey-side\"},\"dx\":\"161\",\"dy\":\"2500\",\"iv\":\"utWv93\"},{\"i\":{\"n\":\"VerizonWireless/apple-iphonexs-spacegrey-back\"},\"s\":{\"n\":\"VerizonWireless/apple-iphonexs-spacegrey-back\"},\"dx\":\"1250\",\"dy\":\"2500\",\"iv\":\"07TvN3\"}]},\"s\":{\"n\":\"VerizonWireless/apple-iphonexs-spacegrey_IMAGESETS\"},\"iv\":\"OjIL63\"}]}}",
        "skuImageName": "apple-iphonexs-spacegrey"
      }
    }
    
  },
  "appleCareJSON": {
    "applecare": [
      {
        "desc": "AppleCare+ for iPhone X extends service and support coverage to 2 years from the purchase date of the service and includes coverage up to 2 incidents of accidental damage from handling, each subject to a service fee plus tax. ",
        "name": "AppleCare+ for iPhone X, XS and XS Max",
        "productid": "acc8760082",
        "skuid": "sku2690130",
        "price": "199.97",
        "discountedprice": "",
        "imageurl": "https://ss7.vzw.com/is/image/VerizonWireless/applecareplus-cc3000?$acc-med$",
        "incart": false,
        "commerceItemId": ""
      }
    ]
  },
  "errorMap": null,
  "statusMessage": "getProtectionFeatures",
  "statusCode": "00"
};

/*
{
  "output": {
    "mtnDeviceInfo": {
      "mtn": null,
      "multiDeviceProtection": true,
	  "featurePriceIncreaseMsg": "<p>For customers who enrolled in protection before Decemebr 26th, we mailed a letter to notify you that changes to your equipment protection program will take effect on March 6, 2018. If you are keeping your existing equipment protetion program and the transaction you are about to complete results in the new pricing applying before March 6th, we will credit the difference back to your account.If applicable, within two bill cycles.</p>",
      "equipmentProtectionList": [
        {
          "sorSfoType": "INSUR,I",
          "priceTerm": "/mo",
          "sfoSkuId": "sku1230486",
          "price": "11.00",
          "wasPrice": 0,
          "introText": "<p>Next&ndash;day device replacement for loss, theft, damage &amp; post&ndash;warranty defects; cracked screen repair as soon as same&ndash;day* and unlimited access to Tech Coach experts.</p>\r<p>* Cracked&ndash;screen repair is only available in certain markets for select smartphones.</p>",
          "displayName": "Total Mobile Protection",
          "preSelected": false,
          "sfoSORId": "81503",
          "hasEcpdDiscount": false,
          "defaultDisplayFlag": false
        },
        {
          "sorSfoType": "INSUR,I",
          "priceTerm": "/mo",
          "sfoSkuId": "sku1230447",
          "price": "7.15",
          "wasPrice": 0,
          "introText": "<p>Next&ndash;day device replacement for loss, theft, &amp; damage and cracked screen repair as soon as same&ndash;day*.</p>\r<p>* Cracked&ndash;screen repair is only available in certain markets for select smartphones.</p>",
          "displayName": "Wireless Phone Protection",
          "preSelected": false,
          "sfoSORId": "81493",
          "hasEcpdDiscount": false,
          "defaultDisplayFlag": false
        },
        {
          "sorSfoType": "INSUR,G",
          "priceTerm": "/mo",
          "sfoSkuId": "sku401075",
          "price": "3.50",
          "wasPrice": 0,
          "introText": "100&#37; instant access to a Tech Coach expert with zero prompts, menus or transfers. Does not include support. ",
          "displayName": "Tech Coach",
          "preSelected": false,
          "sfoSORId": "77963",
          "hasEcpdDiscount": false,
          "defaultDisplayFlag": false
        },
        {
          "sorSfoType": "INSUR,D",
          "priceTerm": "/mo",
          "sfoSkuId": "sku401064",
          "price": "0.00",
          "wasPrice": 0,
          "introText": "<p>No device coverage plan for your device. If your device is lost, stolen, damaged (including liquid damage), or experiences a post&ndash;warranty defect, the replacement cost may be as high as the retail price.</p>",
          "displayName": "Decline Equipment Protection",
          "preSelected": false,
          "sfoSORId": "66332",
          "hasEcpdDiscount": false,
          "defaultDisplayFlag": false
        }
      ],
      "tapFeatureInfo": null,
      "tapExist": false,
      "tapEligible": false,
      "tapMsg": null,
      "tpmdHeader": null,
      "tpmdDescription": null,
      "tpmdButtonText": null
    },
    "cq": null,
    "saveUrl": "/digital/cart/getCompatiblePlans",
    "commerceItemId": "SDC214089848",
    "deviceSkuId": "sku2170533",
    "editProtection": false,
    "deviceProdId": "dev6720119",
    "legacyPlanFlag": true,
    "editCart": true
  },
  "ErrorMap": null,
  "statusMessage": "Service completed Successfully.",
  "statusCode": "00"
};
*/
exports.protectionJSON = protectionJSON;
