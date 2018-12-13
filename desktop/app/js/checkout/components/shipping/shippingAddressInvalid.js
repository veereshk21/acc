import React from 'react';
import PropTypes from 'prop-types';
import { normalizePhoneNumber } from '../../../common/validation';
import Button from '../../../common/Button/Button';

const ShippingAddressInvalid = (props) => {
  const { cqContent, addressInfo, checkoutStates } = props;

  return (
    <div>
      <div className="margin36 noSideMargin">
        <h3 className="margin12 onlyBottomMargin">
          {checkoutStates.poBoxShippingAddress ?
            cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_POBOX_SECTION_TITLE
            :
            cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SECTION_TITLE
          }
        </h3>
        {/* Shipping Address */}
        {addressInfo.businessName &&
          <p>{addressInfo.businessName}</p>
        }
        {(addressInfo.firstName || addressInfo.lastName) &&
          <p> {addressInfo.firstName} {addressInfo.lastName}</p>
        }
        <p>{addressInfo.address1}</p>
        {addressInfo.address2 &&
          <p>{addressInfo.address2}</p>
        }
        <p>{addressInfo.city}, {addressInfo.state}, {addressInfo.zipcode}</p>
        <p>{normalizePhoneNumber(addressInfo.phoneNumber)}</p>
        <p> {addressInfo.email}</p>
      </div>

      <div>
        <Button
          className="primary button large "
          onClick={props.onClickEdit}
          analyticstrack="shipping-invalid-update-CTA"
        >
          Update shipping
        </Button>
        {props.ispuEligibleFlag &&
          <Button
            className="secondary button large margin10 onlyLeftMargin"
            analyticstrack="shipping-invalid-ispu-CTA"
            onClick={props.showIspuModal}
          >
            In-store pick up
          </Button>
        }
      </div>
    </div>
  );
};

ShippingAddressInvalid.propTypes = {
  cqContent: PropTypes.object,
  addressInfo: PropTypes.object,
  checkoutStates: PropTypes.object,
  onClickEdit: PropTypes.func,
  showIspuModal: PropTypes.func,
  ispuEligibleFlag: PropTypes.bool,
};

export default ShippingAddressInvalid;
