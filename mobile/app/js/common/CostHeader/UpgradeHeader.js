import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import { formatPhoneNumber } from '../validation';
import * as Constants from './Constants';

const UpgradeHeader = (props) => {
  const { upgraderHeaderDetails } = props;
  return (
    <Row className="margin0">
      <Col xs={12} sm={12} md={12} lg={12} xl={12}>
        <h1 className="pad6 onlyTopPad fontSize_6">
          {Constants.UP_HEADER_UPGRADE_HEADER}
        </h1>
        <p className="pad8 onlyTopPad fontSize_2">
          <span className="bold">
            {upgraderHeaderDetails.userName}
            {Constants.UP_HEADER_DEVICE_SUB_HEADER}
          </span>
          &nbsp;
          {formatPhoneNumber(upgraderHeaderDetails.mtn)}
        </p>
        <p className="pad10 onlyBottomPad fontSize_2">
          {Constants.UP_HEADER_EST_TRADE_TEXT}
          {upgraderHeaderDetails.tradeInValue}
        </p>
      </Col>
    </Row>
  );
};

UpgradeHeader.propTypes = {
  upgraderHeaderDetails: PropTypes.object,
};

export default UpgradeHeader;
