import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../../common/Loader/Loader';
import BackButton from './../../../common/BackButton/';
import ApplePay from '../../applePay';

class ChoosePaymentMethod extends Component {
  componentWillMount() {
    const {
      applePayEnabled, applePayOption, appleMerchantIdentifier, showApplePay,
    } = this.props;
    if (applePayEnabled && !showApplePay) {
      applePayOption(appleMerchantIdentifier);
    }
    this.cardinalInit = window.cardinalInit || false;
  }
  componentDidMount = () => {
    const {
      handle3dPaymentValidated, dispatchErrorNotification, authInfo, masterpass3DSecure, asyncFetchFalied, cqContent, masterpassResponseInfo,
    } = this.props;
    const _this = this;
    // Masterpass Error Notification, ex: preauth errors
    if (this.props.masterpassError) {
      this.props.showMasterpassError();
    }

    // Checking for Cardinal's 3D Secure JS
    if (window.Cardinal) {
      // 3D Secure initialization and registering Event Handlers
      if (authInfo) {
        try {
          window.Cardinal.configure({
            logging: {
              level: 'verbose',
            },
          });
          if (masterpass3DSecure && masterpassResponseInfo) {
            const _orderDetails = {
              Consumer: {
                Account: {
                  AccountNumber: masterpassResponseInfo.creditCardBIN,
                },
              },
            };
            window.Cardinal.setup('init', {
              jwt: authInfo.clients.CARDINAL3DSECURE.token,
              order: _orderDetails,
            });
          } else {
            window.Cardinal.setup('init', {
              jwt: authInfo.clients.CARDINAL3DSECURE.token,
            });
          }


          window.Cardinal.on('payments.setupComplete', () => {
            console.log('Cardinal setup Complete');
            _this.cardinalInit = true;
            window.cardinalInit = true;
            // Trigger 3D Secure flow for Masterpass card, exisitng cards are handled in the actions.js
            if (masterpass3DSecure) {
              window.Cardinal.continue(
                'cca',
                {
                  AcsUrl: masterpass3DSecure.acsUrl,
                  Payload: masterpass3DSecure.payload,
                },
                {
                  OrderDetails: {
                    TransactionId: masterpass3DSecure.transId,
                  },
                }
              );
            }
          });

          window.Cardinal.on('payments.validated', (data, jwt) => {
            console.log('Trigger::: ChoosePaymentMethod RD', data);
            if (typeof data.Payment !== 'undefined' && data.Payment.Type !== undefined) {
              switch (data.ActionCode) {
                case 'SUCCESS': // Handle successful authentication scenario and validate the signature on the JWT
                  console.log('Trigger::: ChoosePaymentMethod RD ::: SUCCESS');
                  handle3dPaymentValidated(data, jwt);// dispatches handle3dPaymentValidated action
                  break;

                case 'NOACTION': // Handle unenrolled scenario
                  console.log('Trigger::: ChoosePaymentMethod RD :: NOACTION');
                  handle3dPaymentValidated(data, jwt);
                  break;

                case 'FAILURE': // Handle authentication failed or error encounter scenario
                  console.log('FAILURE');
                  asyncFetchFalied();
                  dispatchErrorNotification(cqContent.error.OD_CHECKOUT_CARDINAL_FAILURE_ERROR);
                  break;

                case 'ERROR': // Handle service level error
                  console.log('ERROR');
                  asyncFetchFalied();
                  dispatchErrorNotification(cqContent.error.OD_CHECKOUT_CARDINAL_ERROR_ERROR);
                  break;

                default:
                  break;
              }
            } else if (data.ActionCode === 'ERROR' || data.ActionCode === 'FAILURE') {
              console.log(data.ActionCode);
              asyncFetchFalied();
              dispatchErrorNotification(cqContent.error.OD_CHECKOUT_CARDINAL_ERROR_ERROR);
            } else {
              _this.cardinalInit = false;
            }
          });
        } catch (e) {
          // An error occurred
          _this.cardinalInit = false;
          console.log((window.Cardinal === undefined ? 'Cardinal Cruise did not load properly. ' : 'Cardinal :::: An error occurred during processing. ') + e);
        }
      }
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
      isFetching, appleMerchantIdentifier, applePaymentRequest, showPaypal, showApplePay, showMasterpass, showVisaCheckout, cqContent, lodermessage,
    } = this.props;

    return (

      <div className="pad18 onlyTopPad">
        {isFetching === true && <Loader content={lodermessage} />}
        <BackButton to="/choosePaymentMethod">{cqContent.label.OD_CHECKOUT_BACK_TEXT}</BackButton>
        <div>
          <section className=" pad15">
            <h2 className="h2">Select a digital wallet.</h2>
            <p className="margin3 noSideMargin">Please select a payment method that you wish to finish the transaction with.</p>
          </section>

          <div className="pad15 textAlignCenter">
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
                />
              </button>
            }
            {showMasterpass &&
              <button
                id="masterpass"
                className="margin6 noSideMargin noBorder background_transparent"
                onClick={this.masterpassPaymentMethod}
              >
                <span className="masterpass_wallet_overlay_button" title="masterpass" />
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
                />
              </button>

            }
          </div>
        </div>
      </div>
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
  lodermessage: PropTypes.string,
  handle3dPaymentValidated: PropTypes.func,
  dispatchErrorNotification: PropTypes.func,
  authInfo: PropTypes.object,
  masterpass3DSecure: PropTypes.object,
  asyncFetchFalied: PropTypes.func,
  masterpassError: PropTypes.bool,
  showMasterpassError: PropTypes.func,
  masterpassResponseInfo: PropTypes.object,

};

export default ChoosePaymentMethod;
