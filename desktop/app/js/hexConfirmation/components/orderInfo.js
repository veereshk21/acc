import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

const borderNone = {
  noTopBorder: { borderTop: 'none' },
  noRightBorder: { borderRight: 'none' },
  noBottomBorder: { borderBottom: 'none' },
  noLeftBorder: { borderLeft: 'none' },
  defaultRightBorder: { borderRight: 'auto' },
};
const defaultHeight = {
  minHeight: '200px',
};

/* eslint-disable arrow-body-style */
class OrderInfo extends Component {
  render() {
    const { cqKeys, shippingAddress, billingAddress, selectedShippingType, billingInfo, checkoutStates, splitShipment } = this.props;
    const showPaymentSection = checkoutStates && checkoutStates.showPaymentSection;
    const showShippingSection = checkoutStates && (checkoutStates.showShippingAddress && checkoutStates.showDeliveryMethod);
    return (
      <div className="orderInfo color_black margin36 onlyBottomMargin">
        <Row md={12} lg={12}>
          {showShippingSection ?
            <Col md={showPaymentSection ? 6 : 12} lg={showPaymentSection ? 6 : 12} className="">
              <Row md={12} lg={12} className="pad20">
                <Col md={12} lg={12} >
                  <p className="noSidePad textAlignLeft fontSize_9 bold"> {cqKeys.label.DT_OD_CONFIRMATION_SHIPPING_INFOMATION} </p>
                </Col>
              </Row>
              <Row md={12} lg={12} className="" style={defaultHeight}>
                <Col md={6} lg={6} className="border_CC" style={{ ...borderNone.noRightBorder }}>
                  <Row md={12} lg={12} className="pad20">
                    <Col md={12} lg={12} className="border_black pad24 onlyBottomPad onlyBottomBorder">
                      <p className="textAlignLeft fontSize_5 bold"> {cqKeys.label.DT_OD_CONFIRMATION_SHIPPING_TO} </p>
                    </Col>
                  </Row>
                  <Row md={12} lg={12} className="pad20 textAlignLeft">
                    <Col md={12} lg={12} >
                      <p className="fontSize_2"> {shippingAddress.lastName}, {shippingAddress.firstName} </p>
                      <p className="fontSize_2"> {shippingAddress.address1} </p>
                      {shippingAddress.phoneNumber && <p className="fontSize_2"> {shippingAddress.phoneNumber} </p>}
                    </Col>
                  </Row>
                </Col>
                <Col md={6} lg={6} className="border_CC" style={showPaymentSection ? { ...borderNone.noRightBorder } : { ...borderNone.defaultRightBorder }}>
                  <Row md={12} lg={12} className="pad20">
                    <Col md={12} lg={12} className="border_black pad24 onlyBottomPad onlyBottomBorder">
                      <p className="textAlignLeft fontSize_5 bold"> {cqKeys.label.DT_OD_CONFIRMATION_SHIPPING_TYPE} </p>
                    </Col>
                  </Row>
                  <Row md={12} lg={12} className="pad20 textAlignLeft">
                    <Col md={12} lg={12} >
                      <p className="fontSize_2"> {splitShipment ? shippingAddress.poboMessage : selectedShippingType.shippingTypeName} </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col> : ''}

          {showPaymentSection ?
            <Col md={showShippingSection ? 6 : 12} lg={showShippingSection ? 6 : 12} className="">
              <Row md={12} lg={12} className="pad20">
                <Col md={12} lg={12} >
                  <p className="textAlignLeft fontSize_9 bold"> {cqKeys.label.DT_OD_CONFIRMATION_BILLING_INFOMATION}  </p>
                </Col>
              </Row>
              <Row md={12} lg={12} style={defaultHeight}>
                <Col md={6} lg={6} className="border_CC" style={{ ...borderNone.noRightBorder }}>
                  <Row md={12} lg={12} className="pad20">
                    <Col md={12} lg={12} className="border_black pad24 onlyBottomPad onlyBottomBorder">
                      <p className="textAlignLeft fontSize_5 bold"> {cqKeys.label.DT_OD_CONFIRMATION_BILL_TO} </p>
                    </Col>
                  </Row>
                  <Row md={12} lg={12} className="pad20 textAlignLeft">
                    <Col md={12} lg={12}>
                      {billingAddress.lastName && <p className="fontSize_2"> {billingAddress.lastName}, {billingAddress.firstName} </p>}
                      <p className="fontSize_2"> {billingAddress.address1} </p>
                      {billingAddress.phoneNumber && <p className="fontSize_2"> {billingAddress.phoneNumber} </p>}
                    </Col>
                  </Row>
                </Col>
                <Col md={6} lg={6} className="border_CC">
                  <Row md={12} lg={12} className="pad20">
                    <Col md={12} lg={12} className="border_black pad24 onlyBottomPad onlyBottomBorder">
                      <p className="textAlignLeft fontSize_5 bold"> {cqKeys.label.DT_OD_CONFIRMATION_PAYMENT_TYPE} </p>
                    </Col>
                  </Row>
                  <Row md={12} lg={12} className="pad20 textAlignLeft">
                    <Col md={12} lg={12}>
                      {billingInfo.selectedPaymentMode === 'ApplePay' &&
                        <p className="fontSize_2">
                          <span className="block">{billingInfo.selectedPaymentMode}</span>
                          <span className="block">{billingInfo.applePayResponseInfo.emailAddress}</span>
                        </p>
                      }
                      {billingInfo.selectedPaymentMode === 'payPal' &&
                        <p className="fontSize_2">
                          <span className="block">Paypal</span>
                          <span className="block">{billingInfo.paypalEmailAddress}</span>
                        </p>
                      }
                      {billingInfo.selectedPaymentMode === 'masterpass' &&
                        <div className="fontSize_2 textAlignRight">
                          <img alt="Masterpass" src="https://static.masterpass.com/dyn/img/acc/global/mp_mark_hor_blk.svg" />
                          <span className="block">{billingInfo.masterpassResponseInfo.cardType} (****{billingInfo.masterpassResponseInfo.lastDigits})</span>
                          <span className="block">{billingInfo.masterpassResponseInfo.emailAddress}</span>
                        </div>
                      }
                      {billingInfo.selectedPaymentMode === 'BTA' &&
                        <p className="fontSize_2">
                          <span className="block">Bill to Account</span>
                          <span className="block">{billingInfo.selectedPaymentMode === 'BTA' && billingInfo.billToAccountNumber}</span>
                        </p>
                      }
                      {(billingInfo.selectedPaymentMode === 'newCard' || billingInfo.selectedPaymentMode === 'savedCard') &&
                        <p className="fontSize_2">
                          <span className="block textTransUppercase">{billingInfo.creditCardInfo.creditCardType}</span>
                          <span className="block">{billingInfo.creditCardInfo.creditCardNumber}</span>
                        </p>
                      }
                      {billingInfo.giftCardList.map((giftCard, key) => {
                        return (
                          <p className="margin10 onlyTopMargin fontSize_2">
                            <span className="block">Gift Card {key + 1} Applied to Purchase</span>
                            <span className="block">{giftCard.maskedGiftCardNumber}</span>
                            <span className="block">${giftCard.amountToApply}</span>
                          </p>
                        );
                      })}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col> : ''}
        </Row>
      </div>
    );
  }
}

OrderInfo.propTypes = {
  cqKeys: PropTypes.object,
  shippingAddress: PropTypes.object,
  billingAddress: PropTypes.object,
  billingInfo: PropTypes.object,
  selectedShippingType: PropTypes.object,
  checkoutStates: PropTypes.object,
  splitShipment: PropTypes.bool,
};
export default OrderInfo;
