import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  clearCart,
  removeDevice,
  removeTradeInDeviceFromCart,
  asyncFetch,
} from './../actions';

import DeviceDetails from '../components/DeviceDetails';

const mapPromoDetails = (cartData) => {
  const items = [];
  cartData.items && cartData.items.map((item) => { // eslint-disable-line
    const device = item;
    device.promoDetails = cartData.tradeInPromoDetails && cartData.tradeInPromoDetails.tradeInDevices && cartData.tradeInPromoDetails.tradeInDevices.filter((promo) => promo.promoInfo && promo.dppAppliedCommerceItemId === item.commerceItemId)[0] ?
      cartData.tradeInPromoDetails.tradeInDevices.filter((promo) => promo.promoInfo && promo.dppAppliedCommerceItemId === item.commerceItemId)[0].promoInfo : null;
    items.push(device);
  });
  return items;
};


const mapStateToProps = (state) => {
  const isNSOFlow = state.get('cartData').get('items') ? state.get('cartData').get('output').get('items').filter((mdn) => mdn.get('flow') === 'NSO').get(0) || false : false;
  const cartData = state.get('cartData').get('output').toJS();
  const recommendedAccessories = state.get('recommendedAccessories');
  const asyncCallStatus = state.get('asyncCallStatus');
  const cqContent = state.get('cqContent').toJS();
  const isHLLDevices = state.get('cartData').get('output').get('isHLLPlanInOrder') || false;
  const isSingleModConnectedDevice = state.get('cartData').get('output').get('isSingleModConnectedDevice') || false;
  const totalDeviceCount = state.get('cartData').get('output').get('items') && state.get('cartData').get('output').get('items').size;
  const totalTradeinDeviceCount = state.get('cartData').get('output').get('instantTradeInDevicesCount');
  const tradeInPromoDetails = cartData.tradeInPromoDetails;
  const bicItems = tradeInPromoDetails && tradeInPromoDetails.tradeInDevices && tradeInPromoDetails.tradeInDevices.filter((device) => device.bicApplied);
  const nonBicItems = tradeInPromoDetails && tradeInPromoDetails.tradeInDevices && tradeInPromoDetails.tradeInDevices.filter((device) => !device.bicApplied);
  const items = mapPromoDetails(cartData);
  const ispuselectedAtPdp = cartData.ispuselectedAtPdp || false;

  return { ...cartData, items, bicItems, nonBicItems, cqContent, isNSOFlow, recommendedAccessories, totalDeviceCount, totalTradeinDeviceCount, isSingleModConnectedDevice, isHLLDevices, asyncCallStatus, ispuselectedAtPdp };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ clearCart, removeDevice, removeTradeInDeviceFromCart, asyncFetch }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeviceDetails));
