import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IMEIStatus from './../components/IMEIStatus';
import * as actions from './../actions';

const mapStateToProps = (state, ownProps) => {
  const data = state.get('deviceOptions').toJS();
  const cqJSON = state.get('cqJSON').toJSON();
  const pageJSON = state.get('pageJSON').toJSON();

  const main = state.get('main');
  const iMEIResponse = state.get('iMEIResponse');
  return ({
    cqJSON,
    data,
    ...main,
    ...ownProps,
    ...pageJSON,
    output: iMEIResponse.output || null,
  });
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(IMEIStatus);
