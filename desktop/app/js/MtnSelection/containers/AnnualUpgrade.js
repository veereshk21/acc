import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'qs';

import * as mdnSelectionActions from '../actions';
import AnnualUpgrade from '../components/AnnualUpgrade';

const mapStateToProps = (state, ownProps) => {
  const mdnQstring = qs.parse(ownProps.location.search);
  const mdnFromUrl = mdnQstring['?mdn'] || mdnQstring.mdn;
  const selectedMDN = (state.get('selectedMDN') ? state.get('selectedMDN') : window.mdnJSON.output.mtnDetailsList.filter((mdn) => mdn.mtn === mdnFromUrl)[0]);
  return {
    selectedMDN,
    ajaxCallUrl: state.get('ajaxCallUrl'),
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AnnualUpgrade);
