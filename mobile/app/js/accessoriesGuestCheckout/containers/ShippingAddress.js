import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ShippingAddress from '../components/ShippingAddress/';
import * as actions from '../actions';
import * as NotificationActions from '../../common/NotificationBar/actions';

const mapStateToProps = (state) => {
  const data = state.get('orderDetails').toJS();
  const cq = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const form = state.get('form').toJS().shippingAddress;
  const shipToType = data.stepsCompleted.shippingAddress ? (data.shippingInfo.addressInfo.businessName !== null ? 'business' : 'residence') : 'residence';
  const addressInfo = data.stepsCompleted.shippingAddress ? data.shippingInfo.addressInfo : {};
  return {
    states: data.states,
    cq,
    formValues: form ? form.values : {},
    shipToType,
    initialValues: {
      ...addressInfo,
    },
    ...asyncCallStatus,
    ...data,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, actions, NotificationActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress);

