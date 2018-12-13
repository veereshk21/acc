/**
 * Created by hmahad on 16/06/17.
 */

var addPackageToCartJSON = {
  "output": {
    "errorDetails": {
      "header": "Incompatible SIM ID",
      "heading": "This SIM ID is incompatible with your device.",
      "subHeading": "To get a new SIM card mailed to you, go to our site and enter the device ID on the Bring Your Own Device Page. If you want it today, head to a Verizon store to pick one up.",
      "option": [
        {
          "optionText": "Try another ID",
          "optionURL": ""
        },
        {
          "optionText": "Get new SIM",
          "optionURL": "/digital/portin/prompt"
        }
      ]
    }
  },
  "ErrorMap": {
    " 47": "The SIM ID you entered is not valid."
  },
  "statusMessage": "Service Failed.",
  "statusCode": "01"
};

exports.addPackageToCartJSON = addPackageToCartJSON;
