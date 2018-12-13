import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditServiceAddress from '../../components/serviceAddress/editServiceAddress';
import * as actionCreators from '../../actions';

import * as NotificationActions from '../../../common/NotificationBar/actions';
import { capitalize } from '../../../common/Helpers/index';

function mapStateToProps(state, props) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const forms = state.get('form').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const getFormValue = (field) => (forms.serviceAddress && forms.serviceAddress.values ? forms.serviceAddress.values[field] : null);
  const addressInfo = data.shippingInfo.addressInfo;
  const { serviceAddress } = props.device;
  return {
    cqContent,
    ...asyncCallStatus,
    states: data.states,
    sameAsShippingAddress: getFormValue('sameAsShippingAddress'),
    getFormValue,
    initialValues: {
      address1ServAddress: capitalize(serviceAddress.address1),
      address2ServAddress: capitalize(serviceAddress.address2),
      cityServAddress: capitalize(serviceAddress.city),
      firstNameServAddress: capitalize(serviceAddress.firstName),
      lastNameServAddress: capitalize(serviceAddress.lastName),
      phoneNumberServAddress: capitalize(serviceAddress.phoneNumber),
      sameAsShippingAddress: !!props.device.sameAsShippingAddress,
      stateServAddress: capitalize(serviceAddress.state),
      zipcodeServAddress: capitalize(serviceAddress.zipCode),
    },
    addressInfo,
    setEditState: props.setEditState,
    required: props.device.serviceAddressChangeRequired, // TODO: this flag or similar to shipping is needed per device.
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditServiceAddress);
