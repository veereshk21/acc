import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from './../../store';
import Loader from '../../common/Loader/Loader';
import RadioButton from '../../common/RadioButton/';
import BackButton from '../../common/BackButton/BackButton';
import DigitalWalletModal from './../containers/DigitalWalletModal';


class ChoosePaymentMethod extends Component {
  constructor(props) {
    super(props);
    // initial index
    this.state = {
      selectedPaymentOptInd: props.selectedPaymentOptInd,
      initPaymentOptIndex: props.selectedPaymentOptInd,
      showModal: false,
    };
    this.paymentOptionsLength = this.props.paymentOptions ? this.props.paymentOptions.length : 0;
    this.cardinalInit = window.cardinalInit || false;
  }

  componentWillMount() {
    const {
      paymentOptions, applePayOption, appleMerchantIdentifier, applePayEnabled, showApplePay,
    } = this.props;

    if (paymentOptions.length === 0) {
      hashHistory.push(this.props.giftCardFlow ? '/addPaymentMethod/giftCard' : '/addPaymentMethod');
    }

    if (applePayEnabled && !showApplePay) {
      applePayOption(appleMerchantIdentifier);
    }
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
            console.log('Cardinal setup Complete'); // eslint-disable-line
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
    if (nextProps.paymentOptions && nextProps.paymentOptions.length !== this.paymentOptionsLength) {
      return false;
    }
    return true;
  }
  componentWillUnmount() {
    if (window.Cardinal) {
      console.log('Component UnMounted from ChoosePaymentMethod ::: RD');
      window.Cardinal.off('payments.validated');
    }
  }
  onChoosePaymentMethod() {
    const { initPaymentOptIndex } = this.state;
    const selectedPaymentIndex = this.state.selectedPaymentOptInd;
    const selectedPaymentInfo = this.props.paymentOptions[this.state.selectedPaymentOptInd];
    const { giftCardFlow } = this.props;
    const {
      authInfo,
    } = this.props;
    const { creditCardBIN } = selectedPaymentInfo;

    if (selectedPaymentInfo.paymentType === 'savedcard') {
      // Checking for Cardinal's 3D Secure JS
      if (window.Cardinal && authInfo) {
        // 3D Secure initialization and registering Event Handlers
        try {
          if (typeof authInfo.clients.CARDINAL3DSECURE.featuresList !== 'undefined' && authInfo.clients.CARDINAL3DSECURE.featuresList.binDetection) {
            window.Cardinal.trigger('accountNumber.update', creditCardBIN);
          }
        } catch (e) {
          console.log((window.Cardinal === undefined ? 'Cardinal Cruise did not load properly. ' : 'Cardinal :::: An error occurred during processing. ') + e);
        }
      }
    }
    if (selectedPaymentInfo.paymentType === 'digitalwallet') {
      this.setState({ showModal: true });
    } else if (selectedPaymentInfo.paymentType === 'addcard') {
      if (giftCardFlow) {
        hashHistory.push('/addPaymentMethod/giftCard');
      } else {
        hashHistory.push('/addPaymentMethod');
      }
    } else if (selectedPaymentInfo.paymentType === 'savedcard' && window.siteId) {
      hashHistory.push(`/addPaymentMethod?query=${selectedPaymentIndex + 1}`);
    } else if ((initPaymentOptIndex !== selectedPaymentIndex) || this.props.paymentRequired === true) {
      this.props.choosePaymentMethod(selectedPaymentInfo, false, giftCardFlow, this.cardinalInit);
    } else if (this.props.pastDuePaymentRequired) {
      this.props.choosePaymentMethod(selectedPaymentInfo, this.props.pastDuePaymentRequired, giftCardFlow, this.cardinalInit);
    } else {
      hashHistory.push('/');
    }
  }
  handleOptionChange(changeEvent) {
    this.setState({ selectedPaymentOptInd: changeEvent });
  }
  applePaymentSuccessCallback(responseData) {
    this.updateApplePaymentInfo(responseData);
  }

