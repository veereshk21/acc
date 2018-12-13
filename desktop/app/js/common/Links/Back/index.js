import Link from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import * as Constants from './../Constants';

const BackLink = (props) => {
  const { to, className, children, ...otherProps } = props;
  const classNames = !className ? Constants.BACK_LINK_CSS_CLASSES : `${Constants.BACK_LINK_CSS_CLASSES} ${className}`;
  return (
    // TODO: set appropriate styles once css classes once available
    <Link to={to} className={classNames} role="button" {...otherProps}>{children}</Link>
  );
};

BackLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

BackLink.defaultProps = {
  to: '/',
  className: '',
  children: 'Back',
};

export default BackLink;

