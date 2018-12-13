import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SelectedPaymentMethod from '../../components/payment/selectedPaymentMethod';
import * as actionCreators from '../../actions';

import * as NotificationActions from '../../../common/NotificationBar/actions';

const getSelectedCard = (selectedPaymentMode, savedCardsList, newCard) => {
  let selectedCard = null;
  if (selectedPaymentMode === 'newcard') {
    selectedCard = newCard;
  } else if (selectedPaymentMode === 'savedcard') {
    selectedCard = savedCardsList.find((card) => (card.preselectCard === true));
  }
  return selectedCard;
};

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const cqContent = state.get('cqContent').toJS();
  const asyncCallStatus = state.get('asyncCallStatus');
  if (!data.devices) {
    window.location.href = '/#genericError';
    return {};
  }
  const selectedPaymentMode = data.billingInfo.selectedPaymentMode.toString().toLowerCase();

  return {
    cqContent,
    ...asyncCallStatus,
    billingAddress: data.billingInfo.billingAddress,
    selectedPaymentMode,
    selectedCard: getSelectedCard(selectedPaymentMode, data.billingInfo.savedCardInfo, data.billingInfo.creditCardInfo),
    billingInfo: data.billingInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actionCreators, ...NotificationActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedPaymentMethod);
