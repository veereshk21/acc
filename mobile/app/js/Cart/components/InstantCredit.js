import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { hashHistory } from './../../store';
import Img from '../../common/Img/Img';
import Button from '../../common/Button/Button';
import BackButton from '../../common/BackButton/BackButton';
import HorizontalRule from '../../common/HorizontalRule';
import Modal from '../../common/modal/modal';

class InstantCredit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceIndex: 0,
      removeTradeIn: false,
      showModal: false,
      params: {},
    };
  }
  componentWillMount() {
    const { tradeInPromoDetails } = this.props;
    if (!tradeInPromoDetails) {
      hashHistory.push('/'); // eslint-disable-line
    }
  }
  componentDidMount() {
    window.hideInstantCreditNotification = true;
  }
  removeTradeIn(appraiseTradeInDeviceWithOutDeviceId, existingAppraisedReferenceId, flow) {
    // eslint-disable-next-line no-console
    const obj = {
      existingAppraisedReferenceId,
      appraiseTradeInDeviceWithOutDeviceId,
      flow,
    };
    this.setState({ params: obj });
    if (this.props.showHeadsUpMsg) {
      this.setState({ showModal: true, removeTradeIn: true });
    } else {
      this.props.removeTradeInDeviceFromCart({ ...this.state.params });
    }
  }
  goToPage() {
    hashHistory.push('/'); // eslint-disable-line
  }
  goToTradeIn() {
    const tradeExceedsPurchase = this.props.totalDeviceCount && this.props.totalTradeinDeviceCount && this.props.totalTradeinDeviceCount >= this.props.totalDeviceCount;
    if (tradeExceedsPurchase) {
      this.setState({ showModal: true, removeTradeIn: false });
    } else if (this.props.tradeInUrl) {
      window.location = this.props.tradeInUrl;
    }
  }
  moveNext() {
    if (this.state.removeTradeIn) {
      this.setState({ showModal: false });
      this.props.removeTradeInDeviceFromCart({ ...this.state.params });
    } else if (!this.state.removeTradeIn) {
      this.setState({ showModal: false });
      window.location = this.props.tradeInUrl;
    }
  }
  render() {
    const {
      cqContent, tradeInPromoDetails, instantCreditDetails, instantCreditPageURL, bicItems, nonBicItems,
    } = this.props;
    const optionalDownPaymentDetails = instantCreditDetails && instantCreditDetails.get('optionalDownPayment') && instantCreditDetails.get('optionalDownPayment').toJS();
    return (
      <div className="pad12 onlyTopPad">
        <Modal
          mounted={this.state.showModal}
          style={{ width: '90vw', 'min-height': '95%' }}
          closeFn={() => { this.setState({ showModal: false }); }}
        >
          <div className="margin0 noPad">
            <Row>
              <Col xs={12} sm={12} lg={12}>
                <h1>
                  <span className="fontSize_2-5 height160" dangerouslySetInnerHTML={{ __html: cqContent.label.OD_CART_INSTANT_CREDIT_MODAL_TITLE }} />
                </h1>
              </Col>
            </Row>
          </div>
          <div className="margin0 noPad">
            <Row>
              <Col xs={12} sm={12} lg={12}>
                <div className="positionAbsolute top50-calc-30px width100-calc-40 border_00 onlyTopBorder pad18 fontSize_2 bold">{this.state.removeTradeIn ? cqContent.label.OD_CART_INSTANT_CREDIT_REMOVE_TRADE_IN_DISCLAIMER : cqContent.label.OD_CART_INSTANT_CREDIT_TRADE_IN_MORE_DISCLAIMER}</div>
                <div className="positionAbsolute bottom20 width100-calc-40">
                  <button className="button secondary margin24 onlyTopMargin large width100" onClick={this.goToPage.bind(this)} >{cqContent.label.OD_CART_INSTANT_CREDIT_GO_TO_CART}</button>
                  <button className="button primary margin24 onlyTopMargin large width100" onClick={this.moveNext.bind(this)}>{cqContent.label.OD_CART_INSTANT_CREDIT_GOT_IT}</button>
                </div>
              </Col>
            </Row>
          </div>
        </Modal>
        <Grid className="pad12 onlyTopPad">
          <Row className="noSideMargin">
            <Col xs={12} className="noSidePad">
              <BackButton to="/" >{cqContent.label.OD_CART_BACK_CTA}</BackButton>
            </Col>
          </Row>
          <Row className="noSideMargin pad24">
            <Col xs={12} >
              {nonBicItems && nonBicItems.length > 0 &&
                <Row className="noSideMargin">
                  <Col xs={12} className="margin48 onlyBottomMargin noPad">
                    <h2 className="fontSize_2_5 margin12 onlyBottomMargin" dangerouslySetInnerHTML={{ __html: `${nonBicItems[0].headerMsg}` }} />
                    <p>{cqContent.label.OD_CART_PREPAID_TEXT}</p>
                  </Col>
                  <Col xs={12} className="noPad">
                    <HorizontalRule y={4} />
                  </Col>
                </Row>
              }
              <div className="margin30 onlyTopMargin">
                {nonBicItems && nonBicItems.map((tradeInPromo, i) => (
                  <div key={tradeInPromo.mtn + i} className="margin36 noSideMargin">
                    <Row key={tradeInPromo.mtn + i}>
                      <Col xs={8} className="margin12 onlyTopMargin">
                        <div>
                          <p className="bold fontSize_4">
                            {tradeInPromo.deviceBrand && <span>{tradeInPromo.deviceBrand}&nbsp;</span>}
                            {tradeInPromo.nickName ? <span>{tradeInPromo.nickName}&nbsp;</span> : <span>{tradeInPromo.displayName}&nbsp;</span>}
                          </p>
                          <p>{`${tradeInPromo.color}, ${tradeInPromo.size}`}</p>
                          <p>{`Device ${tradeInPromo.deviceId}`}</p>
                          {tradeInPromo.tradeInCredit &&
                            <div className="margin12 noSideMargin">
                              <p className="bold">{cqContent.label.DT_OD_CART_ESTIMATED_TRADEIN_HEAD}</p>
                              <p>{`$${tradeInPromo.tradeInCredit}`}</p>
                            </div>
                          }
                          <p className="margin12 noSideMargin">
                            <a
                              className="tradeInItem_removeIcon verticalAlignMiddle link"
                              analyticstrack="remove-trade-in-device-from-cart"
                              onClick={() => {
                                this.removeTradeIn(tradeInPromo.appraiseTradeInDeviceWithOutDeviceId, tradeInPromo.existingAppraisedReferenceId, tradeInPromo.flow);
                              }}
                            >{cqContent.label.OD_CART_INSTANT_CREDIT_REMOVE_TRADE_IN}
                            </a>
                          </p>
                        </div>
                      </Col>
                      <Col xs={4} className="textAlignLeft noSidePad margin12 onlyTopMargin">
                        <Img src={tradeInPromo.modelImage} alt="tradein-image" style={{ width: '100px', height: '150px' }} />
                      </Col>
                    </Row>
                    {tradeInPromoDetails.tradeInDevices > 1 && <HorizontalRule y={1} />}
                  </div>
                ))
                }
              </div>
              <HorizontalRule y={1} />
              {instantCreditDetails &&
                <div>
                  {optionalDownPaymentDetails && optionalDownPaymentDetails.map((optionalDownPaymentDetail) => (
                    <div key={`instantCredit-${this.state.deviceIndex}`}>
                      {optionalDownPaymentDetail.deviceTitle && optionalDownPaymentDetail.optionalDownPaymentAmt &&
                        <Row>
                          <Col xs={6}>
                            <p className="margin3 noSideMargin" dangerouslySetInnerHTML={{ __html: optionalDownPaymentDetail.deviceTitle }} />
                          </Col>
                          <Col xs={6} className="textAlignRight">
                            <p className="margin3 noSideMargin">${optionalDownPaymentDetail.optionalDownPaymentAmt}</p>
                          </Col>
                        </Row>
                      }
                    </div>))
                  }
                  {instantCreditDetails.get('twoYearDevicesInstantCredit') &&
                    <Row>
                      <Col xs={6}>
                        <p className="margin3 noSideMargin">{cqContent.label.OD_CART_INSTANT_CREDIT_2YR}</p>
                      </Col>
                      <Col xs={6} className="textAlignRight">
                        <p className="margin3 noSideMargin">${instantCreditDetails.get('twoYearDevicesInstantCredit')}</p>
                      </Col>
                    </Row>
                  }
                  {instantCreditDetails.get('fullRetailInstantCredit') &&
                    <Row>
                      <Col xs={6}>
                        <p className="margin3 noSideMargin">{cqContent.label.OD_CART_INSTANT_CREDIT_FRP}</p>
                      </Col>
                      <Col xs={6} className="textAlignRight">
                        <p className="margin3 noSideMargin">${instantCreditDetails.get('fullRetailInstantCredit')}</p>
                      </Col>
                    </Row>
                  }
                  {instantCreditDetails.get('accessoriesInsantCredit') &&
                    <Row>
                      <Col xs={6}>
                        <p className="margin3 noSideMargin">{cqContent.label.OD_CART_INSTANT_CREDIT_ACCESSORIES}</p>
                      </Col>
                      <Col xs={6} className="textAlignRight">
                        <p className="margin3 noSideMargin">${instantCreditDetails.get('accessoriesInsantCredit')}</p>
                      </Col>
                    </Row>
                  }
                  {instantCreditDetails.get('taxesInstantCredit') &&
                    <Row>
                      <Col xs={6}>
                        <p className="margin3 noSideMargin">{cqContent.label.OD_CART_INSTANT_CREDIT_TAXES}</p>
                      </Col>
                      <Col xs={6} className="textAlignRight">
                        <p className="margin3 noSideMargin">${instantCreditDetails.get('taxesInstantCredit')}</p>
                      </Col>
                    </Row>
                  }
                  {instantCreditDetails.get('accountCredit') &&
                    <Row>
                      <Col xs={6}>
                        <p className="margin3 noSideMargin">{cqContent.label.OD_CART_INSTANT_CREDIT_ACCOUNT}</p>
                      </Col>
                      <Col xs={6} className="textAlignRight">
                        <p className="margin3 noSideMargin">${instantCreditDetails.get('accountCredit')}</p>
                      </Col>
                    </Row>
                  }
                </div>
              }
              <div className="margin20 textAlignCenter">
                {/* <p>{cqContent.label.OD_CART_INSTANT_CREDIT_DISCLAIMER} <a className="link">{cqContent.label.OD_CART_INSTANT_CREDIT_DISCLAIMER_LINK}</a></p> */}
                {instantCreditPageURL && optionalDownPaymentDetails && optionalDownPaymentDetails.length > 0 && <a className="color_666 textDecUnderline" href={instantCreditPageURL}>{cqContent.label.OD_CART_INSTANT_CREDIT_APPLY_CREDIT}</a>}
              </div>
              <HorizontalRule y={2} />
              <Row>
                <Col xs={12}>
                  <div className="margin30 onlyTopMargin">
                    {bicItems && bicItems.map((tradeInPromo, i) => (
                      <div key={tradeInPromo.mtn + i} className="margin36 noSideMargin">
                        <Row key={tradeInPromo.mtn + i}>
                          <Col xs={12} className="margin48 onlyBottomMargin">
                            <h2 className="fontSize_2_5 margin12 onlyBottomMargin" dangerouslySetInnerHTML={{ __html: `${tradeInPromo.headerMsg}` }} />
                            <p>{cqContent.label.OD_CART_PREPAID_TEXT}</p>
                          </Col>
                          <Col xs={12}>
                            <HorizontalRule y={4} />
                          </Col>
                          <Col xs={8} className="margin12 onlyTopMargin">
                            <div>
                              <p className="bold fontSize_4">
                                {tradeInPromo.deviceBrand && <span>{tradeInPromo.deviceBrand}&nbsp;</span>}
                                {tradeInPromo.nickName ? <span>{tradeInPromo.nickName}&nbsp;</span> : <span>{tradeInPromo.displayName}&nbsp;</span>}
                              </p>
                              <p>{`${tradeInPromo.color}, ${tradeInPromo.size}`}</p>
                              <p>{`Device ${tradeInPromo.deviceId}`}</p>
                              {tradeInPromo.tradeInCredit &&
                                <div className="margin12 noSideMargin">
                                  <p className="bold">{cqContent.label.DT_OD_CART_ESTIMATED_TRADEIN_HEAD}</p>
                                  <p>{`$${tradeInPromo.tradeInCredit}`}</p>
                                </div>
                              }
                              <p className="margin12 noSideMargin">
                                <a
                                  className="tradeInItem_removeIcon verticalAlignMiddle link"
                                  analyticstrack="remove-trade-in-device-from-cart"
                                  onClick={() => {
                                    this.removeTradeIn(tradeInPromo.appraiseTradeInDeviceWithOutDeviceId, tradeInPromo.existingAppraisedReferenceId, tradeInPromo.flow);
                                  }}
                                >{cqContent.label.OD_CART_INSTANT_CREDIT_REMOVE_TRADE_IN}
                                </a>
                              </p>
                            </div>
                          </Col>
                          <Col xs={4} className="textAlignLeft noSidePad margin12 onlyTopMargin">
                            <Img src={tradeInPromo.modelImage} alt="tradein-image" style={{ width: '100px', height: '150px' }} />
                          </Col>
                        </Row>
                        {bicItems && bicItems > 1 &&
                          <Col xs={12}>
                            <HorizontalRule y={1} />
                          </Col>
                        }
                      </div>
                    ))
                    }
                  </div>
                </Col>
              </Row>
              <Row className="noSideMargin textAlignCenter pad32 noSidePad">
                <Col
                  xs={12}
                  className="noSidePad textAlignCenter"
                >
                  <Button
                    type="button"
                    role="button"
                    className="button secondary large width100 margin24 onlyBottomMargin"
                    onClick={this.goToTradeIn.bind(this)}
                    analyticstrack="trade-in-another-device"
                  > {cqContent.label.OD_CART_TRADE_IN_BUTTON_TEXT}
                  </Button>

                </Col>
                <Col
                  xs={12}
                  className="noSidePad textAlignCenter"
                >
                  <Button
                    type="button"
                    role="button"
                    className="button primary large width100"
                    onClick={this.goToPage.bind(this)}
                    analyticstrack="close-instant-credit-cart"
                  > {cqContent.label.OD_CART_ESTIMATED_TRADE_IN_BUTTON_TEXT}
                  </Button>

                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

InstantCredit.propTypes = {
  cqContent: PropTypes.object,
  tradeInPromoDetails: PropTypes.object,
  instantCreditDetails: PropTypes.object,
  removeTradeInDeviceFromCart: PropTypes.func,
  tradeInUrl: PropTypes.string,
  totalDeviceCount: PropTypes.number,
  totalTradeinDeviceCount: PropTypes.number,
  instantCreditPageURL: PropTypes.string,
  showHeadsUpMsg: PropTypes.bool,
  bicItems: PropTypes.array,
  nonBicItems: PropTypes.array,
};

export default InstantCredit;
