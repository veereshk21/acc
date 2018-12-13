import Link from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import * as Constants from './../Constants';

const SelectLink = (props) => {
  const { to, className, children, ...otherProps } = props;
  const classNames = !className ? Constants.SELECT_LINK_CSS_CLASSES : `${Constants.TEXT_BOX_CSS_CLASSES} ${className}`;
  return (
    // TODO: update with correct css classes and props
    <Link to={to} className={classNames} role="button" {...otherProps}>{children}</Link>
  );
};

SelectLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

SelectLink.defaultProps = {
  to: '/',
  className: '',
  children: '',
};

export default SelectLink;

