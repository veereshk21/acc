/**
 * Created by hmahad on 1/12/2017.
 */


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as CartActions from '../actions';
import * as NotificationActions from '../../common/NotificationBar/actions';
import CartDeviceDetails from '../components/CartDeviceDetails';

const getAccArray = (state) => state.get('cartData').get('accessories');

const mapPromoDetails = (cartData) => {
  const items = [];
  cartData.items && cartData.items.map((item) => { // eslint-disable-line
    const device = item;
    device.promoDetails = cartData.tradeInPromoDetails && cartData.tradeInPromoDetails.tradeInDevices && cartData.tradeInPromoDetails.tradeInDevices.filter((promo) => promo.promoInfo && promo.dppAppliedCommerceItemId === item.commerceItemId)[0] ?
      cartData.tradeInPromoDetails.tradeInDevices.filter((promo) => promo.promoInfo && promo.dppAppliedCommerceItemId === item.commerceItemId)[0].promoInfo : null;
    items.push(device);
  });
  return items;
};

function mapStateToProps(state) {
  const cartData = state.get('cartData');
  const items = mapPromoDetails(state.get('cartData').toJS());

  return {
    items,
    accessories: getAccArray(state),
    accessoriesBundle: cartData.get('accessoriesBundle') ? cartData.get('accessoriesBundle').toJS() : '',
    editBtn: cartData.get('editBtn'),
    removeLinkText: cartData.get('removeLinkText'),
    notification: state.get('notification'),
    CQLabel: state.get('cqContent').get('label'),
    CQError: state.get('cqContent').get('error'),
    showPreOrderMsg: cartData.get('isPOBODeviceInCart'),
    cpcSuccessful: cartData.get('cpcSucessful'),
    inlinePlansOpted: cartData.get('inlinePlansOpted'),
    isSavedCart: cartData.get('itemsFromRetrievedCart'),
    cartMessages: cartData.get('cartMessages') ? cartData.get('cartMessages').get('message') : null,
    plans: cartData.get('plans') ? cartData.get('plans').toJS() : null,
    cartReadyforCheckout: cartData.get('cartMessages') ? cartData.get('cartMessages').get('cartReadyforCheckout') : true,
    cpc: cartData.get('cpcSucessful'),
    tmpMdOpted: cartData.get('tmpMdOpted'),
    isTmpMDEnabled: cartData.get('isTmpMDEnabled'),
    standaloneAccessories: cartData.get('standaloneAccessories'),
    lineLevelOpted: cartData.get('isHLLPlanInOrder'),
    cartItemCount: cartData.get('cartItemCount'),
    instantTradeInDevicesCount: cartData.get('instantTradeInDevicesCount'),
    showHeadsUpMsg: cartData.get('showHeadsUpMsg'),
    isAgentSite: window.isAgentSite,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, CartActions, NotificationActions), dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDeviceDetails));
