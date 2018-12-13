import React from 'react';
import PropTypes from 'prop-types';
import ItemBreakdown from '../../common/ItemBreakDown/';

const DueAccessories = ({ cqContent, accessories }) => (
  accessories.map((item, i) => (
    <div key={`accessories - ${i}`} aria-label={`${item.label} $${item.price}`}>
      <ItemBreakdown
        name={item.name}
        price={item.price}
        strikeoutprice={item.discounted ? item.wasPrice : null}

      >
        <p className="fontSize_1_3 color_gray_six">{item.color !== null && item.color} {(item.color !== null && item.size !== null) && ','} {item.size !== null && item.size}</p>
        {(item.discountPercentage > 0) && (
          <span className="displayBlock color_gray_six pad10 onlyTopPad">
            <span>{parseInt(item.discountPercentage, 10)}</span>
            <span>{cqContent.label.OD_DUE_TODAY_OFF_SALE}</span>
          </span>)}

        {item.instantCreditApplied &&
          <p>
            {item.discountPercentage > 0 ?
              cqContent.label.OD_CHECKOUT_INSTANT_CREDIT_ACCESSORY_PROMO_APPLIED.replace('$AMOUNT$', item.instantCreditApplied)
              :
              cqContent.label.OD_CHECKOUT_INSTANT_CREDIT_ACCESSORY_APPLIED.replace('$AMOUNT$', item.instantCreditApplied)
            }
          </p>
        }
      </ItemBreakdown>
    </div>
  ))
);

DueAccessories.propTypes = {
  accessories: PropTypes.array,
  cqContent: PropTypes.object,
};

export default DueAccessories;
