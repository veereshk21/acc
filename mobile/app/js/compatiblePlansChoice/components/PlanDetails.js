import React from 'react';
import PropTypes from 'prop-types';
import BackButton from '../../common/BackButton/BackButton';
import GenericError from '../../common/GenericError/';

function getFeaturesList(additionalPlanDetails) {
  const features = [];

  for (let i = 0; i < additionalPlanDetails.details.length; i++) {
    features.push(<div
      key={'plan-detail-' + i}
      className={`margin30 onlySideMargin pad10 noSidePad ${i !== additionalPlanDetails.details.length - 1 ? 'border_EB onlyBottomBorder' : ''}`}
    >
      <h5 className="margin10 onlyTopMargin fontSize_3">
        {additionalPlanDetails.details[i].title}
      </h5>
      <p className="color_4B4B4B margin10 onlyBottomMargin fontSize_2">
        {additionalPlanDetails.details[i].description}
      </p>
    </div>);
  }

  return features;
}

const PlanDetails = ({ additionalPlanDetails }) => (
  additionalPlanDetails ?
    (
      <div className="noSidePad pad12">
        <BackButton to="/">Back</BackButton>
        <h4 className="pad20 textAlignCenter">{additionalPlanDetails.header}</h4>
        <div>{getFeaturesList(additionalPlanDetails)}</div>
      </div>
    ) : (
      <div className="noSidePad pad12">
        <BackButton to="/">Back</BackButton>
        <GenericError />
      </div>
    )
);

PlanDetails.defaultProps = {
  additionalPlanDetails: null,
};

PlanDetails.propTypes = {
  additionalPlanDetails: PropTypes.object,
};

export default PlanDetails;
