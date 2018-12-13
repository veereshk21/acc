/**
 * Created by mambig on 6/5/17.
 */
const modCheckJSON = 

/*
{
  "output": {
    "redirectionURL": "/od/cust/auth/shop?modDeviceOnly=true&flow=AAL",
    "noThanksURL": null,
    "deviceInfo": {
      "ctaText": "<span>Add to cart</span>",
      "deviceImgURL": "//ss7.vzw.com/is/image/VerizonWireless/BrandLogos-MOTOROLA-Retina-COLOR?$nav-ml-retina$",
      "dueTodayPrice": "0.00",
      "description": "<span>Experience the revolutionary speed of 5G with the 5G moto mod. Choose any Verizon Unlimited plan for your moto z<sup>3</sup> to get it.</span>",
      "title": "<span>You qualify for a 5G moto mod with your z<sup>3</sup></span>",
      "deviceName": "5G Test Device",
      "deviceBrand": null,
      "dueMonthlyPrice": "$0.00/mo after 3 months free"
    },
    
  },
  "errorMap": {
    "statusText": "SUCCESS"
  },
  "statusMessage": "Service completed Successfully.",
  "statusCode": "03"
};
*/


{
	"output": {
		"redirectionURL": "/od/cust/auth/addModDevice",
		"deviceInfo": {
			"ctaText": "Add to cart",
			"deviceImgURL": "https://ss7.vzw.com/is/image/VerizonWireless/palm-dubs-gold?$device-lg$",
			"dueTodayPrice": "$50.00",
			"description": "<span>Experience the revolutionary speed of 5G with the 5G moto mod. Choose any Verizon Unlimited plan for your moto z<sup>3</sup> to get it.</span>",
			"title": "<span>You qualify for a 5G moto mod with your z<sup>3</sup></span>",
			"deviceName": "5G MOTO MOD",
			"dueMonthlyPrice": "$10.00/mo after 3 months free",
			"deviceBrand": "Motorola",
			"noThanksText": "No, thanks"
		},
		"noThanksURL": "/od/cust/auth/protection"
	},
	"statusMessage": "Service completed Successfully.",
	"statusCode": "03",
	"errorMap": {
		"statusText": "SUCCESS"
	}
};
export default modCheckJSON;
