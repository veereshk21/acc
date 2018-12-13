import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { capitalize } from '../../../common/Helpers/index';

const infoGridCenter = ({ cqContent, shippingInfo, billAddress, selectedShippingType, billingInfo, checkoutStates, splitShipment }) => {
  const showPaymentSection = checkoutStates && checkoutStates.showPaymentSection;
  const showShippingSection = checkoutStates && (checkoutStates.showShippingAddress && checkoutStates.showDeliveryMethod);
  const ispuSelected = selectedShippingType && selectedShippingType.type && selectedShippingType.type.toUpperCase() === 'ISPU';

  return (<div className="orderInfo color_black">
    <h1 className="pad20 fontSize_10 onlySidePad">{cqContent.label.DT_OD_CONFIRMATION_ORDER_SUMMARY}</h1>
    {(showShippingSection || showPaymentSection) ? <section className="margin36 onlyBottomMargin">
      <Row>
        {showShippingSection &&
          <Col
            className="border_CC"
            xs={showPaymentSection ? 6 : 12}
          >
            <Row className="pad20 noBottomPad">
              <Col xs={12} >
                <p className="noSidePad textAlignLeft infoFeature bold"> {cqContent.label.DT_OD_CONFIRMATION_SHIPPING_INFOMATION} </p>
              </Col>
            </Row>
            <Row className="pad20">
              <Col xs={6}>
                <Row>
                  <Col xs={12}>
                    <p className="textAlignLeft fontSize_4 bold"> {cqContent.label.DT_OD_CONFIRMATION_SHIPPING_TO} </p>
                  </Col>
                </Row>
                <Row className="textAlignLeft">
                  {ispuSelected ?
                    <Col xs={12} >
                      <p className="fontSize_3">{capitalize(`${shippingInfo.addressInfo.lastName}, ${shippingInfo.addressInfo.firstName}`)}</p>
                      <p className="fontSize_3"> {shippingInfo.ispudetailsInfo.storeAddress.address1} </p>
                      {shippingInfo.ispudetailsInfo.storeAddress.address2 &&
                        <p className="fontSize_3"> {shippingInfo.ispudetailsInfo.storeAddress.address2} </p>
                      }
                      <p className="fontSize_3">{shippingInfo.ispudetailsInfo.storeAddress.state}, {shippingInfo.ispudetailsInfo.storeAddress.city}, {shippingInfo.ispudetailsInfo.storeAddress.zipcode}</p>
                      {shippingInfo.ispudetailsInfo.storeAddress.phoneNumber &&
                        <p className="fontSize_3"> {shippingInfo.ispudetailsInfo.storeAddress.phoneNumber} </p>
                      }
                      <a className="link textUnderline" href={`//maps.google.com/?q=${shippingInfo.storeDetail.storeAddress}`} > {cqContent.label.DT_OD_CONFIRMATION_STORE_DIRECTIONS}</a>
                    </Col>
                    :
                    <Col xs={12} >
                      <p className="fontSize_3">{capitalize(`${shippingInfo.addressInfo.lastName}, ${shippingInfo.addressInfo.firstName}`)}</p>
                      <p className="fontSize_3"> {shippingInfo.addressInfo.companyName} </p>
                      <p className="fontSize_3">{capitalize(shippingInfo.addressInfo.address1)} </p>
                      {shippingInfo.addressInfo.address2 &&
                        <p className="fontSize_3">{capitalize(shippingInfo.addressInfo.address2)} </p>
                      }
                      <p className="fontSize_3">{shippingInfo.addressInfo.state}, {shippingInfo.addressInfo.city}, {shippingInfo.addressInfo.zipcode}</p>
                      {shippingInfo.addressInfo.phoneNumber &&
                        <p className="fontSize_3"> {shippingInfo.addressInfo.phoneNumber} </p>
                      }
                    </Col>
                  }
                </Row>
              </Col>
              <Col xs={6}>
                <Row>
                  <Col xs={12}>
                    <p className="textAlignLeft fontSize_4 bold"> {cqContent.label.DT_OD_CONFIRMATION_SHIPPING_TYPE} </p>
                  </Col>
                </Row>
                <Row className="textAlignLeft" >
                  <Col xs={12} >
                    <p className="fontSize_3"> {splitShipment && !ispuSelected ? shippingInfo.poboMessage : selectedShippingType.shippingTypeName} </p>
                    {selectedShippingType.selectedFormattedWindow &&
                      <p className="fontSize_3"> {cqContent.label.DT_OD_CONFIRMATION_SHIPPING_SDD_WINDOW.replace('$TIME$', selectedShippingType.selectedFormattedWindow)} </p>
                    }
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        }

        {showPaymentSection &&
          <Col
            className={`${showShippingSection ? 'noLeftBorder border_CC' : 'border_CC'}`}
            xs={showShippingSection ? 6 : 12}
          >
            <Row className="pad20 noBottomPad">
              <Col xs={12} >
                <p className="textAlignLeft infoFeature bold"> {cqContent.label.DT_OD_CONFIRMATION_BILLING_INFOMATION}  </p>
              </Col>
            </Row>
            <Row className="pad20">
              <Col xs={6}>
                <Row>
                  <Col xs={12}>
                    <p className="textAlignLeft fontSize_4 bold"> {cqContent.label.DT_OD_CONFIRMATION_BILL_TO} </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    {billAddress.lastName && <p className="fontSize_3"> {capitalize(`${billAddress.lastName}, ${billAddress.firstName}`)} </p>}
                    <p className="fontSize_3">{capitalize(billAddress.address1)} </p>
                    {billAddress.address2 &&
                      <p className="fontSize_3">{capitalize(billAddress.address2)} </p>
                    }
                    <p className="fontSize_3">{billAddress.state}, {billAddress.city}, {billAddress.zipcode}</p>
                    {billAddress.phoneNumber &&
                      <p className="fontSize_3"> {billAddress.phoneNumber} </p>
                    }
                  </Col>
                </Row>
              </Col>
              <Col xs={6}>
                <Row>
                  <Col xs={12}>
                    <p className="textAlignLeft fontSize_4 bold"> {cqContent.label.DT_OD_CONFIRMATION_PAYMENT_TYPE} </p>
                  </Col>
                </Row>
                <Row className="textAlignLeft">
                  <Col xs={12}>
                    {billingInfo.selectedPaymentMode === 'ApplePay' &&
                      <p className="fontSize_3">
                        <span className="block">{billingInfo.selectedPaymentMode}</span>
                        <span className="block">{billingInfo.applePayResponseInfo.emailAddress}</span>
                      </p>
                    }
                    {billingInfo.selectedPaymentMode === 'payPal' &&
                      <p className="fontSize_3">
                        <span className="block">PayPal</span>
                        <span className="block">{billingInfo.paypalEmailAddress}</span>
                      </p>
                    }
                    {billingInfo.selectedPaymentMode === 'masterpass' &&
                      <div className="fontSize_3 textAlignRight">
                        <img alt="Masterpass" src="https://static.masterpass.com/dyn/img/acc/global/mp_mark_hor_blk.svg" />
                        <span className="block">{billingInfo.masterpassResponseInfo.cardType} (****{billingInfo.masterpassResponseInfo.lastDigits})</span>
                        <span className="block">{billingInfo.masterpassResponseInfo.emailAddress}</span>
                      </div>
                    }
                    {billingInfo.selectedPaymentMode === 'BTA' &&
                      <p className="fontSize_3">
                        <span className="block">Bill to Account</span>
                        <span className="block">{billingInfo.selectedPaymentMode === 'BTA' && billingInfo.billToAccountNumber}</span>
                      </p>
                    }
                    {(billingInfo.selectedPaymentMode === 'newCard' || billingInfo.selectedPaymentMode === 'savedCard') &&
                      <p className="fontSize_3">
                        <span className="block textTransUppercase">{billingInfo.creditCardInfo.creditCardType}</span>
                        <span className="block">{billingInfo.creditCardInfo.creditCardNumber}</span>
                      </p>
                    }
                    {billingInfo.giftCardList.map((giftCard, key) => (
                      <p className="margin10 onlyTopMargin fontSize_3">
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
      :
      ''
    }
  </div>
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
