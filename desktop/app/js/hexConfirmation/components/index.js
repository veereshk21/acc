import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import AsyncComponent from '../../common/AsyncComponent';

const PageBanner = AsyncComponent(() => import('../containers/pageBanner'));
const InfoGrid = AsyncComponent(() => import('../containers/infoGrid'));
const OrderInfo = AsyncComponent(() => import('../containers/orderInfo'));

/* eslint-disable react/prefer-stateless-function */
class Confirmation extends Component {
  render() {
    return (
      <div className="margin20 onlySideMargin confirmation">
        <PageBanner />
        <InfoGrid />
        <OrderInfo />
        <h2 className="fontSize_10 margin36 pad20 onlyBottomMargin">Order Summary</h2>
      </div>
    );
  }
}

export default Confirmation;
