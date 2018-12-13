import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';

import AccessoryList from './accessoryList';
import AsyncComponent from '../../../common/AsyncComponent';
import Notification from '../../../common/Notification/Notification';

import ListHeader from './listHeader';
import ListWrapper from './listWrapper';

import AlertIcon from '../../../../images/alert.svg';

const DeviceList = AsyncComponent(() => import('../../containers/orderSummary/deviceList'));
const TradeInList = AsyncComponent(() => import('../../containers/orderSummary/tradeInList'));
const PlanListLineLevel = AsyncComponent(() => import('./planListLineLevel'));
const PlanList = AsyncComponent(() => import('../../containers/orderSummary/planList'));
const RecommendedAccesoriesWrapper = AsyncComponent(() => import('./../../containers/recommendedAccessories/recommendedAccessoriesWrapper'));

const enlargeImage = (imageSrc) => {
  const imageWidthHeight = '&wid=100&hei=200';
  let enlargedImage;
  if (imageSrc.match('wid=')) {
    enlargedImage = `${imageSrc.slice(0, imageSrc.lastIndexOf('&wid'))}${imageWidthHeight}`;
  } else {
    enlargedImage = `${imageSrc}${imageWidthHeight}`;
  }
  return enlargedImage;
};

const onDeviceListFeatureData = (_self, elId, e) => {
  e.preventDefault();
  const items = _self.state.toggler;
  items[elId].displayFeatureType = !items[elId].displayFeatureType;
  if (items[elId].featureTypeText === 'Show') {
    items[elId].featureTypeText = 'Hide';
    items[elId].featureTypeCSS = 'Show';
  } else {
    items[elId].featureTypeText = 'Show';
    items[elId].featureTypeCSS = 'Hide';
  }
  _self.setState({
    items,
  });
};

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

