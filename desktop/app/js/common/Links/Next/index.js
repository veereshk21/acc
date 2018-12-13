import Link from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import * as Constants from './../Constants';

const NextLink = (props) => {
  const { to, className, children, ...otherProps } = props;
  const classNames = !className ? Constants.NEXT_LINK_CSS_CLASSES : `${Constants.NEXT_LINK_CSS_CLASSES} ${className}`;
  return (
  // TODO: set appropriate styles once css classes once available
    <Link to={to} className={classNames} role="button" {...otherProps}>{children}</Link>
  );
};

NextLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

NextLink.defaultProps = {
  to: '/',
  className: '',
  children: 'Next',
};

export default NextLink;

