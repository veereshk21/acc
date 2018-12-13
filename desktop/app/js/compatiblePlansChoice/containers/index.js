import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CompatiblePlans from '../components';
import { SINGLE_LINE, MULTI_LINE, DATA_ONLY } from './../constants';

const mapStatetoProps = (state) => {
  const json = state.toJSON();
  let additionalPlanDetails = json.additionalPlanDetails;
  additionalPlanDetails = !(Object.keys(additionalPlanDetails).length === 0 && additionalPlanDetails.constructor === Object) ? additionalPlanDetails : null;
  let isPlanDetailsShow = false;
  if (additionalPlanDetails) {
    isPlanDetailsShow = true;
  }
  const singleLinePlans = json.output.plans.filter(
    (plan) => (plan.planType === SINGLE_LINE || plan.jaxPlan)
  );

  const multiLinePlans = json.output.plans.filter(
    (plan) => (plan.planType === MULTI_LINE || plan.jaxPlan)
  );

  const dataOnlyPlans = json.output.plans.filter(
    (plan) => plan.planType === DATA_ONLY
  );
  const linesCount = (plan) => {
    let len = 0;
    if (plan) {
      len = plan.existingDevices && plan.existingDevices.length;
      len += plan.existingPhones && plan.existingPhones.length;
      len += plan.newDevices && plan.newDevices.length;
      len += plan.newPhones && plan.newPhones.length;
    }

    return len;
  };
  const showSeeDetails = (_dataOnlyPlans, _multiLinePlans, _singleLinePlans, cqModal) => {
    if (_multiLinePlans.length > 0) {
      const hasPlansdata = [];
      _multiLinePlans.map((item) => { // eslint-disable-line
        if (typeof cqModal.plansInfo[item.planSorId] !== 'undefined') {
          hasPlansdata.push[item.planSorId]; // eslint-disable-line
        }
      });
      if (hasPlansdata.length > 0) {
        return true;
      }
      return false;
    }
    if (_singleLinePlans.length > 0) {
      const hasSPlansdata = [];
      _singleLinePlans.map((item) => { // eslint-disable-line
        if (typeof cqModal.plansInfo[item.planSorId] !== 'undefined') {
          hasSPlansdata.push[item.planSorId]; // eslint-disable-line
        }
      });
      if (hasSPlansdata.length > 0) {
        return true;
      }
      return false;
    }
    if (_dataOnlyPlans.length > 0) {
      return false;
    }

    return true;
  };
  const singleDevicePlans = json.output.plans.filter((plan) => plan.planType === SINGLE_LINE);
  const _sLinePlans = singleDevicePlans.length > 0 ? singleLinePlans : singleDevicePlans;
  return {
    updatePlanPromptInfo: json.output,
    additionalPlanDetails,
    isPlanDetailsShow,
    cq: json.cq,
    cqModal: json.cqModal,
    isFetching: json.asyncCallStatus.isFetching,
    isSingleDevice: singleDevicePlans.length > 0,
    singleLinePlans: _sLinePlans,
    multiLinePlans: multiLinePlans.concat(dataOnlyPlans),
    isMultiUpgrade: json.output.multiUpgradeDetails && json.output.multiUpgradeDetails.displayModal,
    multiUpgradeContent: json.output.multiUpgradeDetails,
    mixAndMaxEnabled: json.output.mixAndMaxEnabled || false,
    dataOnlyPlans,
    linesCount: linesCount(json.output.plans[0]),
    showSeeDetails: showSeeDetails(dataOnlyPlans, _sLinePlans, multiLinePlans, json.cqModal),
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(CompatiblePlans);
