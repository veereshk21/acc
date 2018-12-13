
import { connect } from 'react-redux';

import OrderInfo from '../components/orderInfo';

const mapStateToProps = (state) => { // eslint-disable-line
  const data = state.get('confirmationView').toJS();
  return {
    cqKeys: data.cqKeys,
    billingAddress: data.billingInfo.billingAddress,
    shippingAddress: data.shippingInfo.addressInfo,
    selectedShippingType: data.selectedShippingType,
    billingInfo: data.billingInfo,
    checkoutStates: data.checkoutStates,
    splitShipment: data.splitShipment,
  };
};

export default connect(mapStateToProps)(OrderInfo);
