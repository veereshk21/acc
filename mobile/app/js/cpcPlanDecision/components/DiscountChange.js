import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Title from '../../common/Title/Title';

const DiscountChange = ({
  exploreMMPlanURL, keepCurrentURL, cq, showKeepCurrent, currentPlanDetails, discountApplicable,
}) => (
  <Grid className="pad32">
    <Row>
      <Col xs={12} >
        <Title className="fontSize_7" style={{ fontSize: '9vw', lineHeight: '1.1' }}>{cq.label.OD_CPC_PLANDEC_DISCOUNT_CHANGE_TITLE}</Title>
        <div>
          <p className="margin18 onlyTopMargin">
            {cq.label.CPC_INTERCEPT_PROMPT_CURRENT_PLAN_TEXT}
            <span dangerouslySetInnerHTML={{ __html: currentPlanDetails.currentPlanName }} />
            {discountApplicable ? cq.label.OD_CPC_PLANDEC_DISCOUNT_CHANGE_MESSAGE : cq.label.OD_CPC_PLANDEC_NO_DISCOUNT_CHANGE_MESSAGE}
          </p>
          {discountApplicable &&
              <p className="margin18 onlyTopMargin pad102 onlyBottomPad">
                {cq.label.OD_CPC_PLANDEC_DISCOUNT_CHANGE_SUB_MESSAGE}
              </p>
          }
        </div>
      </Col>
      <Col xs={12} className="footerFixed">
        {showKeepCurrent &&
            <a className="button secondary large margin6" href={keepCurrentURL} analyticstrack="keep-current-plan">
              {cq.label.OD_CPC_PLANDEC_KEEP_CURRENT_PLAN}

            </a>}
        <a className="button primary large margin6 width40" href={exploreMMPlanURL} analyticstrack="explore-mm-plan">
          {cq.label.OD_CPC_PLANDEC_EXPLORE}
        </a>
      </Col>
    </Row>
  </Grid>
);

DiscountChange.propTypes = {
  cq: PropTypes.object,
  exploreMMPlanURL: PropTypes.string,
  keepCurrentURL: PropTypes.string,
  showKeepCurrent: PropTypes.bool,
  currentPlanDetails: PropTypes.object,
  discountApplicable: PropTypes.bool,
};

DiscountChange.defaultProps = {};

export default DiscountChange;
