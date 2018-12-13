import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as configuratorActions from '../actions';

import PromoModal from '../../common/PromoModal/PromoModal';

const formatPromoNode = (checkoutDataItems) => {
  const devicePromoList = checkoutDataItems[location.hash.split('=')[1]] ? checkoutDataItems[location.hash.split('=')[1]].devicePromotionList : false; //eslint-disable-line
  const promoList = [];

  if (!devicePromoList) {
    return promoList;
  }


  devicePromoList.forEach((item) => {
    const tempObj = {};
    tempObj.title = item.PromoName;
    tempObj.bodyText = item.promoContentText;

    promoList.push(tempObj);
  });

  return promoList;
};

const mapStateToProps = (state) => {
  const data = state.get('orderDetails').toJS();
  const selectedDevice = data.devices.items[location.hash.split('=')[1]]; // eslint-disable-line
  const cqContent = state.get('cqContent').toJS();
  return {
    promotions: formatPromoNode(data.devices.items),
    cqKeys: cqContent,
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(configuratorActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PromoModal);
