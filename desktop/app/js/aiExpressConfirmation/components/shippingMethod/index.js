import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import ToolTip from '../../../common/ToolTip';

const ShippingMethod = (props) => {
  const { selectedShippingType, ispudetailsInfo, contactInfo } = props;
  const ispuTooltip = "Check device availability, order online and pick up for free in-store. We'll email you when your order's ready and then hold it at the store for 3 days. To pick up you'll need a valid government-issued photo ID and your credit or debit card, only if that's what you used to pay.";
  const ispuOrder = selectedShippingType.type === 'ISPU';
  return (
    <div id="shippingMethodSection" className="pad24 onlyBottomPad">
      {!ispuOrder &&
        <div>
          <h3 className="displayInlineBlock fontSize_5">{selectedShippingType.shippingTypeName}</h3>

          <ToolTip
            className="margin3 onlyLeftMargin displayInlineBlock"
            ariaLabel={`${selectedShippingType.shippingTypeName} tooltip`}
            text={selectedShippingType.description}
            noRenderHTML
          />
          <p className="color_gray_six">Estimated delivery date {selectedShippingType.estimatedDeliveryDateText}</p>

        </div>
      }
      {ispuOrder && ispudetailsInfo && ispudetailsInfo.storeAddress &&
        <Row>

          <Col xs={6}>
            <div>
              <h3 className="displayInlineBlock fontSize_5">Free in-store pickup</h3>

              <ToolTip
                className="margin3 onlyLeftMargin displayInlineBlock"
                ariaLabel={`${selectedShippingType.shippingTypeName} tooltip`}
                text={ispuTooltip}
                noRenderHTML
              />
            </div>
            <p>We'll send you an email when your order is ready. Remember to bring a government-issued photo ID and the purchasing credit card.</p>
          </Col>
          <Col xs={6}>
            <div style={{ wordWrap: 'break-word' }}>
              <h3 className="fontSize_5">Contact information</h3>
              <p>{contactInfo.phoneNumber}</p>
              <p>{contactInfo.emailAddress}</p>
            </div>
          </Col>
        </Row>
      }
    </div>
  );
};

ShippingMethod.propTypes = {
  // cqContent: PropTypes.object,
  selectedShippingType: PropTypes.object,
  ispudetailsInfo: PropTypes.object,
  contactInfo: PropTypes.object,
};
export default ShippingMethod;
