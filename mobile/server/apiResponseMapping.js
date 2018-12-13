/**
 * Format:
 * {
 *  endPoint = apiEndpoint
 *  fileName = mockJSONFile.js
 *  fields: expectedResKey
 * }
 * Field(s):
 *      deviceSelectView = to get only a specific key
 *      *     = to get and load all the keys
 *      deviceSelectView, cqJSON = to get multiple keys
 *
 * TODO: querySting based & HTTP filters
 *
 * NOTE: Restart Dev server whenever this file is modified
 */

const apiMapping = [
  /* Trade-in JSON */
  {
    endPoint: '/digital/tradein/questionnaire/',
    fileName: 'tradeinJSON.js',
    fields: 'onSelectedDeviceAjaxResponse',
  },
  {
    endPoint: "/digital/tradein/questionsAjax",
    fileName: "tradeinJSON.js",
    fields: "questionsAjaxResponse"
  },
  // Appraisal submit response
  {
    endPoint: '/digital/tradein/creditAjax',
    fileName: 'tradeinJSON.js',
    fields: 'outputForCredit',
  },
  {
    endPoint: '/digital/device/getPromotions',
    fileName: 'promosResponse.js',
    fields: 'promotions',
  },
  {
    endPoint: '/digital/cart/getCompatibleFeatures',
    fileName: 'protectionJSON.js',
    fields: 'protections',
  },
  {
    endPoint: '/od/cust/auth/checkout/updatePaymentInfo',
    fileName: 'updatePaymentInfo.js',
    fields: 'updatePaymentInfo',
  },
  {
    endPoint: '/od/cust/auth/checkout/handleCardinal3DResponse',
    fileName: 'updatePaymentInfo.js',
    fields: 'update3DSecure',
  },
  {
    endPoint: '/digital/checkout/initiateCheckout',
    fileName: 'initiateCheckout.js',
    fields: 'initiateCheckout',
  },
  {
    endPoint: "/od/cust/auth/checkout/storeDetails",
    fileName: "storeDetailsJSON.js",
    fields: "storeDetails"
  },
  {
    endPoint: "/digital/checkout/fetchSMSEnabledDevices",
    fileName: "fetchSMSEnabledDevices.js",
    fields: "fetchJSON"
  },
  // Send SMS flow
  {
    endPoint: "/od/cust/auth/checkout/sendSMS",
    fileName: "sendSMS.js",
    fields: "sendSMSJSON"
  },
  {
    endPoint: "/digital/checkout/validateAuthCode",
    fileName: "sendSMS.js",
    fields: "sendSMSValidateAuthCodeError"
  },
  // Cart responses
  {
    endPoint: "/od/cust/auth/cart/clearCart",
    fileName: "clearCartJSON.js",
    fields: "clearCartResponse"
  },
  // Accessories responses
  {
    endPoint: "/digital/cart/addOrRemoveAccessory",
    fileName: "accessoriesJSON.js",
    fields: "addToCartResponse"
  },

  /**
   * Added for iconic
   * */

  {
    endPoint: '/od/cust/auth/expressrio',
    fileName: 'expressrio.js',
    fields: 'expressrio'
  },
  {
    endPoint: '/od/cust/auth/expresspromo',
    fileName: 'expresspromo.js',
    fields: 'expresspromo'
  },
  {
    endPoint: '/od/cust/auth/inventory',
    fileName: 'inventory.js',
    fields: 'inventory'
  },
  {
    endPoint: '/od/cust/auth/moredetails',
    fileName: 'iconicexpressconfigmoredetails.js',
    fields: 'moredetails'
  },

  {
    endPoint: '/od/cust/auth/hum/makes',
    fileName: 'humConfig/makes.js',
    fields: 'makesJSON'
  },
  {
    endPoint: '/od/cust/auth/hum/models',
    fileName: 'humConfig/models.js',
    fields: 'modelsJSON'
  },
  {
    endPoint: '/od/cust/auth/iscompatiblevehicle',
    fileName: 'humConfig/vehicleCompatibilityCheck.js',
    fields: 'vehicleCompatibilityCheck'
  },
  {
    endPoint: '/od/cust/auth/emailaddresscheck',
    fileName: 'humConfig/emailaddresscheck.js',
    fields: 'emailaddresscheck3'
  },
  {
    endPoint: '/od/cust/auth/protection/addUpdatePlanFeature/',
    fileName: 'humConfig/addUpdatePlanFeature.js',
    fields: 'addUpdatePlanFeature2'
  },
  {
    endPoint: '/od/cust/auth/mtnDetail/json',
    fileName: 'mtnSelection/mtnDetailAjax.js',
    fields: 'mtnDetailAjax'
  },
  {
    endPoint: '/od/cust/auth/checkout/fetchSMSEnabledDevices',
    fileName: 'securepin.js',
    fields: 'securepin'
  },
  {
    endPoint: '/content/wcms/one-digital/global-header/prospect.globalheader.json',
    fileName: 'gnav.js',
    fields: 'gNavHeaderJSON'
  },
  {
    endPoint: '/content/wcms/one-digital/global-header/800002/prospect.globalheader.json',
    fileName: 'gnav.js',
    fields: 'gNavAgentHeaderJSON'
  },
  {
    endPoint: '/od/cust/auth/comparePlan',
    fileName: 'comparePlan.js',
    fields: 'comparePlan'
  },
  {
    endPoint: '/od/cust/auth/submitaddaline',
    fileName: 'addline.js',
    fields: 'addline'
  },
  {
    endPoint: '/od/cust/auth/submitSummary',
    fileName: 'mtnSelection/submitSummary.js',
    fields: 'submitSummary'
  },
  {
    endPoint: "/od/cust/auth/byod/validateIMEI",
    fileName: "validateByod.js",
    fields: "imei"
  },
  {
    endPoint: "/od/cust/auth/byod/validateSIM",
    fileName: "validateByod.js",
    fields: "sim"
  },
  {
    endPoint: "/od/cust/auth/byod/addNewSIM",
    fileName: "validateByod.js",
    fields: "addsim"
  },
  {
    endPoint: "/od/cust/auth/byod/skipSIM",
    fileName: "validateByod.js",
    fields: "skipSim"
  },
  {
    endPoint: "/od/cust/auth/byod/searchDevices/responselist",
    fileName: "search.js",
    fields: "search"
  },
  {
    endPoint: "/od/cust/auth/byod/searchDevices/responsebrands",
    fileName: "search.js",
    fields: "brands"
  },
  {
    endPoint: "/od/cust/auth/byod/searchDevices/responsedevices",
    fileName: "search.js",
    fields: "devices"
  },


  //StoreRepId
  {
    endPoint: '/od/cust/auth/validateSalesRepId',
    fileName: 'storeRepId/validateRepId.js',
    fields: 'storeRepIdSuccessJSON'
  },
  {
    endPoint: '/od/cust/auth/checkout/npaNxxNumberZipCode',
    fileName: 'npanxxJSON.js',
    fields: 'npanxxJSON'
  },
  // Checkout
  {
    endPoint: '/od/cust/auth/checkout/updateShippingInfo',
    fileName: 'accCheckout/reviewOrder.js',
    fields: 'updateShippingInfo'
  },
  // cost clarifier
  {
    endPoint: "/od/cust/auth/costClarifier",
    fileName: "costClarifierJSON.js",
    fields: "costClarifierJSON"
  },
  // update state
  {
    endPoint: "/od/cust/auth/nbs/seeBillChange",
    fileName: "costClarifierJSON.js",
    fields: "updateStateJSON"
  },
  {
    endPoint: "/od/cust/auth/getPromoDetails/promoId=123",
    fileName: "promoInterceptor/promoDetailsJSON.js",
    fields: "promoDetailsBogoJSON"
  },
  {
    endPoint: "/od/cust/auth/getPromoDetails/promoId=456",
    fileName: "promoInterceptor/promoDetailsJSON.js",
    fields: "promoDetailsTradeInJSON"
  }
];


module.exports = apiMapping;
