import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import PromoSlide from './PromoSlide';
import PromoFullDescription from './PromoFullDescription';
import BackButton from '../../common/BackButton/BackButton';

const params = {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  paginationClickable: true,
  slidesPerView: '1.1',
  spaceBetween: 10,
  onInit: (swiper) => {
    setTimeout(() => {
      swiper.updateAutoHeight();
    }, 100);
  },
};

export default class Promotions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPageSlides: this.props.promotions.length
        ? this.props.promotions.length
        : 0,
      fullDesc: false,
      initialSlide: 0,
    };

    this.showFullDesc = this.showFullDesc.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this);
  }

  componentDidMount() {
    if (!this.props.promotions && !this.props.promotions.length) {
      this.props.fetchPromos();
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  closeOverlay() {
    this.setState({
      fullDesc: false,
    });
  }

  showFullDesc(promoToShow) {
    this.setState({
      fullDesc: true,
      initialSlide: promoToShow,
    });

    // hashHistory.push('/fullPromoDescription')
  }

  render() {
    if (this.state.fullDesc) {
      return (
        <PromoFullDescription
          closeOverlay={this.closeOverlay}
          promoitem={this.props.promotions.find((item, index) => this.state.initialSlide === index)}
        />
      );
    }
    if (this.props.promotions.length === 0 && this.props.isGlobalPromo) {
      return (
        <div className="pad12 onlyTopPad">
          <BackButton to="/">Back</BackButton>
          {this.props.url && <iframe title={this.props.globlPromoTitle} src={this.props.url} className="width100" style={{ height: '70vh', border: '0' }} />}
        </div>
      );
    }
    if (this.props.promotions.length === 1) {
      /** Dont display as a carousel in case of a  single promo */
      return (
        <div className="margin12 onlyTopMargin background_FF" role="main">
          <BackButton to="/">Back</BackButton>
          {this.props.promotions.map((item, index) => (
            <div key={index}>
              <span
                className="is-hidden"
                aria-label={`Multi-page view slide ${index + 2} of ${this.state.totalPageSlides}`}
              />
              <PromoSlide
                showFullDesc={this.showFullDesc.bind(this)}
                promoitem={item}
              />
            </div>
          ))}
        </div>
      );
    }
    if (this.props.promotions.length > 1) {
      /** Display a carousel in case of multiple promos!!!** */
      return (
        <div
          className="margin12 onlyTopMargin"
          role="main"
          aria-label={`Carousel section with ${this.state.totalPageSlides} slides`}
        >
          <BackButton to="/">Back</BackButton>
          <Swiper {...{ initialSlide: this.state.initialSlide, ...params }}>
            {this.props.promotions.map((item, index) => (
              <div key={index}>
                <span
                  className="is-hidden"
                  aria-label={`Multi-page view slide ${index + 2} of ${this.state.totalPageSlides}`}
                />
                <PromoSlide
                  index={index}
                  totalSlides={this.state.totalPageSlides}
                  showFullDesc={this.showFullDesc}
                  promoIndex={index}
                  promoitem={item}
                />
                <div className="pdp_promoStar" />
              </div>
            ))}
          </Swiper>
        </div>
      );
    }
    return null;
  }
}

Promotions.propTypes = {
  promotions: PropTypes.array,
  cqKeys: PropTypes.object,
  fetchPromos: PropTypes.func,
  isGlobalPromo: PropTypes.bool,
  globlPromoTitle: PropTypes.string,
  url: PropTypes.string,
};
