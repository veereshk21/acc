import { isEmpty } from 'lodash';
import { Row, Col } from 'react-flexbox-grid';
import React from 'react';

import { formatPhoneNumber } from '../validation';
import * as Constants from './Constants';
import ChatAndC2C from '../ChatAndC2C';

const UpgradeHeader = () => {
  const upgraderHeaderDetails = (window.upgradeHeaderJSON && !isEmpty(window.upgradeHeaderJSON)) ? window.upgradeHeaderJSON : null;
  return (
    <div>
      {upgraderHeaderDetails ?
        <div className="border_CC onlyBottomBorder">
          <Row className="pad16 onlyLeftPad" style={{ margin: 0 }}>
            <Col xs={4} className="">
              <Row>
                <div className="pad10 onlyTopPad bold fontSize_11">{Constants.UP_HEADER_UPGRADE_HEADER}</div>
              </Row>
              <Row className="pad8 onlyTopPad fontSize_2">
                <span className="bold">
                  {upgraderHeaderDetails.userName}
                  {Constants.UP_HEADER_DEVICE_SUB_HEADER}
                </span>
                &nbsp;
                {upgraderHeaderDetails.mtn && formatPhoneNumber(upgraderHeaderDetails.mtn)}
              </Row>
              <Row className="pad10 onlyBottomPad fontSize_2" aria-label={`Estimated trade in value: $${upgraderHeaderDetails.tradeInValue}`}>
                {Constants.UP_HEADER_EST_TRADE_TEXT}
                {upgraderHeaderDetails.tradeInValue}
              </Row>
            </Col>
            <Col xs={8}>
              <ChatAndC2C />
            </Col>
          </Row>
        </div> :
        <div className="chatAndCall">
          <ChatAndC2C />
        </div>
      }
    </div>
  );
};

export default UpgradeHeader;

