import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* eslint-disable react/prefer-stateless-function */
export default class Reviews extends Component {
/* eslint-enable */
  render() {
    return (
      <div className="margin24 noSideMargin">
        <div className="fontTextBold fontSize_3">{this.props.data.title}</div>
        <div className="color_959595 fontSize_2">{this.props.data.detailedText}</div>
      </div>
    );
  }
}

Reviews.propTypes = {
  data: PropTypes.object,
};
