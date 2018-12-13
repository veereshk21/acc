import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import SummaryRow from './summaryRow';

const deviceName = (device) => (
  <p className="bold">
    {device.deviceBrand && <span dangerouslySetInnerHTML={{ __html: device.deviceBrand }} />}
    <span dangerouslySetInnerHTML={{ __html: device.displayName }} />
    {device.size && <span> {device.size} </span>}
    {device.color && <span>in {device.color}</span>}
  </p>
);

const TradeInAccordionItem = (props) => {
  const {
    standaloneAccessories, cqContent, instantCreditOrder,
  } = props;

  return (
    <AccordionItem className="accordionItem border_black borderSize_1 onlyTopBorder pad6 onlyTopPad">
      <AccordionItemTitle>
        <SummaryRow
          description={<p className="fontSize_5">{cqContent.label.DT_OD_CHECKOUT_SUMMARY_TRADEIN}</p>}
          isTitle
          accessoryFlow={standaloneAccessories}
        />
      </AccordionItemTitle>
      <AccordionItemBody>
        {props.tradeInDetails.tradeInDevices.map((device, index) => {
          const tradeInPromoPresent = (device.promoCreditType === 'SPO' || device.promoCreditType === 'REG' || device.bicApplied);
          return (
            <div key={`tradein-${index}`}>
              <Row>
                <Col xs={11}>
                  <div className="margin12 onlyTopMargin">
                    {deviceName(device)}
                  </div>
                  {/* Market Value - if no Promo*/}
                  {!tradeInPromoPresent &&
                    <div className="margin6 noSideMargin">
                      <p>
                        {!instantCreditOrder ?
                          <span>
                            {/* BAU Market Value  */}
                            {cqContent.label.DT_OD_CHECKOUT_SUMMARY_TRADEIN_MARKET_VALUE}&nbsp;${device.tradeInCredit}
                          </span>
                          :
                          <span>
                            {/* Instant Credit Market Value */}
                            {cqContent.label.DT_OD_CHECKOUT_SUMMARY_INSTANT_CREDIT_TRADEIN_MARKET_VALUE}&nbsp;${device.tradeInCredit}
                          </span>
                        }
                      </p>
                    </div>
                  }
                  {/* Promo Value */}
                  {tradeInPromoPresent &&
                    <div className="margin6 noSideMargin">
                      <p>
                        <span>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_TRADEIN_PROMOTIONAL_VALUE} </span>
                        <span>${device.tradeInCredit}</span>
                      </p>
                      {device.bicApplied &&
                        <p>{cqContent.label.DT_OD_CHECKOUT_TRADEIN_DPP_PROMO_PAYMENTS.replace('$AMOUNT$', device.dppCredit)}</p>
                      }
                    </div>
                  }
                </Col>
              </Row >
            </div>
          );
        })}
      </AccordionItemBody>
    </AccordionItem>

  );
};

TradeInAccordionItem.propTypes = {
  standaloneAccessories: PropTypes.bool,
  cqContent: PropTypes.object,
  tradeInDetails: PropTypes.object,
  instantCreditOrder: PropTypes.bool,
};

export default TradeInAccordionItem;
