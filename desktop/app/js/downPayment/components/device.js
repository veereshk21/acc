import React from 'react';
import PropTypes from 'prop-types';

const Device = (props) => {
  const { device } = props;
  return (
    <div className="margin20">
      <img
        src={`${device.imageURL}&$pngalpha$&wid=75&hei=150`}
        alt={device.displayName}
      />
      <div className="displayInlineBlock verticalTop pad20 onlyLeftPad margin42 onlyRightMargin">
        <p
          className="bold fontSize_5"
          dangerouslySetInnerHTML={{ __html: device.displayName }}
        />
        {props.multiLine &&
          <div className="margin18 noSideMargin">
            <p className="bold">
              <span>{props.cqContent.label.DT_OD_DOWNPAYMENT_PRICE_PREFIX}</span><br />
              <span>${device.downPaymentPrice}</span>
            </p>
          </div>
        }

        <div className="margin18 onlyTopMargin">
          <p className="bold ">{props.cqContent.label.DT_OD_DOWNPAYMENT_WAS_PRICE} <span className="textDecLineThrough">${device.strikeThroughPrice}/mo</span></p>
          <p className="bold fontSize_5">${device.price}/mo</p>
          <p
            className="legal margin6 noSideMargin"
            dangerouslySetInnerHTML={{ __html: device.priceDetails }}
          />
        </div>
      </div>
    </div>
  );
};

Device.propTypes = {
  device: PropTypes.object,
  multiLine: PropTypes.bool,
  cqContent: PropTypes.object,
};

export default Device;
