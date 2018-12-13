import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ComparePlanCost from '../components/comparePlanCost';

// const getOStypes = (state, ownProps) => {
//   // const selectedOS = location.hash.replace('#/ostype/', '');
//   const data = state.get('byodData').toJS();
//   return data.deviceType.filter((device) => device.name === ownProps.params.devId)[0];
// };

const mapStatetoProps = (state, ownProps) => {
  const compatiblePlans = state.get('compatiblePlans').toJS();
  const cqContent = state.get('cqContent').toJS();
  // const selectedPlanOnUrl = location.hash.replace('#/comparePlanCost/', '');
  const selectedPlanOnUrl = ownProps.match.params.plan;
  const selectedPlanByUser = compatiblePlans.plans.filter((plan) => plan.planSorId === selectedPlanOnUrl)[0];
  return {
    selectedPlan: selectedPlanByUser,
    comparePlanCostView: compatiblePlans.comparePlanCostView,
    cqContent,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(ComparePlanCost);
