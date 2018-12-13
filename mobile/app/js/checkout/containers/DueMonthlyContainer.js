import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import DueMonthly from '../components/DueMonthly';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();

  return {
    cqContent,
    anyLineFreeData: data.anyLineFreeSPO,
    dueMonthlyData: data.dueMonthlyView,
    itemsData: data.devices.items,
    plans: data.plans,
    tmpMdOpted: data.tmpMdOpted,
    tmpMd: data.dueMonthlyView.tmpMd,
    lineLevelOpted: data.isHLLPlanInOrder || data.hllplan,
    totalDueMonthlyPlanAndDevice: data.totalDueMonthlyPlanAndDevice,
    cpcOrder: data.cpcOrder,
    itemOnJaxPlan: data.itemOnJaxPlan,
    accountLevelDiscountList: data.accountLevelDiscountList || [],
    bicRepresentationChangeEnabled: data.bicRepresentationChangeEnabled,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DueMonthly);
