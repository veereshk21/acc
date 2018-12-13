import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import SelectListItem from './selectListItem';
import AsyncComponent from './../../../common/AsyncComponent';
import ToolTip from './../../../common/ToolTip';
import ListHeader from './listHeader';
import ListWrapper from './listWrapper';

const Modal = AsyncComponent(() => import('../../../common/Modal/index'));

class PlanListWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false, modalContent: '', toggler: [] };
  }

  onImpPlanInfo = (evt) => {
    evt.preventDefault();
    this.setState({
      modalOpen: true,
    });
    this.setState({
      modalContent: this.props.cqContent.html.DT_OD_IMPORTANT_PLAN_INFO_HTML,
    });
  }

  modalClose = () => {
    this.setState({
      modalOpen: false,
    });
  }
  render() {
    const {
      cqContent,
      plans,
      cpcOrder,
      itemOnJaxPlan,
      autoPayApplied,
      getPlanName,
      onDeviceListFeatureData,
    } = this.props;
    const deviceCount = cpcOrder ? (plans.upgradeDevices && plans.upgradeDevices.length) + (plans.newDevices && plans.newDevices.length) + (plans.existingDevices && plans.existingDevices.length) : '';
    const plansExist = (plans && (plans.items && plans.items.length > 0));
    if (!cpcOrder) {
      const eleObj = {};
      eleObj.featureTypeText = 'Show';
      eleObj.featureTypeCSS = 'hide';
      eleObj.displayFeatureType = false;
      eleObj.eleId = 0;
      this.state.toggler.push(eleObj);
    }
    return (
      <section className="plan_list color_black">
        {cpcOrder && plansExist &&
          <div>
            <Modal
              mounted={this.state.modalOpen}
              closeFn={this.modalClose}
              style={{ margin: 'auto', background: 'white', width: '50%' }}
              showCloseX
            >
              <div className="pad20">
                <div dangerouslySetInnerHTML={{ __html: this.state.modalContent }} />
                <div />
              </div>
            </Modal>
            {plans.items.map((plan, id) => {
              const eleObj = {};
              eleObj.featureTypeText = 'Show';
              eleObj.featureTypeCSS = 'hide';
              eleObj.displayFeatureType = false;
              eleObj.eleId = id;
              this.state.toggler.push(eleObj);
              return (<ListWrapper key={'plan-' + id} className="plan_list_item">
                <ListHeader
                  title={`Plan ${id + 1}`}
                  cqContent={cqContent}
                >
                  <Row key={`plan-${id}`} className="plan_list_item_details">
                    <Col xs={3} className="textAlignLeft">
                      {plan.planImageURL ?
                        <img className="maxWidth100" src={plan.planImageURL ? plan.planImageURL : getPlanName(plan.planType)} alt={plan.planDisplayName} />
                        :
                        ''
                      }
                    </Col>

                    <Col xs={9}>
                      <div>
                        <Row>
                          <Col xs className="deviceDescription">
                            <p className="bold fontSize_6">{plan.displayName}</p>
                            <p className="fontSize_4 color_black" dangerouslySetInnerHTML={{ __html: plan.planDescription }} />
                            {plan.accountAccess && <p>Your monthly plan cost is ${plan.accountAccess.hasEcpdDiscount ? plans.discountedDueMonthlyPlanWithLAC : plans.dueMonthlyPlanWithLAC}, which includes ${plan.accountAccess.hasEcpdDiscount ? plan.accountAccess.discountPrice : plan.accountAccess.price} for {deviceCount} phones</p>}
                            {(itemOnJaxPlan && autoPayApplied) &&
                              <div className="autopay margin12 onlyTopMargin">
                                <span className="bold">{cqContent.label.DT_OD_CONFIRMATION_AUTOPAY_DISCOUNT_APPLIED}</span>
                                <ToolTip
                                  className="margin3 onlyLeftMargin displayInlineBlock"
                                  header=""
                                  text={cqContent.label.DT_OD_CONFIRMATION_AUTOPAY_TOOLTIP}
                                />
                              </div>
                            }
                          </Col>
                          <Col xs className="devicePrices">
                            <Row>
                              <Col xs={6}>
                                {plans.discountedDueMonthlyPlanWithLAC &&
                                  <div className="color_black fontSize_3 bold">
                                    {(plans.discountedDueMonthlyPlanWithLAC > 0 && plans.dueMonthlyPlanWithLAC > plans.discountedDueMonthlyPlanWithLAC) ?
                                      <div className="textAlignRight">
                                        <span className="textDecLineThrough">{plan.dueMonthlyPlanWithLAC}</span>
                                        <span className="block">{plan.discountedDueMonthlyPlanWithLAC}</span>
                                      </div>
                                      :
                                      <div className="textAlignRight">${plans.dueMonthlyPlanWithLAC}</div>
                                    }
                                  </div>
                                }
                              </Col>
                              <Col xs={6}>
                                <div className="color_black fontSize_3 bold">
                                  <div className="textAlignRight"><span className="nil" /></div>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs className="deviceDescription">
                            <div className="pad12 noSidePad">
                              <SelectListItem
                                className={this.state.toggler[id].displayFeatureType ? 'expanded' : ''}
                                title={this.state.toggler[id].featureTypeText ? this.state.toggler[id].featureTypeText + cqContent.label.DT_OD_CONFIRMATION_PLAN_TOGGLE : 'Show' + cqContent.label.DT_OD_CONFIRMATION_PLAN_TOGGLE}
                                onClickMethod={(evt) => (onDeviceListFeatureData(this, id, evt))}
                              />
                            </div>
                          </Col>
                        </Row>
                        {plans.existingDevices && <div className={'clearfix features-content ' + (this.state.toggler[id].featureTypeCSS)}>
                          <Row>
                            <Col xs={12} className="clearfix pad10 color_black">
                              {plans.existingDevices.length > 0 &&
                                <div className="pad5 onlySidePad">Existing devices</div>
                              }
                            </Col>
                            <Col xs className="deviceDescription pad10 onlySidePad">
                              {plans.existingDevices.map((device, existingDeviceIndex) => (
                                <div key={`existingDevices-${existingDeviceIndex}`} className="clearfix features-content-inner">
                                  <div className="clearfix color_black pad5">
                                    <div className="pad5 onlySidePad" dangerouslySetInnerHTML={{ __html: device.name }} />
                                  </div>
                                </div>
                              ))}
                            </Col>
                            <Col xs className="devicePrices">
                              {plans.existingDevices.map((device) => (<Row>
                                <Col xs={6}>
                                  <div className="color_black fontSize_3 bold textAlignRight pad5">
                                    {device.hasEcpdDiscount ?
                                      <div>
                                        <span>${device.discountPrice}</span>
                                        <span className="textDecLineThrough">${device.price}</span>
                                      </div>
                                      :
                                      <span>${device.price}</span>
                                    }
                                  </div>
                                </Col>
                                <Col xs={6}>
                                  <div className="color_black fontSize_3 bold">
                                    <div className="textAlignRight"><span className="nil" /></div>
                                  </div>
                                </Col>
                              </Row>))}
                            </Col>
                          </Row>
                        </div>}
                        {plans.newDevices && <div className={'clearfix features-content ' + (this.state.toggler[id].featureTypeCSS)}>
                          <Row>
                            <Col xs={12} className="clearfix pad10 color_black">
                              {plans.newDevices.length > 0 &&
                                <div className="pad5 onlySidePad">New devices</div>
                              }
                            </Col>
                            <Col xs className="deviceDescription pad10 onlySidePad">
                              {plans.newDevices.map((device, newDeviceIndex) => (
                                <div key={`newDevices-${newDeviceIndex}`} className="clearfix features-content-inner">
                                  <div className="clearfix color_black pad5">
                                    <div className="pad5 onlySidePad" dangerouslySetInnerHTML={{ __html: device.name }} />
                                  </div>
                                </div>
                              ))}
                            </Col>
                            <Col xs className="devicePrices">
                              {plans.newDevices.map((device) => (<Row>
                                <Col xs={6}>
                                  <div className="color_black fontSize_3 bold textAlignRight pad5">
                                    {device.hasEcpdDiscount ?
                                      <div>
                                        <span>${device.discountPrice}</span>
                                        <span className="textDecLineThrough">${device.price}</span>
                                      </div>
                                      :
                                      <span>${device.price}</span>
                                    }
                                  </div>
                                </Col>
                                <Col xs={6}>
                                  <div className="color_black fontSize_3 bold">
                                    <div className="textAlignRight"><span className="nil" /></div>
                                  </div>
                                </Col>
                              </Row>))}
                            </Col>
                          </Row>
                        </div>}
                        {plans.upgradeDevices && <div className={'clearfix features-content ' + (this.state.toggler[id].featureTypeCSS)}>
                          <Row>
                            <Col xs={12} className="clearfix pad10 color_black">
                              {plans.upgradeDevices.length > 0 &&
                                <div className="pad5 onlySidePad">Upgrade devices</div>
                              }
                            </Col>
                            <Col xs className="deviceDescription pad10 onlySidePad">
                              {plans.upgradeDevices.map((device, upgradeDeviceIndex) => (
                                <div key={`upgradeDevices-${upgradeDeviceIndex}`} className="clearfix features-content-inner">
                                  <div className="clearfix color_black pad5">
                                    <div className="pad5 onlySidePad" dangerouslySetInnerHTML={{ __html: device.name }} />
                                  </div>
                                </div>
                              ))}
                            </Col>
                            <Col xs className="devicePrices">
                              {plans.upgradeDevices.map((device) => (<Row>
                                <Col xs={6}>
                                  <div className="color_black fontSize_3 bold textAlignRight pad5">
                                    {device.hasEcpdDiscount ?
                                      <div>
                                        <span>${device.discountPrice}</span>
                                        <span className="textDecLineThrough">${device.price}</span>
                                      </div>
                                      :
                                      <span>${device.price}</span>
                                    }
                                  </div>
                                </Col>
                                <Col xs={6}>
                                  <div className="color_black fontSize_3 bold">
                                    <div className="textAlignRight"><span className="nil" /></div>
                                  </div>
                                </Col>
                              </Row>))}
                            </Col>
                          </Row>
                        </div>}
                        <p className="textDecUnderline color_black clearfix pointer" analyticstrack="importantPlanInfo-CTA" onClick={this.onImpPlanInfo.bind(this)}>{cqContent.label.DT_OD_CONFIRMATION_IMPORTANT_PLAN_INFO}</p>
                      </div>
                    </Col>
                  </Row>
                </ListHeader>
              </ListWrapper>
              );
            }
            )}
          </div>
        }
        {!cpcOrder && plansExist && (plans.items[0].lineAccessCharges && plans.items[0].lineAccessCharges.length > 0) &&
          <ListWrapper className="plan_list_item">
            <Row>
              <Col xs={3}>
                <div className="pad12 noSidePad">
                  <SelectListItem
                    className={this.state.toggler[0].displayFeatureType ? 'expanded' : ''}
                    title={this.state.toggler[0].featureTypeText ? this.state.toggler[0].featureTypeText + cqContent.label.DT_OD_CONFIRMATION_PLAN_ONLY_TOGGLE : 'Show' + cqContent.label.DT_OD_CONFIRMATION_PLAN_ONLY_TOGGLE}
                    onClickMethod={(evt) => (onDeviceListFeatureData(this, 0, evt))}
                  />
                </div>
              </Col>
              <Col xs={9}>
                <div className={'clearfix pad30 onlyTopPad features-content ' + (this.state.toggler[0].featureTypeCSS)}>
                  <Row>
                    <Col xs className="deviceDescription">
                      {plans.items.map((plan, planIndex) => (plan.lineAccessCharges.map((planItem, lacIndex) => (
                        <div key={`plan-${planIndex}-lac-${lacIndex}`} className="clearfix features-content-inner">
                          <div className="clearfix color_black pad5 noSidePad">
                            <div className="textAlignLeft" dangerouslySetInnerHTML={{ __html: `${planItem.name ? planItem.name : ''}` }} />
                          </div>
                        </div>
                      ))))}
                    </Col>
                    <Col xs className="devicePrices">
                      <Row>
                        <Col xs={6}>
                          {plans.items.map((plan) => (plan.lineAccessCharges.map((planItem) => (<div className="color_black fontSize_3 bold textAlignRight">
                            {planItem.hasEcpdDiscount ?
                              <div>
                                <span>${planItem.discountPrice}</span>
                                <span className="textDecLineThrough">${planItem.price}</span>
                              </div>
                              :
                              <span>${planItem.price}</span>
                            }
                          </div>))))}
                        </Col>
                        <Col xs={6}>
                          <div className="color_black fontSize_3 bold">
                            <div className="textAlignRight"><span className="nil" /></div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </ListWrapper>
        }
      </section>
    );
  }
}


PlanListWrapper.propTypes = {
  cqContent: PropTypes.object,
  plans: PropTypes.object,
  cpcOrder: PropTypes.bool,
  itemOnJaxPlan: PropTypes.bool,
  autoPayApplied: PropTypes.bool,
  getPlanName: PropTypes.func,
  onDeviceListFeatureData: PropTypes.func,
};
export default PlanListWrapper;
