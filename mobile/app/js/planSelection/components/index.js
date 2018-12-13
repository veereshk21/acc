import React from 'react';
import PropTypes from 'prop-types';
import Title from '../../common/Title/Title';
import PlanDetails from './PlanDetails';
import Button from '../../common/Button/Button';
import { getParameterByName } from './../actions';

export default class PreOrderPlanComponent extends React.Component {
  constructor(props) {
    super(props);
    this.confirmPlanOpt = this.confirmPlanOption.bind(this);
    this.updatePlanRefs = this.updatePlanRef.bind(this);
    this.getPlanRefs = [];
  }


  componentDidMount() {
    const getRefObj = this.getPlanRefs;
    for (let len = 0; len < Object.keys(getRefObj[0]).length; len++) {
      const firstElemHei = getRefObj[0][Object.keys(getRefObj[0])[len]].clientHeight + 18;
      const secondElemHei = getRefObj[1][Object.keys(getRefObj[1])[len]].clientHeight + 18;
      if (firstElemHei > secondElemHei) {
        this.getPlanRefs[1][Object.keys(this.getPlanRefs[1])[len]].style.height = firstElemHei + 'px';
        this.getPlanRefs[0][Object.keys(this.getPlanRefs[0])[len]].style.height = firstElemHei + 'px';
      } else {
        this.getPlanRefs[0][Object.keys(this.getPlanRefs[0])[len]].style.height = secondElemHei + 'px';
        this.getPlanRefs[1][Object.keys(this.getPlanRefs[1])[len]].style.height = secondElemHei + 'px';
      }
    }
  }
  updatePlanRef(getRefs) {
    this.getPlanRefs[this.getPlanRefs.length] = getRefs;
  }
  confirmPlanOption() {
    const editPlan = getParameterByName('editPlan');
    const flow = getParameterByName('flow');
    const planCommId = getParameterByName('planCommId');
    /* TODO: Confirm if we are going to use custom overlays on mobile */
    const result = confirm(this.props.cqData.label.OD_PLAN_SELECTION_WARNING_TEXT); // eslint-disable-line
    if (result) {
      let keepPlanURL = '';
      if (editPlan !== null) keepPlanURL += `&editPlan=${editPlan}`;
      if (flow !== null) keepPlanURL += `&flow=${flow}`;
      if (planCommId !== null) keepPlanURL += `&planCommId=${planCommId}`;
      window.location.href = keepPlanURL;
    }
  }


  render() {
    const { preOrderPlanData, cqData, getComparePlan } = this.props;
    return (
      <div className="pad24">
        <Title><span dangerouslySetInnerHTML={{ __html: cqData.label.OD_PLAN_SELECTION_TITLE }} /></Title>
        <ul className="plainList background_FF gridTiles margin24 noSideMargin">
          {
            preOrderPlanData.plans.map((plan, index) => (
              <PlanDetails
                key={index}
                planData={plan}
                cqData={cqData}
                planIndex={index}
                getComparePlan={getComparePlan}
                updatePlanRef={this.updatePlanRefs}
                planLen={preOrderPlanData.plans.length}
              />
            ))
          }
        </ul>
        {preOrderPlanData.keepCurrentCTA &&
          <div className="pad12 noSidePad footerFixed">

            <Button
              className="large button secondary centerBlock"
              onClick={this.confirmPlanOpt.bind()}
            >{cqData.label.OD_PLAN_SELECTION_PRIMARY_BUTTON_TEXT}
            </Button>
          </div>}
      </div>
    );
  }
}
PreOrderPlanComponent.propTypes = {
  preOrderPlanData: PropTypes.object,
  cqData: PropTypes.object,
  getComparePlan: PropTypes.func,
};
