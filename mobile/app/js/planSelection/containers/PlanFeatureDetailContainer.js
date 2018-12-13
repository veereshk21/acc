/**
 * Created by santhra  on 6/19/2017.
 */
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import PlanFeatureDetail from '../components/PlanFeatureDetails';

const getFilteredItem = (items, ownprops) => {
  const data = items.toJSON();
  const getCurrentPlan = data.plans[ownprops.match.params.planIndex];
  return getCurrentPlan;
};


const mapStateToProps = (state, ownprops) => ({
  displayDetail: getFilteredItem(state.get('preOrderPlanData'), ownprops).featureDetails,
  cqData: state.get('cqData').toJSON(),
});


const mapDispatchToProps = (dispatch) => ({
  dispatch,
  push,
  goBack,
});


export default connect(mapStateToProps, mapDispatchToProps)(PlanFeatureDetail);
