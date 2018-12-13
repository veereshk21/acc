import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NSOLanding from './../components/';
import * as actions from './../actions';

const mapStateToProps = (state, ownProps) => {
  const data = state.get('deviceOptions').toJSON();
  const pageJSON = state.get('pageJSON').toJSON();
  const cqJSON = state.get('cqJSON').toJSON();
  return ({
    cqJSON,
    data,
    ...pageJSON,
    ...ownProps,
    ...pageJSON,
  });
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NSOLanding);
