/**
 * Created by mambig on 8/23/17.
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as numberShareActions from '../actions';
import HomePage from '../components/index';

const mapStateToProps = (state) => {
  const numberShare = state.get('numberShare').toJS();
  const deviceDetails = state.get('deviceDetails');
  const numberShareLineAccessCharge = state.get('numberShareLineAccessCharge');
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  return {
    numberShare,
    cqContent,
    deviceDetails,
    numberShareLineAccessCharge,
    ...asyncCallStatus,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(numberShareActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
