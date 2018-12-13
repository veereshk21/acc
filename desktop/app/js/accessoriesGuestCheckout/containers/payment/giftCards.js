/**
 * Created by mambig on 2/16/2017.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GiftCards from '../../components/payment/giftCards';
import * as actionCreators from '../../actions';
import * as notificationActions from '../../../common/NotificationBar/actions';

const getInitialValues = (giftCardsArray) => {
  let initialValues = {};
  if (giftCardsArray.length > 0) {
    giftCardsArray.map((giftcard, index) => {
      initialValues = {
        ...initialValues,
        [`giftCardNumber_${index + 1}`]: giftcard.giftCardNumber,
        [`balance_${index + 1}`]: giftcard.balance && parseFloat(giftcard.balance).toFixed(2),
        [`amountToApply_${index + 1}`]: giftcard.amountToApply && parseFloat(giftcard.amountToApply).toFixed(2),
        [`giftCardPin_${index + 1}`]: giftcard.giftCardPin,
        [`isEncrypted_${index + 1}`]: giftcard.isEncrypted,
        [`lastDigits_${index + 1}`]: giftcard.lastDigits,
        [`giftCardCheckbox_${index + 1}`]: !!giftcard.amountToApply,
      };
      return initialValues;
    });
  }
  return initialValues;
};

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const forms = state.get('form').toJS();

  const asyncCallStatus = state.get('asyncCallStatus');
  const cqContent = state.get('cqContent').toJS();
  const { giftCardList } = data.billingInfo;
  const initialListLength = giftCardList.length;

  if (initialListLength < data.giftCardsLimit) {
    for (let i = 0; (data.giftCardsLimit - initialListLength) > i; i++) {
      giftCardList.push({
        giftCardNumber: null,
        balance: null,
        amountToApply: null,
        giftCardPin: null,
        isEncrypted: false,
        lastDigits: null,
      });
    }
  }

  return {
    cqContent,
    initialValues: getInitialValues(giftCardList),
    giftCards: giftCardList,
    dueToday: data.dueToday,
    giftCardsEnabled: data.giftCardsEnabled,
    giftCardsLimit: data.giftCardsLimit,
    giftCardsUsed: data.giftCardsUsed,
    giftCardBalanceFetched: asyncCallStatus && asyncCallStatus.data && asyncCallStatus.data.giftCardBalanceFetched,
    giftCardsRemoved: asyncCallStatus && asyncCallStatus.data && asyncCallStatus.data.giftCardsRemoved && asyncCallStatus.data.giftCardsRemoved.length > 0 ? asyncCallStatus.data.giftCardsRemoved : [],
    asyncCallStatus,
    isFetching: asyncCallStatus && asyncCallStatus.isFetching,
    formErrors: (forms && forms.giftCardsForm && forms.giftCardsForm.syncErrors) ? forms.giftCardsForm.syncErrors : {},
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...notificationActions, ...actionCreators }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftCards);
