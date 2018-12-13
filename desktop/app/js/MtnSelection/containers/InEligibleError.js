import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mdnSelectionActions from '../actions';
import InEligibleError from '../components/InEligibleError';

const mapStateToProps = (state) => ({
  cqJSON: state.get('cqContent').toJS() || { html: {}, label: {}, error: {} },
});
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InEligibleError);
