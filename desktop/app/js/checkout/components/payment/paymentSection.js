import React from 'react';
import PropTypes from 'prop-types';
import NotificationBar from '../../../common/NotificationBar';
import { EDIT_STATE, NOTIFICATIONS } from '../../constants';
import AsyncComponent from '../../../common/AsyncComponent';

const ChoosePaymentMethod = AsyncComponent(() => import('../../containers/payment/choosePaymentMethod'));
const SelectedPaymentMethod = AsyncComponent(() => import('../../containers/payment/selectedPaymentMethod'));

const PaymentSection = (props) => {
  const { cqContent, editState } = props;
  return (
    <div id="paymentSection">
      <NotificationBar section={NOTIFICATIONS.PAYMENT} />
      <div className="pad24 border_grayThree borderSize_2 noTopBorder noLeftBorder">
        <h2 className="h1 margin24 onlyBottomMargin fontSize32">{cqContent.label.DT_OD_CHECKOUT_PAYMENT_TITLE} </h2>
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
  cqContent: PropTypes.object,
  editState: PropTypes.object,
};
export default PaymentSection;
