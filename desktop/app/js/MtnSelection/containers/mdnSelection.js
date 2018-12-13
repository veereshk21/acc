import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as mdnSelectionActions from '../actions';
import * as NotificationActions from '../../common/NotificationBar/actions';
import mainViewComponent from '../components';

const getTransferObject = (list) => {
  const data = {};
  data.name = {};
  data.deviceName = {};
  for (const i in list) {
    data.name[list[i].mtn] = list[i].nickname;
    data.deviceName[list[i].mtn] = list[i].deviceName;
  }
  return data;
};

const mapStateToProps = (state) => {
  if (!state) {
    window.location.href = '/#genericError';
    return {};
  }
  const data = state.toJS();
  const transferObject = getTransferObject(data.mtnDetailsList);
  const formData = state.get('form');
  const mdnDetailsList = state.get('mtnDetailsList');
  const selectedTransferMdn = formData.toJS().mdnTransferSelection && formData.toJS().mdnTransferSelection.values && formData.toJS().mdnTransferSelection.values.mdnTransferSelection;
  const transferMdnDetails = selectedTransferMdn && mdnDetailsList.toJS().filter((plan) => (plan.mtn === selectedTransferMdn))[0];

  return {
    accountLevelInEligibleCode: state.get('accountLevelInEligibleCode'),
    accountLevelInEligibleDetails: state.get('accountLevelInEligibleDetails'),
    accountLevelInEligibleMessage: state.get('accountLevelInEligibleMessage'),
    mdnDetailsList,
    mainTitle: state.get('mtnMainTitle'),
    mdnSelectionView: state.get('mdnSelectionView'),
    selectedMDN: state.get('selectedMDN'),
    ajaxCallSelectedMTN: state.get('ajaxCallSelectedMTN'),
    submitAgreementResponse: state.get('submitAgreementResponse'),
    preOrderResponse: state.get('preOrderPostResponse'),
    cartRedirect: state.get('cartRedirect'),
    ajaxCallUrl: state.get('ajaxCallUrl'),
    cqJSON: state.get('cqContent').toJS(),
    selectedMdnDetails: state.get('selectedMdnDetails'),
    transferUpgrade: state.get('transferUpgrade'),
    formData,
    transferTakerMTNs: state.get('transferTakerMTNs'),
    actionSelected: state.get('userAction'),
    showModal: state.get('showModal'),
    sharedCartInfo: state.get('sharedCartDetailsInfo'),
    showEUPPendingConfirmation: state.get('showEUPPendingConfirmation'),
    isFetchingModal: state.get('asyncCallStatus').isFetching,
    selectedTransferMdn,
    transferObject,
    transferMdnDetails,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...mdnSelectionActions, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(mainViewComponent);
