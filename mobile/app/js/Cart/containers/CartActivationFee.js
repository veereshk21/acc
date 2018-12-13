/**
 * Created by hmahad on 1/12/2017.
 */


import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CartActivationFee from '../components/CartActivationFee';


const getItemsArray = (state) => state.get('cartData').get('items');

function mapStateToProps(state) {
  return {
    isFetching: state.get('asyncCallStatus').isFetching,
    items: getItemsArray(state),
    totalActivationFee: state.get('cartData').get('totalActivationFee'),
    CQLabel: state.get('cqContent').get('label'),

  };
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartActivationFee));
