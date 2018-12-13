import { connect } from 'react-redux';
import Header from '../../components/header/header';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const selectedShippingType = state.get('selectedShippingType') && state.get('selectedShippingType').toJS();
  const ispuSelected = selectedShippingType && selectedShippingType.type && selectedShippingType.type.toLowerCase() === 'ispu';

  return {
    cqContent: state.get('cqContent') && state.get('cqContent').toJS(),
    billingInfo: state.get('billingInfo') && state.get('billingInfo').toJS(),
    devices: state.get('devices') && state.get('devices').toJS(),
    ...data,
    ispuSelected,
  };
}

export default connect(mapStateToProps)(Header);
