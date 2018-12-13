import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { EDIT_STATE } from '../../constants';
import EditButton from '../../../common/EditButton/index';

class ShippingAddress extends Component {
  onClickEdit = () => {
    // Check for SMS Auth
    // Redirect to SMS Auth
    // SMS Auth Call action to set master state to edit
    this.props.updateEditState(EDIT_STATE.BILLING_ADDRESS, true);
  }

  render() {
    const { cqContent, addressInfo } = this.props;
    return (
      <Row>
        {/* Title */}

        <Col xs={12}>
          {/* Title */}
          <div className="margin12 onlyBottomMargin">
            <h3 className="displayInlineBlock verticalBottom">{cqContent.label.DT_OD_CHECKOUT_BILLING_ADDRESS_SECTION_TITLE}</h3>
            <EditButton
              onClick={this.onClickEdit}
              analyticstrack="billingAddress-edit-CTA"
            >
              Edit
            </EditButton>
          </div>
          {/* Address */}
          {(addressInfo.firstName || addressInfo.lastName) &&
            <p> {addressInfo.firstName} {addressInfo.lastName}</p>
          }
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
