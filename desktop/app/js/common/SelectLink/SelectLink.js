import ClassNames from 'classnames';
import Link from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import * as Constants from './../Constants';

class SelectLink extends Component {
  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  };

  static defaultProps = {
    to: '/',
    className: '',
    children: '',
  };

  render() {
    const { to, className, children, ...otherProps } = this.props;
    const classNames = !className ? Constants.SELECT_LINK_CSS_CLASSES : ClassNames(Constants.SELECT_LINK_CSS_CLASSES, className);
    return (
      // TODO: update with correct css classes and props
      <Link to={to} className={classNames} role="button" {...otherProps}>{children}</Link>
    );
  }
}

export default SelectLink;

