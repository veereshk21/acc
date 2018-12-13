/*
 * Created on Wed Aug 30 2017
 *
 * Copyright (c) 2017 Verizon Wireless
 * Author Srikrishna Gumma
 */

import React from 'react';
import PropTypes from 'prop-types';

export const DeviceImage = (props) => { // eslint-disable-line
  return (
    <div className="width30 col">
      <div style={{ overflow: 'hidden', marginLeft: '-60px' }}>
        <img src={`${props.image}?hei=250`} srcSet={`${props.image}?hei=500 2x`} alt={props.alt} />
      </div>
    </div>
  );
};
DeviceImage.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
};
export default DeviceImage;
