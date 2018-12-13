import Link from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import * as Constants from './../Constants';

const UnderLineLink = (props) => {
  const { to, className, children, ...otherProps } = props;
  const classNames = !className ? Constants.UNDERLINE_LINK_CSS_CLASSES : `${Constants.UNDERLINE_LINK_CSS_CLASSES} ${className}`;
  return (
    // TODO: update with correct css classes and props
    <Link to={to} className={classNames} role="button" {...otherProps}>{children}</Link>
  );
};

UnderLineLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

UnderLineLink.defaultProps = {
  to: '/',
  className: '',
  children: '',
};

export default UnderLineLink;
