

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as CartActions from '../actions';
import * as NotificationActions from '../../common/NotificationBar/actions';
import CartPlanDetails from '../components/CartPlanDetails';

function mapStateToProps(state) {
  const cartData = state.get('cartData');
  return {
    CQLabel: state.get('cqContent').get('label'),
    cpcSuccessful: cartData.get('cpcSucessful'),
    plans: cartData.get('plans').toJS(),
    lineLevelOpted: cartData.get('isHLLPlanInOrder') || false,
  };
}

const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign({}, CartActions, NotificationActions), dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartPlanDetails));
