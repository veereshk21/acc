import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import UpdatePlanPrompt from '../components';

const mapStatetoProps = (state) => {
  const cpcIntercept = state.get('cpcIntercept').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');


  return {
    cpcIntercept,
    cqContent,
    ...asyncCallStatus,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(UpdatePlanPrompt);
