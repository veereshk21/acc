import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { normalizePhoneNumber } from '../../common/validation';
import AsyncComponent from '../../common/AsyncComponent';

const DataOptions = AsyncComponent(() => import('./DataOptions'));
const MessageOptions = AsyncComponent(() => import('./MessageOptions'));
const ToolTip = AsyncComponent(() => import('../../common/ToolTip/index'));
const SelectListItem = AsyncComponent(() => import('./SelectListItem'));


class PlanDetails extends Component {
  static propTypes = {
    currentPlanDetails: PropTypes.object,
    cq: PropTypes.object.isRequired,
    isNationwide: PropTypes.bool,
    isMonthlyAccessDiscount: PropTypes.bool,
    isLineAccessDiscount: PropTypes.bool,
    monthlyDiscountPrice: PropTypes.string,
    planName: PropTypes.string,
    planPrice: PropTypes.string,
    viewState: PropTypes.bool,
    totalCost: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      displayLineAccess: props.isNationwide,
    };
  }

  toggleDisplayLineAccess(e) {
    e.preventDefault();
    this.setState({ displayLineAccess: !this.state.displayLineAccess });
  }

  renderPlanCost(data) {
    const { deviceJson, deviceLbl } = data;
    const html = (deviceJson.map((item) => (
      <div className="clearfix margin12 noSideMargin">
        {(item.cost && parseFloat(item.cost) > 0) &&
        <div className="dueMonthlyBreakdown margin12 onlyLeftMargin fontSize_4 color_gray_ten">
          <Row className="section group pad18 onlyLeftPad clearfix">
            <Col xs={3} className="noBottomMargin" dangerouslySetInnerHTML={{ __html: deviceLbl || normalizePhoneNumber(item.mtn) }} />
            <Col xs={5} className="noBottomMargin" dangerouslySetInnerHTML={{ __html: item.deviceName }} />
            <Col xs={4} className="noBottomMargin textAlignRight floatRight">
              {(parseFloat(item.discountCost) > 0 && parseFloat(item.cost) > parseFloat(item.discountCost)) ?
                <span>
                  <span className="textDecLineThrough">${item.cost}</span>
                  <span className="bold">&nbsp;${item.discountCost}/mo.</span>
                </span>
                :
                <span className="bold">${item.cost}/mo.</span>
              }
            </Col>
          </Row>
        </div>}
        {this.props.isNationwide && item.dataFeatures && item.dataFeatures.length > 0 &&
          <DataOptions dataOptions={item.dataFeatures} cq={this.props.cq} mtn={item.mtn} />
        }
        {this.props.isNationwide && item.msgFeatures && item.msgFeatures.length > 0 &&
          <MessageOptions messageOptions={item.msgFeatures} cq={this.props.cq} mtn={item.mtn} />
        }
      </div>
    )));
    return <div className="margin5 onlyBottomMargin">{html}</div>;
  }

  render() {
    const {
      cq,
      currentPlanDetails,
      isMonthlyAccessDiscount,
      isLineAccessDiscount,
      planName,
      planPrice,
      monthlyDiscountPrice,
      viewState,
      totalCost,
    } = this.props;
    const { displayLineAccess } = this.state;
    const { monthlyLineAccessDetails } = currentPlanDetails;

    const { newDevices, upgradeDevices, existingDevices } = monthlyLineAccessDetails;
    const newDeviceLbl = cq.label.DT_OD_CPC_INTERCEPT_NEW_DEVICE;


    return (
      <div className="pad30 noBottomPad positionRelative margin24 onlyBottomMargin clearfix background_gray_one">
        <div>
          <section>
            <Row bottom="xs" className="margin10 onlyTopMargin">
              <Col xs={9}>
                <div className="m-noTooltipHdr fontSize_9">
                  <span className="bold pad5 onlyRightPad" dangerouslySetInnerHTML={{ __html: cq.label.DT_OD_CPC_INTERCEPT_MONTHLY_ACCOUNT_ACCESS }} />
                  <ToolTip className="cpcPromptTooltip onlyLeftMargin fontSize_6" noRenderHTML text={cq.label.DT_OD_CPC_INTERCEPT_MONTHLY_ACCOUNT_ACCESS_TIP} />
                </div>
                <div className="pad4 onlyTopPad fontSize_4 color_gray_ten margin12 noSideMargin" dangerouslySetInnerHTML={{ __html: planName }} />
              </Col>
              <Col xs={3} className="textAlignRight">
                <div className="">
                  {isMonthlyAccessDiscount ?
                    <span>
                      was&nbsp;<span className="textDecLineThrough"> ${planPrice}</span>&nbsp;
                      <span className="bold">${monthlyDiscountPrice}/mo.</span>
                    </span> : <span className="bold">${planPrice}/mo.</span>
                  }
                </div>
              </Col>
            </Row>
            <Row bottom="xs" className="margin20 onlyTopMargin">
              <Col xs={12}>
                <div className="m-noTooltipHdr fontSize_9 margin15 noSideMargin pad5 onlyBottomPad">
                  <span className="bold pad5 onlyRightPad" dangerouslySetInnerHTML={{ __html: cq.label.DT_OD_CPC_INTERCEPT_MONTHLY_LINE_ACCESS }} />
                  <ToolTip className="cpcPromptTooltip onlyLeftMargin fontSize_6" noRenderHTML text={cq.label.DT_OD_CPC_INTERCEPT_MONTHLY_LINE_ACCESS_TIP} />
                </div>
                <div className="fontSize_4 color_gray_ten">{monthlyLineAccessDetails.noDevice} <span className="pad4 onlyLeftPad">{cq.label.DT_OD_CPC_INTERCEPT_DEVICE_TEXT}</span></div>
              </Col>
            </Row>
          </section>
          <section className="fontSize_5 margin4 onlyTopMargin plainList">
            <Row>
              <Col xs={10} className="margin5 onlyTopMargin">
                <SelectListItem className={displayLineAccess ? 'expanded' : ''} title={cq.label.DT_OD_CPC_INTERCEPT_BREAKDOWN_TITLE} analyticstrack="select-lineAccess-listLink" onClickMethod={this.toggleDisplayLineAccess.bind(this)} />
              </Col>
              <Col xs={2} className="textAlignRight">
                <div className="">
                  {isLineAccessDiscount ?
                    <span>
                      was&nbsp;<span className="textDecLineThrough"> ${currentPlanDetails.monthlyLineAccessDetails.totalMonthlyLineAccessCost}</span>&nbsp;
                      <span className="bold">${currentPlanDetails.monthlyLineAccessDetails.totalMonthlyLineAccessDiscountCost}/mo.</span>
                    </span> : <span className="bold">${currentPlanDetails.monthlyLineAccessDetails.totalMonthlyLineAccessCost}/mo.</span>
                  }
                </div>
              </Col>
            </Row>
            {displayLineAccess &&
              <div className="clearfix t-pad listStyleNone margin20 onlyBottomMargin">
                {newDevices &&
                  <section className="section group pad18 onlyLeftPad clearfix">
                    <span className="bold col span_4_of_5 noBottomMargin pad5 onlyBottomPad fontSize_6" dangerouslySetInnerHTML={{ __html: cq.label.DT_OD_CPC_INTERCEPT_NEW_DEVICES_TITLE }} />
                  </section>
                }
                {newDevices && this.renderPlanCost({ deviceJson: newDevices, deviceLbl: newDeviceLbl })}
                {upgradeDevices &&
                  <section className="section group pad18 onlyLeftPad clearfix">
                    <span className="bold col span_4_of_5 noBottomMargin pad5 onlyBottomPad fontSize_6" dangerouslySetInnerHTML={{ __html: cq.label.DT_OD_CPC_INTERCEPT_UPGRADE_DEVICES_TITLE }} />
                  </section>
                }
                {upgradeDevices && this.renderPlanCost({ deviceJson: upgradeDevices })}
                {existingDevices &&
                  <section className="section group pad18 onlyLeftPad clearfix">
                    <span className="bold col span_4_of_5 noBottomMargin pad5 onlyBottomPad fontSize_6" dangerouslySetInnerHTML={{ __html: cq.label.DT_OD_CPC_INTERCEPT_EXISTING_DEVICES }} />
                  </section>
                }
                {existingDevices && this.renderPlanCost({ deviceJson: existingDevices })}
              </div>
            }
          </section>
          <Row className="fontSize_9 margin30 onlyTopMargin border_grayThree onlyTopBorder pad10 noSidePad">
            <Col xs={10} className="pad10 onlyBottomPad">
              <span className="bold" dangerouslySetInnerHTML={{ __html: cq.label.DT_OD_CPC_INTERCEPT_TOTAL_MONTHLY_COST }} />
            </Col>
            <Col xs={2} className="textAlignRight">
              <span className="bold">
                ${!viewState ? totalCost : currentPlanDetails.totalMonthlyAccessCostForAllDevices}/mo.
              </span>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default PlanDetails;
