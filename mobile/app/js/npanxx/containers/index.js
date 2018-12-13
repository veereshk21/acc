import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import NpanxxComponent from '../components';

const mapStateToProps = (state) => {
  const data = state.toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  const initialValues = {
    zipCode: typeof data.npanxxDetails.zipCode !== 'undefined' ? data.npanxxDetails.zipCode : null,
    selectedMtn: data.npanxxDetails.mtns ? data.npanxxDetails.mtns[0] : null,
  };
  return {
    initialValues,
    mtns: data.npanxxDetails.mtns ? data.npanxxDetails.mtns : [],
    orderId: typeof data.npanxxDetails.orderId !== 'undefined' ? data.npanxxDetails.orderId : null,
    commerceItemId: typeof data.npanxxDetails.commerceItemId !== 'undefined' ? data.npanxxDetails.commerceItemId : null,
    ajaxCallUrl: typeof data.npanxxDetails.ajaxCallUrl !== 'undefined' ? data.npanxxDetails.ajaxCallUrl : null,
    submitUrl: typeof data.npanxxDetails.submitUrl !== 'undefined' ? data.npanxxDetails.submitUrl : '/od/cust/auth/checkout/updateNPANXXNumber',
    cqContent: data.cqContent,
    ...asyncCallStatus,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NpanxxComponent);
