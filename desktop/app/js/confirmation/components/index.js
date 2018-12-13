import React from 'react';
import PropTypes from 'prop-types';

import AsyncComponent from '../../common/AsyncComponent';

/* Page Components */
import OrderSummary from './orderSummary/orderSummary';
import SaveContent from './saveContent/saveContent';

/* Page Containers */
import Header from '../containers/header/header';

const InfoGrid = AsyncComponent(() => import('../containers/infoGrid/infoGrid'));

const Confirmation = (props) => {
  const {
    cqContent, transformedTradeInPromoDetails,
  } = props;

  return (
    <div>
      <div className="margin20 onlySideMargin">
        <Header />
        {!props.standaloneAccessories &&
          <SaveContent cqContent={cqContent} />
        }
        <InfoGrid />
        <OrderSummary {...props} />

        {(transformedTradeInPromoDetails && transformedTradeInPromoDetails.tradeInDevices && transformedTradeInPromoDetails.tradeInDevices.length > 0) &&
          <div className="textAlignLeft margin10 noSideMargin color_666">
            <p
              className="margin24 noSideMargin"
              dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CONFIRMATION_TRADE_IN_TERMS_TEXT }}
            />
          </div>
        }
        <div className="textAlignLeft margin10 noSideMargin color_666">
          <p className="bold">{cqContent.label.DT_OD_CONFIRMATION_CONNECTICUT_CUSTOMER}</p>
          <p className="">{cqContent.label.DT_OD_CONFIRMATION_CONNECTICUT_CUSTOMER_DETAILS}</p>
        </div>

        <div className="affliates">
          <img src={props.cjmTagUrl} alt="Hidden Affliate" height="1" width="1" style={{ display: 'none' }} />
          <iframe src={props.pepperJamTagUrl} title="pepperJamTagUrl" width="1" height="1" frameBorder="0" style={{ display: 'none' }} />
        </div>
      </div>

    </div>
  );
};

Confirmation.propTypes = {
  cqContent: PropTypes.object,
  standaloneAccessories: PropTypes.bool,
  cjmTagUrl: PropTypes.string,
  pepperJamTagUrl: PropTypes.string,
  // devices: PropTypes.object,
  // accessories: PropTypes.array,
  // billingInfo: PropTypes.object,
  transformedTradeInPromoDetails: PropTypes.object,
  // selectedShippingType: PropTypes.object,
};

export default Confirmation;
