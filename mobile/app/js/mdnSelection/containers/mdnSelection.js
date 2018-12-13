import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mdnSelectionActions from '../actions';
import mainViewComponent from '../components';

const mapStateToProps = (state) => {
  const aalAttr = {
    isAALAllowed: state.get('aalAllowed'),
    redirectURL: state.get('aalRedirect'),
    boxEnable: state.get('aalboxEnable'),
  };
  const asyncCallStatus = state.get('asyncCallStatus');
  return {
    accountLevelInEligibleCode: state.get('accountLevelInEligibleCode'),
    accountLevelInEligibleDetails: state.get('accountLevelInEligibleDetails'),
    accountLevelInEligibleMessage: state.get('accountLevelInEligibleMessage'),
    pastDueAccount: state.get('pastDueDetails') ? state.get('pastDueDetails').get('pastDueAccount') : null,
    pastDueAccepted: state.get('pastDueDetails') ? state.get('pastDueDetails').get('pastDueAccepted') : null,
    mdnDetailsList: state.get('mtnDetailsList'),
    mainTitle: state.get('mtnMainTitle'),
    mdnSelectionView: state.get('mdnSelectionView'),
    selectedMDN: state.get('selectedMDN'),
    ajaxCallSelectedMTN: state.get('ajaxCallSelectedMTN'),
    submitAgreementResponse: state.get('submitAgreementResponse'),
    cancelPendingOrderResponse: state.get('cancelPendingOrderResponse'),
    preOrderResponse: state.get('preOrderPostResponse'),
    cartRedirect: state.get('cartRedirect'),
    ajaxCallUrl: state.get('ajaxCallUrl'),
    submitAddALineUrl: state.get('submitAddALineUrl'),
    isByodAllowed: state.get('byodAllowed'),
    submitByodRedirectUrl: state.get('submitByodRedirectUrl'),
    cqJSON: state.get('cqData').toJSON(),
    ...asyncCallStatus,
    aalAttr,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(mainViewComponent);
