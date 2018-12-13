import React from 'react';
import PropTypes from 'prop-types';
// import { Row, Col } from 'react-flexbox-grid';
import { EDIT_STATE, NOTIFICATIONS } from '../../constants';
import NotificationBar from '../../../common/NotificationBar';
import AsyncComponent from '../../../common/AsyncComponent';

const ShippingMethodEdit = AsyncComponent(() => import('../../containers/shippingMethod/shippingMethodEdit'));
const ShippingMethod = AsyncComponent(() => import('../../containers/shippingMethod/shippingMethod'));

const ShippingMethodSection = (props) => {
  const { cqContent, editState, stepsCompleted } = props;
  return (
    <div id="shippingMethodSection">
      <NotificationBar section={NOTIFICATIONS.SHIPPING_METHOD} />
      <div className="pad24 border_grayThree borderSize_2 noTopBorder noLeftBorder">
        <h2 className="h1 margin24 onlyBottomMargin"> {cqContent.label.DT_OD_CHECKOUT_SHIPPING_METHOD_TITLE} </h2>

        {/* Edit Shipping Method */}
        {stepsCompleted.shippingAddress && editState[EDIT_STATE.SHIPPING_METHOD] &&
          <ShippingMethodEdit />
        }

        {/* Selected Shipping Method */}
        {stepsCompleted.shippingAddress && !editState[EDIT_STATE.SHIPPING_METHOD] &&
          <ShippingMethod />
        }
      </div>
    </div>
  );
};

ShippingMethodSection.propTypes = {
  cqContent: PropTypes.object,
  editState: PropTypes.object,
  stepsCompleted: PropTypes.object,
};
export default ShippingMethodSection;
