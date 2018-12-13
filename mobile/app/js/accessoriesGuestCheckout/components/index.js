import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import ReviewOrder from '../components/ReviewOrder/';

const Landing = ({ steps, ...props }) => { // eslint-disable-line
  if (!steps.shippingAddress) {
    return <Redirect to="/shippingAddress" />;
  } else if (!steps.deliveryInfo) {
    return <Redirect to="/shippingOptions" />;
  } else if (!steps.billingAddress) {
    return <Redirect to="/billingAddress" />;
  } else if (!steps.paymentInfo) {
    return <Redirect to="/choosePaymentMethod" />;
  }
  if (props.billingInfo.masterpassError) {
    return <Redirect to="/digitalwallet" />;
  }
  return (
    <ReviewOrder {...props} />
  );
};

Landing.propTypes = {
  steps: PropTypes.object,
  billingInfo: PropTypes.object,
};

export default Landing;
