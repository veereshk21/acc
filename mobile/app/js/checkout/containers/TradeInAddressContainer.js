/**
 * Created by gautam on 4/11/2017.
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TradeInAddress from '../components/TradeInAddress';
import { updateShippingAddress } from '../actions';
import * as NotificationActions from '../../common/NotificationBar/actions';

const getSelectedShippingInfo = (storeDetails) => {
  if (!storeDetails || Object.keys(storeDetails).length < 1) {
    return {
      shippingAddressType: 'pickUpStore',
    };
  }

  return {
    shippingAddressType: 'pickUpStore',
    storeId: storeDetails.storeId,
    longitude: storeDetails.longitude,
    latitude: storeDetails.latitude,
  };
};

const getMappedTradeInAddress = (tradeInAddress) => {
  if (!(tradeInAddress || Object.keys(tradeInAddress).length)) {
    return {};
  }

  const {
    companyName, lastName, firstName, address1, address2, city, state, zipcode,
  } = tradeInAddress;

  return {
    ispuCOName: companyName,
    ispuLastName: lastName,
    ispuFirstName: firstName,
    ispuAddress1: address1,
    ispuAddress2: address2,
    ispuCity: city,
    ispuState: state,
    ispuPostalCode: zipcode,
  };
};

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const isBusinessAddress = (data.shippingInfo.addressInfo.businessName !== null);
  const asyncCallStatus = state.get('asyncCallStatus');
  const tradeInAddress = getMappedTradeInAddress(data.shippingInfo.tradeInAddress);

  return {
    cqContent,
    states: data.states,
    selectedShippingInfo: getSelectedShippingInfo(data.shippingInfo.storeDetail),
    addressInfo: Object.assign({}, tradeInAddress, { isBusinessAddress }),
    contactInfo: data.shippingInfo.contactInfo,
    shippingAddressRequired: data.checkoutStates.shippingAddressRequired,
    ...asyncCallStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateShippingAddress, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeInAddress);
