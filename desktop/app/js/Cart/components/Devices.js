import { Col, Row } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { parsePrice } from './../../common/Helpers';
import Anchor from '../../common/A/A';
import AsyncComponent from '../../common/AsyncComponent';
import DeviceEditRemovePrompt from './DeviceEditRemovePrompt';
import Modal from '../../common/Modal/index';
import Notification from '../../common/Notification/Notification';
import ToolTip from '../../common/ToolTip/index';

const PlanInfoLL = AsyncComponent(() => import('./PlanInfoLineLevel'));

class Devices extends Component {
  constructor(props) {
    super(props);
    this.learnMoreView = this.learnMoreView.bind(this);
    this.openPolicyModal = this.openPolicyModal.bind(this);
    this.getPromoHeader = this.getPromoHeader.bind(this);
    this.getLinePromo = this.getLinePromo.bind(this);
    this.state = { showTermsConditionModal: false, showModal: false, showIframeModal: false, alwaysParse: false, showPolicyModal: false };
  }

  getPromoHeader() {
    const { deviceInfo } = this.props;
    const offer = deviceInfo.sbdOffer.promoBadgeMessages.filter((ins) => ins.placement === 'LINE-HEADER')[0];
    if (offer !== undefined) {
      return (
        <Col xs={12} className="margin12 onlyBottomMargin">
          <Notification
            message={offer.badgeText}
            toolTip={offer.badgeToolTip}
            tooltipClass="frpTooltip"
            noClose
            noIcon
          />
        </Col>
      );
    }
    return null;
  }

  getLinePromo() {
    const { deviceInfo, cqContent } = this.props;
    const offer = deviceInfo.sbdOffer.promoBadgeMessages.filter((ins) => ins.placement === 'ITEM-HEADER')[0];
    if (offer !== undefined) {
      return (
        <Row>
          <Col md={7} className="margin18 onlyTopMargin">
            <div className="clearfix positionRelative">
              <span className="myOfferBanner-tag fontSize_5 onlyRightMargin margin3" />
              <span className="fontSize_3 color_blue bold" dangerouslySetInnerHTML={{ __html: offer.badgeText }} />
              {offer.badgeToolTip && <ToolTip
                id="upgradeFee-tooltip"
                className="margin3 onlyLeftMargin displayInlineBlock"
                ariaLabel="Upgrade fee information tooltip"
                text={offer.badgeToolTip}
                noRenderHTML={this.state.alwaysParse}
              />}
              {offer.badgeToolTipUrl && <Link
                role="link" to="/" onClick={() => {
                  this.learnMoreView(offer.badgeToolTipUrl);
                }}
                analyticstrack="apple-music-learn-more-link" className="fontSize_4 color_black textDecUnderline pad5 onlyLeftPad"
              >{cqContent.label.DT_OD_CART_SEE_DETAILS_TEXT}</Link>}
            </div>
          </Col>
          <Col md={5} className="margin18 onlyTopMargin">
            {parseFloat(deviceInfo.sbdOffer.sbdNegativeAmt) > 0 &&
              <Row>
                <Col md={6}>
                  <div className="textAlignRight bold">
                    <span>-${deviceInfo.sbdOffer.sbdNegativeAmt}</span>
                  </div>
                </Col>
              </Row>}
          </Col>
        </Row>
      );
    }
    return null;
  }

  editItem(editDeviceUrl) {
    window.location = editDeviceUrl;
  }

  removeItem() {
    const { commerceItemId, flow, mtn } = this.props.deviceInfo;
    const { totalDevices, accessories, showHeadsUpMsg } = this.props;

    const standaloneAccessory = accessories.filter((accessory) => (accessory.standaloneAccessory === true));

    // If only 1 device and no standalone Accessories
    // if (this.props.totalTradeinDeviceCount > 1 && this.props.totalTradeinDeviceCount === this.props.totalDeviceCount) {
    if (showHeadsUpMsg) {
      this.setState({ showModal: true });
    } else if (totalDevices === 1 && standaloneAccessory.length === 0) {
      this.props.clearCart();
    } else {
      this.props.removeDevice({ commerceItemId, flow, mtn });
    }

    return true;
  }
  toggleTermsModal() {
    const isVisible = this.state.showTermsConditionModal;
    this.setState({ showTermsConditionModal: !isVisible });
  }
  learnMoreView(iframeUrl) {
    const isVisible = this.state.showIframeModal;
    this.setState({ showIframeModal: !isVisible });
    this.setState({ iframeD: !isVisible });
    this.setState({ iframeModalUrl: iframeUrl });
  }
  closeLearnMoreModal() {
    const isVisible = this.state.showIframeModal;
    this.setState({ showIframeModal: !isVisible });
  }
  moveNext() {
    const { commerceItemId, flow, mtn } = this.props.deviceInfo;
    const { totalDevices, accessories } = this.props;
    const standaloneAccessory = accessories.filter((accessory) => (accessory.standaloneAccessory === true));

    this.setState({ showModal: false });
    if (totalDevices === 1 && standaloneAccessory.length === 0) {
      this.props.clearCart();
    } else {
      this.props.removeDevice({ commerceItemId, flow, mtn });
    }
    return true;
  }
  openPolicyModal() {
    const isVisible = this.state.showPolicyModal;
    this.setState({ showPolicyModal: !isVisible });
  }
  closePolicyModal() {
    const isVisible = this.state.showPolicyModal;
    this.setState({ showPolicyModal: !isVisible });
  }

