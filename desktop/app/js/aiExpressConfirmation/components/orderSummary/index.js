import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Sticky from 'react-stickynode';
import { Row, Col } from 'react-flexbox-grid';
import ToolTip from '../../../common/ToolTip/index';
import FAQ from './faq';

class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
    };
  }
  render() {
    const {
      cqContent,
      shipping,
      plans,
      hllplan,
      ispuSelected,
      plansTotalLAC,
    } = this.props;

    return (
      <div className="">
        <Sticky
          bottomBoundary="#app"
        >
          <div className="pad24 noTopPad">
            <div className="clearfix pad24 onlyTopPad">
              <h2 className=" floatLeft h1 fontSize32"> {cqContent.label.DT_OD_CHECKOUT_SUMMARY_TITLE} </h2>
            </div>

            <div className="pad20 onlyTopPad">
              {this.props.devices.items.map((device, index) => (
                <div key={`orderSummaryDevice-${index}`}>
                  {/* Device Name */}
                  <div className="pad6 noSidePad">
                    <p className="bold fontSize_4"><span dangerouslySetInnerHTML={{ __html: device.manufactureName }} /> <span dangerouslySetInnerHTML={{ __html: device.deviceName }} /></p>
                  </div>
                  <div>
                    {/* Payment method */}
                    <div>
                      {/* Monthly Payment */}
                      {device.contractTerm === '99' &&
                        <Row className="pad6 noSidePad">
                          <Col xs={8}>
                            <p className="fontSize_3">24 Monthly device payments</p>
                          </Col>
                          <Col xs={4} className="fontSize_3">
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
                        <Row className="pad6 noSidePad">
                          <Col xs={8}>
                            <p className="fontSize_3">Retail Price Payment</p>
                          </Col>
                          <Col xs={4} className="fontSize_3">
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
                        <Row className="pad6 noSidePad">
                          <Col xs={8}>
                            <p className="fontSize_3">2-Year Agreement Price</p>
                          </Col>
                          <Col xs={4} className="fontSize_3">
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
                      <Row className="pad6 noSidePad">
                        <Col xs={8}>
                          <p className="fontSize_3">{device.protectionFeature.name}</p>
                        </Col>
                        <Col xs={4} className="fontSize_3">
                          {device.protectionFeature.price !== '-' && device.protectionFeature.originalPrice !== '-' && device.protectionFeature.hasEcpdDiscount ?
                            <div className="textAlignRight">
                              <div className="textDecLineThrough">${device.protectionFeature.originalPrice}/mo</div>
                              <div>${device.protectionFeature.price}/mo</div>
                            </div>
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
                          <Row className="pad6 noSidePad">
                            <Col xs={8}>
                              <p className="fontSize_3" dangerouslySetInnerHTML={{ __html: `${existingPlanExists.planDisplayName}` }} />
                            </Col>
                            <Col xs={4}>
                              <div className="textAlignRight fontSize_3">${existingPlanExists.dueMonthly}</div>
                            </Col>
                          </Row>
                        );
                      })
                    }
                  </div>
                  <hr />
                </div>
              ))}
            </div>

            <Row className="pad6 noSidePad">
              <Col xs={8}>
                <p className="bold fontSize_4">One time taxes and fees</p>
              </Col>
            </Row>

            {/* Upgrade Fee */}
            <Row className="pad6 noSidePad">
              <Col xs={8}>
                <span className="fontSize_3">{cqContent.label.DT_OD_CHECKOUT_SUMMARY_UPGRADE_FEE}</span>
                <ToolTip
                  className="margin3 onlyLeftMargin displayInlineBlock"
                  ariaLabel="Upgrade fee information tooltip"
                  text={cqContent.label.DT_OD_CHECKOUT_SUMMARY_UPGRADE_FEE_TOOLTIP}
                />
              </Col>
              <Col xs={4}>
                <p className="textAlignRight fontSize_3">${this.props.totalUpgradeFee}</p>
              </Col>
            </Row>

            {/* Surcharges */}
            <Row className="pad6 noSidePad">
              <Col xs={8}>
                <div>
                  <span className="fontSize_3">Surcharges</span>
                  <ToolTip
                    className="margin3 onlyLeftMargin displayInlineBlock"
                    text={this.props.totalOrderTaxTooltip}
                  />
                </div>
              </Col>
              <Col xs={4}>
                <p className="textAlignRight fontSize_3">${this.props.totalSurcharges}</p>
              </Col>
            </Row>

            {/* Taxes */}
            <Row className="pad6 noSidePad">
              <Col xs={8}>
                <div>
                  <span className="fontSize_3">Taxes</span>
                  <ToolTip
                    className="margin3 onlyLeftMargin displayInlineBlock"
                    text={this.props.totalOrderTaxTooltip}
                  />
                </div>
              </Col>
              <Col xs={4}>
                <p className="textAlignRight fontSize_3">${this.props.totalOrderTax}</p>
              </Col>
            </Row>

            {/* Shipping */}
            <Row className="pad6 noSidePad">
              <Col xs={8}>
                <p >{shipping.shippingTypeName}</p>
              </Col>
              <Col xs={4}>
                <p className="textAlignRight fontSize_3">{shipping.price > 0 ? `$${shipping.price} delivery` : 'Free'}</p>
              </Col>
            </Row>
            <hr className="border_black onlyBottomBorder" />


            {/* Promotional savings over 12/mo. */}
            {/* <Row className="pad6 noSidePad">
              <Col xs={9}>
                <p>Promotional savings over 12/mo.</p>
              </Col>
              <Col xs={3} className="noLeftPad">
                <p className="textAlignRight">$XX.XX/mo</p>
              </Col>
            </Row> */}

            {/* Total due today */}
            <Row className="pad6 noSidePad">
              <Col xs={8}>
                <p className="bold fontSize_4">Total due today</p>
              </Col>
              <Col xs={4}>
                <p className="bold fontSize_4 textAlignRight">${this.props.dueToday}</p>
              </Col>
            </Row>

            {/* Total due monthly */}
            <Row className="pad6 noSidePad">
              <Col xs={8}>
                <div>
                  <span className="bold fontSize_4">Total due monthly </span>
                  <ToolTip
                    className="margin3 onlyLeftMargin displayInlineBlock"
                    text={cqContent.label.DT_OD_CHECKOUT_SUMMARY_DUE_MONTHLY_DISCLAIMER}
                  />
                </div>
              </Col>
              <Col xs={4}>
                <p className="bold fontSize_4 textAlignRight">${this.props.dueMonthly}/mo.</p>
              </Col>
            </Row>

            <FAQ
              cqContent={cqContent}
              ispuSelected={ispuSelected}
            />
          </div>
        </Sticky>
      </div>
    );
  }
}

OrderSummary.propTypes = {
  cqContent: PropTypes.object,
  shipping: PropTypes.object,
  dueMonthly: PropTypes.string,
  dueToday: PropTypes.string,
  devices: PropTypes.object,
  totalSurcharges: PropTypes.string,
  totalOrderTax: PropTypes.string,
  totalOrderTaxTooltip: PropTypes.string,
  totalUpgradeFee: PropTypes.string,
  hllplan: PropTypes.bool,
  plans: PropTypes.object,
  ispuSelected: PropTypes.bool,
  plansTotalLAC: PropTypes.string,
};

export default OrderSummary;
