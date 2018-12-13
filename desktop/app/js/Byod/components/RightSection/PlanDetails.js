import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

// import { CHECKED_DEVICES_PALN_UNLIMITED } from './../../constants';

const PlanDetails = (props) => (
  <Row>
    <Col xs={12} className="border_grayThree">
      <Row className="pad15 onlySidePad margin10 noSideMargin">
        <Col xs={12}>
          <h2>Your plan</h2>
        </Col>
      </Row>
      <Row className="pad15 onlySidePad margin6 onlyBottomMargin">
        <Col xs={12} className="bold fontSize_5">
          <div
            className="border_black onlyBottomBorder pad10 onlyBottomPad"
            dangerouslySetInnerHTML={{ __html: props.planDetails.name }}
          />
        </Col>
      </Row>
      <Row className="pad15 noTopPad margin6 onlyTopMargin">
        <Col xs={6} className="bold fontSize_4">
          {props.cqJSON.label.DT_OD_BYOD_PLAN_DATA_LABEL}
        </Col>
        <Col xs={6} className="textRight fontSize_4">
          {props.planDetails.data}
        </Col>
      </Row>
      <Row className="pad15 noTopPad">
        <Col xs={6} className="bold fontSize_4">
          {props.cqJSON.label.DT_OD_BYOD_PLAN_MINUTES_LABEL}
        </Col>
        <Col xs={6} className="textRight fontSize_4">
          {props.planDetails.minutes}
        </Col>
      </Row>
      <Row className="pad15 noTopPad">
        <Col xs={6} className="bold fontSize_4">
          {props.cqJSON.label.DT_OD_BYOD_PLAN_MESSAGES_LABEL}
        </Col>
        <Col xs={6} className="textRight fontSize_4">
          {props.planDetails.messages}
        </Col>
      </Row>
      <Row className="pad15 noTopPad">
        <Col xs={4} className="bold fontSize_4">
          {props.cqJSON.label.DT_OD_BYOD_PLAN_DEVICES_LABEL}
        </Col>
        <Col xs={8} className="textRight fontSize_4">
          {props.planDetails.devices.map((device) => (
            <Row end="xs">
              <Col xs={12}>
                {device}
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Col>
  </Row>
);

PlanDetails.propTypes = {
  cqJSON: PropTypes.object,
  planDetails: PropTypes.object,
};

export default PlanDetails;
