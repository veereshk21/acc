import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEmpty from 'lodash/isEmpty';

import SIMComponent from './../components/SIMComponent';
import * as actions from './../actions';
import { hashHistory } from '../../store';

const mapStateToProps = (state, ownProps) => {
  const data = state.get('deviceOptions').toJSON();
  const cqJSON = state.get('cqJSON').toJSON();
  const pageJSON = state.get('pageJSON').toJSON();
  const asyncCallStatus = state.get('asyncCallStatus');
  const main = state.get('main');
  const iMEIResponse = state.get('iMEIResponse');
  if (isEmpty(iMEIResponse)) {
    hashHistory.push('/');
  }
  return ({
    cqJSON,
    data,
    ...main,
    ...ownProps,
    ...pageJSON,
    ...asyncCallStatus,
    output: iMEIResponse.output,
  });
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SIMComponent);
