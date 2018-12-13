/* eslint-disable no-nested-ternary */
/**
 * Created by mambig on 1/4/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import { hashHistory } from './../../store';
import Loader from '../../common/Loader/Loader';
import SavedCard from './SavedCard';
import NewCard from './NewCard';


import ApplePay from '../applePay';
import BackButton from '../../common/BackButton/BackButton';

import BillToAccountIcon from '../../../images/572127ddd1643ec731780679.svg';

class ChoosePaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.swiper = null;
    // initial index
    this.state = {
      initPaymentOptIndex: props.selectedPaymentOptInd,
      selectedSlideIndex: props.selectedPaymentOptInd,
    };
    this.paymentOptionsLength = this.props.paymentOptions ? this.props.paymentOptions.length : 0;
  }
  componentWillMount() {
    const { paymentOptions, applePayOption, appleMerchantIdentifier } = this.props;
    const applePayOpt = paymentOptions.filter((payment) => payment.paymentType === 'applepay');
    if (!applePayOpt.length) {
      applePayOption(appleMerchantIdentifier);
    }
  }
  componentDidMount() {
    const {
      handle3dPaymentValidated, dispatchErrorNotification, authInfo, asyncFetchFalied, cqContent,
    } = this.props;
    if (window.Cardinal && authInfo) {
      try {
        window.Cardinal.configure({
          logging: {
            level: 'on',
          },
        });

        window.Cardinal.setup('init', {
          jwt: authInfo.clients.CARDINAL3DSECURE.token,
        });

        window.Cardinal.on('payments.setupComplete', () => {
          console.log('Cardinal setup Complete');
        });

        window.Cardinal.on('payments.validated', (data, jwt) => {
          console.log('Trigger::: ChoosePaymentMethod', data);
          if (typeof data.Payment !== 'undefined' && data.Payment.Type !== undefined) {
            switch (data.ActionCode) {
              case 'SUCCESS': // Handle successful authentication scenario and validate the signature on the JWT
                console.log('Trigger::: ChoosePaymentMethod ::: SUCCESS');
                handle3dPaymentValidated(data, jwt);// dispatches handle3dPaymentValidated action
                break;

              case 'NOACTION': // Handle unenrolled scenario
                console.log('Trigger::: ChoosePaymentMethod ::: NOACTION');
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
          }
        });
      } catch (e) {
        // An error occurred
        console.log((window.Cardinal === undefined ? 'Cardinal Cruise did not load properly. ' : 'An error occurred during processing. ') + e);
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
      console.log('Component UnMounted from ChoosePaymentMethod');
      window.Cardinal.off('payments.validated');
    }
  }
  onChoosePaymentMethod() {
    const { initPaymentOptIndex } = this.state;
    const selectedPaymentIndex = this.state.selectedSlideIndex;
    const { paymentOptions } = this.props;
    let selectedPaymentInfo = paymentOptions[this.state.selectedSlideIndex];
    if (selectedPaymentInfo.paymentType === 'BTA' && window.siteId) {
      selectedPaymentInfo = paymentOptions[1]; // eslint-disable-line
    }
    const { giftCardFlow } = this.props;
    if (selectedPaymentInfo && selectedPaymentInfo.paymentType === 'applepay') {
      if (document.getElementsByClassName('apple-pay-cta')[0]) {
        document.getElementsByClassName('apple-pay-cta')[0].click();
      }
    } else if (selectedPaymentInfo.paymentType === 'addcard') {
      if (giftCardFlow) {
        hashHistory.push('/addPaymentMethod/giftCard', selectedPaymentIndex);
      } else {
        hashHistory.push('/addPaymentMethod');
      }
    } else if (selectedPaymentInfo.paymentType === 'savedcard') {
      hashHistory.push(`/addPaymentMethod?query=${selectedPaymentIndex + 1}`);
    } else {
      // eslint-disable-next-line no-lonely-if
      if ((initPaymentOptIndex !== selectedPaymentIndex) || this.props.paymentRequired === true || this.props.defaultedPaymentIndex) {
        if (selectedPaymentInfo.paymentType === 'PAYPAL') {
          this.props.paypalPaymentMethod();
        } else {
          this.props.choosePaymentMethod(selectedPaymentInfo, false, giftCardFlow);
        }
      } else if (this.props.pastDuePaymentRequired) {
        this.props.choosePaymentMethod(selectedPaymentInfo, this.props.pastDuePaymentRequired, giftCardFlow);
      } else {
        hashHistory.push('/');
      }
    }
  }
  applePaymentSuccessCallback(responseData) {
    this.updateApplePaymentInfo(responseData);
  }

  applePaymentErrorCallaback(errorData) {
    this.showApplePayErrorInfo(errorData);
  }

  render() {
    let siteLoaded;
    if (!window.siteId) {
      siteLoaded = false;
    } else {
      siteLoaded = true;
    }
    const {
      cqContent, isFetching, dueToday, selectedPaymentOptInd, paymentOptions, selectedShippingType, applePayEnabled, appleMerchantIdentifier, applePaymentRequest, checkoutStates, showLoaderMessage,
    } = this.props;
    const params = {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: () => '<span class="swiper-pagination-bullet"></span>',
      },
      slidesPerView: 'auto',
      paginationClickable: true,
      spaceBetween: 40,
      centeredSlides: true,
      observeParents: true,
      observer: true,
      initialSlide: selectedPaymentOptInd,
      on: {
        slideChangeTransitionEnd: () => {
          setTimeout(() => {
            this.setState({ selectedSlideIndex: this.swiper.snapIndex });
          }, 300);
        },
      },
    };

    const isValidPayment = (paymentOptions[this.state.selectedSlideIndex].paymentType === 'PAYPAL') && selectedShippingType.type === 'ISPU';
    const isNewCard = (paymentOptions[this.state.selectedSlideIndex].paymentType === 'addcard');
    const btaCustomStyle = {
      backgroundImage: "url('" + BillToAccountIcon + "'), none",
    };
    const _lodermessage = showLoaderMessage ? cqContent.label.OD_CHECKOUT_PROGRESS_MESSAGE : null;

    return (
      <div className="pad12 onlyTopPad">
        {isFetching === true && <Loader content={_lodermessage} />}
        {isValidPayment || this.props.pastDuePaymentRequired || checkoutStates.paymentRequired ?
          <div className="clear6" style={{ height: 28 }} />
          :
          <BackButton to="/">{cqContent.label.OD_CHECKOUT_BACK_TEXT}</BackButton>}
        <section className="pad20">
          {this.props.pastDuePaymentRequired &&
            <h6 className="textAlignCenter color_red margin12 onlyBottomMargin" >
              {cqContent.label.OD_CHECKOUT_PAST_DUE_PAYMENT_DESCRIPTION_TEXT}{this.props.pastDueAmount}
            </h6>
          }
          <h2 className="textAlignCenter bold">{cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_TITLE_TEXT} </h2>
          <p className="textAlignCenter fontSize_2"><span className="bold">${dueToday}</span>&nbsp;
            <span>{cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_TITLE_DESCRIPTION_TEXT}</span>
          </p>
        </section>

        <div className="margin42 onlyTopMargin" style={{ height: '180px' }}>
          <Swiper {...params} ref={(node) => this.swiper = node !== null ? node.swiper : null}>
            {
              paymentOptions.map((paymentOpt, id) => {
                if (!siteLoaded) {
                  if (paymentOpt.paymentType === 'BTA' && !siteLoaded) {
                    return (<div key={id} className="paymentMethod billToAccount margin42 onlyBottomMargin" id="bta">
                      <div className="slideCard">
                        <span
                          className="is-hidden"
                          aria-label={`Multi-page view slide ${parseInt(id, 10) + 1} of ${parseInt(paymentOptions.length, 10)}`}
                        />
                        <p
                          className="textAlignCenter billToAccountTopText width100"
                        >{cqContent.label.OD_CHECKOUT_BILL_TO_ACCOUNT_TEXT}
                        </p>
                        <div className="billToAccount_icon" style={btaCustomStyle} />
                        <p
                          className="textAlignCenter billToAccountBottomText width100 legalFinePrint"
                        >{cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_BILL_INCREASE_TEXT}&nbsp;
                      ${dueToday}
                        </p>
                      </div></div>);
                  }
                  if (applePayEnabled === true && paymentOpt.paymentType === 'applepay') {
                    const paymentErrorMsg = "We couldn't process your $" + applePaymentRequest.totalAmount + ' payment.<br/>Please try a different payment method.';
                    return (
                      <div key={id} className="paymentMethod billToAccount margin42 onlyBottomMargin" id="applepay">
                        <div className="slideCard"><span
                          className="is-hidden"
                          aria-label={`Multi-page view slide ${parseInt(id, 10) + 1} of ${parseInt(paymentOptions.length, 10)}`}
                        />
                        <p className="textAlignCenter width100 margin3 onlyTopMargin" >Use Apple Pay</p>
                        <div className="pad6 textAlignCenter margin12 onlyBottomMargin" style={{ height: 120 }}>
                          <ApplePay merchantIdentifier={appleMerchantIdentifier} orderDetails={applePaymentRequest} successCallback={this.applePaymentSuccessCallback} errorCallback={this.applePaymentErrorCallaback} errorMessage={paymentErrorMsg} {...this.props} />
                        </div>
                        </div>
                      </div>);
                  }
                  if (paymentOpt.paymentType === 'PAYPAL') {
                    return (<div key={id} className="paymentMethod billToAccount margin42 onlyBottomMargin" id="paypal">
                      <div className="slideCard"><span
                        className="is-hidden"
                        aria-label={`Multi-page view slide ${parseInt(id, 10) + 1} of ${parseInt(paymentOptions.length, 10)}`}
                      />
                      <img src="http://s7.vzw.com/is/image/VerizonWireless/paypal_card_mf?$cpo$" alt="Paypal" height="140px" width="220px" />
                      </div></div>);
                  }
                }
                if ((paymentOpt.paymentType === 'newcard' || paymentOpt.paymentType === 'savedcard') && paymentOpt.creditCardNumber) {
                  const cardNumberStr = paymentOpt.creditCardNumber.toString();
                  const cardNumberSpliced = cardNumberStr.substring(cardNumberStr.length - 4);

                  return (<div key={id} className="paymentMethod margin42 onlyBottomMargin" id="saved">
                    <div className="slideCard"><span
                      className="is-hidden"
                      aria-label={`Multi-page view slide ${parseInt(id, 10) + 1} of ${parseInt(paymentOptions.length, 10)}`}
                    />
                    <SavedCard
                      cardName={paymentOpt.savedCardNickName}
                      cardNumber={cardNumberSpliced}
                      cardType={paymentOpt.creditCardType}
                    />
                    </div></div>);
                } if (paymentOpt.paymentType === 'addcard') {
                  return (<div key={id} className="paymentMethod margin42 onlyBottomMargin" id="new">
                    <div className="slideCard">
                      <span className="is-hidden" aria-label={`Multi-page view slide ${parseInt(id, 10) + 1} of ${parseInt(paymentOptions.length, 10)}`} />
                      <NewCard cardOverlayMsg={cqContent.label.OD_CHECKOUT_ADD_NEW_CREDIT_CARD_OVERLAY_MSG} />
                    </div></div>);
                }
                return null;
              })
            }
          </Swiper>
        </div>

        <section className="pad20">
          {isValidPayment ? (
            <div
              className="textAlignCenter color_red fontSize_3 pad20 onlySidePad"
            >{cqContent.error.OD_CHECKOUT_PAYMENT_METHOD_INVALID_PAYMENT_METHOD_ERROR}
            </div>) :
            ((paymentOptions.length > 0 && !isNewCard) ?
              <p className="textAlignCenter clearfix">{cqContent.label.OD_CHECKOUT_USE_PAYMENT_METHOD_TEXT}</p> : <p className="textAlignCenter clearfix">{cqContent.label.OD_CHECKOUT_ADD_NEW_CREDIT_PROCEED_MSG}</p>)}
        </section>

        {paymentOptions.length > 0 &&
          <footer className="textAlignCenter footerContent width100 margin36 onlyBottomMargin">
            {this.props.pastDuePaymentRequired ?
              <button
                className={'primary button large ' + (isValidPayment && 'disabled')}
                disabled={isValidPayment}
                analyticstrack="submit-selected-payment"
                onClick={this.onChoosePaymentMethod.bind(this)}
              >Process Payment
              </button>
              :
              <button
                className={'primary button large ' + (isValidPayment && 'disabled')}
                disabled={isValidPayment}
                onClick={this.onChoosePaymentMethod.bind(this)}
                analyticstrack="submit-selected-payment"
              >{cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_BUTTON_TEXT}
              </button>}
          </footer>}
      </div>
    );
  }
}

ChoosePaymentMethod.propTypes = {
  dueToday: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paymentOptions: PropTypes.array,
  choosePaymentMethod: PropTypes.func,
  paypalPaymentMethod: PropTypes.func,
  selectedPaymentOptInd: PropTypes.number,
  cqContent: PropTypes.object,
  isFetching: PropTypes.bool,
  applePayEnabled: PropTypes.bool,
  appleMerchantIdentifier: PropTypes.string,
  applePaymentRequest: PropTypes.object,
  applePayOption: PropTypes.func,
  selectedShippingType: PropTypes.object,
  paymentRequired: PropTypes.bool,
  pastDuePaymentRequired: PropTypes.bool,
  pastDueAmount: PropTypes.string,
  checkoutStates: PropTypes.object,
  giftCardFlow: PropTypes.bool,
  defaultedPaymentIndex: PropTypes.any,
  handle3dPaymentValidated: PropTypes.func,
  dispatchErrorNotification: PropTypes.func,
  authInfo: PropTypes.object,
  asyncFetchFalied: PropTypes.func,
  showLoaderMessage: PropTypes.bool,
};

export default ChoosePaymentMethod;
