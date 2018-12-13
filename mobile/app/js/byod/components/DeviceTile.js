import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import Img from '../../common/Img/Img';
import Button from '../../common/Button/Button';

const DeviceTile = ({
  device, onSelect, brandPage, cqJSON,
}) => {
  const _imgUrl = device.imageUrl.indexOf('?') !== -1 ? device.imageUrl.split('?')[0] : device.imageUrl;
  return (
    <Col xs={6} className="mtnWrapper">
      <Row>
        <Col xs={12}>
          <span
            className="fontDisplayMedium fontSize_1_3 margin6"
            dangerouslySetInnerHTML={{ __html: brandPage ? device.make : device.modelName }}
          />
        </Col>
        <Col xs={12} className="margin24 noSideMargin">
          <Img src={`https://ss7.vzw.com/is/image/VerizonWireless/${_imgUrl}?hei=150&wid=110`} srcSet={`https://ss7.vzw.com/is/image/VerizonWireless/${_imgUrl}?hei=300&wid=220 2x`} />
        </Col>
        <Col xs={12}>
          <Button className="button secondary small width30" onClick={() => onSelect(device)} analyticstrack="select-device">{cqJSON.label.OD_BYOD_NEXT_SELECT_TEXT}</Button>
        </Col>
      </Row>
    </Col>
  );
};

DeviceTile.propTypes = {
  device: PropTypes.object,
  onSelect: PropTypes.func,
  brandPage: PropTypes.bool,
  cqJSON: PropTypes.object,
};

export default DeviceTile;
