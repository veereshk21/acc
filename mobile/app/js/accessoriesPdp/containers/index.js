import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as _ from 'lodash';

import AccessoriesPDP from '../components/index';
import selectTab, { addAccessoryToCart, fetchDeviceRatingsReviews, notifyOutOfStock } from './../actions';


const getDeviceRatingsReviews = (deviceRatingsReviews, deviceId) => {
  const reviewsRatings = { ratings: {}, reviews: {} };
  if (deviceRatingsReviews.Includes && deviceRatingsReviews.Includes.Products && Object.keys(deviceRatingsReviews.Includes.Products).length > 0) {
    reviewsRatings.ratings = deviceRatingsReviews.Includes.Products[deviceId];
  }
  if (deviceRatingsReviews.Results && deviceRatingsReviews.Results.length > 0) {
    reviewsRatings.reviews = deviceRatingsReviews.Results;
  }

  return reviewsRatings;
};

const mapStateToProps = (state) => {
  const output = state.get('output').toJSON();

  if (!output) {
    window.location.replace('/#genericError');
    return {};
  }

  const tabs = state.get('tabs').toJSON();
  const deviceRatingsReviewsData = state.get('deviceRatingsReviews').toJSON();
  const cqKeys = state.get('cqKeys').toJSON();

  const deviceRatingsReviews = getDeviceRatingsReviews(deviceRatingsReviewsData, output.accId);
  let selectedTab = '';
  let selectedProduct = output.skuDetails.length ? output.skuDetails[0] : [];
  tabs.forEach((tab) => {
    if (tab.flag) {
      selectedTab = tab.tabName;
    }
  });
  output.skuDetails.forEach((sku) => {
    if (sku.preSelected) {
      selectedProduct = sku;
    }
  });

  const asyncCallStatus = state.get('asyncCallStatus');
  return {
    colorSkus: _.uniqBy(output.skuDetails, 'colorName'),
    capacitySkus: output.skuDetails.filter((sku) => sku.colorName === state.toJS().deviceConfig.selectedColor),
    accId: output.accId,
    skus: output.skuDetails,
    selectedColor: state.toJS().deviceConfig.selectedColor,
    accSkuId: state.toJS().deviceConfig.skuId,
    brandName: output.brand,
    displayName: output.displayName,
    productDetails: selectedProduct,
    ratings: deviceRatingsReviews.ratings,
    reviews: deviceRatingsReviews.reviews,
    shortDescription: output.shortDescription,
    detailedDescription: output.description,
    techSpecs: output.specification,
    selectedTab,
    isOutOfStock: output.outOfStock,
    displayImageURL: output.displayImageURL,
    displayImageLargeURL: output.displayImageLargeURL,
    shippingDateLabel: output.shippingDateLabel,
    promotionDetail: output.promotionDetail,
    addToCartURL: output.addToCartURL,
    cqKeys,
    appFeatures: output.skuDetails[0].appfeatures,
    ...asyncCallStatus,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  selectTab,
  addAccessoryToCart,
  fetchDeviceRatingsReviews,
  notifyOutOfStock,
}, dispatch);
const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(AccessoriesPDP));
export default App;
