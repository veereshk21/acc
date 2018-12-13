import React from 'react';
import PropTypes from 'prop-types';


const CartDeviceImage = ({ isSim, imageUrl, imageAlt }) => (
  <div className="width100">
    {!isSim ? <img src={`${imageUrl}&hei=160&wid=80`} srcSet={`${imageUrl}&hei=320&wid=160 2x`} alt={imageAlt} /> : <img src={`${imageUrl}&scl=0.9&wid=70&hei=100`} srcSet={`${imageUrl}&scl=0.9&wid=140&hei=200 2x`} alt={imageAlt} />}
  </div>
);


CartDeviceImage.defaultProps = {};


CartDeviceImage.propTypes = {
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  isSim: PropTypes.bool,
};
export default CartDeviceImage;