  render() {
    const {
      cqContent, deviceInfo, isHLLDevices, planInfo, protectionURL, cpcSucessful, tmpMd,
      itemOnJaxPlan, authenticated, instantCreditEligible, instantCreditPageURL, promotionList, ispuselectedAtPdp,
    } = this.props;
    const planInfoItem = {};
    if (isHLLDevices) {
      planInfoItem.items = planInfo.items.filter((plan) => deviceInfo.planCommerceItemId === plan.planCommerceItemId);
    }
    const isPlansExists = (planInfoItem && planInfoItem.items && planInfoItem.items.length > 0);
    const additionalParam = !authenticated ? '&uc=true&editProtection=true' : '';

    const getSbdOfferPrice = () => (
      <div>
        <span className="bold">${deviceInfo.sbdOffer.itemMonthlyPrice}</span>
      </div>
    );

    const getReducedDueMonthly = () => (deviceInfo.hasReducedDueMonthly &&
      <div><span>${deviceInfo.price}</span></div>);

    const getBICPrice = () => (deviceInfo.bicOfferApplied && deviceInfo.sbdOffer &&
      <div>
        <span className="bold">${deviceInfo.sbdOffer.bicDiscountedContractPrice}</span>
        <span className="textDecLineThrough block">${deviceInfo.sbdOffer.price}</span>
      </div>
    );

    const getMonthlyPrice = () => (
      <div>
        {deviceInfo.originalPrice > deviceInfo.price ?
          <div>
            <span className="bold">${deviceInfo.price}</span>
            <span className="textDecLineThrough block">${deviceInfo.originalPrice}</span>
          </div>
          :
          <span className="bold">{deviceInfo.price ? '$' + deviceInfo.price : '--'}</span>
        }
      </div>
    );
    const getDeviceOffer = (offer, idx) => {
      if (offer.promoBadgeMessages && offer.promoBadgeMessages.length > 0) {
        return (
          <Row key={idx}>
            <Col md={7} className="margin18 onlyTopMargin">
              <div className="clearfix positionRelative">
                <span className="myOfferBanner-tag fontSize_5 onlyRightMargin margin3" />
                <span className="fontSize_3 color_blue bold" dangerouslySetInnerHTML={{ __html: offer.promoBadgeMessages[0].badgeText }} />
                {offer.promoBadgeMessages[0].badgeToolTip && <ToolTip
                  id="upgradeFee-tooltip"
                  className="margin3 onlyLeftMargin displayInlineBlock"
                  ariaLabel="Upgrade fee information tooltip"
                  text={offer.promoBadgeMessages[0].badgeToolTip}
                  noRenderHTML={this.state.alwaysParse}
                />}
                {offer.promoBadgeMessages[0].badgeToolTipUrl && <Link
                  role="link" to="/" onClick={() => {
                    this.learnMoreView(offer.promoBadgeMessages[0].badgeToolTipUrl);
                  }}
                  analyticstrack="device-offer-learn-more-link" className="fontSize_4 color_black textDecUnderline pad5 onlyLeftPad"
                >{cqContent.label.DT_OD_CART_SEE_DETAILS_TEXT}</Link>}
              </div>
            </Col>
          </Row>
        );
      }
      return null;
    };

    const isUpgradeFeeWaivedOffer = !!(
      deviceInfo.devicePromotionList &&
      deviceInfo.devicePromotionList.length > 0 &&
      deviceInfo.devicePromotionList.find((offer) => (
        offer.promoAmount !== null && parseFloat(offer.promoAmount) > 0 && offer.isUpgradeFeeWaivedOffer
      ))
    );

    return (
      <div className="fontSize_4">
        <div>
          {
            <Modal
              width="40%"
              mounted={this.state.showIframeModal}
              closeFn={() => { this.closeLearnMoreModal(); }}
              showCloseX
              className="cart_seeDetailsModal"
            >
              <iframe src={this.state.iframeModalUrl} title="promoDetails" width="100%" height="100%" frameBorder="0" />
            </Modal>
          }
        </div>
        <div>
          {
            <Modal
              style={{ width: '40%' }}
              mounted={this.state.showPolicyModal}
              closeFn={() => { this.closePolicyModal(); }}
              showCloseX
            >
              <div className="wordWrap" dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CART_DEVICE_UNLOCK_POLICY_DESC_TEXT }} />
              <button
                className="primary bold button pad5 onlyLeftPad width30 floatLeft"
                analyticstrack="gotit-deviceunlock-policy-CTA"
                onClick={() => { this.setState({ showPolicyModal: false }); }}
              >
                {cqContent.label.DT_OD_CART_DEVICE_UNLOCK_POLICY_BUTTON}
              </button>
            </Modal>
          }
        </div>
        <Modal
          mounted={this.state.showModal}
          style={{ background: 'white', width: '40%' }}
          closeFn={() => { this.setState({ showModal: false }); }}
          showCloseX
        >
          <section>
            <div className="height200 border_black borderSize_2 onlyBottomBorder margin15 onlyBottomMargin">
              <h2 className="fontSize_7 width70" dangerouslySetInnerHTML={{ __html: cqContent.label.OD_CART_INSTANT_CREDIT_MODAL_TITLE }} />
            </div>
            <div className="height200">
              <p className="fontSize_4 lineHeight18">
                {cqContent.label.OD_CART_INSTANT_CREDIT_REMOVE_TRADE_IN_DISCLAIMER}
              </p>
            </div>
            <Row>
              <Col xs={6}>
                <button
                  className="primary bold button pad10 onlyRightPad width100 floatLeft"
                  analyticstrack="goto-unlimitedPlan-CTA"
                  onClick={this.moveNext.bind(this)}
                >{cqContent.label.OD_CART_INSTANT_CREDIT_GOT_IT}
                </button>
              </Col>
              <Col xs={6}>
                <button
                  className="secondary bold button pad5 onlyLeftPad width100 floatRight"
                  analyticstrack="goto-currentPlan-CTA"
                  onClick={() => { this.setState({ showModal: false }); }}
                >{cqContent.label.OD_CART_INSTANT_CREDIT_GO_BACK}
                </button>
              </Col>
            </Row>
          </section>
        </Modal>
        <Row className="pad60 onlyBottomPad">
          {deviceInfo.sbdOffer && deviceInfo.sbdOffer.promoBadgeMessages && deviceInfo.sbdOffer.promoBadgeMessages.length > 0 && this.getPromoHeader()}
          <Col md={2} lg={2} className="textAlignLeft deviceIMG">
            <img
              className="maxWidth100"
              src={deviceInfo.deviceImageUrlLarge}
              alt={`${deviceInfo.deviceManufactureName} ${deviceInfo.deviceProductDisplayName} ${deviceInfo.capacity} in ${deviceInfo.colorName}`}
              itemProp="image"
            />
            {!deviceInfo.modDevice && <Row>
              <Col md={12} lg={9} >
                {deviceInfo.displayMtn !== null &&
                  <p className="fontSize_2 margin6 onlyTopMargin textAlignCenter">{deviceInfo.displayMtn}</p>
                }
              </Col>
            </Row>}
          </Col>
          <Col md={10} lg={10}>
            <Row>
              <Col xs={6}>
                <p
                  className="bold fontSize_7"
                  dangerouslySetInnerHTML={{ __html: `${deviceInfo.deviceManufactureName} ${deviceInfo.deviceProductDisplayName}` }}
                />
              </Col>
            </Row>


