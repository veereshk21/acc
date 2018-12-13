import React from 'react';
import PropTypes from 'prop-types';

const WarningMessage = ({ cqContent, numberShare }) => {
  const { inEligibleMessage } = numberShare;
  const errorMsg = inEligibleMessage ? inEligibleMessage.title : cqContent.html.DT_OD_NS_NO_LIMIT;

  return (<div className="margin40 onlyTopMargin">
    <div className="width90">
      <div className="bold margin20 onlyBottomMargin">
        <p dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_NS_LINE_ACCESS }} />
        <div>${numberShare.numberShareLineAccessCharge}</div>
      </div>

      <p className="width70">{cqContent.label.DT_OD_NS_COMPATIBLE}</p>

      <div className="margin20 noSideMargin">
        <div className="bold">
          <p dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_NS_CHOOSE_NO_TITLE }} />
        </div>
        <div className="background_blue margin10 noLeftMargin pad20 color_FFF">
          <span className="relative width1 font-icon_alert margin20 onlyRightMargin pad90 onlyBottomPad floatLeft" />
          <p dangerouslySetInnerHTML={{ __html: errorMsg }} />
        </div>
      </div>
    </div>
  </div>);
};

WarningMessage.propTypes = {
  cqContent: PropTypes.object,
  numberShare: PropTypes.object,
};

export default WarningMessage;