  applePaymentErrorCallaback(errorData) {
    this.showApplePayErrorInfo(errorData);
  }
  closeDigitalWalletModal = () => {
    this.setState({ showModal: false });
  }
  renderOptions() {
    let siteLoaded;
    if (!window.siteId) {
      siteLoaded = false;
    } else {
      siteLoaded = true;
    }
    const {
      paymentOptions,
      showPaypal,
      showApplePay,
      showMasterpass,
      showVisaCheckout,
      cqContent,
    } = this.props;

    const renderedOptions = paymentOptions.map((paymentOpt, id) => {
      const radioName = `contractradio${id}`;
      const radioLBLsubClass = 'pad6 onlyTopPad';
      let title = '';
      let value = '';
      let description = '';
      if (paymentOpt.paymentType === 'BTA' && !siteLoaded) {
        // Bill to account
        title = 'Bill to my account';
        value = 'BTA';
        description = `Your next bill will be increase by $${this.props.dueToday}`;
      } else if (paymentOpt.creditCardNumber) {
        console.log(paymentOpt); //eslint-disable-line
        if (paymentOpt.paymentType === 'newcard' || !paymentOpt.savedCardNickName) {
          // New Card or Saved Card without a Nickname
          title = <span className="textTransCapitalize">{paymentOpt.creditCardType}</span>;
          description = `****-${paymentOpt.creditCardNumber.slice(-4)}`;
          value = 'paymentOpt.creditCardNumber';
        } else {
          // Saved Card with Nickname
          title = paymentOpt.savedCardNickName;
          description = `${paymentOpt.creditCardType.toUpperCase()} ****-${paymentOpt.creditCardNumber.slice(-4)}`;
          value = 'paymentOpt.creditCardNumber';
        }
      } else if (paymentOpt.paymentType === 'digitalwallet' && !siteLoaded) {
        // Digital Wallet Overlay
        title = 'Pay with a digital wallet';
        value = 'digitalwallet';
        description = (
          <div>
            <p>{cqContent.label.OD_CHECKOUT_DIGITALWALLET_PAY_OPTS}</p>
            <div className="height36 margin-6 onlyLeftMargin onlyTopPad pad6">
              {showApplePay &&
                <img src="https://ss7.vzw.com/is/image/VerizonWireless/card_applepay?fmt=png-alpha&wid=50&hei=30" srcSet="https://ss7.vzw.com/is/image/VerizonWireless/card_applepay?fmt=png-alpha&wid=100&hei=60 2x" className="height100 margin3 sideMarginOnly" alt="Apple Pay" />
              }
              {showPaypal &&
                <img src="https://ss7.vzw.com/is/image/VerizonWireless/card_paypal?fmt=png-alpha&wid=50&hei=30" srcSet="https://ss7.vzw.com/is/image/VerizonWireless/card_paypal?fmt=png-alpha&wid=100&hei=60 2x" className="height100 margin3 sideMarginOnly" alt="PayPal" />
              }
              {showMasterpass &&
                <span className="masterpass_wallet_icon margin3 sideMarginOnly" />
              }
              {showVisaCheckout &&
                <img src="https://ss7.vzw.com/is/image/VerizonWireless/card_visacheckout?fmt=png-alpha&wid=50&hei=30" srcSet="https://ss7.vzw.com/is/image/VerizonWireless/card_visacheckout?fmt=png-alpha&wid=100&hei=60 2x" className="height100 margin3 sideMarginOnly" alt="Visa Checkout" />
              }
            </div>
          </div>
        );
      } else if (paymentOpt.paymentType === 'addcard') {
        // Bill to account
        title = <p className="margin10 onlyTopMargin">{cqContent.label.OD_CHECKOUT_ADD_NEW_CREDIT_CARD_OVERLAY_MSG}</p>;
        value = 'AddCard';
      } else {
        return null;
      }

      return (
        <div
          className="pad36 noSidePad border_EB onlyBottomBorder verticalAlignMiddle floatLeft clearfix width100"
          key={id}
        >
          <RadioButton
            name="contractradio"
            id={radioName}
            value={value}
            defaultChecked={this.state.selectedPaymentOptInd === id}
            onChange={this.handleOptionChange.bind(this, id)}
            analyticstrack="choose-payment-method"
          >
            <div className=""><strong>{title}</strong></div>
            <div className={radioLBLsubClass}>{description}</div>
          </RadioButton>
        </div>
      );
    });
    return renderedOptions;
  }

