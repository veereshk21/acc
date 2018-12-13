import { connect } from 'react-redux';
import CustomerAgreement from '../components/CustomerAgreement';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  return {
    cqContent,
    agreement: data.termsAndConditionsInfo,
  };
}

export default connect(mapStateToProps)(CustomerAgreement);
