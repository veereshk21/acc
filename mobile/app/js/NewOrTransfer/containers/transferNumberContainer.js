import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import transferNumber from '../components/transferNumber';

const mapStateToProps = (state) => {
  const data = state.toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  // console.log(data.output)
  return {
    output: data.output,
    initialValues: data.output.portInDetailsVO,
    cqContent: data.cqContent,
    ...asyncCallStatus,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(transferNumber);
