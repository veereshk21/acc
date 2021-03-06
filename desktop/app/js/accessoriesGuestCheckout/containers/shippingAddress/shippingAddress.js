import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShippingAddress from '../../components/shippingAddress/shippingAddress';
import * as actionCreators from '../../actions';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const editState = state.get('editState').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');

  return {
    cqContent,
    ...asyncCallStatus,
    addressInfo: data.shippingInfo.addressInfo,
    editState,
    stepsCompleted: data.stepsCompleted,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actionCreators), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress);
