import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import ToolTip from './../../common/ToolTip/index';

class SeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { allPlans, cqModal, selectedPlan } = this.props;
    const xsLength = allPlans.length;
    const xs = Math.round(12 / xsLength);
    return (
      <div>
        <Row>
          <Col sm={8} md={5} lg={5}>
            <h2 className="fontSize_7">Compare plans.</h2>
          </Col>
        </Row>
        <Row style={{ borderBottom: '5px solid black', paddingBottom: 32, paddingTop: 42, margin: 0 }}>
          {allPlans.map((plan) => (
            <Col xs={xs} style={{ padding: 0 }}>
              <h3 className="fontSize_7">{cqModal.plansInfo[plan.planSorId].name}</h3>
              <button className="button secondary selectThisPlan" onClick={() => { selectedPlan(plan.planSorId); }}>Pick this plan</button>
            </Col>
          )
          )}
        </Row>
        <Row style={{ margin: 0 }}>
          <Col xs={12} style={{ overflow: 'auto', padding: 0 }}>
            <Row style={{ margin: 0 }}>
              {allPlans.map((plan) => (
                <Col xs={xs} style={{ padding: 0 }}>
                  <Row className="noSideMargin" style={{ margin: 0 }}>
                    <Col xs={12} style={{ padding: '13px 0 36px 0' }} className="border_grayThree onlyBottomBorder">
                      <h4 className="fontSize_4 fontDisplayBold width40">{cqModal.plansInfo[plan.planSorId].description}</h4>
                    </Col>
                    {
                      cqModal.plansInfo[plan.planSorId].planDetails.map((pDetail) =>
                        <Col xs={12} style={{ padding: '13px 0 36px 0' }} className="border_grayThree onlyBottomBorder">
                          <h4 className="fontSize_4 fontDisplayBold">{pDetail.title}</h4>
                          <p className="width70 fontSize_2">{pDetail.text}
                            {pDetail.toolTipInfo &&
                              <ToolTip
                                className="margin3 onlyLeftMargin displayInlineBlock"
                                ariaLabel="Plan information tooltip"
                                text={pDetail.toolTipInfo}
                                noRenderHTML
                                isModal
                                modalWidth={875}
                              />
                            }
                          </p>

                        </Col>
                      )
                    }
                  </Row>
                </Col>
              ))}

            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

SeeDetails.propTypes = {
  selectedPlan: PropTypes.func,
  // selectedPlan: PropTypes.object,
  allPlans: PropTypes.array,
  cqModal: PropTypes.object,
};

export default SeeDetails;
