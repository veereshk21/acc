import React from 'react';
import PropTypes from 'prop-types';
import tradeinIcon from '../../../../images/recycle.svg';

const TradeInBanner = (props) => (
  <div>
    {props.tradeInDetails.tradeInDevices.map((device, index) => {
      const tradeInPromoPresent = (device.promoCreditType === 'SPO' || device.promoCreditType === 'REG' || device.bicApplied);
      return (
        <div
          key={`tradein-${index}`}
          className="border_black margin20 noSideMargin pad20 clearfix"
        >
          <div className="floatLeft">
            <img className="height60 margin10 noSideMargin" src={tradeinIcon} alt="Trade In Device" />
          </div>
          <div className="margin78 noSidePad onlyLeftMargin pad15">
            <p className="bold displayInline fontSize_6">
              {tradeInPromoPresent ?
                props.cqContent.label.DT_OD_CHECKOUT_SUMMARY_TRADEIN_APPRAISED_PROMO_VALUE.replace('$AMOUNT$', device.tradeInCredit).replace('$DEVICE$', device.displayName || 'device')
                :
                props.cqContent.label.DT_OD_CHECKOUT_SUMMARY_TRADEIN_APPRAISED_MARKET_VALUE.replace('$AMOUNT$', device.tradeInCredit).replace('$DEVICE$', device.displayName || 'device')
              }
            </p>
          </div>
        </div>
      );
    })}
  </div>
);

TradeInBanner.propTypes = {
  cqContent: PropTypes.object,
  tradeInDetails: PropTypes.object,
};

export default TradeInBanner;
