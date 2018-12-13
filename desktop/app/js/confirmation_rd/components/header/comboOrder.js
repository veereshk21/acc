import React from 'react';
import PropTypes from 'prop-types';

const ComboOrder = (props) => (
  <section>
    {(props.comboOrder) ?
      <div>
        {props.subOrders && props.subOrders.length > 0 && props.subOrders.map((order) => (
          <div className="margin10 noSideMargin" key={order.clientReferenceNumber}>
            <h3>
              <span>{props.cqContent.label['DT_OD_CONFIRMATION_DEVICE_' + order.suborderType + '_TEXT']}</span>
              <span className="pad5">{order.clientReferenceNumber}</span>
            </h3>
          </div>
        ))}
      </div>
      :
      <div>
        {props.multiOrderDetails && props.multiOrderDetails.length > 0 && <div>
          {props.multiOrderDetails.map((order) => (
            <div
              className="margin10 noSideMargin"
              key={order.clientOrderRefernceNumber}
            >
              <h3>
                <span>{order.flow === 'EUP' ? props.cqContent.label.DT_OD_CONFIRMATION_DEVICE_UPGRADE_TEXT : props.cqContent.label.DT_OD_CONFIRMATION_DEVICE_ADD_TEXT}</span>
                <span className="pad5">{order.clientOrderRefernceNumber}</span>
              </h3>
            </div>
          ))}
          <p className="margin5 noSideMargin">{props.cqContent.label.DT_OD_CONFIRMATION_DEVICE_PROCESS_TEXT_1}{props.multiOrderDetails.length}{props.cqContent.label.DT_OD_CONFIRMATION_DEVICE_PROCESS_TEXT_2}</p>
        </div>
        }
      </div>
    }
  </section>
);

ComboOrder.propTypes = {
  multiOrderDetails: PropTypes.array,
  subOrders: PropTypes.array,
  comboOrder: PropTypes.bool,
  cqContent: PropTypes.object,
};

export default ComboOrder;
