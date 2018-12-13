import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as CartActions from '../actions';
import CartZipCode from '../components/CartZipCode';

const getAsyncCallData = (state) => {
  const { isFetching, detail } = state.get('asyncCallStatus');

  return { isFetching, detail };
};

const mapStateToProps = (state) => {
  const { isFetching, detail } = getAsyncCallData(state);
  const data = state.toJSON();
  return {
    detail,
    cartData: data.cartData,
    cartMessages: data.cartData.output.cartMessages,
    cq: data.cqContent,
    asyncCallStatus: data.asyncCallStatus,
    isFetching,
  };
};

const mapDispatchToProps = (dispatch) =>
  ({
    dispatch,
    changeZipCode: (zipCode) => dispatch(CartActions.changeZipCode(zipCode)),
    invalidateAsyncFetch: () => dispatch(CartActions.invalidateAsyncFetch()),
  });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartZipCode));
