/**
 * Created by hmahad on 1/19/2017.
 */


import React from 'react';
import PropTypes from 'prop-types';

const HeroPriceComponent = ({ displayPrice }) => (
  <span className="positionRelative fontSize_7 fontWeightBold" aria-label={`$${displayPrice}`}>
    ${displayPrice}
  </span>
);

HeroPriceComponent.propTypes = {
  displayPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
export default HeroPriceComponent;
