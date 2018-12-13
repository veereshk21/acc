/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Img from '../../common/Img/Img';

class ReviewOrderImage extends Component {
  render() {
    const { device, itemCount } = this.props;
    const stripImage = device.deviceImageUrl.indexOf('?') > 0 ? device.deviceImageUrl.split('?')[0] : device.deviceImageUrl;
    return (
      <div className=" wid100 textAlignRight">
        <Img
          src={`${stripImage}?$pngaplha$&wid=75&hei=120`}
          srcSet={`${stripImage}?$pngaplha$&wid=150&hei=240 2x`}
          alt={device.deviceName}
        />
        {(device.bicOfferApplied && device.bicMessageMap !== null) &&
          <Link
            to={`bicOfferDetails/${itemCount}`}
            className="color_blue fontSize_1_3 pad12 onlyTopPad displayBlock"
            role="link"
            analyticstrack="bic-offer-details"
          >See offer details
          </Link>}
      </div>
    );
  }
}

ReviewOrderImage.propTypes = {
  device: PropTypes.object,
  itemCount: PropTypes.string,
};

export default ReviewOrderImage;
