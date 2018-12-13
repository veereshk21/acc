/**
 * Created by hmahad on 1/12/2017.
 */


import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CartPlanDueMonthly from '../components/CartPlanDueMonthly';

const getPlansArray = (state) => state.get('cartData').get('plans').get('items');

function mapStateToProps(state) {
  return {
    isFetching: state.get('asyncCallStatus').isFetching,
    plans: getPlansArray(state),
    planOnlyDueMonthly: state.get('cartData').get('plans').get('planOnlyDueMonthly'),
    CQLabel: state.get('cqContent').get('label'),
    devices: state.get('cartData').get('items'),
    itemOnJaxPlan: state.get('cartData').get('itemOnJaxPlan'),
  };
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartPlanDueMonthly));
