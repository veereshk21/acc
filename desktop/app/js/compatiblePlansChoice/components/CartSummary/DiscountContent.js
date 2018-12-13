import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

const DiscountContent = (props) => (
  <div>
    {props.updatePlanPromptInfo && props.updatePlanPromptInfo.discount && (props.updatePlanPromptInfo.discounts && props.updatePlanPromptInfo.discounts.length) > 0 && (
      <div className="margin20 noSideMargin">
        {!props.mixAndMaxEnabled &&
          <h2 className="h5 orderSummarySidebar_mainHeading color_00 fontSize_7 bold">
            {props.cq.label.DT_OD_DISCOUNTS_TEXT}
          </h2>
        }
        {props.updatePlanPromptInfo.discounts.map((plan) => (
          <Row className="margin20 noSideMargin fontSize_6">
            <Col xs={8}>
              <p
                className="fontSize_7"
                dangerouslySetInnerHTML={{ __html: plan.discountName }}
              />
            </Col>
            <Col xs={4}>
              <p className="fontSize_7 textAlignRight margin24 onlyRightMargin pad15 onlyRightPad">-${plan.discountPrice}</p>
            </Col>
          </Row>
        ))}
      </div>
    )}
  </div>
);


DiscountContent.propTypes = {
  updatePlanPromptInfo: PropTypes.object,
  cq: PropTypes.object,
  mixAndMaxEnabled: PropTypes.bool,
};

export default DiscountContent;
