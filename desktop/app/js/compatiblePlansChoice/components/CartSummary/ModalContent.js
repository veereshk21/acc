import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

const ModalContent = (props) => (
  <div className="pad20">
    <Row>
      <Col xs={9}>
        <h2
          className="bold margin30  onlyBottomMargin"
          dangerouslySetInnerHTML={{
            __html: props.cq.label.DT_OD_PLAN_CHANGE_TITLE,
          }}
        />
      </Col>
    </Row>
    <div
      style={{ margin: '80px 0 50px', paddingTop: '10px', borderTop: '1px solid #000' }}
      dangerouslySetInnerHTML={{
        __html: props.cq.label.DT_OD_PLAN_CHANGE_NEW_DESC,
      }}
    />
    <Row>
      <Col xs={6}>
        <button
          className="primary button margin30 onlyTopMargin"
          onClick={props.updatePlanProceed.bind(this)}
          dangerouslySetInnerHTML={{
            __html: props.cq.label.DT_OD_PLAN_CHANGE_CTA,
          }}
        />
      </Col>
      {props.keepCurrentPlan &&
        <Col xs={6}>
          <button
            className="secondary button margin30 onlyTopMargin"
            onClick={props.keepPlanProceed.bind(this)}
            dangerouslySetInnerHTML={{
              __html: props.cq.label.DT_OD_KEEP_CURRENT_PLAN,
            }}
          />
        </Col>
      }
    </Row>
  </div>
);

ModalContent.propTypes = {
  cq: PropTypes.object,
  updatePlanProceed: PropTypes.func,
  keepCurrentPlan: PropTypes.bool,
  keepPlanProceed: PropTypes.func,
};

export default ModalContent;
