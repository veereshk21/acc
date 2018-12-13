import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'qs';

import * as Constants from '../constants';
import * as mdnSelectionActions from '../actions';
import DppAppraisal from '../components/DppAppraisal';

const mapStateToProps = (state, ownProps) => {
  const mdnQstring = qs.parse(ownProps.location.search);
  const mdnFromUrl = mdnQstring['?mdn'] || mdnQstring.mdn;
  const selectedMDN = (state.get('selectedMDN') ? state.get('selectedMDN') : window.mdnJSON.output.mtnDetailsList.filter((mdn) => mdn.mtn === mdnFromUrl)[0]);

  return {
    selectedMDN,
    mdnSelectionView: state.get('mdnSelectionView'),
    selectedOption: Constants.DPP_RETURN,
    submitAgreementResponse: state.get('submitAgreementResponse'),
    loaderFlag: state.get('loaderFlag'),
    cqJSON: state.get('cqContent').toJS() || { html: {}, label: {}, error: {} },
    ajaxCallUrl: state.get('ajaxCallUrl'),
    formData: state.get('form'),
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DppAppraisal);
