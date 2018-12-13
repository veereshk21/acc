import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Accordion } from 'react-accessible-accordion';
import SummaryRow from './summaryRow';
import Items from './items';
import Shipping from './shipping';
import Taxes from './taxes';
import GiftCards from './giftCards';

const OrderAccordion = (props) => {
  const {
    standaloneAccessories, cqContent,
  } = props;

  return (
    <div className="orderSummary">
      <Row>
        <Col xs={8} />
        <Col xs={3}>
          <p className="bold fontSize_5 textAlignRight">
            {cqContent.label.DT_OD_CHECKOUT_SUMMARY_HEADER_DUE_TODAY}
          </p>
        </Col>
        <Col xs={1} aria-hidden />
      </Row >

      <Accordion>
        <Items
          cqContent={cqContent}
          standaloneAccessories={standaloneAccessories}
          accessories={props.accessories}
          subtotalDueToday={props.subtotalDueToday}
        />
        {props.stepsCompleted.shippingAddress &&
        <Taxes
          cqContent={cqContent}
          standaloneAccessories={standaloneAccessories}
          taxes={props.taxes}
          totalOrderTax={props.totalOrderTax}
        />}
        {props.showDeliveryMethod &&
          <Shipping
            cqContent={cqContent}
            standaloneAccessories={standaloneAccessories}
            shipping={props.shipping}
          />}
        {/* Total */}
        <div className="accordionItem border_black borderSize_1 onlyTopBorder pad6 onlyTopPad">
          <SummaryRow
            description={<p className="fontSize_7">{cqContent.label.DT_OD_CHECKOUT_SUMMARY_TOTAL}</p>}
            dueToday={`$${props.dueToday}`}
            dueMonthly={`$${props.dueMonthly}`}
            isTitle
            accessoryFlow={standaloneAccessories}
          />
        </div>
        {props.showGiftCards &&
          <GiftCards
            cqContent={cqContent}
            plans={props.plans}
            showGiftCards={props.showGiftCards}
            giftCardList={props.giftCardList}
          />
        }
      </Accordion>
    </div>
  );
};

OrderAccordion.propTypes = {
  cqContent: PropTypes.object,
  standaloneAccessories: PropTypes.bool,
  accessories: PropTypes.array,
  plans: PropTypes.object,
  shipping: PropTypes.object,
  taxes: PropTypes.array,
  dueToday: PropTypes.string,
  dueMonthly: PropTypes.string,
  subtotalDueToday: PropTypes.string,
  totalOrderTax: PropTypes.string,
  showGiftCards: PropTypes.bool,
  giftCardList: PropTypes.array,
  showDeliveryMethod: PropTypes.bool,
  stepsCompleted: PropTypes.object,
};

export default OrderAccordion;
