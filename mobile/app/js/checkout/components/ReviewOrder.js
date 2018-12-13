import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';

import SelectListItem from '../../common/SelectListItem/';
import ReviewOrderIconicDeviceDetails from './ReviewOrderIconicDeviceDetails';
import ReviewOrderPlanDetails from './ReviewOrderPlanDetails';
import AgreementBreakDown from './../containers/AgreementBreakDown';
import PlaceOrderBtn from './PlaceOrder';
import Loader from '../../common/Loader/Loader';
import { hashHistory } from './../../store';
import HorizontalRule from '../../common/HorizontalRule';

import OptinSMS from './OptinSMS';
import PromoBadge from '../../common/PromoBadge/PromoBadge';
import ToolTip from '../../common/ToolTip/';

class ReviewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDigitlWalletModal: false,
    };
    this._updateOptInSmsNumber = (props.shippingInfo.contactInfo.activeSMSCapableMtnList && props.shippingInfo.contactInfo.activeSMSCapableMtnList[0]) || props.shippingInfo.contactInfo.phoneNumber; // eslint-disable-line
    this._smsOptin = props.shippingInfo.contactInfo.activeSMSCapableMtnList > 0;
  }
  componentDidMount() {
    const { label } = this.props.cqContent;
    if (this.props.pastDueAmountPaid) {
      this.props.showInfoNotification(label.OD_PAST_DUE_PROCESSED_CTA_TEXT);
    }
  }

  giftCardClick = () => {
    const { selectedShippingType, cqContent, billingInfo } = this.props;
    const invalidDeliveryMethod = selectedShippingType.type === 'ISPU';
    const invalidPaymentType = billingInfo.selectedPaymentMode.toString().toLowerCase() !== 'newcard' && billingInfo.selectedPaymentMode.toString().toLowerCase() !== 'savedcard';
    const hasSavedCards = billingInfo.savedCardInfo.length > 0;
    let prompt = false;

    if (invalidDeliveryMethod && invalidPaymentType) {
      prompt = window.confirm(cqContent.label.OD_CHECKOUT_GIFT_INVALID_DELIVERY_AND_PAYMENT_METHOD_PROMPT);
    } else if (invalidDeliveryMethod) {
      prompt = window.confirm(cqContent.label.OD_CHECKOUT_GIFT_CARD_INVALID_DELIVERY_METHOD_PROMPT);
    } else if (hasSavedCards) {
      prompt = window.confirm(cqContent.label.OD_CHECKOUT_GIFT_CARD_INVALID_PAYMENT_PROMPT_SAVED_CARDS);
    } else {
      prompt = window.confirm(cqContent.label.OD_CHECKOUT_GIFT_CARD_INVALID_PAYMENT_PROMPT);
    }

    if (prompt) {
      if (invalidDeliveryMethod) {
        // Logic to redirect to payment (if needed) is done when receiving the update shipping method response
        hashHistory.push('/shippingMethod/giftCard');
      } else if (hasSavedCards) {
        hashHistory.push('/choosePaymentMethod/giftCard');
      } else {
        hashHistory.push('/addPaymentMethod/newGiftCard');
      }
    }
  }
  updateOptInSmsNumber = (val) => {
    this._updateOptInSmsNumber = val;
  };
  smsOptin = (_bool) => {
    this._smsOptin = _bool;
  };
  render() {
    const {
      subtitle, flow, comboOrder, deviceConfigInfo, devices, shippingInfo, selectedShippingType,
      dueToday, dueMonthly, paymentInfo, isFetching, transformedTradeInPromoDetails, placeOrder,
      cartDetailURL, cqContent, pastDueAmount, totalActivationFee, pastDueAmountPaid, cpcOrder,
      plans, submitOrderURL, checkoutStates, tmpMdOpted, standaloneAccessories, termsAndConditionsInfo,
      billingInfo, giftCardsEnabled, giftCardsUsed, totalGiftCardAmount, balanceCreditCardAmount,
      showPaymentSection, showShippingAddress, showDeliveryMethod, lineLevelOpted, instantCreditOrder,
      showVendorShippingMethod, selectedVendorShippingType, bicRepresentationChangeEnabled, isTradeInEnabled, promoTradeInOrder,
    } = this.props;
    const giftCardExists = billingInfo && billingInfo.giftCardList && billingInfo.giftCardList.length > 0;
    const { globalPromotions } = devices;
    const pastDueBalance = pastDueAmountPaid ? 'PAID' : '$' + pastDueAmount;
    const showGiftCardPrompt = (billingInfo.selectedPaymentMode === 'newCard' || billingInfo.selectedPaymentMode === 'savedCard') && selectedShippingType.type !== 'ISPU';
    let tradeInValue = null;
    if (transformedTradeInPromoDetails) {
      if (transformedTradeInPromoDetails.tradeInCredit < 0) {
        /* Added for Defect CIS-15979 */
        tradeInValue = '-$' + parseFloat(-(transformedTradeInPromoDetails.tradeInCredit), 10).toFixed(2);
      } else {
        tradeInValue = '$' + transformedTradeInPromoDetails.tradeInCredit;
      }
    }
    let disableBTA = false;
    if (paymentInfo === 'Bill to account') {
      disableBTA = true;
    }
    const { siteId } = window;
    return (

      <Grid className="ensighten_mainContent noSidePad">
        {isFetching === true && <Loader />}
        <Row className="ensighten_title pad32 background_00 color_FFF">
          <Col className="pad72 onlyBottomPad">
            <h1 className="color_FFF fontDisplayMedium">{cqContent.label.OD_CHECKOUT_MAIN_SCREEN_TITLE_TEXT}</h1>
            {subtitle &&
              <p className="color_FFF pad12" >
                {subtitle}
              </p>
            }
          </Col>
        </Row>
        {globalPromotions && globalPromotions.length > 0 && globalPromotions.map((promo, idx) => (
          <PromoBadge className="background_blue_one margin18 noSideMargin" >
            <div key={`promo-${idx}`}>
              {promo.badgeText}
              {promo.badgeToolTip &&
                <ToolTip
                  id="globalPromo-tooltip"
                  className="margin3 onlyLeftMargin white"
                  ariaLabel="Upgrade fee information tooltip"
                  text={promo.badgeToolTip}
                  noRenderHTML
                  relative=""
                />
              }
              {(promo.contentUrlText !== null && promo.contentUrlLink !== null) &&
                <a role="button" aria-label="View Promo Details" className="margin6 link_white" onClick={() => { hashHistory.push('/promoModal/globalPromo/' + idx); }} analyticstrack="view-global-promo-details">
                  {promo.contentUrlText}
                </a>}
            </div>
          </PromoBadge>
        ))}

        <ReviewOrderIconicDeviceDetails
          devices={devices}
          tmpMdOpted={tmpMdOpted}
          cqContent={cqContent}
          accessories={this.props.accessories}
          accessoriesBundle={this.props.accessoriesBundle}
          standaloneAccessories={standaloneAccessories}
          plans={plans}
          lineLevelOpted={lineLevelOpted}
          bicRepresentationChangeEnabled={bicRepresentationChangeEnabled}
        />

        {cpcOrder && !lineLevelOpted &&

          <Row className="pad32 noBottomPad" >
            <Col xs={12} >
              <ReviewOrderPlanDetails plans={plans} />
            </Col>
          </Row>
        }

        <Row className="pad24 noTopPad noBottomPad noSideMargin">
          <Col xs={12} >
            <HorizontalRule y={1} margin="0" />
            {pastDueAmountPaid && <SelectListItem title="Past Due Balance" value={pastDueBalance} showArrow={false} />}
            {showDeliveryMethod && <SelectListItem title={cqContent.label.OD_CHECKOUT_DELIVERY_METHOD_TEXT} value={selectedShippingType.shippingTypeName} to="/shippingMethod" />}
            {(selectedShippingType.type !== 'ISPU' && showShippingAddress) && <SelectListItem title={cqContent.label.OD_CHECKOUT_SHIPPING_ADDRESS_TEXT} value={shippingInfo.addressInfo.address1} to="/deliveryInformation" />}

            {shippingInfo.tradeIn && selectedShippingType.type === 'ISPU' && <SelectListItem title={cqContent.label.OD_CHECKOUT_TRADE_IN_ADDRESS_TEXT} value={shippingInfo.tradeInAddress.address1} to="/tradeInAddress" />}

            {selectedShippingType.type === 'ISPU' && <SelectListItem title="Pickup location" value={shippingInfo.storeDetail.storeAddress} to="/pickuplocation" />}
            {showVendorShippingMethod && <SelectListItem title="Vendor Shipping" value={selectedVendorShippingType ? selectedVendorShippingType.shippingTypeName : null} to="/vendorAccessory" />}
            {showPaymentSection && !disableBTA && <SelectListItem
              title={cqContent.label.OD_CHECKOUT_PAYMENT_TEXT}
              subtitle={balanceCreditCardAmount && `$${balanceCreditCardAmount}`}
              value={paymentInfo}
              to="/choosePaymentMethod"
            />}
            {(giftCardsEnabled) &&
             showPaymentSection && disableBTA && <SelectListItem title={cqContent.label.OD_CHECKOUT_PAYMENT_TEXT} to="/choosePaymentMethod" />}
            {(giftCardsEnabled && giftCardExists) && !siteId &&
            <SelectListItem
              title={cqContent.label.OD_CHECKOUT_GIFT_CARD_LABEL}
              value={`-$${totalGiftCardAmount}`}
              showValue={giftCardsUsed > 0}
              to="/giftCards"
              onClick={showGiftCardPrompt ? null : this.giftCardClick}
            />
            }

            {deviceConfigInfo && deviceConfigInfo.devices.map((device, id) => (
              (device.flow === 'AAL' || device.flow === 'NSO') && <SelectListItem key={id} to={`/serviceAddress/${device.deviceId}`} title={cqContent.label.OD_CHECKOUT_SERVICE_ADDRESS_TEXT} value={device.serviceAddress.address1} />
            ))
            }

            <HorizontalRule y={1} margin="0" />
            <SelectListItem title={this.props.titleToday} value={'$' + dueToday} to="/dueToday" />
            {!standaloneAccessories &&
              <div>
                <SelectListItem title={cqContent.label.OD_CHECKOUT_DUE_MONTHLY_TEXT} value={'$' + dueMonthly} to="/dueMonthly" />
                {/* cpcOrder && !lineLevelOpted && planDueMonthly &&
                  <SelectListItem
                    itemOnJaxPlan={this.props.itemOnJaxPlan}
                    showArrow={this.props.itemOnJaxPlan}
                    title={cqContent.label.OD_CHECKOUT_PLAN_DUE_MONTHLY_TEXT}
                    value={'$' + plans.planOnlyDueMonthly}
                    to="/planMonthly"
                  />
                */}
                {isTradeInEnabled && transformedTradeInPromoDetails !== null &&
                  (!instantCreditOrder || (instantCreditOrder && promoTradeInOrder)) &&
                  <SelectListItem
                    title={<span className="positionAbsolute">{cqContent.label.OD_CHECKOUT_ESTIMATED_TRADE_IN_TEXT}</span>}
                    value={tradeInValue}
                    to={instantCreditOrder ? '/instantCredit' : '/estimatedTradeIn'}
                  />
                }
                {!promoTradeInOrder && instantCreditOrder &&
                  (<SelectListItem
                    title="Instant credit"
                    value={this.props.totalInstantCredit}
                    to="/instantCredit"
                  />)
                }

                {(flow === 'AAL' || flow === 'NSO' || comboOrder) &&
                  <SelectListItem
                    title={cqContent.label.OD_CHECKOUT_ACTIVATION_FEE_TEXT}
                    value={'$' + totalActivationFee}
                    to="/activationFee"
                  />
                }
              </div>}
            <HorizontalRule y={1} margin="0" />
          </Col>
        </Row>
        {termsAndConditionsInfo !== null && <AgreementBreakDown />}
        <OptinSMS cqContent={cqContent} mtnList={shippingInfo.contactInfo.activeSMSCapableMtnList} updateOptInSmsNumber={this.updateOptInSmsNumber} smsOptin={this.smsOptin} />

        <Row className="pad32  ensighten_bottomButtons">
          <Col xs={12} className="textAlignCenter">
            <PlaceOrderBtn
              disableBtn={checkoutStates.paymentRequired}
              cqContent={cqContent}
              submitOrderURL={submitOrderURL}
              onOrderPlacement={placeOrder}
              smsOptin={this._smsOptin}
              updateOptInSmsNumber={this._updateOptInSmsNumber}
            />
          </Col>
          <Col xs={12}>
            <a className="margin30 onlyTopMargin link" href={cartDetailURL} analyticstrack="edit-cart">{cqContent.label.OD_CHECKOUT_MAIN_SCREEN_CART_TEXT}</a>
          </Col>
        </Row>

      </Grid>
    );
  }
}

