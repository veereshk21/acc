import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mdnSelectionActions from '../actions';
import DppAppraisalQualification from '../components/DppAppraisalQualification';

const mapStateToProps = (state) => ({
  mdnSelectionView: state.get('mdnSelectionView'),
  cqJSON: state.get('cqContent').toJS() || { html: {}, label: {}, error: {} },
});
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DppAppraisalQualification);
