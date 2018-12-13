import React, { Component } from 'react';
import PropTypes from 'prop-types';

class A extends Component { // eslint-disable-line
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]),
  };

  static defaultProps = {
    className: '',
    children: null,
  };

  render() {
    const { className, children, ...otherProps } = this.props;
    return (
      <a {...otherProps} className={className}>{children}</a>
    );
  }
}

export default A;
