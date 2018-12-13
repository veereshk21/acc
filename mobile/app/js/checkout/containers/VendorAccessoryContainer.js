/* eslint-disable no-param-reassign */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import VendorShipping from '../components/VendorShipping';
import * as actionCreators from '../actions';
import * as NotificationActions from '../../common/NotificationBar/actions';

const getShippingOptions = (shippingInfo, selectedShippingType, cqContent, paymentType, giftCardFlow) => {
  const _shippingInfo = Object.assign({}, shippingInfo);
  // If selected payment type as "Apple pay ", disable ISPU.
  if (paymentType && (paymentType.toLowerCase() === 'applepay' || paymentType.toLowerCase() === 'paypal' || giftCardFlow)) {
    _shippingInfo.ispuEligibleFlag = false;
  }
  // add ISPU as one of the shipping methods if ispuEligibleFlag is true
  if (_shippingInfo.ispuEligibleFlag === true) {
    _shippingInfo.shippingTypesInfo.push({
      ispuOption: true,
      shippingDescription: cqContent.label.OD_CHECKOUT_DELIVERY_METHOD_ISPU_LABEL_TEXT,
      addedShippingOptionId: false,
      description: cqContent.label.OD_CHECKOUT_DELIVERY_METHOD_ISPU_DESCRIPTION_TEXT,
    });
  }
  _shippingInfo.shippingTypesInfo = _shippingInfo.shippingTypesInfo.map((shippingMethod) => {
    if (_shippingInfo.ispuEligibleFlag === true && selectedShippingType.type === 'ISPU') {
      if (shippingMethod.ispuOption === true) {
        shippingMethod.addedShippingOptionId = true;
      } else {
        shippingMethod.addedShippingOptionId = false;
      }
    }
    // Defaults 2-Day Shipping in the gift card flow
    if (giftCardFlow && shippingMethod.shippingOptionId === 'SHP002') {
      shippingMethod.addedShippingOptionId = true;
    }
    return shippingMethod;
  });
  return _shippingInfo;
};

const getDefaultShippingMethod = (shippingTypes) => shippingTypes.filter((shippingMethod) => (shippingMethod.addedShippingOptionId === true))[0];
// const getBackupShipping = (shippingTypes) => shippingTypes.filter((shippingMethod) => (shippingMethod.shippingOptionId === 'SHP002'))[0];

function mapStateToProps(state, ownProps) {
  const data = state.get('orderDetails').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const cqContent = state.get('cqContent').toJS();
  const giftCardFlow = ownProps.match.params.type === 'giftCard';
  const paymentType = (data && data.billingInfo && data.billingInfo.selectedPaymentMode) ? data.billingInfo.selectedPaymentMode.toString().toLocaleLowerCase() : '';
  const shippingInfo = getShippingOptions(data.shippingInfo, data.selectedShippingType, cqContent, paymentType, giftCardFlow);
  // const standaloneAccessories =  (data && data.standaloneAccessories) ? data.standaloneAccessories : "";
  return {
    cqContent,
    shippingInfo,
    // standaloneAccessories,
    selectedShippingMethod: getDefaultShippingMethod(shippingInfo.vendorShippingTypesInfo),
    dueToday: data.dueToday,
    shippingMethodRequired: data.checkoutStates.shippingMethodRequired,
    flow: data.flow,
    poboExistsInCart: shippingInfo.poboExistsInCart,
    ...asyncCallStatus,
    giftCardFlow,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actionCreators, NotificationActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorShipping);
