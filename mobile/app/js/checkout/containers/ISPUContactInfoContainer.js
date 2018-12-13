import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import ISPUContactInfo from '../components/ISPUContactInfo';

function mapStateToProps(state) {
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  // eslint-disable-next-line no-param-reassign
  state = state.toJSON();
  const { contactInfoRequired } = state.orderDetails.checkoutStates;
  const filteredStore = state.storeDetails.storeList.filter((storeAdd) => storeAdd.storeId === state.storeDetails.selectedStoreId);
  const storeDetails = (contactInfoRequired || filteredStore.length < 1 ? state.orderDetails.shippingInfo.storeDetail : filteredStore[0]);
  const initialValues = {
    email: state.orderDetails.shippingInfo.contactInfo.emailAddress,
    phoneNumber: state.orderDetails.shippingInfo.contactInfo.phoneNumber,
  };
  const tradeIn = state.orderDetails.shippingInfo.tradeIn ? state.orderDetails.shippingInfo.tradeIn : false;
  const tradeInAddress = state.orderDetails.shippingInfo.tradeInAddress ? state.orderDetails.shippingInfo.tradeInAddress : null;

  return {
    cqContent,
    contactInfoRequired,
    storeDetails,
    initialValues,
    storeId: storeDetails.storeId,
    orderId: state.orderDetails.orderId,
    tradeIn,
    tradeInAddress,
    activeSMSCapableMtnList: state.orderDetails.shippingInfo.contactInfo.activeSMSCapableMtnList,
    ...asyncCallStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ISPUContactInfo);
