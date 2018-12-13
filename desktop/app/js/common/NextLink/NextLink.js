import ClassNames from 'classnames';
import Link from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import * as Constants from './../Constants';

class NextLink extends Component {
  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  };

  static defaultProps = {
    to: '/',
    className: '',
    children: 'Next',
  };

  render() {
    const { to, className, children, ...otherProps } = this.props;
    const classNames = !className ? Constants.NEXT_LINK_CSS_CLASSES : ClassNames(Constants.NEXT_LINK_CSS_CLASSES, className);
    return (
      // TODO: set appropriate styles once css classes once available
      <Link to={to} className={classNames} role="button" {...otherProps}>{children}</Link>
    );
  }
}

export default NextLink;
