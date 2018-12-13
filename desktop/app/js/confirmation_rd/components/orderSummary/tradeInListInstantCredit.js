import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import ListWrapper from './listWrapper';

class TradeListWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { featureTypeText: 'Show', featureTypeCSS: 'hide', displayFeatureType: false };
  }

  print(e) {
    e.preventDefault();
    window.print();
  }
  render() {
    const {
      cqContent,
      tradeInDevices,
      instantCreditTradeInDevices,
      instantCreditDetails,
    } = this.props;
    const imageWidthHeight = '&wid=100&hei=200';
    return (
      <div className="tradeIn_list color_black">
        <ListWrapper className="tradeIn_list_item">
          <h1 className="margin20 onlyTopMargin fontSize_10">{cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_TITLE}</h1>
          <Row>
            <Col xs={6}>
              {instantCreditTradeInDevices.map((tradeInItem, i) => {
                const deviceName = `${tradeInItem.deviceBrand ? tradeInItem.deviceBrand : ''} ${tradeInItem.displayName ? tradeInItem.displayName : ''}`;
                const tradeInPromoPresent = (tradeInItem.promoCreditType === 'SPO' || tradeInItem.promoCreditType === 'REG' || tradeInItem.bicApplied);
                return (
                  <div key={`instantCreditTradeInDevices-${i}`} className="tradeIn_list_item_details margin36 noSideMargin">
                    <Row>
                      <Col xs={6} className="textAlignLeft">
                        {tradeInItem.modelImage &&
                          <img className="maxWidth100" src={`${tradeInItem.modelImage}${imageWidthHeight}`} alt={tradeInItem.displayName} />
                        }
                      </Col>
                      <Col xs={6} >
                        <p className="bold" dangerouslySetInnerHTML={{ __html: deviceName }} />
                        <p className="margin12 onlyBottomMargin">{tradeInItem.color}, {tradeInItem.size}</p>
                        <p className="bold">{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_DEVICE_ID.replace('$ID$', tradeInItem.deviceId)}</p>

                        {!tradeInPromoPresent ?
                          <div className="margin20 noSideMargin">
                            <p className="bold" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_INSTANT_CREDIT_MARKET_TITLE }} />
                            <p>${tradeInItem.tradeInCredit}</p>
                          </div>
                          :
                          <div className="margin20 noSideMargin">
                            <p className="bold" >{cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_PROMOTIONAL_TITLE}</p>
                            <p>${tradeInItem.tradeInCredit}</p>
                          </div>
                        }

                        {tradeInItem.submissionId &&
                          <p className="bold margin20 noSideMargin">{cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_SUBMISSION_TITLE}: {tradeInItem.submissionId}</p>
                        }
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </Col>
            <Col xs={6} className="margin36 noSideMargin">

              <p className="bold ">{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_TRADEIN_TOTAL_TITLE.replace('$AMOUNT$', instantCreditDetails.totalInstantCredit)}</p>
              <p className="margin20 noSideMargin">{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_DISCLAIMER}</p>
              <p className="bold ">{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_RECEIVED}</p>
              <hr className="border_black" />

              <Row >
                <Col xs={11} >
                  <p className="bold ">{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_TRADEIN_TOTAL_TITLE.replace('$AMOUNT$', instantCreditDetails.totalInstantCredit)}</p>
                </Col>
                <Col xs={1} className="textAlignRight">
                  <p className="bold ">--</p>
                </Col>
              </Row >
              <Row>
                <Col xs={8}>
                  <p className="margin12 noSideMargin bold ">{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_BREAKDOWN_TITLE}</p>
                </Col>
              </Row>
              {instantCreditDetails.optionalDownPayment && instantCreditDetails.optionalDownPayment.map((device, index) => (
                <div key={`instantCreditDownPayment-${index}`}>
                  <Row>
                    <Col xs={8}>
                      <p
                        className="margin3 noSideMargin"
                        dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_DOWNPAYMENT_DEVICE.replace('$DEVICE$', device.deviceTitle) }}
                      />
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
                    <p className="margin3 noSideMargin">{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_2YR}</p>
                  </Col>
                  <Col xs={4} className="textAlignRight">
                    <p className="margin3 noSideMargin">{instantCreditDetails.twoYearDevicesInstantCredit}</p>
                  </Col>
                </Row>
              }
              {instantCreditDetails.fullRetailInstantCredit &&
                <Row>
                  <Col xs={8}>
                    <p className="margin3 noSideMargin">{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_FRP}</p>
                  </Col>
                  <Col xs={4} className="textAlignRight">
                    <p className="margin3 noSideMargin">{instantCreditDetails.fullRetailInstantCredit}</p>
                  </Col>
                </Row>
              }
              {instantCreditDetails.accessoriesInsantCredit &&
                <Row>
                  <Col xs={8}>
                    <p className="margin3 noSideMargin">{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_ACCESSORIES}</p>
                  </Col>
                  <Col xs={4} className="textAlignRight">
                    <p className="margin3 noSideMargin">{instantCreditDetails.accessoriesInsantCredit}</p>
                  </Col>
                </Row>
              }
              {instantCreditDetails.taxesInstantCredit &&
                <Row>
                  <Col xs={8}>
                    <p className="margin3 noSideMargin">{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_TAXES}</p>
                  </Col>
                  <Col xs={4} className="textAlignRight">
                    <p className="margin3 noSideMargin">{instantCreditDetails.taxesInstantCredit}</p>
                  </Col>
                </Row>
              }
              {instantCreditDetails.accountCredit &&
                <Row>
                  <Col xs={8}>
                    <p className="margin3 noSideMargin">{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_ACCOUNT}</p>
                  </Col>
                  <Col xs={4} className="textAlignRight">
                    <p className="margin3 noSideMargin">{instantCreditDetails.accountCredit}</p>
                  </Col>
                </Row>
              }
            </Col>
          </Row>
          {tradeInDevices && tradeInDevices.length > 0 &&
            <hr className="border_black" />
          }
          <div className="promoTrade-InDevices">
            {tradeInDevices.map((tradeInItem, i) => {
              const deviceName = `${tradeInItem.deviceBrand ? tradeInItem.deviceBrand : ''} ${tradeInItem.displayName ? tradeInItem.displayName : ''}`;
              // const tradeInPromoPresent = (tradeInItem.promoCreditType === 'SPO' || tradeInItem.promoCreditType === 'REG' || tradeInItem.bicApplied);

              return (
                <div key={`tradeInPromoDevice-${i}`} className="tradeIn_list_item_details pad36 noSidePad">
                  <Row>
                    <Col xs={3} className="textAlignLeft">
                      {tradeInItem.modelImage &&
                        <img className="maxWidth100" src={`${tradeInItem.modelImage}${imageWidthHeight}`} alt={tradeInItem.displayName} />
                      }
                    </Col>
                    <Col xs={9} className="positionRelative">
                      <h3 className="fontSize_8 margin20 onlyBottomMargin">
                        {cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_PROMO_HEADER.replace('$AMOUNT$', tradeInItem.tradeInCredit)}
                      </h3>
                      <p className="bold fontSize_8 margin6 noSideMargin" dangerouslySetInnerHTML={{ __html: deviceName }} />
                      <p>{tradeInItem.size}, {tradeInItem.color}</p>
                      <p >{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_DEVICE_ID.replace('$ID$', tradeInItem.deviceId)}</p>
                      {tradeInItem.submissionId &&
                        <p className="margin12 onlyTopMargin">{cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_SUBMISSION_TITLE}: {tradeInItem.submissionId}</p>
                      }
                    </Col>
                  </Row>
                </div>
              );
            })}
          </div>
          <div className="pad20 onlyBottomPad tradeIn_Info">
            <hr className="margin20 noSideMargin" style={{ borderColor: '#000' }} />
            {tradeInDevices && tradeInDevices.length > 0 &&
              <p className="fontSize_1" dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CONFIRMATION_PROMOTIONAL_TRADE_IN_TERMS_HTML }} />
            }
            <p className="fontSize_1" dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CART_TRADE_IN_TERMS_HTML }} />
          </div >
        </ListWrapper>
      </div>
    );
  }
}

TradeListWrapper.propTypes = {
  cqContent: PropTypes.object,
  tradeInDevices: PropTypes.array,
  instantCreditDetails: PropTypes.object,
  instantCreditTradeInDevices: PropTypes.array,
};

export default TradeListWrapper;

