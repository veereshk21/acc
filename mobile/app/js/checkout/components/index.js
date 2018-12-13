/* eslint-disable no-unused-varss */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from './../../store';
import ReviewOrder from './ReviewOrder';

class HomePage extends Component {
  componentWillMount() {
    const {
      checkoutStates, appleMerchantIdentifier, billingInfo, isAgentSite,
    } = this.props;
    // const selectedPaymentMode = billingInfo.selectedPaymentMode.toString().toLowerCase();
    const { masterpassError } = billingInfo;
    if (billingInfo.cybersourecPreAuthFailure && isAgentSite) {
      hashHistory.push('/addPaymentMethod');
      return;
    }
    this.props.applePayOption(appleMerchantIdentifier);
    if (checkoutStates.shippingAddressRequired === true || checkoutStates.shippingAddressChangeRequired === true) {
      hashHistory.push('/deliveryInformation');
    } else if (checkoutStates.shippingMethodRequired === true) {
      hashHistory.push('/shippingMethod');
    } else if (checkoutStates.paymentRequired === true) {
      hashHistory.push('/choosePaymentMethod');
    } else if (checkoutStates.contactInfoRequired === true) {
      hashHistory.push('/ISPUContactInfo');
    }

    if (masterpassError) {
      hashHistory.push('/digitalwallet');
    }
  }

  componentDidMount() {
    const { dispatchErrorNotification, cqContent, flipIspuToShipping } = this.props;
    if (flipIspuToShipping === true) {
      dispatchErrorNotification(cqContent.error.OD_CHECKOUT_ISPU_NOTAVAILABLE_ORDER_HEAD_ERROR);
    }
    if (this.props.checkoutStates.instantCreditOrder && !this.props.checkoutStates.tradesExceedItems) {
      dispatchErrorNotification('Just a heads up that this is only an estimate until we receive and appraise your device. <br />Please remember to return your device within 30 days or you\'ll lose the credit.');
    }
    if (this.props.checkoutStates.tradesExceedItems) {
      dispatchErrorNotification('Your trade-in value has been applied as an account credit');
    }
  }
  componentDidUpdate() {
    // Agent site specific notification message handled
    if (this.props.isAgentSite && this.props.instantCreditAllocationsChanged) {
      const isTradeInEnabled = this.props.shippingInfo && typeof (this.props.shippingInfo.tradeIn) !== 'undefined' ? this.props.shippingInfo.tradeIn : false;
      if (isTradeInEnabled) {
        this.props.dispatchErrorNotification('Your taxes and trade-in instant credit have been updated based on your shipping information.');
      } else {
        this.props.dispatchErrorNotification('Your taxes have been updated based on your shipping information.');
      }
      this.props.hideInstantCreditTaxUpdatedMsg();
    } else if (this.props.instantCreditAllocationsChanged) {
      this.props.dispatchErrorNotification('Your taxes and trade-in instant credit have been updated based on your shipping information.');
      this.props.hideInstantCreditTaxUpdatedMsg();
    }
  }

  render() {
    const {
      checkoutStates, billingInfo, itemOnJaxPlan, ...rest
    } = this.props;
    return (
      <div> {checkoutStates.shippingAddressRequired === false &&
        checkoutStates.shippingMethodRequired === false &&
        checkoutStates.paymentRequired === false &&
        <ReviewOrder
          cancelOrder={this.props.clearCart}
          billingInfo={billingInfo}
          checkoutStates={checkoutStates}
          itemOnJaxPlan={itemOnJaxPlan}
          {...rest}
        />}
      </div>);
  }
}

HomePage.propTypes = {
  accessories: PropTypes.array,
  checkoutStates: PropTypes.object,
  billingInfo: PropTypes.object,
  clearCart: PropTypes.func,
  standaloneAccessories: PropTypes.bool,
  flow: PropTypes.string,
  appleMerchantIdentifier: PropTypes.string,
  applePayOption: PropTypes.func,
  itemOnJaxPlan: PropTypes.bool,
  masterpassError: PropTypes.bool,
  cqContent: PropTypes.object,
  dispatchErrorNotification: PropTypes.func,
  flipIspuToShipping: PropTypes.bool,
  instantCreditAllocationsChanged: PropTypes.bool,
  hideInstantCreditTaxUpdatedMsg: PropTypes.func,
  isAgentSite: PropTypes.bool,
  shippingInfo: PropTypes.object,
};
export default HomePage;
