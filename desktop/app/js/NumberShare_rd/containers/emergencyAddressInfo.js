/**
 * Created by mambig on 8/23/17.
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as numberShareActions from '../actions';
import e911Page from '../components/EmergencyAddressInfo';

const mapStateToProps = (state) => {
  const numberShare = state.get('numberShare').toJS();
  const deviceDetails = state.get('deviceDetails');
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const emergencyContactInfo = state.get('emergencyContactInfo').toJS();
  const productInfo = state.get('selectedMtn');
  const updateEmergencyContactInfo = state.get('updateEmergencyContactInfo').toJS();
  return {
    numberShare,
    deviceDetails,
    statusCode: state.get('statusCode'),
    cqContent,
    productInfo,
    emergencyContactInfo,
    updateEmergencyContactInfo,
    initialValues: Object.assign({}, emergencyContactInfo.customerBillingAddress, { chooseNoSelect: productInfo }),
    ...asyncCallStatus,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(numberShareActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(e911Page);
