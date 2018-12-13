/**
 * Created by hmahad on 1/18/2017.
 */
const cartJSON = {
  orderId: 'O12487028541',
  redirectionURL: null, /* ~In case when device removed and only accessories is left redirect to accessories cart*/
  isPOBODeviceInCart: false, /* POBO = Preorder or Backorder */
  dueTodayPOBOHeader: "What you'll pay when it ships",
  items: [
    {
      deviceProdId: 'dev6640012',
      deviceManufactureName: 'Apple',
      deviceProductDisplayName: 'iPhone&reg; 7',
      colorName: 'Apple Black',
      capacity: '32GB',
      flow: 'EUP',
      mtn: '9224636928', /* for AAL please place npaNxxnumber in this field*/
      deviceImageUrl: 'https://mobile.vzw.com/hybridClient/is/image/VerizonWireless/iphone7-front-matblk?$device-mini$',
      activationFee: 0.0,
      waivedActivationFeePromo: false,
      upgradeFee: 0.0,
      waivedUpgradeFeePromo: false,
      edgeDevice: true, /* for DPP orders*/
      price: 100.00, /* will be the final price the user has to pay regardless of discounts or contract term (may be retail/2yr/monthly charge)*/
      priceText: 'Device Payment',
      priceSubTitle: 'For 24 months 0% APR. Retail Price: $649.99',
      edgeItemDownPaymentAmount: 0,
      installmentBalance: 0.0, /* To clarify whether it is the same as deviceEdgeBuyOutAmount*/
      deviceEdgeUpAmount: 0.0,
      deviceEdgeBuyOutAmount: 0.0,
      protectionOption: {
        name: 'Decline Equipment Protection',
        price: 0.0,
        featureType: 'INSURANCE',
      },
      commerceItemId: 'ODC8217322452',
      deviceSkuId: 'sku2150056',
      deviceSORId: 'MNAC2LL/A',
      lacPrice: 20.00,
      lacText: 'Smartphone line acess', /* smartphone keyword should be dynamically determined in the backend*/
      inventoryStatus: 'InStock', /* Preorder,Backorder */
      inventoryAvailableDate: null,
      hasEcpdDiscount: true,
      hasEcpdDiscountForDevicePayment: false,
      devicePromotionList: [{
        promotionalMessage: 'SAVE $200 ON IPAD WITH PURCHASE OF IPHONE',
      }],

      bicOfferApplied: true,
      bicContractPrice: 7.0, /* was promo price */
      bicDiscountedContractPrice: 0.0, /* final promo price */
      bicSavings: 7.0, /* how much is the savings*/
      bicMessage: 'Congratulations! You are getting this device for $0.00/mo instead of $7.00/mo. Credit of $7.00/mo begins w/in 2-3 cycles.',
      bicMessagetooltip: '$7.00/mo less $7.00/mo bill credit for 24 mos; 0% APR. Bill credits end when balance is paid. Line must remain in good standing.',
    },
  ],
  "accessories":[
      {
        "scene7ImageUrl":"https://ss7.vzw.com/is/image/VerizonWireless/vzw-2-4a-apple-lightning-travel-charger-tvl24lght-m-iset?$gg-cart-th$",
        "name":"Lightning Wall Charger",
        "quantity":1,
        "commerceItemId":"SDC204560262",
        "color":null,
        "size":null,
        "inventoryStatus":"InStock",
        "inventoryAvailableDate":null,
        "prodId":"acc6880031",
        "skuId":"sku2180059",
        "sorId":"TVL24LGHT-M",
        "hasEcpdDiscount":true,
        "imageUrl":"https://ss7.vzw.com/is/image/VerizonWireless/vzw-2-4a-apple-lightning-travel-charger-tvl24lght-m-iset?$acc-mini$",
        "hasBogoDiscount":false,
        "price":22.49,
        "wasPrice":29.99,
        "discounted":true,
        "discountPercentage":25.008336112037348,
        "discountPrice":22.49
      },
      {
        "scene7ImageUrl":"https://ss7.vzw.com/is/image/VerizonWireless/iph5s1pkgsp-temperedglass?$gg-cart-th$",
        "name":"Tempered Glass Screen Protector for iPhone&reg; 5/5s/5C/SE",
        "quantity":1,
        "commerceItemId":"SDC204560263",
        "color":null,
        "size":null,
        "inventoryStatus":"InStock",
        "inventoryAvailableDate":null,
        "prodId":"acc1440030",
        "skuId":"sku527268",
        "sorId":"IPH5S1PKGSP",
        "hasEcpdDiscount":true,
        "imageUrl":"https://ss7.vzw.com/is/image/VerizonWireless/iph5s1pkgsp-temperedglass?$acc-mini$",
        "hasBogoDiscount":false,
        "price":18.75,
        "wasPrice":25.0,
        "discounted":true,
        "discountPercentage":25.0,
        "discountPrice":18.75
      }
    ],
  taxDetails: {
    taxPrice: 50.5,
    cityStateString: 'Monroe Township, NJ',
    stateTaxLabel: 'Est. Government Sales Tax',
    zipCode: '08854',
  },
  totalDueToday: 200.98,
  totalDueMonthly: 120.0,
  employeeDiscount: 100.0,
  pastDueBalance: 0.0,
  emptyCartFlag: false,     /* denotes if the cart is empty*/
  edgeContractDeviceInCart: false,
  totalEdgeUpAmount: 0.0,
  totalEdgeUpBuyOutAmount: 0.0,
  totalEdgeOrderDownPayment: null,
  tradeInCredit: 200.00,
  tradeInPromoDetails: {
    success: true, /* TBD*/
    errorMessage: null, /* TBD*/
    warningMessage: null, /* TBD*/
    promoCodeError: null, /* TBD*/

    deviceId: '358572079023053',
    modelImage: 'https://mobile.vzw.com/hybridClient/is/image/VerizonWireless/iphone6s-svr-front?$device-thumb$',
    displayName: 'iPhone&reg; 6s',
    color: 'Silver',
    size: '16GB',
    mtn: '7328102979',
    nickName: 'BIBHU PRASAD MAHAPATRA',
    tradeInDeviceHeaderMsg: 'Your $17.08/mo credit will start in 2-3 bills.',
    tradeInDeviceDppMsg: "You 'll get $409.99 applied as $17.08 monthly credit for 24 months", /* There may be a promotional value which will include a strikeout (see comps page 103)*/
    tradeInDeviceFooter: 'This is just an estimate until we get your phone and can check it out.',
    dppCredit: '17.08',
  },
  promotionList: [
  ],
  cartMessages: {
    cartReadyforCheckout: true,
    Code: null,
    Message: null,
  },
  cartItemCount: 3,                    /* ~Cart Item count*/
  mailInRebateTotal: 200.00,    /* ~Mail in rebate amount in cart summary*/
  mailInRebateDetails: {
    mailInRebateHeader: 'Mail it in, get money back.',
    mailInRebateSubTitle: 'When you send in proof of your purchase ....',
    mailInRebateAmountText: 'Mail-In Rebate',
    mailInRebateItems: [{
      deviceName: 'Apple iPhone 6s',
      capacity: '16 GB',
      color: 'Rose Gold',
      rebateAmount: 100.00,
    }, {
      deviceName: 'Apple iPhone 7',
      capacity: '16 GB',
      color: 'Jet Black',
      rebateAmount: 0.00,
    }],
  },
  promoCodes: [
    'SPRING10',
    'WINTER10',
  ],
  promoCodeHeader: 'Promo Code? Lucky you.',
  promoCodeLabel: 'Promo code',
  addAnotherPromoCodeText: 'Add another promo code',
  applyBtn: 'Apply',
  emptyCartMessage: 'There are no items in your cart',
  shopBtn: 'Shop',
  tradeInPromoEligible: true, /* NEWKEY - determines if trade in segment should be shown in cart summary */
  eligibleForSingleDeviceRibbon: false, /* */
  eligibleForMultiDeviceAllocation: false, /* */
  retrieveCartSuccessful: false, /* denotes cart retreival status*/
  standaloneAccessories: false,
  dueTodayText: 'Due Today',
  dueMonthlyText: 'Due Monthly',
  mainCartHeader: 'Time to review your cart',
  mainCartSubTitle: 'Enjoy free 2 day shipping',
  shopMoreBtnText: 'Shop more',
  checkoutBtn: 'Checkout',
  editBtn: 'Edit',
  removeLinkText: ' Remove',
  mainCartFooterText: 'Want to start over?',
  mainCartFooterLinkText: ' Empty your cart',
  shopMoreLink: '/vzw/devices/',   /* ~Link for shop more*/
  activationFeeText: 'Activation Fee',
  waivedActivationText: 'Waived Activation Fee',
  upgradeFeeText: 'Upgrade Fee',
  waivedUpgradeFeeText: 'Waived Upgrade Fee',
  saveBtnLabel: 'Save', /* To be used in zipcode Save BTn*/
  zipCodeHeader: 'Please enter a new ZIP code',
  tradeInCreditHeader: 'Trade in credit for this device',
  tradeInFooterLink: 'Tell me more',
  tradeInOfferDetailsHeader: 'Offer Details',
  tradeInOfferDetailsMsg: 'long block of text',
  tradeInConfirmationBtn: 'Got it',
};

export default cartJSON;
