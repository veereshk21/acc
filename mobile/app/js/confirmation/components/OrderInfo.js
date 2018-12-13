/**
 * Created by gautam on 2/5/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ComboOrder from './ComboOrder';

/* eslint-disable arrow-body-style */
const OrderInfo = ({
  orderId, cqKeys, multiOrderDetails, locationCode, creditApplicationNumber, isAgentSite
}) => {
  return (
    <div>
      { multiOrderDetails ?
        <ComboOrder cqKeys={cqKeys} multiOrderDetails={multiOrderDetails} />
        :
        <div className="textAlignCenter">
          <div className="fontTextBold  fontSize_2">
            {cqKeys.label.OD_CONFIRMATION_ORDER_TEXT} {orderId}
          </div>
        </div>
      }
      {isAgentSite &&
      <div className="textAlignCenter">
        <div className="fontTextBold  fontSize_2">Location code # {locationCode}</div>
        <div className="fontTextBold  fontSize_2">Credit Application Number # {creditApplicationNumber}</div>
      </div>}
    </div>
  );
};

OrderInfo.defaultProps = {
  cqKeys: {
    label: {
      OD_CONFIRMATION_ORDER_TEXT: 'Order #',
      OD_CONFIRMATION_AAL_ORDER_TEXT: 'Device Added Order#',
      OD_CONFIRMATION_EUP_ORDER_TEXT: 'Device Upgraded Order#',
    },
  },
};

OrderInfo.propTypes = {
  orderId: PropTypes.string.isRequired,
  locationCode: PropTypes.string.isRequired,
  creditApplicationNumber: PropTypes.string.isRequired,
  multiOrderDetails: PropTypes.array,
  cqKeys: PropTypes.shape({
    label: PropTypes.shape({
      OD_CONFIRMATION_ORDER_TEXT: PropTypes.string,
    }),
  }),
  isAgentSite: PropTypes.bool,
};

export default OrderInfo;
