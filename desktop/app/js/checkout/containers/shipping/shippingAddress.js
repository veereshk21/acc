import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShippingAddressEdit from '../../components/shipping/shippingAddress';
import * as actionCreators from '../../actions';
import * as NotificationActions from '../../../common/NotificationBar/actions';

const getDefaultTextNumber = (activeSMSCapableMtnList, phoneNumber) => {
  let defaultNumber = null;
  if (activeSMSCapableMtnList && activeSMSCapableMtnList.length > 0) {
    defaultNumber = activeSMSCapableMtnList.find((a) => a === phoneNumber);
    if (!defaultNumber) {
      defaultNumber = activeSMSCapableMtnList[0];
    }
  }
  return defaultNumber;
};

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const { activeSMSCapableMtnList } = data.shippingInfo.contactInfo;
  const selectedPaymentMode = data.billingInfo ? data.billingInfo.selectedPaymentMode.toLowerCase() : '';

  return {
    cqContent,
    addressInfo: data.shippingInfo.addressInfo,
    asyncCallStatus,
    loginMTN: data.loginMTN,
    orderId: data.orderId,
    formEnabled: data.smsAuthenticationComplete,
    authEnabled: data.securePinEligible,
    checkoutStates: data.checkoutStates,
    activeSMSCapableMtnList,
    textUpdateNumber: getDefaultTextNumber(activeSMSCapableMtnList, data.shippingInfo.contactInfo.phoneNumber),
    ispuEligibleFlag: data.shippingInfo && data.shippingInfo.ispuEligibleFlag && selectedPaymentMode !== 'applepay' && (activeSMSCapableMtnList ? activeSMSCapableMtnList.length > 0 : false),
    useISPUCC: true,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddressEdit);