            {!deviceInfo.modDevice && <div className="margin6 onlyTopMargin">
              {deviceInfo.capacity && <span>{deviceInfo.capacity},&nbsp;</span>}
              {deviceInfo.colorName && <span>{deviceInfo.colorName}</span>}
            </div>}

            {deviceInfo.humCarDetails &&
              <p className="margin6 onlyTopMargin" >
                <span className="">{deviceInfo.humCarDetails.year}</span>
                <span className="pad3  onlyLeftPad">{deviceInfo.humCarDetails.make}</span>
                <span className="pad3  onlyLeftPad">{deviceInfo.humCarDetails.model}</span>
                <span className="pad3  onlyLeftPad">-</span>
                <span className="pad3  onlyLeftPad">{deviceInfo.humCarDetails.color}</span>
              </p>
            }


            {!deviceInfo.modDevice && !instantCreditEligible && deviceInfo.priceForFullRetailPriceListID > 0 &&
              <div>
                <span>{cqContent.label.DT_OD_CART_RETAIL_PRICE_TEXT}</span>
                {(parsePrice(deviceInfo.priceForFullRetailPriceListID) > parsePrice(deviceInfo.discountedEdgeRetailPrice)) && deviceInfo.sbdOffer && deviceInfo.sbdOffer.bicBogoType !== 'BICD' && deviceInfo.sbdOffer.bicBogoType !== 'BICT' ?
                  <span>
                    <span className="textDecLineThrough"> ${deviceInfo.priceForFullRetailPriceListID}</span>
                    <span className="bold">&nbsp;${deviceInfo.discountedEdgeRetailPrice} </span>
                  </span>
                  :
                  <span className="bold">${deviceInfo.priceForFullRetailPriceListID}</span>
                }
              </div>
            }
            {((deviceInfo.deviceType && deviceInfo.deviceType === 'SMARTPHONE') && (typeof deviceInfo.policyEnabled !== 'undefined' && deviceInfo.policyEnabled)) &&
              <Anchor
                className="textDecUnderline  fontSize_4"
                onClick={() => { this.openPolicyModal(); }}
              >{cqContent.label.DT_OD_CART_DEVICE_UNLOCK_POLICY_TEXT}
              </Anchor>
            }
            {(deviceInfo.poboAvailableDate && !ispuselectedAtPdp) &&
              <div className="margin12 onlyTopMargin">
                <span className="pad10 displayInlineBlock background_yellow">
                  {cqContent.label['DT_OD_CART_' + deviceInfo.inventoryStatus + '_' + deviceInfo.shipCommitInd + '_LABEL']}{deviceInfo.poboAvailableDate}
                </span>
              </div>
            }
            {
              deviceInfo.numberShareDevice === false && deviceInfo.totalNumberShareExtension > 0 && <p className="margin12 onlyTopMargin">{`${deviceInfo.totalNumberShareExtension} NumberShare Extension(s)`}</p>
            }

            {instantCreditEligible &&
              <section className="margin18 onlyTopMargin">
                <Row>
                  <Col md={7} lg={7}>
                    <div>
                      {deviceInfo.contractTerm === '24' ?
                        <p>
                          <span>{cqContent.label.DT_OD_CART_2YEAR_PRICE_TEXT}</span>
                          {parseFloat(deviceInfo.originalPrice) > parseFloat(deviceInfo.price) &&
                            <span className="textDecLineThrough">${deviceInfo.originalPrice}</span>
                          }
                          <span className="bold">&nbsp; ${deviceInfo.price}</span>
                        </p> :
                        <p>
                          <span>{cqContent.label.DT_OD_CART_RETAIL_PRICE_TEXT}</span>
                          <span className="bold">${deviceInfo.priceForFullRetailPriceListID}</span>
                        </p>
                      }
                    </div>
                    <p>
                      {deviceInfo.instantCreditAppliedInfo && <span>{deviceInfo.instantCreditAppliedInfo}</span>}
                      {deviceInfo.contractTerm === '99' &&
                        <Anchor
                          className="color_333 textDecUnderline fontSize_4"
                          onClick={() => { this.props.asyncFetch(); window.location = instantCreditPageURL; }}
                        >{cqContent.label.DT_OD_CART_EDIT_TEXT}
                        </Anchor>
                      }
                    </p>
                  </Col>
                </Row>
              </section>
            }
            {instantCreditEligible && promotionList && promotionList.length > 0 && promotionList.map((promo, idx) => (
              <Row>
                <Col md={8} lg={8} key={idx} className="margin3 onlyTopMargin">
                  <span className="myOfferBanner-tag fontSize_5 onlyRightMargin margin3" />
                  <span>{promo.promoMsg}: </span><span>-${promo.promoAmount}</span>
                </Col>
              </Row>
            ))}

