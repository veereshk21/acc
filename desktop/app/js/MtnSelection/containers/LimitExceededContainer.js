import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mdnSelectionActions from '../actions';
import LimitExceeded from '../components/limitExceeded';

const mapStateToProps = (state) => ({
  inEligibilityCode: state.get('accountLevelInEligibleDetails').get('accountLevelAALInEligibleDetails').get('accountLevelInEligibleCode'),
  cqJSON: state.get('cqContent').toJS() || { html: {}, label: {}, error: {} },
});
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LimitExceeded);
