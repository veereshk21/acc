import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DeliveryInformation from '../components/DeliveryInformation';
import { updateShippingAddress } from '../actions';
import * as NotificationActions from '../../common/NotificationBar/actions';

const getSelectedShippingInfo = (data) => {
  const { selectedShippingType } = data;
  let shippingOptionDetails = null;
  if (selectedShippingType.type === 'SHIPPING') {
    // if (selectedShippingType === "SHIPPING"), filter by selected shipping option
    shippingOptionDetails = data.shippingInfo.shippingTypesInfo.filter((shippingOption) => (shippingOption.addedShippingOptionId === true))[0]; // eslint-disable-line
  } else if (selectedShippingType.type === 'ISPU') {
    // in case of ISPU, always select the least priced option and that is first one.
    shippingOptionDetails = data.shippingInfo.shippingTypesInfo[0]; // eslint-disable-line
  }

  return {
    shippingType: shippingOptionDetails ? shippingOptionDetails.shippingOptionId : null,
    shippingAddressType: (data.selectedShippingType.type === 'SHIPPING') ? 'shipToMe' : 'ISPU',
  };
};

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const deliveryInformationForm = state.get('form').get('deliveryInformationForm');
  const asyncCallStatus = state.get('asyncCallStatus');
  const isBusinessAddress = (data.shippingInfo.addressInfo.businessName !== null);

  return {
    cqContent,
    states: data.states,
    selectedShippingInfo: getSelectedShippingInfo(data, deliveryInformationForm),
    addressInfo: Object.assign({}, data.shippingInfo.addressInfo, { businessAddress: isBusinessAddress }),
    contactInfo: data.shippingInfo.contactInfo,
    shippingAddressRequired: data.checkoutStates.shippingAddressRequired,
    shippingAddressChangeRequired: data.checkoutStates.shippingAddressChangeRequired,
    smsAuthenticationComplete: data.smsAuthenticationComplete,
    securePinPageUrl: data.securePinPageUrl,
    securePinEligible: data.securePinEligible,
    iconicFlow: true, // TODO: clean up all iconic flag based conditions and make the iconic flag based statements default
    // iconicFlow: data.iconicFlow,
    ...asyncCallStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateShippingAddress, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryInformation);