            {!instantCreditEligible && deviceInfo.devicePromotionList && deviceInfo.devicePromotionList.length > 0 &&
              deviceInfo.devicePromotionList.map((offer, idx) => getDeviceOffer(offer, idx))}

            {deviceInfo.instantCreditAdjustedPrice && parsePrice(deviceInfo.instantCreditAdjustedPrice) > 0 &&
              <Row className="margin3 onlyTopMargin">
                <Col md={7} lg={7}>
                  <p>
                    <span>{cqContent.label.DT_OD_CART_ADJUSTED_PRICE}</span>
                    {(deviceInfo.contractTerm === '99' && parsePrice(deviceInfo.instantCreditAdjustedPrice) > 0) && <span className="bold">${deviceInfo.instantCreditAdjustedPrice}</span>}
                  </p>
                </Col>
                {((deviceInfo.contractTerm === '0' || deviceInfo.contractTerm === '24') && parsePrice(deviceInfo.instantCreditAdjustedPrice) > 0) && <Col md={5} lg={5}>
                  <Row>
                    <Col md={6} lg={6}>
                      <div className="textAlignRight bold">
                        <span>--</span>
                      </div>
                    </Col>
                    <Col md={6} lg={6}>
                      <div className="textAlignRight bold pad30 onlyRightPad">
                        <span>${deviceInfo.instantCreditAdjustedPrice}</span>
                      </div>
                    </Col>
                  </Row>
                </Col>}
              </Row>
            }

            <div className="margin18 onlyTopMargin">
              {(parsePrice(deviceInfo.price) > -1 && (deviceInfo.contractTerm === '0' || deviceInfo.contractTerm === '24')) ?
                <div>
                  {!instantCreditEligible && <Row>
                    <Col md={7} lg={7}>
                      <p className="bold">{deviceInfo.priceText}</p>
                      <p>{deviceInfo.priceSubTitle}</p>
                    </Col>
                    <Col md={5} lg={5}>
                      <Row>
                        <Col md={6} lg={6}>
                          <div className="textAlignRight bold">
                            {deviceInfo.modDevice ?
                              `$${deviceInfo.dueMonthlyPrice}`
                              : <span>--</span> }
                          </div>
                          {deviceInfo.dueMonthlyTotalDuration && <p className="textAlignRight fontSize_1">{deviceInfo.dueMonthlyTotalDuration}</p>}
                        </Col>
                        <Col md={6} lg={6}>
                          <div className="textAlignRight bold pad30 onlyRightPad">
                            <span>${deviceInfo.price}</span>
                            {parsePrice(deviceInfo.originalPrice) > parsePrice(deviceInfo.price) &&
                              <div className="textAlignRight">
                                <span className="textDecLineThrough">${deviceInfo.originalPrice}</span>
                              </div>}
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>}
                </div>
                :
                <Row>
                  <Col md={7} lg={7}>
                    <p className="bold">{deviceInfo.priceText}</p>
                    <p dangerouslySetInnerHTML={{ __html: deviceInfo.priceSubTitle }} />
                  </Col>
                  <Col md={5} lg={5}>
                    <Row>
                      <Col md={6} lg={6}>
                        <div className="textAlignRight">
                          {deviceInfo.sbdOffer && !deviceInfo.sbdOffer.ignorePricing && getSbdOfferPrice()}
                          {deviceInfo.sbdOffer && deviceInfo.sbdOffer.ignorePricing && getMonthlyPrice()}
                          {!deviceInfo.sbdOffer && deviceInfo.hasReducedDueMonthly && getReducedDueMonthly()}
                          {!deviceInfo.sbdOffer && !deviceInfo.hasReducedDueMonthly && deviceInfo.bicOfferApplied && getBICPrice()}
                          {!deviceInfo.sbdOffer && !deviceInfo.hasReducedDueMonthly && !deviceInfo.bicOfferApplied && getMonthlyPrice()}
                        </div>
                        {deviceInfo.dueMonthlyTotalDuration && <p className="textAlignRight fontSize_1">{deviceInfo.dueMonthlyTotalDuration}</p>}
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="textAlignRight bold pad30 onlyRightPad"><span>--</span></div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }

              {/* trade in promo changes */}
              {deviceInfo.promoDetails &&
                <Row className="margin12 onlyTopMargin">
                  <Col md={7} lg={7} className="color_blue bold">
                    <span>
                      {deviceInfo.promoDetails.promoMessage && deviceInfo.promoDetails.promoMessage}
                    </span>
                    {deviceInfo.promoDetails.promoTooltipMessage &&
                      <ToolTip
                        id="upgradeFee-tooltip"
                        className="margin3 onlyLeftMargin displayInlineBlock color_blue"
                        ariaLabel="Upgrade fee information tooltip"
                        text={deviceInfo.promoDetails.promoTooltipMessage}
                      />
                    }
                  </Col>
                  <Col md={5} lg={5}>
                    <Row>
                      <Col md={6} lg={6}>
                        <div className="textAlignRight bold">{deviceInfo.promoDetails.tradeInAmount && `-$${deviceInfo.promoDetails.tradeInAmount}`}</div>
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="textAlignRight bold pad30 onlyRightPad">{deviceInfo.promoDetails.tradeInAmount && '--'}</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }

