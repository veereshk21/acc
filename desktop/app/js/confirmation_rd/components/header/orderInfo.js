import React from 'react';
import PropTypes from 'prop-types';
import ComboOrder from './comboOrder';

const OrderInfo = ({ orderId, cqContent, multiOrderDetails, subOrders, comboOrder }) => (
  <div className="">
    {(multiOrderDetails || (comboOrder && subOrders)) ?
      <ComboOrder
        cqContent={cqContent}
        multiOrderDetails={multiOrderDetails}
        subOrders={subOrders}
        comboOrder={comboOrder}
      />
      : (
        <div>
          <p className="fontSize_4 margin15 onlyTopMargin">
            {cqContent.label.DT_OD_CONFIRMATION_ORDER_TEXT} <span className="bold">{orderId}</span>
          </p>
        </div>
      )}
  </div>
);

OrderInfo.propTypes = {
  orderId: PropTypes.string.isRequired,
  multiOrderDetails: PropTypes.array,
  comboOrder: PropTypes.bool,
  subOrders: PropTypes.array,
  cqContent: PropTypes.shape({
    label: PropTypes.shape({
      OD_CONFIRMATION_ORDER_TEXT: PropTypes.string,
    }),
  }),
};
export default OrderInfo;
