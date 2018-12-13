import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlansSwiper from './PlansSwiper';
import Loader from '../../common/Loader/Loader';
import Button from './../../common/Button/Button';
import { getParameterByName } from './../actions';

class CompatiblePlans extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planSorId: '',
      coDisabled: false,
    };

    this.updateSelectedPlan = this.updateSelectedPlan.bind(this);
    this.updatePlanContinue = this.updatePlanContinue.bind(this);
  }

  /* set(0,0) focus On Page Load */
  componentDidMount() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }

  updateSelectedPlan(planSorId) {
    this.setState({ planSorId });

    /* Fetching Current plan
    ** Disable Next Button */
    this.setState({ coDisabled: false });
    const selectedPlan = this.props.compatiblePlans.plans.filter((plan) => plan.planSorId === planSorId)[0];
    if (this.props.compatiblePlans.comparePlanCostView && this.props.compatiblePlans.comparePlanCostView.currentPlan.planSkuId === selectedPlan.planSkuId) {
      this.setState({ coDisabled: true });
    }
    // store plan in the state
    this.props.setCurrentPlan(planSorId);
  }

  updatePlanContinue() {
    const { compatiblePlans } = this.props;
    const { planSorId } = this.state;
    let url = `${compatiblePlans.acceptURL}?planSorId=${planSorId}`;

    const editPlan = getParameterByName('editPlan');
    const flow = getParameterByName('flow');
    const planCommId = getParameterByName('planCommId');

    if (editPlan !== null) url += `&editPlan=${editPlan}`;
    if (flow !== null) url += `&flow=${flow}`;
    if (planCommId !== null) url += `&planCommId=${planCommId}`;


    window.location.href = url;
  }

  render() {
    const {
      compatiblePlans, setAdditionalPlanDetails, cqContent, asyncCallStatus,
    } = this.props;

    return (
      <div>
        {asyncCallStatus.isFetching && <Loader />}
        <PlansSwiper
          cqContent={cqContent}
          plans={compatiblePlans.plans}
          updateSelectedPlan={this.updateSelectedPlan}
          setAdditionalPlanDetails={setAdditionalPlanDetails}
          comparePlansEnabled={compatiblePlans.comparePlansEnabled}
        />
        <footer className="textAlignCenter">

          <Button
            className="primary large margin24 "
            type="button"
            disabled={this.state.coDisabled}
            onClick={this.updatePlanContinue}
            analyticstrack="update-plan"
          >
            {cqContent.label.OD_COMPATIBLE_PLAN_ACCEPT_BTN}
          </Button>
        </footer>
      </div>
    );
  }
}

CompatiblePlans.propTypes = {
  compatiblePlans: PropTypes.object.isRequired,
  cqContent: PropTypes.object.isRequired,
  setCurrentPlan: PropTypes.func,
  setAdditionalPlanDetails: PropTypes.func,
  asyncCallStatus: PropTypes.object,
};

export default CompatiblePlans;
