import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import NotificationBar from '../../../common/NotificationBar';
import { NOTIFICATIONS } from '../../constants';

const NoStores = () => (
  <div className="pad24 onlyTopPad" style={{ height: '300px' }}>
    <Row>
      <Col xs={12}>
        <Row center="xs">
          <h2 className="textAlignCenter pad20 onlySidePad">No results</h2>
        </Row>
        <Row center="xs">
          <div className="smallText textAlignCenter pad36">0 stores</div>
        </Row>
      </Col>
    </Row>
    <Row>
      <NotificationBar section={NOTIFICATIONS.ISPU} />
    </Row>
  </div>
);

export default NoStores;

NoStores.propTypes = {
  cqContent: PropTypes.object,
};
