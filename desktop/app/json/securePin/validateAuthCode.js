exports.validateAuthCodeJSON = {
  "output": {
    "status": "success",
    "orderID": "s536701789",
    "reasonErrorCode": null,
    "reasonErrorMsg": null,
    "validAuthCode": true,
    "numOfAttempts": 1
  },
  "ErrorMap": null,
  "statusMessage": "Service completed Successfully.",
  "statusCode": "00"
};

exports.inValidAuthCodeJSON = {
  "output": {
    "status": "AUTH_CUST_VERIFICATION_ERROR",
    "orderID": "s538355091",
    "reasonErrorCode": "AUTH_CODE_VERIFICATION_ERROR",
    "reasonErrorMsg": "Unable to Verify Auth Code Currently",
    "validAuthCode": false,
    "numOfAttempts": 1
  },
  "ErrorMap": null,
  "statusMessage": "Service completed Successfully.",
  "statusCode": "00"
}

