import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import ToolTip from './../../common/ToolTip/index';

const SinglePlanContent = (props) => (
  <div>
    <Row className="pad30 positionRelative margin60 onlyBottomMargin clearfix background_gray_one">
      {props.autopayNotification &&
        <Col xs={12} lg={12} className="background_white margin10 noSideMargin">
          <div className="pad10 bold">
            <div className="font-icon_pricetag m-gray background-white pad10 fontSize_3"> <span className="bold">{props.cq.label.DT_OD_CPC_AUTOPAY}</span> <span className="a11y-tooltip" />
              <ToolTip
                hideHeader="true"
                direction="top"
                className="margin3 onlyLeftMargin fontSize_5 top3"
                header=""
                text={props.cq.label.DT_OD_PLAN_AUTOPAY_TOOLTIP}
              />
            </div>
          </div>
        </Col>}
      <div className="bold margin24 noSideMargin">
        {props.cq.label.DT_OD_CPC_SINGLE_PLAN}
      </div>
      <div className="fontSize_4">
        {props.cq.label.DT_OD_CPC_SINGLE_PLAN_LINE_LONG_DESC}
      </div>
      <Col xs={2} className="textAlignCenter margin24 noSideMargin">
        <div className="fontSize_13 bold singleDevicePlanName margin40 onlyLeftMargin">
          {props.singleDevicePlan.planCapacity}
        </div>
        <div className="margin12 onlyTopMargin">
          {props.singleDevicePlan.planName}
        </div>
        <div className="bold">
          {props.singleDevicePlan.planPrice}
        </div>
        <div className="fontSize_4">
          {props.cq.label.DT_OD_CPC_SHARE_PLAN_PER_DEVICE}
        </div>
      </Col>
    </Row>
  </div>
);

SinglePlanContent.propTypes = {
  cq: PropTypes.object,
  autopayNotification: PropTypes.bool,
  singleDevicePlan: PropTypes.object,
};

export default SinglePlanContent;