const OrderSummary = (props) => {
  const { cqContent, devices, accessories, billingInfo, transformedTradeInPromoDetails, standaloneAccessories,
    isHLLPlanInOrder,
    itemOnJaxPlan,
    cpcOrder,
    plans,
    accountLevelDiscountList,
    recommendedAccessories,
  } = props;
  const devicesExist = (devices && (devices.items && devices.items.length > 0));
  const plansExist = (plans && (plans.items && plans.items.length > 0));
  const standAloneAccessoriesExist = accessories && accessories.length > 0;
  const inlineAccessoriesExist = devices && devices.accessories && devices.accessories.length > 0;
  const accessoriesBundleExist = devices && devices.accessoriesBundle && devices.accessoriesBundle.length > 0;
  const accessoriesExist = standAloneAccessoriesExist || inlineAccessoriesExist || accessoriesBundleExist;
  const { globalPromotions } = devices;
  const showCloseGlobalPromo = true;
  return (
    <div className="orderSummary color_black margin36 onlyBottomMargin">
      <Row>
        <Col xs={9} className="border_CC" style={{ padding: '0px' }}>
          {(globalPromotions && globalPromotions.length > 0) && globalPromotions.map((globalPromo) =>
            (globalPromo.badgeText && globalPromo.promoType !== 'PLAN_OFFER' &&
              <Row>
                <Col xs={12} className="onlyBottomPad pad18">
                  <Notification
                    type={`${globalPromotions ? 'info' : 'error'}`}
                    message={globalPromo.badgeText}
                    toolTip={globalPromo.badgeToolTip}
                    noClose={showCloseGlobalPromo}
                  />
                </Col>
              </Row>
            ))
          }
          {devicesExist &&
            <div className="devices">
              <DeviceList enlargeImage={enlargeImage} onDeviceListFeatureData={onDeviceListFeatureData} />
            </div>
          }
          {isHLLPlanInOrder ?
            <div className="plans">
              {(plansExist && cpcOrder) &&
                <PlanListLineLevel
                  plans={plans}
                  cqContent={cqContent}
                  itemOnJaxPlan={itemOnJaxPlan}
                  lineLevelPlan
                  enlargeImage={enlargeImage}
                  getPlanName={getPlanName}
                />}
            </div> :
            <PlanList enlargeImage={enlargeImage} getPlanName={getPlanName} onDeviceListFeatureData={onDeviceListFeatureData} />
          }
          {isHLLPlanInOrder && props.militaryInfoURL &&
            <ListWrapper>
              {props.firstRespondersInfoURL ?
                <p dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CONFIRMATION_MILITARY_AND_FIRST_RESPONDER_DISCOUNT.replace('MILITARY_URL', props.militaryInfoURL).replace('FIRST_RESPONDER_URL', props.firstRespondersInfoURL) }} />
                :
                <p dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CONFIRMATION_MILITARY_DISCOUNT.replace('MILITARY_URL', props.militaryInfoURL) }} />
              }
            </ListWrapper>
          }

          {accessoriesExist && <div className="accessories">
            <ListWrapper className="accessory_list_item">
              <ListHeader
                title="Accessories"
                cqContent={cqContent}
              >
                {accessoriesBundleExist &&
                  <AccessoryList
                    accessoryBundleData={devices.accessoriesBundle}
                    cqContent={cqContent}
                    enlargeImage={enlargeImage}
                  />
                }
                {inlineAccessoriesExist &&
                  <AccessoryList
                    accessoryData={devices.accessories}
                    cqContent={cqContent}
                    enlargeImage={enlargeImage}
                    accessoriesBundleExist={accessoriesBundleExist}
                  />
                }
                {standAloneAccessoriesExist &&
                  <AccessoryList
                    accessoryData={accessories}
                    cqContent={cqContent}
                    enlargeImage={enlargeImage}
                    accessoriesBundleExist={accessoriesBundleExist}
                  />
                }
              </ListHeader>
            </ListWrapper>
          </div>
          }
          {(transformedTradeInPromoDetails && transformedTradeInPromoDetails.tradeInDevices && transformedTradeInPromoDetails.tradeInDevices.length > 0) &&
            <div className="tradeIn">
              <TradeInList />
            </div>
          }

          {recommendedAccessories && (recommendedAccessories.isFetching === false && recommendedAccessories.data && recommendedAccessories.data.output && (recommendedAccessories.data.output.recommendedAccessoriesDetails && recommendedAccessories.data.output.recommendedAccessoriesDetails.length > 0)) && recommendedAccessories.error === false &&
            <ListWrapper noPad>
              <RecommendedAccesoriesWrapper />
            </ListWrapper>
          }
        </Col>
        <Col xs={3} className="border_CC onlyTopBorder">
          <Row className="color_black pad10">
            <Col xs={12}>
              <h1 className="fontSize_6 margin20 onlyBottomMargin">{cqContent.label.DT_OD_CONFIRMATION_TODAY_SUMMARY}</h1>
              <Row className="fontSize_4 margin10 noSideMargin">
                <Col xs={8} className="textAlignLeft bold">{cqContent.label.DT_OD_CONFIRMATION_TODAY_SUBTOTAL}</Col>
                <Col xs={4} className="textAlignRight">{(props.subTotalDueToday && props.subTotalDueToday !== '0.00') ? `$${props.subTotalDueToday}` : <span className="nil" />}</Col>
              </Row>

              {!standaloneAccessories &&
                <Row className="fontSize_4 margin10 noSideMargin">
                  <Col xs={8} className="textAlignLeft bold">{cqContent.label.DT_OD_CONFIRMATION_DEPOSIT_AMOUNT}</Col>
                  <Col xs={4} className="textAlignRight">{(props.securityDepositAmount && props.securityDepositAmount !== '0.00') ? `$${props.securityDepositAmount}` : <span className="nil" />}</Col>
                </Row>
              }
              {props.totalEdgeItemDownPaymentAmount > 0 &&
                <Row className="fontSize_4 margin10 noSideMargin">
                  <Col xs={8} className="textAlignLeft bold">{cqContent.label.DT_OD_CONFIRMATION_TOTAL_EDGE_ITEM_DOWN_PAYMENT_AMOUNT}</Col>
                  <Col xs={4} className="textAlignRight">${props.totalEdgeItemDownPaymentAmount}</Col>
                </Row>
              }

              {props.totalEdgeUpAmount > 0 &&
                <Row className="fontSize_4 margin10 noSideMargin">
                  <Col xs={8} className="textAlignLeft bold">{cqContent.label.DT_OD_CONFIRMATION_TOTAL_EDGE_UP_AMOUNT}</Col>
                  <Col xs={4} className="textAlignRight">${props.totalEdgeUpAmount}</Col>
                </Row>
              }

              {props.totalEdgeUpBuyOutAmount > 0 &&
                <Row className="fontSize_4 margin10 noSideMargin">
                  <Col xs={8} className="textAlignLeft bold">{cqContent.label.DT_OD_CONFIRMATION_TOTAL_EDGE_UP_BUYOUT_AMOUNT}</Col>
                  <Col xs={4} className="textAlignRight">${props.totalEdgeUpBuyOutAmount}</Col>
                </Row>
              }

              <Row className="fontSize_4 margin10 noSideMargin">
                <Col xs={8} className="textAlignLeft bold">{cqContent.label.DT_OD_CONFIRMATION_SHIPPING_HANDLING}</Col>
                {props.checkoutStates.showDeliveryMethod ?
                  <Col xs={4} className="textAlignRight">{props.selectedShippingType.price ? `$${props.selectedShippingType.price}` : 'Free'}</Col>
                  :
                  <Col xs={4} className="textAlignRight"><span className="nil" /></Col>
                }

              </Row>


              <Row className="fontSize_4 margin10 noSideMargin">
                <Col xs={8} className="textAlignLeft bold">{cqContent.label.DT_OD_CONFIRMATION_STATE_SALES_TAX}</Col>
                <Col xs={4} className="textAlignRight">{(props.stateSalesTax && props.stateSalesTax !== '0.00') ? `$${props.stateSalesTax}` : <span className="nil" />}</Col>
              </Row>

              {props.checkoutStates && props.checkoutStates.instantCreditOrder &&
                props.stateSalesTaxOriginal && props.stateSalesTaxOriginal !== '0.00' &&
                props.stateSalesTaxInstantCredit && props.stateSalesTaxInstantCredit !== '0.00' &&
                <div className="fontSize_4 margin10 noSideMargin">
                  <p className="fontSize_3">{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_ESTIMATED_TAX.replace('$AMOUNT$', props.stateSalesTaxOriginal)}</p>
                  <p
                    className="fontSize_3"
                    dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CONFIRMATION_INSTANT_CREDIT_APPLIED_TAX.replace('$AMOUNT$', props.stateSalesTaxInstantCredit) }}
                  />
                </div>
              }

              {(accountLevelDiscountList && accountLevelDiscountList.length > 0) && accountLevelDiscountList.map((accountLevelDiscount) => (accountLevelDiscount.cost &&

                <Row className="fontSize_4 margin10 noSideMargin">
                  <Col xs={8} className="textAlignLeft bold" dangerouslySetInnerHTML={{ __html: accountLevelDiscount.productName }} />
                  <Col xs={4} className="textAlignRight">{`${accountLevelDiscount.cost}`}</Col>
                </Row>
              ))
              }

              <hr className="margin24 noSideMargin" />

              <Row className="margin10 noSideMargin fontSize_6 bold">
                <Col xs={8} className="textAlignLeft bold">{billingInfo.selectedPaymentMode === 'BTA' ? cqContent.label.DT_OD_CONFIRMATION_ON_NEXT_BILL : cqContent.label.DT_OD_CONFIRMATION_DUE_TODAY_TITLE}</Col>
                <Col xs={4} className="textAlignRight">{(props.totalDueToday && props.totalDueToday !== '0.00') ? `$${props.totalDueToday}` : <span className="nil" />}</Col>
              </Row>

              {!standaloneAccessories &&
                <div>
                  <Row className="margin10 onlyTopMargin fontSize_6 bold">
                    <Col xs={8} className="textAlignLeft">{cqContent.label.DT_OD_CONFIRMATION_DUE_MONTHLY_TITLE}</Col>
                    <Col xs={4} className="textAlignRight">{(props.totalDueMonthlyPlanAndDevice && props.totalDueMonthlyPlanAndDevice !== '0.00') ? `$${props.totalDueMonthlyPlanAndDevice}` : <span className="nil" />}</Col>
                  </Row>

                  <Row>
                    <Col xs={8}>
                      <span className="legalFeature">{cqContent.label.DT_OD_CONFIRMATION_AMOUNT_IN_RECURRING_BILL}</span>
                    </Col>
                  </Row>
                </div>
              }

              <hr className="margin24 noSideMargin" />
            </Col>
            <Col xs={12} className="margin24 onlyBottomMargin" >
              <Row>
                <Col xs={1}>
                  <img className="verticalCenter" height="20px" src={AlertIcon} alt="Printer" />
                </Col>
                <Col xs={11}>
                  <p className="displayInlineBlock fontSize_3 pad3 onlyTopPad margin6 onlyLeftMargin">{cqContent.label.DT_OD_CONFIRMATION_HEADS_UP}. {cqContent.label.DT_OD_CONFIRMATION_HELP_US_INFOMATION} </p>
                </Col>
              </Row>

            </Col>
            <div className="border_CC margin-10 onlyTopBorder width100" />
            <Col xs={12}>
              <div className="textAlignLeft margin10 noSideMargin color_black">
                <p className="floatLeft fontSize_1">{cqContent.label.DT_OD_CONFIRMATION_LEGAL}</p>
              </div>
            </Col>
            <Col xs={12}>
              <div className="textAlignLeft margin10 noSideMargin color_black">
                <p className="floatLeft fontSize_1">{cqContent.label.DT_OD_CONFIRMATION_CONNECTICUT_CUSTOMER}</p>
                <p className="floatLeft fontSize_1">{cqContent.label.DT_OD_CONFIRMATION_CONNECTICUT_CUSTOMER_DETAILS}</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

