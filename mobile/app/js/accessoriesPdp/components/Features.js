import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Swiper from 'react-id-swiper';
import FeatureSlide from './FeatureSlide.js';
import HorizontalRule from '../../common/HorizontalRule/index.js';

export default class Features extends Component {
  constructor(props) {
    super(props);
    this.showDetailDesc = this.showDetailDesc.bind(this);
  }

  showDetailDesc() {
    this.props.store_dispatch('/fullDescription');
  }

  render() {
    const {
      isActive,
      brandName,
      displayName,
      productDetails,
      shortDescription,
      displayImageURL,
    } = this.props;
    const imgSuffix = displayImageURL.indexOf('?') > -1 ? '&' : '?';
    if (!productDetails) {
      return (<div />);
    }

    const params = {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      slidesPerView: '1.1',
      spaceBetween: 0,
      a11y: true,
      autoHeight: true,
      // calculateHeight: true,
    };

    const FeatureDescription = (
      <Row className="noSideMargin">
        <Col xs={12} className="border_grey pdpSlide noLeftBorder pad32 ">

          <Row className="">
            <Col xs={12}>
              <div className=" margin10 noSideMargin">
                <span className="displayBlock fontSize_5 fontDisplayBold" dangerouslySetInnerHTML={{ __html: brandName }} />
                <span className="displayBlock fontSize_5 fontDisplayBold" dangerouslySetInnerHTML={{ __html: displayName }} />
                {(productDetails.discountedPrice !== null && productDetails.discountedPrice > 0) ?
                  <div className="pad16 onlyTopPad">
                    <span className="displayInlineBlock fontSize_4 bold">${productDetails.discountedPrice} </span>
                    <span className="displayInlineBlock fontSize_4 color_959595 textDecLineThrough pad6 onlyLeftPad">${productDetails.retailPrice}</span>
                  </div> :
                  <span className="displayBlock fontSize_4 pad12 onlyTopPad bold">${productDetails.retailPrice}</span>}
              </div>
              <HorizontalRule margin="16px 0 16px" />
            </Col>
          </Row>

          <div
            role="presentation"
            className="accPDP_description fontSize_3 fadeOutTextAccessories fontDisplay"
            aria-label="Detailed Description Modal"
            onClick={this.showDetailDesc.bind(this)}
            dangerouslySetInnerHTML={{ __html: shortDescription }}
          />
          <div className="textAlignCenter pad12 onlyTopPad">
            <img src={`${displayImageURL}${imgSuffix}wid=135&hei=135`} srcSet={`${displayImageURL}${imgSuffix}wid=135&hei=135`} alt={displayName} />
          </div>
          {
            productDetails.promotionDetail !== null &&
            <div className="positionRelative">
              <span className="promo_icon_triangle" aria-hidden="true" />
            </div>
          }
        </Col>
      </Row>
    );
    console.log(this.props.appFeatures);
    return (
      <div className={`${isActive ? '' : 'is-hidden'}`} role="main" aria-label="Features section " >
        {(this.props.appFeatures && this.props.appFeatures.length > 0) ?
          <Swiper {...params} ref={(node) => this.swiper = node !== null ? node.swiper : null}>
            {FeatureDescription}
            {
              this.props.appFeatures.map((feature, index) =>
                <div key={index}><FeatureSlide feature={feature} index={index} /></div>)
            }
          </Swiper> : FeatureDescription}
      </div>
    );
  }
}

Features.propTypes = {
  isActive: PropTypes.bool,
  brandName: PropTypes.string,
  displayName: PropTypes.string,
  shortDescription: PropTypes.string,
  displayImageURL: PropTypes.string,
  productDetails: PropTypes.object,
  appFeatures: PropTypes.array,
  store_dispatch: PropTypes.func,
};
