import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EDIT_STATE } from '../../constants';
import EditButton from '../../../common/EditButton/index';

class ShippingMethod extends Component {
  onClickEdit = () => {
    this.props.updateEditState(EDIT_STATE.SHIPPING_METHOD, true);
  }
  render() {
    const { cqContent, selectedShippingType } = this.props;
    return (
      <div>
        {/* Title */}
        <div className="margin12 onlyBottomMargin">
          <h3 className="displayInlineBlock verticalBottom">{cqContent.label.DT_OD_CHECKOUT_SHIPPING_METHOD_SECTION_TITLE}</h3>
          <EditButton
            onClick={this.onClickEdit}
            analyticstrack="shipping-shippingMethod-edit-CTA"
          >
            Edit
          </EditButton>
        </div>
        <p> {selectedShippingType.shippingTypeName}</p>
      </div>
    );
  }
}

ShippingMethod.propTypes = {
  cqContent: PropTypes.object,
  selectedShippingType: PropTypes.object,
  updateEditState: PropTypes.func,
};
export default ShippingMethod;
