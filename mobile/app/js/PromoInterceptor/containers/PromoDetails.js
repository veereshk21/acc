
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PromoDetails from '../components/PromoDetails';
import * as actions from '../actions';

const mapStateToProps = (state, ownProps) => {
  const data = state.get('data').toJS();
  console.log(data);
  const promo = data.promoOptions[ownProps.match.params.mode] || data.promoOptions[0];
  return {
    ...promo,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PromoDetails);
