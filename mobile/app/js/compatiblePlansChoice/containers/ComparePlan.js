import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ComparePlan from '../components/ComparePlan';

const mapStatetoProps = (state, ownProps) => {
  const comparePlanDetails = state.get('comparePlanDetails');
  const cqContent = state.get('cqContent').toJS();
  const compatiblePlans = state.get('compatiblePlans').toJS();
  return {
    compatiblePlans,
    comparePlanDetails,
    planSorId: ownProps.match.params.planSorId,
    cqContent,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(ComparePlan);
