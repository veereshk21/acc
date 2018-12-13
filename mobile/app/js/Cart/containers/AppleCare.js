import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AppleCare from '../components/AppleCare';

const getPlansArray = (state) => state.get('cartData').get('plans').get('items');

function mapStateToProps(state) {
  // console.log(state.get('cartData').get('plans').get('planOnlyDueMonthly'));
  return {
    isFetching: state.get('asyncCallStatus').isFetching,
    plans: getPlansArray(state),
    appleCare: state.get('cartData').get('appleCare'),
    CQLabel: state.get('cqContent').get('label'),
    CQHtml: state.get('cqContent').get('html'),
  };
}
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppleCare));
