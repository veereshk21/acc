import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { hashHistory } from './../../store';
import Img from '../../common/Img/Img';
import Button from '../../common/Button/Button';
import BackButton from '../../common/BackButton/BackButton';
import HorizontalRule from '../../common/HorizontalRule';

export default class EstimatedTradeInCredit extends Component {
  constructor(props) {
    super(props);
    this.toggleView = this.toggleView.bind(this);
    this.state = {
      viewTradeIn: true,
      viewOfferDetails: false,
    };
  }
  toggleView(event) {
    event.preventDefault();
    if (this.state.viewOfferDetails) {
      this.setState({ viewTradeIn: true, viewOfferDetails: false });
    } else if (this.state.viewTradeIn) {
      this.setState({ viewTradeIn: false, viewOfferDetails: true });
    }
  }

  goToPage() {
    if (this.state.viewOfferDetails) {
      this.setState({ viewTradeIn: true, viewOfferDetails: false });
    } else {
      hashHistory.push('/'); // eslint-disable-line
    }
  }
  render() {
    const { cqContent, tradeInPromoDetails } = this.props;
    const tradeInValue = parseFloat(tradeInPromoDetails.get('tradeInCredit'), 10) < 0 ? tradeInPromoDetails.get('tradeInCredit').substr(1) : tradeInPromoDetails.get('tradeInCredit');
    return (
      <div className="pad12 onlyTopPad">
        <Grid className="pad12 onlyTopPad">
          <Row className="noSideMargin">
            <Col xs={12} className="noSidePad">
              {this.state.viewTradeIn && <BackButton to="/" >{cqContent.label.OD_CHECKOUT_BACK_TEXT}</BackButton>}
            </Col>
          </Row>
          <Row className="noSideMargin pad20">
            <Col xs={12} >
              <Row className="noSideMargin ">
                {this.state.viewTradeIn &&
                  <Col xs={12} className="noSidePad">
                    <h2 className="noSidePad">
                      {cqContent.label.OD_CHECKOUT_TRADE_IN_HEADER.replace('$AMOUNT$', tradeInValue)}
                    </h2>
                    <p className="fontSize_2 margin12 onlyTopMargin" dangerouslySetInnerHTML={{ __html: tradeInPromoDetails.get('tradeInDeviceDppMsg') }} />
                    <HorizontalRule margin="32px 0" />
                  </Col>
                }
              </Row>
              {this.state.viewTradeIn && tradeInPromoDetails.get('tradeInDevices').map((tradeInPromo, i) => {
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
              <Row className="noSideMargin textAlignCenter pad32 noSidePad">
                <Col
                  xs={12}
                  className="noSidePad textAlignCenter"
                >
                  <Button
                    type="button"
                    role="button"
                    className="button primary large"
                    onClick={this.goToPage.bind(this)}
                    analyticstrack="close-est-trade-in-credit-checkout"
                  > {cqContent.label.OD_CHECKOUT_ESTIMATED_TRADE_IN_BUTTON_TEXT}
                  </Button>

                </Col>
              </Row>
              {tradeInPromoDetails.get('tradeInDevices').map((tradeInPromo) => (
                tradeInPromo.get('bicApplied') &&
                <p
                  className="fontSize_1 lineHeight10 textAlignCenter margin12 noSideMargin"
                  dangerouslySetInnerHTML={{ __html: cqContent.html.OD_CHECKOUT_TRADE_IN_PROMO_DISCLAIMER.replace('$AMOUNT$', tradeInPromo.get('dppCredit')) }}
                />
              ))}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
EstimatedTradeInCredit.propTypes = {
  cqContent: PropTypes.object,
  tradeInPromoDetails: PropTypes.object,
};
