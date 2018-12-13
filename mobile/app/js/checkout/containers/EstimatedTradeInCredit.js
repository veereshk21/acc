import { connect } from 'react-redux';
import EstimatedTradeInCredit from '../components/EstimatedTradeInCredit';

function mapStateToProps(state) {
  const data = state.get('orderDetails');
  const cqContent = state.get('cqContent').toJS();
  console.log(data.toJS());
  return {
    cqContent,
    tradeInPromoDetails: data.get('transformedTradeInPromoDetails'),
    bicMessage: data.get('bicMessage'),
  };
}


export default connect(mapStateToProps)(EstimatedTradeInCredit);
