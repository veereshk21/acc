import React, { Component } from 'react';
import PropTypes from 'prop-types';

const CLASS_NAME = 'img';

class Img extends Component { // eslint-disable-line
  static defaultProps = {
    className: '',
  };

  static propTypes = {
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    className: PropTypes.string,
    alt: PropTypes.string.isRequired,
  };

  render() {
    const { src, className, alt } = this.props;
    /* Line below adds Class .img by default if its not already added*/
    const classNames = !className ? CLASS_NAME : ` ${CLASS_NAME} ${className}`;
    return (
      <img {...this.props} src={src} className={classNames} alt={alt} />
    );
  }
}

export default Img;
