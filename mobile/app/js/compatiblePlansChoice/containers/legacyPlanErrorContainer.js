import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mdnSelectionActions from '../actions';
import LegacyPlanError from '../components/legacyPlanError';


const legacyPlanErrorData = window.legacyPlanErrorJSON;

const mapStateToProps = () => ({
  skipUpgradeURL: (legacyPlanErrorData && legacyPlanErrorData.output && legacyPlanErrorData.output.redirectUrl) ? legacyPlanErrorData.output.redirectUrl : null,
  cqJSON: window.cqJSON && Object.keys(window.cqJSON).length ? window.cqJSON : { html: {}, label: {}, error: {} },
});
const mapDispatchToProps = (dispatch) => bindActionCreators(mdnSelectionActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LegacyPlanError);
