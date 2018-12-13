import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomePage from '../components/index';
import * as actionCreators from '../actions';

function mapStateToProps(state) {
  const data = state.get('data').toJS();
  const cqContent = state.get('cqContent').toJS();
  return {
    cqContent,
    devices: data.devices,
    edgeDownPaymentSubmitted: data.edgeDownPaymentSubmitted,
    title: data.title,
    titleDescription: data.titleDescription,
    cartRedirectUrl: data.cartRedirectUrl,
    checkoutRedirectUrl: data.checkoutRedirectUrl,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
