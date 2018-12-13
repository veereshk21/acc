export const API_SUCCESS_CODE = '00';
export const PAYMENT_COUNTRY_CODE = 'US';
export const PAYMENT_COUNTRY_CURRENCY_CODE = 'USD';
export const VZW_SUPPORTED_PAYMENT_NETWORKS = ['amex', 'discover', 'masterCard', 'visa', 'jcb'];
export const VZW_SUPPORTED_PAYMENT_NETWORK_CAPABILITIES = ['supports3DS'];

// TODO: Remove these AJAX URLs and get from JSON
export const GET_APPLE_SESSION_URL = '/od/cust/auth/apple/getApplePaySession';
export const PROCESS_PAYMENT_URL = '/od/cust/auth/apple/processApplePayment';
