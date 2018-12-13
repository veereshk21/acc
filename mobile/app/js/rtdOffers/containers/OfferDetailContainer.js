/**
 * Created by santhra  on 6/15/2017.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
// import { push, goBack } from 'react-router-redux';
import OfferDetail from '../components/OfferDetail';

const mapStateToProps = (state, ownprops) => {
  const data = state.toJSON();
  return {
    selectedOffer: data.rtdOfferInfo.availOffers.map((offer) => offer.offers.filter((offers) => offers.offerId === ownprops.match.params.offerId)).filter((len) => len.length > 0)[0][0],
    rtdOfferInfo: data.rtdOfferInfo,
    isFetching: data.asyncCallStatus.isFetching,
  };
};
// const mapDispatchToProps = (dispatch) => ({
//   dispatch,
//   push,
//   goBack,
// });

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetail);
