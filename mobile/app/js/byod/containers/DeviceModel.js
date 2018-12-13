import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DeviceModel from './../components/DeviceModel';
import * as actions from './../actions';

const mapStateToProps = (state, ownProps) => {
  const data = state.get('deviceOptions').toJSON();
  const cqJSON = state.get('cqJSON').toJSON();
  const pageJSON = state.get('pageJSON').toJSON();

  const main = state.get('main');
  return ({
    cqJSON,
    data,
    ...main,
    ...ownProps,
    ...pageJSON,
  });
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeviceModel);
