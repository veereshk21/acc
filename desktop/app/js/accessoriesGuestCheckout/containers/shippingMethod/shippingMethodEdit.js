import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShippingMethodEdit from '../../components/shippingMethod/shippingMethodEdit';
import * as actionCreators from '../../actions';
import * as NotificationActions from '../../../common/NotificationBar/actions';

const getShippingOptions = (shippingInfo, selectedShippingType, cqContent, paymentType, giftCardFlow) => {
  const _shippingInfo = Object.assign({}, shippingInfo);
  // If selected payment type as "Apple pay or PayPal", disable ISPU.
  if (paymentType && (paymentType.toLowerCase() === 'applepay' || paymentType.toLowerCase() === 'paypal' || giftCardFlow)) {
    _shippingInfo.ispuEligibleFlag = false;
  }

  // add ISPU as one of the shipping methods if ispuEligibleFlag is true
  if (_shippingInfo.ispuEligibleFlag === true) {
    _shippingInfo.shippingTypesInfo.push({
      ispuOption: true,
      shippingDescription: cqContent.label.DT_OD_CHECKOUT_DELIVERY_METHOD_ISPU_LABEL_TEXT,
      addedShippingOptionId: false,
      description: cqContent.label.DT_OD_CHECKOUT_DELIVERY_METHOD_ISPU_DESCRIPTION_TEXT,
      shippingCost: '0.00',
      shippingOptionId: 'ISPU',
    });
  }
  _shippingInfo.shippingTypesInfo = _shippingInfo.shippingTypesInfo.map((method) => {
    const shippingMethod = method;
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

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const cqContent = state.get('cqContent').toJS();
  const form = state.get('form').toJS().chooseShippingMethod;

  // To Do: Update with giftcard list check
  const giftCardFlow = false;
  const paymentType = (data && data.billingInfo && data.billingInfo.selectedPaymentMode) ? data.billingInfo.selectedPaymentMode.toString().toLocaleLowerCase() : '';
  const shippingInfo = getShippingOptions(data.shippingInfo, data.selectedShippingType, cqContent, paymentType, giftCardFlow);
  const selectedShippingMethod = getDefaultShippingMethod(shippingInfo.shippingTypesInfo);
  const selectedDeliveryWindow = selectedShippingMethod && selectedShippingMethod.shippingOptionId === 'SDD_SAMEDAY' ? selectedShippingMethod.sddAvailableWindows.filter((option) => (option.selected))[0] : '';

  return {
    cqContent,
    shippingInfo,
    // standaloneAccessories,
    selectedShippingMethod,
    dueToday: data.dueToday,
    shippingMethodRequired: data.checkoutStates.shippingMethodRequired,
    flow: data.flow,
    poboExistsInCart: shippingInfo.poboExistsInCart,
    ...asyncCallStatus,
    giftCardFlow,
    initialValues: { shippingRadio: (selectedShippingMethod ? selectedShippingMethod.shippingOptionId : null), availWindows: (selectedDeliveryWindow ? selectedDeliveryWindow.id : '') },
    selectedShippingRadio: form && form.values ? form.values.shippingRadio : '',
    selectedDeliveryWindow: form && form.values ? form.values.availWindows : '',
    standaloneAccessories: data.standaloneAccessories,
    poboMessage: data.shippingInfo.poboMessage,
    stepsCompleted: data.stepsCompleted,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingMethodEdit);
