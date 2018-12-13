import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import Button from './../../common/Button/Button';
import DataPlans from './DataPlans';

const MultiPlanContent = (props) => (
  <div>
    <div className="pad20 noSidePad margin30 onlyBottomMargin">
      <h1
        dangerouslySetInnerHTML={{
          __html: props.cq.label.DT_OD_CPC_INTERCEPT_PROMPT_HEADER,
        }}
      />
    </div>
    {!props.cpcInterceptPromptInfo.mixAndMatch &&
    <Row className="pad30 positionRelative clearfix background_gray_one" style={{ margin: '0 0 60px' }}>
      <Col xs={9}>
        <h3
          className="fontSize_8"
          dangerouslySetInnerHTML={{ __html: props.cq.label.DT_OD_CPC_INTERCEPT_PROMPT_SWITCH_TITLE }}
        />
        <p
          className="pad5 noSidePad margin5 onlyTopMargin bold fontSize_5"
          dangerouslySetInnerHTML={{ __html: props.cq.label.DT_OD_CPC_INTERCEPT_PROMPT_BENEFITS_TITLE }}
        />
        <div className="clearfix margin10 onlyTopMargin fontSize_5">
          <div>
            <ul
              className="fontSize_4 color_gray_ten"
              dangerouslySetInnerHTML={{
                __html: props.cq.html.DT_OD_CPC_INTERCEPT_PROMPT_PLAN_BENEFITS,
              }}
            />
          </div>
        </div>
      </Col>

      <Col xs={3} className="margin60 onlyTopMargin block textAlignRight">
        <Button
          className="tertiary bold button"
          onClick={props.gotoExplorePlan}
          analyticstrack="select-explorePlan-linkCTA"
        >
          <span className="textDecUnderline">{props.cq.label.DT_OD_CPC_INTERCEPT_ACCEPT_BTN}</span>
        </Button>
      </Col>
    </Row>}
    <Row middle="xs" className="margin20 onlyBottomMargin">
      <Col xs={10} sm={8}>
        <h3 className="fontSize_10 h2"><span dangerouslySetInnerHTML={{ __html: props.cq.label.DT_OD_CPC_INTERCEPT_CURRENT_PLAN_TITLE }} /><span className="pad5 onlyLeftPad" dangerouslySetInnerHTML={{ __html: props.currentPlanDetails.currentPlanName }} /></h3>
      </Col>

      <Col xs={2} sm={4} className="textAlignRight">{props.cpcInterceptPromptInfo.declineURL &&
        <Button
          className="bold large"
          onClick={props.onCpcInterceptPromptDecline}
          analyticstrack="select-cpcInterceptPlan-CTA"
          disabled={props.ctadisabled}
        >{props.showDataOption ? props.cq.label.DT_OD_CPC_INTERCEPT_CONTINUE_BTN : props.cq.label.DT_OD_CPC_INTERCEPT_DECLINE_BTN}
        </Button>}
      </Col>
    </Row>
    {props.dataPlans && props.dataPlans.length > 0 &&
      <DataPlans
        plans={props.dataPlans}
        onPlanSelected={props.onPlanSelected}
        selectedPlanSorId={props.selectedPlanSorId}
        selectedPrice={props.selectedPrice}
        cq={props.cq}
      />
    }
  </div>
);

MultiPlanContent.propTypes = {
  cq: PropTypes.object,
  cpcInterceptPromptInfo: PropTypes.object,
  ctadisabled: PropTypes.bool,
  showDataOption: PropTypes.bool,
  dataPlans: PropTypes.array,
  currentPlanDetails: PropTypes.object,
  gotoExplorePlan: PropTypes.func,
  onCpcInterceptPromptDecline: PropTypes.func,
  onPlanSelected: PropTypes.func,
  selectedPlanSorId: PropTypes.string,
  selectedPrice: PropTypes.string,
};

export default MultiPlanContent;
