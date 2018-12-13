import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BillingAddress from '../components/BillingAddress/';
import * as actions from '../actions';
import * as NotificationActions from '../../common/NotificationBar/actions';

const mapStateToProps = (state) => {
  const data = state.get('orderDetails').toJS();
  const cq = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const billingAddressUpdated = data.stepsCompleted.billingAddress;
  const { sameAsShipping } = state.get('billingState');
  return {
    states: data.states,
    cq,
    shippingAddress: data.shippingInfo.addressInfo,
    addressInfo: billingAddressUpdated ? data.billingInfo.billingAddress : data.shippingInfo.addressInfo,
    sameAsShipping,

    initialValues: sameAsShipping ? data.shippingInfo.addressInfo : {
      firstName: null,
      lastName: null,
      companyName: null,
      address1: null,
      address2: null,
      city: null,
      state: null,
      zipcode: null,
      businessName: null,
      postalCode: null,
      email: null,
      phoneNumber: null,
    },
    ...asyncCallStatus,
    ...data,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, actions, NotificationActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BillingAddress);

