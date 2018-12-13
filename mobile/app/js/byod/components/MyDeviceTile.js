import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Img from '../../common/Img/Img';
import Button from '../../common/Button/Button';

const DeviceTile = ({
  device, onSelect, cqJSON,
}) => (
  <Col className="mtnWrapper">
    <Row>
      <Col xs={12} >
        <span
          className="fontDisplayMedium fontSize_1_3 margin6"
          dangerouslySetInnerHTML={{ __html: device.deviceName || device.deviceId }}
        />
      </Col>
      <Col xs={12} className="pad24 noSidePad">
        {device.imageUrl !== '' ? <Img src={`${device.imageUrl}&$device-lg$&hei=150`} srcSet={`${device.imageUrl}&$device-lg$&hei=300 2x`} />
          : <Img src="https://ss7.vzw.com/is/image/VerizonWireless/generic_phone?&hei=150" srcSet="https://ss7.vzw.com/is/image/VerizonWireless/generic_phone?&hei=300 2x" />
        }
      </Col>
      <Col xs={12}>
        <Button className="button primary large" onClick={() => onSelect({ deviceId: device.deviceId })} analyticstrack="select-my-existing-device">{cqJSON.label.OD_BYOD_NEXT_SELECT_TEXT}</Button>
      </Col>
    </Row>
  </Col>
);

DeviceTile.propTypes = {
  device: PropTypes.object,
  onSelect: PropTypes.func,
  cqJSON: PropTypes.object,
};

export default DeviceTile;
