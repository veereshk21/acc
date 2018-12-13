import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'qs';

import * as mdnSelectionActions from '../actions';
import pendingOrder from '../components/pendingOrder';

const mapStateToProps = (state, ownProps) => {
  const data = state.toJS();
  const mdnQstring = qs.parse(ownProps.location.search);
  const mdnFromUrl = mdnQstring['?mdn'] || mdnQstring.mdn;
  const selectedMDN = (state.get('selectedMDN') ? state.get('selectedMDN') : state.get('mtnDetailsList').toJS().filter((mdn) => mdn.mtn === mdnFromUrl)[0]);
  const loaderFlag = state.get('loaderFlag');

  return {
    selectedMDN,
    accountLevelInEligibleCode: data.accountLevelInEligibleCode,
    accountLevelInEligibleDetails: data.accountLevelInEligibleDetails,
    accountLevelInEligibleMessage: data.accountLevelInEligibleMessage,
    cancelPendingOrderResponse: state.get('cancelPendingOrderResponse'),
    cqJSON: state.get('cqContent').toJS() || { html: {}, label: {}, error: {} },
    loaderFlag,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(pendingOrder);
