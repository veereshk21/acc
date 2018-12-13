import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

const TradeInPromoDetails = ({ device, cqContent, removeTradeInDeviceFromCart, index, instantPath, count }) => {
  const removeTradeIn = (appraiseTradeInDeviceWithOutDeviceId, existingAppraisedReferenceId, flow) => {
    // eslint-disable-next-line no-console ...
    const params = {
      existingAppraisedReferenceId,
      appraiseTradeInDeviceWithOutDeviceId,
      flow,
    };
    removeTradeInDeviceFromCart({ ...params });
  };

  return (
    <div className="fontSize_4 pad12">
      <div className="margin6 onlyTopMargin">
        <div key={`tradeInDevice-${index}`}>
          {index > 0 && <hr style={{ borderColor: '#D8DADA' }} />}
          <Row
            className="pad24 noSidePad"
            between="xs"
          >
            <Col xs={2} className="textAlignLeft">
              <img
                className="width90"
                alt="Traded in device"
                src={device.modelImage}
              />
            </Col>
            <Col xs={10}>
              <Row>
                <Col xs={12}>
                  <p className="fontSize_7 bold margin18 onlyBottomMargin">{device.headerMsg}</p>
                  <p className="fontSize_7 bold margin6 noSideMargin" dangerouslySetInnerHTML={{ __html: device.displayName }} />
                  <p className="margin6 noSideMargin">{`${device.size}, ${device.color}`}</p>
                  <p className="margin6 noSideMargin">{`Device ${device.deviceId}`}</p>
                </Col>
                <Col xs={12} className="margin18 onlyTopMargin">
                  <a
                    role="button"
                    onClick={() => {
                      removeTradeIn(device.appraiseTradeInDeviceWithOutDeviceId, device.existingAppraisedReferenceId, device.flow);
                    }}
                    analyticstrack="remove-trade-in-link"
                  >
                    {cqContent.label.DT_OD_CART_TRADE_IN_DEVICE_REMOVE_TEXT}
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
          {device.legalText && (instantPath || index !== count) &&
            <Row className="pad12">
              <Col xs={8} className="">
                <p
                  className="legal"
                  dangerouslySetInnerHTML={{ __html: device.legalText }}
                />
              </Col>
            </Row>
          }
        </div>
      </div>
    </div>
  );
};
TradeInPromoDetails.propTypes = {
  device: PropTypes.object,
  cqContent: PropTypes.object,
  removeTradeInDeviceFromCart: PropTypes.func,
  index: PropTypes.number,
  instantPath: PropTypes.bool,
  count: PropTypes.number,
};
export default TradeInPromoDetails;