  render() {
    const {
      cqContent, isFetching, dueToday, paymentOptions, checkoutStates, showLoaderMessage,
    } = this.props;
    const isValidPayment = this.state.selectedPaymentOptInd >= 0;
    const _lodermessage = showLoaderMessage ? cqContent.label.OD_CHECKOUT_PROGRESS_MESSAGE : null;
    return (
      <div className="pad12 onlyTopPad">
        <DigitalWalletModal
          showModal={this.state.showModal}
          closeFn={this.closeDigitalWalletModal}
        />
        {isFetching === true && <Loader content={_lodermessage} />}
        {!isValidPayment || this.props.pastDuePaymentRequired || checkoutStates.paymentRequired ?
          <div className="clear6" style={{ height: 28 }} />
          :
          <BackButton to="/">{cqContent.label.OD_CHECKOUT_BACK_TEXT}</BackButton>}
        <section className="pad20 noBottomPad">
          {this.props.pastDuePaymentRequired &&
            <h6 className="textAlignCenter color_red margin12 onlyBottomMargin" >
              {cqContent.label.OD_CHECKOUT_PAST_DUE_PAYMENT_DESCRIPTION_TEXT}{this.props.pastDueAmount}
            </h6>
          }
          <h2 className="textAlignCenter bold">{cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_TITLE_TEXT}</h2>
          <p className="textAlignCenter margin12 noSideMargin"><span className="bold">${dueToday}</span>&nbsp;
            <span>{cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_TITLE_DESCRIPTION_TEXT}</span>
          </p>
        </section>

        <div className="pad20 sidePadOnly clearfix">
          {this.renderOptions()}
        </div>

        {(!isValidPayment && this.state.selectedPaymentOptInd >= 0) &&
          <section className="pad20">
            <p className={`textAlignCenter fontSize_3 ${!isValidPayment && 'color_red'}`} >{cqContent.error.OD_CHECKOUT_PAYMENT_METHOD_INVALID_PAYMENT_METHOD_ERROR} </p>
          </section>
        }

        <footer className="textAlignCenter footerContent width100 margin36 noSideMargin">
          {paymentOptions.length > 0 &&
            <button
              className={'primary button large ' + (!isValidPayment ? 'disabled' : '')}
              disabled={!isValidPayment}
              onClick={this.onChoosePaymentMethod.bind(this)}
              analyticstrack="submit-selected-payment"
            >
              {this.props.pastDuePaymentRequired ? 'Process Payment' : cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_BUTTON_TEXT}
            </button>

          }

        </footer>
      </div>
    );
  }
}

ChoosePaymentMethod.propTypes = {
  dueToday: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paymentOptions: PropTypes.array,
  choosePaymentMethod: PropTypes.func,
  selectedPaymentOptInd: PropTypes.number,
  cqContent: PropTypes.object,
  isFetching: PropTypes.bool,
  // selectedShippingType: PropTypes.object,
  paymentRequired: PropTypes.bool,
  pastDuePaymentRequired: PropTypes.bool,
  pastDueAmount: PropTypes.string,
  checkoutStates: PropTypes.object,
  giftCardFlow: PropTypes.bool,
  showPaypal: PropTypes.bool,
  showApplePay: PropTypes.bool,
  showMasterpass: PropTypes.bool,
  showVisaCheckout: PropTypes.bool,
  masterpassError: PropTypes.bool,
  showMasterpassError: PropTypes.func,
  handle3dPaymentValidated: PropTypes.func,
  dispatchErrorNotification: PropTypes.func,
  authInfo: PropTypes.object,
  masterpass3DSecure: PropTypes.object,
  appleMerchantIdentifier: PropTypes.string,
  applePayOption: PropTypes.func,
  applePayEnabled: PropTypes.bool,
  asyncFetchFalied: PropTypes.func,
  showLoaderMessage: PropTypes.bool,
  masterpassResponseInfo: PropTypes.object,
};

export default ChoosePaymentMethod;
