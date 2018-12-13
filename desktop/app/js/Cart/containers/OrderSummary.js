import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

import OrderSummary from './../components/OrderSummary';

const mapStateToProps = (state) => {
  // const asyncCallStatus = state.get('asyncCallStatus');
  const data = state.toJSON();
  return {
    cartData: data.cartData,
    cq: data.cqContent,
    cartReadyforCheckout: data.cartData.cartValidationDetailsVo && data.cartData.cartValidationDetailsVo.cartReadyforCheckout,
    emailResponse: data.accountEmailFeature || {},
    accountMember: data.cartData.output.accountMember,
    standaloneAccessories: data.cartData.output.standaloneAccessories,
    shopMoreLink: data.cartData.output.shopMoreLink,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderSummary));
