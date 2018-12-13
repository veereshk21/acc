import { Grid, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';
import Loader from '../../common/Loader/Loader';

import AsyncComponent from '../../common/AsyncComponent';

const OrderSummary = AsyncComponent(() => import('./OrderSummary'));
const ReviewDetails = AsyncComponent(() => import('./ReviewDetails'));
const ShippingBillingDetails = AsyncComponent(() => import('./ShippingBillingDetails'));

const accessoriesGuestConfirmation = (props) => {
  const {
    cqContent, asyncCallStatus, firstName, orderNumber, addressInfo, selectedShippingType, totalAccessories, dueToday,
    subTotal, tax, shippingPrice, shippingState, lastFour, giftCardAmount, totalDiscount, billingInfo,
  } = props;

  return (
    <Grid fluid id="accessoriesGuestConfirmation">
      {asyncCallStatus.isFetching === true && <Loader />}

      <OrderSummary
        cqContent={cqContent}
        firstName={firstName}
        email={addressInfo.email}
        orderNumber={orderNumber}
        shippingDesc={selectedShippingType.shippingDesc}
      />

      <Row>
        <ReviewDetails
          cqContent={cqContent}
          accessoriesDetails={totalAccessories}
          dueToday={dueToday}
          subTotal={subTotal}
          tax={tax}
          shippingPrice={shippingPrice}
          shippingState={shippingState}
          giftCardAmount={giftCardAmount}
          totalDiscount={totalDiscount}
        />
      </Row>

      <Row>
        <ShippingBillingDetails
          cqContent={cqContent}
          addressInfo={addressInfo}
          selectedShippingType={selectedShippingType}
          lastFour={lastFour}
          billingInfo={billingInfo}
        />
      </Row>
      <Row className="affliates">
        <img src={props.cjmTagUrl} alt="Hidden Affliate" height="1" width="1" style={{ display: 'none' }} />
        <iframe src={props.pepperJamTagUrl} title="pepperJamTagUrl" width="1" height="1" frameBorder="0" style={{ display: 'none' }} />
      </Row>
    </Grid>
  );
};

accessoriesGuestConfirmation.propTypes = {
  cqContent: PropTypes.object,
  asyncCallStatus: PropTypes.object,
  firstName: PropTypes.string,
  orderNumber: PropTypes.string,
  addressInfo: PropTypes.object,
  selectedShippingType: PropTypes.object,
  totalAccessories: PropTypes.array,
  dueToday: PropTypes.string,
  subTotal: PropTypes.string,
  tax: PropTypes.string,
  shippingPrice: PropTypes.number,
  shippingState: PropTypes.string,
  lastFour: PropTypes.string,
  giftCardAmount: PropTypes.string,
  totalDiscount: PropTypes.string,
  cjmTagUrl: PropTypes.string,
  pepperJamTagUrl: PropTypes.string,
  billingInfo: PropTypes.object,
};

export default accessoriesGuestConfirmation;
