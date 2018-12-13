import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

const PlanCost = (props) => (
  <div>
    {props.updatePlanPromptInfo && !props.updatePlanPromptInfo.jaxPlan && (
      <div className="margin20 noSideMargin">
        {!props.mixAndMaxEnabled &&
          <h2 className="h5 orderSummarySidebar_mainHeading color_00 fontSize_4 bold">
            {props.cq.label.DT_OD_ACCOUNT_ACCESS_TEXT}
          </h2>
        }

        <Row className="margin20 noSideMargin fontSize_6">
          <Col xs={8}>
            <p
              className="fontSize_7"
              dangerouslySetInnerHTML={{ __html: props.mixAndMaxEnabled ? props.cq.label.DT_OD_ACCOUNT_ACCESS_TEXT : props.cq.label.DT_OD_PLAN_COST_TEXT }}
            />
          </Col>
          <Col xs={4}>
            <p className="fontSize_7 textAlignRight margin24 onlyRightMargin pad15 onlyRightPad">
              ${props.updatePlanPromptInfo.discount ? props.updatePlanPromptInfo.discountedAccountAccessPrice : props.updatePlanPromptInfo.accountAccessPrice}
            </p>
          </Col>
        </Row>
      </div>)}
  </div>
);


PlanCost.propTypes = {
  updatePlanPromptInfo: PropTypes.object,
  cq: PropTypes.object,
  mixAndMaxEnabled: PropTypes.bool,
};

export default PlanCost;
