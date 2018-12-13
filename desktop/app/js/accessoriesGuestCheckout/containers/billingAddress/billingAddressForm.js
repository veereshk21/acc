import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BillingAddressForm from '../../components/billingAddress/billingAddressForm';
import * as actionCreators from '../../actions';
import * as NotificationActions from '../../../common/NotificationBar/actions';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const forms = state.get('form').toJS();
  const { billingInfo } = data;
  const initSameAsShipping = !!(billingInfo.billingAddress && billingInfo.billingAddress.sameAsShipping) || !data.stepsCompleted.billingAddress;
  const initialValues = billingInfo.billingAddress && billingInfo.billingAddress.sameAsShipping ? data.shippingInfo.addressInfo : billingInfo.billingAddress;
  const formValues = forms.billingAddress && forms.billingAddress.values ? forms.billingAddress.values : {};
  return {
    cqContent,
    states: data.states,
    asyncCallStatus,
    sameAsShipping: !!formValues.sameAsShipping,
    initialValues: { ...initialValues, sameAsShipping: initSameAsShipping },
    formValues,
    billingAddress: data.billingInfo.billingAddress,
    stepsCompleted: data.stepsCompleted,
    shippingAddress: data.shippingInfo.addressInfo,
    googleMapAPI: data.googleMapAPI,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingAddressForm);
