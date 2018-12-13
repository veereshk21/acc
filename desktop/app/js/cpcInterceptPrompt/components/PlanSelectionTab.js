import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';
import { SINGLE_LINE, MULTI_LINE } from './../constants';

const PlanSelectionTab = (props) => (
  <Row style={{ margin: 0, paddingBottom: '48px' }}>
    <div className="planSelectionTab">
      <Col xs={6} className={`pad12 ${props.singlePlan && 'highlighted'}`}>
        <Row
          style={{ cursor: 'pointer', padding: 0 }}
          onClick={props.onPlantypeChangeHandler.bind(this, SINGLE_LINE)}
          analyticstrack="select-singleLinePlan-tab-CTA"
          onKeyPress={props.onPlantypeChangeHandler.bind(this, SINGLE_LINE)}
          role="button"
          tabIndex="0"
        >
          <Col xs={12} style={{ padding: 0 }}>
            <div className="bold fontSize_9 margin6 onlyBottomMargin">
              {props.cq.label.DT_OD_CPC_SINGLE_PLAN}
            </div>
            <div className="fontSize_4">
              {props.cq.label.DT_OD_CPC_SINGLE_PLAN_LINE_TITLE}
            </div>
            <div className="margin6 onlyBottomMargin fontSize_4">
              {props.cq.label.DT_OD_CPC_SINGLE_PLAN_LINE_DESC}
            </div>
            <div className="bold margin6 onlyBottomMargin">
              {props.cq.label.DT_OD_CPC_SINGLE_PLAN_LINE_PRICE}
            </div>
            <div className="legal">
              {props.cq.label.DT_OD_CPC_SINGLE_PLAN_LINE_LEGAL}
            </div>
          </Col>
        </Row>
      </Col>
      <Col xs={6} className={`pad12 ${!props.singlePlan && 'highlighted'}`}>
        <Row
          style={{ cursor: 'pointer', padding: 0 }}
          onClick={props.onPlantypeChangeHandler.bind(this, MULTI_LINE)}
          analyticstrack="select-multiLinePlan-tab-CTA"
          onKeyPress={props.onPlantypeChangeHandler.bind(this, MULTI_LINE)}
          role="button"
          tabIndex="0"
        >
          <Col xs={12} style={{ padding: 0 }}>
            <div className="bold fontSize_9 margin6 onlyBottomMargin">
              {props.cq.label.DT_OD_CPC_SHARED_PLAN}
            </div>
            <div className="fontSize_4">
              {props.cq.label.DT_OD_CPC_SHARE_PLAN_LINE_TITLE}
            </div>
            <div className="margin6 onlyBottomMargin fontSize_4">
              {props.cq.label.DT_OD_CPC_SHARE_PLAN_LINE_DESC}
            </div>
            <div className="bold margin6 onlyBottomMargin">
              {props.cq.label.DT_OD_CPC_SHARE_PLAN_LINE_PRICE}
            </div>
            <div className="legal">
              {props.cq.label.DT_OD_CPC_SHARE_PLAN_LINE_LEGAL}
            </div>
          </Col>
        </Row>
      </Col>
    </div>
  </Row>
);

PlanSelectionTab.propTypes = {
  cq: PropTypes.object,
  onPlantypeChangeHandler: PropTypes.func,
  singlePlan: PropTypes.bool,
};

export default PlanSelectionTab;
