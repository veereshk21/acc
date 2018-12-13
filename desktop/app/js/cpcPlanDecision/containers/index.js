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

const mapStateToProps = (state) => {
  const json = state.toJSON();
  const cpcPromptInfo = json.output;
  const newDevices = cpcPromptInfo.currentPlanDetails.monthlyLineAccessDetails && cpcPromptInfo.currentPlanDetails.monthlyLineAccessDetails.newDevices;
  const montlyLineAccessFees = cpcPromptInfo.currentPlanDetails.monthlyLineAccessDetails && cpcPromptInfo.currentPlanDetails.monthlyLineAccessDetails.totalMonthlyLineAccessCost;
  const newDeviceLst = newDevices && getNewDeviceList(newDevices);
  const selectedDataOption = (state.toJS().form.cpcForm && state.toJS().form.cpcForm.values && state.toJS().form.cpcForm.values.dataOption);
  const formData = state.toJS().form.cpcForm;
  const planDetails = newDevices && getDataPlanDetails(newDevices, formData);
  const nationWidePlan = cpcPromptInfo.currentPlanDetails.currentPlanName.includes(OS_CPC_NATIONWIDE_PLAN) && newDevices;
  const CtaStatus = ctaStatus(newDeviceLst, planDetails);
  const currentPlanDetails = cpcPromptInfo.currentPlanDetails ? cpcPromptInfo.currentPlanDetails : null;
  const totalCost = currentPlanDetails.totalMonthlyAccessCostForAllDevices;
  const monthlyPrice = currentPlanDetails.totalMonthlyAccessCostForAllDevices;
  const isLineAccessDiscount = cpcPromptInfo.currentPlanDetails.monthlyLineAccessDetails && (parseInt(currentPlanDetails.monthlyLineAccessDetails.totalMonthlyLineAccessDiscountCost, 10) > 0);
  const isMonthlyAccessDiscount = (parseInt(currentPlanDetails.monthlyAccessDiscountCost, 10) > 0);
  const monthlyDiscountPrice = currentPlanDetails.monthlyAccessDiscountCost;

  return {
    cpcPromptInfo,
    cq: json.cq,
    currentPlanDetails,
    isFetching: state.get('isFetching'),
    currentPlanUrl: cpcPromptInfo.keepCurrentURL,
    exploreTVPlanUrl: cpcPromptInfo.exploreTVPURL,
    selectedDataOption,
    showDataOption: nationWidePlan,
    dataPlanDetails: planDetails,
    ctadisabled: nationWidePlan ? CtaStatus : false,
    isNationwide: nationWidePlan,
    totalCost,
    monthlyPrice,
    selectPlanURL: cpcPromptInfo.selectPlanURL,
    montlyLineAccessFees,
    isLineAccessDiscount,
    isMonthlyAccessDiscount,
    monthlyDiscountPrice,
    exploreMMPlanURL: cpcPromptInfo.exploreMMPlanURL,
    modifyExistingPlanUrl: cpcPromptInfo.modifyExistingPlanUrl,
    isDataOnlyPlan: cpcPromptInfo.dataOnlyPlan,
    isShowTVP: cpcPromptInfo.showTVP,
    isShowME: cpcPromptInfo.showME,
    isShowMM: cpcPromptInfo.showMM,
    isShowKeepCurrent: cpcPromptInfo.showKeepCurrent,
    isShowCurrentPlan: cpcPromptInfo.showCurrentPlan,
    isShowMFilex: cpcPromptInfo.showMFilex,
    mmplanEnabled: cpcPromptInfo.mmplanEnabled || false,
    discountApplicable: cpcPromptInfo.discountApplicable || false,
    restrictedMessage: cpcPromptInfo.restrictedMessage,
    zipRestrictedAcct: cpcPromptInfo.zipRestrictAcct || false,
    globalPromotions: cpcPromptInfo.globalPromotions || {},
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CpcInterceptPrompt));
