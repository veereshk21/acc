
import { connect } from 'react-redux';

import TradeInWrapper from '../../components/orderSummary/tradeInWrapper';

const mapStateToProps = (state) => {
  const data = state.get('orderDetails').toJS();
  const { instantCreditOrder } = data.checkoutStates;

  let tradeInDevices = [];
  const instantCreditTradeInDevices = [];
  if (instantCreditOrder) {
    data.transformedTradeInPromoDetails.tradeInDevices.forEach((device) => {
      if (device.bicApplied === true) {
        tradeInDevices.push(device);
      } else {
        instantCreditTradeInDevices.push(device);
      }
    });
  } else {
    tradeInDevices = data.transformedTradeInPromoDetails.tradeInDevices;
  }

  return {
    cqContent: state.get('cqContent') && state.get('cqContent').toJS(),
    tradeInDevices, // only bic devices
    instantCreditDetails: data.instantCreditDetails,
    instantCreditTradeInDevices, // only instant credit and lump sum (aka non bic)
    // currentRecycleDeviceInfo: data.tradeInDevicesDetails.tradeinDevices.currentRecycleDeviceInfo,
    instantCreditOrder,
  };
};

export default connect(mapStateToProps)(TradeInWrapper);
