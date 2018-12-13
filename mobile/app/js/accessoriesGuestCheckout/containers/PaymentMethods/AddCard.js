import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fromJS } from 'immutable';
import AddPaymentMethodAgentComm from '../../components/PaymentMethods/AddNewCard/AddPaymentMethodAgent';
import AddNewCard from '../../components/PaymentMethods/AddNewCard/';
import * as actions from '../../actions';
import * as NotificationActions from '../../../common/NotificationBar/actions';

const loadComponent = window.siteId ? AddPaymentMethodAgentComm : AddNewCard;

const mapStateToProps = (state, ownProps) => {
  const data = state.get('orderDetails').toJS();
  const cq = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const cyberSourceData = state.has('cyberSourceData') && state.get('cyberSourceData').toJS();
  return {
    states: data.states,
    cq,
    billingAddress: data.billingInfo && data.billingInfo.billingAddress,
    initialValues: {
      zipcode: (data.billingInfo && data.billingInfo.billingAddress && data.billingInfo.billingAddress.zipcode) || null,
    },
    ...asyncCallStatus,
    ...data,
    giftCardFlow: ownProps.match.params.type === 'giftCard',
    cyberSourceData: cyberSourceData.data ? cyberSourceData.data.output : '',
    cybersourecPreAuthFailure: data.billingInfo.cybersourecPreAuthFailure,
    cybersourecPreAuthFailureErrorMessage: data.billingInfo.cybersourecPreAuthFailureErrorMessage,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, actions, NotificationActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(loadComponent);

