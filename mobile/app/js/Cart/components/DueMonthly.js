import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Row, Col } from 'react-flexbox-grid';
import BackButton from '../../common/BackButton/BackButton';
import HorizontalRule from '../../common/HorizontalRule';
import HeroPriceComponent from '../../common/HeroPrice/';
import ItemBreakdown from '../../common/ItemBreakDown/';

class DueMonthly extends React.Component {
  constructor(props) {
    super(props);
    this.selectedMTN = null;
    this.state = {};
  }
  shouldComponentUpdate(nextProps) {
    const protectionFlag = nextProps.deviceProtectionList.fetched;
    if (protectionFlag && (protectionFlag !== this.props.deviceProtectionList.fetched)) {
      hashHistory.push('/protection?mdn=' + this.selectedMTN); // eslint-disable-line
      return false;
    }
    return true;
  }

  onChangeProtection(item) {
    this.selectedMTN = item.get('mtn');
    this.props.getProtectionOptions(item.get('flow'), item.get('mtn'), item.get('deviceSORId'));
  }
  getItemContent = (item) => {
    const sbdOffer = item.sbdOffer || false;
    if (item.bicOfferApplied && (typeof item.bicMessage === 'object' && item.bicMessage !== null)) {
      return <span dangerouslySetInnerHTML={{ __html: item.bicMessagetooltip }} />;
    }
    return (
      <div className="pad12 onlyRightPad">
        <span dangerouslySetInnerHTML={{ __html: item.priceSubTitle }} />
        {sbdOffer && (sbdOffer.bicBogoType === 'BICD' || sbdOffer.bicBogoType === 'BICT') ?
          <span> ${item.fullRetailPrice}</span>
          :
          <span>
            <span> ${item.discountedEdgeRetailPrice}</span>
            {
              parseFloat(item.fullRetailPrice, 10) > parseFloat(item.discountedEdgeRetailPrice, 10) &&
              <span className="textDecLineThrough color_gray_six"> ${item.fullRetailPrice}</span>
            }
          </span>
        }
      </div>
    );
  }
  getItemPrice = (item) => {
    const {
      sbdOffer,
      hasReducedDueMonthly,
      originalPrice,
      price,
      bicOfferApplied,
      bicDiscountedContractPrice,
    } = item;
    let _price = price;
    let strikeoutprice = (originalPrice > price) ? originalPrice : null;

    if (sbdOffer !== null && sbdOffer.sbdNegativeAmt && parseFloat(sbdOffer.sbdNegativeAmt) > 0) {
      _price = price;
      strikeoutprice = originalPrice > price ? originalPrice : null;
    } else if (sbdOffer !== null && sbdOffer.itemStrikeThroughPrice > 0 && sbdOffer.ignorePricing === false) {
      _price = sbdOffer.itemMonthlyPrice;
      strikeoutprice = sbdOffer.bicBogoType !== ('BICT' && 'BICD' && '') ? sbdOffer.itemStrikeThroughPrice : null;
    } else if (hasReducedDueMonthly) {
      _price = price;
      strikeoutprice = originalPrice;
    } else if (sbdOffer !== null && sbdOffer.ignorePricing === true) {
      _price = price;
      strikeoutprice = originalPrice > price ? originalPrice : null;
    } else if (bicOfferApplied) {
      _price = bicDiscountedContractPrice;
      strikeoutprice = price;
    } else {
      _price = price;
      strikeoutprice = originalPrice > price ? originalPrice : null;
    }

    return {
      price: _price,
      strikeoutprice,
    };
  }

  getSBDBicData = (item) => {
    const { sbdOffer } = item;
    const _badgeMessages = sbdOffer ? (sbdOffer.promoBadgeMessages || []) : [];
    let message = null;
    let price = null;
    if (_badgeMessages.length > 0) {
      message = <span className="bold">{_badgeMessages[0].badgeText}</span> || '';
      price = sbdOffer.sbdNegativeAmt ? '-$' + sbdOffer.sbdNegativeAmt : null;
    } else {
      price = sbdOffer && sbdOffer.sbdNegativeAmt ? '-$' + sbdOffer.sbdNegativeAmt : null;
    }
    return {
      message,
      price,
    };
  }

