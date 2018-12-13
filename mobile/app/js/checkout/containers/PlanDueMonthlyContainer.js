import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import DueMonthly from '../components/PlanDueMonthly';

function mapStateToProps(state) {
  // const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();

  return {
    cqContent,
    isFetching: state.get('asyncCallStatus').isFetching,
    plans: state.get('orderDetails').get('plans').get('items'),
    totalDueMonthly: state.get('orderDetails').get('plans').get('planOnlyDueMonthly'),
    dueMonthlyTitle: state.get('orderDetails').toJS().dueMonthlyView.title,
    devices: state.get('orderDetails').get('devices').get('items'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DueMonthly);
