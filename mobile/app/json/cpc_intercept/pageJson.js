const cpcInterceptPromptJSON = {
  "statusCode": "00",
  "errorMap": null,
  "statusMessage": null,
  "output": {
    "singleDevicePlan": false,
    "dataOnlyPlan": false,
    "selectPlanURL": "/od/cust/auth/selectPlan",
    "keepCurrentURL": "/od/cust/auth/keepCurrentPlan",
    "exploreTVPURL": "/od/cust/auth/compatiblePlans",
    "exploreMMPlanURL": "//localhost:9092/digital/cpc/cpcExploreMMPlan",
    "modifyExistingPlanUrl": "/od/cust/auth/planListing",
    "showTVP": true,
    "showME": false,
    "showMM": true,
    "showKeepCurrent": true,
    "showMFilex": false,
    "showALPPlan": false,
    "restrictedMessage": "",
    "currentPlanDetails": {
      "currentPlanName": "The new Verizon Plan Large 8 GB",
      "monthlyAccessCost": "70.00",
      "monthlyAccessDiscountCost": null,
      "totalMonthlyAccessCostForAllDevices": null,
      "monthlyLineAccessDetails": null,
      "planLetter": "L",
      "planSize": "8",
      "unitOfMeasure": "GB",
      "allowance": "8",
      "planCategoryCode": "56",
      "sorCollectionCode": "TV210",
      "currentPlanId": "96328"
    },
    "inlinePrompt": true,

  }
}
export default cpcInterceptPromptJSON;
