import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RatingsCategory from './RatingsCategory';

class RatingsSlide extends Component {
  constructor(props) {
    super(props);
    this.readerRatingCalc = this.readerRatingCalc.bind(this);
  }

  readerRatingCalc(number) {
    return (Math.round(number * 2) / 2).toFixed(1);
  }

  render() {
    const self = this;
    const recommendedPercentage = parseInt((self.props.ratings.ReviewStatistics.RecommendedCount / self.props.ratings.TotalReviewCount) * 100, 10);
    const { cqKeys } = this.props;
    const productReconmmendationPercent = `${recommendedPercentage} ${cqKeys.label.OD_ACCPDP_RATINS_RECOMMEND_DEVICE_TITLE}`;
    const starRatingsOverallReader = `${this.readerRatingCalc(self.props.ratings.ReviewStatistics.AverageOverallRating)} out of 5 stars`;
    const overAllRatings = `${cqKeys.label.OD_ACCPDP_RATINGS_OVER_ALL_RATINGS_REVIEWS_TEXT} (${self.props.ratings.TotalReviewCount} ${cqKeys.label.OD_ACCPDP_RATINGS_VIEW_TEXT})`;

    const customRatingStyle = {
      lineHeight: '34px',
      wordSpacing: '20pt',
    };

    return (
      <div className="pad20">
        <h4 className="h2">{cqKeys.label.OD_ACCPDP_RATINGS_TITLE}</h4>
        <div className=" margin6 onlyTopMargin" aria-label={productReconmmendationPercent}>{productReconmmendationPercent}</div>
        <div className=" margin24 noSideMargin ">
          <span className={this.props.ratingFunc(self.props.ratings.ReviewStatistics.AverageOverallRating, 'm-large')} aria-label={starRatingsOverallReader}><span style={customRatingStyle} className="rating-focus-text">{starRatingsOverallReader}</span></span>
          <span className="margin12 onlyTopMargin fontSize_3 displayBlock" aria-label={overAllRatings}>{overAllRatings}</span>
        </div>
        <div className="pad36 onlyBottomPad col width100">
          {
            self.props.ratings.ReviewStatistics.SecondaryRatingsAveragesOrder.map((category) => <RatingsCategory key={category} category={self.props.ratings.ReviewStatistics.SecondaryRatingsAverages[category]} ratingFunc={self.props.ratingFunc} ratingCalcFunc={this.readerRatingCalc} />)
          }
        </div>
      </div>
    );
  }
}

RatingsSlide.defaultProps = {
  cqKeys: {
    label: {
      OD_ACCPDP_RATINGS_TITLE: '',
      OD_ACCPDP_RATINS_RECOMMEND_DEVICE_TITLE: '',
      OD_ACCPDP_RATINGS_OVER_ALL_RATINGS_REVIEWS_TEXT: '',
      OD_ACCPDP_RATINGS_VIEW_TEXT: '',
    },
  },
};

/* eslint-disable react/require-default-props, react/forbid-prop-types */
RatingsSlide.propTypes = {
  cqKeys: PropTypes.shape({
    label: PropTypes.shape({
      OD_ACCPDP_RATINGS_TITLE: PropTypes.string,
      OD_ACCPDP_RATINS_RECOMMEND_DEVICE_TITLE: PropTypes.string,
      OD_ACCPDP_RATINGS_OVER_ALL_RATINGS_REVIEWS_TEXT: PropTypes.string,
      OD_ACCPDP_RATINGS_VIEW_TEXT: PropTypes.string,
    }),
  }),
};

export default RatingsSlide;
RatingsSlide.propTypes = {
  ratingFunc: PropTypes.func,
};
