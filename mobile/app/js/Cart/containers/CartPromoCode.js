/**
 * Created by hmahad on 1/10/2017.
 */
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as CartActions from '../actions';
import * as NotificationActions from '../../common/NotificationBar/actions';
import CartPromoCode from '../components/CartPromoCode';


const getAsyncCallData = (state) => {
  const { isFetching, data } = state.get('asyncCallStatus');

  return { isFetching, data };
};

const mapStateToProps = (state) => {
  const { isFetching, data } = getAsyncCallData(state);
  return {
    isFetching,
    // eslint-disable-next-line no-prototype-builtins
    validPromoCode: data.hasOwnProperty('validPromo') ? data.validPromo : true,
    CQLabel: state.get('cqContent').get('label'),
    CQError: state.get('cqContent').get('error'),
  };
};
const mapDispatchToProps = (dispatch) =>

  // return bindActionCreators(CartActions, dispatch);

  ({
    dispatch,
    checkPromoCode: (promoCode) => dispatch(CartActions.checkPromoCode(promoCode)),
    updatePromoCode: (promoCode) => dispatch(CartActions.updatePromoCode(promoCode)),
    showInfoNotification: (message) => dispatch(NotificationActions.showInfoNotification(message)),
    hideNotification: () => dispatch(NotificationActions.hideNotification()),
  });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartPromoCode));
