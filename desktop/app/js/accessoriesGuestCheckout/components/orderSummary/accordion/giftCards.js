import React from 'react';
import PropTypes from 'prop-types';
import SummaryRow from './summaryRow';

const PlanAccessAccordionItem = (props) => {
  const {
    giftCardList, cqContent,
  } = props;

  return (
    <div className="accordionItem border_black borderSize_1 onlyTopBorder pad6 onlyTopPad">
      <div>
        <SummaryRow
          description={<p className="fontSize_5">{giftCardList.length > 1 ? cqContent.label.DT_OD_CHECKOUT_SUMMARY_GIFT_CARDS : cqContent.label.DT_OD_CHECKOUT_SUMMARY_GIFT_CARD}</p>}
          isTitle
        />
      </div>
      <div>
        {giftCardList && giftCardList.length > 0 && giftCardList.map((giftCard, index) => (
          <div key={`giftCard-${index}`}>
            <SummaryRow
              description={<p>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_GIFT_CARD_PREFIX.replace('$DIGITS$', giftCard.lastDigits)}</p>}
              dueToday={`-$${giftCard.amountToApply}`}
            />

          </div>
        ))}
      </div>
    </div>

  );
};

PlanAccessAccordionItem.propTypes = {
  giftCardList: PropTypes.array,
  cqContent: PropTypes.object,
};

export default PlanAccessAccordionItem;
