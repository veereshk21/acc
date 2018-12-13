import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

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
    } = this.props;
    const imageWidthHeight = '&wid=110&hei=130';
    return (
      <section className="tradeInContainer">
        <h1 className="pad10 noSidePad">{cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_TITLE}</h1>
        {tradeInDevices.map((tradeInItem, i) => {
          const deviceName = `${tradeInItem.deviceBrand ? tradeInItem.deviceBrand : ''} ${tradeInItem.displayName ? tradeInItem.displayName : ''}`;
          const tradeInPromoPresent = (tradeInItem.promoCreditType === 'SPO' || tradeInItem.promoCreditType === 'REG' || tradeInItem.bicApplied);
          return (
            <Row key={`tradeIn-${i}`}>
              <Col xs={2} >
                {tradeInItem.modelImage && <div className="textAlignLeft">
                  <img src={`${tradeInItem.modelImage}${imageWidthHeight}`} alt={tradeInItem.displayName} />
                </div>}
              </Col>

              <Col xs={10} >
                <section>
                  {cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_SHIPPING_INFO}
                  <section className="margin12 noSideMargin">
                    <Row>
                      <Col xs={3}>
                        <div className="bold textAlignLeft">
                          {cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_DEVICE_TITLE}
                        </div>
                        <div className="bold textAlignLeft margin10 noSideMargin" dangerouslySetInnerHTML={{ __html: deviceName }} />
                      </Col>
                      {!tradeInPromoPresent ?
                        <Col xs={3}>
                          <div className="bold textAlignLeft">
                            {cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_MARKET_TITLE}
                          </div>
                          <div className="bold textAlignLeft margin10 noSideMargin">
                            ${tradeInItem.tradeInCredit}
                          </div>
                        </Col>
                        :
                        <Col xs={3}>
                          <div className="bold textAlignLeft">
                            {cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_PROMOTIONAL_TITLE}
                          </div>
                          <div className="bold textAlignLeft margin10 noSideMargin">
                            ${tradeInItem.tradeInCredit}
                          </div>
                        </Col>
                      }
                      <Col xs={3}>
                        <div className="bold textAlignLeft">
                          {cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_SUBMISSION_TITLE}
                        </div>
                        <div className="bold textAlignLeft margin10 noSideMargin">
                          {tradeInItem.submissionId ? tradeInItem.submissionId : '--'}
                        </div>
                      </Col>
                      <Col xs={12} >
                        <div className="clearfix" />
                        {tradeInItem.maxPrice &&
                          <div>
                            {cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_APPRAISED_VZW_VALUE}${tradeInItem.maxPrice}
                          </div>
                        }
                        {tradeInItem.maxPrice &&
                          <div className="pad20 onlyTopPad">
                            {cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_TOTAL_APPRAISED_VZW_VALUE}${tradeInItem.maxPrice}
                          </div>
                        }
                        <p>{cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_CONDITION}</p>
                      </Col>
                    </Row>
                  </section>
                </section>
              </Col>
              <Col xs={12}>
                <div className="bold margin10 noSideMargin">
                  <a
                    href="d"
                    onClick={this.print.bind(this)}
                    target="_blank"
                    className="textDecUnderline margin10 onlyRightMargin"
                  ><span dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_PRINT_RECEIPT }} />
                  </a>
                  <a
                    href=" /support/transfer-contacts-and-media/"
                    target="_blank"
                    className="textDecUnderline margin10 onlyRightMargin"
                  ><span dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_MORE }} />
                  </a>
                  <a
                    href=" /support/transfer-contacts-and-media/"
                    target="_blank"
                    className="textDecUnderline margin10 onlyRightMargin"
                  ><span dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_FAQ }} />
                  </a>
                </div>
              </Col>
            </Row>);
        })
        }
      </section>
    );
  }
}

TradeListWrapper.propTypes = {
  cqContent: PropTypes.object,
  tradeInDevices: PropTypes.array,
};

export default TradeListWrapper;

