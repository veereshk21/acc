import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { hashHistory } from './../../../store';
import Loader from '../../../common/Loader/Loader';
import BackButton from '../../../common/BackButton/BackButton';
import DigitalWalletModal from './../../containers/DigitalWalletModal';
import RenderPaymentOptions from './RenderPaymentOptions';

class ChoosePaymentMethod extends Component {
  constructor(props) {
    super(props);
    // initial index
    this.state = {
      selectedPaymentOptInd: props.selectedPaymentOptInd,
      initPaymentOptIndex: props.selectedPaymentOptInd,
    };
    this.paymentOptionsLength = this.props.paymentOptions ? this.props.paymentOptions.length : 0;
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

  applePaymentSuccessCallback(responseData) {
    this.updateApplePaymentInfo(responseData);
  }

  applePaymentErrorCallaback(errorData) {
    this.showApplePayErrorInfo(errorData);
  }

  renderOptions() {

  }

  render() {
    const {
      cqContent, isFetching, dueToday, checkoutStates, showLoaderMessage, cvvNeeded,
    } = this.props;
    const isValidPayment = this.state.selectedPaymentOptInd >= 0;
    const _lodermessage = showLoaderMessage ? cqContent.label.OD_CHECKOUT_PROGRESS_MESSAGE : null;

    if (this.props.showpage === 'digitalwallet') {
      return (<DigitalWalletModal
        lodermessage={_lodermessage}
      />);
    }
    return (
      <Grid className="pad12 onlyTopPad">
        {isFetching && <Loader />}
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={12}>
                {isValidPayment && !this.props.pastDuePaymentRequired && !checkoutStates.paymentRequired &&
                  <BackButton to="/">{cqContent.label.OD_CHECKOUT_BACK_TEXT}</BackButton>
                }
              </Col>
            </Row>
            <Row className="pad18 ">
              <Col xs={9} >
                {this.props.pastDuePaymentRequired &&
                  <h6 className="margin12 onlyBottomMargin" >
                    {cqContent.label.OD_CHECKOUT_PAST_DUE_PAYMENT_DESCRIPTION_TEXT}{this.props.pastDueAmount}
                  </h6>
                }
                <h2>{cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_TITLE_TEXT}</h2>
                <p className="fontSize_3">
                  <span className="fontTextMedium">${dueToday}</span>&nbsp;
                  <span>{cqContent.label.OD_CHECKOUT_PAYMENT_METHOD_TITLE_DESCRIPTION_TEXT}</span>
                </p>
              </Col>
            </Row>

            <div className="pad20 sidePadOnly clearfix">
              <RenderPaymentOptions {...this.props} selectedPaymentOptInd={this.state.selectedPaymentOptInd} initPaymentOptIndex={this.state.initPaymentOptIndex} cvvNeeded={cvvNeeded} />
            </div>

            {(!isValidPayment && this.state.selectedPaymentOptInd >= 0) &&
              <section className="pad20">
                <p className={`textAlignCenter fontSize_3 ${!isValidPayment && 'color_red'}`} >{cqContent.error.OD_CHECKOUT_PAYMENT_METHOD_INVALID_PAYMENT_METHOD_ERROR} </p>
              </section>
            }
          </Col>
        </Row>
      </Grid>
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
  asyncFetch: PropTypes.func,
  showLoaderMessage: PropTypes.bool,
  showpage: PropTypes.string,
  cvvNeeded: PropTypes.bool,
};

export default ChoosePaymentMethod;
