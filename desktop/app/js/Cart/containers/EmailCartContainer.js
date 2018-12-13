/**
 * Created by hmahad on 1/10/2017.
 */
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import { withRouter } from 'react-router';
import * as CartActions from '../actions';
import EmailCartModal from '../components/EmailCartModal';

const getAsyncCallData = (state) => {
  const { isFetching, data } = state.get('asyncCallStatus');

  return { isFetching, data };
};

const mapStateToProps = (state) => {
  const { isFetching, data } = getAsyncCallData(state);
  return {
    isFetching,
    data,
    cqHtml: state.get('cqContent').get('html'),
    cqLabel: state.get('cqContent').get('label'),
    cqMessages: state.get('cqContent').get('messages'),
    cartMessages: state.get('cartData').get('cartMessages'),
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  push,
  goBack,
  emailCart: () => dispatch(CartActions.sendEmailCart()),
  invalidateAsyncFetch: () => dispatch(CartActions.invalidateAsyncFetch()),
});

  /** Other way to pass actions as props
   *
   *
   * return {
   *   dispatch,
   *   emptyCart : dispatch(emptyCart())
   * }
   * */


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmailCartModal));
