import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'qs';

import * as Constants from '../constants';
import * as mdnSelectionActions from '../actions';
import DPPAppraisal from '../components/DPPAppraisal';

const mapStateToProps = (state, ownProps) => {
  // No need to filter if already in app state
  const mdnQstring = qs.parse(ownProps.location.search);
  const mdnFromUrl = mdnQstring['?mdn'] || mdnQstring.mdn;
  const selectedMDN = (state.get('selectedMDN') ? state.get('selectedMDN') : window.mdnJSON.output.mtnDetailsList.filter((mdn) => mdn.mtn === mdnFromUrl)[0]);
  return {
    selectedMDN,
    mdnSelectionView: state.get('mdnSelectionView'),
    selectedOption: Constants.DPP_RETURN,
    submitAgreementResponse: state.get('submitAgreementResponse'),
    ajaxCallUrl: state.get('ajaxCallUrl'),
    loaderFlag: state.get('loaderFlag'),
    cqJSON: state.get('cqData').toJSON(),
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DPPAppraisal);
