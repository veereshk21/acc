import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Confirmation from './../components';
import * as actions from './../actions';

const mapStateToProps = (state) => {
  const data = state.get('orderDetails').toJS();
  return {
    cqContent: state.get('cqContent').toJS(),
    devices: state.get('devices').toJS(),
    selectedShippingType: state.get('selectedShippingType').toJS(),
    billingInfo: state.get('billingInfo').toJS(),
    ...data,
  };
};

const dispatchToProps = (dispatch) => (bindActionCreators(actions, dispatch));

export default connect(mapStateToProps, dispatchToProps)(Confirmation);
