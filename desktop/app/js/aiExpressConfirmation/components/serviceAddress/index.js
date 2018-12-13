import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from '../../../common/Helpers';
import { normalizePhoneNumber } from '../../../common/validation';

const ServiceAddressSection = (props) => {
  const {
    devices,
  } = props;

  return (
    <div id="ServiceAddressSection">
      {devices.map((device, index) => (
        <div key={`serviceAddress-${index}`}>
          <div style={{ wordWrap: 'break-word' }} >
            {/* Title */}
            <div className="margin12 onlyBottomMargin">
              <h3 className="fontSize_5 displayInlineBlock verticalBottom margin3 onlyRightMargin">
                Service address
              </h3>
            </div>
            {/* Shipping Address */}
            {(device.serviceAddress.firstName || device.serviceAddress.lastName) &&
              <p> {capitalize(device.serviceAddress.firstName)} {capitalize(device.serviceAddress.lastName)}</p>
            }
            {device.serviceAddress.address1 && <p>{capitalize(device.serviceAddress.address1)}</p>}
            {device.serviceAddress.address2 && <p>{capitalize(device.serviceAddress.address2)}</p>}
            {(device.serviceAddress.city || device.serviceAddress.state || device.serviceAddress.zipcode) && <p>{device.serviceAddress.city}, {device.serviceAddress.state}, {device.serviceAddress.zipcode}</p>}
            {device.serviceAddress.phoneNumber && <p>{normalizePhoneNumber(device.serviceAddress.phoneNumber)}</p>}
            {/* {device.serviceAddress.emailAddress && <p> {device.serviceAddress.emailAddress.toLowerCase()}</p>} */}
          </div>
        </div>
      ))}
    </div>
  );
};
ServiceAddressSection.propTypes = {
  devices: PropTypes.array,
};
export default ServiceAddressSection;
