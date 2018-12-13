import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-flexbox-grid';
import { history } from './../../store';
import Tabs from './Tabs';
import Features from './Features';
import Reviews from './Reviews';
import Specs from './Specs';
import Button from '../../common/Button/Button';
import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';

class AccessoriesPDP extends Component {
  constructor(props) {
    super(props);
    this.onClickNext = this.onClickNext.bind(this);
  }
  componentDidMount() {
    this.props.fetchDeviceRatingsReviews(this.props.accId);
    this.props.isOutOfStock && this.props.notifyOutOfStock(this.props.cqKeys.error.OD_ACCESSORY_OUT_OF_STOCK); // eslint-disable-line
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.reviews && !Object.is(this.props.reviews, nextProps.reviews)) {
      window.reviewsJSON = this.props.reviews;
    }
  }

  onClickNext() {
    const isColorOptions = (this.props.colorSkus.length > 1);
    const isCapacityOptions = (this.props.capacitySkus.length > 1);
    const { addToCartURL, accId, productDetails } = this.props;

    if (isColorOptions) {
      history.push('/chooseColor/skuId=' + this.props.accSkuId);
    } else if (isCapacityOptions) {
      history.push('/chooseCapacity/skuId=' + this.props.accSkuId);
    } else {
      this.props.addAccessoryToCart(addToCartURL, accId, productDetails.skuId);
    }
  }

  render() {
    const {
      brandName,
      displayName,
      shortDescription,
      isOutOfStock,
      productDetails,
      detailedDescription,
      displayImageURL,
      displayImageLargeURL,
      shippingDateLabel,
      selectedTab,
      techSpecs,
      ratings,
      reviews,
      cqKeys,
      appFeatures,
    } = this.props;
    const tabArr = techSpecs ? ['Features', 'Reviews', 'Specs'] : ['Features', 'Reviews'];
    const store_dispatch = history.push;

    return (
      <Grid className="noSidePad">
        {this.props.isFetching === true && <Loader />}
        <Title visuallyHidden tabIndex="0" dangerouslySetInnerHTML={{ __html: `${brandName} ${displayName}` }} />
        <Tabs list={tabArr} active={selectedTab} changeTabFunc={this.props.selectTab} />
        <div className="pageContent">
          <Features
            isActive={selectedTab === 'Features'}
            brandName={brandName}
            displayName={displayName}
            shortDescription={shortDescription}
            detailedDescription={detailedDescription}
            productDetails={productDetails}
            displayImageURL={displayImageURL}
            displayImageLargeURL={displayImageLargeURL}
            shippingDateLabel={shippingDateLabel}
            isOutOfStock={isOutOfStock}
            store_dispatch={history.push}
            cqKeys={cqKeys}
            appFeatures={appFeatures}
          />
          <Reviews
            isActive={selectedTab === 'Reviews'}
            ratings={ratings}
            reviews={reviews}
            store_dispatch={store_dispatch}
            queryParam={this.props.location.search}
            cqKeys={cqKeys}
          />
          {
            this.props.techSpecs && <Specs isActive={selectedTab === 'Specs'} techSpecs={techSpecs} store_dispatch={store_dispatch} cqKeys={cqKeys} />
          }
          <div className="pad20 centerBlock textAlignCenter clearfix">
            <Button
              type="button"
              className={`button large ${isOutOfStock ? 'disabled m-bglight' : ''}`}
              disabled={isOutOfStock}
              role="button"
              onClick={this.onClickNext}
            >
              {cqKeys.label.OD_ACCPDP_NEXT_BUTTON_TEXT}
            </Button>
          </div>
        </div>
      </Grid>
    );
  }
}

AccessoriesPDP.defaultProps = {
  cqKeys: {
    label: {
      OD_ACCPDP_NEXT_BUTTON_TEXT: '',
    },
  },
};

/* eslint-disable react/require-default-props, react/forbid-prop-types */
AccessoriesPDP.propTypes = {
  cqKeys: PropTypes.shape({
    label: PropTypes.shape({
      OD_ACCPDP_NEXT_BUTTON_TEXT: PropTypes.string,
    }),
  }),
  capacitySkus: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  colorSkus: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  accSkuId: PropTypes.string,
  accId: PropTypes.string,
  brandName: PropTypes.string,
  displayName: PropTypes.string,
  productDetails: PropTypes.object,
  shortDescription: PropTypes.string,
  detailedDescription: PropTypes.string,
  displayImageURL: PropTypes.string,
  displayImageLargeURL: PropTypes.string,
  selectedTab: PropTypes.string,
  location: PropTypes.object,
  addToCartURL: PropTypes.string,
  isOutOfStock: PropTypes.bool,
  shippingDateLabel: PropTypes.string,
  ratings: PropTypes.any,
  reviews: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  appFeatures: PropTypes.array,
  techSpecs: PropTypes.string,
  fetchDeviceRatingsReviews: PropTypes.func,
  selectTab: PropTypes.func,
  addAccessoryToCart: PropTypes.func,
  isFetching: PropTypes.bool,
};

export default AccessoriesPDP;
