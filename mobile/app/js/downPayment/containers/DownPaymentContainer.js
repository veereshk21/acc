import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import DownPayment from '../components/DownPayment';

function mapStateToProps(state) {
  const data = state.get('downPaymentDetails').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const cqContent = state.get('cqContent').toJS();
  return {
    downpayment: data.output,
    checkoutURL: data.output.checkoutRedirectUrl,
    cqContent,
    ...asyncCallStatus,
  };
}
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DownPayment);
