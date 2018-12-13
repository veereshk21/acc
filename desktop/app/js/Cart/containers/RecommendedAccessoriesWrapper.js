import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { removeStandAloneAccessory, addRecommAccessoryToCart, getRecommendedAccProductDetails, recommAccPDPInvalidateAsyncFetch } from './../actions';
import RecommendedAccessoriesWrapper from './../components/RecommendedAccesoriesWrapper';

const mapStateToProps = (state) => {
  const cartData = state.get('cartData').get('output').toJS();
  const recommendedAccessories = state.get('recommendedAccessories');
  const recommAccessProductDetails = state.get('recommAccessProductDetails');
  const cqContent = state.get('cqContent').toJS();
  return {
    cqContent,
    recommendedAccessories,
    recommAccessProductDetails,
    accessoryGWURL: cartData.accessoryPDPURL,
    accessoryPDPURL: cartData.accessoryPDPURL,
    accessoryShopURL: cartData.accessoryShopURL,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  { removeStandAloneAccessory, addRecommAccessoryToCart, getRecommendedAccProductDetails, recommAccPDPInvalidateAsyncFetch }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RecommendedAccessoriesWrapper));
