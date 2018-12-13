import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import CpcInterceptPrompt from '../components';
import { OS_CPC_NATIONWIDE_PLAN } from './../constants';

const ctaStatus = (deviceList, planDetails) => {
  for (const i in deviceList) {
    if (planDetails.dataFeaturesMap[deviceList[i]] === undefined || planDetails.messageFeaturesMap[deviceList[i]] === undefined) {
      return true;
    }
  }
  return false;
};

const getDataPlanDetails = (newDevices, form) => {
  const data = {};
  data.dataFeaturesMap = {};
  data.messageFeaturesMap = {};
  for (const i in newDevices) {
    data.dataFeaturesMap[newDevices[i].mtn] = (newDevices[i].dataFeatures && newDevices[i].dataFeatures.length > 0) ?
      form && form.values && form.values['dataOption_' + newDevices[i].mtn] : null;
    data.messageFeaturesMap[newDevices[i].mtn] = (newDevices[i].msgFeatures && newDevices[i].msgFeatures.length > 0) ?
      form && form.values && form.values['messageOption_' + newDevices[i].mtn] : null;
  }
  return data;
};

const getNewDeviceList = (newDevices) => {
  const devices = [];
  for (const i in newDevices) {
    devices.push(newDevices[i].mtn);
  }
  return devices;
};

const getSortedDataPlans = (plans, selectedDataPlan) => {
  for (const i in plans) {
    if (plans[i].currentPlan && i !== '0') {
      plans.splice(i, 1);
      plans.splice(0, 0, selectedDataPlan);
    }
  }
  return plans;
};

const mapStateToProps = (state) => {
  const json = state.toJSON();
  const cpcInterceptPromptInfo = json.output;
  const dataPlans = cpcInterceptPromptInfo.planNAFs;
  const selectedDataPlan = (dataPlans && dataPlans.length > 0 && dataPlans.filter((plan) => (plan.currentPlan))[0]);
  const sortedDataPlan = dataPlans && dataPlans.length > 0 ? getSortedDataPlans(dataPlans, selectedDataPlan) : dataPlans;
  const newDevices = cpcInterceptPromptInfo.currentPlanDetails.monthlyLineAccessDetails && cpcInterceptPromptInfo.currentPlanDetails.monthlyLineAccessDetails.newDevices;
  const montlyLineAccessFees = cpcInterceptPromptInfo.currentPlanDetails.monthlyLineAccessDetails && cpcInterceptPromptInfo.currentPlanDetails.monthlyLineAccessDetails.totalMonthlyLineAccessCost;
  const newDeviceLst = newDevices && getNewDeviceList(newDevices);
  const selectedDataOption = (state.toJS().form.cpcForm && state.toJS().form.cpcForm.values && state.toJS().form.cpcForm.values.dataOption);
  const formData = state.toJS().form.cpcForm;
  const planDetails = newDevices && getDataPlanDetails(newDevices, formData);
  const nationWidePlan = cpcInterceptPromptInfo.currentPlanDetails.currentPlanName.includes(OS_CPC_NATIONWIDE_PLAN) && newDevices;
  const CtaStatus = ctaStatus(newDeviceLst, planDetails);
  const singleDevicePlan = cpcInterceptPromptInfo.singleDeviceNAFs && cpcInterceptPromptInfo.singleDeviceNAFs[0];
  const isSingleDevicePlan = singleDevicePlan || false;
  const isdataOnlyPlan = (dataPlans && dataPlans.length > 0) || false;
  const autopayNotification = cpcInterceptPromptInfo.autopayNotification;
  const currentPlanDetails = cpcInterceptPromptInfo.currentPlanDetails ? cpcInterceptPromptInfo.currentPlanDetails : null;
  const totalCost = currentPlanDetails.totalMonthlyAccessCostForAllDevices;
  const monthlyPrice = currentPlanDetails.totalMonthlyAccessCostForAllDevices;
  const isLineAccessDiscount = cpcInterceptPromptInfo.currentPlanDetails.monthlyLineAccessDetails && (parseInt(currentPlanDetails.monthlyLineAccessDetails.totalMonthlyLineAccessDiscountCost, 10) > 0);
  const isMonthlyAccessDiscount = (parseInt(currentPlanDetails.monthlyAccessDiscountCost, 10) > 0);
  const monthlyDiscountPrice = currentPlanDetails.monthlyAccessDiscountCost;

  return {
    cpcInterceptPromptInfo,
    cq: json.cq,
    currentPlanDetails,
    isFetching: state.get('isFetching'),
    isMultiUpgrade: json.output.multiUpgradeDetails && json.output.multiUpgradeDetails.displayModal,
    multiUpgradeContent: json.output.multiUpgradeDetails,
    acceptUrl: cpcInterceptPromptInfo.acceptURL,
    declineUrl: cpcInterceptPromptInfo.declineURL,
    selectedDataOption,
    showDataOption: nationWidePlan || isSingleDevicePlan || isdataOnlyPlan,
    dataPlanDetails: planDetails,
    ctadisabled: nationWidePlan ? CtaStatus : false,
    dataPlans: sortedDataPlan,
    selectedDataPlan,
    isSingleDevicePlan,
    autopayNotification,
    singleDevicePlan,
    isNationwide: nationWidePlan,
    totalCost,
    monthlyPrice,
    selectPlanURL: cpcInterceptPromptInfo.selectPlanURL,
    montlyLineAccessFees,
    isLineAccessDiscount,
    isMonthlyAccessDiscount,
    monthlyDiscountPrice,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CpcInterceptPrompt));
