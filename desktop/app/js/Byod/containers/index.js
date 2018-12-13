import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Byod from './../components/';
import * as actions from './../actions';
import * as NotificationActions from '../../common/NotificationBar/actions';

const mapStateToProps = (state, ownProps) => {
  const data = state.get('deviceOptions').toJSON().output;
  const deviceList = state.get('deviceList').toJSON();
  const pageJSON = state.get('pageJSON').toJSON();
  const cqJSON = state.get('cqContent').toJS() || { html: {}, label: {}, error: {} };
  const formData = state.get('form');
  const iMEIResponse = (state.get('iMEIResponse') && JSON.stringify(state.get('iMEIResponse')) !== JSON.stringify({})) ? state.get('iMEIResponse') : undefined;
  const showCheckedDevices = state.get('showCheckedDevices');
  const asyncCallStatus = state.get('asyncCallStatus');
  // const asyncCallStatus = state.get('asyncCallStatus');
  return ({
    cqJSON,
    data,
    pageJSON,
    deviceList,
    ...ownProps,
    formData,
    iMEIResponse,
    selectedDevice: state.get('main'),
    showCheckedDevices,
    asyncCallStatus,
    // ...asyncCallStatus,
  });
};
const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions, ...NotificationActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Byod);
