/**
 * Created by mambig on 1/13/17.
 */

const path = require('path');

/**
*
*
*Entry points for all the pages. For node-env keep only one path based on your need.
*
* pathName: path.join(cwd, 'path/to/app/index.js'),
*
* */
const cwd = process.cwd();

const pagesEntryPoints = {
  // aiExpressCheckout: path.join(cwd, 'app/js/aiExpressCheckout/index.js'),
  // aiExpressConfirmation: path.join(cwd, 'app/js/aiExpressConfirmation/index.js'),
    accGuestCheckout: path.join(cwd, 'app/js/accessoriesGuestCheckout/index.js'),
  // accGuestConfirmation: path.join(cwd, 'app/js/accessoriesGuestConfirmation/index.js'),
  // accountDeposit: path.join(cwd, 'app/js/accountDeposit/index.js'),
  // availabilityTimer: path.join(cwd, 'app/js/availabilityTimer/index.js'),
  // byod: path.join(cwd, 'app/js/Byod/index.js'),
  // cart: path.join(cwd, 'app/js/Cart/index.js'),
  // checkout: path.join(cwd, 'app/js/checkout/index.js'),
  // compatiblePlansChoice: path.join(cwd, 'app/js/compatiblePlansChoice/index.js'),
  // cpcInterceptPrompt: path.join(cwd, 'app/js/cpcInterceptPrompt/index.js'),
  // creditHold: path.join(cwd, 'app/js/creditHold/index.js'),
  // cpcPlanDecision: path.join(cwd, 'app/js/cpcPlanDecision/index.js'),
  // confirmation: path.join(cwd, 'app/js/confirmation_rd/index.js'),
  // downPayment: path.join(cwd, 'app/js/downPayment/index.js'),
  // error: path.join(cwd, 'app/js/ErrorPage/index.js'),
  // eNineEleven: path.join(cwd, 'app/js/eNineEleven/index.js'),
  // guestLogin: path.join(cwd, 'app/js/guestLogin/index.js'),
  // humConfig: path.join(cwd, 'app/js/humConfig/index.js'),
  // mdnSelection: path.join(cwd, 'app/js/MtnSelection/index.js'),
  // numShareSelectDevice: path.join(cwd, 'app/js/NumberShare_rd/index.js'),
  // orderFail: path.join(cwd, 'app/js/orderFail/index.js'),
  // protection: path.join(cwd, 'app/js/protection/index.js'),
  // storeRepId: path.join(cwd, 'app/js/storeRepId/index.js'),
  // pastDueBalance: path.join(cwd, 'app/js/PastDueBalance/index.js'),
  // instantCredit: path.join(cwd, 'app/js/instantCredit/index.js'),
  // promoInterceptor: path.join(cwd, 'app/js/PromoInterceptor/index.js'),
  // aalOffers: path.join(cwd, 'app/js/aalOffers/index.js'),
  // modEligible: path.join(cwd, 'app/js/modEligible/index.js'),
};

module.exports = pagesEntryPoints;
