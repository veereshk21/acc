/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RatingsCategory extends Component {
  render() {
    const starRatingReader = `${this.props.ratingCalcFunc(this.props.category.AverageRating)} out of 5 stars`;

    return (
      <div className="floatLeft pad12 span_6_of_12 noLeftPad">
        <span className={this.props.ratingFunc(this.props.category.AverageRating, '')} aria-label={starRatingReader}><span className="rating-focus-text">{starRatingReader}</span></span>
        <span className="margin12 onlyTopMargin fontSize_2 displayBlock">{this.props.category.Label ? this.props.category.Label : this.props.category.Id}</span>
      </div>
    );
  }
}

export default RatingsCategory;

RatingsCategory.propTypes = {
  ratingCalcFunc: PropTypes.func,
  category: PropTypes.object,
  ratingFunc: PropTypes.func,
};
