import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShippingSection from '../../components/shipping/shippingSection';
import * as actionCreators from '../../actions';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const editState = state.get('editState').toJS();
  // const forms = state.get('form').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');

  return {
    cqContent,
    ...asyncCallStatus,
    addressInfo: data.shippingInfo.addressInfo,
    editState,
    activeSMSCapableMtnList: data.shippingInfo.contactInfo.activeSMSCapableMtnList,
    ISPUSelected: data.selectedShippingType && data.selectedShippingType.type === 'ISPU',
    ispudetailsInfo: data.shippingInfo.ispudetailsInfo,
    contactInfo: data.shippingInfo.contactInfo,
    orderId: data.orderId,
    standaloneAccessories: data.standaloneAccessories,
    checkoutStates: data.checkoutStates,
    useISPUCC: true,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actionCreators), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingSection);
