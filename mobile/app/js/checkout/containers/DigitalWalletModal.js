import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChoosePaymentMethod from '../components/DigitalWalletModal';
import * as actionCreators from '../actions';
import * as notificationActions from '../../common/NotificationBar/actions';

function mapStateToProps(state, ownProps) {
  const data = state.get('orderDetails').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const cqContent = state.get('cqContent').toJS();
  const applePayAvailable = state.get('applePayAvailable');
  const appleMerchantIdentifier = (data.appleMerchantIdentifier) ? data.appleMerchantIdentifier : '';

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
    showApplePay: (data.applePayEnabled === true && applePayAvailable === true && data.checkoutStates.pastDuePaymentRequired !== true),
    showMasterpass: data.masterpassEnabled,
    showVisaCheckout: false,
    masterpassConfigInfo: data.masterpassConfigInfo,
    isNotificationVisible: state.get('notification').isNotificationVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...notificationActions, ...actionCreators }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePaymentMethod);
