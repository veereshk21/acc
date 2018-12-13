import React from 'react';
import PropTypes from 'prop-types';
import { normalizePhoneNumber } from '../../../common/validation';
import { capitalize } from '../../../common/Helpers';


const ShippingAddress = (props) => {
  const { cqContent, addressInfo } = props;
  return (
    <div>
      {/* Title */}
      <div className="">
        <h3 className="fontSize_5 displayInlineBlock verticalBottom margin3 onlyRightMargin">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SECTION_TITLE}</h3>
      </div>
      {/* Shipping Address */}
      {addressInfo.businessName &&
        <p>{capitalize(addressInfo.businessName)}</p>
      }
      {(addressInfo.firstName || addressInfo.lastName) &&
        <p> {capitalize(addressInfo.firstName)} {capitalize(addressInfo.lastName)}</p>
      }
      {addressInfo.address1 && <p>{capitalize(addressInfo.address1)}</p>}
      {addressInfo.address2 && <p>{capitalize(addressInfo.address2)}</p>}
      {(addressInfo.city || addressInfo.state || addressInfo.zipcode) && <p>{addressInfo.city}, {addressInfo.state}, {addressInfo.zipcode}</p>}
      {addressInfo.phoneNumber && <p>{normalizePhoneNumber(addressInfo.phoneNumber)}</p>}
      {addressInfo.email && <p> {addressInfo.email.toLowerCase()}</p>}
    </div>
  );
};


ShippingAddress.propTypes = {
  cqContent: PropTypes.object,
  addressInfo: PropTypes.object,
};
export default ShippingAddress;
