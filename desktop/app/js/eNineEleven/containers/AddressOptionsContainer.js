import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import AddressOptionsComponent from '../components/AddressOptionsComponent';

function mapStateToProps(state) {
  const data = state.toJSON();
  return {
    cqContent: data.cqContent,
    pageJSON: (typeof data.addressInfoDetails !== 'undefined' && Object.keys(data.addressInfoDetails).length) ? data.addressInfoDetails.output : data.pageJSON,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressOptionsComponent);
