import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'qs';
import * as mdnSelectionActions from '../actions';
import pendingOrder from '../components/pendingOrder';

const mapStateToProps = (state, ownProps) => {
  /* Added .toJS() for filtering selectedMDN - for EUP Iconic MDNSelection changes */
  const mdnQstring = qs.parse(ownProps.location.search);
  const mdnFromUrl = mdnQstring['?mdn'] || mdnQstring.mdn;
  const selectedMDN = (state.get('selectedMDN') ? state.get('selectedMDN') : state.get('mtnDetailsList').toJS().filter((mdn) => mdn.mtn === mdnFromUrl)[0]);
  const loaderFlag = state.get('loaderFlag');
  return {
    selectedMDN,
    accountLevelInEligibleCode: state.get('accountLevelInEligibleCode'),
    accountLevelInEligibleDetails: state.get('accountLevelInEligibleDetails'),
    cancelPendingOrderResponse: state.get('cancelPendingOrderResponse'),
    cqJSON: state.get('cqData').toJSON(),
    loaderFlag,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(pendingOrder);
