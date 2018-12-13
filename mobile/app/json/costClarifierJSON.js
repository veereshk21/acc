exports.costClarifierJSON = {
  "output": {
      "showBillChanges": false,
      "dueTodayPrice": "20.00",
      "dueMonthlyPrice": "30.00",
      "currentBillPrice": "90.00",
      "newBillPrice": "130.00",
      "flow": "AAL",
      "nextBill": "130.00", // only for AAL
      "deltaPrice": "40.00",
      "deviceName": "iphone x",
      "seeBillChangeUrl": "/od/cust/auth/nbs/seeBillChange",
      "diffPriceMessage":"Because you’re adding a new line with iphone x your bill will be",
      "newDeviceLegalText":"Just so you know, you’ll see one-time charges on your next bill that’ll apply to that month only. This may include activation fees and pro-ration charges once your new device is activated. The estimated totals above already include monthly taxes, surcharges or additional fees.",
      "mtn":"123-456-7890",
      "purchasePathMessage":"You’re upgrading a line."
  },
  "errorMap": null,
  "statusMessage": "addUpdateAccessory",
  "statusCode": "00"
};

exports.updateStateJSON = {
	"output": {
		"errorMap": null,
		"statusMessage": "updateState",
		"statusCode": "00"
	}
};
