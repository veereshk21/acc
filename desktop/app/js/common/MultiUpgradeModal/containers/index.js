import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import MultiUpgradeModal from './../components/index';
import cqData from './../../../../cq/cq_multiUpgradeModal.json';
import './../../../../css/modules/multiUpgradeModal.scss';

function mapStateToProps(state) {
  const data = state.toJS();
  return {
    MultiUpgradeData: data.multiUpgradeContent,
    cqContent: cqData,
  };
}

function mapDispatchToProps(dispatch) { return bindActionCreators(actions, dispatch); }
export default connect(mapStateToProps, mapDispatchToProps)(MultiUpgradeModal);
