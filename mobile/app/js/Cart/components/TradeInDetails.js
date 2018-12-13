/**
 * Created by hmahad on 2/1/2017.
 */
/* eslint-disable jsx-a11y/tabindex-no-positive, jsx-a11y/href-no-hash */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Img from '../../common/Img/Img';
import Button from '../../common/Button/Button';
import BackButton from '../../common/BackButton/BackButton';
import HorizontalRule from '../../common/HorizontalRule';
import { hashHistory } from './../../store';

// import IconicTradeInDetails from './IconicTradeInDetails'; /*Commenting to prevent build from breaking ,TODO:Edwin to check into this*/

export default class TradeInDetails extends Component {
  constructor(props) {
    super(props);
    this.toggleView = this.toggleView.bind(this);
    this.state = {
      viewTradeIn: true,
      viewOfferDetails: false,
      hasError: false,
    };
  }
  componentWillMount() {
    const { tradeInPromoDetails } = this.props;
    if (!tradeInPromoDetails) {
      hashHistory.push('/'); // eslint-disable-line
    }
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log('Error:', error, '\n Info:', info);
    // You can also log the error to an error reporting service
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
    // window.location = this.props.tradeInUrl;
  }
  goToTradeIn() {
    window.location = this.props.tradeInUrl;
  }

  removeTradeIn(appraiseTradeInDeviceWithOutDeviceId, existingAppraisedReferenceId, flow) {
    // eslint-disable-next-line no-console
    const params = {
      existingAppraisedReferenceId,
      appraiseTradeInDeviceWithOutDeviceId,
      flow,
    };
    this.props.removeTradeInDeviceFromCart({ ...params });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong.</div>;
    }
    let rdrLink = '/';

    const { tradeInPromoDetails, CQLabel } = this.props;

    if (this.state.viewOfferDetails) {
      rdrLink = 'tradeindetails';
    }
    return (
      <Grid className="pad12 onlyTopPad">
        <Row className="noSideMargin">
          <Col xs={12} className="noSidePad">
            {this.state.viewTradeIn &&
              <BackButton to={rdrLink} >
                {this.props.CQLabel.get('OD_CART_BACK_CTA')}
              </BackButton>
            }
            {this.state.viewOfferDetails && <BackButton to="/" onClick={this.toggleView} >{this.props.CQLabel.get('OD_CART_BACK_CTA')}</BackButton>}
          </Col>
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={12} >
            {this.state.viewTradeIn &&
              tradeInPromoDetails.get('tradeInDevices').map((tradeInPromo, i) => (
                <div>
                  <Row key={tradeInPromo.get('mtn') + i}>
                    <Col xs={12} className="margin48 onlyBottomMargin">
                      <h2 className="fontSize_2_5 margin12 onlyBottomMargin" dangerouslySetInnerHTML={{ __html: `${tradeInPromo.get('headerMsg')}` }} />
                      <p>{CQLabel.get('OD_CART_PREPAID_TEXT')}</p>
                    </Col>
                    <Col xs={12}>
                      <HorizontalRule y={4} />
                    </Col>
                    <Col xs={8} className="margin12 onlyTopMargin">
                      <div>
                        <p className="bold fontSize_4">
                          {tradeInPromo.get('deviceBrand') && <span>{tradeInPromo.get('deviceBrand')}&nbsp;</span>}
                          {tradeInPromo.get('nickName') ? <span>{tradeInPromo.get('nickName')}&nbsp;</span> : <span>{tradeInPromo.get('displayName')}&nbsp;</span>}
                        </p>
                        <p>{`${tradeInPromo.get('color')}, ${tradeInPromo.get('size')}`}</p>
                        <p>{`Device ${tradeInPromo.get('deviceId')}`}</p>
                        {tradeInPromo.get('tradeInCredit') &&
                          <div className="margin12 noSideMargin">
                            <p className="bold">{CQLabel.get('DT_OD_CART_ESTIMATED_TRADEIN_HEAD')}</p>
                            <p>{`$${tradeInPromo.get('tradeInCredit')}`}</p>
                          </div>
                        }
                        <p className="margin12 noSideMargin">
                          <a
                            className="tradeInItem_removeIcon verticalAlignMiddle link"
                            analyticstrack="remove-trade-in-device-from-cart"
                            onClick={() => {
                              this.removeTradeIn(tradeInPromo.get('appraiseTradeInDeviceWithOutDeviceId'), tradeInPromo.get('existingAppraisedReferenceId'), tradeInPromo.get('flow'));
                            }}
                          >{CQLabel.get('OD_CART_INSTANT_CREDIT_REMOVE_TRADE_IN')}
                          </a>
                        </p>
                      </div>
                    </Col>
                    <Col xs={4} className="textAlignLeft noSidePad margin12 onlyTopMargin">
                      <Img src={tradeInPromo.get('modelImage')} alt="tradein-image" style={{ width: '100px', height: '150px' }} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} className="fontSize_2 pad32 noSidePad">
                      <p className="fontSize_2 " >
                        {this.props.tradeInPromoDetails.get('tradeInDeviceFooter')}
                      </p>
                    </Col>
                  </Row>
                  {tradeInPromoDetails.get('tradeInDevices') > 1 && <HorizontalRule y={1} />}
                </div>))
            }
            {this.state.viewOfferDetails &&
              <Row className="noSideMargin ">
                <Col xs={12} className="noSidePad">
                  <h2 className="fontSize_5 noSidePad">Offer Details</h2>
                  <p className="fontSize_2 margin12 onlyTopMargin" dangerouslySetInnerHTML={{ __html: this.props.bicMessage }} />
                </Col>
              </Row>
            }
            <Row className="noSideMargin textAlignCenter pad32 noSidePad">
              <Col
                xs={12}
                className="noSidePad textAlignCenter"
              >
                <Button
                  type="button"
                  role="button"
                  className="primary margin6 bold"
                  onClick={this.goToTradeIn.bind(this)}
                  analyticstrack="redirect-trade-in"
                >{this.props.CQLabel.get('OD_CART_TRADEIN_CTA')}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

TradeInDetails.propTypes = {
  tradeInUrl: PropTypes.string,
  CQLabel: PropTypes.object,
  bicMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  // bicOfferApplied: PropTypes.bool,
  tradeInPromoDetails: PropTypes.object,
  removeTradeInDeviceFromCart: PropTypes.object,
};
