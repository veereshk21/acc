import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

const Device = (props) => {
  const { device } = props;
  return (
    <div>
      <Row className="pad20 onlyBottomPad">
        <Col xs={11}>
          {device.mtnNumber &&
            <div>
              <h3 className="fontSize_5">
                ({device.mtnNumber.substring(0, 3)}) {device.mtnNumber.substring(3, 6)}-{device.mtnNumber.substring(6, 10)}
              </h3>
            </div>
          }
        </Col>
        <Col xs={1} aria-hidden className="fontSize_6 lineHeight18 overflowHidden accordion_icon textAlignRight" />
      </Row>
      <Row>
        <Col>
          <div className="pad8 onlyLeftPad">
            <img
              className=" border_grayThree textAlignCenter pad10"
              style={{ maxWidth: '100%', maxHeight: 110 }}
              src={device.deviceImageUrl} alt={`${device.manufactureName} ${device.deviceName}`}
            />
          </div>
        </Col>
        <Col xs={8} lg={9}>
          <div className="pad12 noTopPad">
            <p
              className="bold fontSize_5"
              dangerouslySetInnerHTML={{ __html: `${device.manufactureName} ${device.deviceName}` }}
            />
            <p>{device.color}{device.color && device.size ? ',' : ''} {device.size}</p>
            <p className="color_gray_six">Retail Price: ${device.fullRetailPrice}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

Device.propTypes = {
  // cqContent: PropTypes.object,
  device: PropTypes.object,
};
export default Device;
