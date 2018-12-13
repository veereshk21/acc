import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import CreditHoldError from '../components/index';

function mapStateToProps(state) {
  const data = state.get('details').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  return {
    details: data.output,
    ...asyncCallStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreditHoldError);
