import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import AddressInfoComponent from '../components/AddressInfoComponent';

function mapStateToProps(state) {
  const data = state.toJSON();
  const asyncCallStatus = state.get('asyncCallStatus');
  const showWarningMessage = state.get('showWarningMessage');
  return {
    cqContent: data.cqContent,
    pageJSON: data.pageJSON,
    initialValues: data.pageJSON.customerBillingAddress,
    ...asyncCallStatus,
    ...showWarningMessage,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddressInfoComponent);
