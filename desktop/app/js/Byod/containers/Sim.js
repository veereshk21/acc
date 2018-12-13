import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sim from './../components/Sim';
import * as actions from './../actions';

const mapStateToProps = (state, ownProps) => {
  const data = state.get('simOptions').toJSON().output;
  const pageJSON = state.get('pageJSON').toJSON();
  const cqJSON = state.get('cqContent').toJS() || { html: {}, label: {}, error: {} };
  const iMEIResponse = state.get('iMEIResponse');
  const simValidationResponse = state.get('simValidationResponse');
  const main = state.get('main');
  const formData = state.get('form');
  const showCheckedDevices = state.get('showCheckedDevices');
  const asyncCallStatus = state.get('asyncCallStatus');
  const checkedDevicesResponse = state.get('showCheckedDevices');
  return ({
    cqJSON,
    data,
    pageJSON,
    iMEIResponse,
    ...ownProps,
    formData,
    main,
    simValidationResponse,
    selectedDevice: state.get('main'),
    showCheckedDevices,
    asyncCallStatus,
    checkedDevicesResponse,
  });
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Sim);
