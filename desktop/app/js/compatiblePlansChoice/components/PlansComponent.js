import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';
import ToolTip from './../../common/ToolTip/index';

export default class PlanComponent extends React.Component {
  static propTypes = {
    plans: PropTypes.array.isRequired,
    selectedPlanSorId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    onPlanSelected: PropTypes.func,
    cqKeys: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.selectPlan = this.selectPlan.bind(this);
  }

  selectPlan(event, plan) {
    event.preventDefault();
    const char = event.which || event.keyCode;
    if (event.type === 'click' || (event.type === 'keypress' && (char === 13 || char === 32))) {
      this.props.onPlanSelected(plan);
    }
  }
  render() {
    const { plans, cqKeys, selectedPlanSorId } = this.props;
    const colSize = (plans.length > 3) ? (12 / plans.length) : 4;
    return (
      <Row className="pad10 onlySidePad" >
        {
          plans.map((plan, i) => (
            <Col
              xs={colSize}
              key={`plan-${i}`}

            >
              <Row
                style={{ margin: 0, padding: 12, height: '501px' }}
                className={'outlineFocus pad10 compatiblePlansWrap border_CC ' + ((selectedPlanSorId === plan.planSorId) ? 'is-active largeBorder_black' : '')}
                data-plansorid={plan.planSorId}
                onClick={(event) => {
                  this.selectPlan(event, plan);
                }}
                analyticstrack="select-eachPlan-sliderCTA"
                onKeyPress={(event) => {
                  this.selectPlan(event, plan);
                }}
                role="presentation"
                tabIndex="0"
                key={'swiper-plan-' + i}
              >
                <Col xs={12} >
                  <div className="fontSize_7 fontDisplayBold pad10 noSidePad">
                    {plan.jaxPlan ? <span dangerouslySetInnerHTML={{ __html: plan.capacity }} /> : plan.capacityDesc}
                  </div>

                </Col>
                <Col xs={12} style={{ height: 48 }}>
                  <Row>
                    <Col xs={12} md={12} lg={8}>
                      <div dangerouslySetInnerHTML={{ __html: plan.planDesc }} className="fontSize_4" />
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} style={{ paddingTop: 20, height: 130, marginBottom: 33 }}>
                  <Row>
                    <Col xs={12}>
                      <span className="bold headingFeature">${(plan.discounted && plan.totalDiscountedPlanPrice) ? plan.totalDiscountedPlanPrice : Math.trunc(plan.totalPlanPrice)}</span><span className="fontSize_7">/mo</span>
                    </Col>
                    <Col xs={12}>
                      {plan.jaxPlan ?
                        <p className="fontSize_1">
                          Includes plan access fees.
                        </p> :
                        <div className="fontSize_1">
                          <p className="fontSize_1"> Includes account & line access fees.</p>
                          <p className="fontSize_1">Doesn&apos;t include taxes & fees. </p>
                        </div>
                      }
                      <div>
                        {plan.autopayNotification &&
                          <div className="pad12 onlyTopPad">
                            <span className="fontSize_1">{cqKeys.label.DT_OD_PLAN_AUTOPAY_TEXT}</span> <span className="a11y-tooltip" />
                            <ToolTip
                              hideHeader="true"
                              direction="bottom"
                              className="margin3 onlyLeftMargin fontSize_4 cpc_tooltop"
                              header=""
                              text={cqKeys.label.DT_OD_PLAN_AUTOPAY_TOOLTIP}
                            />
                          </div>
                        }
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col xs={12} >
                  <hr className="border_black onlyTopBorder" />
                </Col>
                <Col className="margin6" style={{ paddingBottom: 112 }}>
                  <div className="bold margin6 onlyBottomMargin fontSize_4">Includes:</div>
                  <div className="fontSize_4" dangerouslySetInnerHTML={{ __html: plan.dataAllowance + ' ' + cqKeys.label.DT_OD_PREMIUM_DATA }} />
                  <div className="fontSize_4 margin18 onlyBottomMargin" dangerouslySetInnerHTML={{ __html: cqKeys.label.DT_OD_PLAN_INFORMATION }} />
                  {!plan.jaxPlan &&
                    <div className="fontSize_1">Data overage: $15 per GB</div>
                  }
                </Col>
              </Row>
            </Col>

          ))
        }
      </Row>
    );
  }
}
