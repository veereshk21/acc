import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ComparePlan from '../components/ComparePlan';


const mapStatetoProps = (state, ownProps) => {
  const data = state.toJSON();
  return {
    comparePlanDetails: data.comparePlanDetails,
    cqData: data.cqData,
    comparePlansURL: data.preOrderPlanData.comparePlansURL,
    comparePlanSKU: ownProps.match.params.planSkuID,
    isFetching: data.isFetching,
  };
};


const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(ComparePlan);
