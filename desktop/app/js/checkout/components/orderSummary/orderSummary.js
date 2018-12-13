import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Sticky from 'react-stickynode';

import { NOTIFICATIONS, EDIT_STATE } from '../../constants';
import Accordion from './accordion/accordion';
import BuddyModal from './BuddyModal';
import NotificationBar from '../../../common/NotificationBar';
import TradeInBanner from './tradeInBanner';
import TradeInBannerInstantCredit from './tradeInBannerInstantCredit';

import NortonSeal from '../../../../images/norton_secure_seal.svg';

class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBuddyModal: false,
    };
  }
  onPlaceOrder = () => {
    const { cqContent, showErrorNotification, addressInfo, checkoutStates } = this.props;
    const scrollProps = { block: 'start', inline: 'nearest', behavior: 'smooth' };
    if (!this.props.checkoutEnabled) {
      if (!this.props.shippingCompleted) {
        if (this.props.shippingValid && this.props.editState[EDIT_STATE.SHIPPING]) {
          // Shipping/ISPU section expanded and no errors present
          showErrorNotification(cqContent.error.DT_OD_CHECKOUT_COMPLETE_SHIPPING_ERROR);
          if (!this.props.ispuSelected) {
            this.props.touchForm('shippingAddress');
          }
        } else if (!this.props.ispuSelected) {
          // Shipping Address Error Messages
          if (checkoutStates.poBoxShippingAddress) {
            // PO BOX Address
            showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_PO_BOX_ERROR);
          } else if (checkoutStates.batteryShippingNotAllowedStates) {
            // Alaska and Hawaii cannot be shipped standalone batteries
            showErrorNotification(cqContent.error.DT_OD_CHECKOUT_STANDALONE_BATTERY_ERROR);
          } else if (checkoutStates.shippingAddressValidationError) {
            // Generic Validation Error
            showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_VALIDATION_ERROR);
          } else if (checkoutStates.contactInfoRequired) {
            if (checkoutStates.shippingNameChangeRequired) {
              // Missing First Name, Last Name, Email and Phone Number
              showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_NAME_EMAIL_AND_PHONE_NUMBER_ERROR);
            } else if (!addressInfo.email && !addressInfo.phoneNumber) {
              showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_EMAIL_AND_PHONE_NUMBER_ERROR);
            } else if (!addressInfo.email) {
              // Missing Email Address
              showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_EMAIL_ERROR);
            } else if (!addressInfo.phoneNumber) {
              // Missing Phone Number
              showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_PHONE_NUMBER_ERROR);
            }
          } if (checkoutStates.shippingNameChangeRequired) {
            // Missing First Name, Last Name
            showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_NAME_ERROR);
          } else {
            this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_ORDER_SUMMARY_SECTION_ERROR);
          }
        } else {
          // ISPU Error Messages
          this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_ORDER_SUMMARY_SECTION_ERROR);
        }
        if (document.getElementById('shippingSection')) document.getElementById('shippingSection').scrollIntoView(scrollProps);
      } else if (!this.props.paymentCompleted) {
        if (checkoutStates.paymentRequired) {
          // Payment information missing or invalid
          this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_ORDER_SUMMARY_SECTION_ERROR);
        } else {
          // Payment section expanded
          this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_COMPLETE_PAYMENT_ERROR);
        }
        if (document.getElementById('paymentSection')) document.getElementById('paymentSection').scrollIntoView(scrollProps);
      } else if (!this.props.devicesCompleted) {
        if (!this.props.deviceNumberCompleted && !this.props.npanxxError) {
          // Device Number/NPNAXX section expanded
          showErrorNotification(cqContent.error.DT_OD_CHECKOUT_COMPLETE_NUMBER_ERROR);
        } else if (!this.props.deviceServiceAddressCompleted) {
          // Device Service Address Section expanded
          showErrorNotification(cqContent.error.DT_OD_CHECKOUT_COMPLETE_SERVICE_ADDRESS_ERROR);
          this.props.touchForm('serviceAddress');
        } else {
          // Device Section has incomplete fields (either service address or device number)
          this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_ORDER_SUMMARY_SECTION_ERROR);
        }
        if (document.getElementById('devicesSection')) document.getElementById('devicesSection').scrollIntoView(scrollProps);
      } else if (!this.props.termsCompleted) {
        // Terms and conditions have not been agreed
        showErrorNotification(cqContent.error.DT_OD_CHECKOUT_COMPLETE_TC_ERROR);
        this.props.touchForm('agreementForm');
        if (document.getElementById('agreementSection')) document.getElementById('agreementSection').scrollIntoView(scrollProps);
      }
    } else if (this.props.buddyUpgrade) {
      this.showBuddyModal();
    } else {
      this.submitOrder();
    }
  };

  submitOrder = () => {
    const { placeOrder, submitOrderURL, optInShippingSMS, optInMtn, optInPaperFree, tradeInDetails } = this.props;
    /* TradeIn Submission Id Changes */
    if (tradeInDetails) {
      const { tradeInSubmissionIdRequried, tradeInSubmissionIdUrl } = tradeInDetails;
      if (tradeInSubmissionIdRequried && tradeInSubmissionIdUrl) this.props.getTradeInSubmissionId(tradeInSubmissionIdUrl);
    }
    placeOrder(submitOrderURL, optInShippingSMS, optInMtn, optInPaperFree);
  }

  cancelOrder = () => {
    const { cqContent, cancelOrder, orderId } = this.props;
    cancelOrder(cqContent.label.DT_OD_CHECKOUT_BUDDY_CANCEL_URL, orderId);
  }

  showBuddyModal = () => {
    this.setState({ showBuddyModal: true });
  }

  closeBuddyModal = () => {
    this.setState({ showBuddyModal: false });
  }

  render() {
    const {
      cqContent,
      cartDetailURL,
      notification,
      tradeInDetails,
      checkoutStates,
      marketTradeInDevices,
    } = this.props;
    const readTermsLink = `<a class="link" analyticstrack="terms-link" href="javascript:document.getElementById('agreementSection').scrollIntoView({ behavior: 'smooth' })">${cqContent.label.DT_OD_CHECKOUT_SUMMARY_READ_TERMS_LINK}</a>`;
    return (
      <div>
        {this.state.showBuddyModal &&
          <BuddyModal cqContent={cqContent} closeBuddyModal={this.closeBuddyModal} submitOrder={this.submitOrder} cancelOrder={this.cancelOrder} />
        }
        <Sticky
          bottomBoundary="#app"
          top={notification.height}
        >
          <NotificationBar section={NOTIFICATIONS.SUMMARY} />
          <div className="pad24">
            {/* Header */}
            <div className="margin42 onlyBottomMargin">
              <div className="displayInlineBlock">
                <h2 className="h1 fontSize32"> {cqContent.label.DT_OD_CHECKOUT_SUMMARY_TITLE} </h2>
              </div>
              <div className="floatRight displayInlineBlock textAlignRight ">
                <a
                  className="margin3 onlyBottomMargin link displayBlock"
                  href={cartDetailURL}
                  analyticstrack="editCart-link"
                >
                  {cqContent.label.DT_OD_CHECKOUT_SUMMARY_EDIT_CART}
                </a>
                {/* <button
                  className="margin3 onlyTopMargin link background_transparent displayBlock borderSize_0 fontSize_3 noPad"
                // onClick={this.onCancel}
                >
                  {cqContent.label.DT_OD_CHECKOUT_SUMMARY_SAVE_CART}
                </button> */}
              </div>
            </div>
            {/* Accordion  */}
            <Accordion {...this.props} />
            {/*
              {!standaloneAccessories &&
                <p className="bold fontSize_5">
                  {cqContent.label.DT_OD_CHECKOUT_SUMMARY_YOU_SAVE_PER_MONTH.replace('$AMOUNT$', 'XX.XX')}
                </p>
              }
            */}
            {/* Only one Market value trade in */}
            {tradeInDetails && tradeInDetails.tradeInDevices &&
              tradeInDetails.tradeInDevices.length === 1 &&
              !checkoutStates.instantCreditOrder &&
              <TradeInBanner
                cqContent={cqContent}
                tradeInDetails={tradeInDetails}
              />
            }
            {/* Instant Credit OR > one Trade OR one Promo Trade */}
            {tradeInDetails && tradeInDetails.tradeInDevices &&
              (checkoutStates.instantCreditOrder || tradeInDetails.tradeInDevices.length > 1) &&
              <TradeInBannerInstantCredit
                cqContent={cqContent}
                instantCreditDetails={this.props.instantCreditDetails}
                tradeInDetails={tradeInDetails}
                instantCreditOrder={checkoutStates.instantCreditOrder}
              />
            }

            {/* LEGAL */}
            {!this.props.standaloneAccessories &&
              <p className="legal margin24 noSideMargin color_000">
                {cqContent.label.DT_OD_CHECKOUT_SUMMARY_DUE_MONTHLY_DISCLAIMER}
              </p>
            }

            {this.props.tradeInDetails &&
              <div className="margin24 noSideMargin">
                {marketTradeInDevices && marketTradeInDevices.map((tradeDevice) => (
                  <p
                    className="legal color_000"
                    dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CHECKOUT_TRADE_IN_PROMO_TERMS.replace(/_AMOUNT_/g, tradeDevice.tradeInCredit) }}
                  />
                ))
                }
                <p
                  className="legal color_000"
                  dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CHECKOUT_TRADE_IN_TERMS_TEXT }}
                />
              </div>
            }
            {/* Checkout CTAs */}
            <div>
              {!this.props.standaloneAccessories &&
                <p
                  className="margin24 noSideMargin"
                  dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CHECKOUT_SUMMARY_READ_TERMS.replace('$TERMS_LINK$', readTermsLink) }}
                />
              }
              <div className="margin24 noSideMargin clearfix">
                <button
                  className="button primary"
                  onClick={this.onPlaceOrder}
                  analyticstrack="placeOrder-CTA"
                  disabled={checkoutStates.disableSubmitOrderForOPALUser}
                >
                  {cqContent.label.DT_OD_CHECKOUT_PLACE_ORDER_CTA}
                </button>
                <img className="floatRight height60 margin-6 onlyTopMargin" src={NortonSeal} alt="Norton Secured" />
              </div>
              <a className="link" analyticstrack="privacyPolicy-link" target="_blank" href="//www22.verizon.com/privacy/" >{cqContent.label.DT_OD_CHECKOUT_SUMMARY_PRIVACY_POLICY}</a>
            </div>
          </div>
        </Sticky>
      </div>
    );
  }
}

