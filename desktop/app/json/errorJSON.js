const errorJSON = {"response":{  
   "output":null,
   "errorMap":{  
      "title":"Your request could not be processed at this time. Please try again later.",
      "message":"Your request could not be processed at this time. Please try again later.",
      "secondaryCTA":{  
         "label":"Home",
         "link":"/digital/smartphones",
         "ajaxUrl":"/digital/smartphones",
         "confirmRequired":true,
         "confirmationMessage":"Are you sure want to go your cart ?",
         "ajax":true
      },
      "primaryCTA":{  
         "label":"CART",
         "link":"/digital/smartphones",
         "ajaxUrl":"/digital/cart/getCartDetails",
         "confirmRequired":true,
         "confirmationMessage":"Are you sure want to go home page ?",
         "ajax":true
      }
   },
   "statusMessage":"Service failed",
   "statusCode":"01",
   "apiErrorMap":"java.util.concurrent.CompletionException"
}
};
export default errorJSON;