import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as configuratorActions from '../actions';

import PromoModal from '../../common/PromoModal/PromoModal';

/**
 * Changes devicePromoList node of cart to promoList format as expecte3d
 * TODO:Remove this after confirmation from B.E , promoList to be used throughout the application.
 * @param devicePromoList
 * @returns {Array}
 */
const formatPromoNode = (cartDataItems, ownProps) => {
  const promoList = [];
  if (ownProps.match.params.promo !== 'globalPromo') {
    const devicePromoList = cartDataItems[ownProps.match.params.id] ? cartDataItems[ownProps.match.params.id].devicePromotionList : false; //eslint-disable-line
    const tempObj = {};
    if (ownProps.match.params.promo === 'sbdPromo') {
      if (cartDataItems[ownProps.match.params.id].sbdOffer !== null) {
        tempObj.title = cartDataItems[ownProps.match.params.id].sbdOffer.promoBadgeMessages[0].badgeText;
        tempObj.bodyText = cartDataItems[ownProps.match.params.id].sbdOffer.promoBadgeMessages[0].badgeToolTip;
        promoList.push(tempObj);
        return promoList;
      }
    } else if (devicePromoList) {
      devicePromoList.forEach((item) => {
        tempObj.title = item.promoName;
        tempObj.bodyText = item.promoContentText;

        promoList.push(tempObj);
      });
      return promoList;
    }
  }
  return promoList;
};
const mapStateToProps = (state, ownProps) => {
  const data = state.toJS();
  const { cartData } = data;

  return {
    isGlobalPromo: (ownProps.match.params.promo === 'globalPromo'),
    url: cartData.globalPromotion && cartData.globalPromotion.length > 0 ? cartData.globalPromotion[ownProps.match.params.id].badgeToolTipUrl : false,
    globlPromoTitle: cartData.globalPromotion && cartData.globalPromotion.length > 0 ? cartData.globalPromotion[ownProps.match.params.id].badgeText : false,
    promotions: formatPromoNode(cartData.items, ownProps),
    cqKeys: state.get('cqContent'),
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(configuratorActions, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PromoModal));