  getLacName = (item) => {
    const { numberShareDevice, lacText } = item;
    const { CQLabel } = this.props;
    if (numberShareDevice) {
      return CQLabel.OD_CART_NUM_LINE_ACCESS;
    } else if (lacText) {
      return lacText;
    }
    return CQLabel.OD_CART_LAC_TITLE;
  }
  getLineLevelPlans = (item) => {
    const { planCommerceItemId } = item;
    const { plans } = this.props;
    const [planItem] = plans.items.filter((plan) => plan.planCommerceItemId === planCommerceItemId);
    return {
      name: <span className="bold">{planItem.planDisplayName}</span>,
      children: item.displayMtn,
      price: planItem.dueMonthlyOriginal,
      discountPrice: (planItem.accountAccess.discountPrice && planItem.accountAccess.discountPrice) > 0 ? planItem.accountAccess.discountPrice : null,
      subsidyItem: (planItem.subsidyIndicator && planItem.subsidyCost && parseFloat(planItem.subsidyCost) > 0) && `Including subsidy cost $${planItem.subsidyCost}`,
      // strikeoutprice: planItem.dueMonthlyOriginal > planItem.dueMonthly ? planItem.dueMonthlyOriginal : null,
    };
  }

  getProtectionOptionPrice = (item) => {
    const { protectionOption } = item;
    if (!protectionOption.hideEditProtection && protectionOption.price) {
      return {
        price: protectionOption.price,
        strikeoutprice: protectionOption.originalPrice > protectionOption.price ? protectionOption.originalPrice : null,
      };
    }
    return {
      price: null,
      strikeoutprice: null,
    };
  }

