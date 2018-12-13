import React from 'react';
import PropTypes from 'prop-types';

const ComboOrder = (props) => { // eslint-disable-line
  return (
    <div>
      {
        props.multiOrderDetails.map((order) => {
          const orderMessage = props.cqKeys.label['OD_CONFIRMATION_' + order.flow + '_ORDER_TEXT'];
          return (
            <div className="fontTextBold textAlignCenter fontSize_2" key={order.clientOrderRefernceNumber}>
              {orderMessage} {order.clientOrderRefernceNumber}
              {order.flow === 'EUP' &&
                <div>
                  <input type="hidden" id="COMBO_ORDER_TYPE" name="COMBO_ORDER_TYPE" value={order.flow} />
                  <input type="hidden" id="COMBO_ORDER_ID" name="COMBO_ORDER_ID" value={order.clientOrderRefernceNumber} />
                </div>
              }
            </div>
          );
        })
      }
    </div>
  );
};

ComboOrder.propTypes = {
  multiOrderDetails: PropTypes.array,
  cqKeys: PropTypes.object,
};

export default ComboOrder;
