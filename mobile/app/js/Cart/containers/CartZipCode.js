/**
 * Created by hmahad on 1/10/2017.
 */
import { connect } from 'react-redux';
import { push, goBack } from 'react-router-redux';
import { withRouter } from 'react-router-dom';
import * as CartActions from '../actions';
import CartZipCode from '../components/CartZipcode';

const getAsyncCallData = (state) => {
  const { isFetching, data } = state.get('asyncCallStatus');

  return { isFetching, data };
};

const mapStateToProps = (state) => {
  const { isFetching, data } = getAsyncCallData(state);
  return {
    isFetching,
    data,
    cartMessages: state.get('cartData').get('cartMessages'),
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,
  push,
  goBack,
  changeZipCode: (zipCode) => dispatch(CartActions.changeZipCode(zipCode)),
  asyncFetchClear: () => dispatch(CartActions.asyncFetchClear()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartZipCode));
