import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import InstantCredit from '../components/InstantCredit';

function mapStateToProps(state) {
  const data = state.get('orderDetails');
  const cqContent = state.get('cqContent').toJS();
  const tradeInDevices = data.get('transformedTradeInPromoDetails').get('tradeInDevices');

  const promoTradeInDevices = [];
  const icTradeInDevices = [];
  tradeInDevices.forEach((device) => {
    if (device.get('bicApplied') === true) {
      promoTradeInDevices.push(device);
    } else {
      icTradeInDevices.push(device);
    }
  });

  return {
    cqContent,
    tradeInPromoDetails: data.get('transformedTradeInPromoDetails'),
    bicMessage: data.get('bicMessage'),
    instantCreditDetails: data.get('instantCreditDetails'),
    icTradeInDevices: fromJS(icTradeInDevices),
    promoTradeInDevices: fromJS(promoTradeInDevices),
    promoTradeInOrder: promoTradeInDevices && promoTradeInDevices.length > 0,
  };
}


export default connect(mapStateToProps)(InstantCredit);
