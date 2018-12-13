import PropTypes from 'prop-types';
import React from 'react';

const AutoPayOffer = (props) => (
  <div>
    {(props.updatePlanPromptInfo && props.updatePlanPromptInfo.autopayNotification && props.updatePlanPromptInfo.autoPayOffer) &&
      <div className="background_black pad20 color_white textCenter margin20 onlyBottomMargin">
        <span className="fontSize_6 orderSummarySidebar_mainHeading color_white bold">
          {props.updatePlanPromptInfo.autoPayOffer}
        </span>
        <p>{props.cq.label.DT_OD_PAPER_FREE_TEXT}</p>
      </div>
    }
  </div>
);

AutoPayOffer.propTypes = {
  updatePlanPromptInfo: PropTypes.object,
  cq: PropTypes.object,
};

export default AutoPayOffer;