              {deviceInfo.sbdOffer && deviceInfo.sbdOffer.promoBadgeMessages && deviceInfo.sbdOffer.promoBadgeMessages.length > 0 ?
                this.getLinePromo()
                :
                <Row>
                  <Col md={7} className="margin18 onlyTopMargin" />
                  <Col md={5} className="margin18 onlyTopMargin">
                    {deviceInfo.sbdOffer && parseFloat(deviceInfo.sbdOffer.sbdNegativeAmt) > 0 &&
                      <Row>
                        <Col md={6}>
                          <div className="textAlignRight bold">
                            <span>-${deviceInfo.sbdOffer.sbdNegativeAmt}</span>
                          </div>
                        </Col>
                      </Row>
                    }
                  </Col>
                </Row>
              }


              {parsePrice(deviceInfo.edgeItemDownPaymentAmount) > 0 &&
                <Row className="margin12 onlyTopMargin">
                  <Col md={7} lg={7}>{cqContent.label.DT_OD_CART_DUE_TODAY_DOWN_PAYMENT}</Col>
                  <Col md={5} lg={5}>
                    <Row>
                      <Col md={6} lg={6}>
                        <div className="textAlignRight bold">--</div>
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="textAlignRight bold pad30 onlyRightPad">${deviceInfo.edgeItemDownPaymentAmount}</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }

              {deviceInfo.deviceEdgeBuyOutAmount > 0 &&
                <Row className="margin12 onlyTopMargin">
                  <Col md={7} lg={7}>{cqContent.label.DT_OD_CART_REMAINING_BALANCE_TEXT}</Col>
                  <Col md={5} lg={5}>
                    <Row>
                      <Col md={6} lg={6}>
                        <div className="textAlignRight bold">--</div>
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="textAlignRight bold pad30 onlyRightPad">${deviceInfo.deviceEdgeBuyOutAmount}</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }
              {deviceInfo.deviceEdgeUpAmount > 0 &&
                <Row className="margin12 onlyTopMargin">
                  <Col md={7} lg={7}>{cqContent.label.DT_OD_CART_DUE_TODAY_EARLY_UPGRADE_BALANCE}</Col>
                  <Col md={5} lg={5}>
                    <Row>
                      <Col md={6} lg={6}>
                        <div className="textAlignRight bold">--</div>
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="textAlignRight bold pad30 onlyRightPad">${deviceInfo.deviceEdgeUpAmount}</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }
              {deviceInfo.numberShareDevice &&
                <Row className="margin12 onlyTopMargin">
                  <Col md={7} lg={7}>
                    <p className="pad12 onlyRightPad">
                      <span className="bold block">{cqContent.label.DT_OD_CART_SHARING_TEXT}</span>
                      <span>{deviceInfo.numberSharedMtn}</span>
                      {(deviceInfo.deviceNickName !== null && deviceInfo.numberSharedMtn !== null) && ', '}
                      <span dangerouslySetInnerHTML={{ __html: deviceInfo.deviceNickName }} />
                    </p>
                  </Col>
                </Row>
              }
              <div className="margin12 onlyTopMargin">
                <DeviceEditRemovePrompt
                  cqContent={cqContent}
                  asyncFetch={this.props.asyncFetch}
                  showEdit={deviceInfo.flow !== 'NSO'}
                  modDevice={deviceInfo.modDevice}
                  isSingleModConnectedDevice={this.props.isSingleModConnectedDevice}
                  isModConnected={deviceInfo.isModConnected}
                  onEdit={() => {
                    this.editItem(deviceInfo.editDeviceUrl);
                  }}
                  deviceInfo={deviceInfo}
                  onRemove={() => { this.removeItem(); }}
                  promptMsg={`Are you sure you want to remove ${deviceInfo.deviceManufactureName} ${deviceInfo.deviceProductDisplayName} ${deviceInfo.capacity || ''} ${deviceInfo.colorName ? `in ${deviceInfo.colorName}` : ''} and all of its features from your cart?`}
                />
              </div>

              {deviceInfo.e911AddressMissing && <div className="margin12 onlyTopMargin">
                <Anchor
                  className="color_333 fontSize_4 textDecUnderline"
                  href={deviceInfo.e911AddressUpdateUrl}
                  analyticstrack="update-e911Address-from-cart"
                >
                  {cqContent.label.DT_OD_UPDATE_E911_TEXT}
                </Anchor>
              </div>}

