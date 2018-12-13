import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../common/Loader/Loader';

import ApplePay from '../applePay';
import Modal from '../../common/modal/modal';

class ChoosePaymentMethod extends Component {
  componentWillMount() {
    const {
      applePayEnabled, applePayOption, appleMerchantIdentifier, showApplePay,
    } = this.props;
    if (applePayEnabled && !showApplePay) {
      applePayOption(appleMerchantIdentifier);
    }
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.applePayEnabled === true && window.ApplePaySession) {
      return true;
    }
    if (nextProps.isNotificationVisible && nextProps.showModal && nextProps.showModal === this.props.showModal) {
      this.props.closeFn();
    }
    return true;
  }
  applePaymentSuccessCallback(responseData) {
    this.updateApplePaymentInfo(responseData);
  }

  applePaymentErrorCallaback(errorData) {
    this.showApplePayErrorInfo(errorData);
  }
  applePayPaymentMethod = () => {
    if (document.getElementsByClassName('apple-pay-cta')[0]) {
      document.getElementsByClassName('apple-pay-cta')[0].click();
    }
  }
  masterpassPaymentMethod = () => {
    console.log(this.props);
    try {
      window.masterpass.checkout(this.props.masterpassConfigInfo);
    } catch (err) {
      console.log(err); // eslint-disable-line
      this.props.showErrorNotification('Unable to Proceed with Masterpass. Please Choose other payment option to proceed.');
    }
  }

  render() {
    const {
      isFetching, appleMerchantIdentifier, applePaymentRequest, showModal, closeFn, showPaypal, showApplePay, showMasterpass, showVisaCheckout,
    } = this.props;

    return (
      <Modal
        mounted={showModal}
        style={{ background: 'white', width: 320, minHeight: 400 }}
        className="positionRelative"
        closeFn={closeFn}
        underlayColor="rgba(0,0,0,0.8)"
      >
        <div className="pad18 onlyTopPad">
          {isFetching === true && <Loader />}
          <section className="">
            <h2 className="h2 textAlignCenter">Select a digital wallet.</h2>
            <p className="textAlignCenter margin3 noSideMargin">Please select a payment method that you wish to finish the transaction with.</p>
          </section>

          <div className="textAlignCenter margin42">
            {showApplePay &&
              <div
                id="applepay"
                onClick={this.applePayPaymentMethod}
                style={{ padding: '1px 6px', margin: '6px 2px' }}
              >
                <ApplePay
                  merchantIdentifier={appleMerchantIdentifier}
                  orderDetails={applePaymentRequest}
                  successCallback={this.applePaymentSuccessCallback}
                  errorCallback={this.applePaymentErrorCallaback}
                  errorMessage={`We couldn't process your $${applePaymentRequest.totalAmount} payment.<br/>Please try a different payment method.`}
                  paymentMethodRedesign
                  {...this.props}
                />
              </div>
            }
            {showPaypal &&
              <button
                id="paypal"
                className="margin6 noSideMargin noBorder background_transparent"
                onClick={this.props.paypalPaymentMethod}
              >
                <img
                  src="https://ss7.vzw.com/is/image/VerizonWireless/button_paypal?fmt=png-alpha&hei=60"
                  srcSet="https://ss7.vzw.com/is/image/VerizonWireless/button_paypal?fmt=png-alpha&hei=120 2x"
                  className="width100"
                  alt="PayPal"
                  id="paypal_btn"
                />
              </button>
            }
            {showMasterpass &&
              <button
                id="masterpass"
                className="margin6 noSideMargin noBorder background_transparent"
                onClick={this.masterpassPaymentMethod}
              >
                <span className="masterpass_wallet_overlay_button" id="masterpass_btn" title="masterpass" />
              </button>

            }
            {showVisaCheckout &&
              <button
                id="visacheckout"
                className="margin6 noSideMargin noBorder background_transparent"
                onClick={() => { }}
              >
                <img
                  src="https://ss7.vzw.com/is/image/VerizonWireless/button_visacheckout?fmt=png-alpha&hei=60"
                  srcSet="https://ss7.vzw.com/is/image/VerizonWireless/button_visacheckout?fmt=png-alpha&hei=120 2x"
                  className="width100"
                  alt="Visa Checkout"
                  id="visacheckout_btn"
                />
              </button>

            }
          </div>
        </div>
      </Modal>
    );
  }
}

ChoosePaymentMethod.propTypes = {
  paymentOptions: PropTypes.array,
  paypalPaymentMethod: PropTypes.func,
  applePayPaymentMethod: PropTypes.func,
  cqContent: PropTypes.object,
  isFetching: PropTypes.bool,
  applePayEnabled: PropTypes.bool,
  appleMerchantIdentifier: PropTypes.string,
  applePaymentRequest: PropTypes.object,
  applePayOption: PropTypes.func,
  showModal: PropTypes.bool,
  closeFn: PropTypes.func,
  showPaypal: PropTypes.bool,
  showApplePay: PropTypes.bool,
  showMasterpass: PropTypes.bool,
  showVisaCheckout: PropTypes.bool,
  masterpassConfigInfo: PropTypes.object,
  showErrorNotification: PropTypes.func,
};

export default ChoosePaymentMethod;
