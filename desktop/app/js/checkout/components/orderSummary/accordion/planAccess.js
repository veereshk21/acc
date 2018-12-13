import React from 'react';
import PropTypes from 'prop-types';
import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import SummaryRow from './summaryRow';

const PlanAccessAccordionItem = (props) => {
  const {
    plans, cqContent,
  } = props;

  return (
    <AccordionItem className="accordionItem border_black borderSize_1 onlyTopBorder pad6 onlyTopPad">
      <AccordionItemTitle>
        <SummaryRow
          description={<p className="fontSize_5">{cqContent.label.DT_OD_CHECKOUT_SUMMARY_PHONE_PLAN_ACCESS}</p>}
          isTitle
          dueMonthly={`$${plans.totalLineAccessCharges}`}
        />
      </AccordionItemTitle>
      <AccordionItemBody>
        {plans && plans.items && plans.items.map((plan, planIndex) => (
          (plan.lineAccessCharges && plan.lineAccessCharges.map((lac, lacIndex) => (
            <div key={`lac-${planIndex}-${lacIndex}`}>
              <SummaryRow
                description={<p dangerouslySetInnerHTML={{ __html: `${lac.name ? lac.name : ''}` }} />}
                dueToday="--"
                dueMonthly={`$${lac.price}`}
                dueMonthlyDiscounted={lac.hasEcpdDiscount}
                dueMonthlyOriginal={`$${lac.wasPrice}`}
                promoMessage={lac.promoMessage}
              />
            </div>
          )))
        ))}
      </AccordionItemBody>
    </AccordionItem>
  );
};

PlanAccessAccordionItem.propTypes = {
  plans: PropTypes.object,
  cqContent: PropTypes.object,
};

export default PlanAccessAccordionItem;
