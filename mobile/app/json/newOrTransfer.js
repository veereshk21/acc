const portInJSON = {
  "statusCode": null,
  "output": {
    "states": ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"],
    "portInDetailsVO": {
      "address1": "2611 CONTRA COSTA BLVD",
      "address2": "Address 2",
      "zipcode": "10000",
      "city": "PLEASANT HILL",
      "state": "LA",
      "existingNumber": "9999999999",
      "existingAccountNumber": "9999999998",
      "accountPin": "",
      "altContactNumber": "9999999997",
      "accountHolderName": "TEST"
    },
    "newNumberUrl": "/digital/checkout/npaNxxNumber",
    "transferSubmit": "/digital/portin/prompt/transfernumber"
  },
  "errorMap": null,
  "statusMessage": null
};

const cqJSON = {
  "html": {},
  "label": {
    "OD_PORTIN_PROMPT_TITLE": "Choose a new number or transfer an existing number from another carrier.",
    "OD_PORTIN_NEWNUMBER": "I want a new number",
    "OD_PORTIN_PROMPT_BACK": "Back",
    "OD_PORTIN_NUMBERTRANSFER_TITLE": "Transfer number from another carrier",
    "OD_PORTIN_PROMPT_SUB_TITLE": "",
    "OD_PORTIN_PROMPT_NEXT_CTA": "Continue",
    "OD_PORTIN_EXISTING_ACCOUNTNUMBER": "Existing Account Number",
    "OD_PORTIN_EXISTING_MOBILENUMBER": "Existing Mobile Number",
    "OD_PORTIN_ACCOUNT_PIN": "Account PIN",
    "OD_PORTIN_ACCOUNT_HOLDER_NAME": "Account Holder Name",
    "OD_PORTIN_CONTACT_PHONE_NUMBER": "Contact Phone Number",
    "OD_PORTIN_BILLING_ADDRESS_1": "Billing Address 1",
    "OD_PORTIN_BILLING_ADDRESS_2": "Billing Address 2",
    "OD_PORTIN_CITY": "City",
    "OD_PORTIN_ZIPCODE": "Zip Code",
    "OD_PORTIN_FORM_FIELD_REQUIRED_TEXT": "Required",
  },
  "error": {
    "OD_PORTIN_ADDRESS_UPDATE_FAILURE_TEXT": "We cannot validate the address. Plesase verify and correct your address.",
    "OD_PORTIN_INVALID_MOBILE_NUMBER": "Please enter a valid 10 digit phone number.",
    "OD_PORTIN_INVALID_ACCOUNT_NUMBER": "Please enter a valid account number.",
    "OD_PORTIN_INVALID_ACCOUNT_HOLDER_NAME": "Please enter a valid Account holder name.",
    "OD_PORTIN_INVALID_BILLING_ADDRESS": "Please enter a valid Billing address.",
    "OD_PORTIN_INVALID_ALTERNATE_NUMBER": "Please enter a valid 10 digit phone number.",
    "OD_PORTIN_INVALID_ZIP_CODE": "Please enter a 5-digit zipcode.",
    "OD_PORTIN_INVALID_CITY": "Please enter a valid city.",
    "OD_PORTIN_INVALID_STATE": "Please enter a state.",
  }
};
const tansferSubmit = {
  "output": null,
  "errorMap": {
    "99": "Your request could not be processed at this time. Please try again later."
  },
  "statusMessage": "Service completed Successfully.",
  "statusCode": "01"
};

exports.portInJSON = portInJSON;
exports.cqJSON = cqJSON;
exports.tansferSubmit = tansferSubmit;
