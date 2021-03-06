import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BillingAddress from '../../components/billingAddress/billingAddress';
import * as actionCreators from '../../actions';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const editState = state.get('editState').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');

  return {
    cqContent,
    ...asyncCallStatus,
    addressInfo: data.billingInfo.billingAddress,
    editState,
    stepsCompleted: data.stepsCompleted,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actionCreators), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingAddress);
