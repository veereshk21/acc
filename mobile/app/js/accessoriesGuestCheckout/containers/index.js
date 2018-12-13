import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Landing from '../components/';
import * as actions from '../actions';
import * as NotificationActions from '../../common/NotificationBar/actions';

const getPaymentInfo = (checkoutStates, billingInfo) => {
  let paymentMethod = null;
  const paymentMode = billingInfo.selectedPaymentMode ? billingInfo.selectedPaymentMode.toString().toLocaleLowerCase() : '';
  if (checkoutStates.paymentRequired === false) {
    if (paymentMode === 'bta') {
      paymentMethod = 'Bill to account';
    } else if (paymentMode === 'applepay') {
      const applePaymentInfo = billingInfo.applePayResponseInfo || {};
      const appleNetWork = (typeof applePaymentInfo.displayName !== 'undefined') ? applePaymentInfo.displayName : '';
      const appleEmail = (typeof applePaymentInfo.emailAddress !== 'undefined') ? applePaymentInfo.emailAddress : '';
      paymentMethod = `<div class='apple-pay-button apple-pay-button-white-with-line apple-pay-button-logo'></div><br/>${appleNetWork}<br/>${appleEmail}`;
    } else if (paymentMode === 'paypal') {
      paymentMethod = `<div><img src='https://ss7.vzw.com/is/image/VerizonWireless/paypal_horiz_logo?$cpo$' height='12px' /><br/></div>${billingInfo.paypalEmailAddress}`;
    } else if (paymentMode === 'masterpass') {
      paymentMethod = `<div class='height30 positionRelative'>
      <div class='positionAbsolute' style='top: -10px; right: 0;'>
        <img src='https://static.masterpass.com/dyn/img/acc/global/mp_mark_hor_blk.svg' height='16px' />
        <p>${billingInfo.masterpassResponseInfo.cardType} (****${billingInfo.masterpassResponseInfo.lastDigits} )</p>
        <p>${billingInfo.masterpassResponseInfo.emailAddress}</p>
      </div>
      </div>`;
    } else if (paymentMode === 'savedcard') {
      // eslint-disable-next-line consistent-return
      billingInfo.savedCardInfo.forEach((savedCard) => {
        if (savedCard.preselectCard === true) {
          paymentMethod = savedCard.savedCardNickName.toString();
          return true;
        }
      });
    } else if (paymentMode === 'newcard') {
      paymentMethod = billingInfo.creditCardInfo.creditCardNumber;
      if (paymentMethod) paymentMethod.toString();
    }
  }

  return paymentMethod;
};
const mapStateToProps = (state) => {
  const data = state.get('orderDetails').toJS();
  const cq = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  return {
    states: data.states,
    steps: data.stepsCompleted,
    cq,
    ...asyncCallStatus,
    ...data,
    paymentInfo: getPaymentInfo(data.checkoutStates, data.billingInfo),
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, actions, NotificationActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

