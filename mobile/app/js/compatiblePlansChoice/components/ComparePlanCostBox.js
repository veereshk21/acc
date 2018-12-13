import React from 'react';
import PropTypes from 'prop-types';

const ComparePlanCostBox = ({
  key, sectionTitle, userCurrentPlan, userSelectedPlan,
}) =>
  (
    <div key={key} className="clearfix width100 section">
      <p className="background_CC bold fontSize_2">
        <span className="pad10 onlyLeftPad"> {sectionTitle} </span>
      </p>
      <div className="width50 pad18 noSidePad floatLeft  positionRelative">
        <p className="fontSize_6 bold floatRight onlyRightPad pad30" dangerouslySetInnerHTML={{ __html: (userCurrentPlan.header === '') ? '&mdash;' : userCurrentPlan.header }} />
        <div className="lightGray positionAbsolute" style={{ top: '25px', right: '-5px' }}>&#8594;</div>
      </div>
      <div className="width50  floatLeft pad18 noSidePad background_supporting ">
        <p className="fontSize_6 bold floatRight onlySidePad pad30" dangerouslySetInnerHTML={{ __html: (userSelectedPlan.header === '') ? '&mdash;' : userSelectedPlan.header }} />
      </div>
      {userCurrentPlan.description.map((details, keyindex) => (
        <div key={keyindex} className="clearBoth width100 floatLeft displayFlex flexDirection height100per">
          <div className="width50 floatLeft  pad18 onlyBottomPad">
            <p
              className="lightGray width50 fontSize_2 bold floatLeft textAlignLeft pad10 onlyLeftPad"
              style={{ 'min-height': '1px' }}
              dangerouslySetInnerHTML={{ __html: (details.description1 === '') ? '&mdash;' : details.description1 }}
            />
            <p
              className="lightGray width50 fontSize_2 bold floatLeft textAlignRight grey pad30 onlyRightPad"
              style={{ 'min-height': '1px' }}
              dangerouslySetInnerHTML={{ __html: (details.description2 === '') ? '&mdash;' : details.description2 }}
            />
          </div>
          <div className="width50 floatLeft pad18 onlyBottomPad background_supporting ">
            <p
              className="lightGray width50 fontSize_2 bold floatLeft textAlignLeft pad10 onlyLeftPad"
              style={{ opacity: '0', 'min-height': '1px' }}
              dangerouslySetInnerHTML={{ __html: (typeof details.description1 === 'string') ? details.description1 : details.description2 }}
            />
            <p
              className="width50 lightGray fontSize_2 floatRight bold floatLeft textAlignRight grey pad30 onlyRightPad"
              style={{ 'min-height': '1px' }}
              dangerouslySetInnerHTML={{ __html: (userSelectedPlan.description[keyindex].description1 === '') ? '&mdash;' : userSelectedPlan.description[keyindex].description1 }}
            />
          </div>
        </div>
      ))
      }
    </div>);

ComparePlanCostBox.propTypes = {
  key: PropTypes.number.isRequired,
  sectionTitle: PropTypes.string.isRequired,
  userCurrentPlan: PropTypes.object.isRequired,
  userSelectedPlan: PropTypes.object.isRequired,
};

export default ComparePlanCostBox;
