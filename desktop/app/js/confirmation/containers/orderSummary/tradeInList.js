
import { connect } from 'react-redux';

import TradeInList from '../../components/orderSummary/tradeInList';

const mapStateToProps = (state) => {
  const data = state.get('orderDetails').toJS();
  return {
    cqContent: state.get('cqContent').toJS(),
    tradeInDevices: data.transformedTradeInPromoDetails.tradeInDevices,
    // currentRecycleDeviceInfo: data.tradeInDevicesDetails.tradeinDevices.currentRecycleDeviceInfo
  };
};

export default connect(mapStateToProps)(TradeInList);
