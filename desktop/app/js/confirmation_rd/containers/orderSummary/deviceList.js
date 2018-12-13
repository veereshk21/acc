
import { connect } from 'react-redux';

import DeviceList from '../../components/orderSummary/deviceList';

const mapStateToProps = (state) => {
  const data = state.get('orderDetails').toJS();
  const selectedShippingType = state.get('selectedShippingType') && state.get('selectedShippingType').toJS();
  const ispuSelected = selectedShippingType && selectedShippingType.type && selectedShippingType.type.toLowerCase() === 'ispu';

  return {
    cqContent: state.get('cqContent') && state.get('cqContent').toJS(),
    devices: state.get('devices') && state.get('devices').toJS(),
    plans: state.get('plans') && state.get('plans').toJS(),
    deviceConfigInfo: data.deviceConfigInfo,
    isHLLPlanInOrder: data.isHLLPlanInOrder,
    itemOnJaxPlan: data.itemOnJaxPlan || false,
    bicRepresentationChangeEnabled: data.bicRepresentationChangeEnabled,
    ispuSelected,
    comboOrder: data.comboOrder,
  };
};

export default connect(mapStateToProps)(DeviceList);
