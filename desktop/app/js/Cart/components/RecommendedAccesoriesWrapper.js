import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
  Grid,
} from 'react-flexbox-grid';
import RecommendedAccessories from './RecommendedAccessories';
import './../../../css/pages/recommendedAccessories/recommendedAccessories.scss';


class RecommendedAccesoriesWrapper extends Component {
  constructor(props) {
    super(props);
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.swiper = null;

    this.goToAccessoryProductDetail = this.goToAccessoryProductDetail.bind(this);
  }

  goNext() {
    if (this.swiper) this.swiper.slideNext();
  }

  goPrev() {
    if (this.swiper) this.swiper.slidePrev();
  }

  goToAccessoryProductDetail() {
    window.location = this.props.accessoryShopURL;
  }

  render() {
    const { recommendedAccessories, recommAccessProductDetails, addRecommAccessoryToCart, getRecommendedAccProductDetails, recommAccPDPInvalidateAsyncFetch, cqContent, accessoryPDPURL } = this.props;
    const { isFetching, data } = recommendedAccessories;
    const params = {
      slidesPerView: 2,
      /*breakpoints: {
        // when window width is <= 640px
        640: {
          slidesPerView: 'auto',
        },
        // when window width is <= 800px
        800: {
          slidesPerView: 2,
        },
      },*/
    };
    return (
      <Grid className="recAccessoryPanel">

        {(isFetching === false && Object.keys(data).length > 0) && <Row>
          <Col md={4} lg={4} style={{ paddingRight: 0, paddingLeft: 0 }} className="background_black positionRelative">
            <div className="margin10 onlySideMargin border_white onlyBottomBorder height132">
              <h2 className="color_FFF fontSize_9 pad10">{cqContent.label.DT_OD_CART_SHOP_ALL_ACCESSORIES_TEXT}</h2>
            </div>
            <div className="pad10 onlySidePad textAlignRight width100 positionAbsolute" style={{ bottom: '0px' }}>
              <button
                className="button color_FFF tertiary fontSize_5"
                onClick={() => {
                  this.goToAccessoryProductDetail();
                }}
                analyticstrack="shop-all-accessories-link"
              >
                {cqContent.label.DT_OD_CART_SHOP_ALL_ACCESSORIES_CTA}
              </button>
            </div>
          </Col>
          <Col md={8} lg={8} style={{ paddingLeft: 0 }}>
            <div className="border_e6 onlyTopBorder positionRelative">
              <div
                className="accessoryNavigate"
                style={{
                  height: '214px',
                  display: 'flex',
                  WebkitBoxAlign: 'center',
                  msFlexAlign: 'center',
                  alignItems: 'center',
                }}
              >
                <span className="accessoryNavigate_prev" analyticstrack="accessories-slide-left" onClick={this.goPrev} />
                <span className="accessoryNavigate_next" analyticstrack="accessories-slide-right" onClick={this.goNext} />
              </div>

              <Swiper
                {...params}
                ref={(node) => {
                  if (node && node.swiper) {
                    this.swiper = node.swiper;
                  }
                }}
              >
                {data.output.recommendedAccessoriesDetails.map((accessory, id) => (accessory.skuDetails !== null && <div key={`recommendedAcc_${id}`} className="pad12 accessoryTile">
                  <RecommendedAccessories recommAccessProductDetails={recommAccessProductDetails} getProductDetails={getRecommendedAccProductDetails} recommAccPDPInvalidateAsyncFetch={recommAccPDPInvalidateAsyncFetch} onAddToCart={addRecommAccessoryToCart} {...accessory} accessoryPDPURL={accessoryPDPURL} cqContent={cqContent} />
                </div>))}
              </Swiper>

            </div>
          </Col>
        </Row>}
      </Grid>);
  }
}
RecommendedAccesoriesWrapper.propTypes = {
  cqContent: PropTypes.object,
  recommendedAccessories: PropTypes.object,
  addRecommAccessoryToCart: PropTypes.func,
  getRecommendedAccProductDetails: PropTypes.func,
  recommAccPDPInvalidateAsyncFetch: PropTypes.func,
  accessoryPDPURL: PropTypes.string,
  recommAccessProductDetails: PropTypes.object,
  accessoryShopURL: PropTypes.string,
};
export default RecommendedAccesoriesWrapper;
