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
    } = this.props;
    const imageWidthHeight = '&wid=110&hei=130';
    return (
      <div className="tradeIn_list color_black">
        <ListWrapper className="tradeIn_list_item">
          <h1 className="pad20 onlyTopPad fontSize_10">{cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_TITLE}</h1>
          <div className="promoTrade-InDevices">
            {tradeInDevices.map((tradeInItem, i) => {
              const deviceName = `${tradeInItem.deviceBrand ? tradeInItem.deviceBrand : ''} ${tradeInItem.displayName ? tradeInItem.displayName : ''}`;
              const tradeInPromoPresent = (tradeInItem.promoCreditType === 'SPO' || tradeInItem.promoCreditType === 'REG' || tradeInItem.bicApplied);
              return (
                <div key={`tradeInPromoDevice-${i}`} className="tradeIn_list_item_details border_graythree onlyTopBorder pad36 noSidePad">
                  <Row>
                    <Col xs={3} className="textAlignLeft">
                      {tradeInItem.modelImage &&
                        <img className="maxWidth100" src={`${tradeInItem.modelImage}${imageWidthHeight}`} alt={tradeInItem.displayName} />
                      }
                    </Col>
                    <Col xs={9} className="positionRelative">
                      <h3 className="fontSize_8 margin20 onlyBottomMargin">
                        {tradeInPromoPresent ?
                          cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_PROMO_HEADER.replace('$AMOUNT$', tradeInItem.tradeInCredit)
                          :
                          cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_MARKET_HEADER.replace('$AMOUNT$', tradeInItem.tradeInCredit)
                        }
                      </h3>
                      <p className="bold fontSize_8 margin6 noSideMargin" dangerouslySetInnerHTML={{ __html: deviceName }} />
                      <p>{tradeInItem.size}, {tradeInItem.color}</p>
                      <p >{cqContent.label.DT_OD_CONFIRMATION_INSTANT_CREDIT_DEVICE_ID.replace('$ID$', tradeInItem.deviceId)}</p>
                      {tradeInItem.submissionId &&
                        <p className="margin12 onlyTopMargin">{cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_SUBMISSION_TITLE}: {tradeInItem.submissionId}</p>
                      }
                    </Col>
                  </Row>
                  {!tradeInItem.bicApplied &&
                    <div className="margin30 onlyTopMargin">
                      <p className="fontSize_1">{cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_PROMO_DISCLAIMER.replace('$AMOUNT$', tradeInItem.tradeInCredit)}</p>
                      <p className="fontSize_1">{cqContent.label.DT_OD_CONFIRMATION_TRADE_IN_CONDITION_DISCLAIMER}</p>
                    </div>
                  }
                </div>
              );
            })}
          </div>
          <div className="tradeIn_Info">
            <hr className="margin20 noSideMargin" style={{ borderColor: '#000' }} />
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
};

export default TradeListWrapper;
