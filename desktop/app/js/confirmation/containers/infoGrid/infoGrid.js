
import { connect } from 'react-redux';

import InfoGrid from '../../components/infoGrid/infoGrid';

const mapStateToProps = (state) => {
  const data = state.get('orderDetails').toJS();
  const billingInfo = state.get('billingInfo').toJS();
  const shippingInfo = state.get('shippingInfo').toJS();
  const selectedShippingType = state.get('selectedShippingType').toJS();

  return {
    cqContent: state.get('cqContent').toJS(),
    billAddress: billingInfo.billingAddress,
    shippingInfo,
    selectedShippingType,
    billingInfo,
    checkoutStates: data.checkoutStates,
    splitShipment: data.splitShipment,
  };
};

export default connect(mapStateToProps)(InfoGrid);

