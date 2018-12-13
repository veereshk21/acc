import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GuestLogin from '../components/';
import * as actions from './../actions';

const mapStateToProps = (state) => {
  const data = state.toJS();
  return {
    ...data,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GuestLogin);
