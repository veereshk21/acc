import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MyOffersBanner from '../components/index';
import * as actionCreators from '../actions';

function mapStateToProps(state) {
  const myOffersVisibility = state.get('myOffersBanner');
  const { myOffersBannerJSON } = window;
  const myOffers = typeof myOffersBannerJSON !== typeof undefined ? myOffersBannerJSON.output : {};

  return { myOffers, ...myOffersVisibility };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actionCreators), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOffersBanner);
