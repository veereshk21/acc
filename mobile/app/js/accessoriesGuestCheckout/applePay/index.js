/* eslint-disable no-undef,no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './assests/applepay.css';
import {
  API_SUCCESS_CODE,
  PAYMENT_COUNTRY_CODE,
  PAYMENT_COUNTRY_CURRENCY_CODE,
  VZW_SUPPORTED_PAYMENT_NETWORKS,
  VZW_SUPPORTED_PAYMENT_NETWORK_CAPABILITIES,
  GET_APPLE_SESSION_URL,
  PROCESS_PAYMENT_URL,
} from './constants';

class ApplePay extends Component {
  constructor(props) {
    super(props);
    this.appleSession = null;
    this.shippingCost = '0.00';
    this.initiateApplePayment = this.initiateApplePayment.bind(this);
  }
  getAppleCTAStyle(merchant) {
    let ctaStyle = null;
    if (window.ApplePaySession && ApplePaySession.canMakePayments) {
      const merchantIdentifier = merchant;
      const promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
      promise.then((canMakePayments) => {
        if (canMakePayments) {
          ctaStyle = {
            visibility: 'visible',
          };
        } else {
          ctaStyle = {
            visibility: 'hidden',
          };
        }
      });
    } else {
      ctaStyle = {
        visibility: 'hidden',
      };
    }
    return ctaStyle;
  }
  initiateApplePayment() {
    const orderJSON = this.props.orderDetails;
    const paymentRequest = {
      countryCode: PAYMENT_COUNTRY_CODE,
      currencyCode: PAYMENT_COUNTRY_CURRENCY_CODE,
      supportedNetworks: VZW_SUPPORTED_PAYMENT_NETWORKS,
      merchantCapabilities: VZW_SUPPORTED_PAYMENT_NETWORK_CAPABILITIES,
    };
    if (orderJSON.showAvailableShippingOptions && orderJSON.showAvailableShippingOptions === true) {
      if (orderJSON.availableShippingMethods && orderJSON.availableShippingMethods.length > 0) {
        paymentRequest.shippingMethods = orderJSON.availableShippingMethods;
        this.shippingCost = orderJSON.defaultShippingCost;
      }
    }
    if (orderJSON.lineItems && orderJSON.lineItems.length > 0) {
      paymentRequest.lineItems = orderJSON.lineItems;
    }
    if (orderJSON.requestBillingInfoFromApple && orderJSON.requestBillingInfoFromApple.length > 0) {
      paymentRequest.requiredBillingContactFields = orderJSON.requestBillingInfoFromApple;
    }
    if (orderJSON.requestShippingInfoFromApple && orderJSON.requestShippingInfoFromApple.length > 0) {
      paymentRequest.requiredShippingContactFields = orderJSON.requestShippingInfoFromApple;
    }
    if (typeof orderJSON.totalAmount !== 'undefined' && orderJSON.totalAmount !== null) {
      paymentRequest.total = {
        label: orderJSON.orderTotalLabel || 'Verizon Payment',
        amount: orderJSON.totalAmount,
      };
      try {
        const session = new ApplePaySession(2, paymentRequest);
        this.registerMerchantValidationEvent(session);
        this.registerShippingMethodSelectionEvent(session);
        this.registerCancelPaymentEvent(session);
        this.registerPaymentAuthEvent(session);
        session.begin();
      } catch (err) {
        const errorJSON = { type: 'error', message: this.props.errorMessage };
        this.props.errorCallback(errorJSON);
      }
    }
  }
  registerMerchantValidationEvent(appleSessionObj) {
    if (appleSessionObj) {
      const self = this;
      appleSessionObj.onvalidatemerchant = (event) => {
        console.log('Validate merchant');
        const { validationURL } = event;
        axios.post(GET_APPLE_SESSION_URL, { endPointURL: validationURL }).then((response) => {
          if (response.data.statusCode === API_SUCCESS_CODE) {
            console.log('GET_APPLE_SESSION_URL returned success status');
            const responseJSON = response.data.output;
            let sessionDetails = {};
            if (responseJSON && responseJSON.svcBdy) {
              sessionDetails = responseJSON.svcBdy.getSessionRes;
            } else {
              sessionDetails = responseJSON;
            }
            appleSessionObj.completeMerchantValidation(sessionDetails);
          } else {
            console.log('GET_APPLE_SESSION_URL returned failure status');
            const errorJSON = { type: 'error', message: this.props.errorMessage };
            try {
              appleSessionObj.abort();
            } catch (err) {
              console.log('In onvalidatemerchant function Apple session aborting error \n', err.message);
            }
            self.props.errorCallback(errorJSON);
          }
        }).catch((error) => {
          console.log('GET_APPLE_SESSION_URL service call failed ===> \n\n', error.message);
          self.props.errorCallback();
        });
      };
    }
  }
  registerShippingMethodSelectionEvent(appleSessionObj) {
    if (appleSessionObj) {
      const self = this;
      appleSessionObj.onshippingmethodselected = (event) => {
        const selectedShippingAmount = event.shippingMethod.amount;
        const { totalAmount } = self.props.orderJSON;
        const { shippingCost } = self;
        const tmpTotalCost = (parseFloat(totalAmount) - parseFloat(shippingCost)).toFixed(2);
        const totalCost = (parseFloat(tmpTotalCost) + parseFloat(selectedShippingAmount)).toFixed(2);
        self.shippingCost = selectedShippingAmount;
        const lineItems = [
          {
            label: 'Shipping',
            amount: selectedShippingAmount,
          },
        ];

        const total = {
          label: self.props.orderJSON.orderTotalLabel || 'Verizon Payment',
          amount: totalCost,
        };
        appleSessionObj.completeShippingMethodSelection(ApplePaySession.STATUS_SUCCESS, total, lineItems);
      };
    }
  }
  registerCancelPaymentEvent(appleSessionObj) {
    if (appleSessionObj) {
      const self = this;
      appleSessionObj.oncancel = (event) => {
        console.log('oncancel ===> \n', event);
        const errorJSON = { type: 'error', message: self.props.errorMessage };
        self.props.errorCallback(errorJSON);
      };
    }
  }
  registerPaymentAuthEvent(appleSessionObj) {
    if (appleSessionObj) {
      const self = this;
      appleSessionObj.onpaymentauthorized = (event) => {
        const paymentResponseJSON = event.payment;
        console.log('onpaymentauthorized returned success ===> \n\n');
        axios.post(PROCESS_PAYMENT_URL, paymentResponseJSON).then((response) => {
          if (response.data.statusCode === API_SUCCESS_CODE) {
            console.log('PROCESS_PAYMENT_URL returned success status');
            appleSessionObj.completePayment(ApplePaySession.STATUS_SUCCESS);
            self.props.successCallback(response.data.output);
          } else {
            console.log('PROCESS_PAYMENT_URL returned failure status');
            const errorJSON = { type: 'error', message: self.props.errorMessage };
            try {
              appleSessionObj.abort();
            } catch (err) {
              console.log('In onpaymentauthorized function Apple session aborting error ', err.message);
            }
            self.props.errorCallback(errorJSON);
          }
        }).catch((error) => {
          console.log('PROCESS_PAYMENT_URL service failed ===> \n\n', error.message);
          const errorJSON = { type: 'error', message: self.props.errorMessage };
          self.props.errorCallback(errorJSON);
        });
      };
    }
  }

  render() {
    const { merchantIdentifier, paymentMethodRedesign } = this.props;
    if (typeof window.ApplePaySession !== 'undefined' && window.ApplePaySession) {
      return (
        <div className="inheritHeight">
          {paymentMethodRedesign ?
            <div className="inheritHeight" style={this.getAppleCTAStyle(merchantIdentifier)}>
              <img
                src="https://ss7.vzw.com/is/image/VerizonWireless/button_applepay?fmt=png-alpha&hei=60"
                srcSet="https://ss7.vzw.com/is/image/VerizonWireless/button_applepay?fmt=png-alpha&hei=120 2x"
                className="width100"
                alt="ApplePay"
                id="applePay_btn"
              />
            </div>
            :
            <div className="apple-pay-button apple-pay-button-white-with-line apple-pay-checkout-button inheritHeight" style={this.getAppleCTAStyle(merchantIdentifier)} />
          }
          <div className="apple-pay-cta is-hidden" role="button" onClick={(event) => this.initiateApplePayment(event)} />
        </div>
      );
    }
    return null;
  }
}

ApplePay.propTypes = {
  merchantIdentifier: PropTypes.string,
  orderDetails: PropTypes.object,
  errorCallback: PropTypes.func,
  errorMessage: PropTypes.string,
  paymentMethodRedesign: PropTypes.bool,
};

export default ApplePay;
