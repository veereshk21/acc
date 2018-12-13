import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

class TradeInDevice extends Component {
  goToTradeIn() {
    this.props.asyncFetch();
    window.location = this.props.tradeInUrl;
  }

  render() {
    const { cqContent } = this.props;
    return (
      <Row style={{ margin: 0 }}>
        {/* ^^^^^ Really hacky margin fix since cart isnt using flexbox properly */}
        <Col xs={12} className="background_gray_one pad12 onlyTopPad">
          <Row bottom="xs" className="margin50 onlyBottomMargin">
            <Col xs={4}>
              <h2 className="fontSize_10" >{cqContent.label.DT_OD_CART_TRADE_IN_TITLE}</h2>
            </Col>
            <Col xs={8}>
              <div className="tradeInPrompt_icon floatRight fontSize_13" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <hr style={{ borderColor: '#000000' }} />
            </Col>
          </Row>
          <Row className="margin18 onlyBottomMargin">
            <Col xs={12} className="margin18 onlyTopMargin">
              <p className="bold fontSize_5" >{cqContent.label.DT_OD_CART_TRADE_IN_STATUS_TEXT}</p>
              {/* <Row>
                <Col xs={7}>
                  <p className="margin12 onlyTopMargin" style={{ width: '93%' }} >{cqContent.label.DT_OD_CART_TRADE_IN_SUB_TEXT}</p>
                </Col>
              </Row> */}
            </Col>
          </Row>
          <Row className="pad12 onlyBottomPad">
            <Col xsOffset={3} xs={9}>
              <div className="margin36 onlyTopMargin textAlignRight">
                <button
                  className="button tertiary m-big sideMarginOnly"
                  onClick={() => {
                    this.goToTradeIn();
                  }}
                  analyticstrack="trade-in-link"
                  style={{ fontSize: '2rem' }}
                >
                  {cqContent.label.DT_OD_CART_TRADE_IN_CTA_TEXT}
                </button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

TradeInDevice.propTypes = {
  cqContent: PropTypes.object,
  tradeInUrl: PropTypes.string,
  asyncFetch: PropTypes.func,
};
export default TradeInDevice;
