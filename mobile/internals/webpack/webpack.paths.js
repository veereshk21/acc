/**
 * Created by mambig on 1/13/17.
 */

const path = require('path');

/**
*
*Entry points for all the pages. For node-env keep only one path based on your need.
*
* */
const cwd = process.cwd();

const pagesEntryPoints = {
  // accessories: path.join(cwd, 'app/js/accessories/index.js'), //migrated
  // mdnSelection: path.join(cwd, 'app/js/mdnSelection/index.js'), //migrated
  // cart: path.join(cwd, 'app/js/Cart/index.js'), // migrated
  // accountDeposit: path.join(cwd, 'app/js/accountDeposit/index.js'), //migrated
  // accessoriesPdp: path.join(cwd, 'app/js/accessoriesPdp/index.js'), //migrated
  // expressConfig: path.join(cwd, 'app/js/expressConfig/index.js'), //migrated
  // addDeviceOffer: path.join(cwd, 'app/js/addDeviceOffer/index.js'), //migrated
  // homepage: path.join(cwd, 'app/js/HomePage/index.js'), //migrated
  // error: path.join(cwd, 'app/js/ErrorPage/index.js'), //migrated
  // orderFail: path.join(cwd, 'app/js/orderFail/index.js'), //migrated
  // numberSharePrompt: path.join(cwd, 'app/js/numberSharePrompt/index.js'), //migrated
  // numShareSelectDevice: path.join(cwd, 'app/js/numShareSelectDevice/index.js'), //migrated
  // protection: path.join(cwd, 'app/js/protection/index.js'), //migrated
  // pastDueBalance: path.join(cwd, 'app/js/pastDueBalance/index.js'), //migrated
  // preOrderPlanSelection: path.join(cwd, 'app/js/planSelection/index.js'), //migrated
  // npanxx: path.join(cwd, 'app/js/npanxx/index.js'), //migrated
  // newOrTransfer: path.join(cwd, 'app/js/NewOrTransfer/index.js'), //migrated
  // myOffers: path.join(cwd, 'app/js/myOffers/index.js'), //migrated
  // interstitialPage: path.join(cwd, 'app/js/interstitialPage/index.js'), //migrated
  // expressRio: path.join(cwd, 'app/js/expressRio/index.js'), //migrated
  // compatiblePlansChoice: path.join(cwd, 'app/js/compatiblePlansChoice/index.js'), //migrated
  // cpcInterceptPrompt: path.join(cwd, 'app/js/cpcInterceptPrompt/index.js'), //migrated
  // cpcPlanDecision: path.join(cwd, 'app/js/cpcPlanDecision/index.js'), //migrated
  // cpcPrompt: path.join(cwd, 'app/js/cpcPrompt/index.js'), //migrated
  // humConfig: path.join(cwd, 'app/js/humConfig/index.js'), //migrated
  // eNineEleven: path.join(cwd, 'app/js/eNineEleven/index.js'), //migrated
  // checkout: path.join(cwd, 'app/js/checkout/index.js'), //migrated
  // securePin: path.join(cwd, 'app/js/securePIN/index.js'), //migrated
  // confirmation: path.join(cwd, 'app/js/confirmation/index.js'), //migrated
  // downPayment: path.join(cwd, 'app/js/downPayment/index.js'), //migrated
  // rtdOffers: path.join(cwd, 'app/js/rtdOffers/index.js'),
  // creditHoldError: path.join(cwd, 'app/js/creditHoldError/index.js'),
  // byod: path.join(cwd, 'app/js/byod/index.js'),
  // storeRepId: path.join(cwd, 'app/js/storeRepId/index.js'), //Store Rep ID
  // genericPromo: path.join(cwd, 'app/js/genericPromo/index.js'),
  // sharedCart: path.join(cwd, 'app/js/SharedCart/index.js'),
  // guestLogin: path.join(cwd, 'app/js/guestLogin/index.js'),
  accGuestCheckout: path.join(cwd, 'app/js/accessoriesGuestCheckout/index.js'),
  // instantCredit: path.join(cwd, 'app/js/instantCredit/index.js'),
  // smartFamily: path.join(cwd, 'app/js/smartFamily/index.js'),
  // promoInterceptor: path.join(cwd, 'app/js/PromoInterceptor/index.js'),
  // availabilityTimer: path.join(cwd, 'app/js/availabilityTimer/index.js')
};

module.exports = pagesEntryPoints;
