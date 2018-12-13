import React from 'react';
import PropTypes from 'prop-types';
import { AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import SummaryRow from './summaryRow';

const cpcAccordionItem = (props) => {
  const {
    plans, cqContent,
  } = props;

  return (
    <AccordionItem className="accordionItem border_black borderSize_1 onlyTopBorder pad6 onlyTopPad">
      <AccordionItemTitle>
        <SummaryRow
          description={<p className="fontSize_5">{plans.items && plans.items[0].planDisplayName}</p>}
          dueMonthly={`$${plans.hasEcpdDiscount ? plans.discountedDueMonthlyPlanWithLAC : plans.dueMonthlyPlanWithLAC}`}
          dueMonthlyDiscounted={plans.hasEcpdDiscount}
          dueMonthlyOriginal={`$${plans.dueMonthlyPlanWithLAC}`}
          isTitle
        />
      </AccordionItemTitle>

      <AccordionItemBody>
        {plans.newDevices && plans.newDevices.length > 0 &&
          <div>
            <p className="bold margin12 noSideMargin">{cqContent.label.DT_OD_CHECKOUT_SUMMARY_PLAN_NEW_DEVICES}</p>
            {plans.newDevices.map((item, index) => (
              <div key={`newDevices-${index}`}>
                <SummaryRow
                  description={<p dangerouslySetInnerHTML={{ __html: item.name }} />}
                  dueToday="--"
                  dueMonthly={item.hasEcpdDiscount ? `$${item.discountPriceVal}` : `$${item.price}`}
                  dueMonthlyDiscounted={item.hasEcpdDiscount}
                  dueMonthlyOriginal={`$${item.price}`}
                  promoMessage={item.promoMessage}
                />
              </div>
            ))}
          </div>
        }

        {plans.upgradeDevices && plans.upgradeDevices.length > 0 &&
          <div>
            <p className="bold margin12 noSideMargin">{cqContent.label.DT_OD_CHECKOUT_SUMMARY_PLAN_UPGRADE_DEVICES}</p>
            {plans.upgradeDevices.map((item, index) => (
              <div key={`upgradeDevices-${index}`}>
                <SummaryRow
                  description={<p dangerouslySetInnerHTML={{ __html: item.name }} />}
                  dueToday="--"
                  dueMonthly={item.hasEcpdDiscount ? `$${item.discountPriceVal}` : `$${item.price}`}
                  dueMonthlyDiscounted={item.hasEcpdDiscount}
                  dueMonthlyOriginal={`$${item.price}`}
                  promoMessage={item.promoMessage}
                />
              </div>
            ))}
          </div>
        }

        {plans.existingDevices && plans.existingDevices.length > 0 &&
          <div>
            <p className="bold margin12 noSideMargin">{cqContent.label.DT_OD_CHECKOUT_SUMMARY_PLAN_EXISTING_DEVICES}</p>
            {plans.existingDevices.map((item, index) => (
              <div key={`existingDevices-${index}`}>
                <SummaryRow
                  description={<p dangerouslySetInnerHTML={{ __html: item.name }} />}
                  dueToday="--"
                  dueMonthly={item.hasEcpdDiscount ? `$${item.discountPriceVal}` : `$${item.price}`}
                  dueMonthlyDiscounted={item.hasEcpdDiscount}
                  dueMonthlyOriginal={`$${item.price}`}
                  promoMessage={item.promoMessage}
                />
              </div>
            ))}
          </div>
        }
        {props.showPlanCost &&
          <div>
            <p className="bold margin12 noSideMargin">{cqContent.label.DT_OD_CHECKOUT_SUMMARY_PLAN_ACCOUNT_ACCESS}</p>
            {plans && plans.items && plans.items.map((item, index) => (
              <div key={`planAccess-${index}`}>
                {item.accountAccess && <SummaryRow
                  description={<p dangerouslySetInnerHTML={{ __html: item.planDescrption }} />}
                  dueToday="--"
                  dueMonthly={`$${item.accountAccess.price}`}
                  dueMonthlyDiscounted={item.accountAccess.hasEcpdDiscount}
                  dueMonthlyOriginal={`$${item.accountAccess.listPrice}`}
                />}
              </div>
            ))}
          </div>
        }
      </AccordionItemBody>
    </AccordionItem>

  );
};

cpcAccordionItem.propTypes = {
  cqContent: PropTypes.object,
  plans: PropTypes.object,
  showPlanCost: PropTypes.bool,
};

export default cpcAccordionItem;
