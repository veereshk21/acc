exports.sendSMSJSON = {
  statusCode: '00',
  errorMap: null,
  output: {
    selectedMtn: '',
    success: true,
    orderID: 'O13784779205',
  },
  statusMessage: 'Service completed Successfully.',
};

exports.sendSMSValidateAuthCodeError = {
  "output": {
    "status": "AUTH_CUST_VERIFICATION_ERROR",
    "orderID": "s455619394",
    "reasonErrorCode": "AUTH_CODE_VERIFICATION_ERROR",
    "reasonErrorMsg": "Unable to Verify Auth Code Currently",
    "validAuthCode": false,
    "numOfAttempts": 1
  },
  "ErrorMap": null,
  "statusMessage": "Service completed Successfully.",
  "statusCode": "00"
};

