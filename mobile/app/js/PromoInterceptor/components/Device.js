import PropTypes from 'prop-types';
import React from 'react';

import { Row, Col } from 'react-flexbox-grid';

const Device = (props) => {
  const { deviceInfo, cqContent } = props;
  const {
    displayImageURL,
    brandName,
    color,
    displayName,
    capacity,
    deviceId,
  } = deviceInfo;

  return (
    <Row className="pad12 onlyTopPad">
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <Row className="pad12 noSidePad">
          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
            <h2 className="margin36 onlyBottomMargin">
              {cqContent.label.DT_OD_PROMO_INTERCEPTOR_HEADER}
            </h2>
            <div className="bold margin6 onlyBottomMargin">
              <span dangerouslySetInnerHTML={{ __html: `${brandName} ` }} />
              <span dangerouslySetInnerHTML={{ __html: displayName }} />
            </div>
            <p>
              {capacity && capacity}
              {capacity && color ? `, ${color}` : color}
            </p>
            <p>
              {`${cqContent.label.DT_OD_PROMO_INTERCEPTOR_DEVICE_ID}${deviceId}`}
            </p>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <h3 className="margin12 onlyBottomMargin">
              <img src={`${displayImageURL}?$device-lg$&hei=150&wid=75`} alt={displayImageURL} />
            </h3>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

Device.propTypes = {
  deviceInfo: PropTypes.object,
  cqContent: PropTypes.object,
};

export default Device;
