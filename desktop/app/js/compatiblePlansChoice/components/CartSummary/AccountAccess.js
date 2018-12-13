import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import ToolTip from './../../../common/ToolTip/index';

const AccountAccess = (props) => (
  <div>
    {(props.updatePlanPromptInfo && props.updatePlanPromptInfo.planName && props.updatePlanPromptInfo.accountAccessPrice) &&
      <div className="margin20 noSideMargin">
        <div className="margin20 noSideMargin">
          <span
            dangerouslySetInnerHTML={{ __html: props.cq.label.DT_OD_CPC_PLAN_MONTHLY_ACCOUNT_ACCESS }}
            className="h5 orderSummarySidebar_mainHeading color_00 fontSize_5 bold"
          />
          <ToolTip
            className="margin3 onlyLeftMargin displayInlineBlock"
            ariaLabel="Monthly access info tooltip"
            text={props.cq.label.DT_OD_CPC_PLAN_MONTHLY_ACCOUNT_ACCESS_TIP}
            noRenderHTML
          />
        </div>
        <Row>
          <Col xs={9}>
            <p>{props.updatePlanPromptInfo.planName}</p>
          </Col>
          <Col
            xs={2}
            dangerouslySetInnerHTML={{ __html: props.updatePlanPromptInfo.priceInfo }}
          >
            {/* <div>
              <span>${props.updatePlanPromptInfo.discountedAccountAccessPrice ? props.updatePlanPromptInfo.discountedAccountAccessPrice : props.updatePlanPromptInfo.accountAccessPrice}</span>
              {parseFloat(props.updatePlanPromptInfo.accountAccessPrice) > parseFloat(props.updatePlanPromptInfo.discountedAccountAccessPrice) &&
                <div>
                  <span className="textDecLineThrough">${props.updatePlanPromptInfo.accountAccessPrice}</span>
                </div>
              }
            </div> */}
          </Col>
        </Row>
      </div>
    }
  </div>
);

AccountAccess.propTypes = {
  updatePlanPromptInfo: PropTypes.object,
  cq: PropTypes.object,
};

export default AccountAccess;
