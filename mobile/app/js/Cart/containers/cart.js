/**
 * Created by hmahad on 1/5/2017.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import * as CartActions from '../actions';
import * as NotificationActions from '../../common/NotificationBar/actions';
import CartComponent from '../components';

const mapStateToProps = (state) => {
  const cartData = state.get('cartData');
  const asyncCallStatus = state.get('asyncCallStatus');

  return {
    notification: state.get('notification'),
    isCartEmpty: cartData.get('emptyCartFlag'),
    isAccountMember: cartData.get('accountMember'),
    isFetching: asyncCallStatus.isFetching,
    error: asyncCallStatus.error,
    orderId: cartData.get('orderId'),
    cartMessages: cartData.get('cartMessages'),
    instantCreditRemovedMsg: cartData.get('instantCreditRemovedMsg'),
    cartHeader: cartData.get('mainCartHeader'),
    cartSubText: cartData.get('mainCartSubTitle'),
    cartPrimaryCTA: cartData.get('checkoutBtn'),
    cartItemCount: cartData.get('cartItemCount'),
    shopMoreLink: cartData.get('shopMoreLink'),
    checkoutButtonURL: cartData.get('checkoutButtonURL'),
    shopMoreBtnText: cartData.get('shopMoreBtnText'),
    mainCartFooterText: cartData.get('mainCartFooterText'),
    mainCartFooterLinkText: cartData.get('mainCartFooterLinkText'),
    cartReadyforCheckout: cartData.get('cartValidationDetailsVo') && cartData.get('cartValidationDetailsVo').get('cartReadyforCheckout'),
    CQHtml: state.get('cqContent').get('html'),
    CQLabel: state.get('cqContent').get('label'),
    plans: cartData.get('plans') ? cartData.get('plans').get('items') : null,
    cpc: cartData.get('cpcSucessful'),
    inlinePlansOpted: cartData.get('inlinePlansOpted'),
    emailResponse: state.get('accountEmailFeature') || {},
    mainCartNextDayShippingMessage: cartData.get('mainCartNextDayShippingMessage'),
    isNSOFlow: state.get('cartData').get('items') ? state.get('cartData').get('items').filter((mdn) => mdn.get('flow') === 'NSO').get(0) : false,
    lonelyCartMessage: cartData.get('lonelyCartMessage'),
    lonelyCartSubMessage: typeof cartData.get('lonelyCartSubMessage') !== 'undefined' ? cartData.get('lonelyCartSubMessage') : null,
    c2cFlag: typeof cartData.get('c2cFlag') !== 'undefined' ? cartData.get('c2cFlag') : false,
    authenticated: cartData.get('authenticated'),
    standaloneAccessories: cartData.get('standaloneAccessories'),
    guestCheckoutSignInURL: cartData.get('guestCheckoutSignInURL'),
    accGuestCheckoutEnabled: cartData.get('accGuestCheckoutEnabled') || false,
    globalPromotion: (!!cartData.get('globalPromotion') && cartData.get('globalPromotion').toJS()) || [],
    instantCreditOrder: cartData.get('instantCreditEligible'),
    instantTradeInDevicesCount: state.get('cartData').get('instantTradeInDevicesCount'),
    mmplanEnabled: cartData.get('mmplanEnabled') || false,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, CartActions, NotificationActions), dispatch);

/** Other way to pass actions as props , gives more refined control
   *
   *
   * return {
   *   dispatch,
   *   emptyCart : dispatch(emptyCart())
   * }
   * */


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartComponent));
