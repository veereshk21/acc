
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { redirectToMainPage } from '../../common/Helpers';
import * as actions from '../actions';
import PromoOffer from '../components/PromoOffer';

const mapStateToProps = (state, ownProps) => {
  const data = state.get('promoDetails') === null ? redirectToMainPage(ownProps) : state.get('promoDetails').toJS();
  const multiPromo = data.promoType === 'MULTI';
  const cqContent = state.get('cqContent').toJS();
  const eligibleModalDetails = state.get('eligibleModalDetails');

  return {
    data,
    multiPromo,
    cqContent,
    eligibleModalDetails,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PromoOffer);
