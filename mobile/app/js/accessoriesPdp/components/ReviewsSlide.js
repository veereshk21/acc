/* eslint-disable no-script-url */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MAX_CHAR_LIMIT } from '../constants';

class RatingsSlide extends Component {
  showReviewDetailFunc() {
    this.props.store_dispatch('/reviewDetail?review=' + (this.props.index));
  }
  render() {
    const showReadMore = (this.props.reviews.ReviewText.length > MAX_CHAR_LIMIT);
    const shortReview = this.props.reviews.ReviewText.substring(0, MAX_CHAR_LIMIT) + '...';
    const totalReviews = window.reviewsJSON.length;
    const { cqKeys } = this.props;

    return (
      <div className="pad30">
        <div className="fontSize_2 fontTextBold">{this.props.index + 1} of {totalReviews} {cqKeys.label.OD_ACCPDP_DETAIL_REVIEWS_TITLE_TEXT}</div>
        <h4 className={`h2 margin12 onlyTopMargin ${(this.props.reviews.Title.length > 66 ? 'fontVmax3-2' : '')}`}>{this.props.reviews.Title}</h4>
        <div className={this.props.ratingFunc(this.props.reviews.Rating)} />
        <div className="margin18 onlyTopMargin fontSize_2 fontTextBold">{this.props.reviews.UserNickname}, {new Date(this.props.reviews.SubmissionTime).toLocaleDateString('en-US')}</div>
        <div className="margin18 noSideMargin fontSize_2 positionRelative">
          {(showReadMore ? shortReview : this.props.reviews.ReviewText)}
        </div>
        <a
          href="javascript:;"
          role="button"
          className={(showReadMore ? 'margin18 noSideMargin displayBlock' : 'is-hidden')}
          onClick={this.showReviewDetailFunc.bind(this)}
        >{cqKeys.label.OD_ACCPDP_REVIEWS_READ_MORE_TEXT}
        </a>
      </div>
    );
  }
}


RatingsSlide.defaultProps = {
  cqKeys: {
    label: {
      OD_ACCPDP_DETAIL_REVIEWS_TITLE_TEXT: '',
      OD_ACCPDP_REVIEWS_READ_MORE_TEXT: '',
    },
  },
};

/* eslint-disable react/require-default-props, react/forbid-prop-types */
RatingsSlide.propTypes = {
  cqKeys: PropTypes.shape({
    label: PropTypes.shape({
      OD_ACCPDP_DETAIL_REVIEWS_TITLE_TEXT: PropTypes.string,
      OD_ACCPDP_REVIEWS_READ_MORE_TEXT: PropTypes.string,
    }),
  }),
};

export default RatingsSlide;
RatingsSlide.propTypes = {
  ratingFunc: PropTypes.func,
  reviews: PropTypes.object,
  index: PropTypes.number,
  store_dispatch: PropTypes.func,
};
