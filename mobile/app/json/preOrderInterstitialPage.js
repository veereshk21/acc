/**
 * Created by santhra  on 6/15/2017.
 */
const preOrderInterstitialJSON ={
  "ResponseInfo": {
    "locale": "EN",
    "type": "Success",
    "server": "twswcvfszwd21.tdc.vzwcorp.com-srv01_nmobilefirst01",
    "buildNumber": "11878",
    "requestId": "dd0f3add-cdd7-4d44-93ed-c0148ae19d18",
    "code": "00000",
    "message": "0",
    "userMessage": "0"
  },
  "Page": {
    "pageType": "preOrderInterstitialPage",
    "ButtonMap": {
      "PrimaryButton": {
        "presentationStyle": "push",
        "tryToReplaceFirst": false,
        "disableAction": false,
        "selected": false,
        "pageType": "preOrderProductLandingPage",
        "appContext": "mobileFirstSS",
        "actionType": "openPage",
        "title": "Get started",
        "isSelected": false,
        "redirectURL":"/nextPage"
      },
      "SecondaryButton": {
        "presentationStyle": "root",
        "tryToReplaceFirst": false,
        "disableAction": false,
        "selected": false,
        "pageType": "launchApp",
        "appContext": "mobileFirstSS",
        "actionType": "restart",
        "title": "Not now",
        "isSelected": false,
        "redirectURL":"/nextPage",
        "extraParameters": {
          "continueToApp": "true"
        }
      }
    },
    "ResponseInfo": {
      "locale": "EN",
      "type": "Success",
      "code": "00000",
      "message": "SUCCESS",
      "userMessage": "SUCCESS"
    },
    "imageURL": "https://mobile.vzw.com/hybridClient/is/image/VerizonWireless/samsung-note7-blue-front",
    "message": "Switch to unlimited and trade in to save.",
    "title": "Save big on the iPhone 7.\nGet it from $25/mo."
  }
};


export default preOrderInterstitialJSON;