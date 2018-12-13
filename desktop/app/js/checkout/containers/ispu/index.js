import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions';
import InStorePickUp from '../../components/ispu/InStorePickUp';

function mapStateToProps(state) {
  const orderDetails = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const form = state.get('form').toJS().ispu;
  const asyncCallStatus = state.get('asyncCallStatus');
  const data = state.toJSON();
  const { useISPUService } = data.orderDetails;
  const { nextURL, displayShowMore } = data.storeDetails;
  return {
    cqContent,
    zipCode: typeof data.storeDetails.zipCode !== 'undefined' ? data.storeDetails.zipCode : orderDetails.shippingInfo.addressInfo.zipcode,
    storeList: data.storeDetails.storeList,
    selectedStoreId: data.storeDetails.selectedStoreId,
    // navigateToStoreDetail: data.storeDetails.navigateToStoreDetail,
    reRenderMaps: data.storeDetails.reRenderMaps,
    mapOnlyView: data.storeDetails.mapOnlyView,
    gMapApiKey: { client: orderDetails.googleMapAPI.client, channel: orderDetails.googleMapAPI.channel, draggable: orderDetails.googleMapAPI.draggable },
    formValues: form ? form.values : {},
    orderDetails,
    displayShowMore,
    useISPUService,
    nextURL,
    initialValues: { ispuDistance: '50' },
    ...asyncCallStatus,
    phoneNumber: data.form && data.form.getTextUpdatesForm && data.form.getTextUpdatesForm.values && data.form.getTextUpdatesForm.values.optInMtn ? data.form.getTextUpdatesForm.values.optInMtn : data.orderDetails.shippingInfo.contactInfo.phoneNumber,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InStorePickUp);
