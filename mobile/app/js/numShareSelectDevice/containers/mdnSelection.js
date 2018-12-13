import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mdnSelectionActions from '../actions';
import mainViewComponent from '../components';

const mapStateToProps = (state) => {
  const data = state.toJS();
  return {
    mdnDetailsList: data.output.devicesList,
    mdnJSON: data.output,
    mdnSelectionView: state.get('mdnSelectionView'),
    cqJSON: data.cqJSON,
    statusCode: data.statusCode,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(mainViewComponent);
