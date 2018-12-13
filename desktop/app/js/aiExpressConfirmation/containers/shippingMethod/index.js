import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShippingMethod from '../../components/shippingMethod/index';
import * as actionCreators from '../../actions';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();

  return {
    cqContent,
    poboMessage: data.shippingInfo.poboMessage,
    selectedShippingType: data.selectedShippingType,
    ispudetailsInfo: data.shippingInfo.ispudetailsInfo,
    contactInfo: data.shippingInfo.contactInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingMethod);
