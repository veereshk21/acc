import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NortonSeal from '../../../../images/norton_secure_seal.svg';
import BlockSelector from '../../../common/BlockSelector';
import { hashHistory } from '../../../store';

export default class RenderPaymentOptions extends Component {
  static propTypes = {
    cqContent: PropTypes.object,
    showPaypal: PropTypes.bool,
    showApplePay: PropTypes.bool,
    showMasterpass: PropTypes.bool,
    showVisaCheckout: PropTypes.bool,
    paymentOptions: PropTypes.array,
    dueToday: PropTypes.string,
    pastDuePaymentRequired: PropTypes.bool,
    giftCardFlow: PropTypes.bool,
    paymentRequired: PropTypes.bool,
    choosePaymentMethod: PropTypes.func,
    initPaymentOptIndex: PropTypes.number,
    asyncFetch: PropTypes.func,
    asyncFetchFalied: PropTypes.func,
    selectedPaymentOptInd: PropTypes.number,
    cvvNeeded: PropTypes.bool,
    authInfo: PropTypes.object,
    handle3dPaymentValidated: PropTypes.func,
    dispatchErrorNotification: PropTypes.func,
    masterpass3DSecure: PropTypes.object,
    masterpassResponseInfo: PropTypes.object,
    masterpassError: PropTypes.bool,
    showMasterpassError: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedPaymentOptInd: props.selectedPaymentOptInd,
    };
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
  onChoosePaymentMethod() {
    const {
      initPaymentOptIndex, asyncFetchFalied, cvvNeeded, authInfo,
    } = this.props;
    const selectedPaymentIndex = this.state.selectedPaymentOptInd;
    const selectedPaymentInfo = this.props.paymentOptions[this.state.selectedPaymentOptInd];
    const { giftCardFlow } = this.props;

    if (selectedPaymentInfo.paymentType === 'savedcard' && (selectedPaymentInfo.savedCardInfo.length > 1 || cvvNeeded)) {
      hashHistory.push('/savedPayments');
      asyncFetchFalied();
    } else if (selectedPaymentInfo.paymentType === 'digitalwallet') {
      hashHistory.push('/digitalwallet');
      asyncFetchFalied();
    } else if ((initPaymentOptIndex !== selectedPaymentIndex) || this.props.paymentRequired === true) {
      if (selectedPaymentInfo.paymentType === 'savedcard') {
        const selectedCardInfo = selectedPaymentInfo.savedCardInfo[0];
        selectedCardInfo.paymentType = 'savedcard';
        if (window.Cardinal && authInfo) {
          // 3D Secure initialization and registering Event Handlers
          try {
            if (typeof authInfo.clients.CARDINAL3DSECURE.featuresList !== 'undefined' && authInfo.clients.CARDINAL3DSECURE.featuresList.binDetection) {
              window.Cardinal.trigger('accountNumber.update', selectedCardInfo.creditCardBIN);
            }
          } catch (e) {
            console.log((window.Cardinal === undefined ? 'Cardinal Cruise did not load properly. ' : 'Cardinal :::: An error occurred during processing. ') + e);
          }
        }
        this.props.choosePaymentMethod(selectedCardInfo, false, giftCardFlow, this.cardinalInit);
        asyncFetchFalied();
      } else if (selectedPaymentInfo.paymentType === 'addcard') {
        hashHistory.push(giftCardFlow ? '/addPaymentMethod/giftCard' : '/addPaymentMethod');
        asyncFetchFalied();
      } else {
        this.props.choosePaymentMethod(selectedPaymentInfo, false, giftCardFlow, this.cardinalInit);
      }
    } else if (this.props.pastDuePaymentRequired) {
      this.props.choosePaymentMethod(selectedPaymentInfo, this.props.pastDuePaymentRequired, giftCardFlow, this.cardinalInit);
    } else {
      hashHistory.push('/');
    }
  }
  handleOptionChange = (id) => {
    const { asyncFetch } = this.props;
    this.setState({ selectedPaymentOptInd: id });
    asyncFetch();
    setTimeout(() => {
      this.onChoosePaymentMethod();
    }, 500);
  }
  render() {
    const {
      paymentOptions,
      showPaypal,
      showApplePay,
      showMasterpass,
      showVisaCheckout,
      cqContent,
      dueToday,
    } = this.props;

    const renderedOptions = paymentOptions.map((paymentOpt, id) => {
      const radioName = `contractradio${id}`;
      const radioLBLsubClass = '';
      let title = '';
      let value = '';
      let description = '';
      const { siteId } = window;
      if (paymentOpt.paymentType === 'BTA' && !siteId) {
        title = 'Bill to my account';
        value = 'BTA';
        description = `$${dueToday} will be added to your next bill`;
      } else if (paymentOpt.paymentType === 'newcard' && !siteId) {
        title = <span className="textTransCapitalize">{paymentOpt.creditCardType}</span>;
        description = `****-${paymentOpt.creditCardNumber.slice(-4)}`;
        value = 'newcard';
      } else if (paymentOpt.paymentType === 'savedcard' && !siteId) {
        title = 'Saved payment methods';
        if (paymentOpt.savedCardInfo.length > 1) {
          description = `${paymentOpt.savedCardInfo.length} saved payment types`;
        } else {
          description = <span className="textTransUppercase">{`${paymentOpt.savedCardInfo[0].creditCardType} ****-${paymentOpt.savedCardInfo[0].creditCardNumber.slice(-4)}`}</span>;
        }

        value = 'savedcard';
      } else if (paymentOpt.paymentType === 'digitalwallet' && !siteId) {
        // Digital Wallet Overlay
        title = 'Pay with a digital wallet';
        value = 'digitalwallet';
        description = (
          <div>
            <p>{cqContent.label.OD_CHECKOUT_DIGITALWALLET_PAY_OPTS}</p>
            <div className="height24 margin3 onlyTopMargin">
              {showApplePay &&
                <img src="https://ss7.vzw.com/is/image/VerizonWireless/card_applepay?fmt=png-alpha" className="floatLeft height24 margin3 onlyRightMargin" alt="Apple Pay" />
              }
              {showPaypal &&
                <img src="https://ss7.vzw.com/is/image/VerizonWireless/card_paypal?fmt=png-alpha" className="floatLeft height24 margin3 onlyRightMargin" alt="PayPal" />
              }
              {showMasterpass &&
                <span className="masterpass_wallet_icon floatLeft " />
              }
              {showVisaCheckout &&
                <img src="https://ss7.vzw.com/is/image/VerizonWireless/card_visacheckout?fmt=png-alpha" className="floatLeft height24 margin3 onlyRightMargin" alt="Visa Checkout" />
              }
            </div>
          </div>


        );
      } else if (paymentOpt.paymentType === 'addcard') {
        title = 'Add a new payment method';
        value = 'addcard';
        description = (
          <div >
            <p>Credit or debit cards accepted.</p>
            <div className="height24">
              <img src={NortonSeal} srcSet={`${NortonSeal} 2x`} alt="NortonSeal" className="height24" />
            </div>
          </div>
        );
      } else {
        return null;
      }

      return (
        <div
          className=""
          key={id}
        >
          <BlockSelector
            id={radioName}
            isActive={this.state.selectedPaymentOptInd === id}
            onClick={() => this.handleOptionChange(id, value)}
          >
            <div className="fontSize_4"><strong>{title}</strong></div>
            <div className={radioLBLsubClass}>{description}</div>
          </BlockSelector>
        </div>
      );
    });
    return renderedOptions;
  }
}
