/**
 * Created by hmahad on 1/5/2017.
 */
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeCartView, removePromoCode } from '../actions';
import CartPriceBreakdown from '../components/CartPriceBreakdown';


const mapStateToProps = (state) => ({
  isAALFlow: state.get('cartData').get('items') ? state.get('cartData').get('items').filter((mdn) => mdn.get('flow') === 'AAL').get(0) : false,
  isNSOFlow: state.get('cartData').get('items') ? state.get('cartData').get('items').filter((mdn) => mdn.get('flow') === 'NSO').get(0) : false,
  totalDueMonthly: state.get('cartData').get('totalDueMonthly'),
  overallDueMonthly: state.get('cartData').get('overallDueMonthly'),
  pastDueBalance: state.get('cartData').get('pastDueBalance'),
  totalDueToday: state.get('cartData').get('totalDueToday'),
  orderId: state.get('cartData').get('orderId'),
  mailInRebateAmount: state.get('cartData').get('mailInRebateTotal'),
  tradeInCredit: state.get('cartData').get('tradeInCredit'),
  instantCreditOrder: state.get('cartData').get('instantCreditEligible'),
  totalInstantCredit: state.get('cartData').get('instantCreditAppliedOnOrder'),
  tradeInPromoDetails: state.get('cartData').get('tradeInPromoDetails'),
  tradeInPromoEligible: state.get('cartData').get('tradeInPromoEligible'),
  tradeInUrl: state.get('cartData').get('tradeInUrl'),
  retrieveCartSuccessful: state.get('cartData').get('retrieveCartSuccessful'),
  promoCodes: state.get('cartData').get('promoCodes'),
  promotionList: state.get('cartData').get('promotionList'),
  totalActivationFee: state.get('cartData').get('totalActivationFee'),
  CQLabel: state.get('cqContent').get('label'),
  appleCare: state.get('cartData').get('appleCare'),
  plans: state.get('cartData').get('plans'),
  cpc: state.get('cartData').get('cpcSucessful'),
  planDueMonthly: state.get('cartData').get('cpcSucessful'),
  itemOnJaxPlan: state.get('cartData').get('itemOnJaxPlan'),
  standaloneAccessories: state.get('cartData').get('standaloneAccessories'),
  isPromoCodeEnabled: window.siteId && state.get('cartData').has('enablePromoCodeForAgent') ? state.get('cartData').get('enablePromoCodeForAgent') === true : true,
  lineLevelOpted: state.get('cartData').get('isHLLPlanInOrder'),
  isTradeInEnabled: window.siteId && state.get('cartData').has('enableTradeInForAgent') ? state.get('cartData').get('enableTradeInForAgent') === true : true,
});

const mapDispatchToProps = (dispatch) =>

  /* return bindActionCreators(CartActions,dispatch); */

  /** Other way to pass actions as props
   * */
  ({
    dispatch,
    changeCartView: (data) => dispatch(changeCartView(data)),
    removePromoCode: (data) => dispatch(removePromoCode(data)),
  });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartPriceBreakdown));
