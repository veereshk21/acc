import React from 'react';
import PropTypes from 'prop-types';
import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import SummaryRow from './summaryRow';
import StandaloneAccessories from './standaloneAccessories';


const ItemsAccordionItem = (props) => {
  const {
    standaloneAccessories, cqContent,
  } = props;

  return (
    <AccordionItem
      className="accordionItem border_black borderSize_4 onlyTopBorder pad6 onlyTopPad"
      expanded={standaloneAccessories}
    >
      <AccordionItemTitle>
        <SummaryRow
          description={<p>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_ITEMS}</p>}
          dueToday={`$${props.subtotalDueToday}`}
          isTitle
          accessoryFlow={standaloneAccessories}
        />
      </AccordionItemTitle>
      <AccordionItemBody>
        <StandaloneAccessories
          cqContent={cqContent}
          accessories={props.accessories}
        />
      </AccordionItemBody>
    </AccordionItem>
  );
};

ItemsAccordionItem.propTypes = {
  standaloneAccessories: PropTypes.bool,
  accessories: PropTypes.array,
  cqContent: PropTypes.object,
  subtotalDueToday: PropTypes.string,
};

export default ItemsAccordionItem;
