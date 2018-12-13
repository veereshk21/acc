import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CompatiblePlans from '../components/CompatiblePlans';

const mapStatetoProps = (state) => {
  const compatiblePlans = state.get('compatiblePlans').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');

  return {
    compatiblePlans,
    cqContent,
    asyncCallStatus,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(CompatiblePlans);
