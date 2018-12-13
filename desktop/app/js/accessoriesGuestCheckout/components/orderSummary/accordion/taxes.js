import React from 'react';
import PropTypes from 'prop-types';
import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import SummaryRow from './summaryRow';
import ToolTip from './../../../../common/ToolTip';

const TaxesAccordionItem = (props) => {
  const {
    standaloneAccessories, cqContent,
  } = props;

  return (
    <AccordionItem className="accordionItem border_black borderSize_1 onlyTopBorder pad6 onlyTopPad">
      <AccordionItemTitle>
        <SummaryRow
          description={<p>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_TAXES}</p>}
          dueToday={`$${props.totalOrderTax}`}
          isTitle
          accessoryFlow={standaloneAccessories}
        />
      </AccordionItemTitle>
      <AccordionItemBody>
        {props.taxes.map((item, index) => (
          <div key={`tax-${index}`}>
            <SummaryRow
              description={<div> <span>{item.name} </span> <ToolTip className="margin3 onlyLeftMargin displayInlineBlock" header="" text={cqContent.label.DT_OD_CHECKOUT_SUMMARY_TAX_TOOLTIP} /> </div>}
              dueToday={`$${item.price}`}
              dueMonthly="-"
              accessoryFlow={standaloneAccessories}
            />
          </div>
        ))}
      </AccordionItemBody>
    </AccordionItem>

  );
};

TaxesAccordionItem.propTypes = {
  taxes: PropTypes.array,
  standaloneAccessories: PropTypes.bool,
  cqContent: PropTypes.object,
  totalOrderTax: PropTypes.string,
};

export default TaxesAccordionItem;