OrderSummary.propTypes = {
  cqContent: PropTypes.object,
  devices: PropTypes.object,
  accessories: PropTypes.array,
  billingInfo: PropTypes.object,
  subTotalDueToday: PropTypes.string,
  securityDepositAmount: PropTypes.string,
  stateSalesTax: PropTypes.string,
  totalDueToday: PropTypes.string,
  totalEdgeUpBuyOutAmount: PropTypes.string,
  totalEdgeUpAmount: PropTypes.string,
  totalEdgeItemDownPaymentAmount: PropTypes.string,
  selectedShippingType: PropTypes.object,
  totalDueMonthlyPlanAndDevice: PropTypes.string,
  transformedTradeInPromoDetails: PropTypes.object,
  plans: PropTypes.object,
  isHLLPlanInOrder: PropTypes.bool,
  cpcOrder: PropTypes.bool,
  itemOnJaxPlan: PropTypes.bool,
  standaloneAccessories: PropTypes.bool,
  accountLevelDiscountList: PropTypes.array,
  checkoutStates: PropTypes.object,
  recommendedAccessories: PropTypes.object,
  firstRespondersInfoURL: PropTypes.string,
  militaryInfoURL: PropTypes.string,
  stateSalesTaxOriginal: PropTypes.string,
  stateSalesTaxInstantCredit: PropTypes.string,
};
export default OrderSummary;
