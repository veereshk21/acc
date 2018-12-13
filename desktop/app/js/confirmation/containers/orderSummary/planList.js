
import { connect } from 'react-redux';

import PlanList from '../../components/orderSummary/planList';

const mapStateToProps = (state) => {
  const data = state.get('orderDetails').toJS();
  return {
    cqContent: state.get('cqContent').toJS(),
    plans: state.get('plans') && state.get('plans').toJS(),
    cpcOrder: data.cpcOrder,
  };
};

export default connect(mapStateToProps)(PlanList);
