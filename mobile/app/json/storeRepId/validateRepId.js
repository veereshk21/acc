exports.storeRepIdSuccessJSON = {
  "output": {
    "salesRepGivenName": "ALEJANDRO",
    "validSalesRepId": true,
    "redirectURL": "smartphones"
  },
  "errorMap": null,
  "statusMessage": "Service completed Successfully.",
  "statusCode": "00",
};

exports.storeRepIdFailureJSON = {
  "output": null,
  "errorMap": {
    "99": "We are unable to validate the Rep Id. Click 'Continue', if you like to proceed"
  },
  "statusMessage": "Service completed Successfully.",
  "statusCode": "01",
};

// export {storeRepIdSuccessJSON, storeRepIdFailureJSON};
