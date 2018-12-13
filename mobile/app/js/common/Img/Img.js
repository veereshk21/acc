/*
Use of this Component
<Image src="" alt=""/>
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const CLASS_NAME = 'img';

class Img extends Component { // eslint-disable-line
  render() {
    const { src, className, alt } = this.props;
    /* Line below adds Class .img by default if its not already added */
    const classNames = !className ? CLASS_NAME : ` ${CLASS_NAME} ${className}`;
    return (
      <img {...this.props} src={src} className={classNames} alt={alt} />
    );
  }
}
Img.defaultProps = {
  className: '',
  src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
};

Img.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  alt: PropTypes.string.isRequired,
};

export default Img;
