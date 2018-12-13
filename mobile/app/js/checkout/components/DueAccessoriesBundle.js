import React from 'react';
import PropTypes from 'prop-types';
import ItemBreakdown from '../../common/ItemBreakDown/';

const DueAccessoriesBundle = ({ accessoriesBundle, cqContent }) => (
  accessoriesBundle.map((item, i) => (
    <div key={`accessories - ${i}`} aria-label={`${item.label} $${item.price}`}>
      <ItemBreakdown
        name={item.displayName}
        price={item.discounted ? item.discountedPrice : item.regularPrice}
        strikeoutprice={item.discounted ? item.regularPrice : null}

      >
        {(item.discountPercentage > 0) && (
          <span className="displayBlock color_666 pad10 onlyTopPad">
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

DueAccessoriesBundle.propTypes = {
  accessoriesBundle: PropTypes.array.isRequired,
  cqContent: PropTypes.object,
};

export default DueAccessoriesBundle;
