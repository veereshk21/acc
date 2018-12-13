import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import ISPUStore from '../components/ISPUStoreDetail';

function mapStateToProps(state) {
  const orderDetails = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  return {
    cqContent,
    selectedShippingType: orderDetails.selectedShippingType,
    storeDetails: orderDetails.shippingInfo.storeDetail,
    hidePickupBtn: true,
    gMapApiKey: { client: orderDetails.googleMapAPI.client, channel: orderDetails.googleMapAPI.channel, draggable: false },
    renderMap: true,
    ...asyncCallStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ISPUStore);
