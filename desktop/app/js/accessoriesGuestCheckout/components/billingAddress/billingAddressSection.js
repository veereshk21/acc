import React from 'react';
import PropTypes from 'prop-types';
import { EDIT_STATE } from '../../constants';
import AsyncComponent from '../../../common/AsyncComponent';

const BillingAddress = AsyncComponent(() => import('../../containers/billingAddress/billingAddress'));
const BillingAddressForm = AsyncComponent(() => import('../../containers/billingAddress/billingAddressForm'));

const BillingAddressSection = (props) => {
  const { cqContent, editState, stepsCompleted } = props;

  return (
    <div id="billingAddressSection">
      <div className="pad24 border_grayThree borderSize_2 noTopBorder noLeftBorder">
        <h2 className="h1 margin24 onlyBottomMargin"> {cqContent.label.DT_OD_CHECKOUT_BILLING_ADDRESS_TITLE} </h2>

        {/* Edit Billing Address */}
        {stepsCompleted.deliveryInfo && editState[EDIT_STATE.BILLING_ADDRESS] &&
          < BillingAddressForm />
        }

        {/* Completed Billing Address */}
        {stepsCompleted.deliveryInfo && !editState[EDIT_STATE.BILLING_ADDRESS] &&
          <BillingAddress />
        }
      </div>
    </div>
  );
};

BillingAddressSection.propTypes = {
  cqContent: PropTypes.object,
  editState: PropTypes.object,
  stepsCompleted: PropTypes.object,
};
export default BillingAddressSection;
