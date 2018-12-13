/**
 * Created by amuru1 on 7/14/2017.
 */
var planCompareJSON = {
  "statusCode": '00',
  "errorMap": null,
  "statusMessage": 'Service completed Successfully.',
  "output": {
    "learnMoreDetails": "",
    "planDescription": "After 22GB",
    "additionalPlanDetails": "",
    "plans": [
      {
        "plan_letter": "L",
        "plan_size": "8GB",
        "plan_amount": "65.00",
        "plan_sku": "sku2310053"
      },
      {
        "plan_letter": "U",
        "plan_size": "Unlimited",
        "plan_amount": "175.00",
        "plan_sku": "sku2310054"
      }
    ],
    "features": [
      {
        "title": "The Verizon Plan",
        "description": {
          "title": null,
          "value1": "$75.00",
          "value2": "$110.00"
        },
        "subDescription": {
          "title": null,
          "value1": "8GB",
          "value2": "Unlimtied data"
        },
        "breakdowns": null
      },
      {
        "title": "Line Access Charges",
        "description": {
          "title": null,
          "value1": "$60.00",
          "value2": "$60.00"
        },
        "subDescription": null,
        "breakdowns": [
          {
            "title": "Sarah's Iphone",
            "value1": "$20.00",
            "value2": "$20.00"
          },
          {
            "title": "Daniel's Iphone",
            "value1": "$20.00",
            "value2": "$20.00"
          }
        ]
      },
      {
        "title": "Applied Discounts",
        "description": {
          "title": null,
          "value1": "-$60.00",
          "value2": "$0.00"
        },
        "subDescription": null,
        "breakdowns": [
          {
            "title": "Employee discount",
            "value1": "-$60.00",
            "value2": "Not eligible"
          }
        ]
      }
    ],
    "actionURL": ""
  }
};

export default planCompareJSON;
