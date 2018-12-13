import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'qs';

import * as mdnSelectionActions from '../actions';
import DppAgreement from '../components/DPPAgreement';
import * as NotificationActions from '../../common/NotificationBar/actions';

const mapStateToProps = (state, ownProps) => {
  const mdnQstring = qs.parse(ownProps.location.search);
  const mdnFromUrl = mdnQstring['?mdn'] || mdnQstring.mdn;
  const selectedMDN = (state.get('selectedMDN') ? state.get('selectedMDN') : window.mdnJSON.output.mtnDetailsList.filter((mdn) => mdn.mtn === mdnFromUrl)[0]);

  return {
    selectedMDN,
    submitAgreementResponse: state.get('submitAgreementResponse'),
    loaderFlag: state.get('loaderFlag'),
    cqJSON: state.get('cqContent').toJS() || { html: {}, label: {}, error: {} },
    mdnSelectionView: state.get('mdnSelectionView'),
    edgeEligible: state.get('edgeEligible'),
    ajaxCallUrl: state.get('ajaxCallUrl'),
    formData: state.get('form'),
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({ ...mdnSelectionActions, ...NotificationActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DppAgreement);
