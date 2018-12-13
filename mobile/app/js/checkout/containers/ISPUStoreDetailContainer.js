import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import ISPUStore from '../components/ISPUStoreDetail';

function mapStateToProps(state) {
  const orderDetails = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const data = state.toJSON();
  const storeDetails = data.storeDetails.storeList.find((store) => store.storeId === data.storeDetails.selectedStoreId);
  return {
    cqContent,
    selectedShippingType: orderDetails.selectedShippingType,
    storeDetails,
    hidePickupBtn: false,
    gMapApiKey: { client: orderDetails.googleMapAPI.client, channel: orderDetails.googleMapAPI.channel, draggable: false },
    renderMap: data.storeDetails.renderMap,
    ...asyncCallStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ISPUStore);
