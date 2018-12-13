import React from 'react';
import PropTypes from 'prop-types';
import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import SummaryRow from './summaryRow';
import ToolTip from '../../../../common/ToolTip/index';
import Accessories from './accessories';
import StandaloneAccessories from './standaloneAccessories';


const ItemsAccordionItem = (props) => {
  const {
    devices, standaloneAccessories, cqContent, plans, hllplan, totalDueMonthlyPlanAndDevice, accountLevelDiscountVOList, bicRepresentationChangeEnabled,
  } = props;
  const deviceName = (device) => (<p><span dangerouslySetInnerHTML={{ __html: device.manufactureName }} /> <span dangerouslySetInnerHTML={{ __html: device.deviceName }} /> {device.size && !device.modDevice && <span>{device.size}</span>} {device.color && !device.modDevice && <span>in {device.color}</span>}</p>);

  const deviceFee = (device) => (
    <div>
      <span>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_ACTIVATION_FEE.replace('$AMOUNT$', device.activationFee)}</span>
      <ToolTip
        className="margin3 onlyLeftMargin displayInlineBlock"
        ariaLabel="Activation fee information tooltip"
        text={cqContent.label.DT_OD_CHECKOUT_SUMMARY_ACTIVATION_FEE_TOOLTIP}
        noRenderHTML
      />
    </div>
  );

  const promotionDiscount = (device) => (
    device.devicePromotionList && device.devicePromotionList.map((offer, offerIndex) => (
      (offer.promoAmount !== null && parseFloat(offer.promoAmount) > 0 && !offer.isUpgradeFeeWaivedOffer) && !device.bicOfferApplied &&
      <p key={`offer-IC-${offerIndex}`}>{cqContent.label.DT_OD_CHECKOUT_OFFER_DISCOUNT_TEXT} : -${offer.promoAmount}</p>
    ))
  );


  return (
    <AccordionItem
      className="accordionItem border_black borderSize_4 onlyTopBorder pad6 onlyTopPad"
      expanded={standaloneAccessories}
    >
      <AccordionItemTitle>
        <SummaryRow
          description={<p className="fontSize_5">{cqContent.label.DT_OD_CHECKOUT_SUMMARY_ITEMS}</p>}
          dueToday={`$${props.subtotalDueToday}`}
          dueMonthly={!hllplan ? `$${devices.dueMonthly.toFixed(2)}` : `$${totalDueMonthlyPlanAndDevice}`}
          isTitle
          accessoryFlow={standaloneAccessories}
        />
      </AccordionItemTitle>
      <AccordionItemBody>
        {devices.items && devices.items.map((device, index) => {
          const changedPlan = hllplan && ((plans && plans.items) && plans.items.filter((plan) => plan.planCommerceItemId === device.planCommerceItemId)[0]);
          const instantCreditDevice = !!device.optionalDownpaymentInstantCredit || !!device.fullRetailInstantCreditAmount || !!device.twoYearInstantCreditAmount;
          return (
            <div className="margin24 onlyBottomMargin" key={`accordionDevice-${index}`}>
              {props.checkoutStates.instantCreditOrder &&
                <div className="margin20 onlyTopMargin">
                  <p className="bold fontSize_5">Line {index + 1}</p>
                  <hr className="border_black" />
                </div>
              }
              {instantCreditDevice ?
                <SummaryRow
                  description={deviceName(device)}
                  promotionsList={device.bicOfferApplied && bicRepresentationChangeEnabled ? [] : device.devicePromotionList}
                />
                :
                (<SummaryRow
                  description={deviceName(device)}
                  dueToday={`$${device.dueToday}`}
                  dueMonthly={`$${device.dueMonthly}`}
                  dueTodayDiscounted={device.dueTodayDiscounted}
                  dueTodayOriginal={`$${device.dueTodayOriginal}`}
                  dueMonthlyDiscounted={device.dueMonthlyDiscounted}
                  dueMonthlyOriginal={`$${device.dueMonthlyOriginal}`}
                  dueMonthlyTotalDuration={device.dueMonthlyTotalDuration}
                  cqContent={cqContent}
                  modDevice={device.modDevice}
                  promotionsList={device.bicOfferApplied && bicRepresentationChangeEnabled ? [] : device.devicePromotionList}
                />)
              }

              {device.optionalDownpaymentInstantCredit &&
                <SummaryRow
                  description={(
                    <div>
                      <p>{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_DOWNPAYMENT_RETAIL_PRICE.replace('$AMOUNT$', device.edgeRetailPrice)}</p>
                      <p>{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_DOWNPAYMENT_APPLIED.replace('$AMOUNT$', device.optionalDownpaymentInstantCredit)}</p>
                      {promotionDiscount(device)}
                      <p>{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_DOWNPAYMENT_ADJUSTED_RETAIL_PRICE.replace('$AMOUNT$', device.instantCreditAdjustedPrice)}</p>
                    </div>
                  )}
                  dueMonthly={<span className="positionAbsolute" style={{ bottom: 0, right: 8 }}>${device.dueMonthly}</span>}
                />
              }

              {device.fullRetailInstantCreditAmount &&
                <SummaryRow
                  description={(
                    <div>
                      <p>{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_RP_FRP.replace('$AMOUNT$', device.fullRetailPrice)}</p>
                      <p>{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_RP_APPLIED.replace('$AMOUNT$', device.fullRetailInstantCreditAmount)}</p>
                      {promotionDiscount(device)}
                      <p>{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_RP_ADJUSTED}</p>
                    </div>
                  )}
                  dueToday={<span className="positionAbsolute" style={{ bottom: 0, right: 8 }}>${device.dueToday}</span>}
                />
              }

              {device.twoYearInstantCreditAmount &&
                <SummaryRow
                  description={(
                    <div>
                      <p>{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_2YR_PRICE.replace('$AMOUNT$', device.twoYearPriceOrginal)}</p>
                      <p>{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_2YR_APPLIED.replace('$AMOUNT$', device.twoYearInstantCreditAmount)}</p>
                      {promotionDiscount(device)}
                      <p>{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_2YR_ADJUSTED}</p>
                    </div>
                  )}
                  dueToday={<span className="positionAbsolute" style={{ bottom: 0, right: 8 }}>${device.twoYearPriceInstantCreditApplied}</span>}
                />
              }
              {bicRepresentationChangeEnabled && device.bicOfferApplied && device.devicePromotionList &&
                device.devicePromotionList.map((promo, promoIndex) => {
                  const promoBadgeMessage = promo.promoBadgeMessages && promo.promoBadgeMessages.length > 0 ? promo.promoBadgeMessages[0] : null;
                  return !promo.sedOffer && (
                    <SummaryRow
                      key={`promoItemList-${promoIndex}`}
                      description={
                        <div className="positionRelative">
                          <span className="font-icon_tag bicPromoTag pad18 onlyRightPad color_blue" />
                          <span className="color_blue">{promoBadgeMessage ? promoBadgeMessage.badgeText : promo.promotionalMessage}</span>

                          {(promo.promotionTooltip || (promoBadgeMessage && promoBadgeMessage.badgeToolTip)) &&
                            <ToolTip
                              className="margin3 onlyLeftMargin displayInlineBlock blue"
                              ariaLabel="Promotional information tooltip"
                              text={promoBadgeMessage ? promoBadgeMessage.badgeToolTip : promo.promotionTooltip}
                            />
                          }
                        </div>
                      }
                      dueToday={promo.dueTodayDiscount ? `-$${promo.dueTodayDiscount}` : '--'}
                      dueMonthly={promo.dueMonthlyDiscount ? `-$${promo.dueMonthlyDiscount}` : '--'}
                    />
                  );
                })
              }
              {device.tradeinPromoDetails &&
                <SummaryRow
                  description={(
                    <div>
                      <span
                        className="color_blue fontSize_4"
                        dangerouslySetInnerHTML={{ __html: device.tradeinPromoDetails.promotionalMessage }}
                      />
                      {device.tradeinPromoDetails.promotionTooltip &&
                        <ToolTip
                          className="margin3 onlyLeftMargin displayInlineBlock blue"
                          ariaLabel="Trade-in promotion tooltip"
                          text={device.tradeinPromoDetails.promotionTooltip}
                        />
                      }
                    </div>
                  )}
                  dueToday="--"
                  dueMonthly={device.tradeinPromoDetails.promoAmount && device.tradeinPromoDetails.bicApplied ? `-${device.tradeinPromoDetails.promoAmount}` : '--'}
                />
              }
              {device.edgeUpBuyOutAmount > 0 &&
                <SummaryRow
                  description={<p>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_EDGE_BUY_OUT}</p>}
                  dueToday={`$${device.edgeUpBuyOutAmount.toFixed(2)}`}
                  dueMonthly="--"
                />
              }

              {device.edgeUpAmount > 0 &&
                <SummaryRow
                  description={<p>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_EDGE_UP}</p>}
                  dueToday={`$${device.edgeUpAmount.toFixed(2)}`}
                  dueMonthly="--"
                />
              }

              {parseFloat(device.edgeItemDownPaymentAmount) > 0 &&
                <SummaryRow
                  description={<p>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_DOWNPAYMENT}</p>}
                  dueToday={`$${device.edgeItemDownPaymentAmount}`}
                  dueMonthly="--"
                />
              }

              {device.optionalFeatures && device.optionalFeatures.map((feature, featureIndex) => (
                <SummaryRow
                  key={`accordionOptionalFeatures-${featureIndex}`}
                  description={<p>{feature.name}</p>}
                  dueToday="--"
                  dueMonthly={`$${feature.price}`}
                  dueMonthlyDiscounted={feature.hasEcpdDiscount}
                  dueMonthlyOriginal={`$${feature.originalPrice}`}
                  promoMessage={feature.promoMessage}
                />))
              }

              {!device.modDevice && device.protectionFeature && !device.protectionIneligible &&
                <SummaryRow
                  description={<p>{device.protectionFeature.name}</p>}
                  dueToday="--"
                  dueMonthly={device.protectionFeature.price !== '-' ? `$${device.protectionFeature.price}` : '-'}
                  dueMonthlyDiscounted={device.protectionFeature.price !== '-' && device.protectionFeature.originalPrice !== '-' && device.protectionFeature.hasEcpdDiscount}
                  dueMonthlyOriginal={device.protectionFeature.originalPrice !== '-' && `$${device.protectionFeature.originalPrice}`}
                  promoMessage={device.protectionFeature.promoMessage}
                />
              }

              {device.protectionIneligible &&
                <SummaryRow
                  description={cqContent.label.DT_OD_CHECKOUT_PROTECTION_INELIGIBLE_MESSAGE}
                />
              }

              {!device.modDevice && (device.flow === 'AAL' || device.flow === 'NSO') &&
                <SummaryRow
                  description={deviceFee(device)}
                  dueToday="--"
                  dueMonthly="--"
                />
              }

              {!instantCreditDevice && device.devicePromotionList && device.devicePromotionList.map((offer) => (
                (offer.promoAmount !== null && parseFloat(offer.promoAmount) > 0 && !offer.isUpgradeFeeWaivedOffer) && !(bicRepresentationChangeEnabled && device.bicOfferApplied) &&
                <SummaryRow
                  description={`${cqContent.label.DT_OD_CHECKOUT_OFFER_DISCOUNT_TEXT} : $${offer.promoAmount}`}
                  dueToday="--"
                  dueMonthly="--"
                />
              ))}
              {changedPlan && changedPlan.cpcDone &&
                <div>
                  <SummaryRow
                    description={`${changedPlan.planDisplayName}`}
                    dueToday="--"
                    dueMonthly={changedPlan.dueMonthlyOriginal && parseFloat(changedPlan.dueMonthlyOriginal, 10) > 0 ? `$${changedPlan.dueMonthlyOriginal}` : `$${changedPlan.dueMonthly}`}
                    promotionsList={changedPlan.devicePromotionList}
                  />
                  {changedPlan.itemDiscount && parseFloat(changedPlan.itemDiscount, 10) > 0 &&
                    <SummaryRow
                      description={<p dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CHECKOUT_SUMMARY_LINE_LEVEL_DISCOUNT }} />}
                      dueToday="--"
                      dueMonthly={`-$${changedPlan.itemDiscount}`}
                    />
                  }
                </div>
              }
            </div>
          );
        }
        )}

        {parseFloat(props.depositAmount) > 0 &&
          <SummaryRow
            description={<p>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_DEPOSIT}</p>}
            dueToday={`$${props.depositAmount}`}
            dueMonthly="--"
          />
        }


        {(hllplan && (plans && plans.existingDevices)) &&
          plans.existingDevices.map((dev) => {
            const existingPlanExists = (plans && plans.items) && plans.items.filter((plan) => plan.planCommerceItemId === dev.planCommerceItemId)[0];
            return (
              existingPlanExists && existingPlanExists.cpcDone &&
              <div className="existing_plan margin20 noSideMargin">
                <SummaryRow
                  description={<p dangerouslySetInnerHTML={{ __html: `<p>${dev.nickName}</p> ${existingPlanExists.planDisplayName}` }} />}
                  dueToday="--"
                  dueMonthly={(existingPlanExists.dueMonthlyOriginal && parseFloat(existingPlanExists.dueMonthlyOriginal) > 0) ? `$${existingPlanExists.dueMonthlyOriginal}` : `$${existingPlanExists.dueMonthly}`}
                />
                {(existingPlanExists.itemDiscount && parseFloat(existingPlanExists.itemDiscount) > 0) && <SummaryRow
                  description={<p dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CHECKOUT_SUMMARY_LINE_LEVEL_DISCOUNT }} />}
                  dueToday="--"
                  dueMonthly={`-$${existingPlanExists.itemDiscount}`}
                />}
              </div>
            );
          })
        }

        {/* Deprecared - According to Sathees Edara this code will never execute as it is not populate for HLL */}
        {hllplan && (plans && plans.discountedDueMonthlyPlanWithLAC && parseFloat(plans.discountedDueMonthlyPlanWithLAC) > 0) &&
          <SummaryRow
            className="margin20 noSideMargin"
            description={<p dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CHECKOUT_SUMMARY_ACCOUNT_LEVEL_DISCOUNT }} />}
            dueToday="--"
            dueMonthly={`-$${plans.discountedDueMonthlyPlanWithLAC}`}
          />
        }

        {(accountLevelDiscountVOList && accountLevelDiscountVOList.length > 0) &&
          accountLevelDiscountVOList.map((accountLevelDiscount) => (accountLevelDiscount.cost ?
            <SummaryRow
              className="margin20 noSideMargin"
              description={<p dangerouslySetInnerHTML={{ __html: accountLevelDiscount.productName }} />}
              dueToday="--"
              dueMonthly={`${accountLevelDiscount.cost}`}
            />
            :
            ''))
        }

        {standaloneAccessories ?
          (<StandaloneAccessories
            cqContent={cqContent}
            accessories={props.accessories}
          />)
          :
          (<Accessories
            cqContent={cqContent}
            accessories={props.accessories}
            accessoriesBundle={props.accessoriesBundle}
            instantCreditOrder={props.checkoutStates.instantCreditOrder}
          />)
        }

      </AccordionItemBody>
    </AccordionItem>
  );
};

ItemsAccordionItem.propTypes = {
  devices: PropTypes.object,
  plans: PropTypes.object,
  standaloneAccessories: PropTypes.bool,
  accessories: PropTypes.array,
  accessoriesBundle: PropTypes.array,
  cqContent: PropTypes.object,
  subtotalDueToday: PropTypes.string,
  depositAmount: PropTypes.string,
  hllplan: PropTypes.bool,
  accountLevelDiscountVOList: PropTypes.array,
  totalDueMonthlyPlanAndDevice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  bicRepresentationChangeEnabled: PropTypes.bool,
  checkoutStates: PropTypes.object,
};

export default ItemsAccordionItem;
