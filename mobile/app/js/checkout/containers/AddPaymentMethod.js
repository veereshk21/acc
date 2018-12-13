import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddPaymentMethodAgentComm from '../components/AddPaymentMethod';
import AddPaymentMethod from '../components/PaymentMethods/addNewCards';
import * as actionCreators from '../actions';
import qs from 'qs';

const loadComponent = window.siteId ? AddPaymentMethodAgentComm : AddPaymentMethod;
const getSelectedShippingInfo = (data) => {
  const shippingOptionDetails = data.shippingInfo.shippingTypesInfo[0];
  const isBusinessAddress = (data.shippingInfo.addressInfo.businessName !== null);
  const {
    firstName, lastName, companyName, address1, address2, city, state, zipcode, businessName, postalCode, email, phoneNumber,
  } = data.shippingInfo.addressInfo;
  const finalJSON = {
    flow: data.flow,
    shippingType: shippingOptionDetails.shippingOptionId,
    shippingAddressType: 'shipToMe',
    firstName,
    lastName,
    companyName,
    address1,
    address2,
    city,
    state,
    zipcode,
    businessName,
    postalCode,
    emailAddress: email,
    phoneNumber,
    businessAddress: isBusinessAddress,
    showUpdatedAddress: true,
    standaloneAccessories: false,
  };

  delete finalJSON.email;

  for (const key in finalJSON) {
    if (finalJSON[key] === null) {
      delete finalJSON[key];
    }
  }

  return finalJSON;
};

function mapStateToProps(state, ownProps) {
  const orderDetails = state.get('orderDetails').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const cqContent = state.get('cqContent').toJS();
  const cyberSourceData = Object.keys(state.get('cyberSourceData')).length ? state.get('cyberSourceData').toJS() : {};
  const queryQstring = qs.parse(ownProps.location.search);
  const queryFromUrl = queryQstring['?query'] || queryQstring.query;
  const preselectedCard = orderDetails.billingInfo.savedCardInfo[queryFromUrl - 1];
  const initialValues = {
    card_zip: orderDetails.billingInfo.billingAddress.zipcode,
  };
  return {
    orderId: orderDetails.orderId,
    preselectedCard,
    cyberSourceData: cyberSourceData.data ? cyberSourceData.data.output : '',
    paymentRequired: orderDetails.checkoutStates.paymentRequired,
    pastDueAmount: orderDetails.pastDueAmount,
    cybersourecPreAuthFailure: orderDetails.billingInfo.cybersourecPreAuthFailure,
    cybersourecPreAuthFailureErrorMessage: orderDetails.billingInfo.cybersourecPreAuthFailureErrorMessage,
    pastDuePaymentRequired: orderDetails.checkoutStates.pastDuePaymentRequired,
    expirationMonths: orderDetails.billingInfo.expirationMonths,
    expirationYears: orderDetails.billingInfo.expirationYears,
    zipcode: orderDetails.billingInfo.billingAddress.zipcode,
    ispuBTAPaymentUpdated: orderDetails.ispuBTAPaymentUpdated,
    selectedShippingInfo: getSelectedShippingInfo(orderDetails),
    pieEnabled: orderDetails.pieEnabled || false,
    authInfo: orderDetails.authInfo,
    cqContent,
    ...asyncCallStatus,
    paymentFlow: ownProps.match.params.type,
    giftCardFlow: ownProps.match.params.type === 'giftCard' || ownProps.match.params.type === 'newGiftCard',
    initialValues,
    creditCardZipEditable: orderDetails.checkoutStates.creditCardZipEditable,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(loadComponent);
