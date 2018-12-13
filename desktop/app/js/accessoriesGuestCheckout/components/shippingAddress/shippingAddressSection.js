import React from 'react';
import PropTypes from 'prop-types';
import { EDIT_STATE, NOTIFICATIONS } from '../../constants';
import NotificationBar from '../../../common/NotificationBar';
import AsyncComponent from '../../../common/AsyncComponent';

const ShippingAddress = AsyncComponent(() => import('../../containers/shippingAddress/shippingAddress'));
const ShippingAddressEdit = AsyncComponent(() => import('../../containers/shippingAddress/shippingAddressEdit'));

const ShippingAddressSection = (props) => {
  const { cqContent, editState } = props;
  return (
    <div id="shippingAddressSection">
      <NotificationBar section={NOTIFICATIONS.SHIPPING_ADDRESS} />
      <div className="pad24 border_grayThree borderSize_2 noTopBorder noLeftBorder">
        <h2 className="h1 margin24 onlyBottomMargin"> {cqContent.label.DT_OD_CHECKOUT_SHIPPING_INFORMATION_TITLE} </h2>

        {/* Edit Shipping Address */}
        {editState[EDIT_STATE.SHIPPING_ADDRESS] &&
          < ShippingAddressEdit />
        }

        {/* Completed Shipping Address */}
        {!editState[EDIT_STATE.SHIPPING_ADDRESS] &&
          <ShippingAddress />
        }
      </div>
    </div>
  );
};

ShippingAddressSection.propTypes = {
  cqContent: PropTypes.object,
  editState: PropTypes.object,
};
export default ShippingAddressSection;
