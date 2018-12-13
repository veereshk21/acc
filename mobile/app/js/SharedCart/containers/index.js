import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { asyncFetch, clearCart } from '../actions';
import SharedCart from '../components';

/* eslint-disable arrow-body-style */
const mapStateToProps = (state) => {
  const data = state.toJS().sharedCartData;
  return {
    items: data.output.items,
    title: data.output.title,
    subTitle: data.output.subTitle,
    cartLink: data.output.cartLink,
    clearCartLink: data.output.clearCartLink,
    cqContent: state.toJS().cqContent,
    isFetching: state.toJS().asyncCallStatus.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ asyncFetch, clearCart }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SharedCart);