  render() {
    const {
      CQLabel, CQHtml, bicOfferMessage, items, lineLevelOpted, protectionURL, plans, anyLineFreeSPO, tmpMdOptions, tmpmd, isTMP,
      overallDueMonthly, cpc, itemOnJaxPlan, accountLevelDiscountList, instantCreditPageURL, instantCreditEligible,
    } = this.props;
    return (
      <Grid className="pad12 noSidePad">

        <Row className="noSideMargin">
          <Col xs={12} className="noSidePad">
            <BackButton />
          </Col>
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={12}>
            <Row className="noSideMargin ">
              <Col xs={12} className="noSidePad">
                <h1 className=" noSidePad">{CQLabel.OD_CART_DUE_MONTHLY_TITLE}</h1>
                {bicOfferMessage && <p >{bicOfferMessage}</p>}
                <HorizontalRule />
              </Col>
            </Row>
            <HeroPriceComponent displayPrice={overallDueMonthly} className="noSidePad" />
            {items && items.map((item, i) => (
              <div key={`item-${i}`} className="pad48 onlyTopPad">
                {lineLevelOpted &&
                  <Row className="noSideMargin">
                    <Col xs={12} className="noSidePad" >
                      <h3 dangerouslySetInnerHTML={{ __html: item.nickName || `Line ${i + 1}` }} />
                      <HorizontalRule y={1} margin="32px 0" color="#747676" />
                    </Col>
                  </Row>
                }
                <Row className="noSideMargin">
                  <Col xs={12} className="noSidePad" >
                    <h3 className="fontSize_1_3">
                      {item.deviceManufactureName}
                      <span
                        dangerouslySetInnerHTML={{ __html: item.deviceProductDisplayName }}
                      />
                    </h3>
                    <p className="fontSize_1_3 color_gray_six">
                      <span>
                        {item.colorName && <span>{item.colorName}</span>}
                        {item.colorName && item.capacity && <span>, </span>}
                        {item.capacity && <span>{item.capacity}</span>}
                      </span>
                    </p>
                    <p className="fontSize_1_3">
                      {item.displayMtn}
                    </p>

                    <HorizontalRule y={1} color="#747676" margin="32px 0" />
                  </Col>
                </Row>
                {(parseFloat(item.price, 10) > 0 && !(item.contractTerm === '0' || item.contractTerm === '24')) &&
                  <div className="fontSize_1_3">
                    <span className="bold fontSize_1_3">{item.priceText}</span>

                    <ItemBreakdown
                      name={this.getItemContent(item)}
                      price={this.getItemPrice(item).price}
                      strikeoutprice={this.getItemPrice(item).strikeoutprice}
                      bicPromoDescription={this.getSBDBicData(item).message}
                      bicPromoPrice={this.getSBDBicData(item).price}
                      promoDetails={item.promoDetails}
                    >
                      {instantCreditEligible &&
                      <div>
                        {item.instantCreditAppliedInfo &&
                          <Row>
                            <Col xs={10}>
                              <span
                                className="margin3 onlyTopMargin"
                                dangerouslySetInnerHTML={{ __html: item.instantCreditAppliedInfo }}
                              />
                              {item.contractTerm === '99' &&
                                <a
                                  href="#"
                                  onClick={() => { window.location = instantCreditPageURL; }}
                                  className="margin10 onlyLeftMargin link"
                                  analyticstrack="edit-IC-TradeIn"
                                >{CQLabel.OD_CART_MAIN_EDIT_CTA}
                                </a>
                              }
                            </Col>
                          </Row>
                        }
                        {item.instantCreditAdjustedPrice &&
                            <p>
                              <span>{CQLabel.DT_OD_CART_ADJUSTED_PRICE}</span>
                              {(item.contractTerm === '99' && parseFloat(item.instantCreditAdjustedPrice, 10) > 0) && <span>${item.instantCreditAdjustedPrice}</span>}
                            </p>
                        }
                      </div>
                      }
                    </ItemBreakdown>
                  </div>
                }
                {item.additionalFeatures &&
                  item.additionalFeatures.map((_item, _i) => (
                    <ItemBreakdown
                      key={`additionalFeatures-${_i}`}
                      name={<span className="bold" dangerouslySetInnerHTML={{ __html: _item.name }} />}
                      price={_item.price + (_item.freeTrial ? CQLabel.OD_CART_SMARTFAMILY_DUEMONTHLY_FREETRAIL : '')}
                    >
                      {
                        _item.smartFamily &&
                        <div className="block">
                          <p>{_item.introText}</p>
                          <a
                            href={_item.editUrl}
                            className="fontSize_1_3 link"
                            analyticstrack="edit-smartfamily-from-cart"
                          >{CQLabel.OD_CART_MAIN_EDIT_CTA}
                          </a>
                        </div>
                      }
                    </ItemBreakdown>
                  ))
                }

                {!cpc && !lineLevelOpted &&
                  <ItemBreakdown name={this.getLacName(item)} price={item.lacPrice} >
                    {item.promoLACMessage && <span className="displayBlock fontSize_1_3 color_666">{item.promoLACMessage}</span>}
                  </ItemBreakdown>
                }
                {lineLevelOpted &&
                  <ItemBreakdown
                    negativeDiscount
                    name={this.getLineLevelPlans(item).name}
                    price={this.getLineLevelPlans(item).price}
                    discountPrice={this.getLineLevelPlans(item).discountPrice}
                    discountText="Line level discount"
                  >
                    <p>{this.getLineLevelPlans(item).children}</p>
                    <p>{this.getLineLevelPlans(item).subsidyItem}</p>
                  </ItemBreakdown>
                }
                {item.protectionOption &&
                  <div>
                    <form
                      name="protectionOptionForm"
                      id={'protectionOptionForm' + i}
                      method="POST"
                      action={protectionURL}
                    >
                      <ItemBreakdown name={<span className="bold">{item.protectionOption.name}</span>} price={this.getProtectionOptionPrice(item).price} strikeoutprice={this.getProtectionOptionPrice(item).strikeoutprice} >
                        <span className="block">
                          {(item.protectionOption.featureType === 'SPO') ?
                            (<p className="color_959595 fontSize_1_3" dangerouslySetInnerHTML={{ __html: item.protectionOption.displayMsg }} />)
                            :
                            (!item.protectionOption.hideEditProtection &&
                              <input
                                className="fontDisplay fontSize_1_3 background_FF link margin6 noSideMargin"
                                style={{ background: 'none' }}
                                type="submit"
                                role="button"
                                value={CQLabel.OD_CART_PROTECTION_CHANGE}
                              />
                            )}


                        </span>
                      </ItemBreakdown>
                      <input type="hidden" name="sfoskuId" value={item.protectionOption.sfoskuId} />
                      <input type="hidden" name="deviceSkuId" value={item.deviceSkuId} />
                      <input type="hidden" name="mtn" value={item.mtn} />
                      <input type="hidden" name="upgradeDeviceMTN" value={item.mtn} />
                      {item.flow === 'AAL' ?
                        <input type="hidden" name="deviceSORId" value={item.deviceSORId} />
                        :
                        <input type="hidden" name="upgradeDeviceSORId" value={item.deviceSORId} />
                      }
                      <input type="hidden" name="editFlag" value="true" />
                      <input type="hidden" name="commerceItemId" value={item.commerceItemId} />
                      <input type="hidden" name="flow" value={item.flow} />
                    </form>
                  </div>

                }
              </div>
            ))}
            {(lineLevelOpted && plans.existingDevices) && plans.existingDevices.map((dev) => (
              <div>
                <Row className="noSideMargin">
                  <Col xs={12} className="noSidePad" >
                    <h3 dangerouslySetInnerHTML={{ __html: dev.nickName }} />
                    <HorizontalRule y={1} margin="32px 0" color="#747676" />
                  </Col>

                </Row>
                <ItemBreakdown
                  negativeDiscount
                  name={this.getLineLevelPlans(dev).name}
                  price={this.getLineLevelPlans(dev).price}
                  discountPrice={this.getLineLevelPlans(dev).discountPrice}
                  discountText="Line level discount"
                >
                  <p>{this.getLineLevelPlans(dev).children}</p>
                  <p>{this.getLineLevelPlans(dev).subsidyItem}</p>
                </ItemBreakdown>
              </div>
            ))
            }
            {(cpc && plans && !lineLevelOpted) &&
              <div className="pad20 onlyTopPad">
                <Row className="noSideMargin">
                  <Col xs={12} className="noSidePad" >
                    <h3 dangerouslySetInnerHTML={{ __html: 'Plan' }} />
                    <HorizontalRule y={1} margin="32px 0" color="#747676" />
                  </Col>
                </Row>
                {plans.items.length > 0 && plans.items.map((plan, i) => (
                  <ItemBreakdown
                    key={`plan-${i}`}
                    name={<div className="fontDisplayMedium fontSize_1_3">{plan.planDisplayName}</div>}
                    price={plan.accountAccess.planAmount}
                    strikeoutprice={plan.accountAccess.hasEcpdDiscount ? plan.accountAccess.originalPlanAmount : null}
                  >
                    <div className=" fontSize_1_3" dangerouslySetInnerHTML={{ __html: plan.planDescription }} />
                  </ItemBreakdown>
                ))}

                {!itemOnJaxPlan &&
                  <Row className="noSideMargin">
                    <Col xs={12} className="noSidePad" >
                      <h3 dangerouslySetInnerHTML={{ __html: 'Line access' }} />
                      <HorizontalRule y={1} margin="32px 0" color="#747676" />
                    </Col>
                  </Row>
                }
                {plans.newDevices && plans.newDevices.length > 0 &&
                  <div>
                    <h4 className="fontSize_1_3 margin6 onlyBottomMargin">New Devices</h4>
                    {plans.newDevices.map((dev, i) => (
                      <ItemBreakdown
                        key={`newplan-${i}`}
                        name={<div dangerouslySetInnerHTML={{ __html: dev.name }} />}
                        strikeoutprice={dev.hasEcpdDiscount || (dev.discountPrice !== null && dev.discountPrice > 0) ? dev.price : null}
                        price={dev.hasEcpdDiscount || (dev.discountPrice !== null && dev.discountPrice > 0) ? dev.discountPriceVal : dev.price}
                        margin="0 0 6px"
                        color="#ffffff"
                      />
                    ))}
                    <HorizontalRule y={1} margin="32px 0" color="#747676" />
                  </div>
                }
                {plans.upgradeDevices && plans.upgradeDevices.length > 0 &&

                  <div >
                    <h4 className="fontSize_1_3  margin6 onlyBottomMargin">Upgraded Devices</h4>
                    {plans.upgradeDevices.map((dev, i) => (
                      <ItemBreakdown
                        key={`upgplan-${i}`}
                        name={<div dangerouslySetInnerHTML={{ __html: dev.name }} />}
                        strikeoutprice={dev.hasEcpdDiscount || (dev.discountPrice !== null && dev.discountPrice > 0) ? dev.price : null}
                        price={dev.hasEcpdDiscount || (dev.discountPrice !== null && dev.discountPrice > 0) ? dev.discountPriceVal : dev.price}
                        margin="0 0 6px"
                        color="#ffffff"
                      />))}
                    <HorizontalRule y={1} margin="32px 0" color="#747676" />
                  </div>
                }
                {plans.existingDevices && plans.existingDevices.length > 0 &&
                  <div>
                    <h4 className="fontSize_1_3  margin6 onlyBottomMargin">Existing Devices</h4>
                    {plans.existingDevices.map((dev, i) => (
                      <ItemBreakdown
                        key={`extplan-${i}`}
                        name={<div dangerouslySetInnerHTML={{ __html: dev.name }} />}
                        strikeoutprice={dev.hasEcpdDiscount || (dev.discountPrice !== null && dev.discountPrice > 0) ? dev.price : null}
                        price={dev.hasEcpdDiscount || (dev.discountPrice !== null && dev.discountPrice > 0) ? dev.discountPriceVal : dev.price}
                        margin="0 0 6px"
                        color="#ffffff"
                      />))}
                    <HorizontalRule y={1} margin="32px 0" color="#747676" />
                  </div>

                }

              </div>
            }
            {(accountLevelDiscountList && accountLevelDiscountList.length > 0) && accountLevelDiscountList.map((item, idx) => (
              <div className="pad24 onlyTopPad">
                <ItemBreakdown name={item.productName} price={item.cost} key={`discount-${idx}`} dollor="" />
              </div>
            ))}
            {(anyLineFreeSPO && anyLineFreeSPO.anyLineFreeSPOAvailable) &&
              <ItemBreakdown name={anyLineFreeSPO.spoDescription} price={anyLineFreeSPO.spoCharge} negative />
            }
            {(tmpmd && tmpMdOptions) &&
              <form name="protectionOptionForm" id="protectionOptionForm" method="POST" action={protectionURL}>
                <Row className="noSideMargin">
                  <Col xs={12} className="noSidePad" >
                    <h3 dangerouslySetInnerHTML={{ __html: CQLabel.OD_CART_DEVICE_PROTECTION_TITLE }} />
                    <HorizontalRule y={1} margin="32px 0" color="#747676" />
                  </Col>
                </Row>
                <ItemBreakdown name={<span className="bold">{CQLabel.OD_CART_TPMD_TITLE}</span>} price={tmpMdOptions.price ? tmpMdOptions.price : null} >
                  {tmpMdOptions.price &&
                    <span className="fontSize_1_3 color_666 block">
                      ${tmpMdOptions.price} {CQLabel.OD_CART_TPMD_MSG}
                    </span>
                  }
                  {(!tmpMdOptions.hideEditProtection &&
                    <input
                      className="fontDisplay fontSize_1_3 background_FF link margin6 noSideMargin"
                      style={{ background: 'none' }}
                      type="submit"
                      role="button"
                      value={CQLabel.OD_CART_PROTECTION_CHANGE}
                    />)}
                </ItemBreakdown>
                <input type="hidden" name="sfoskuId" value={tmpMdOptions.featureSkuId} />

                <input type="hidden" name="deviceSkuId" value={items[0].deviceSkuId} />
                <input type="hidden" name="mtn" value={items[0].mtn} />
                <input type="hidden" name="upgradeDeviceMTN" value={items[0].mtn} />
                {items.flow === 'AAL' ?
                  <input type="hidden" name="deviceSORId" value={items[0].deviceSORId} />
                  :
                  <input type="hidden" name="upgradeDeviceSORId" value={items[0].deviceSORId} />
                }
                <input type="hidden" name="editFlag" value="true" />
                <input type="hidden" name="commerceItemId" value={items[0].commerceItemId} />
                <input type="hidden" name="flow" value={items[0].flow} />
              </form>
            }
            {
              isTMP === true &&
              <div className="pad12 fontSize_1_3">
                <div dangerouslySetInnerHTML={{ __html: CQHtml.OD_PROTECTION_CRACKED_SCREEN_DISCLOSURE }} />
              </div>
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}

DueMonthly.propTypes = {
  anyLineFreeSPO: PropTypes.object,
  bicOfferMessage: PropTypes.string,
  CQHtml: PropTypes.object,
  CQLabel: PropTypes.object,
  deviceProtectionList: PropTypes.object,
  getProtectionOptions: PropTypes.func,
  isTMP: PropTypes.bool,
  items: PropTypes.array,
  lineLevelOpted: PropTypes.bool,
  plans: PropTypes.object,
  protectionURL: PropTypes.string,
  tmpmd: PropTypes.bool,
  tmpMdOptions: PropTypes.object,
  overallDueMonthly: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  cpc: PropTypes.bool,
  itemOnJaxPlan: PropTypes.bool,
  instantCreditPageURL: PropTypes.string,
  instantCreditEligible: PropTypes.bool,
  accountLevelDiscountList: PropTypes.array,
};

DueMonthly.defaultProps = {};

export default DueMonthly;
