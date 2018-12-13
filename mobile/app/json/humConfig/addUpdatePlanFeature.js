//Hum account does not exist for the email(Email check success) & Plan is compatible:
exports.addUpdatePlanFeature =
{
  "output": {
    "redirectUrl": "/od/cust/auth/cart/getCartDetails",
    "commerceItemId": "Sdad99a9aa027c68d6a0e9791440a84f9{ss100}_device_1",
    "orderId": "Sdad99a9aa027c68d6a0e9791440a84f9{ss100}",
    "addPlanFeatureFlg": "true",
    "addPlanFlg": null
  },
  "errorMap": null,
  "statusMessage": "Add Update Feature",
  "statusCode": "00"
};

//Hum account already exist for email:
exports.addUpdatePlanFeature2 =
{
  "output": {
    "redirectUrl": "https://www.hum.com",
    "commerceItemId": "",
    "orderId": "",
    "addPlanFeatureFlg": "true",
    "addPlanFlg": null
  },
  "errorMap": ["This email is already registered. To continue with this email please go to the hum website, else select a different email address"],
  "statusMessage": "Add Update Feature",
  "statusCode": "00"
};

//Hum account does not exist for the email(Email check success) & Plan is not compatible:
exports.addUpdatePlanFeature3 =
{
  "output": {
    "redirectUrl": "/od/cust/auth/cpc/",
    "commerceItemId": "",
    "orderId": "",
    "addPlanFeatureFlg": "true",
   "addPlanFlg": null
  },
  "errorMap": null,
  "statusMessage": "Add Update Feature",
  "statusCode": "00"
};
