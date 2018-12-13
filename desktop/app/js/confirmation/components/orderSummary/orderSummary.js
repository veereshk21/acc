import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';

import AccessoryList from './accessoryList';
import AsyncComponent from '../../../common/AsyncComponent';
import Notification from '../../../common/Notification/Notification';


const DeviceList = AsyncComponent(() => import('../../containers/orderSummary/deviceList'));
const PlanList = AsyncComponent(() => import('../../containers/orderSummary/planList'));
const TradeInList = AsyncComponent(() => import('../../containers/orderSummary/tradeInList'));

const OrderSummary = (props) => {
  const { cqContent, devices, accessories, billingInfo, transformedTradeInPromoDetails, standaloneAccessories } = props;
  return (
    <div className="margin36 onlyTopMargin">
      <h1 className="pad10 onlyBottomPad">{cqContent.label.DT_OD_CONFIMARTION_ORDER_SUMMARY}</h1>
      {devices.globalPromotions && devices.globalPromotions.length > 0 &&
        <Row>
          <Col xs={12} className="onlyBottomPad pad18">
            <Notification
              type={`${devices.globalPromotions ? 'info' : 'error'}`}
              message={devices.globalPromotions[0].badgeText}
              toolTip={devices.globalPromotions[0].badgeToolTip}
            />
          </Col>
        </Row>
      }
      {devices.items &&
        <div>
          <DeviceList />
          <hr className="margin20 noSideMargin" />
        </div>
      }
      {devices.accessoriesBundle.length > 0 &&
        <div>
          <AccessoryList
            accessoryBundleData={devices.accessoriesBundle}
            cqContent={cqContent}
          />
          <hr className="margin20 noSideMargin" />
        </div>
      }
      {devices.accessories.length > 0 &&
        <div>
          <AccessoryList
            accessoryData={devices.accessories}
            cqContent={cqContent}
          />
          <hr className="margin20 noSideMargin" />
        </div>
      }
      {accessories && accessories.length > 0 &&
        <div>
          <AccessoryList
            accessoryData={accessories}
            cqContent={cqContent}
          />
          <hr className="margin20 noSideMargin" />
        </div>
      }
      <PlanList />

      <Row className="color_666">
        {!standaloneAccessories &&
          <Col xs={4}>
            <h4 className="textAlignLeft margin20 noSideMargin color_000"> {cqContent.label.DT_OD_CONFIRMATION_HEADS_UP} </h4>
            <p className="floatLeft fontSize_2"> {cqContent.label.DT_OD_CONFIRMATION_HELP_US_INFOMATION} </p>
          </Col>
        }
        <Col xs={4} xsOffset={standaloneAccessories ? 8 : 4} className="floatRight">

          <Row className="fontSize_5 margin10 noSideMargin">
            <Col xs={8} className="textAlignLeft">{cqContent.label.DT_OD_CONFIRMATION_TODAY_SUBTOTAL}</Col>
            <Col xs={4} className="textAlignRight">${props.subTotalDueToday}</Col>
          </Row>
          {!standaloneAccessories &&
            <Row className="fontSize_5 margin10 noSideMargin">
              <Col xs={8} className="textAlignLeft">{cqContent.label.DT_OD_CONFIRMATION_DEPOSIT_AMOUNT}</Col>
              <Col xs={4} className="textAlignRight">${props.securityDepositAmount}</Col>
            </Row>
          }
          {props.totalEdgeItemDownPaymentAmount > 0 &&
            <Row className="fontSize_5 margin10 noSideMargin">
              <Col xs={8} className="textAlignLeft">{cqContent.label.DT_OD_CONFIRMATION_TOTAL_EDGE_ITEM_DOWN_PAYMENT_AMOUNT}</Col>
              <Col xs={4} className="textAlignRight">${props.totalEdgeItemDownPaymentAmount}</Col>
            </Row>
          }

          {props.totalEdgeUpAmount > 0 &&
            <Row className="fontSize_5 margin10 noSideMargin">
              <Col xs={8} className="textAlignLeft">{cqContent.label.DT_OD_CONFIRMATION_TOTAL_EDGE_UP_AMOUNT}</Col>
              <Col xs={4} className="textAlignRight">${props.totalEdgeUpAmount}</Col>
            </Row>
          }

          {props.totalEdgeUpBuyOutAmount > 0 &&
            <Row className="fontSize_5 margin10 noSideMargin">
              <Col xs={8} className="textAlignLeft">{cqContent.label.DT_OD_CONFIRMATION_TOTAL_EDGE_UP_BUYOUT_AMOUNT}</Col>
              <Col xs={4} className="textAlignRight">${props.totalEdgeUpBuyOutAmount}</Col>
            </Row>
          }

          <Row className="fontSize_5 margin10 noSideMargin">
            <Col xs={8} className="textAlignLeft">{cqContent.label.DT_OD_CONFIRMATION_SHIPPING_HANDLING}</Col>
            <Col xs={4} className="textAlignRight">{props.selectedShippingType.price ? '$' + props.selectedShippingType.price : 'Free'}</Col>
          </Row>

          <Row className="fontSize_5 margin10 noSideMargin">
            <Col xs={8} className="textAlignLeft">{cqContent.label.DT_OD_CONFIRMATION_STATE_SALES_TAX}</Col>
            <Col xs={4} className="textAlignRight">${props.stateSalesTax}</Col>
          </Row>

          <hr className="margin40 noSideMargin" />

          <Row className="fontSize_5 margin10 noSideMargin">
            <Col xs={8} className="textAlignLeft bold">{billingInfo.selectedPaymentMode === 'BTA' ? cqContent.label.DT_OD_CONFIRMATION_ON_NEXT_BILL : cqContent.label.DT_OD_CONFIRMATION_TOTAL_DUE_TODAY}</Col>
            <Col xs={4} className="textAlignRight">${props.totalDueToday}</Col>
          </Row>
          {!standaloneAccessories &&
            <div>
              <Row className="fontSize_5 margin10 noSideMargin">
                <Col xs={8} className="textAlignLeft bold">{cqContent.label.DT_OD_CONFIRMATION_TOTAL_DUE_MONTHLY}</Col>
                <Col xs={4} className="textAlignRight">${props.totalDueMonthlyPlanAndDevice}</Col>
              </Row>

              <Row>
                <Col xs={8}>
                  <span className="fontSize_2">{cqContent.label.DT_OD_CONFIRMATION_AMOUNT_IN_RECURRING_BILL}</span>
                </Col>
              </Row>
            </div>}

        </Col>
      </Row>

      <hr className="margin20 noSideMargin" />

      {(transformedTradeInPromoDetails && transformedTradeInPromoDetails.tradeInDevices && transformedTradeInPromoDetails.tradeInDevices.length > 0) &&
        <div>
          <TradeInList />
          <hr className="margin20 noSideMargin" />
        </div>
      }
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
  standaloneAccessories: PropTypes.bool,
};
export default OrderSummary;
