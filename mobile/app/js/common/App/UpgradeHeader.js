import { isEmpty } from 'lodash';
import { Row, Col } from 'react-flexbox-grid';
import React from 'react';

import { formatPhoneNumber } from '../validation';
import * as Constants from './Constants';

const UpgradeHeader = () => {
  const upgraderHeaderDetails = (window.upgradeHeaderJSON && !isEmpty(window.upgradeHeaderJSON)) ? window.upgradeHeaderJSON : null;
  const isTradeInEnabled = (window.siteId && upgraderHeaderDetails && typeof (upgraderHeaderDetails.enableTradeInForAgent) !== 'undefined') ? upgraderHeaderDetails.enableTradeInForAgent === true : true;
  return (
    <div className="border_CC onlyBottomBorder">
      {upgraderHeaderDetails &&
        <Row className="margin0 pad16 onlyLeftPad">
          <Col xs={12} className="">
            <Row>
              <h1 className="pad10 onlyTopPad bold fontSize_6">{Constants.UP_HEADER_UPGRADE_HEADER}</h1>
            </Row>
            <Row className="pad8 onlyTopPad fontSize_2">
              <span className="bold">
                {upgraderHeaderDetails.userName}
                {Constants.UP_HEADER_DEVICE_SUB_HEADER}
              </span>
              &nbsp;
              {formatPhoneNumber(upgraderHeaderDetails.mtn)}
            </Row>
            {isTradeInEnabled &&
            <Row className="pad10 onlyBottomPad fontSize_2" aria-label={`Estimated trade in value: $${upgraderHeaderDetails.tradeInValue}`}>
              {Constants.UP_HEADER_EST_TRADE_TEXT}
              {upgraderHeaderDetails.tradeInValue}
            </Row>}
            {!isTradeInEnabled &&
              <Row className="lineHeight10 fontSize_1">
                &nbsp;
              </Row>
            }
          </Col>
        </Row>
      }
    </div>
  );
};

export default UpgradeHeader;

