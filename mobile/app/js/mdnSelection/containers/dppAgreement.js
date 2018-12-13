import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'qs';
import * as mdnSelectionActions from '../actions';
import DPPAgreement from '../components/DPPAgreement';

const mapStateToProps = (state, ownProps) => {
  // No need to filter if already in app state
  const mdnQstring = qs.parse(ownProps.location.search);
  const mdnFromUrl = mdnQstring['?mdn'] || mdnQstring.mdn;
  const selectedMDN = (state.get('selectedMDN') ? state.get('selectedMDN') : window.mdnJSON.output.mtnDetailsList.filter((mdn) => mdn.mtn === mdnFromUrl)[0]);
  return {
    selectedMDN,
    edgeEligible: state.get('edgeEligible'),
    mdnSelectionView: state.get('mdnSelectionView'),
    submitAgreementResponse: state.get('submitAgreementResponse'),
    loaderFlag: state.get('loaderFlag'),
    ajaxCallUrl: state.get('ajaxCallUrl'),
    cqJSON: state.get('cqData').toJSON(),
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DPPAgreement);
