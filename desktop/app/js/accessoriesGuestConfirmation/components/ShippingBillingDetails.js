import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';
// import CardSprite from '../../../images/credit-cards-sprite.png';

const ShippingBillingDetails = (props) => {
  const { cqContent, billingInfo, addressInfo } = props;
  const { creditCardInfo, billingAddress } = billingInfo;
  const selectedPaymentMode = billingInfo.selectedPaymentMode ? billingInfo.selectedPaymentMode.toLowerCase() : 'newcard';
  return (
    <Col
      xs={12}
      style={{ paddingLeft: 0 }}
    >
      <Row
        className="background_gray_three border_CC margin24 onlyBottomMargin"
        style={{ padding: '18px' }}
      >
        <Col
          xs={3}
          className="lineheight18"
        >
          <h3 className="bold fontSize_7 margin18 onlyBottomMargin">
            {cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_SHIPPING_INFO}
          </h3>
          <p>{addressInfo.firstName} {addressInfo.lastName}</p>
          <p>{addressInfo.address1}</p>
          <p>{addressInfo.address2 && addressInfo.address2}</p>
          <p>{addressInfo.city}</p>
          <p>{addressInfo.state} {addressInfo.zipcode}</p>
          <p>{addressInfo.email}</p>
          <p>{addressInfo.phoneNumber}</p>
        </Col>
        <Col
          xs={3}
          className="lineheight18"
        >
          <h3 className="bold fontSize_7 margin18 onlyBottomMargin">
            {cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_SHIPPING_METHOD}
          </h3>
          <div>{props.selectedShippingType.shippingTypeName}</div>
          {props.selectedShippingType.price === 0 ?
            <span className="bold">{cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_FREE_SHIPPING}</span> :
            <div>${props.selectedShippingType.price}</div>
          }
        </Col>
        <Col
          xs={3}
          className="lineheight18"
        >
          <h3 className="bold fontSize_7 margin18 onlyBottomMargin">
            {cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_BILLING_INFO}
          </h3>
          <p>{billingAddress.firstName} {billingAddress.lastName}</p>
          <p>{billingAddress.address1}</p>
          <p>{billingAddress.address2 && billingAddress.address2}</p>
          <p>{billingAddress.city}</p>
          <p>{billingAddress.state}&nbsp;{billingAddress.zipcode}</p>
          <p>{addressInfo.phoneNumber}</p>
        </Col>
        <Col
          xs={3}
          className="lineheight18"
        >
          <h3 className="bold fontSize_7 margin18 onlyBottomMargin">
            {selectedPaymentMode === 'newcard' ?
              cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_CREDIT_CARD_DETAILS
              :
              cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_PAYMENT_TYPE
            }
          </h3>

          {/* Credit Card Payment */}
          {selectedPaymentMode === 'newcard' &&
            <div>
              <p>{billingAddress.firstName} {billingAddress.lastName}</p>
              <p><span className="textTransCapitalize">{creditCardInfo.creditCardType}</span> {cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_CREDIT_CARD_ENDING} {props.lastFour}</p>
              <p>{cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_CREDIT_CARD_EXPIRES} {creditCardInfo.creditCardExpMonth}/{creditCardInfo.creditCardExpYear}</p>
            </div>
          }

          {/* Masterpass Payment */}
          {selectedPaymentMode === 'masterpass' &&
            <div className="fontSize_3 textAlignRight">
              <img alt="Masterpass" src="https://static.masterpass.com/dyn/img/acc/global/mp_mark_hor_blk.svg" />
              <p>{billingInfo.masterpassResponseInfo.cardType} (****{billingInfo.masterpassResponseInfo.lastDigits})</p>
              <p>{billingInfo.masterpassResponseInfo.emailAddress}</p>
            </div>
          }

          {/* Paypal Payment */}
          {selectedPaymentMode === 'paypal' &&
            <div>
              <p>{cqContent.label.DT_OD_ACC_GUEST_CONFIRMATION_CONFIRMATION_PAYPAL}</p>
              <p>{billingInfo.paypalEmailAddress}</p>
            </div>
          }

          {/* Apple Pay Payment */}
          {selectedPaymentMode === 'applepay' &&
            <div>
              <p>{billingInfo.selectedPaymentMode}</p>
              <p>{billingInfo.applePayResponseInfo.emailAddress}</p>
            </div>
          }

        </Col>
      </Row>
    </Col>
  );
};

ShippingBillingDetails.propTypes = {
  cqContent: PropTypes.object,
  addressInfo: PropTypes.object,
  selectedShippingType: PropTypes.object,
  billingInfo: PropTypes.object,
  lastFour: PropTypes.string,
};

export default ShippingBillingDetails;
