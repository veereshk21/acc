import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

import DevicePrice from '../components/DevicePrice';

function getBicLegalFlag(tradeInDevices, devices) {
  if (tradeInDevices) {
    for (const i in tradeInDevices) {
      if (tradeInDevices[i].promoInfo) { return true; }
    }
  }
  if (devices) {
    for (const i in devices) {
      if (devices[i].sbdOffer) { return true; }
    }
  }
  return false;
}

const mapStateToProps = (state) => {
  const asyncStatusCall = state.get('asyncCallStatus');
  const toggleEnterZip = state.get('toggleEnterZip');
  const data = state.get('cartData').get('output').toJS();
  const showBicLegal = getBicLegalFlag(data.tradeInPromoDetails && data.tradeInPromoDetails.tradeInDevices, data.items);
  return {
    cartData: data,
    isEnterZipDisplay: toggleEnterZip && toggleEnterZip.isEnterZipDisplay,
    cq: state.get('cqContent').toJS(),
    cpc: data.cpcSucessful,
    asyncCallStatus: asyncStatusCall,
    showBicLegal,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, actions), dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DevicePrice));
