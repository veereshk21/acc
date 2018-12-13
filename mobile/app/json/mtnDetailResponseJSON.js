/**
 * Created by amuru1 on 7/10/2017.
 */

var mtnDetailResponse = {
  "statusCode": "00",
  "errorMap": null,
  "output": {
    "mtnDetailsList": [{
      "upgradeEligbile": true,
      "displayMtn": "704.575.7744",
      "mtn": "7045757744",
      "encryptedMTN": "fNz3h89vb0PL5qyZseKh/Q==",
      "upgradeMessage": null,
      "nickname": "KENNY S GRADY-7744",
      "imageUrl": "https://ss7.vzw.com/is/image/VerizonWireless/iphone6s-spgry-front?$device-thumb$",
      "inEligibleCode": null,
      "inEligibleDetails": null,
      "loanInfo": {
        "title": "Want to upgrade early?",
        "subtitle": "You're $672.94 into paying off your current device",
        "paidToDate": "$672.94 Paid to date",
        "totalPrice": "$849.99 total price",
        "returnOptionTitle": "Return your device",
        "returnOptionDescription": "If your device is working properly, send it in after you upgrade and you're all set",
        "keepOptionTitle": "Pay $177.05 and Keep your device",
        "keepOptionDescription": "Pay off your remaining balance and keep your old device",
        "edgeUpRequiredPercentage": 50,
        "paidAmountPercentage": "79.0",
        "upgradeSummary": null,
        "deviceAgreementText": "Check out your full Device Payment Agreement online at MyVerizon.com.",
        "deviceAgreementLink": null
      },
      "annualUpgradeMessage": null,
      "deviceType": "Smartphone",
      "familyType": "Phone",
      "familyTypeRestricted": false,
      "contractTermMisMatch": false,
      "brand": "Apple",
      "deviceId": "353263070219900",
      "twoYearContract": null,
      "annualUpgrade": false,
      "displayDeviceName": "Apple&reg; iPhone&reg; 6s 128GB in Space Gray",
      "deviceName": "iPhone 6S 128GB Space Gray",
      "eligibleUpgradeTypeList": ["Retail", "Edge", "2 Year"],
      "mtnAddedToTheCart": false,
      "alwaysEligibleForUpgrade": false,
      "annualUpgradeWarning": false
    }],
    "accountLevelInEligibleCode": null,
    "accountLevelInEligibleMessage": null,
    "selectedMTN": null,
    "aalRedirect": null,
    "accountLevelInEligibleDetails": null,
    "cartRedirect": "/od/cust/auth/cart/getCartDetails",
    "shopLandingRedirect": "/od/cust/auth/shoplanding/",
    "mtnMainTitle": "Would you like to upgrade another line?",
    "unlimitedPlan": "N",
    "pastDueDetails": null,
    "aalboxEnable": true,
    "aalAllowed": false
  },
  "ajaxCallUrl": "/od/cust/auth/submitSummary",
  "ajaxCallSelectedMTN": "/od/cust/auth/mtnDetail/json?flow=EUP&t="
}


export default mtnDetailResponse;
