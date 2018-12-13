import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TaxDetails from '../components/TaxDetails';

const mapStatetoProps = (state, ownProps) => {
  const comparePlanDetails = state.get('comparePlanDetails');
  const cqContent = state.get('cqContent').toJS();
  const compatiblePlans = state.get('compatiblePlans').toJS();

  return {
    compatiblePlans,
    comparePlanDetails,
    cqContent,
    planSorId: ownProps.params.planSorId,


  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(TaxDetails);
