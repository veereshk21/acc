import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { hashHistory } from './../../store';
import Img from '../../common/Img/Img';
import Button from '../../common/Button/Button';
import BackButton from '../../common/BackButton/BackButton';
import HorizontalRule from '../../common/HorizontalRule';

const InstantCredit = (props) => {
  const goToPage = () => {
    hashHistory.push('/'); // eslint-disable-line
  };

  const {
    cqContent, tradeInPromoDetails, instantCreditDetails, icTradeInDevices, promoTradeInOrder, promoTradeInDevices,
  } = props;
  const tradeInValue = parseFloat(tradeInPromoDetails.get('tradeInCredit'), 10) < 0 ? tradeInPromoDetails.get('tradeInCredit').substr(1) : tradeInPromoDetails.get('tradeInCredit');
  return (
    <div className="pad12 onlyTopPad">
      <Grid className="pad12 onlyTopPad">
        <Row className="noSideMargin">
          <Col xs={12} className="noSidePad">
            <BackButton to="/" >{cqContent.label.OD_CHECKOUT_BACK_TEXT}</BackButton>
          </Col>
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={12} >
            {promoTradeInOrder &&
              <Row className="">
                <Col xs={12} >
                  <Row className="noSideMargin ">
                    <Col xs={12} className="noSidePad">
                      <h2 className="noSidePad">
                        {cqContent.label.OD_CHECKOUT_TRADE_IN_HEADER.replace('$AMOUNT$', tradeInValue)}
                      </h2>
                      <p className="fontSize_2 margin12 onlyTopMargin" dangerouslySetInnerHTML={{ __html: tradeInPromoDetails.get('tradeInDeviceDppMsg') }} />
                      <HorizontalRule margin="32px 0" />
                    </Col>
                  </Row>
                  {promoTradeInDevices.map((tradeInPromo, i) => {
                    const tradeInPromoPresent = (parseFloat(tradeInPromo.get('originalAppraisalPrice')) > 0 && parseFloat(tradeInPromo.get('tradeInCredit')) > parseFloat(tradeInPromo.get('originalAppraisalPrice')));
                    return (
                      <div className={i > 0 ? 'pad20 onlyTopPad border_grey onlyTopBorder' : ''} key={tradeInPromo.get('mtn') + i}>
                        <h3>
                          {tradeInPromo.get('bicApplied') ?
                            cqContent.label.OD_CHECKOUT_TRADE_IN_PROMO_HEADER.replace('$AMOUNT$', tradeInPromoPresent ? tradeInPromo.get('tradeInCredit') : tradeInPromo.get('originalAppraisalPrice'))
                            :
                            cqContent.label.OD_CHECKOUT_TRADE_IN_MARKET_HEADER.replace('$AMOUNT$', tradeInPromo.get('originalAppraisalPrice'))
                          }
                        </h3>
                        <Row className="pad24 noSidePad" key={tradeInPromo.get('mtn') + i}>
                          <Col xs={6}>
                            <div>
                              <p className="bold">{tradeInPromo.get('displayName')}</p>
                              <p>{tradeInPromo.get('color')}{tradeInPromo.get('color') && tradeInPromo.get('size') ? ', ' : ''}{tradeInPromo.get('size')}</p>
                              <p>Device {tradeInPromo.get('deviceId')}</p>
                            </div>
                          </Col>
                          <Col xs={6} className="textAlignCenter">
                            <Img src={tradeInPromo.get('modelImage')} alt="tradein-image" style={{ width: '88px', height: '137px' }} />
                          </Col>
                        </Row>
                      </div>
                    );
                  })}

                  {tradeInPromoDetails.get('tradeInDevices').map((tradeInPromo) => (
                    tradeInPromo.get('bicApplied') &&
                    <p
                      className="fontSize_1 lineHeight10 textAlignCenter margin12 noSideMargin"
                      dangerouslySetInnerHTML={{ __html: cqContent.html.OD_CHECKOUT_TRADE_IN_PROMO_DISCLAIMER.replace('$AMOUNT$', tradeInPromo.get('dppCredit')) }}
                    />
                  ))}
                  <hr className="margin30 noSideMargin" />

                </Col>
              </Row>

            }
            <Row className="noSideMargin ">
              <Col xs={12} className="noSidePad">
                {promoTradeInOrder ?
                  <h3 className="noSidePad">{cqContent.label.OD_CHECKOUT_INSTANT_CREDIT_TITLE}</h3>
                  :
                  <h2 className="noSidePad">{cqContent.label.OD_CHECKOUT_INSTANT_CREDIT_TITLE}</h2>}
                {!promoTradeInOrder && <p className="margin12 onlyTopMargin">{cqContent.label.OD_CHECKOUT_INSTANT_CREDIT_SUBTITLE}</p>}
              </Col>
            </Row>
            <div className="margin10 onlyTopMargin">
              {icTradeInDevices.map((tradeInPromo, i) => (
                <div className="margin20 noSideMargin" key={tradeInPromo.get('mtn') + i}>
                  <Row key={tradeInPromo.get('mtn') + i} middle="xs">
                    <Col xs={4} xsOffset={1} className="textAlignCenter">
                      <Img src={tradeInPromo.get('modelImage')} alt="tradein-image" style={{ width: '88px', height: '137px' }} />
                    </Col>
                    <Col xs={7}>
                      <div>
                        {tradeInPromo.get('nickName') ? <p>{tradeInPromo.get('nickName')}</p> : <p>{tradeInPromo.get('displayName')}</p>}
                        <p>
                          {tradeInPromo.get('mtn') ? <span>{tradeInPromo.get('mtn')} , {tradeInPromo.get('size')}</span> : <span>{tradeInPromo.get('size')}</span>}
                          {tradeInPromo.get('color') && <span>, {tradeInPromo.get('color')}</span>}
                        </p>
                        <p>{tradeInPromo.get('deviceId')}</p>
                      </div>
                    </Col>
                  </Row>
                  {icTradeInDevices > 1 && <HorizontalRule y={1} />}
                </div>
              ))}
            </div>
            <HorizontalRule y={1} />
            <div>
              {instantCreditDetails.get('optionalDownPayment') && instantCreditDetails.get('optionalDownPayment').map((device, index) => (
                <div key={`instantCredit-${index}`}>
                  <Row>
                    <Col xs={6}>
                      <p className="margin3 noSideMargin">{device.get('deviceTitle')}</p>
                    </Col>
                    <Col xs={6} className="textAlignRight">
                      <p className="margin3 noSideMargin">{device.get('optionalDownPaymentAmt')}</p>
                    </Col>
                  </Row>
                </div>
              ))}
              {instantCreditDetails.get('twoYearDevicesInstantCredit') &&
                <Row>
                  <Col xs={6}>
                    <p className="margin3 noSideMargin">{cqContent.label.OD_CHECKOUT_INSTANT_CREDIT_2YR}</p>
                  </Col>
                  <Col xs={6} className="textAlignRight">
                    <p className="margin3 noSideMargin">{instantCreditDetails.get('twoYearDevicesInstantCredit')}</p>
                  </Col>
                </Row>
              }
              {instantCreditDetails.get('fullRetailInstantCredit') &&
                <Row>
                  <Col xs={6}>
                    <p className="margin3 noSideMargin">{cqContent.label.OD_CHECKOUT_INSTANT_CREDIT_FRP}</p>
                  </Col>
                  <Col xs={6} className="textAlignRight">
                    <p className="margin3 noSideMargin">{instantCreditDetails.get('fullRetailInstantCredit')}</p>
                  </Col>
                </Row>
              }
              {instantCreditDetails.get('accessoriesInsantCredit') &&
                <Row>
                  <Col xs={6}>
                    <p className="margin3 noSideMargin">{cqContent.label.OD_CHECKOUT_INSTANT_CREDIT_ACCESSORIES}</p>
                  </Col>
                  <Col xs={6} className="textAlignRight">
                    <p className="margin3 noSideMargin">{instantCreditDetails.get('accessoriesInsantCredit')}</p>
                  </Col>
                </Row>
              }
              {instantCreditDetails.get('taxesInstantCredit') &&
                <Row>
                  <Col xs={6}>
                    <p className="margin3 noSideMargin">{cqContent.label.OD_CHECKOUT_INSTANT_CREDIT_TAXES}</p>
                  </Col>
                  <Col xs={6} className="textAlignRight">
                    <p className="margin3 noSideMargin">{instantCreditDetails.get('taxesInstantCredit')}</p>
                  </Col>
                </Row>
              }
              {instantCreditDetails.get('accountCredit') &&
                <Row>
                  <Col xs={6}>
                    <p className="margin3 noSideMargin">{cqContent.label.OD_CHECKOUT_INSTANT_CREDIT_ACCOUNT}</p>
                  </Col>
                  <Col xs={6} className="textAlignRight">
                    <p className="margin3 noSideMargin">{instantCreditDetails.get('accountCredit')}</p>
                  </Col>
                </Row>
              }
            </div>
            <div className="margin20 onlyTopMargin">
              <p>{cqContent.label.OD_CHECKOUT_INSTANT_CREDIT_DISCLAIMER} <a className="link">{cqContent.label.OD_CHECKOUT_INSTANT_CREDIT_DISCLAIMER_LINK}</a></p>
            </div>
            <Row className="noSideMargin textAlignCenter pad32 noSidePad">
              <Col
                xs={12}
                className="noSidePad textAlignCenter"
              >
                <Button
                  type="button"
                  role="button"
                  className="button primary large width100"
                  onClick={goToPage}
                  analyticstrack="close-instant-credit-checkout"
                > {cqContent.label.OD_CHECKOUT_ESTIMATED_TRADE_IN_BUTTON_TEXT}
                </Button>

              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

InstantCredit.propTypes = {
  cqContent: PropTypes.object,
  tradeInPromoDetails: PropTypes.object,
  instantCreditDetails: PropTypes.object,
  icTradeInDevices: PropTypes.array,
  promoTradeInOrder: PropTypes.bool,
  promoTradeInDevices: PropTypes.array,
};

export default InstantCredit;
