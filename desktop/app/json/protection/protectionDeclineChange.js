/**
 * Created by mambig on 6/5/17.
 */
const protectionJSON = 

{
  "output": {
    "mtnDeviceInfo": {
      "mtn": null,
      "equipmentProtectionList": [        
        {
          "sorSfoType": "INSUR,D",
          "priceTerm": "/mo",
          "sfoSkuId": "sku401064",
          "price": "0.00",
          "wasPrice": "0.00",
          "introText": "If your device is lost, stolen, damaged, or experiences a post&ndash;warranty defect, the replacement cost may be as high as the retail price. You only have 30 days to enroll in coverage after your device activation.",
          "displayName": "Decline Equipment Protection",
          "preSelected": true,
          "sfoSORId": "66332",
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
    }
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
