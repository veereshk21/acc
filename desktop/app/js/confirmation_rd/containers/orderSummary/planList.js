
import { connect } from 'react-redux';

import PlanList from '../../components/orderSummary/planList';

const mapStateToProps = (state) => {
  const data = state.get('orderDetails').toJS();
  const plans = state.get('plans');
  return {
    cqContent: state.get('cqContent') && state.get('cqContent').toJS(),
    plans: plans ? plans.toJS() : null,
    cpcOrder: data.cpcOrder,
    itemOnJaxPlan: data.itemOnJaxPlan || false,
    autoPayApplied: data.autoPayApplied,
  };
};

export default connect(mapStateToProps)(PlanList);
