import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../common/Title/Title';
import PlanDetails from './PlanDetails';
import A from '../../common/A/A';
import Button from '../../common/Button/Button';

export default class ReviewPlanDetails extends React.PureComponent {
  render() {
    const { preOrderPlanData } = this.props;
    return (
      <div className="pad24">
        <Title>{preOrderPlanData.title}</Title>
        <ul className="plainList background_FF gridTiles margin24 noSideMargin">
          {
            preOrderPlanData.plans.map((plan, index) => (
              <PlanDetails planData={plan} key={`plan-${index}`} />
            ))
          }
        </ul>
        <div className="pad24 onlyTopPad clearBoth">
          <Button className="small button secondary centerBlock">{preOrderPlanData.ButtonMap.PrimaryButton.title}</Button>
          <A className="pad12 onlyTopPad centerBlock textAlignCenter link">{preOrderPlanData.ButtonMap.SecondaryLink.title}</A>
        </div>
      </div>
    );
  }
}
ReviewPlanDetails.propTypes = {
  preOrderPlanData: PropTypes.object,
};
