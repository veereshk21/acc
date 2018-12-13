const cpcInterceptPromptJSON =
/*{
  "statusCode": "00",
  "errorMap": null,
  "statusMessage": null,
  "output": {
    "keepCurrentURL": "/od/cust/auth/keepCurrentPlan",
    "exploreTVPURL": "/od/cust/auth/compatiblePlans",
    "restrictedZipcodeMessage": "",
    "currentPlanDetails": {
      "currentPlanName": "The new Verizon Plan Small 2 GB",
      "monthlyAccessCost": "35.00",
      "monthlyAccessDiscountCost": "28.00",
      "totalMonthlyAccessCostForAllDevices": "76.00",
      "planCategoryCode": "56",
      "sorCollectionCode": "TV210"
    },
    "message": "",
    "showTVP": true,
    "showME": true,
    "showHLLP": false,
    "showKeepCurrent": true,
    "isHLLPlan": true,
    "selectPlanURL": "/od/cust/auth/selectPlan",
    "lineLevelPlanURL": "/digital/cpc/getAvailablePlan",
    "modifyExistingPlanUrl": "/od/cust/auth/modifyexitplan"
  }
};*/
{
  "statusCode": "00",
  "errorMap": null,
  "statusMessage": null,
  "output": {
    "singleDevicePlan": false,
    "dataOnlyPlan": false,
    "selectPlanURL": "/od/cust/auth/selectPlan",
    "keepCurrentURL": "/od/cust/auth/keepCurrentPlan",
    "exploreTVPURL": "/od/cust/auth/compatiblePlans",
    "exploreMMPlanURL": null,
    "modifyExistingPlanUrl": null,
    "showTVP": true,
    "showME": true,
    "showMM": true,
    "showKeepCurrent": true,
    "showMFilex": true,
    "restrictedMessage": "<p>Looks like you're adding another device to your account. To continue with your purchase, you'll need to select a new plan.</p><p>Dont worry, we have plenty of options to choose from.</p>",
    "currentPlanDetails": {
      "currentPlanName": "The new Verizon Plan Small 2 GB",
      "monthlyAccessCost": "35.00",
      "monthlyAccessDiscountCost": null,
      "totalMonthlyAccessCostForAllDevices": null,
      "monthlyLineAccessDetails": null,
      "planCategoryCode": "56",
      "sorCollectionCode": "TV210"
    }
  }
};

export default cpcInterceptPromptJSON;