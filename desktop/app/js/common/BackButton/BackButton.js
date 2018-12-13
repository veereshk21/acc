import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../../css/modules/arrows.scss';

const CLASS_NAME = 'secondaryCTA m-back color_000 bold fontSize_5 margin12 onlyBottomMargin displayBlock';

class BackButton extends Component { // eslint-disable-line
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  };

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  };

  render() {
    const { className, children, ...otherProps } = this.props;
    const classNames = !className ? CLASS_NAME : `${className}`;
    return (
      <Link to={this.props.to} {...otherProps} className={classNames}>{children}</Link>
    );
  }
}

export default BackButton;
