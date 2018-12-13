import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

const StoreDetails = (props) => {
  const { storeAddress, storeHours } = props.ispudetailsInfo;
  const storeHoursArray = [];
  if (storeHours) {
    for (const x in storeHours) {
      storeHoursArray.push(`${x}: ${storeHours[x]}`);
    }
  }
  return (
    <Row>
      <Col xs={6}>
        <div style={{ wordWrap: 'break-word' }}>
          {/* Title */}
          <h3 className="fontSize_5">Available for pick-up at</h3>
          <div>
            <p>{storeAddress.address1},</p>
            {storeAddress.address2 &&
              <p>{storeAddress.address2},</p>
            }
            <p>{storeAddress.state}, {storeAddress.city}, {storeAddress.zipcode}</p>
            <p>{storeAddress.phoneNumber}</p>
            {/* <a className="link textUnderline" href={`//maps.google.com/?q=${shippingInfo.storeDetail.storeAddress}`} >Directions</a> */}
          </div>
        </div>

      </Col>
      <Col xs={6}>
        <h3 className="fontSize_5">Store Hours</h3>
        {storeHoursArray.map((day, index) => (
          <p key={`storeHour-${index}`}>{day}</p>
        ))}
      </Col>
    </Row>
  );
};


StoreDetails.propTypes = {
  // cqContent: PropTypes.object,
  ispudetailsInfo: PropTypes.object,
};
export default StoreDetails;
