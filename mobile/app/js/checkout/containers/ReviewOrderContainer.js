import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReviewOrder from '../components/index';
import * as actionCreators from '../actions';


const getPaymentInfo = (billingInfo) => {
  let paymentMethod = null;
  if (billingInfo.billToAccountEligible === true) {
    paymentMethod = 'BTA';// TODO-check with backend
  } else {
    // eslint-disable-next-line consistent-return
    billingInfo.savedCardInfo.forEach((savedCard) => {
      if (savedCard.preselectCard === true) {
        paymentMethod = savedCard.savedCardNickName;
        return true;
      }
    });
  }
  return paymentMethod;
};
function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  console.log(data);
  return {
    accessories: data.accessories,
    device: data.devices.items[0],
    addressInfo: data.shippingInfo.addressInfo,
    selectedShippingType: data.selectedShippingType,
    paymentInfo: getPaymentInfo(data.billingInfo),
    dueToday: data.dueToday,
    dueMonthly: data.dueMonthly,
    cartDetailURL: data.cartDetailURL,
    termsAndConditionsInfo: data.termsAndConditionsInfo,
    ...asyncCallStatus,
    giftCardsEnabled: data.giftCardsEnabled,
    giftCardsLimit: data.giftCardsLimit,
    giftCardsUsed: data.giftCardsUsed,
    balanceCreditCardAmount: data.balanceCreditCardAmount,
    totalGiftCardAmount: data.totalGiftCardAmount,
    bicRepresentationChangeEnabled: data.bicRepresentationChangeEnabled,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewOrder);
