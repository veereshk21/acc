import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as CartActions from '../actions';
import * as NotificationActions from '../../common/NotificationBar/actions';
import DevicePromotionCode from '../components/DevicePromotionCode';

/* const getAsyncCallData = (state) => {
  const { isFetching, detail } = state.get('asyncCallStatus');

  return { isFetching, detail };
}; */

const mapStateToProps = (state) => {
  // const { isFetching, detail } = getAsyncCallData(state);
  const data = state.get('cartData').get('output').toJS();
  return {
    // validPromoCode: detail.hasOwnProperty('validPromo') ? detail.validPromo : true,
    // globalNavData : state.get('globalNavJson').toJS(),
    cartData: data,
    cq: state.get('cqContent').toJS(),
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  checkPromoCode: (promoCode) => dispatch(CartActions.checkPromoCode(promoCode)),
  updatePromoCode: (promoCode) => dispatch(CartActions.updatePromoCode(promoCode)),
  showInfoNotification: (message) => dispatch(NotificationActions.showInfoNotification(message)),
  hideNotification: () => dispatch(NotificationActions.hideNotification()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DevicePromotionCode));
