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
          description={<p className="fontSize_5">{cqContent.label.DT_OD_CHECKOUT_SUMMARY_TAXES}</p>}
          dueToday={`$${props.totalOrderTax}`}
          isTitle
          accessoryFlow={standaloneAccessories}
        />
      </AccordionItemTitle>
      <AccordionItemBody>
        {props.taxes.map((item, index) => (
          <div key={`tax-${index}`}>
            {item.instantCreditApplied ?
              <SummaryRow
                description={
                  <div>
                    <p>{item.name}: ${item.originalPrice}</p>
                    <p className="margin12 onlyBottomMargin">{'Instant credit applied to $TAX_NAME$:'.replace('$TAX_NAME$', item.name)} {item.instantCreditApplied}</p>
                    <p>Adjusted {item.name}:</p>
                  </div>
                }
                dueToday={<span className="positionAbsolute" style={{ bottom: 0, right: 8 }}>${item.price}</span>}
                dueMonthly={<span className="positionAbsolute" style={{ bottom: 0, right: 8 }}>--</span>}
                accessoryFlow={standaloneAccessories}
              />
              :
              (<SummaryRow
                description={<div><span>{item.name}</span> <ToolTip className="margin3 onlyLeftMargin displayInlineBlock" header="" text={cqContent.label.DT_OD_CHECKOUT_SUMMARY_TAX_TIP} /></div>}
                dueToday={`$${item.price}`}
                dueMonthly="--"
                accessoryFlow={standaloneAccessories}
              />)}
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
