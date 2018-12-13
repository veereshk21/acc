import React from 'react';
import PropTypes from 'prop-types';
import AsyncComponent from '../../../common/AsyncComponent';

const Accessories = AsyncComponent(() => import('../../containers/reviewOrder/accessories'));

const ReviewOrderSection = (props) => {
  const { cqContent, stepsCompleted } = props;
  return (
    <div id="reviewOrderSection">
      <div className="pad24 border_grayThree borderSize_2 noTopBorder noLeftBorder">
        <h2 className="h1 margin24 onlyBottomMargin">{cqContent.label.DT_OD_CHECKOUT_REVIEW_ORDER_TITLE}</h2>
        {stepsCompleted.paymentInfo && stepsCompleted.billingAddress &&
          <Accessories />
        }
      </div>
    </div>
  );
};

ReviewOrderSection.propTypes = {
  cqContent: PropTypes.object,
  stepsCompleted: PropTypes.object,
};
export default ReviewOrderSection;
