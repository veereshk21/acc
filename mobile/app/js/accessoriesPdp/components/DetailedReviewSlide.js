/**
* DetailedReview.js
* renders Detailed description

*
* */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import BackButton from '../../common/BackButton/BackButton';

class DetailedReview extends Component {
  ratingFunc(number, classNames) {
    return ('rating m-' + (Math.round(number * 2) / 2).toFixed(1) + '-star ').replace('.', '_') + classNames;
  }
  render() {
    const query = qs.parse(this.props.location.search);
    const reviewNo = query['?review'] || query.review;
    const reviewDetail = window.reviewsJSON[reviewNo];
    const totalReviews = window.reviewsJSON.length;
    // const backLink = '/?review=' + reviewNo;
    const { cqKeys } = this.props;

    return (
      <div className="pad12 onlyTopPad">
        <BackButton to="/" >{cqKeys.label.OD_ACCPDP_BACK_BUTTON_TEXT}</BackButton>
        <div className="pad30">
          <div className="fontSize_2 fontTextBold">{parseInt(reviewNo, 10) + 1} of {totalReviews} {cqKeys.label.OD_ACCPDP_DETAIL_REVIEWS_TITLE_TEXT}</div>
          <h4 className="h2 margin12 onlyTopMargin">{reviewDetail.Title}</h4>
          <div className={this.ratingFunc(reviewDetail.Rating)} />
          <div className="margin18 onlyTopMargin fontSize_2 fontTextBold">{reviewDetail.UserNickname}, {new Date(reviewDetail.SubmissionTime).toLocaleDateString('en-US')}</div>
          <div className="margin18 noSideMargin fontSize_2 positionRelative">
            {reviewDetail.ReviewText}
          </div>
        </div>
      </div>
    );
  }
}

DetailedReview.defaultProps = {
  cqKeys: {
    label: {
      OD_ACCPDP_BACK_BUTTON_TEXT: '',
      OD_ACCPDP_DETAIL_REVIEWS_TITLE_TEXT: '',
    },
  },
};

/* eslint-disable react/require-default-props, react/forbid-prop-types */
DetailedReview.propTypes = {
  cqKeys: PropTypes.shape({
    label: PropTypes.shape({
      OD_ACCPDP_BACK_BUTTON_TEXT: PropTypes.string,
      OD_ACCPDP_DETAIL_REVIEWS_TITLE_TEXT: PropTypes.string,
    }),
  }),
};

export default DetailedReview;
DetailedReview.propTypes = {
  location: PropTypes.object,
};
