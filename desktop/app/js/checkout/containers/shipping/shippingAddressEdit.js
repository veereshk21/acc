import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShippingAddressEdit from '../../components/shipping/shippingAddressEdit';
import * as actionCreators from '../../actions';
import * as NotificationActions from '../../../common/NotificationBar/actions';

const getSelectedShippingInfo = (data) => {
  const { selectedShippingType } = data;

  let shippingOptionDetails = null;
  if (selectedShippingType.type === 'SHIPPING') {
    // if (selectedShippingType === "SHIPPING"), filter by selected shipping option
    shippingOptionDetails = data.shippingInfo.shippingTypesInfo.filter((shippingOption) => (shippingOption.addedShippingOptionId === true))[0];
  } else if (selectedShippingType.type === 'ISPU') {
    // in case of ISPU, always select the least priced option and that is first one.
    shippingOptionDetails = data.shippingInfo.shippingTypesInfo[0];
  }
  return {
    shippingType: shippingOptionDetails ? shippingOptionDetails.shippingOptionId : null,
    shippingAddressType: (selectedShippingType.type === 'SHIPPING') ? 'shipToMe' : 'ISPU',
  };
};

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const form = state.get('form').toJS().shippingAddress;
  const selectedShippingInfo = getSelectedShippingInfo(data);
  const selectedPaymentMode = data.billingInfo ? data.billingInfo.selectedPaymentMode.toLowerCase() : '';
  return {
    cqContent,
    states: data.states,
    contactInfo: data.shippingInfo.contactInfo,
    checkoutStates: data.checkoutStates,
    asyncCallStatus,
    initialValues: {
      ...data.shippingInfo.addressInfo,
      shipToType: (data.shippingInfo.addressInfo.businessName !== null) ? 'business' : 'residence',
      sameAsBilling: data.shippingInfo.sameAsBilling,
      ...selectedShippingInfo,
    },
    formEnabled: data.smsAuthenticationComplete,
    authEnabled: data.securePinEligible,
    authUrl: data.securePinPageUrl,
    formValues: form ? form.values : {},
    loginMTN: data.loginMTN,
    billingAddress: data.billingInfo.billingAddress,
    ispuEligibleFlag: data.shippingInfo && data.shippingInfo.ispuEligibleFlag && selectedPaymentMode !== 'applepay' && selectedPaymentMode !== 'paypal' && (data.shippingInfo.contactInfo.activeSMSCapableMtnList ? data.shippingInfo.contactInfo.activeSMSCapableMtnList.length > 0 : false),
    addressInfo: data.shippingInfo.addressInfo,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddressEdit);
