import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col } from 'react-flexbox-grid';
import '../../../css/modules/arrows.css';

const CLASS_NAME = 'secondaryCTA m-back color_000 onlyBottomMargin displayBlock positionRelative margin12 onlyBottomMargin pad12 onlySidePad';

class BackButton extends Component { // eslint-disable-line
  render() {
    const { className, children, ...otherProps } = this.props;
    const classNames = !className ? CLASS_NAME : `${className}`; // eslint-disable-line
    return (
      <Col xs={12} className="pad6" style={{ borderBottom: '1px solid #747676' }}>
        <Link to={this.props.to} {...otherProps} className={classNames} role="button" analyticstrack="back">{children}</Link>
      </Col>
    );
  }
}

BackButton.defaultProps = {
  className: '',
  children: 'Back',
  to: '/',
};

BackButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};


export default BackButton;
