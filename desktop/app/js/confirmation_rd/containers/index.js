import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Confirmation from './../components';
import * as actions from './../actions';

const mapStateToProps = (state) => {
  const data = state.get('orderDetails').toJS();
  const plans = state.get('plans');
  return {
    cqContent: state.get('cqContent').toJS(),
    devices: state.get('devices').toJS(),
    selectedShippingType: state.get('selectedShippingType') ? state.get('selectedShippingType').toJS() : null,
    billingInfo: state.get('billingInfo').toJS(),
    recommendedAccessories: state.get('recommendedAccessories'),
    plans: plans ? plans.toJS() : null,
    isHLLPlanInOrder: data.isHLLPlanInOrder,
    itemOnJaxPlan: data.itemOnJaxPlan || false,
    cpcOrder: data.cpcOrder,
    ...data,
  };
};

const mapDispatchToProps = (dispatch) => (bindActionCreators(actions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
