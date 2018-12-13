import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import ToolTip from './../../../common/ToolTip';
import SelectListItem from './selectListItem';
import { normalizePhoneNumber } from './../../../common/validation';
import ListHeader from './listHeader';
import ListWrapper from './listWrapper';
import AsyncComponent from './../../../common/AsyncComponent';

const getPlanName = (plan) => {
  // TODO: Should have plan capacity coming from backend post 4/24, need to revisit the code and make the changes
  let planCapacity = plan ? plan.match(/\d/g) : false;
  if (planCapacity) {
    planCapacity = planCapacity.join('');
    return (
      <div>
        <div className="bold fontSize_13 color_000">{planCapacity}</div>
        <div className="fontSize_13 color_000">{this.props.cqContent.label.DT_OD_GB_TEXT}</div>
      </div>
    );
  }
  return null;
};

const PlanListLineLevel = AsyncComponent(() => import('./planListLineLevel'));

class DeviceListWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggler: [],
    };
  }

  promotionDiscount = (device) => (
    device.devicePromotionList && device.devicePromotionList.map((offer, offerIndex) => (
      (offer.promoAmount !== null && parseFloat(offer.promoAmount) > 0 && !offer.isUpgradeFeeWaivedOffer) && !device.bicOfferApplied &&
      <p key={`offer-IC-${offerIndex}`}>{this.props.cqContent.label.DT_OD_CONFIRMATION_OFFER_DISCOUNT_TEXT} : <span className="bold">-${offer.promoAmount}</span></p>
    ))
  );

  render() {
    const {
      cqContent,
      devices,
      plans,
      deviceConfigInfo,
      isHLLPlanInOrder,
      itemOnJaxPlan,
      enlargeImage,
      onDeviceListFeatureData,
      bicRepresentationChangeEnabled,
    } = this.props;
    const deviceConfigInfoDevices = deviceConfigInfo && deviceConfigInfo.devices;
    const plansExist = (plans && (plans.items && plans.items.length > 0));
    return (
      <section className="devices_list color_black">
        {
          devices && devices.items && devices.items.map((deviceDetails, id) => {
            const instantCreditDevice = !!deviceDetails.optionalDownpaymentInstantCredit || !!deviceDetails.fullRetailInstantCreditAmount || !!deviceDetails.twoYearInstantCreditAmount;
            const deviceTitle = !deviceDetails.modDevice ? (deviceDetails.nickName || `Line ${id + 1}`) : '';
            const eleObj = {};
            eleObj.featureTypeText = 'Show';
            eleObj.featureTypeCSS = 'hide';
            eleObj.displayFeatureType = false;
            eleObj.eleId = id;
            this.state.toggler.push(eleObj);
            const planInfoItem = {};
            let planCPCDone = false;
            if (isHLLPlanInOrder) {
              planInfoItem.items = plans.items.filter((plan) => deviceDetails.planCommerceItemId === plan.planCommerceItemId);
              planCPCDone = planInfoItem.items && planInfoItem.items.length > 0 && planInfoItem.items[0].cpcDone;
            }
            return (<ListWrapper key={'deviceItem-' + id} className="devices_list_item">
              <ListHeader
                title={isHLLPlanInOrder ? deviceTitle : `Device ${id + 1}`}
                cqContent={cqContent}
              >
                <Row key={`deviceDetails-${id}`} className="devices_list_item_device_details">
                  <Col xs={3} className="textAlignLeft">
                    {deviceDetails.deviceImageUrl &&
                      <img className="maxWidth100" src={enlargeImage(deviceDetails.deviceImageUrl)} alt={deviceDetails.deviceName} />
                    }
                  </Col>

                  <Col xs={9} >
                    <div>
                      <Row>
                        <Col xs className="deviceDescription">
                          <div className="deviceData pad12 onlyBottomPad">
                            <p className="bold infofeature" dangerouslySetInnerHTML={{ __html: `${deviceDetails.manufactureName} ${deviceDetails.deviceName}` }} />
                            {deviceDetails.color && !deviceDetails.modDevice &&
                              <div className="color_black pad5 noSidePad">
                                <span>{deviceDetails.size}</span>
                                {(deviceDetails.size && deviceDetails.color) ? <span className="color-box displayInlineBlock gridBorder">,</span> : ''}
                                <span> {deviceDetails.color}</span>
                              </div>
                            }
                          </div>
                        </Col>
                      </Row>
                      {((deviceConfigInfoDevices && deviceConfigInfoDevices[id] && !deviceConfigInfoDevices[id].modDevice) && (deviceConfigInfoDevices[id].npaNxxnumber || deviceConfigInfoDevices[id].mtnNumber)) &&
                        <Row>
                          <Col xs className="deviceDescription">
                            <div className="npaNxxnumber pad12 noSidePad color_black ">
                              {(deviceConfigInfoDevices && deviceConfigInfoDevices[id] && ((deviceConfigInfoDevices[id].flow === 'AAL' || deviceConfigInfoDevices[id].flow === 'NSO') && deviceConfigInfoDevices[id].npaNxxnumber)) && !deviceConfigInfoDevices[id].numberShareDevice &&
                                <p>{deviceConfigInfoDevices[id].npaNxxnumber}</p>
                              }
                              {(deviceConfigInfoDevices && (deviceConfigInfoDevices[id].flow === 'EUP' && deviceConfigInfoDevices[id].mtnNumber)) &&
                                <p>{normalizePhoneNumber(deviceConfigInfoDevices[id].mtnNumber)}</p>
                              }
                            </div>
                          </Col>
                        </Row>
                      }
                      {((deviceConfigInfoDevices && deviceConfigInfoDevices[id]) && deviceConfigInfoDevices[id].numberShareDevice) &&
                        <Row>
                          <Col xs className="deviceDescription">
                            <div className="numberShareData pad12 noSidePad fontSize_3">
                              <div className="color_black">
                                <p className="pad12 onlyRightPad">
                                  <span className="bold block">{cqContent.label.DT_OD_CONFIRMATION_SHARING_TEXT}</span>
                                  {deviceConfigInfoDevices[id].numberSharedMtn ?
                                    <span>{deviceConfigInfoDevices[id].numberSharedMtn}</span>
                                    :
                                    <span dangerouslySetInnerHTML={{ __html: deviceConfigInfoDevices[id].numberSharedDeviceName }} />
                                  }
                                </p>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      }
                      {deviceDetails.displayImeiId &&
                        <Row>
                          <Col xs className="deviceDescription">
                            <div className="deviceIdData pad12 noSidePad fontSize_3">
                              <div className="color_black">
                                <p className="pad12 onlyRightPad">
                                  <span className="bold">{cqContent.label.DT_OD_CONFIRMATION_DEVICEID_TEXT}</span>
                                  &nbsp;<span>{deviceDetails.displayImeiId}</span>
                                </p>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      }

                      <div className="paymentData pad12 noSidePad fontSize_3">
                        <Row>
                          <Col xs className="deviceDescription">
                            {deviceDetails.contractTerm === '99' &&
                              <div>
                                <p className="bold color_black">{cqContent.label.DT_OD_CONFIRMATION_MONTHLY_DEVICE_PAY}</p>
                                {deviceDetails.optionalDownpaymentInstantCredit &&
                                  <div className="pad12 noSidePad margin-24 onlyRightMargin">
                                    <p>{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_DOWNPAYMENT_RETAIL_PRICE}<span className="bold">${deviceDetails.edgeRetailPrice}</span></p>
                                    <p>{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_DOWNPAYMENT_APPLIED}<span className="bold">-{deviceDetails.optionalDownpaymentInstantCredit}</span></p>
                                    {this.promotionDiscount(deviceDetails)}
                                    <p>{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_DOWNPAYMENT_ADJUSTED_RETAIL_PRICE}<span className="bold">${deviceDetails.installmentBalance}</span></p>
                                  </div>
                                }
                                <p className="color_black fontSize_3">{bicRepresentationChangeEnabled ? deviceDetails.dppContractDetails : cqContent.label.DT_OD_CONFIRMATION_INSTALLMENT_TEXT}</p>

                                {(!bicRepresentationChangeEnabled) &&
                                  <div className="color_black">
                                    <span dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_RETAIL_PRICE }} />
                                    {deviceDetails.promoApplied ?
                                      <span>
                                        <span className="textDecLineThrough">${deviceDetails.edgeRetailPrice}</span>
                                        <span>&nbsp;${deviceDetails.installmentBalance}</span>
                                      </span>
                                      :
                                      (<span className="pad5 onlySidePad">${deviceDetails.edgeRetailPrice}</span>)
                                    }
                                  </div>
                                }
                              </div>
                            }

                            {deviceDetails.contractTerm === '0' &&
                              <div>
                                <p className="bold color_black">{deviceDetails.modDevice ? cqContent.label.DT_OD_CONFIRMATION_SERVICE_TITLE_PAYMENT : cqContent.label.DT_OD_CONFIRMATION_DEVICE_RETAIL_PAYMENT}</p>
                                {deviceDetails.fullRetailInstantCreditAmount &&
                                  <div className="pad12 noSidePad margin-24 onlyRightMargin">
                                    <p>{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_RP_FRP}<span className="bold">${deviceDetails.fullRetailPrice}</span></p>
                                    <p>{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_RP_APPLIED}<span className="bold">-{deviceDetails.fullRetailInstantCreditAmount}</span></p>
                                    {this.promotionDiscount(deviceDetails)}
                                    <p>{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_RP_ADJUSTED}<span className="bold">${deviceDetails.dueToday}</span></p>
                                  </div>
                                }
                              </div>
                            }

                            {deviceDetails.contractTerm === '24' &&
                              <div>
                                <p className="bold color_black">{cqContent.label.DT_OD_CONFIRMATION_DEVICE_2YR_PAYMENT}</p>
                                {deviceDetails.twoYearInstantCreditAmount &&
                                  <div className="pad12 noSidePad margin-24 onlyRightMargin">
                                    <p>{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_2YR_PRICE}<span className="bold">${deviceDetails.twoYearPriceOrginal}</span></p>
                                    <p>{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_2YR_APPLIED}<span className="bold">-{deviceDetails.twoYearInstantCreditAmount}</span></p>
                                    {this.promotionDiscount(deviceDetails)}
                                    <p>{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_2YR_ADJUSTED}<span className="bold">${deviceDetails.twoYearPriceInstantCreditApplied}</span></p>
                                  </div>
                                }
                              </div>
                            }
                          </Col>
                          <Col xs className="devicePrices">
                            <Row>
                              <Col xs={6}>
                                {deviceDetails.dueMonthly &&
                                  <div className="color_black">
                                    <div className="bold fontSize_3">
                                      {deviceDetails.dueMonthlyDiscounted ?
                                        <div className="textAlignRight">
                                          <div className="textDecLineThrough">${deviceDetails.dueMonthlyOriginal}</div>
                                          <div>${deviceDetails.dueMonthly}</div>
                                        </div>
                                        :
                                        <div className="textAlignRight">${deviceDetails.dueMonthly}</div>
                                      }
                                    </div>
                                    {deviceDetails.modDevice && deviceDetails.dueMonthlyTotalDuration && <p className="textAlignRight fontSize_2">({deviceDetails.dueMonthlyTotalDuration})</p>}
                                  </div>
                                }
                              </Col>
                              <Col xs={6}>
                                {deviceDetails.dueToday &&
                                  <div className="color_black fontSize_3 bold">
                                    <div className="textAlignRight ">${deviceDetails.dueToday}</div>
                                  </div>
                                }
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        {deviceDetails.edgeItemDownPaymentAmount && parseFloat(deviceDetails.edgeItemDownPaymentAmount) > 0 &&
                          <Row className="pad12 noSidePad">
                            <Col xs className="deviceDescription">
                              <div>
                                <p className="bold color_black">{cqContent.label.DT_OD_CONFIRMATION_DOWN_PAYMENT}</p>
                              </div>
                            </Col>
                            <Col xs className="devicePrices">
                              <Row>
                                <Col xs={6}>
                                  <div className="color_black fontSize_3 bold">
                                    <div className="textAlignRight "><span className="nil" /></div>
                                  </div>
                                </Col>
                                <Col xs={6}>
                                  <div className="color_black fontSize_3 bold">
                                    <div className="textAlignRight ">${deviceDetails.edgeItemDownPaymentAmount}</div>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        }
                        {bicRepresentationChangeEnabled && deviceDetails.bicOfferApplied && deviceDetails.devicePromotionList && deviceDetails.devicePromotionList.map((promo, idx) => {
                          const promoBadgeMessage = promo.promoBadgeMessages && promo.promoBadgeMessages.length > 0 ? promo.promoBadgeMessages[0] : null;
                          return (
                            !promo.isUpgradeFeeWaivedOffer && !promo.sedOffer && (
                              <Row key={`bicOffer-${idx}`} className="pad12 noSidePad">
                                <Col xs className="deviceDescription" style={{ paddingRight: 0 }}>
                                  <div className="positionRelative">
                                    <span className="font-icon_tag bicPromoTag pad18 onlyRightPad color_blue" />
                                    <span className="bold fontSize_4 color_blue">
                                      {promoBadgeMessage ? promoBadgeMessage.badgeText : promo.promotionalMessage}
                                    </span>
                                    {(promo.promotionTooltip || (promoBadgeMessage && promoBadgeMessage.badgeToolTip)) &&
                                      <ToolTip
                                        className="margin3 onlyLeftMargin displayInlineBlock blue"
                                        ariaLabel="Promotional information tooltip"
                                        text={promoBadgeMessage ? promoBadgeMessage.badgeToolTip : promo.promotionTooltip}
                                      />
                                    }
                                  </div>
                                </Col>
                                {promo.dueMonthlyDiscount &&
                                  <Col xs className="devicePrices">
                                    <Row>
                                      <Col xs={6}>
                                        <div className=" color_black fontSize_3 bold textAlignRight">-${promo.dueMonthlyDiscount}</div>
                                      </Col>
                                    </Row>
                                  </Col>
                                }
                              </Row>
                            ));
                        })}
                        {deviceDetails.tradeinPromoDetails && deviceDetails.tradeinPromoDetails.promotionalMessage &&
                          <Row className="pad12 noSidePad">
                            <Col xs className="deviceDescription" style={{ paddingRight: 0 }}>
                              <div>
                                <span
                                  className="color_blue fontSize_4"
                                  dangerouslySetInnerHTML={{ __html: deviceDetails.tradeinPromoDetails.promotionalMessage }}
                                />
                                {deviceDetails.tradeinPromoDetails.promotionTooltip &&
                                  <ToolTip
                                    className="margin3 onlyLeftMargin displayInlineBlock blue"
                                    ariaLabel="Trade-in promotion tooltip"
                                    text={deviceDetails.tradeinPromoDetails.promotionTooltip}
                                  />
                                }
                              </div>
                            </Col>
                            {deviceDetails.tradeinPromoDetails.promoAmount && deviceDetails.tradeinPromoDetails.bicApplied &&
                              <Col xs className="devicePrices">
                                <Row>
                                  <Col xs={6}>
                                    <div className=" color_black fontSize_3 bold textAlignRight">-{deviceDetails.tradeinPromoDetails.promoAmount}</div>
                                  </Col>
                                </Row>
                              </Col>
                            }
                          </Row>
                        }
                        <Row>
                          <Col xs className="deviceDescription">
                            {deviceDetails.poboDateLabel && !this.props.ispuSelected &&
                              <p className="color_black fontSize_3 pad12 noSidePad">{deviceDetails.poboDateLabel}</p>
                            }
                          </Col>
                        </Row>

                      </div>

                      {!deviceDetails.modDevice && <div className="other pad12 noSidePad">
                        <p className="bold color_black">{cqContent.label.DT_OD_CONFIRMATION_DEVICE_OTHER_SECTION}</p>

                        {(deviceDetails.activationFee && parseFloat(deviceDetails.activationFee) > 0) &&
                          <Row>
                            <Col xs className="deviceDescription">
                              <div className="activationFee">
                                <span className="activationFe_contents color_black">{cqContent.label.DT_OD_CONFIRMATION_ACTIVATION_TEXT} ${deviceDetails.activationFee}</span>
                                <ToolTip
                                  className="margin3 onlyLeftMargin displayInlineBlock"
                                  header=""
                                  text={cqContent.label.DT_OD_CONFIRMATION_ACTIVATION_TOOLTIP}
                                />
                              </div>
                            </Col>
                          </Row>
                        }
                      </div>}
                      {deviceDetails.devicePromotionList && deviceDetails.devicePromotionList.map((offer, idx) => (
                        <Row>
                          <Col xs className="deviceDescription" key={`offer-${idx}`}>
                            {((offer.promoAmount !== null && parseFloat(offer.promoAmount) > 0) && offer.isUpgradeFeeWaivedOffer) ?
                              <div className="color_black">{cqContent.label.DT_OD_CONFIRMATION_WAIVED_UPGRADE_FEE_TEXT}:&nbsp;<span>${deviceDetails.upgradeFee}</span>&nbsp;<span className="textDecLineThrough">${deviceDetails.originalUpgradeFee}</span></div>
                              : <div>{!deviceDetails.bicOfferApplied && !instantCreditDevice && <p className="color_black">{`${cqContent.label.DT_OD_CONFIRMATION_OFFER_DISCOUNT_TEXT} : $${offer.promoAmount}`}</p>}</div>
                            }
                          </Col>
                        </Row>
                      ))
                      }

                      {(deviceDetails.upgradeFee && parseFloat(deviceDetails.upgradeFee) > 0) &&
                        <Row>
                          <Col xs className="deviceDescription">
                            <span className="activationFees color_black">{cqContent.label.DT_OD_CONFIRMATION_UPGRADE_FEE_TEXT} ${deviceDetails.upgradeFee}</span>
                            <ToolTip
                              className="margin3 onlyLeftMargin displayInlineBlock"
                              header=""
                              text={cqContent.label.DT_OD_CONFIRMATION_UPGRADE_FEE_TOOLTIP}
                            />
                          </Col>
                        </Row>
                      }

                      {!deviceDetails.modDevice && deviceDetails.protectionFeature && !deviceDetails.protectionIneligible &&
                        <Row>
                          <Col xs className="deviceDescription">
                            <div className="pad12 noSidePad">
                              <SelectListItem
                                className={this.state.toggler[id].displayFeatureType ? 'expanded' : ''}
                                title={this.state.toggler[id].featureTypeText ? this.state.toggler[id].featureTypeText + cqContent.label.DT_OD_CONFIRMATION_FEATURE_LIST : 'Show' + cqContent.label.DT_OD_CONFIRMATION_FEATURE_LIST}
                                onClickMethod={(evt) => (onDeviceListFeatureData(this, id, evt))}
                              />
                            </div>
                          </Col>
                        </Row>
                      }
                      {deviceDetails.protectionIneligible &&
                        <Row>
                          <Col xs className="deviceDescription">
                            <div className="pad12 noSidePad">{cqContent.label.DT_OD_CONFIRMATION_PROTECTION_INELIGIBLE_MESSAGE}</div>
                          </Col>
                        </Row>

                      }
                      {this.state.toggler[id].displayFeatureType && <Row>
                        <Col xs className="deviceDescription">
                          <div className={'features-content ' + (this.state.toggler[id].featureTypeCSS)}>
                            {!deviceDetails.modDevice && deviceDetails.protectionFeature &&
                              <div className="features-content-inner pad5 noSidePad">
                                {/* <h4 className="pad5 onlyTopPad bold">Equipment Protection</h4> */}
                                <div className="clearfix pad5 onlySidePad color_black">
                                  <div className="width70 floatLeft">{deviceDetails.protectionFeature.name}</div>
                                </div>
                              </div>
                            }

                            {deviceDetails.optionalFeatures && deviceDetails.optionalFeatures.map((feature, i) => (
                              <div className="features-content-inner pad5 noSidePad" key={`device-${i}`}>
                                {/* <h4 className="pad5 onlyTopPad bold">Equipment Protection</h4> */}
                                <div className="clearfix pad5 onlySidePad color_black">
                                  <div className="width70 floatLeft">{feature.name}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Col>
                        <Col xs className="devicePrices">
                          {!deviceDetails.modDevice && deviceDetails.protectionFeature && <Row>
                            <Col xs={6} className="textAlignRight">
                              {deviceDetails.protectionFeature.hasEcpdDiscount ?
                                <div className="color_black fontSize_3 bold">
                                  <div>
                                    <span>{deviceDetails.protectionFeature.price !== '-' ? `$${deviceDetails.protectionFeature.price}` : <span className="nil" />}</span>
                                    {deviceDetails.protectionFeature.originalPrice !== '-' &&
                                      <span className="textDecLineThrough">${deviceDetails.protectionFeature.originalPrice}</span>
                                    }
                                  </div>
                                </div>
                                :
                                <div className="color_black fontSize_3 bold">
                                  {deviceDetails.protectionFeature.price !== '-' ? <div>${deviceDetails.protectionFeature.price}</div> : <span className="nil" />}
                                </div>
                              }
                            </Col>
                            <Col xs={6} className="textAlignRight">
                              <span className="nil color_black fontSize_3 bold" />
                            </Col>
                          </Row>}
                          {deviceDetails.optionalFeatures && deviceDetails.optionalFeatures.map((feature) => (
                            <Row>
                              <Col xs={6} className="textAlignRight">
                                {feature.hasEcpdDiscount ?
                                  <div className="color_black fontSize_3 bold">
                                    <div>
                                      <span>{feature.price !== '-' ? `$${feature.price}` : <span className="nil" />}</span>
                                      {feature.originalPrice !== '-' &&
                                        <span className="textDecLineThrough">${feature.originalPrice}</span>
                                      }
                                    </div>
                                  </div>
                                  :
                                  <div className="color_black fontSize_3 bold">
                                    {feature.price !== '-' ? <div>${feature.price}</div> : <span className="nil" />}
                                  </div>
                                }
                              </Col>
                              <Col xs={6} className="textAlignRight">
                                <span className="nil color_black fontSize_3 bold" />
                              </Col>
                            </Row>
                          ))}
                        </Col>
                      </Row>}
                    </div>
                  </Col>
                </Row>
                {isHLLPlanInOrder && plansExist && planCPCDone &&
                  <Row className="devices_list_item_plan_details">
                    <Col xs={12} className="border_e6 onlyTopBorder margin24 noSideMargin pad10 noSidePad">
                      <PlanListLineLevel
                        plans={planInfoItem}
                        cqContent={cqContent}
                        isHLLPlanInOrder={isHLLPlanInOrder}
                        itemOnJaxPlan={itemOnJaxPlan}
                        lineLevelPlan={false}
                        getPlanName={getPlanName}
                      />
                    </Col>
                  </Row>
                }
              </ListHeader>
            </ListWrapper>
            );
          }
          )}
      </section>
    );
  }
}


DeviceListWrapper.propTypes = {
  cqContent: PropTypes.object,
  devices: PropTypes.object,
  plans: PropTypes.object,
  isHLLPlanInOrder: PropTypes.bool,
  itemOnJaxPlan: PropTypes.bool,
  deviceConfigInfo: PropTypes.object,
  enlargeImage: PropTypes.func,
  onDeviceListFeatureData: PropTypes.func,
  bicRepresentationChangeEnabled: PropTypes.bool,
  ispuSelected: PropTypes.bool,
};
export default DeviceListWrapper;

