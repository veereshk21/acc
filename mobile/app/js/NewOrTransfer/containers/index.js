import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import NewOrTransferPrompt from '../components';

const mapStateToProps = (state) => {
  const data = state.toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  return {
    output: data.output,
    cqContent: data.cqContent,
    ...asyncCallStatus,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewOrTransferPrompt);
