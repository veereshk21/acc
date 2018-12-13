import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearCart, toggleModal, getRecommendedAcc, handle3dPaymentValidated, resetCartMessages, asyncFetch } from './../actions';
import Index from '../components';
import { showErrorNotification } from './../../common/NotificationBar/actions';

const getTotalItemsCount = (cartData) => {
  const totalDevices = cartData.items ? cartData.items.length : 0;
  const totalStandAloneAccessories = cartData.accessories ? cartData.accessories.length : 0;
  const totalBundleAccessories = cartData.accessoriesBundle ? cartData.accessoriesBundle.length : 0;

  return (totalDevices + totalStandAloneAccessories + totalBundleAccessories);
};
const getLastIntent = (cartData) => {
  const totalDevices = cartData.items ? cartData.items.length : 0;
  if (totalDevices) {
    return cartData.items[totalDevices - 1].flow === 'EUP' ? 'Upgraded' : 'Added';
  }
  return totalDevices;
};
const mapStateToProps = (state) => {
  const data = state.toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const cartData = state.get('cartData').get('output').toJS();
  const cqContent = state.get('cqContent').toJS();
  const modalStatus = state.get('modalStatus');
  const totalItems = getTotalItemsCount(cartData);
  const lastIntent = getLastIntent(cartData);
  const noAccessoriesCall = Object.prototype.hasOwnProperty.call(cartData, 'enableCartAccAjaxCall') && !cartData.enableCartAccAjaxCall;

  return {
    ...cartData,
    cqContent,
    asyncCallStatus,
    totalItems,
    lastIntent,
    modalStatus,
    authInfo: cartData.authInfo,
    masterpass3DSecure: cartData.masterpass3DSecure,
    mmplanEnabled: cartData.mmplanEnabled || false,
    emailResponse: data.accountEmailFeature || {},
    globalPromotion: cartData.globalPromotion || [],
    noAccessoriesCall,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ clearCart, toggleModal, getRecommendedAcc, showErrorNotification, handle3dPaymentValidated, resetCartMessages, asyncFetch }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
