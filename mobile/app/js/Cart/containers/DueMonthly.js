/**
 * Created by hmahad on 1/12/2017.
 */


import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as CartActions from '../actions';


import CartDueMonthly from '../components/DueMonthly';

const checkTMP = (items) => {
  const flag = items.filter((item) => (item.protectionOption && (item.protectionOption.featureType === 'SPO')));
  return (flag.size > 0);
};

const mapPromoDetails = (cartData) => {
  const items = [];
  cartData.items && cartData.items.map((item) => { // eslint-disable-line
    const device = item;
    device.promoDetails = cartData.tradeInPromoDetails && cartData.tradeInPromoDetails.tradeInDevices && cartData.tradeInPromoDetails.tradeInDevices.filter((promo) => promo.promoInfo && promo.dppAppliedCommerceItemId === item.commerceItemId)[0] ?
      cartData.tradeInPromoDetails.tradeInDevices.filter((promo) => promo.promoInfo && promo.dppAppliedCommerceItemId === item.commerceItemId)[0].promoInfo : null;
    items.push(device);
  });
  return items;
};

function mapStateToProps(state) {
  const data = state.toJSON();
  const updatedProtectionURL = !state.get('cartData').get('authenticated') ? state.get('cartData').get('protectionURL') + '?uc=true&editProtection=true' : state.get('cartData').get('protectionURL');
  const {
    plans, tmpMdOpted, tmpMd, bicText, bicOfferMessage, totalDueMonthly, promotionList, isHLLPlanInOrder, overallDueMonthly, accountLevelDiscountList, instantCreditPageURL, instantCreditEligible,
  } = data.cartData;// state.get('cartData').get('plans');
  const { isFetching } = data.asyncCallStatus;
  const { deviceProtectionList, cqContent } = data;
  const items = mapPromoDetails(state.get('cartData').toJS());

  return {
    isFetching,
    items,
    protectionURL: updatedProtectionURL,
    tmpmd: tmpMdOpted,
    tmpMdOptions: tmpMd,
    bicText,
    bicOfferMessage,
    totalDueMonthly,
    overallDueMonthly,
    deviceProtectionList,
    anyLineFreeSPO: data.cartData.anyLineFreeSPO,
    CQLabel: cqContent.label,
    CQHtml: cqContent.html,
    promotionList,
    isTMP: checkTMP(items),
    lineLevelOpted: isHLLPlanInOrder || false,
    cpc: data.cartData.cpcSucessful,
    accountLevelDiscountList: accountLevelDiscountList || [],
    plans,
    instantCreditPageURL,
    instantCreditEligible,
  };
}
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getProtectionOptions: (flow, mtn, deviceSORId) => dispatch(CartActions.getProtectionOptions(flow, mtn, deviceSORId)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDueMonthly));
