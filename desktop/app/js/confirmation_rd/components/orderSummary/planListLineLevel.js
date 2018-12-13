import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
} from 'react-flexbox-grid';

import AsyncComponent from './../../../common/AsyncComponent';
import Anchor from './../../../common/A/A';
import ToolTip from './../../../common/ToolTip';
import ListHeader from './listHeader';
import ListWrapper from './listWrapper';

const Modal = AsyncComponent(() => import('../../../common/Modal/index'));

class PlanInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { showImportantPlanInfoModal: false };
  }

  toggleModal() {
    const isVisible = this.state.showImportantPlanInfoModal;
    this.setState({ showImportantPlanInfoModal: !isVisible });
  }

  planDetailsDisplay(plan, cqContent, itemOnJaxPlan) {
    return (
      <Row className="plan_list_item">
        <Col xs={3} className="textAlignCenter">
          {(plan.planImageURL) ?
            <img
              className="maxWidth100"
              src={plan.planImageURL} alt={plan.planType}
              itemProp="image"
            />
            :
            (plan.planSize && plan.unitOfMeasure) && <div className="width75">
              <div className="bold fontSize_12 color_000">{plan.planSize}</div>
              <div className="fontSize_11 color_000">{plan.unitOfMeasure}</div>
            </div>

          }
        </Col>
        <Col xs={5} >
          <div>
            {plan.planDisplayName && plan.planDisplayName.split(' ').length && plan.planDisplayName.split(' ')[1].toLowerCase() === 'unlimited' ?
              <p className="bold fontSize_8">
                <span className="color_red">{plan.planDisplayName.split(' ')[0].toLowerCase()}</span>&nbsp;
                <span className="prxCheckMark">{plan.planDisplayName.split(' ')[1].toLowerCase()}</span>
              </p>
              :
              <p className="bold fontSize_8">{plan.planDisplayName}</p>
            }
            {(plan.itemDiscount && parseFloat(plan.itemDiscount) > 0) &&
              <p dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_LINE_LEVEL_DISCOUNT }} />
            }
            <p
              className="margin12 onlyTopMargin"
              dangerouslySetInnerHTML={{ __html: plan.planDescription }}
            />
            {(plan.autoPayText) && <div className="autopay margin12 onlyTopMargin">
              <span dangerouslySetInnerHTML={{ __html: plan.autoPayText }} />
              <ToolTip
                className="margin3 onlyLeftMargin displayInlineBlock"
                header=""
                text={cqContent.label.DT_OD_CONFIRMATION_AUTOPAY_TOOLTIP}
              />
            </div>
            }
            <Anchor
              className="margin12 onlyTopMargin color_333 textDecUnderline fontSize_4 block"
              onClick={() => {
                this.toggleModal();
              }}
            >{cqContent.label.DT_OD_CONFIRMATION_IMPORTANT_PLAN_INFO}</Anchor>
          </div>
        </Col>
        {itemOnJaxPlan === false && <Col md={4} lg={4}>
          <Row>
            <Col md={6} lg={6} className="textAlignRight color_black fontSize_3 bold">
              {plan.dueMonthly &&
                <div className="color_black fontSize_3 bold">
                  {(plan.itemDiscount && parseFloat(plan.itemDiscount) > 0) ?
                    <div className="textAlignRight">
                      <div>${plan.dueMonthlyOriginal}</div>
                      <div className="margin12 noSideMargin">-${plan.itemDiscount}</div>
                    </div>
                    :
                    <div className="textAlignRight">${plan.dueMonthly}</div>
                  }
                </div>
              }
            </Col>
            <Col md={6} lg={6} className="textAlignRight bold">
              <span className="nil" />
            </Col>
          </Row>
        </Col>}
      </Row>
    );
  }

  render() {
    const { cqContent, itemOnJaxPlan, lineLevelPlan, plans } = this.props;
    const {
      items, existingDevices,
    } = this.props.plans;
    return (
      <div className="fontSize_4">
        <Modal
          mounted={this.state.showImportantPlanInfoModal}
          closeFn={() => { this.toggleModal(); }}
          style={{ margin: 'auto', background: 'white', width: '50%' }}
          showCloseX
        >
          <div
            dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_IMPORTANT_PLAN_INFO_HTML }}
          />
        </Modal>

        {lineLevelPlan &&
          <section>
            {existingDevices.map((existingDevice, id) => {
              const planItem = plans.items.filter((item) => item.planCommerceItemId === existingDevice.planCommerceItemId)[0];
              return (
                planItem &&
                <ListWrapper key={id}>
                  <ListHeader
                    title={existingDevice.nickName}
                    cqContent={cqContent}
                  >
                    {this.planDetailsDisplay(planItem, cqContent, itemOnJaxPlan)}
                  </ListHeader>
                </ListWrapper>

              );
            })}
          </section>
        }
        {!lineLevelPlan &&
          <section>
            {items.map((planItem, id) => (<div key={id}>
              {this.planDetailsDisplay(planItem, cqContent, itemOnJaxPlan)}
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
  lineLevelPlan: PropTypes.bool,
};
export default PlanInfo;
