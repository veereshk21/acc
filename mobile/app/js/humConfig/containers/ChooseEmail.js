import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import ChooseEmail from '../components/ChooseEmail';


const mapStateToProps = (state) => {
  const data = state.toJSON();

  return {
    cqJSON: data.cqContent,
    humConfigData: data.humConfigData,
    isFetching: data.isFetching,
    existingEmails: data.humConfigData.existingEmails,
    selectedData: data.selectedData,
    onEmailError: data.onEmailError,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChooseEmail);
