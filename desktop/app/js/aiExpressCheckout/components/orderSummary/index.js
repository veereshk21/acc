import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Sticky from 'react-stickynode';
import { Row, Col } from 'react-flexbox-grid';
import { EDIT_STATE, NOTIFICATIONS } from '../../constants';
import BuddyModal from './BuddyModal';
import ToolTip from '../../../common/ToolTip/index';
import EditButton from '../../../common/EditButton/index';
import AsyncComponent from '../../../common/AsyncComponent';
import CurrentBill from './currentBill';

const CustomerAgreementModal = AsyncComponent(() => import('./customerAgreementModal'));
const AgreementModal = AsyncComponent(() => import('../../containers/agreement/'));

class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBuddyModal: false,
      showTermsModal: false,
      showCustomerAgreementModal: false,
      customerAgreement: null,
      renderHTML: false,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.asyncCallStatus.data.orderValidated) {
      if (!this.props.checkoutEnabled) {
        this.showError();
      } else if (this.props.buddyUpgrade) {
        this.showBuddyModal();
      } else {
        this.showTermsModal();
      }
      this.props.invalidateAsyncFetch();
    } else if (nextProps.asyncCallStatus.data.dppAgreementFetched) {
      // Clicking on dpp contract link in order summary
      this.showCustomerAgreementModal(this.props.edgeTermsAndCondition, true);
      this.props.invalidateAsyncFetch();
    }
  }

  onPlaceOrder = () => {
    if (!this.props.checkoutEnabled) {
      this.showError();
    } else {
      this.props.validateOrder({ validateOrder: true });
    }
  }

  showError = () => {
    const { cqContent, showErrorNotification, addressInfo, checkoutStates,
    } = this.props;
    const scrollProps = { block: 'start', inline: 'nearest', behavior: 'smooth' };
    if (!this.props.checkoutEnabled) {
      if (!this.props.devicesCompleted) {
        showErrorNotification(cqContent.error.DT_OD_CHECKOUT_COMPLETE_DEVICE_CONFIGURATION_ERROR);
        if (document.getElementById('devicesSection')) document.getElementById('devicesSection').scrollIntoView(scrollProps);
      } else if (!this.props.deliveryCompleted) {
        showErrorNotification(cqContent.error.DT_OD_CHECKOUT_COMPLETE_DELIVERY_ERROR);
        if (document.getElementById('shippingMethodSection')) document.getElementById('shippingMethodSection').scrollIntoView(scrollProps);
      } else if (!this.props.shippingCompleted) {
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
          } else if (checkoutStates.shippingAddressValidationError) {
            // Generic Validation Error
            showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_VALIDATION_ERROR);
          } else if (checkoutStates.contactInfoRequired) {
            if (!addressInfo.email && !addressInfo.phoneNumber) {
              showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_EMAIL_AND_PHONE_NUMBER_ERROR);
            } else if (!addressInfo.email) {
              // Missing Email Address
              showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_EMAIL_ERROR);
            } else if (!addressInfo.phoneNumber) {
              // Missing Phone Number
              showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_PHONE_NUMBER_ERROR);
            }
          } else {
            this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_ORDER_SUMMARY_SECTION_ERROR);
          }
        } else {
          // ISPU Error Messages
          this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_ORDER_SUMMARY_SECTION_ERROR);
        }
        if (document.getElementById('shippingAddressSection')) document.getElementById('shippingAddressSection').scrollIntoView(scrollProps);
      } else if (!this.props.serviceAddressCompleted) {
        // Device Service Address Section expanded
        showErrorNotification(cqContent.error.DT_OD_CHECKOUT_COMPLETE_SERVICE_ADDRESS_ERROR);
        if (document.getElementById('ServiceAddressSection')) document.getElementById('ServiceAddressSection').scrollIntoView(scrollProps);
        this.props.touchForm('serviceAddress');
      } else if (!this.props.paymentCompleted) {
        if (checkoutStates.paymentRequired) {
          // Payment information missing or invalid
          this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_ORDER_SUMMARY_SECTION_ERROR);
        } else {
          // Payment section expanded
          this.props.showErrorNotification(this.props.cqContent.error.DT_OD_CHECKOUT_COMPLETE_PAYMENT_ERROR);
        }
        if (document.getElementById('paymentSection')) document.getElementById('paymentSection').scrollIntoView(scrollProps);
      }
    }
  };

  submitOrder = () => {
    const { placeOrder, submitAIOrderURL, optInShippingSMS, optInMtn, optInPaperFree, tradeInDetails, showErrorNotification, cqContent } = this.props;
    if (!this.state.showTermsModal) {
      // If terms hasn't been shown then show it.
      this.showTermsModal();
    } else if (!this.props.termsCompleted) {
      // Terms and conditions have not been agreed
      showErrorNotification(cqContent.error.DT_OD_CHECKOUT_COMPLETE_TC_ERROR, NOTIFICATIONS.AGREEMENT);
      if (document.getElementById('agreementSection')) document.getElementById('agreementSection').scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
      this.props.touchForm('agreementForm');
    } else {
      this.closeTermsModal();
      /* TradeIn Submission Id Changes */
      if (tradeInDetails) {
        const { tradeInSubmissionIdRequried, tradeInSubmissionIdUrl } = tradeInDetails;
        if (tradeInSubmissionIdRequried && tradeInSubmissionIdUrl) this.props.getTradeInSubmissionId(tradeInSubmissionIdUrl);
      }
      placeOrder(submitAIOrderURL, optInShippingSMS, optInMtn, optInPaperFree);
    }
  }

  cancelOrder = () => {
    const { cqContent, cancelOrder, orderId } = this.props;
    cancelOrder(cqContent.label.DT_OD_CHECKOUT_BUDDY_CANCEL_URL, orderId);
  }

  showTermsModal = () => {
    this.props.asyncFetch();
    this.setState({ showTermsModal: true });
  }
  closeTermsModal = () => {
    this.setState({ showTermsModal: false });
  }
  showCustomerAgreementModal = (terms, renderHTML) => {
    this.props.asyncFetch();
    this.setState({
      showCustomerAgreementModal: true,
      customerAgreement: terms,
      renderHTML,
    });
  }
  closeCustomerAgreementModal = () => {
    this.setState({
      showCustomerAgreementModal: false,
      customerAgreement: null,
    });
    this.props.invalidateAsyncFetch();
  }
  showBuddyModal = () => {
    this.setState({ showBuddyModal: true });
  }

  closeBuddyModal = () => {
    this.setState({ showBuddyModal: false });
  }
  showDPPAgreement = () => {
    this.props.validateOrder({ validateOrder: false });
  }
  render() {
    const {
      cqContent,
      notification,
      shipping,
      plans,
      hllplan,
      termsAndConditionsInfo,
      plansTotalLAC,
      dppInOrder,
    } = this.props;

    const { expanded } = this.state;

    return (
      <div className="pad24 onlyTopPad margin24 onlyTopMargin">
        {this.state.showBuddyModal &&
          <BuddyModal
            cqContent={cqContent}
            closeBuddyModal={this.closeBuddyModal}
            submitOrder={this.submitOrder}
            cancelOrder={this.cancelOrder}
          />
        }
        {this.state.showCustomerAgreementModal &&
          <CustomerAgreementModal
            onCloseModal={this.closeCustomerAgreementModal}
            terms={this.state.customerAgreement}
            invalidateAsyncFetch={this.props.invalidateAsyncFetch}
            renderHTML={this.state.renderHTML}
          />
        }
        {this.state.showTermsModal &&
          <AgreementModal
            onCloseModal={this.closeTermsModal}
            submitOrder={this.submitOrder}
          />
        }
        <Sticky
          bottomBoundary="#app"
          top={notification.height}
        >
          <div className="pad24 noTopPad">
            {/* Todo Remove after BE change */}
            {/* <div className="background_blue pad15 positionRelative">
              <p className="color_FFF normal textAlignCenter">Save $XXX when you upgrade today</p>
              <span
                aria-hidden="true"
                className="abcPromoPointer"
              />
            </div> */}
            <Row className="margin18 onlyTopMargin">
              <Col xs>
                <h2 aria-hidden className="h1 fontSize32"> {cqContent.label.DT_OD_CHECKOUT_SUMMARY_TITLE} </h2>
              </Col>
              <Col className="pad10 noSidePad lineHeight18 textAlignRight">
                <span aria-hidden className="accordion_icon" />
                <EditButton onClick={() => { this.setState({ expanded: !expanded }); }}>
                  {expanded ? 'Collapse' : 'Expand'}
                </EditButton>

              </Col>
            </Row>

            <div className="pad20 onlyTopPad">
              {this.props.devices.items.map((device, index) => (
                <div key={`orderSummaryDevice-${index}`}>
                  {/* Device Name */}
                  <div className="margin18 noSideMargin">
                    <p className={expanded ? 'bold fontSize_5' : ''}><span dangerouslySetInnerHTML={{ __html: device.manufactureName }} /> <span dangerouslySetInnerHTML={{ __html: device.deviceName }} /></p>
                  </div>
                  {expanded &&
                    <div>
                      {/* Payment method */}
                      <div>
                        {/* Monthly Payment */}
                        {device.contractTerm === '99' &&
                          <Row className="margin18 noSideMargin">
                            <Col xs={9}>
                              <p>24 Monthly device payments</p>
                            </Col>
                            <Col xs={3}>
                              {device.dueMonthlyDiscounted ?
                                <div className="textAlignRight">
                                  <div className="textDecLineThrough">${device.dueMonthlyOriginal}/mo</div>
                                  <div>${device.dueMonthly}/mo</div>
                                </div>
                                :
                                <div className="textAlignRight">${device.dueMonthly}/mo</div>
                              }
                            </Col>
                          </Row>
                        }

                        {/* Retail Price */}
                        {device.contractTerm === '0' &&
                          <Row className="margin18 noSideMargin">
                            <Col xs={9}>
                              <p>Retail Price Payment</p>
                            </Col>
                            <Col xs={3}>
                              {device.dueTodayDiscounted ?
                                <div className="textAlignRight">
                                  <div className="textDecLineThrough">${device.dueTodayOriginal}</div>
                                  <div>${device.dueToday}</div>
                                </div>
                                :
                                <div className="textAlignRight">${device.dueToday}</div>
                              }
                            </Col>
                          </Row>
                        }

                        {/* Two Year Contract */}
                        {device.contractTerm === '24' &&
                          <Row className="margin18 noSideMargin">
                            <Col xs={9}>
                              <p>2-Year Agreement Price</p>
                            </Col>
                            <Col xs={3}>
                              {device.dueTodayDiscounted ?
                                <div className="textAlignRight">
                                  <div className="textDecLineThrough">${device.dueTodayOriginal}</div>
                                  <div>${device.dueToday}</div>
                                </div>
                                :
                                <div className="textAlignRight">${device.dueToday}</div>
                              }
                            </Col>
                          </Row>
                        }
                      </div>

                      {/* Equipment Protection */}
                      {device.protectionFeature && !device.protectionIneligible &&
                        <Row className="margin18 noSideMargin">
                          <Col xs={9}>
                            <p className="fontSize_4">{device.protectionFeature.name}</p>
                          </Col>
                          <Col xs={3}>
                            {device.protectionFeature.price !== '-' &&
                              device.protectionFeature.originalPrice !== '-' &&
                              device.protectionFeature.hasEcpdDiscount ?
                              (<div className="textAlignRight">
                                <div className="textDecLineThrough">${device.protectionFeature.originalPrice}/mo</div>
                                <div>${device.protectionFeature.price}/mo</div>
                              </div>)
                              :
                              <div className="textAlignRight">{device.protectionFeature.price !== '-' ? `$${device.protectionFeature.price}/mo` : '-'}</div>
                            }
                          </Col>
                        </Row>
                      }
                      {/* Phone Plan Access */}
                      {plansTotalLAC &&
                        <Row className="margin18 noSideMargin">
                          <Col xs={9}>
                            <p>Phone Plan Access</p>
                          </Col>
                          <Col xs={3}>
                            <div className="textAlignRight">${plansTotalLAC}/mo</div>
                          </Col>
                        </Row>
                      }
                      {/* Hex Plan */}
                      {(hllplan && (plans && plans.existingDevices)) &&
                        plans.existingDevices.map((dev) => {
                          const existingPlanExists = (plans && plans.items) && plans.items.filter((plan) => plan.planCommerceItemId === dev.planCommerceItemId)[0];
                          return (
                            existingPlanExists &&
                            <Row className="margin18 noSideMargin">
                              <Col xs={9}>
                                <p className="fontSize_4" dangerouslySetInnerHTML={{ __html: `${existingPlanExists.planDisplayName}` }} />
                              </Col>
                              <Col xs={3}>
                                <div className="textAlignRight">${existingPlanExists.dueMonthly}</div>
                              </Col>
                            </Row>
                          );
                        })
                      }

                      {/* Plan Access */}
                      {!hllplan && plans && plans.items && plans.items.map((plan, planIndex) => (
                        (plan.lineAccessCharges && plan.lineAccessCharges.map((lac, lacIndex) => (
                          <div key={`lac-${planIndex}-${lacIndex}`}>
                            <Row className="margin18 noSideMargin">
                              <Col xs={9}>
                                <p>Line Access</p>
                              </Col>
                              <Col xs={3}>
                                {lac.hasEcpdDiscount ?
                                  <div className="textAlignRight">
                                    <div className="textDecLineThrough">${lac.wasPrice}</div>
                                    <div>${lac.price}/mo</div>
                                  </div>
                                  :
                                  <div className="textAlignRight">${lac.price}/mo</div>
                                }
                              </Col>
                            </Row>
                          </div>
                        )))
                      ))}
                    </div>
                  }
                  <hr />
                </div>
              ))}
            </div>

            <Row className="margin18 noSideMargin">
              <Col xs={9}>
                <p className={expanded ? 'bold fontSize_5' : ''}>One time taxes and fees</p>
              </Col>
            </Row>

            {/* Upgrade Fee */}
            {expanded &&
              <Row className="margin18 noSideMargin">
                <Col xs={9}>
                  <span className="fontSize_4">{cqContent.label.DT_OD_CHECKOUT_SUMMARY_UPGRADE_FEE}</span>
                  <ToolTip
                    className="margin3 onlyLeftMargin displayInlineBlock"
                    ariaLabel="Upgrade fee information tooltip"
                    text={cqContent.label.DT_OD_CHECKOUT_SUMMARY_UPGRADE_FEE_TOOLTIP}
                  />
                </Col>
                <Col xs={3}>
                  <p className="textAlignRight">${this.props.totalUpgradeFee}</p>
                </Col>
              </Row>
            }

            {/* Surcharges */}
            {expanded && this.props.totalSurcharges &&
              <Row className="margin18 noSideMargin">
                <Col xs={9}>
                  <div>
                    <span className="fontSize_4">Surcharges</span>
                    <ToolTip
                      className="margin3 onlyLeftMargin displayInlineBlock"
                      text={this.props.totalOrderTaxTooltip}
                    />
                  </div>
                </Col>
                <Col xs={3}>
                  <p className="textAlignRight">${this.props.totalSurcharges}</p>
                </Col>
              </Row>
            }

            {/* Taxes */}
            {expanded && this.props.totalOrderTax &&
              <Row className="margin18 noSideMargin">
                <Col xs={9}>
                  <div>
                    <span className="fontSize_4">Taxes</span>
                    {this.props.totalOrderTaxTooltip && <ToolTip
                      className="margin3 onlyLeftMargin displayInlineBlock"
                      text={this.props.totalOrderTaxTooltip}
                    />}
                  </div>
                </Col>
                <Col xs={3}>
                  <p className="textAlignRight">${this.props.totalOrderTax}</p>
                </Col>
              </Row>
            }

            {/* Shipping */}
            <Row className="margin18 noSideMargin">
              <Col xs={9}>
                <p >{shipping.shippingTypeName}</p>
              </Col>
              <Col xs={3}>
                <p className="textAlignRight">{shipping.price > 0 ? `$${shipping.price} delivery` : 'Free'}</p>
              </Col>
            </Row>
            {expanded &&
              <hr className="border_black onlyBottomBorder" />
            }


            {/* Promotional savings */}
            {/* <Row className="margin18 noSideMargin">
              <Col xs={9}>
                <p className="color_blue">Promotional savings over 12/mo.</p>
              </Col>
              <Col xs={3}>
                <p className="color_blue textAlignRight">$XX.XX/mo</p>
              </Col>
            </Row> */}

            {/* Total due today */}
            <Row className="margin18 noSideMargin">
              <Col xs={9}>
                <p className="bold fontSize_5">Total due today</p>
              </Col>
              <Col xs={3}>
                <p className="bold fontSize_5 textAlignRight">${this.props.dueToday}</p>
              </Col>
            </Row>

            {/* Total due monthly */}
            <Row className="margin18 noSideMargin">
              <Col xs={9}>
                <div>
                  <span className="bold fontSize_5">Total due monthly </span>
                  <ToolTip
                    className="margin3 onlyLeftMargin displayInlineBlock"
                    text={cqContent.label.DT_OD_CHECKOUT_SUMMARY_DUE_MONTHLY_DISCLAIMER}
                  />
                </div>
                <ToolTip
                  className="margin3 onlyLeftMargin displayInlineBlock"
                  text={<CurrentBill />}
                  textTooltip
                  noRenderHTML
                >
                  What’s my current bill?
                </ToolTip>
              </Col>
              <Col xs={3}>
                <p className="bold fontSize_5 textAlignRight">${this.props.dueMonthly}/mo.</p>
              </Col>
            </Row>

            {/* Checkout CTAs */}
            <div>
              {!this.props.standaloneAccessories &&
                <div className="margin12 noSideMargin">
                  <span>Review the&nbsp;</span>
                  {termsAndConditionsInfo && termsAndConditionsInfo.agreementText &&
                    <a
                      role="button"
                      className="link"
                      analyticstrack="customerAgreement-link"
                      onClick={() => { this.showCustomerAgreementModal([termsAndConditionsInfo.agreementText], false); }}
                    >
                      Verizon Wireless Customer Agreement
                    </a>
                  }

                  {dppInOrder && <span>,&nbsp;</span>}
                  {dppInOrder &&
                    <a
                      role="button"
                      className="link"
                      analyticstrack="dppAgreement-link"
                      onClick={this.showDPPAgreement}
                    >
                      Device Payment Agreement
                    </a>
                  }

                  {termsAndConditionsInfo && termsAndConditionsInfo.eppTermsAndConditions && termsAndConditionsInfo.eppCustomerType && <span>,&nbsp;</span>}
                  {termsAndConditionsInfo && termsAndConditionsInfo.eppTermsAndConditions && termsAndConditionsInfo.eppCustomerType &&
                    <a
                      role="button"
                      className="link"
                      analyticstrack="eppAgreement-link"
                      onClick={() => { this.showCustomerAgreementModal([termsAndConditionsInfo.eppTermsAndConditions], true); }}
                    >
                      Employee Phone Program Terms and Conditions
                    </a>
                  }

                  <span>&nbsp;and&nbsp;</span>
                  <a
                    className="link"
                    analyticstrack="privacyPolicy-link"
                    target="_blank"
                    href="//www22.verizon.com/privacy/"
                  >
                    Verizon Privacy Policy
                  </a>
                  <span>&nbsp;to checkout.</span>
                </div>

              }
              <div className="margin24 noSideMargin clearfix">
                <button
                  className="button primary width100"
                  onClick={this.onPlaceOrder}
                  analyticstrack="placeOrder-CTA"
                >
                  {cqContent.label.DT_OD_CHECKOUT_PLACE_ORDER_CTA}
                </button>
              </div>
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
  placeOrder: PropTypes.func,
  submitAIOrderURL: PropTypes.string,
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
  deliveryCompleted: PropTypes.bool,
  notification: PropTypes.object,
  addressInfo: PropTypes.object,
  checkoutStates: PropTypes.object,
  ispuSelected: PropTypes.bool,
  tradeInDetails: PropTypes.object,
  getTradeInSubmissionId: PropTypes.func,
  serviceAddressCompleted: PropTypes.bool,
  touchForm: PropTypes.func,
  shippingValid: PropTypes.bool,
  editState: PropTypes.object,
  shipping: PropTypes.object,
  dueMonthly: PropTypes.string,
  dueToday: PropTypes.string,
  devices: PropTypes.object,
  asyncFetch: PropTypes.func,
  totalUpgradeFee: PropTypes.string,
  hllplan: PropTypes.bool,
  plans: PropTypes.object,
  totalSurcharges: PropTypes.string,
  totalOrderTax: PropTypes.string,
  totalOrderTaxTooltip: PropTypes.string,
  invalidateAsyncFetch: PropTypes.func,
  termsAndConditionsInfo: PropTypes.object,
  edgeTermsAndCondition: PropTypes.array,
  plansTotalLAC: PropTypes.string,
  validateOrder: PropTypes.func,
  dppInOrder: PropTypes.bool,
};

export default OrderSummary;
