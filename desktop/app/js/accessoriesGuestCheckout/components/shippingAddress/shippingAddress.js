import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { normalizePhoneNumber } from '../../../common/validation';
import { EDIT_STATE } from '../../constants';
import EditButton from '../../../common/EditButton/index';

class ShippingAddress extends Component {
  onClickEdit = () => {
    // Check for SMS Auth
    // Redirect to SMS Auth
    // SMS Auth Call action to set master state to edit
    this.props.updateEditState(EDIT_STATE.SHIPPING_ADDRESS, true);
  }

  render() {
    const { cqContent, addressInfo } = this.props;
    return (
      <Row>
        <Col xs={6}>
          {/* Title */}
          <div className="margin12 onlyBottomMargin">
            <h3 className="displayInlineBlock verticalBottom">{cqContent.label.DT_OD_CHECKOUT_CONTACT_INFORMATION_TITLE}</h3>
            <EditButton
              onClick={this.onClickEdit}
              analyticstrack="shipping-contactInformation-edit-CTA"
            >
              Edit
            </EditButton>
          </div>
          {/* Shipping Address */}
          {(addressInfo.firstName || addressInfo.lastName) &&
            <p> {addressInfo.firstName} {addressInfo.lastName}</p>
          }
          <p>{normalizePhoneNumber(addressInfo.phoneNumber)}</p>
          <p> {addressInfo.email}</p>
        </Col>
        <Col xs={6}>
          {/* Title */}
          <div className="margin12 onlyBottomMargin">
            <h3 className="displayInlineBlock verticalBottom">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_SECTION_TITLE}</h3>
            <EditButton
              onClick={this.onClickEdit}
              analyticstrack="shipping-shippingAddress-edit-CTA"
            >
              Edit
            </EditButton>
          </div>
          {/* Shipping Address */}
          <p>{addressInfo.address1}</p>
          {addressInfo.address2 &&
            <p>{addressInfo.address2}</p>
          }
          <p>{addressInfo.city}, {addressInfo.state}, {addressInfo.zipcode}</p>
        </Col>
      </Row>
    );
  }
}

ShippingAddress.propTypes = {
  cqContent: PropTypes.object,
  addressInfo: PropTypes.object,
  updateEditState: PropTypes.func,
};
export default ShippingAddress;
