import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import DevicesSection from '../../components/devices';
import * as actionCreators from '../../actions';
import * as NotificationActions from '../../../common/NotificationBar/actions';
import { EDIT_STATE } from '../../constants';

const getProtections = (equipmentProtectionList) => { // eslint-disable-line
  return equipmentProtectionList && equipmentProtectionList.reduce((groups, item, index) => { // eslint-disable-line
    const protection = item;
    const types = groups;
    protection.index = index;
    const key = (protection.sorSfoType === 'SPO') ? 'multi' : 'single';
    if (protection.sfoSORId !== '66332') {
      (types[key] = types[key] || []).push(protection);
    } else {
      (types.decline = types.decline || []).push(protection);
    }
    return types;
  }, {});
};

const getFewerPlans = (protectionTypes) => { // eslint-disable-line
  const protectionList = protectionTypes.single;
  return protectionList && protectionList.filter((protection, index) => { // eslint-disable-line
    if (index === 0 || index === protectionList.length - 1) {
      return protection;
    }
  });
};

function isVzMd(plans) {
  for (const plan of plans) {
    if (plan.sorSfoType === 'SPO' && plan.vzMdPlan) {
      return true;
    }
  }
  return false;
}

let objProps = {};
const getAddlFeatures = (protection) => { // eslint-disable-line
  if (!protection) {
    return null;
  }
  protection.forEach((ele) => { // eslint-disable-line
    if (!ele.additionalTapList || ele.sorSfoType !== 'SPO') return null;
    objProps.initialValues[ele.sfoSkuId] = ele.additionalTapList.filter((tap) => tap.preSelected === true)[0] ?
      ele.additionalTapList.filter((tap) => tap.preSelected === true)[0].devices :
      ele.additionalTapList.filter((tap) => tap.price === 'Included')[0].devices;
  });
};

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const protectionChangeList = state.get('protectionChangeList');
  const protectionJSON = protectionChangeList && protectionChangeList.protectionJSON && protectionChangeList.protectionJSON.output;
  const appleCareJSON = protectionChangeList && protectionChangeList.appleCareJSON;
  const appleCare = !isEmpty(appleCareJSON) ? appleCareJSON.applecare : [];
  const editShipping = state.get('editState')[EDIT_STATE.SHIPPING];
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const protectionTypes = !isEmpty(protectionJSON) ? getProtections(protectionJSON.mtnDeviceInfo.equipmentProtectionList) : {};
  const npanxxErrorIndex = data.deviceConfigInfo.devices.findIndex((device) => ((device.flow === 'AAL' || device.flow === 'NSO') && !(device.npaNxxnumber !== null || (device.npnxxCustomerSelection === 'transfer' && device.portInDetails && device.portInDetails.existingNumber))));
  const fewPlans = !isEmpty(protectionJSON) && getFewerPlans(protectionTypes);
  const vzMdPlanAvailable = !isEmpty(protectionJSON) && isVzMd(protectionJSON.mtnDeviceInfo.equipmentProtectionList);
  const vzProtectEnabled = !isEmpty(protectionJSON) && protectionJSON.mtnDeviceInfo.vzProtectEnabled;
  const vzProtectState = !isEmpty(protectionJSON) && protectionJSON.mtnDeviceInfo.vzProtectState;
  if (!data.devices) {
    window.location.href = '/#genericError';
    return {};
  }
  objProps = {
    cqContent,
    asyncCallStatus,
    editShipping,
    protectionChangeURL: data.protectionChangeURL,
    protectionRemoveURL: data.protectionRemoveURL,
    devices: data.devices.items,
    deviceDetails: data.deviceDetails,
    appleCare: !isEmpty(appleCare) ? appleCare[0] : null,
    protectionChangeList: !isEmpty(protectionJSON) ? protectionJSON : null,
    protectionTypes,
    devicesOuter: data.devices ? data.devices.items : [],
    states: data.states,
    npanxxError: npanxxErrorIndex >= 0,
    npanxxErrorIndex,
    npaNxxdetails: data.deviceConfigInfo.npaNxxdetails,
    deviceAddressUpdated: data.deviceConfigInfo.deviceAddressUpdated,
    npnxxCustomerSelection: data.deviceConfigInfo.npnxxCustomerSelection,
    globalPromotions: data.devices.globalPromotions,
    initialValues: {},
    fewPlans,
    vzMdPlanAvailable,
    showAllPlans: false,
    vzProtectEnabled,
    vzProtectState,
    isVzProtectGAState: vzProtectState === 'GA',
    protectionModalStatus: state.get('protectionModalStatus'),
  };
  if (protectionChangeList.mtnDeviceInfo && protectionChangeList.mtnDeviceInfo.equipmentProtectionList) {
    getAddlFeatures(protectionChangeList.mtnDeviceInfo.equipmentProtectionList);
  }
  return objProps;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DevicesSection);