              {deviceInfo.additionalFeatures && deviceInfo.additionalFeatures.length > 0 && <div className="margin18 onlyTopMargin">
                <p className="bold">Features</p>
                {deviceInfo.additionalFeatures.map((feature, index) => (
                  <Row key={'feature-' + index} className={`${index !== deviceInfo.additionalFeatures.length - 1 ? 'margin6 onlyBottomMargin' : ''}`}>
                    <Col md={7} lg={7}>
                      <span>{feature.name}</span>
                    </Col>
                    <Col md={5} lg={5}>
                      <Row>
                        <Col md={6} lg={6}>
                          <div className="textAlignRight bold"><span>${feature.price}</span></div>
                        </Col>
                        <Col md={6} lg={6}>
                          <div className="textAlignRight bold pad30 onlyRightPad"><span>--</span></div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </div>}

              {deviceInfo.devicePromotionList && deviceInfo.devicePromotionList.map((offer, id) => (
                (offer.promoAmount !== null && parseFloat(offer.promoAmount) > 0 && offer.isUpgradeFeeWaivedOffer) &&
                <Row className="margin12 onlyTopMargin" key={id}>
                  <Col md={7} lg={7}>
                    <span>{cqContent.label.DT_OD_CART_WAIVED_UPGRADE_FEE_TEXT}</span>
                  </Col>
                  <Col md={5} lg={5}>
                    <Row>
                      <Col md={6} lg={6}>
                        <div className="textAlignRight bold"><span>--</span></div>
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="pad30 onlyRightPad">
                          <div className="textAlignRight bold"><span>${deviceInfo.upgradeFee}</span></div>
                          <div className="textAlignRight textDecLineThrough"><span>${deviceInfo.originalUpgradeFee}</span></div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))}

              {!isUpgradeFeeWaivedOffer && deviceInfo.flow === 'EUP' &&
                <Row className="margin12 onlyTopMargin">
                  <Col md={7} lg={7}>
                    <span>{cqContent.label.DT_OD_CART_UPGRADE_FEE_TEXT}(${deviceInfo.upgradeFee})</span>
                    <ToolTip
                      id="upgradeFee-tooltip"
                      className="margin3 onlyLeftMargin displayInlineBlock"
                      ariaLabel="Upgrade fee information tooltip"
                      text={cqContent.label.DT_OD_CART_ONE_TIME_UPGRADE_FEE_TOOLTIP_TEXT}
                      noRenderHTML
                    />
                  </Col>
                  <Col md={5} lg={5}>
                    <Row>
                      <Col md={6} lg={6}>
                        <div className="textAlignRight bold"><span>--</span></div>
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="textAlignRight bold pad30 onlyRightPad"><span>${deviceInfo.upgradeFee}</span></div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }

              {/* Existing TAP users who took additional coverage */}
              {!deviceInfo.modDevice && tmpMd && deviceInfo.protectionOption && deviceInfo.protectionOption.featureType === 'SPO' && !deviceInfo.protectionInEligible &&
                <div className="margin18 onlyTopMargin">
                  <Row>
                    <Col md={7} lg={7}>
                      <span className="bold">{cqContent.label.DT_OD_CART_EQUIPMENT_PROTECTION_TEXT}</span>
                      <form
                        name="protectionOptionForm"
                        id="protectionOptionForm"
                        method="POST"
                        action={protectionURL + '?ts=' + Date.now() + '&deviceProdId=' + deviceInfo.deviceProdId + '&deviceSkuId=' + deviceInfo.deviceSkuId + additionalParam}
                      >
                        <div>
                          <div className="margin5 onlyTopMargin">
                            {tmpMd.name}
                            <span className="pad5 onlyLeftPad relative">
                              {(!tmpMd.hideEditProtection &&
                                <input
                                  className="background_transparent noPad borderSize_0 textDecUnderline fontSize_4"
                                  type="submit"
                                  value="Edit"
                                  analyticstrack="edit-protection-link"
                                />
                              )}
                            </span>
                          </div>
                        </div>
                        <input type="hidden" name="sfoskuId" value={tmpMd.featureSkuId} />
                        <input type="hidden" name="deviceSkuId" value={deviceInfo.deviceSkuId} />
                        <input type="hidden" name="mtn" value={deviceInfo.mtn} />
                        <input type="hidden" name="upgradeDeviceMTN" value={deviceInfo.mtn} />
                        {deviceInfo.flow === 'AAL' ?
                          <input type="hidden" name="deviceSORId" value={deviceInfo.deviceSORId} />
                          :
                          <input type="hidden" name="upgradeDeviceSORId" value={deviceInfo.deviceSORId} />
                        }
                        <input type="hidden" name="editFlag" value="true" />
                        <input type="hidden" name="commerceItemId" value={deviceInfo.commerceItemId} />
                        <input type="hidden" name="flow" value={deviceInfo.flow} />
                      </form>
                    </Col>
                    <Col md={5} lg={5}>
                      <Row>
                        <Col md={6} lg={6}>
                          <div className="textAlignRight bold">
                            {!tmpMd.hideEditProtection && this.props.tapExistIndex === 1 ?
                              <span>${tmpMd.price}</span>
                              :
                              <span>--</span>
                            }
                          </div>
                        </Col>
                        <Col md={6} lg={6}>
                          <div className="textAlignRight bold pad30 onlyRightPad"><span>--</span></div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              }
              {!deviceInfo.modDevice && deviceInfo.protectionOption && deviceInfo.protectionOption !== null && ((deviceInfo.protectionOption && deviceInfo.protectionOption.featureType === 'INS') || !tmpMd) && !deviceInfo.protectionInEligible &&
                <div>
                  <div className="margin18 onlyTopMargin">
                    <Row>
                      <Col md={7} lg={7}>
                        <div className="verticalAlignMiddle">
                          <span className="bold">{cqContent.label.DT_OD_CART_EQUIPMENT_PROTECTION_TEXT}</span>
                          <form
                            className="margin12 onlyLeftMargin displayInlineBlock verticalBottom"
                            name="protectionOptionForm"
                            id={'protectionOptionForm' + deviceInfo.deviceProdId}
                            method="POST"
                            action={protectionURL + '?ts=' + Date.now() +
                              '&deviceProdId=' + deviceInfo.deviceProdId +
                              '&deviceSkuId=' + deviceInfo.deviceSkuId + additionalParam}
                          >
                            <div className="floatLeft col span_4_of_5">
                              {(deviceInfo.protectionOption.featureType !== 'SPO') &&
                                <span className="pad5 onlyLeftPad relative">
                                  <input
                                    className="background_transparent noPad borderSize_0 textDecUnderline fontSize_4"
                                    type="submit"
                                    value="Edit"
                                    analyticstrack="edit-protection-link"
                                  />
                                </span>
                              }
                            </div>

                            <input
                              type="hidden"
                              name="sfoskuId"
                              value={deviceInfo.protectionOption.sfoskuId}
                            />
                            <input
                              type="hidden"
                              name="deviceSkuId"
                              value={deviceInfo.deviceSkuId}
                            />
                            <input type="hidden" name="mtn" value={deviceInfo.mtn} />
                            <input
                              type="hidden"
                              name="upgradeDeviceMTN"
                              value={deviceInfo.mtn}
                            />
                            {deviceInfo.flow === 'AAL' ?
                              <input
                                type="hidden"
                                name="deviceSORId"
                                value={deviceInfo.deviceSORId}
                              />
                              : <input
                                type="hidden"
                                name="upgradeDeviceSORId"
                                value={deviceInfo.deviceSORId}
                              />
                            }
                            <input type="hidden" name="editFlag" value="true" />
                            <input
                              type="hidden"
                              name="commerceItemId"
                              value={deviceInfo.commerceItemId}
                            />
                            <input
                              type="hidden"
                              name="flow"
                              value={deviceInfo.flow}
                            />
                          </form>
                        </div>
                        <p>{deviceInfo.protectionOption.name}</p>
                        {deviceInfo.protectionOption.displayMsg !== null &&
                          <p className="margin6 onlyTopMargin" dangerouslySetInnerHTML={{ __html: deviceInfo.protectionOption.displayMsg }} />
                        }
                        {/* <Anchor
                        className="color_333 block textDecUnderline margin6 onlyTopMargin fontSize_4"
                        onClick={() => { this.toggleTermsModal(); }}
                      >{cqContent.label.DT_OD_CART_TERMS_AND_CONDITIONS_CTA_TEXT}
                      </Anchor> */}
                      </Col>
                      <Col md={5} lg={5}>
                        <Row>
                          <Col md={6} lg={6}>
                            <div className="textAlignRight bold">
                              <span>
                                {(deviceInfo.protectionOption.featureType === 'SPO' && deviceInfo.protectionOption.hideEditProtection) ?
                                  '--'
                                  :
                                  '$' + deviceInfo.protectionOption.price
                                }
                              </span>
                            </div>
                          </Col>
                          <Col md={6} lg={6}>
                            <div className="textAlignRight bold pad30 onlyRightPad"><span>--</span></div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </div>
              }
            </div>

            {(!deviceInfo.modDevice && deviceInfo.protectionOption === null && !deviceInfo.protectionInEligible && <div>
              <div className="margin18 onlyTopMargin">
                <Row>
                  <Col md={7} lg={7}>
                    <div className="verticalAlignMiddle">
                      <span className="bold">{cqContent.label.DT_OD_CART_EQUIPMENT_PROTECTION_TEXT}</span>
                      <form
                        className="margin12 onlyLeftMargin displayInlineBlock verticalBottom"
                        name="protectionOptionForm"
                        id={'protectionOptionForm' + deviceInfo.deviceProdId}
                        method="POST"
                        action={protectionURL + '?ts=' + Date.now() +
                          '&deviceProdId=' + deviceInfo.deviceProdId +
                          '&deviceSkuId=' + deviceInfo.deviceSkuId + additionalParam}
                      >

                        <div className="floatLeft col span_4_of_5">
                          {
                            (deviceInfo.protectionOption == null) &&
                            <span className="pad5 onlyLeftPad relative">
                              <input
                                className="background_transparent noPad borderSize_0 textDecUnderline fontSize_4"
                                type="submit"
                                value="Add"
                                analyticstrack="add-protection-link"
                              />
                            </span>
                          }
                        </div>


                        <input
                          type="hidden"
                          name="deviceSkuId"
                          value={deviceInfo.deviceSkuId}
                        />
                        <input type="hidden" name="mtn" value={deviceInfo.mtn} />
                        <input
                          type="hidden"
                          name="upgradeDeviceMTN"
                          value={deviceInfo.mtn}
                        />
                        {deviceInfo.flow === 'AAL' ?
                          <input
                            type="hidden"
                            name="deviceSORId"
                            value={deviceInfo.deviceSORId}
                          />
                          : <input
                            type="hidden"
                            name="upgradeDeviceSORId"
                            value={deviceInfo.deviceSORId}
                          />
                        }
                        <input type="hidden" name="addFlag" value="true" />
                        <input
                          type="hidden"
                          name="commerceItemId"
                          value={deviceInfo.commerceItemId}
                        />
                        <input
                          type="hidden"
                          name="flow"
                          value={deviceInfo.flow}
                        />
                      </form>
                    </div>

                    {(deviceInfo.protectionOption == null && deviceInfo.flow !== 'NSO') &&
                      <p className="margin6 onlyTopMargin">Insurance Not Selected</p>
                    }

                  </Col>

                </Row>
              </div>
            </div>)
            }

            {!cpcSucessful && deviceInfo.lacPrice && parsePrice(deviceInfo.lacPrice) > 0 &&
              <div className="margin18 onlyTopMargin ">
                <Row>
                  <Col md={7} lg={7}>
                    <div>
                      <span className="bold">
                        {deviceInfo.numberShareDevice ? deviceInfo.lacText : cqContent.label.DT_OD_CART_PLAN_ACCESS_TEXT}
                      </span>
                      {deviceInfo.promoLACMessage && <p dangerouslySetInnerHTML={{ __html: deviceInfo.promoLACMessage }} />}
                    </div>
                  </Col>
                  <Col md={5} lg={5}>
                    <Row>
                      <Col md={6} lg={6}>
                        <div className="textAlignRight bold">
                          <span>${deviceInfo.lacPrice}</span>
                        </div>
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="textAlignRight bold pad30 onlyRightPad"><span>--</span></div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            }

            {deviceInfo.flow === 'NSO' && deviceInfo.simDetails !== null &&
              <div className="margin18 onlyTopMargin ">
                <Row>
                  <Col md={7} lg={7}>
                    <div>
                      <p className="bold">{cqContent.label.DT_OD_SIM_CART_TEXT}</p>
                      <p>{deviceInfo.simDetails.displayName}</p>
                    </div>
                  </Col>
                  <Col md={5} lg={5}>
                    <Row>
                      <Col md={6} lg={6}>
                        <div className="textAlignRight bold">
                          <span>--</span>
                        </div>
                      </Col>
                      <Col md={6} lg={6}>
                        <div className="textAlignRight bold pad30 onlyRightPad">
                          <span>FREE</span>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {!deviceInfo.protectionOption && deviceInfo.protectionInEligible &&
                  <div className="margin18 onlyTopMargin">
                    <Row>
                      <Col md={7} lg={7}>
                        <div>{cqContent.label.DT_OD_CART_PROTECTION_INELIGIBLE_NOTE}</div>
                        <div className="bold">{cqContent.label.DT_OD_CART_PROTECTION_INELIGIBLE_MESSAGE}</div>
                      </Col>
                    </Row>
                  </div>
                }
              </div>
            }

            {deviceInfo.flow === 'NSO' && deviceInfo.displayImeiId !== null &&
              <div className="margin18 onlyTopMargin">
                <Row>
                  <Col md={7} lg={7}>
                    <span>{`${cqContent.label.DT_OD_DEVICE_ID_ENDING_TEXT} ${deviceInfo.displayImeiId}`}</span>
                  </Col>
                </Row>
              </div>
            }


            {!deviceInfo.modDevice && (deviceInfo.flow === 'AAL' || deviceInfo.flow === 'NSO') && deviceInfo.activationFee > 0 &&
              <div className="margin18 onlyTopMargin">
                <p className="bold">{cqContent.label.DT_OD_CART_OTHER_TEXT}</p>
                {(deviceInfo.flow === 'AAL' || deviceInfo.flow === 'NSO') && parsePrice(deviceInfo.activationFee) > 0 && <div className="block"><span>{cqContent.label.DT_OD_CART_ONE_TIME_ACT_FEE_TEXT} (${deviceInfo.activationFee})</span><ToolTip
                  id="activationFee-tooltip"
                  className="margin3 onlyLeftMargin displayInlineBlock"
                  ariaLabel="Activation Fee information tooltip"
                  text={cqContent.label.DT_OD_CART_ONE_TIME_ACT_FEE_TOOLTIP_TEXT}
                  noRenderHTML
                /></div>}
              </div>
            }
            {!deviceInfo.modDevice && (deviceInfo.flow === 'AAL' || deviceInfo.flow === 'NSO') && deviceInfo.activationFeeWaived &&
              <div className="margin18 onlyTopMargin">
                <p className="bold">{cqContent.label.DT_OD_CART_OTHER_TEXT}</p>
                <div className="block"><span>{cqContent.label.DT_OD_CART_WAIVED_ACTIVATION_FEE_TEXT} (${deviceInfo.originalActivationFee})</span><ToolTip
                  id="activationFee-tooltip"
                  className="margin3 onlyLeftMargin displayInlineBlock"
                  ariaLabel="Activation Fee information tooltip"
                  text={'$' + deviceInfo.originalActivationFee + cqContent.label.DT_OD_CART_WAIVED_ACT_FEE_TOOLTIP_TEXT}
                  noRenderHTML
                /></div>
              </div>
            }
          </Col>
        </Row>
        {isHLLDevices && deviceInfo.planChanged && isPlansExists &&
          <Row>
            <Col xs={12} className="border_e6 onlyTopBorder margin24 onlyTopMargin pad30 noSidePad borderSize_2">
              {planInfo !== null && <PlanInfoLL
                plans={planInfoItem}
                cqContent={cqContent}
                itemOnJaxPlan={itemOnJaxPlan}
                isHLLDevices={isHLLDevices}
                deviceInfo={deviceInfo}
                lineLevelPlan={false}
                asyncFetch={this.props.asyncFetch}
              />}
            </Col>
          </Row>
        }
      </div>
    );
  }
}

Devices.propTypes = {
  cqContent: PropTypes.object,
  deviceInfo: PropTypes.object,
  protectionURL: PropTypes.string,
  cpcSucessful: PropTypes.bool,
  totalDevices: PropTypes.number,
  accessories: PropTypes.array,
  clearCart: PropTypes.func,
  removeDevice: PropTypes.func,
  tmpMd: PropTypes.object,
  // index: PropTypes.number,
  isHLLDevices: PropTypes.bool,
  planInfo: PropTypes.object,
  itemOnJaxPlan: PropTypes.bool,
  tapExistIndex: PropTypes.number,
  authenticated: PropTypes.bool,
  instantCreditEligible: PropTypes.bool,
  instantCreditPageURL: PropTypes.bool,
  promotionList: PropTypes.array,
  // totalDeviceCount: PropTypes.number,
  // totalTradeinDeviceCount: PropTypes.number,
  showHeadsUpMsg: PropTypes.bool,
  asyncFetch: PropTypes.func,
  ispuselectedAtPdp: PropTypes.bool,
  isSingleModConnectedDevice: PropTypes.bool,
};
export default Devices;
