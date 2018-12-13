import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PlanDetails from '../components/PlanDetails';

const mapStatetoProps = (state) => {
  const json = state.toJSON();

  return {
    additionalPlanDetails: json.additionalPlanDetails,
    cq: json.cq,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(PlanDetails);
