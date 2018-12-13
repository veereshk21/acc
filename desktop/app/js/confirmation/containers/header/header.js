import { connect } from 'react-redux';
import Header from '../../components/header/header';

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  return {
    cqContent: state.get('cqContent').toJS(),
    billingInfo: state.get('billingInfo').toJS(),
    devices: state.get('devices').toJS(),
    ...data,
  };
}

export default connect(mapStateToProps)(Header);
