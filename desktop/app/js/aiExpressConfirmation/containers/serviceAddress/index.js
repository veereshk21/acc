import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ServiceAddressSection from '../../components/serviceAddress';
import * as actionCreators from '../../actions';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  // const forms = state.get('form').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');

  return {
    ...asyncCallStatus,
    cqContent,
    checkoutStates: data.checkoutStates,
    devices: data.deviceConfigInfo.devices,
    addressInfo: data.shippingInfo.addressInfo,
    activeSMSCapableMtnList: data.shippingInfo.contactInfo.activeSMSCapableMtnList,
    ISPUSelected: data.selectedShippingType && data.selectedShippingType.type === 'ISPU',
    ispudetailsInfo: data.shippingInfo.ispudetailsInfo,
    contactInfo: data.shippingInfo.contactInfo,
    orderId: data.orderId,
    standaloneAccessories: data.standaloneAccessories,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actionCreators), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceAddressSection);
