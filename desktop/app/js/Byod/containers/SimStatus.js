import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SimStatus from './../components/SimStatus';
import * as actions from './../actions';

const mapStateToProps = (state, ownProps) => {
  const data = state.get('deviceOptions').toJSON();
  const pageJSON = state.get('pageJSON').toJSON();
  const cqJSON = state.get('cqContent').toJS() || { html: {}, label: {}, error: {} };
  const main = state.get('main');
  const showCheckedDevices = state.get('showCheckedDevices');
  const simValidationResponse = state.get('simValidationResponse');
  const asyncCallStatus = state.get('asyncCallStatus');
  return ({
    cqJSON,
    data,
    pageJSON,
    main,
    showCheckedDevices,
    simValidationResponse,
    asyncCallStatus,
    ...ownProps,
  });
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SimStatus);
