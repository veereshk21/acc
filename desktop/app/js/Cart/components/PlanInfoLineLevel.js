import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
} from 'react-flexbox-grid';
import Anchor from './../../common/A/A';
import Modal from '../../common/Modal/index';
import Tooltip from './../../common/ToolTip/index';
import ItemHeader from './ItemHeader';
import ItemWrapper from './ItemWrapper';

class PlanInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { showImportantPlanInfoModal: false };
  }

  toggleModal() {
    const isVisible = this.state.showImportantPlanInfoModal;
    this.setState({ showImportantPlanInfoModal: !isVisible });
  }

  planDetailsDisplay(plan, cqContent, itemOnJaxPlan, existingPlan) {
    return (
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
                (plan.planSize && plan.unitOfMeasure) && <div>
                  <div className="fontDisplayBold fontSize_12 color_000">{plan.planSize}</div>
                  <div className="fontSize_11 color_000">{plan.unitOfMeasure}</div>
                </div>
              }
            </Col>
          </Row>
        </Col>
        <Col md={10} lg={10}>
          <Row>
            <Col md={7} lg={7}>
              <p className="fontSize_7 fontDisplayBold">{plan.planType}</p>
              {(plan.accountAccess.discountPrice && parseFloat(plan.accountAccess.discountPrice) > 0) &&
                <p className="margin12 onlyTopMargin">Line level discount</p>
              }
              {(plan.subsidyIndicator && plan.subsidyCost && parseFloat(plan.subsidyCost) > 0) &&
                <p className="margin12 onlyTopMargin">Including subsidy cost ${plan.subsidyCost}</p>}
              <p
                className="margin12 onlyTopMargin"
                dangerouslySetInnerHTML={{ __html: plan.planDescription }}
              />
              {plan.autoPayText && <div className="margin12 onlyTopMargin">
                <span className="fontDisplayBold" dangerouslySetInnerHTML={{ __html: plan.autoPayText }} />
                <span className="a11y-tooltip" />
                <Tooltip
                  hideHeader="true"
                  direction="bottom"
                  className="margin3 onlyLeftMargin fontSize_4 cartAutopayTooltip"
                  header=""
                  text={cqContent.label.DT_OD_AUTOPAY_TOOLTIP}
                />
              </div>}
              {plan.appleMusicMessage &&
                <div className="margin12 onlyTopMargin" dangerouslySetInnerHTML={{ __html: plan.appleMusicMessage }} />
              }
              <Anchor
                tabIndex="0"
                className="margin12 onlyTopMargin color_333 fontSize_4 block"
                onClick={() => { this.props.asyncFetch(); window.location.href = existingPlan && existingPlan.changePlanUrl; }}
                analyticstrack="change-plan-cta"
              >{cqContent.label.DT_OD_CHANGE_PLAN_CTA_TEXT}</Anchor>

              <Anchor
                tabIndex="0"
                className="margin12 onlyTopMargin color_333 textDecUnderline fontSize_4 block"
                href="#"
                onClick={() => {
                  this.toggleModal();
                }}
                analyticstrack="important-plan-info-link"
              >{cqContent.label.DT_OD_CART_IPI_CTA_TEXT}</Anchor>

            </Col>
            {itemOnJaxPlan === false &&
              <Col md={5} lg={5}>
                <Row>
                  <Col md={6} lg={6} className="textAlignCenter">
                    <p className="textAlignRight fontDisplayBold">${plan.dueMonthlyOriginal}</p>
                    {(plan.accountAccess.discountPrice && parseFloat(plan.accountAccess.discountPrice) > 0) &&
                      <p className="margin12 onlyTopMargin textAlignRight">-${plan.accountAccess.discountPrice}</p>
                    }
                  </Col>
                  <Col md={6} lg={6} className="textAlignRight fontDisplayBold">
                    <p className="pad30 onlyRightPad">--</p>
                    {(plan.accountAccess.discountPrice && parseFloat(plan.accountAccess.discountPrice) > 0) &&
                      <p className="margin12 onlyTopMargin pad30 onlyRightPad">--</p>
                    }
                  </Col>
                </Row>
              </Col>}
          </Row>

        </Col>
      </Row>
    );
  }

  render() {
    const { cqContent, itemOnJaxPlan, lineLevelPlan, deviceInfo } = this.props;
    const {
      items, existingDevices,
    } = this.props.plans;
    // const totalDevices = (newDevices && newDevices.length) + (upgradeDevices && upgradeDevices.length) + (existingDevices && existingDevices.length);
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

        {lineLevelPlan ?
          <section>
            {existingDevices && existingDevices.map((plan, id) =>
              this.props.plans.items.map((planItem) => (planItem.planCommerceItemId === plan.planCommerceItemId) &&
                <ItemWrapper key={id}>
                  <ItemHeader
                    title={plan.nickName}
                    cqContent={cqContent}
                  >
                    {this.planDetailsDisplay(planItem, cqContent, itemOnJaxPlan, plan)}
                  </ItemHeader>
                </ItemWrapper>
              )
            )}
          </section> :
          <section>
            {items.map((plan, id) => (<div key={id}>
              {this.planDetailsDisplay(plan, cqContent, itemOnJaxPlan, deviceInfo)}
            </div>))}
          </section>
        }
      </div>);
  }
}

PlanInfo.propTypes = {
  cqContent: PropTypes.object,
  plans: PropTypes.object,
  itemOnJaxPlan: PropTypes.bool,
  deviceInfo: PropTypes.object,
  lineLevelPlan: PropTypes.bool,
  asyncFetch: PropTypes.func,
};
export default PlanInfo;
