import { connect } from 'react-redux';
import TermsAndConditions from '../components/TermsAndConditions';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  return {
    cqContent,
    eppAgreement: data.termsAndConditionsInfo,
  };
}

export default connect(mapStateToProps)(TermsAndConditions);
