const globalNavJSON = {
  "pageTitle": "SmartPhones",
  "icons": [
    {
      "name": "cart",
      "url": "/digital/cart/getCartDetails",
      "isShown": true
    },
    {
      "name": "search",
      "url": "/search",
      "isShown": false
    }
  ],
  "menuItems": [
    {
      "name": "Shop",
      "url": "/digital/shoplanding/",
      "isSelected": true,
      "isShown": true
    },
    {
      "name": "Shop Smartphones",
      "url": "/digital/smartphones/",
      "isSelected": false,
      "isShown": true
    },
    {
      "name": "Shop Tablets",
      "url": "/digital/tablets/",
      "isSelected": false,
      "isShown": true
    },
    {
      "name": "Support",
      "url": "/support",
      "isSelected": false,
      "isShown": true
    },
    {
      "name": "Bring Your Own Device",
      "url": "/bring-your-own-device",
      "isSelected": false,
      "isShown": true
    },
    {
      "name": "Store Locator",
      "url": "/stores",
      "isSelected": false,
      "isShown": true
    },
    {
      "name": "My Verizon",
      "url": "https://login.verizonwireless.com/amserver/UI/Login?realm=vzw&goto=https%3A%2F%2Fmyaccount.verizonwireless.com%3A443%2Fclp%2Flogin%3Fredirect%3D%2Fmyv%2Foverview",
      "isSelected": false,
      "isShown": true,
      "subItems": null
    }
  ],
  "signout": {
    "text": "Signout",
    "url": "/digital/logout",
    "isShown": true,
    "isLoggedIn": "true"
  },
  "feedback": {
    "text": "Feedback",
    "url": "/feedback",
    "isShown": true
  },
  "espanol": {
    "text": "EspaC1ol",
    "url": "https://espanol.vzw.com/enes/b2c/index.html",
    "isShown": false
  },
  "showBusinessAndResidential": false,
  "business": {
    "text": "Business",
    "url": "http://www.verizon.com/home/verizonglobalhome/ghp_business.aspx"
  },
  "residential": {
    "text": "Residential",
    "url": "http://www.verizon.com/?lid=//global//residential"
  }
};

export default globalNavJSON;
