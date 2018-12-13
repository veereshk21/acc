import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mdnSelectionActions from '../actions';
import LimitExceeded from '../components/LimitExceeded';

const mapStateToProps = (state) => ({
  /* Changed to get from . referece for issue on LimitExcceed in case of AAL. */
  inEligibilityCode: state.get('accountLevelInEligibleDetails').get('accountLevelAALInEligibleDetails').get('accountLevelInEligibleCode'),
  data: state.get('accountLevelInEligibleDetails').get('accountLevelAALInEligibleDetails').toJSON(),
  cqJSON: state.get('cqData').toJSON(),
});
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LimitExceeded);