OrderSummary.propTypes = {
  cqContent: PropTypes.object,
  checkoutEnabled: PropTypes.bool,
  cartDetailURL: PropTypes.string,
  placeOrder: PropTypes.func,
  submitOrderURL: PropTypes.string,
  optInShippingSMS: PropTypes.bool,
  optInMtn: PropTypes.string,
  optInPaperFree: PropTypes.bool,
  standaloneAccessories: PropTypes.bool,
  buddyUpgrade: PropTypes.bool,
  orderId: PropTypes.string,
  cancelOrder: PropTypes.func,
  showErrorNotification: PropTypes.func,
  termsCompleted: PropTypes.bool,
  shippingCompleted: PropTypes.bool,
  paymentCompleted: PropTypes.bool,
  devicesCompleted: PropTypes.bool,
  notification: PropTypes.object,
  addressInfo: PropTypes.object,
  checkoutStates: PropTypes.object,
  ispuSelected: PropTypes.bool,
  tradeInDetails: PropTypes.object,
  getTradeInSubmissionId: PropTypes.func,
  instantCreditDetails: PropTypes.object,
  deviceServiceAddressCompleted: PropTypes.bool,
  deviceNumberCompleted: PropTypes.bool,
  touchForm: PropTypes.func,
  npanxxError: PropTypes.bool,
  shippingValid: PropTypes.bool,
  editState: PropTypes.object,
  marketTradeInDevices: PropTypes.array,
};

export default OrderSummary;
