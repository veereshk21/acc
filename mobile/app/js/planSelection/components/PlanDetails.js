import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import A from '../../common/A/A';

export default class PlanDetails extends React.Component {
  componentDidMount() {
    this.props.updatePlanRef(this.refs); //eslint-disable-line
  }
  compareCurrentPlan(skuid) {
    this.props.getComparePlan(skuid);
  }

  render() {
    const {
      planData, cqData, planIndex, planLen,
    } = this.props;
    // Main view for MDN Selection, user can choose which device to upgrade
    return (
      <li className={`gridTile ${planLen === 1 ? 'centerBlock' : ''}`}>
        <div className="border_EB onlyBottomBorder pad42 onlyBottomPad">
          <p><img src={`${planData.planImageUrl}?&hei=80`} alt="planimage" /></p>
          <div className="pad24 noSidePad noBottomPad textAlignCenter width60 centerBlock">
            <A href={planData.actionURL} className="small button secondary centerBlock">{cqData.label.OD_PLAN_SELECTION_SELECT_BUTTON_TEXT}</A>
          </div>

        </div>
        {
          planData.planFeatures.map((feature, index) => (
            <div key={`${index}+planfeature`} className="border_EB onlyBottomBorder pad18" ref={`plan-${planIndex}-${index}`}>
              <div className="bold textAlignCenter">{feature.featureName}</div>
              <div className="textAlignCenter">{feature.featureDescription}</div>
              {
                (typeof feature.featureLinkText !== 'undefined' && feature.featureLinkText !== null) &&
                  (feature.isNewRoute === 'true') ? <Link to={'comparePlan/' + planData.planId} className="textAlignCenter centerBlock link">{feature.featureLinkText}</Link> :
                  <Link to={`planDetail/${planIndex}#${feature.featureId}`} className="textAlignCenter centerBlock link" >{feature.featureLinkText}</Link>
              }
            </div>
          ))
        }
      </li>
    );
  }
}
PlanDetails.propTypes = {
  updatePlanRef: PropTypes.func,
  getComparePlan: PropTypes.func,
  planData: PropTypes.object,
  cqData: PropTypes.object,
  planIndex: PropTypes.number,
  planLen: PropTypes.number,
};

