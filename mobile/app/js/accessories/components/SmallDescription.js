import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
class SmallDescription extends Component {
  render() {
    return (
      <div className="smallText center pad10">
        {Children.toArray(this.props.children)}
      </div>
    );
  }
}

SmallDescription.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SmallDescription;
