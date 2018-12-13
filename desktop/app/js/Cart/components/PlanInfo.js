import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  Col,
  Row,
} from 'react-flexbox-grid';
import Anchor from './../../common/A/A';
import Modal from '../../common/Modal/index';
import Tooltip from './../../common/ToolTip/index';

class PlanInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { showImportantPlanInfoModal: false };
  }

  getPlanName(plan) {
    // TODO: Should have plan capacity coming from backend post 4/24, need to revisit the code and make the changes
    let planCapacity = plan.match(/\d/g);
    if (planCapacity) {
      planCapacity = planCapacity.join('');
      return (
        <div>
          <div className="bold fontSize_13 color_000">{planCapacity}</div>
          <div className="fontSize_13 color_000">{this.props.cqContent.label.DT_OD_GB_TEXT}</div>
        </div>
      );
    }
    return (<div />);
  }

  toggleModal() {
    const isVisible = this.state.showImportantPlanInfoModal;
    this.setState({ showImportantPlanInfoModal: !isVisible });
  }

  render() {
    const { cqContent, itemOnJaxPlan, autoPayApplied } = this.props;
    const {
      items, newDevices, upgradeDevices, existingDevices,
    } = this.props.plans;
    const totalDevices = (newDevices && newDevices.length) +
      (upgradeDevices && upgradeDevices.length) +
      (existingDevices && existingDevices.length);

    return (
      <div className="fontSize_4">
        <Modal
          mounted={this.state.showImportantPlanInfoModal}
          closeFn={() => { this.toggleModal(); }}
          showCloseX
        >
          <div
            dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CART_IMPORTANT_PLAN_INFORMATION }}
          />
        </Modal>

        {items.map((plan, id) => (<div key={id}>
          <Row>
            <Col md={2} lg={2} className="textAlignCenter">
              <Row>
                <Col md={12} lg={9}>
                  {plan.planImageURL ?
                    <img
                      className="maxWidth100"
                      src={plan.planImageURL} alt={plan.planType}
                      itemProp="image"
                    /> :
                    this.getPlanName(plan.planType)
                  }
                </Col>
              </Row>
            </Col>
            <Col md={10} lg={10}>
              <Row>
                <Col md={7} lg={7}>
                  <p className="bold fontSize_5">{plan.planType}</p>
                  <p
                    className=""
                    dangerouslySetInnerHTML={{ __html: plan.planDescription }}
                  />
                  {itemOnJaxPlan &&
                    <p className="margin12 onlyTopMargin">
                      {`Your monthly plan cost is $${plan.accountAccess.price}, which includes $${plan.accountAccess.planAmount} for ${totalDevices}`} {`${totalDevices > 1 ? 'phones' : 'phone'}`}.
                    </p>
                  }
                  {itemOnJaxPlan && autoPayApplied &&
                    <div className="margin12 onlyTopMargin">
                      <span className="bold" style={{ color: '#0088ce' }}>{cqContent.label.DT_OD_AUTOPAY_DISCOUNT_APPLIED}</span> <span className="a11y-tooltip" />
                      <Tooltip
                        hideHeader="true"
                        direction="bottom"
                        className="margin3 onlyLeftMargin fontSize_4 cartAutopayTooltip"
                        header=""
                        text={cqContent.label.DT_OD_AUTOPAY_TOOLTIP}
                      />
                    </div>
                  }
                  {itemOnJaxPlan && !autoPayApplied &&
                    <div className="margin12 onlyTopMargin">
                      <span className="bold" style={{ color: '#0088ce' }}>{cqContent.label.DT_OD_AUTOPAY_DISCOUNT}</span> <span className="a11y-tooltip" />
                      <Tooltip
                        hideHeader="true"
                        direction="bottom"
                        className="margin3 onlyLeftMargin fontSize_4 cartAutopayTooltip"
                        header=""
                        text={cqContent.label.DT_OD_AUTOPAY_TOOLTIP}
                      />
                    </div>
                  }
                  <Anchor
                    tabIndex="0"
                    className="margin12 onlyTopMargin color_333 fontSize_4 block"
                    href={plan.planChangeURL}
                    analyticstrack="change-plan-link"
                  >{cqContent.label.DT_OD_CHANGE_PLAN_CTA_TEXT}</Anchor>

                  <Anchor
                    tabIndex="0"
                    className="margin12 onlyTopMargin color_333 textDecUnderline fontSize_4 block"
                    onClick={() => {
                      this.toggleModal();
                    }}
                    analyticstrack="important-plan-info-link"
                  >{cqContent.label.DT_OD_CART_IPI_CTA_TEXT}</Anchor>

                </Col>
                {itemOnJaxPlan === false && <Col md={5} lg={5}>
                  <Row>
                    <Col md={6} lg={6} className="textAlignRight bold">
                      <span>${plan.accountAccess.price}</span>
                    </Col>
                    <Col md={6} lg={6} className="textAlignRight bold">
                      <span className="pad30 onlyRightPad">--</span>
                    </Col>
                  </Row>
                </Col>}
              </Row>

            </Col>
          </Row>
        </div>))}


        <Row>
          <Col md={10} lg={10} mdOffset={2} lgOffset={2}>

            {newDevices && newDevices.length > 0 &&
            <div className="margin18 onlyTopMargin">
              <p
                className="bold margin6 noSideMargin"
              >{cqContent.label.DT_OD_CART_PLAN_NEW_DEVICES_TEXT}</p>
              {newDevices.map((device, id) => (
                <div key={id} className="margin6 onlyBottomMargin">
                  <Row>
                    <Col md={7} lg={7}>
                      <p dangerouslySetInnerHTML={{ __html: device.name }} />
                    </Col>
                    <Col md={5} lg={5}>
                      <Row>
                        <Col md={6} lg={6}>
                          <div className="textAlignRight">
                            {device.hasEcpdDiscount ?
                              <span>
                                <span className="bold">${device.discountPriceVal}</span>
                                <span className="textDecLineThrough block">${device.price}</span>
                              </span>
                              :
                              <span className="bold">${device.price}</span>
                            }
                          </div>
                        </Col>
                        <Col md={6} lg={6} className="textAlignRight bold">
                          <span className="pad30 onlyRightPad">--</span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>))}
            </div>}
            {upgradeDevices && upgradeDevices.length > 0 &&
            <div className="margin18 onlyTopMargin">
              <p
                className="bold margin6 noSideMargin"
              >{cqContent.label.DT_OD_CART_PLAN_UPGRADE_DEVICES_TEXT}</p>
              {upgradeDevices.map((device, id) => (
                <div key={id} className="margin6 onlyBottomMargin">
                  <Row>
                    <Col md={7} lg={7}>
                      <p dangerouslySetInnerHTML={{ __html: device.name }} />
                    </Col>
                    <Col md={5} lg={5}>
                      <Row>
                        <Col md={6} lg={6}>
                          <div className="textAlignRight">
                            {device.hasEcpdDiscount ?
                              <span>
                                <span className="bold">${device.discountPriceVal}</span>
                                <span className="textDecLineThrough block">${device.price}</span>
                              </span>
                              :
                              <span className="bold">${device.price}</span>
                            }
                          </div>
                        </Col>
                        <Col md={6} lg={6} className="textAlignRight bold">
                          <span className="pad30 onlyRightPad">--</span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>))}
            </div>}
            {existingDevices && existingDevices.length > 0 &&
            <div className="margin18 onlyTopMargin">
              <p
                className="bold margin6 noSideMargin"
              >{cqContent.label.DT_OD_CART_PLAN_EXISTING_DEVICES_TEXT}</p>
              {existingDevices.map((device, id) => (
                <div key={id} className="margin6 onlyBottomMargin">
                  <Row>
                    <Col md={7} lg={7}>
                      <p dangerouslySetInnerHTML={{ __html: device.name }} />
                    </Col>
                    <Col md={5} lg={5}>
                      <Row>
                        <Col md={6} lg={6}>
                          <div className="textAlignRight">
                            {device.hasEcpdDiscount ?
                              <span>
                                <span className="bold">${device.discountPriceVal}</span>
                                <span className="textDecLineThrough block">${device.price}</span>
                              </span>
                              :
                              <span className="bold">${device.price}</span>
                            }
                          </div>
                        </Col>
                        <Col md={6} lg={6} className="textAlignRight bold">
                          <span className="pad30 onlyRightPad">--</span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>))}
            </div>}


          </Col>
        </Row>
      </div>);
  }
}

PlanInfo.propTypes = {
  cqContent: PropTypes.object,
  plans: PropTypes.object,
  itemOnJaxPlan: PropTypes.bool,
  autoPayApplied: PropTypes.bool,
};
export default PlanInfo;
