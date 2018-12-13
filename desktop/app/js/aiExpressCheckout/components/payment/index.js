import React from 'react';
import PropTypes from 'prop-types';
import NotificationBar from '../../../common/NotificationBar';
import { EDIT_STATE, NOTIFICATIONS } from '../../constants';
import AsyncComponent from '../../../common/AsyncComponent';

const ChoosePaymentMethod = AsyncComponent(() => import('../../containers/payment/choosePaymentMethod'));
const SelectedPaymentMethod = AsyncComponent(() => import('../../containers/payment/selectedPaymentMethod'));

const PaymentSection = (props) => {
  const { editState } = props;
  return (
    <div id="paymentSection">
      <NotificationBar section={NOTIFICATIONS.PAYMENT} />
      <div className="pad24 noBottomPad">
        <hr className="border_black noBottomBorder" />
        {editState[EDIT_STATE.PAYMENT] ?
          <ChoosePaymentMethod />
          :
          <SelectedPaymentMethod />
        }
      </div>
    </div>
  );
};

PaymentSection.propTypes = {
  // cqContent: PropTypes.object,
  editState: PropTypes.object,
};
export default PaymentSection;
