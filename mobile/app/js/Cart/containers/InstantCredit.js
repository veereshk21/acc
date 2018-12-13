import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeTradeInDeviceFromCart } from '../actions';
import InstantCredit from '../components/InstantCredit';

const mapStateToProps = (state) => {
  const data = state.get('cartData');
  const cqContent = state.get('cqContent').toJS();
  const tradeInPromoDetails = data.get('tradeInPromoDetails') && data.get('tradeInPromoDetails').toJS();
  const bicItems = tradeInPromoDetails && tradeInPromoDetails.tradeInDevices && tradeInPromoDetails.tradeInDevices.filter((device) => device.bicApplied);
  const nonBicItems = tradeInPromoDetails && tradeInPromoDetails.tradeInDevices && tradeInPromoDetails.tradeInDevices.filter((device) => !device.bicApplied);

  return {
    cqContent,
    tradeInPromoDetails,
    instantCreditDetails: data.get('instantCreditTradeinSummary'),
    tradeInUrl: data.get('tradeInUrl'),
    totalDeviceCount: data.get('items') && data.get('items').size,
    totalTradeinDeviceCount: data.get('instantTradeInDevicesCount'),
    instantCreditPageURL: data.get('instantCreditPageURL'),
    showHeadsUpMsg: data.get('showHeadsUpMsg'),
    bicItems,
    nonBicItems,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ removeTradeInDeviceFromCart }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InstantCredit);
