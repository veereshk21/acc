import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

const infoGridCenter = ({ cqContent, shippingInfo, billAddress, selectedShippingType, billingInfo, checkoutStates, splitShipment }) => {
  const showPaymentSection = checkoutStates && checkoutStates.showPaymentSection;
  const showShippingSection = checkoutStates && (checkoutStates.showShippingAddress && checkoutStates.showDeliveryMethod);
  const ispuOrder = selectedShippingType.type === 'ISPU';
  const storeHoursArray = [];
  if (ispuOrder && shippingInfo.ispudetailsInfo.storeHours) {
    for (const x in shippingInfo.ispudetailsInfo.storeHours) {
      storeHoursArray.push(`${x}: ${shippingInfo.ispudetailsInfo.storeHours[x]}`);
    }
  }
  return (
    <section className="margin36 onlyTopMargin pad8 onlySidePad">
      <Row>
        {showShippingSection &&
          <Col
            xs={showPaymentSection ? 6 : 12}
            className={`border_graySix ${showPaymentSection ? 'noRightBorder' : ''}`}
          >
            <Row className="pad30 background_gray_one">
              <Col xs={12} >
                <p className="noSidePad textAlignCenter fontSize_9 bold">
                  {ispuOrder ? cqContent.label.DT_OD_CONFIRMATION_ISPU : cqContent.label.DT_OD_CONFIRMATION_SHIPPING_INFOMATION}
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Row className="pad24 border_graySix background_gray_one onlyTopBorder">
                  <Col xs={12} >
                    <p className="textAlignCenter fontSize_5 bold">
                      {ispuOrder ? cqContent.label.DT_OD_CONFIRMATION_STORE_LOCATION : cqContent.label.DT_OD_CONFIRMATION_SHIPPING_TO}
                    </p>
                  </Col>
                </Row>
                <Row className="pad24 border_graySix textAlignCenter onlyTopBorder">
                  {ispuOrder ?
                    <Col xs={12} >
                      <p className="fontSize_2"> {shippingInfo.ispudetailsInfo.storeName}</p>
                      <p className="fontSize_2"> {shippingInfo.ispudetailsInfo.storeAddress.address1} </p>
                      {shippingInfo.ispudetailsInfo.storeAddress.address2 &&
                        <p className="fontSize_2"> {shippingInfo.ispudetailsInfo.storeAddress.address2} </p>
                      }
                      {shippingInfo.ispudetailsInfo.storeAddress.phoneNumber &&
                        <p className="fontSize_2"> {shippingInfo.ispudetailsInfo.storeAddress.phoneNumber} </p>
                      }
                      <p className="fontSize_2">{shippingInfo.ispudetailsInfo.storeAddress.state}, {shippingInfo.ispudetailsInfo.storeAddress.city}, {shippingInfo.ispudetailsInfo.storeAddress.zipcode}</p>
                      <a className="textUnderline" href={`//maps.google.com/?q=${shippingInfo.storeDetail.storeAddress}`} > {cqContent.label.DT_OD_CONFIRMATION_STORE_DIRECTIONS}</a>
                    </Col>
                    :
                    <Col xs={12} >
                      <p className="fontSize_2"> {shippingInfo.addressInfo.lastName}, {shippingInfo.addressInfo.firstName} </p>
                      <p className="fontSize_2"> {shippingInfo.addressInfo.address1} </p>
                      {shippingInfo.addressInfo.phoneNumber && <p className="fontSize_2"> {shippingInfo.addressInfo.phoneNumber} </p>}
                    </Col>
                  }
                </Row>
              </Col>
              <Col xs={6}>
                <Row className="pad24 border_graySix background_gray_one noRightBorder noBottomBorder">
                  <Col xs={12} >
                    <p className="textAlignCenter fontSize_5 bold">
                      {ispuOrder ? cqContent.label.DT_OD_CONFIRMATION_STORE_HOURS : cqContent.label.DT_OD_CONFIRMATION_SHIPPING_TYPE}
                    </p>
                  </Col>
                </Row>
                <Row className="minHeigth120 pad24 border_graySix textAlignCenter noBottomBorder noRightBorder" >
                  <Col xs={12} >
                    {ispuOrder ?
                      <div >
                        {storeHoursArray.map((day, index) => (
                          <p className="fontSize_2" key={`storeHour-${index}`}>{day}</p>
                        ))}
                      </div>
                      :
                      <p className="fontSize_2"> {splitShipment ? shippingInfo.poboMessage : selectedShippingType.shippingTypeName} </p>
                    }
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        }

        {showPaymentSection &&
          <Col xs={showShippingSection ? 6 : 12} className="border_graySix">
            <Row className="pad30 background_gray_one">
              <Col xs={12} >
                <p className="textAlignCenter fontSize_9 bold"> {cqContent.label.DT_OD_CONFIRMATION_BILLING_INFOMATION}  </p>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Row className="pad24 border_graySix onlyTopBorder background_gray_one">
                  <Col xs={12} >
                    <p className="textAlignCenter fontSize_5 bold"> {cqContent.label.DT_OD_CONFIRMATION_BILL_TO} </p>
                  </Col>
                </Row>
                <Row className="pad24 border_graySix textAlignCenter onlyTopBorder">
                  <Col xs={12}>
                    {billAddress.lastName && <p className="fontSize_2"> {billAddress.lastName}, {billAddress.firstName} </p>}
                    <p className="fontSize_2"> {billAddress.address1} </p>
                    {billAddress.phoneNumber && <p className="fontSize_2"> {billAddress.phoneNumber} </p>}
                  </Col>
                </Row>
              </Col>
              <Col xs={6}>
                <Row className="pad24 border_graySix background_gray_one noBottomBorder noRightBorder">
                  <Col xs={12} >
                    <p className="textAlignCenter fontSize_5 bold"> {cqContent.label.DT_OD_CONFIRMATION_PAYMENT_TYPE} </p>
                  </Col>
                </Row>
                <Row className="minHeigth120 pad24 border_graySix textAlignCenter noBottomBorder noRightBorder">
                  <Col xs={12}>
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
                    {billingInfo.giftCardList.map((giftCard, key) => (
                      <p className="margin10 onlyTopMargin fontSize_2">
                        <span className="block">Gift Card {key + 1} Applied to Purchase</span>
                        <span className="block">{giftCard.maskedGiftCardNumber}</span>
                        <span className="block">${giftCard.amountToApply}</span>
                      </p>
                    ))}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        }
      </Row>
    </section>
  );
};

infoGridCenter.propTypes = {
  cqContent: PropTypes.object,
  shippingInfo: PropTypes.object,
  billAddress: PropTypes.object,
  billingInfo: PropTypes.object,
  selectedShippingType: PropTypes.object,
  checkoutStates: PropTypes.object,
  splitShipment: PropTypes.bool,
};
export default infoGridCenter;
