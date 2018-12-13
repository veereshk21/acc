/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import RatingsSlide from './RatingsSlide';
import ReviewsSlide from './ReviewsSlide';

export default class Reviews extends Component {
  constructor(props) {
    super(props);
    this.getNoRatingsReviewsSlide = this.getNoRatingsReviewsSlide.bind(this);
    this.params = '';
  }

  getNoRatingsReviewsSlide() {
    return (
      <div className="pdpSlide background_FF  pad10 margin12 onlyRightMargin span_12_of_12">
        <div className="pad20">
          <h4 className="h2">This device has no ratings & reviews yet.</h4>
          <div className=" margin24 noSideMargin ">
            <span className="rating m-0-star m-large" aria-label="no ratings" />
          </div>
        </div>
      </div>);
  }
  initReviewSwiper(selectedSlideIndex) {
    this.params = {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      slidesPerView: '1.1',
      spaceBetween: 12,
      observer: true,
      // calculateHeight: true,
      autoHeight: true,
      // observer: PropTypes.bool,
      observeParents: true,
      rebuildOnUpdate: true,
      onInit: (swiper) => {
        // setTimeout(() => {
        //   swiper.update();
        // }, 100);
        swiper.slideTo(selectedSlideIndex, 1000, false);
      },
    };
  }

  ratingFunc(number, classNames) {
    return ('rating m-' + (Math.round(number * 2) / 2).toFixed(1) + '-star ').replace('.', '_') + classNames;
  }

  render() {
    const { params } = this;
    const { isActive, cqKeys } = this.props;
    const selectedSlideIndex = (this.props.queryParam.review) ? parseInt(this.props.queryParam.review, 10) + 1 : 0;
    const totalReviewSlides = parseInt(this.props.reviews.length + 1, 10);
    const ratingSlide = (this.props.ratings) ? (
      <div>
        <div className="pdpSlide background_FF col pad10 margin12 onlyRightMargin span_12_of_12" ><span className="is-hidden" aria-label={`Multi-page view slide 1 of ${totalReviewSlides}`} />
          <span className="is-hidden" aria-label="use alt+left/right arrow to switch slides" /><RatingsSlide ratings={this.props.ratings} ratingFunc={this.ratingFunc} cqKeys={cqKeys} />
        </div>
      </div>) : <div className="is-hidden" />;

    this.initReviewSwiper(selectedSlideIndex);

    return (
      <div ref="reviewsSwiperWrap" className={`accessoriesPDP_reivewsSwiper margin12 onlyTopMargin ${isActive ? '' : 'is-hidden'}`}>
        {(Object.keys(this.props.ratings).length > 0 && this.props.reviews.length > 0) ?
          <Swiper {...params} >
            {ratingSlide}
            {
              this.props.reviews.map((review, index) => (
                <div key={'acw' + index}>
                  <div className="pdpSlide background_FF col pad10 margin12 onlyRightMargin span_12_of_12">
                    <ReviewsSlide
                      reviews={review}
                      index={index}
                      ratingFunc={this.ratingFunc}
                      store_dispatch={this.props.store_dispatch}
                      cqKeys={cqKeys}
                    />
                  </div>
                </div>))
            }
          </Swiper> : this.getNoRatingsReviewsSlide()
        }
      </div>
    );
  }
}

Reviews.propTypes = {
  isActive: PropTypes.bool,
  reviews: PropTypes.any,
  ratings: PropTypes.any,
  queryParam: PropTypes.object,
  cqKeys: PropTypes.object,
  store_dispatch: PropTypes.any,
};
