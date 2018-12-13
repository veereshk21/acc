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
const mapStateToProps = (state, ownProps) => {
  const data = state.toJS();
  const { cpcIntercept } = data;

  return {
    isGlobalPromo: (ownProps.match.params.promo === 'globalPromo'),
    url: cpcIntercept.globalPromotions ? cpcIntercept.globalPromotions.promoBadgeMessages[ownProps.match.params.id].badgeToolTipUrl : false,
    globlPromoTitle: cpcIntercept.globalPromotions ? cpcIntercept.globalPromotions.promoBadgeMessages[ownProps.match.params.id].badgeText : false,
    promotions: [],
    cqKeys: state.get('cqContent'),
  };
};
const mapDispatchToProps = (dispatch) => bindActionCreators(configuratorActions, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PromoModal));
