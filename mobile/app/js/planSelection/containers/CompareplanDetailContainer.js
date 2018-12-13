/**
 * Created by santhra  on 6/19/2017.
 */
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import PlanFeatureDetail from '../components/PlanFeatureDetails';

const mapStateToProps = (state) => {
  const data = state.toJSON();
  return {
    displayDetail: data.comparePlanDetails.additionalPlanDetail.details,
    cqData: data.cqData,

  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  push,
  goBack,
});


export default connect(mapStateToProps, mapDispatchToProps)(PlanFeatureDetail);
