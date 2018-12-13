/**
 * Created by hmahad on 2/1/2017.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TradeInDetails from '../components/TradeInDetails';
import * as CartActions from '../actions';


const mapStateToProps = (state) => ({
  tradeInCredit: state.get('cartData').get('tradeInCredit'),
  tradeInPromoDetails: state.get('cartData').get('tradeInPromoDetails'),
  bicOfferApplied: state.get('cartData').get('bicOfferApplied'),
  bicMessage: state.get('cartData').get('bicMessage'),
  tradeInUrl: state.get('cartData').get('tradeInUrl'),
  CQLabel: state.get('cqContent').get('label'),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, CartActions), dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TradeInDetails));
