/**
 * Created by gautam on 2/5/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const CLASS_NAME = 'deviceimg';

/* eslint-disable react/prefer-stateless-function */
class DeviceImage extends Component {
  render() {
    const { imageUrl, className, alt } = this.props;
    const classNames = !className ? CLASS_NAME : ` ${CLASS_NAME} ${className}`;
    return (
      <div className="media textAlignCenter pad20 noSidePad">
        <img src={imageUrl} className={classNames} alt={alt} />
      </div>
    );
  }
}

DeviceImage.defaultProps = {
  className: CLASS_NAME,
  alt: 'image',
};

DeviceImage.propTypes = {
  imageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string,
  alt: PropTypes.string,
};

export default DeviceImage;
