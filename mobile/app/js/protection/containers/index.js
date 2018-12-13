/**
 * Created by hmahad on 2/16/2017.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import * as actions from '../actions';
import ProtectionComponent from '../components';


const getProtectionDetails = (state) => state.get('protectionData');

const featureOrder = [
  'TOTAL MOBILE PROTECTION',
  'TOTAL EQUIPMENT COVERAGE',
  'WIRELESS PHONE PROTECTION',
  'EXTENDED WARRANTY',
  'TECH COACH',
  'DECLINE EQUIPMENT PROTECTION',
];

const sortedFeatures = (features) => {
  const mappedFeatures = features.size > 0 && features.toJS().map((item) => {
    const obj = item;
    const name = item.displayName ? item.displayName.toUpperCase() : '';
    obj.order = featureOrder.indexOf(name);
    return obj;
  });
  const sortedArray = mappedFeatures.sort((a, b) => {
    const itemA = a.order;
    const itemB = b.order;
    return (itemA - itemB);
  });
  return fromJS(sortedArray);
};

function mapStateToProps(state) {
  const humFlow = getProtectionDetails(state).get('isHUMFlow');
  const equipmentProtectionList = getProtectionDetails(state).get('mtnDeviceInfo').get('equipmentProtectionList');
  const saveUrl = getProtectionDetails(state).get('saveUrl');
  const accessoryData = !!state.get('accessoryData') && state.get('accessoryData').toJSON();
  const btnState = state.get('btnState');
  // if there are no protection options available
  if (humFlow && equipmentProtectionList.size === 0) {
    window.location.href = saveUrl;
  }
  /**
   * TODO:Get orderid and stuff.
   * */
  return {
    tapFeatureInfo: getProtectionDetails(state).get('mtnDeviceInfo').get('tapFeatureInfo'),
    tapEligible: getProtectionDetails(state).get('mtnDeviceInfo').get('tapEligible'),
    tapExist: getProtectionDetails(state).get('mtnDeviceInfo').get('tapExist'),
    tmprefreshOptionAvailable: getProtectionDetails(state).get('mtnDeviceInfo').get('tmprefreshOptionAvailable'),
    cqLabel: state.get('cqContent').get('label'),
    commerceItemId: getProtectionDetails(state).get('commerceItemId'),
    deviceSkuId: getProtectionDetails(state).get('deviceSkuId'),
    cqHTML: state.get('cqContent').get('html'),
    saveUrl: getProtectionDetails(state).get('saveUrl'),
    // TODO Need to read fron JSON once BE is ready.
    showAllPlans: false,
    deviceProtectionRequired: getProtectionDetails(state).get('deviceProtectionRequired'),
    fromEditDeviceForEUP: getProtectionDetails(state).get('fromEditDeviceForEUP'),
    mtn: getProtectionDetails(state).get('mtnDeviceInfo').get('mtn'),
    isFetching: state.get('isFetching'),
    editProtection: getProtectionDetails(state).get('editProtection'),
    equipmentProtectionList: sortedFeatures(getProtectionDetails(state).get('mtnDeviceInfo').get('equipmentProtectionList')),
    applecare: accessoryData ? accessoryData.applecare : [],
    btnState,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProtectionComponent);
