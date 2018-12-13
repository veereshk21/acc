import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
  Grid,
} from 'react-flexbox-grid';
import RecommendedAccessories from './recommendedAccessories';


class RecommendedAccesoriesWrapper extends Component {
  constructor(props) {
    super(props);
    this.swiper = null;
    this.goToAccessoryProductDetail = this.goToAccessoryProductDetail.bind(this);
  }

  goToAccessoryProductDetail() {
    window.location = this.props.accessoryShopURL ? this.props.accessoryShopURL : '/accessories';
  }

  render() {
    const { recommendedAccessories, cqContent } = this.props;
    const { isFetching, data } = recommendedAccessories;
    const params = {
      slidesPerView: 2,
    };
    return (
      <Grid className="recAccessoryPanel">

        {(isFetching === false && Object.keys(data).length > 0) && <Row>
          <Col md={4} lg={4} style={{ paddingRight: 0, paddingLeft: 0 }} className="positionRelative border_CC onlyRightBorder">
            <div className="margin10 onlySideMargin border_CC onlyBottomBorder height132">
              <h2 className="color_000 fontSize_9 pad10" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_SHOP_ALL_ACCESSORIES_TEXT }} />
            </div>
            <div className="pad10 onlySidePad textAlignRight width100 positionAbsolute" style={{ bottom: '0px' }}>
              <button
                className="button color_000 tertiary fontSize_5"
                onClick={() => {
                  this.goToAccessoryProductDetail();
                }}
              >
                {cqContent.label.DT_OD_CONFIRMATION_SHOP_ALL_ACCESSORIES_CTA}
              </button>
            </div>
          </Col>
          <Col md={8} lg={8} style={{ paddingLeft: 0 }}>
            <div className="positionRelative">
              <Swiper
                {...params}
                ref={(node) => {
                  if (node && node.swiper) {
                    this.swiper = node.swiper;
                  }
                }}
              >
                {data.output.recommendedAccessoriesDetails.map((accessory, id) => (accessory.skuDetails !== null && <div key={`recommendedAcc_${id}`} className="pad12 accessoryTile">
                  <RecommendedAccessories {...accessory} cqContent={cqContent} />
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
  accessoryShopURL: PropTypes.string,
};
export default RecommendedAccesoriesWrapper;