ReviewOrder.propTypes = {
  subtitle: PropTypes.string,
  flow: PropTypes.string,
  comboOrder: PropTypes.bool,
  deviceConfigInfo: PropTypes.object,
  devices: PropTypes.object,
  shippingInfo: PropTypes.object,
  selectedShippingType: PropTypes.object,
  dueToday: PropTypes.string,
  dueMonthly: PropTypes.string,
  paymentInfo: PropTypes.string,
  isFetching: PropTypes.bool,
  transformedTradeInPromoDetails: PropTypes.object,
  placeOrder: PropTypes.func,
  cartDetailURL: PropTypes.string,
  cqContent: PropTypes.object,
  pastDueAmount: PropTypes.string,
  totalActivationFee: PropTypes.string,
  pastDueAmountPaid: PropTypes.bool,
  cpcOrder: PropTypes.bool,
  plans: PropTypes.object,
  submitOrderURL: PropTypes.string,
  checkoutStates: PropTypes.object,
  titleToday: PropTypes.string,
  showInfoNotification: PropTypes.func,
  billingInfo: PropTypes.object,
  tmpMdOpted: PropTypes.bool,
  standaloneAccessories: PropTypes.object,
  accessories: PropTypes.array,
  termsAndConditionsInfo: PropTypes.array,
  giftCardsEnabled: PropTypes.bool,
  giftCardsUsed: PropTypes.number,
  totalGiftCardAmount: PropTypes.string,
  balanceCreditCardAmount: PropTypes.string,
  showShippingAddress: PropTypes.bool,
  showPaymentSection: PropTypes.bool,
  showDeliveryMethod: PropTypes.bool,
  accessoriesBundle: PropTypes.array,
  lineLevelOpted: PropTypes.bool,
  instantCreditOrder: PropTypes.bool,
  totalInstantCredit: PropTypes.string,
  bicRepresentationChangeEnabled: PropTypes.bool,
  promoTradeInOrder: PropTypes.bool,
  selectedVendorShippingType: PropTypes.object,
  showVendorShippingMethod: PropTypes.bool,
  isTradeInEnabled: PropTypes.bool,
};

export default ReviewOrder;
