export const RESET_STATE = 'RESET_STATE';
export const ASYNC_FETCH = 'ASYNC_FETCH';
export const ASYNC_FETCH_SUCCESS = 'ASYNC_FETCH_SUCCESS';
export const ASYNC_FETCH_FAILURE = 'ASYNC_FETCH_FAILURE';
export const ASYNC_FETCH_INVALIDATE = 'ASYNC_FETCH_INVALIDATE';
export const CHOOSE_PAYMENT_METHOD = 'CHOOSE_PAYMENT_METHOD';
export const API_SUCCESS_CODE = '00';
export const API_FAILURE_CODE = '01';

export const BILL_TO_ACCOUNT = 'BTA';
export const APPLE_PAY = 'APPLE_PAY';


// TODO: Remove this AJAX URL and get from JSON
export const PAYPAL_CMPI_LOOKUP_URL = '/od/cust/auth/checkout/paypal/cmpilookup?triggerFrom=PAYMENT';

// Section Edit States
export const UPDATE_EDIT_STATE = 'UPDATE_EDIT_STATE';
export const SHIPPING = 'shipping';
export const PAYMENT = 'payment';
export const EDIT_STATE = {
  SHIPPING_ADDRESS: 'shipping-address',
  SHIPPING_METHOD: 'shipping-method',
  BILLING_ADDRESS: 'billing-address',
  PAYMENT: 'payment',
};

export const NOTIFICATIONS = {
  HEADER: 'page-header',
  SHIPPING_ADDRESS: 'shipping-address-section',
  SHIPPING_METHOD: 'shipping-method-section',
  BILLING_ADDRESS: 'billing-address-section',
  PAYMENT: 'payment-section',
  SUMMARY: 'summary-section',
};

export const CYBER_SOURCE_DATA = 'CYBER_SOURCE_DATA';
