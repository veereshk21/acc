import React from 'react';
import PropTypes from 'prop-types';
import EditButton from '../../../common/EditButton/index';

const StoreDetails = (props) => {
  const { cqContent } = props;
  const { storeAddress, storeHours } = props.ispudetailsInfo;
  const storeHoursArray = [];
  if (storeHours) {
    for (const x in storeHours) {
      storeHoursArray.push(`${x}: ${storeHours[x]}`);
    }
  }
  return (
    <div>
      {/* Title */}
      <div className="margin18 onlyBottomMargin">
        <div className="margin12 onlyBottomMargin">
          <h3 className="fontSize_5 displayInlineBlock verticalBottom margin10 onlyRightMargin">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ISPU_DETAILS_NOTIFICATON_TITLE}</h3>
          <EditButton
            analyticstrack="shipping-storeDetails-ispu-CTA"
            onClick={props.showIspuModal}
            className="margin3 onlyLeftMargin"
          >
            Change
          </EditButton>
        </div>
        <p className="margin12 noSideMargin">
          {cqContent.label.DT_OD_CHECKOUT_SHIPPING_ISPU_DETAILS_NOTIFICATON_DESCRIPTION}
        </p>
      </div>
      <div className="margin18 noSideMargin">
        <h3 className="fontSize_5 margin12 onlyBottomMargin">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ISPU_DETAILS_STORE_ADDRESS_TITLE}</h3>
        <p>{props.ispudetailsInfo.storeName}</p>
        <p>{storeAddress.address1},</p>
        {storeAddress.address2 &&
          <p>{storeAddress.address2},</p>
        }
        <p>{storeAddress.state}, {storeAddress.city}, {storeAddress.zipcode}</p>
        <p>{storeAddress.phoneNumber}</p>
      </div>
      <div className="margin18 noSideMargin">
        <h3 className="fontSize_5 margin12 onlyBottomMargin">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ISPU_DETAILS_STORE_HOURS_TITLE}</h3>
        {storeHoursArray.map((day, index) => (
          <p key={`storeHour-${index}`}>{day}</p>
        ))}
      </div>
    </div>
  );
};


StoreDetails.propTypes = {
  cqContent: PropTypes.object,
  ispudetailsInfo: PropTypes.object,
  updateEditState: PropTypes.func, //eslint-disable-line
  showIspuModal: PropTypes.func,
};
export default StoreDetails;
