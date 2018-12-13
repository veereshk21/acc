/* eslint-disable jsx-a11y/tabindex-no-positive */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import BackButton from '../../common/BackButton/BackButton';
import HorizontalRule from '../../common/HorizontalRule';
import HeroPriceComponent from '../../common/HeroPrice/';
import ItemBreakdown from '../../common/ItemBreakDown/';

import DueItems from '../components/DueItems';


// eslint-disable-next-line react/prefer-stateless-function
class DueMonthly extends Component {
  getLineLevelPlans = (item) => {
    const { planCommerceItemId } = item;
    const { plans } = this.props;
    const [planItem] = plans.items.filter((plan) => plan.planCommerceItemId === planCommerceItemId);
    if (planItem) {
      return {
        name: <span className="bold">{planItem.planDisplayName}</span>,
        children: item.displayMtn,
        price: (planItem.dueMonthlyOriginal && parseFloat(planItem.dueMonthlyOriginal, 10) > 0) ? planItem.dueMonthlyOriginal : planItem.dueMonthly,
        discountPrice: planItem.itemDiscount && planItem.itemDiscount > 0 ? planItem.itemDiscount : null,
        // strikeoutprice: planItem.dueMonthlyOriginal > planItem.dueMonthly ? planItem.dueMonthlyOriginal : null,
      };
    }
    return {
      name: null,
      children: null,
      price: null,
      strikeoutprice: null,
    };
  }
  render() {
    const {
      cqContent, tmpMd, tmpMdOpted, itemsData, anyLineFreeData, dueMonthlyData, plans, lineLevelOpted, totalDueMonthlyPlanAndDevice, cpcOrder, itemOnJaxPlan, accountLevelDiscountList, bicRepresentationChangeEnabled,
    } = this.props;


    return (
      <Grid className="pad12 onlyTopPad">
        <Row className="noSideMargin">
          <Col xs={12} className="noSidePad">
            <BackButton />
          </Col>
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={12}>
            <Row className="noSideMargin ">
              <Col xs={12} className="noSidePad">
                <h1 className=" noSidePad">{cqContent.label.OD_CHECKOUT_DUE_MONTHLY_TEXT}</h1>
                {this.props.itemsData.map((item) => (
                  item.bicOfferApplied &&
                  (item.bicMessageMap && <p className="pad12 onlyTopPad fontSize_1_3">{item.bicMessageMap.message}</p>)
                ))}
                <HorizontalRule />
              </Col>
            </Row>
            <HeroPriceComponent margin="32px 0" className="noSidePad" displayPrice={totalDueMonthlyPlanAndDevice} />
            <DueItems
              tmpMd={tmpMd}
              items={dueMonthlyData.items}
              title={cqContent.label.OD_CHECKOUT_DEVICES_SECTION_TITLE}
              devices={itemsData}
              plans={plans}
              lineLevelOpted={lineLevelOpted}
              dueMonthly
              bicRepresentationChangeEnabled={bicRepresentationChangeEnabled}
            />
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
                  discountPrice={this.getLineLevelPlans(dev).discountPrice}
                  name={this.getLineLevelPlans(dev).name}
                  price={this.getLineLevelPlans(dev).price}
                  strikeoutprice={this.getLineLevelPlans(dev).strikeoutprice}
                  discountText="Line level discount"
                >
                  <p>{this.getLineLevelPlans(dev).children}</p>
                </ItemBreakdown>
              </div>
            ))
            }
            {(cpcOrder && plans && !lineLevelOpted) &&
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
                      <h3 dangerouslySetInnerHTML={{ __html: 'Smartphone line access' }} />
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
                        price={dev.price}
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
                        price={dev.price}
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
                        price={dev.price}
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
            {(anyLineFreeData && anyLineFreeData.anyLineFreeSPOAvailable) &&
              <ItemBreakdown
                name={anyLineFreeData.spoDescription}
                price={anyLineFreeData.spoCharge}
                negative
              />
            }
            {(tmpMdOpted && tmpMd) &&
              <div className="pad48 onlyTopPad">
                <Row className="noSideMargin">
                  <Col xs={12} className="noSidePad" >
                    <h3 dangerouslySetInnerHTML={{ __html: cqContent.label.OD_CHECKOUT_DEVICE_PROTECTION_TITLE }} />
                    <HorizontalRule y={1} margin="32px 0" color="#747676" />
                  </Col>
                </Row>
                <ItemBreakdown
                  name={tmpMd.lable}
                  price={tmpMd.price}
                >
                  <p className="fontSize_1_3 color_gray_six" dangerouslySetInnerHTML={{ __html: tmpMd.description }} />
                </ItemBreakdown>
              </div>

            }
          </Col>
        </Row>
      </Grid>
    );
  }
}
DueMonthly.propTypes = {
  itemsData: PropTypes.array,
  cqContent: PropTypes.object,
  dueMonthlyData: PropTypes.object,
  tmpMdOpted: PropTypes.bool,
  tmpMd: PropTypes.object,
  anyLineFreeData: PropTypes.object,
  plans: PropTypes.object,
  lineLevelOpted: PropTypes.bool,
  totalDueMonthlyPlanAndDevice: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  cpcOrder: PropTypes.bool,
  itemOnJaxPlan: PropTypes.bool,
  accountLevelDiscountList: PropTypes.array,
  bicRepresentationChangeEnabled: PropTypes.bool,
};

export default DueMonthly;
