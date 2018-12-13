import React from 'react';
import PropTypes from 'prop-types';
import SummaryRow from './summaryRow';

const StandaloneAccessories = (props) => {
  const {
    accessories, cqContent,
  } = props;

  const getDescription = (accessory) => (
    <div className="margin6 noSideMargin">
      {accessory.imageUrl &&
        <img
          className="verticalTop"
          style={{ width: 60 }}
          src={accessory.imageUrl}
          alt="accessory.name"
        />
      }
      <div
        className={accessory.imageUrl && 'displayInlineBlock onlyLeftPad pad20'}
        style={{ width: 'calc(100% - 66px)' }}
      >
        <p dangerouslySetInnerHTML={{ __html: accessory.name }} />
        {(accessory.color || accessory.size) &&
          <p className="fontSize_3">
            {accessory.size &&
              <span>{accessory.size}</span>
            }
            {accessory.size && accessory.color &&
              <span>, </span>
            }
            {accessory.color &&
              <span>{accessory.color}</span>
            }
          </p>
        }
        {getPromo(accessory)}
      </div>
    </div>
  );

  const getPromo = (accessory) => {
    let promo = null;
    if (accessory.discounted && accessory.promoMessage) {
      promo = <p>{accessory.promoMessage}</p>;
    } else if (accessory.discounted && accessory.percentageOffTxt) {
      promo = (
        <div className="margin-6 onlyLeftMargin positionRelative">
          <p className="margin12 onlyTopMargin">
            <span className="font-icon_tag pad24 onlyRightPad" />
            <span>{cqContent.label.DT_OD_CHECKOUT_SUMMARY_STANDALONE_ACCESSORY_PROMO_MESSAGE.replace('$PERCENTAGE$', accessory.percentageOffTxt)}</span>
          </p>
        </div>
      );
    }
    return promo;
  };

  return (
    <div>
      {accessories.map((accessory, index) => (
        <div key={`accessory-${index}`}>
          <SummaryRow
            description={getDescription(accessory)}
            dueToday={`$${accessory.price}`}
            dueTodayDiscounted={accessory.discounted}
            dueTodayOriginal={<strong>${accessory.originalPrice}</strong>}
            accessoryFlow
          />
        </div>
      ))}

    </div>
  );
};

StandaloneAccessories.propTypes = {
  accessories: PropTypes.array,
  cqContent: PropTypes.object,
};

export default StandaloneAccessories;
