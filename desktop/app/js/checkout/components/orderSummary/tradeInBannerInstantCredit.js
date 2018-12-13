import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

import tradeinIcon from '../../../../images/recycle.svg';

const InstantCreditTradeInBanner = (props) => {
  const { tradeInDetails, instantCreditDetails, cqContent } = props;
  const tradeInValue = parseFloat(tradeInDetails.tradeInCredit, 10) < 0 ? tradeInDetails.tradeInCredit.substr(1) : tradeInDetails.tradeInCredit;

  return (
    <div className="border_black margin20 noSideMargin pad20 ">
      <div className="clearfix margin20 onlyBottomMargin">
        <div className="floatLeft">
          <img className="height60 margin10 noSideMargin" src={tradeinIcon} alt="Trade In Device" />
        </div>
        <div className="margin78 noSidePad onlyLeftMargin pad15">
          <p className="bold displayInline fontSize_6">{cqContent.label.DT_OD_CHECKOUT_TRADE_IN_APPRAISED_TOTAL_TITLE.replace('$AMOUNT$', tradeInValue)}</p>
        </div>
      </div>
      <div className="margin20 noSideMargin">
        <div className="border_black onlyBottomBorder pad6 onlyBottomPad margin6 onlyBottomMargin">
          <Row>
            <Col xs={3}><p className="fontSize_5 bold">{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_TRADEIN_DEVICE_NAME}</p></Col>
            <Col xs={4}><p className="fontSize_5 bold">{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_TRADEIN_DEVICE_ID}</p></Col>
            <Col xs={5}><p className="fontSize_5 bold">{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_TRADEIN_PAYOUT}</p></Col>
          </Row>
        </div>
        {props.tradeInDetails.tradeInDevices.map((device, index) => (
          <Row key={`instantCreditTradeInDevices-${index}`}>
            <Col xs={3}>
              <p
                className="margin6 noSideMargin"
                dangerouslySetInnerHTML={{ __html: device.displayName }}
              />
            </Col>
            <Col xs={4}><p className="margin6 noSideMargin">{device.deviceId && device.deviceId.replace('ID: ', '')}</p></Col>
            <Col xs={5}>
              {device.bicApplied ?
                <div className="margin6 noSideMargin">
                  <p>{cqContent.label.DT_OD_CHECKOUT_TRADEIN_PROMO_PAYOUT_AMOUNT.replace('$AMOUNT$', device.tradeInCredit)}</p>
                  <p>{cqContent.label.DT_OD_CHECKOUT_TRADEIN_DPP_PROMO_PAYMENTS.replace('$AMOUNT$', device.dppCredit)}</p>
                </div>
                :
                <p className="margin6 noSideMargin">
                  {(props.instantCreditOrder ? cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_PAYOUT_AMOUNT : cqContent.label.DT_OD_CHECKOUT_TRADE_IN_MARKET_PAYOUT_AMOUNT).replace('$AMOUNT$', device.tradeInCredit)}
                </p>
              }
            </Col>
          </Row>
        ))}
      </div>
      {props.instantCreditOrder &&
        <div>
          <Row >
            <Col xs={11} >
              <p className="bold fontSize_5">{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_TRADEIN_TOTAL_TITLE.replace('$AMOUNT$', instantCreditDetails.totalInstantCredit)}</p>
            </Col>
            <Col xs={1} className="textAlignRight">
              <p className="bold fontSize_5">--</p>
            </Col>
          </Row >


          <Row>
            <Col xs={8} className="margin12 noSideMargin bold fontSize_5">
              {cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_BREAKDOWN_TITLE}
            </Col>
          </Row>
          {instantCreditDetails.optionalDownPayment && instantCreditDetails.optionalDownPayment.map((device, index) => (
            <div key={`instantCredit-${index}`}>
              <Row>
                <Col xs={8}>
                  <p className="margin3 noSideMargin"><span dangerouslySetInnerHTML={{ __html: device.deviceTitle }} /> down payment</p>
                </Col>
                <Col xs={4} className="textAlignRight">
                  <p className="margin3 noSideMargin">{device.optionalDownPaymentAmt}</p>
                </Col>
              </Row>
            </div>
          ))}
          {instantCreditDetails.twoYearDevicesInstantCredit &&
            <Row>
              <Col xs={8}>
                <p className="margin3 noSideMargin">{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_2YR}</p>
              </Col>
              <Col xs={4} className="textAlignRight">
                <p className="margin3 noSideMargin">{instantCreditDetails.twoYearDevicesInstantCredit}</p>
              </Col>
            </Row>
          }
          {instantCreditDetails.fullRetailInstantCredit &&
            <Row>
              <Col xs={8}>
                <p className="margin3 noSideMargin">{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_FRP}</p>
              </Col>
              <Col xs={4} className="textAlignRight">
                <p className="margin3 noSideMargin">{instantCreditDetails.fullRetailInstantCredit}</p>
              </Col>
            </Row>
          }
          {instantCreditDetails.accessoriesInsantCredit &&
            <Row>
              <Col xs={8}>
                <p className="margin3 noSideMargin">{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_ACCESSORIES}</p>
              </Col>
              <Col xs={4} className="textAlignRight">
                <p className="margin3 noSideMargin">{instantCreditDetails.accessoriesInsantCredit}</p>
              </Col>
            </Row>
          }
          {instantCreditDetails.taxesInstantCredit &&
            <Row>
              <Col xs={8}>
                <p className="margin3 noSideMargin">{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_TAXES}</p>
              </Col>
              <Col xs={4} className="textAlignRight">
                <p className="margin3 noSideMargin">{instantCreditDetails.taxesInstantCredit}</p>
              </Col>
            </Row>
          }
          {instantCreditDetails.accountCredit &&
            <Row>
              <Col xs={8}>
                <p className="margin3 noSideMargin">{cqContent.label.DT_OD_CHECKOUT_INSTANT_CREDIT_ACCOUNT}</p>
              </Col>
              <Col xs={4} className="textAlignRight">
                <p className="margin3 noSideMargin">{instantCreditDetails.accountCredit}</p>
              </Col>
            </Row>
          }
        </div>
      }
    </div >
  );
};

InstantCreditTradeInBanner.propTypes = {
  cqContent: PropTypes.object,
  tradeInDetails: PropTypes.object,
  instantCreditDetails: PropTypes.object,
  instantCreditOrder: PropTypes.bool,
};

export default InstantCreditTradeInBanner;
