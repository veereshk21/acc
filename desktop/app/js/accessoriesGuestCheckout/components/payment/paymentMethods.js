import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { renderTextField } from '../../../common/TextField/';
import RadioButton from '../../../common/RadioButton/index';
import ApplePay from '../../applePay';
import CardSprite from '../../../../images/credit-cards-sprite.png';
import MSelect from '../../../common/Select/index';
import * as validation from '../../../common/validation';

const PaymentMethods = (props) => {
  const applePaymentSuccessCallback = (responseData) => {
    props.updateApplePaymentInfo(responseData);
  };

  const applePaymentErrorCallaback = (errorData) => {
    props.showApplePayErrorInfo(errorData);
  };

  const applePayPaymentMethod = () => {
    if (document.getElementsByClassName('apple-pay-cta')[0]) {
      document.getElementsByClassName('apple-pay-cta')[0].click();
    }
  };

  const masterpassPaymentMethod = () => {
    try {
      window.masterpass.checkout(props.masterpassConfigInfo);
    } catch (err) {
      console.log(err); // eslint-disable-line  no-console
      props.showErrorNotification(props.cqContent.label.DT_OD_CHECKOUT_PAYMENT_MASTERPASS_GENERIC_ERROR);
    }
  };

  const getPaymentDetails = (paymentOpt) => {
    const {
      savedCards,
      selectedRadioButton,
      appleMerchantIdentifier,
      applePaymentRequest,
      cqContent,
      showCVV,
      selectedSavedCardIndex,
      billingInfo,
      orderSelectedPaymentMode,
    } = props;
    const cardType = savedCards[0] && savedCards[selectedSavedCardIndex].creditCardType;
    let title = null;
    let description = null;
    let expansion = null;
    const { paymentType } = paymentOpt;
    if (paymentType === 'BTA') {
      // Bill to account
      title = (<p>{cqContent.label.DT_OD_CHECKOUT_PAYMENT_BTA}</p>);
      description = (
        <p className="legal margin36 sideMarginOnly">
          <span>{cqContent.label.DT_OD_CHECKOUT_PAYMENT_BTA_DESCRIPTION}</span>
          <a className="link" href="/support/bill-to-account-faqs/">
            {cqContent.label.DT_OD_CHECKOUT_PAYMENT_BTA_DESCRIPTION_LINK}
          </a>
        </p>
      );
    } else if (paymentType === 'savedcard') {
      // Saved Cards
      title = <p>{cqContent.label.DT_OD_CHECKOUT_PAYMENT_SAVED_CARD}</p>;
      description = (
        <div className="margin6 noSideMargin width positionRelative" style={{ maxWidth: 320 }}>
          <span className={`creditCards m_${cardType} m_entered`} style={{ background: `url(${CardSprite}) no-repeat` }} />
          <MSelect
            name="savedCard"
            aria-label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_TEXT_UPDATES}
            id="savedCard"
            borderStyle
            style={{ paddingLeft: 55 }}
            disabled={selectedRadioButton !== 'savedcard'}
          >
            {savedCards.map((card, index) => (
              <option
                key={`card-${index}`}
                value={index}
              >
                {card.savedCardNickName} (Ending in {card.creditCardNumber && card.creditCardNumber.length > 4 ? card.creditCardNumber.slice(-4) : card.creditCardNumber})
              </option>
            ))}
          </MSelect>
        </div>
      );
      if (showCVV) {
        expansion = (
          <div className="margin30 noSideMargin" style={{ maxWidth: 320 }}>
            <Field
              className=""
              component={renderTextField}
              id="card_cvc"
              name="card_cvc"
              normalize={validation.allowOnlyNumbers}
              maxLength="4"
              label="CVV"
              type="password"
              disabled={selectedRadioButton !== 'savedcard'}
            />
          </div>
        );
      }
    } else if (paymentType === 'newcard') {
      // New Cards
      title = <p>{cqContent.label.DT_OD_CHECKOUT_PAYMENT_NEW_CARD}</p>;
    } else if (paymentType === 'applepay') {
      // ApplePay
      title = <img src="http://s7.vzw.com/is/image/VerizonWireless/card_applepay?fmt=png-alpha" alt={cqContent.label.DT_OD_CHECKOUT_PAYMENT_APPLEPAY_IMG_ALT} height="40px" />;
      expansion = (
        <button
          id="applepay"
          onClick={applePayPaymentMethod}
          style={{ padding: '1px 6px', margin: '6px 2px' }}
        >
          <ApplePay
            merchantIdentifier={appleMerchantIdentifier}
            orderDetails={applePaymentRequest}
            successCallback={applePaymentSuccessCallback}
            errorCallback={applePaymentErrorCallaback}
            errorMessage={cqContent.error.DT_OD_CHECKOUT_PAYMENT_APPLEPAY_FAILURE.replace('$APPLEPAYMENTREQUEST$', applePaymentRequest.totalAmount)}
            {...props}
          />
        </button>
      );
    } else if (paymentType === 'paypal') {
      // PayPal
      title = <img src="http://s7.vzw.com/is/image/VerizonWireless/card_paypal?fmt=png-alpha" alt={cqContent.label.DT_OD_CHECKOUT_PAYMENT_PAYPAL_IMG_ALT} height="40px" />;
      expansion = (
        <div className="margin6">
          <button
            className="primary button large"
            onClick={props.paypalPaymentMethod}
          >
            Log in to PayPal
          </button>
        </div>
      );
      if (orderSelectedPaymentMode === 'paypal') {
        description = <p className="margin36 onlyLeftMargin pad6 noSidePad">{billingInfo.paypalEmailAddress}</p>;
      }
    } else if (paymentType === 'masterpass') {
      // Masterpass
      title = <img src="https://static.masterpass.com/dyn/img/acc/global/mp_mark_ver_blk.svg" className="masterpassIcon" alt={cqContent.label.DT_OD_CHECKOUT_PAYMENT_MASTERPASS_IMG_ALT} />;
      expansion = (
        <button
          type="submit"
          className="borderSize_0 pad3 background_transparent"
          onClick={masterpassPaymentMethod}
        >
          <img src="https://static.masterpass.com/dyn/img/acc/global/mp_mark_hor_blk.svg" className="masterpassButton" alt={cqContent.label.DT_OD_CHECKOUT_PAYMENT_MASTERPASS_IMG_ALT} />
        </button>
      );
      if (orderSelectedPaymentMode === 'masterpass') {
        description = <p className="margin36 onlyLeftMargin pad6 noSidePad">{billingInfo.masterpassResponseInfo.emailAddress}</p>;
      }
    } else {
      return null;
    }
    return {
      paymentType,
      title,
      description,
      expansion,
    };
  };
  return (
    <div>
      <fieldset className="noMargin noPad" style={{ border: 'none' }}>
        <legend className="is-hidden"><h2 className="h1 margin24 onlyBottomMargin">{props.cqContent.label.DT_OD_CHECKOUT_PAYMENT_TITLE}</h2></legend>
        {props.paymentOptions.map((paymentOpt, id) => {
          const payment = getPaymentDetails(paymentOpt);
          return (payment ?
            <div
              className="margin18 noSideMargin"
              key={`paymentRadio${id}`}
            >
              <RadioButton
                name="paymentRadio"
                id={`paymentRadio${id}`}
                value={payment.paymentType}
                containerClassName=" "
                labelClassName="verticalCenter pad12 onlyLeftPad"
              >
                <div>{payment.title}</div>
              </RadioButton>
              {payment.description}
              {payment.paymentType === props.selectedRadioButton && payment.expansion}
            </div> : null
          );
        })}
      </fieldset>
    </div>
  );
};

PaymentMethods.propTypes = {
  cqContent: PropTypes.object,
  paymentOptions: PropTypes.array,
  selectedRadioButton: PropTypes.string,
  // applePaymentRequest: PropTypes.object,
  // masterpassConfigInfo: PropTypes.object,
  // showErrorNotification: PropTypes.func,
  // paypalPaymentMethod: PropTypes.func,
  // billingInfo: PropTypes.bool,
  // orderSelectedPaymentMode: PropTypes.string,
};

export default PaymentMethods;
