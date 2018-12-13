import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from '../../store';
import AppleCare from '../components/AppleCare';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const data = state.toJS();
  const protection = data.selectedProtectionData;
  if (Object.keys(protection).length === 0) {
    hashHistory.push('/');
  }
  return {
    applecare: data.accessoryData ? data.accessoryData.applecare : [],
    cqLabel: data.cqContent.label,
    protection,
    saveUrl: data.protectionData.saveUrl,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppleCare);

