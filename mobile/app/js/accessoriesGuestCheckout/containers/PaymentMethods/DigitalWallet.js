import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChoosePaymentMethod from '../../components/PaymentMethods/digitalWallet';
import * as actionCreators from '../../actions';
import * as notificationActions from '../../../common/NotificationBar/actions';

function mapStateToProps(state, ownProps) {
  const data = state.get('orderDetails').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const cqContent = state.get('cqContent').toJS();
  const applePayAvailable = state.get('applePayAvailable');
  const appleMerchantIdentifier = (data.appleMerchantIdentifier) ? data.appleMerchantIdentifier : '';
  const selectedShippingOption = (data && data.selectedShippingType && data.selectedShippingType.type) ? data.selectedShippingType.type : '';

  return {
    cqContent,
    pastDuePaymentRequired: data.checkoutStates.pastDuePaymentRequired,
    checkoutStates: data.checkoutStates,
    pastDueAmount: data.pastDueAmount,
    selectedShippingType: data.selectedShippingType,
    dueToday: data.dueToday,
    applePayEnabled: (data.applePayEnabled) ? data.applePayEnabled : false,
    applePaymentRequest: (data.applePaymentRequest) ? data.applePaymentRequest : {},
    appleMerchantIdentifier,
    ...asyncCallStatus,
    showModal: ownProps.showModal,
    closeFn: ownProps.closeFn,
    showPaypal: data.payPalEnabled,
    showApplePay: (selectedShippingOption !== 'ISPU' && data.applePayEnabled === true && applePayAvailable === true && data.checkoutStates.pastDuePaymentRequired !== true),
    showMasterpass: data.masterpassEnabled,
    showVisaCheckout: false,
    masterpassConfigInfo: data.masterpassConfigInfo,
    isNotificationVisible: state.get('notification').isNotificationVisible,
    masterpassError: data.billingInfo.masterpassError,
    masterpass3DSecure: data.billingInfo.masterpass3DSecure,
    authInfo: data.authInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...notificationActions, ...actionCreators }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePaymentMethod);
