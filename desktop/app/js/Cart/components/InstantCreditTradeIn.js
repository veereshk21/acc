import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Modal from '../../common/Modal/index';
import TradeInPromoDetails from './TradeInPromoDetails';

class InstantCreditTradeIn extends Component {
  constructor(props) {
    super(props);
    this.removeTradeIn = this.removeTradeIn.bind(this);
    this.goToTradeIn = this.goToTradeIn.bind(this);

    this.state = {
      expanded: false,
      removeTradeIn: false,
      showModal: false,
      params: {},
    };
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

  goToTradeIn(event) {
    event.preventDefault();
    const tradeExceedsPurchase = this.props.totalDeviceCount && this.props.totalTradeinDeviceCount && this.props.totalTradeinDeviceCount >= this.props.totalDeviceCount;
    this.props.asyncFetch();
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
    const { instantCreditPageURL, instantCreditTradeinSummary, cqContent, bicItems, nonBicItems } = this.props;
    return (
      <div className="fontSize_4 pad12">
        <Modal
          mounted={this.state.showModal}
          style={{ background: 'white', width: '40%' }}
          closeFn={() => { this.setState({ showModal: false }); }}
          showCloseX
        >
          <section>
            {<div className="height200 border_black borderSize_2 onlyBottomBorder margin15 onlyBottomMargin">
              <h2 className="fontSize_7 width70" dangerouslySetInnerHTML={{ __html: cqContent.label.OD_CART_INSTANT_CREDIT_MODAL_TITLE }} />
            </div>}
            <div className="height200">
              <p className="fontSize_4 lineHeight18 bold">
                {this.state.removeTradeIn ? cqContent.label.OD_CART_INSTANT_CREDIT_REMOVE_TRADE_IN_DISCLAIMER : cqContent.label.OD_CART_INSTANT_CREDIT_TRADE_IN_MORE_DISCLAIMER}
              </p>
            </div>
            <Row>
              <Col xs={6}>
                <button
                  className="primary bold button pad10 onlyRightPad width100 floatLeft"
                  analyticstrack="goto-unlimitedPlan-CTA"
                  onClick={this.moveNext.bind(this)}
                >{cqContent.label.OD_CART_INSTANT_CREDIT_GOT_IT}
                </button>
              </Col>
              <Col xs={6}>
                <button
                  className="secondary bold button pad5 onlyLeftPad width100 floatRight"
                  analyticstrack="goto-currentPlan-CTA"
                  onClick={() => { this.setState({ showModal: false }); }}
                >{cqContent.label.OD_CART_INSTANT_CREDIT_GO_BACK}
                </button>
              </Col>
            </Row>
          </section>
        </Modal>
        <div className="">
          {bicItems && bicItems.map((device, index) => (
            <TradeInPromoDetails
              device={device}
              tradeInUrl={this.props.tradeInUrl}
              cqContent={cqContent}
              removeTradeInDeviceFromCart={this.props.removeTradeInDeviceFromCart}
              index={index}
              instantPath
              count={bicItems.length - 1}
            />
          ))}
          {nonBicItems && nonBicItems.length > 0 && <hr className="margin12" style={{ borderColor: '#D8DADA' }} /> }
          <Row className="pad12">
            {nonBicItems && nonBicItems.length > 0 &&
              <Col xs={10} xsOffset={2} >
                <p className="fontSize_7 bold margin18 onlyBottomMargin">{nonBicItems[0].headerMsg}</p>
              </Col>
            }
            {nonBicItems && <Col xs={6}>
              {nonBicItems.map((device, index) => (
                <Row key={index} className="pad24 onlyBottomPad">
                  <Col xs={4} className="textAlignLeft">
                    <img
                      className="width90"
                      alt="Traded in device"
                      src={device.modelImage}
                    />
                  </Col>
                  <Col xs={8}>
                    <Row>
                      <Col xs={12}>
                        <p className="fontSize_7 bold margin6 noSideMargin" dangerouslySetInnerHTML={{ __html: device.displayName }} />
                        <p className="margin6 noSideMargin">{`${device.size}, ${device.color}`}</p>
                        <p className="margin6 noSideMargin">{`Device ${device.deviceId}`}</p>
                      </Col>
                      <Col xs={12} className="margin18 onlyTopMargin">
                        <a
                          role="button"
                          onClick={() => {
                            this.removeTradeIn(device.appraiseTradeInDeviceWithOutDeviceId, device.existingAppraisedReferenceId, device.flow);
                          }}
                          analyticstrack="remove-trade-in-link"
                        >
                          {cqContent.label.DT_OD_CART_TRADE_IN_DEVICE_REMOVE_TEXT}
                        </a>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))}
            </Col>}
            {nonBicItems &&
              <Col xs={6} className="positionRelative">
                {instantCreditTradeinSummary && instantCreditTradeinSummary.totalInstantCredit &&
                  <Row className="pad6 onlyBottomPad">
                    <Col xs={12} className="bold">
                      <p>
                        <span>{cqContent.label.DT_OD_CART_APPRAISED_IC_TEXT}</span>
                        <span>${instantCreditTradeinSummary.totalInstantCredit}</span>
                      </p>
                    </Col>
                  </Row>
                }
                <Row className="pad24 onlyBottomPad">
                  <Col xs={12} className="fontSize_4">
                    {cqContent.label.DT_OD_CART_IC_VALIDITY_PERIOD}
                  </Col>
                </Row>
                {instantCreditTradeinSummary &&
                  <Row className="pad12 onlyBottomPad">
                    <hr className="border_black margin6 onlySideMargin width100 borderSize_1 onlyTopBorder" />
                    <Col xs={12} className="margin20 noSideMargin">
                      <Accordion className="width100" accordion={false}>
                        <AccordionItem className="accordionItem">
                          <AccordionItemTitle style={{ justifyContent: 'space-between', display: 'flex' }} aria-controls="order-summary">
                            <Row style={{ width: '100%' }} >
                              <Col xs={10}>
                                <span className="bold fontSize_4 orderSummarySidebar_mainHeading color_00">
                                  {cqContent.label.DT_OD_CART_APPLIED_INSTANT_CREDIT}
                                </span>
                              </Col>
                              <Col xs={2} aria-hidden className="bold fontSize_7 textAlignRight" />
                            </Row>
                          </AccordionItemTitle>
                          <AccordionItemBody aria-labelledby="order-summary">
                            <div className="section group min-height500" style={{ width: '100%' }} >
                              <Row className="min-height500 pad36 onlyRightPad margin20 onlyBottomMargin">
                                <Col xs={12}>
                                  {instantCreditTradeinSummary && instantCreditTradeinSummary.optionalDownPayment && instantCreditTradeinSummary.optionalDownPayment.map((info, id) => (
                                    <div>
                                      {info.deviceTitle && info.optionalDownPaymentAmt &&
                                        <Row key={id} className="pad10 onlyTopPad">
                                          <Col xs={8} dangerouslySetInnerHTML={{ __html: info.deviceTitle }} />
                                          <Col xs={4} className="textAlignRight">${info.optionalDownPaymentAmt}</Col>
                                        </Row>
                                      }
                                    </div>
                                  ))}
                                  {(instantCreditTradeinSummary.twoYearDevicesInstantCredit) && <Row className="pad10 onlyTopPad">
                                    <Col xs={8}>{cqContent.label.DT_OD_CART_TWO_YR_INSTANT_CREDIT}</Col>
                                    <Col xs={4} className="textAlignRight">${instantCreditTradeinSummary.twoYearDevicesInstantCredit}</Col>
                                  </Row>}
                                  {(instantCreditTradeinSummary.fullRetailInstantCredit) && <Row className="pad10 onlyTopPad">
                                    <Col xs={8}>{cqContent.label.DT_OD_CART_RETAIL_INSTANT_CREDIT}</Col>
                                    <Col xs={4} className="textAlignRight">${instantCreditTradeinSummary.fullRetailInstantCredit}</Col>
                                  </Row>}
                                  {(instantCreditTradeinSummary.accessoriesInsantCredit) && <Row className="pad10 onlyTopPad">
                                    <Col xs={8}>{cqContent.label.DT_OD_CART_ACCESSORIES_TITLE}</Col>
                                    <Col xs={4} className="textAlignRight">${instantCreditTradeinSummary.accessoriesInsantCredit}</Col>
                                  </Row>}
                                  {(instantCreditTradeinSummary.taxesInstantCredit) && <Row className="pad10 onlyTopPad">
                                    <Col xs={8}>{cqContent.label.DT_OD_CART_TAXES_INSTANT_CREDIT}</Col>
                                    <Col xs={4} className="textAlignRight">${instantCreditTradeinSummary.taxesInstantCredit}</Col>
                                  </Row>}
                                  {(instantCreditTradeinSummary.accountCredit) && <Row className="pad10 onlyTopPad">
                                    <Col xs={8}>{cqContent.label.DT_OD_CART_ACCOUNT_INSTANT_CREDIT}</Col>
                                    <Col xs={4} className="textAlignRight">${instantCreditTradeinSummary.accountCredit}</Col>
                                  </Row>}
                                </Col>
                              </Row>
                            </div>
                          </AccordionItemBody>
                        </AccordionItem>
                      </Accordion>
                    </Col>
                  </Row>
                }
                <Row className="pad24 onlyBottomPad">
                  <Col xs={12}>
                    {instantCreditTradeinSummary && instantCreditTradeinSummary.optionalDownPayment && instantCreditTradeinSummary.optionalDownPayment.length > 0 && <a
                      className="color_333 fontSize_4"
                      onClick={() => { this.props.asyncFetch(); window.location.href = instantCreditPageURL; }}
                    >{cqContent.label.DT_OD_CART_EDIT_TEXT}
                    </a>}
                  </Col>
                </Row>
              </Col>
            }
          </Row>
        </div>
        <Row className="pad12">
          <Col xs={8} className="">
            {nonBicItems && nonBicItems.length > 0 && nonBicItems[nonBicItems.length - 1].legalText &&
              <p
                className="legal pad12 onlyLeftPad"
                dangerouslySetInnerHTML={{ __html: nonBicItems[nonBicItems.length - 1].legalText }}
              />
            }
          </Col>
          <Col xs={4} className="fontSize_7 textRight tertiary">
            <a
              role="button"
              onClick={this.goToTradeIn}
              analyticstrack="trade-in-link"
              className="noTextDecoration"
            >
              {cqContent.label.DT_OD_CART_TRADE_IN_ANOTHER_DEVICE_CTA_TEXT}
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}

InstantCreditTradeIn.propTypes = {
  cqContent: PropTypes.object,
  tradeInUrl: PropTypes.string,
  removeTradeInDeviceFromCart: PropTypes.func,
  instantCreditPageURL: PropTypes.string,
  instantCreditTradeinSummary: PropTypes.object,
  totalDeviceCount: PropTypes.number,
  totalTradeinDeviceCount: PropTypes.number,
  showHeadsUpMsg: PropTypes.bool,
  bicItems: PropTypes.array,
  nonBicItems: PropTypes.array,
  asyncFetch: PropTypes.asyncFetch,
};
export default InstantCreditTradeIn;
