/**
 * Created by hmahad on 1/12/2017.
 */


import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as CartActions from '../actions';


import CartDueMonthly from '../components/CartDueMonthly';

const getItemsArray = (state) => state.get('cartData').get('items');
const checkTMP = (items) => {
  const flag = items.filter((item) => (item.get('protectionOption') && (item.get('protectionOption').get('featureType') === 'SPO')));
  return (flag.size > 0);
};

function mapStateToProps(state) {
  const data = state.toJSON();
  const updatedProtectionURL = !state.get('cartData').get('authenticated') ? state.get('cartData').get('protectionURL') + '?uc=true&editProtection=true' : state.get('cartData').get('protectionURL');
  // const plans = state.get('cartData').get('plans');
  return {
    isFetching: state.get('asyncCallStatus').isFetching,
    items: getItemsArray(state),
    protectionURL: updatedProtectionURL,
    tmpmd: state.get('cartData').get('tmpMdOpted'),
    tmpMdOptions: state.get('cartData').get('tmpMd'),
    bicText: state.get('cartData').get('bicText'),
    bicOfferMessage: state.get('cartData').get('bicOfferMessage'),
    totalDueMonthly: state.get('cartData').get('totalDueMonthly'),
    overallDueMonthly: state.get('cartData').get('overallDueMonthly'),
    deviceProtectionList: state.get('deviceProtectionList'),
    anyLineFreeSPO: data.cartData.anyLineFreeSPO,
    CQLabel: state.get('cqContent').get('label'),
    CQHtml: state.get('cqContent').get('html'),
    promotionList: state.get('cartData').get('promotionList'),
    isTMP: checkTMP(state.get('cartData').get('items')),
    lineLevelOpted: state.get('cartData').get('isHLLPlanInOrder'),
    cpc: state.get('cartData').get('cpcSucessful'),
    plans: data.cartData.plans || null,
    itemOnJaxPlan: data.cartData.itemOnJaxPlan,
  };
}
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getProtectionOptions: (flow, mtn, deviceSORId) => dispatch(CartActions.getProtectionOptions(flow, mtn, deviceSORId)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDueMonthly));
