import { connect } from 'react-redux';
import TradeInAgreement from '../components/TradeInAgreement';

function mapStateToProps(state) {
  const cqContent = state.get('cqContent').toJS();
  const orderDetails = state.get('orderDetails').toJS();

  return {
    cqContent,
    tradeInAgreement: orderDetails.termsAndConditionsInfo.tradeinTermsandConditions,
  };
}


export default connect(mapStateToProps)(TradeInAgreement);
