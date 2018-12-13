import React from 'react';
import PropTypes from 'prop-types';

import ShippingAddress from './shippingAddress';
import StoreDetails from './storeDetails';

const ShippingSection = (props) => (
  <div
    id="shippingAddressSection"
    style={{ wordWrap: 'break-word' }}
  >
    {props.ISPUSelected ?
      <StoreDetails {...props} />
      :
      <ShippingAddress {...props} />
    }
  </div>
);

ShippingSection.propTypes = {
  ISPUSelected: PropTypes.bool,
};
export default ShippingSection;
