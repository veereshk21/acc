import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IMEIComponent from './../components/IMEIComponent';
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
    mydevices: !!ownProps.match.params.mydevices,
    output: iMEIResponse.output,
  });
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(IMEIComponent);
