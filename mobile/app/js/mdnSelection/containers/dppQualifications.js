import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mdnSelectionActions from '../actions';
import DPPQualifications from '../components/DPPQualifications';

const mapStateToProps = (state) => ({
  mdnSelectionView: state.get('mdnSelectionView'),
  cqJSON: state.get('cqData').toJSON(),
});
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DPPQualifications);
