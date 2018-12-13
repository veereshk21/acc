import React from 'react';
import PropTypes from 'prop-types';
import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import SummaryRow from './summaryRow';

const ShippingAccordionItem = (props) => {
  const {
    shipping, standaloneAccessories, cqContent,
  } = props;

  return (
    <AccordionItem className="accordionItem border_black borderSize_1 onlyTopBorder pad6 onlyTopPad">
      <AccordionItemTitle>
        <SummaryRow
          description={<p>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_SHIPPING}</p>}
          dueToday={shipping.price > 0 ? `$${shipping.price}` : 'Free'}
          isTitle
          accessoryFlow={standaloneAccessories}
        />
      </AccordionItemTitle>
      <AccordionItemBody>
        <SummaryRow
          description={<p>{shipping.shippingTypeName}</p>}
          dueToday={shipping.price > 0 ? `$${shipping.price}` : 'Free'}
          dueMonthly="-"
          accessoryFlow={standaloneAccessories}
        />
      </AccordionItemBody>
    </AccordionItem>

  );
};

ShippingAccordionItem.propTypes = {
  shipping: PropTypes.object,
  standaloneAccessories: PropTypes.bool,
  cqContent: PropTypes.object,
};

export default ShippingAccordionItem;
