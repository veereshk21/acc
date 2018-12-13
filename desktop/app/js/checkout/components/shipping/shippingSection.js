import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Row, Col } from 'react-flexbox-grid';
import IspuEditDetails from './ispuEditDetails';
import { EDIT_STATE, NOTIFICATIONS } from '../../constants';
import NotificationBar from '../../../common/NotificationBar';
import AsyncComponent from '../../../common/AsyncComponent';

const ShippingAddress = AsyncComponent(() => import('../../containers/shipping/shippingAddress'));
const ShippingAddressEdit = AsyncComponent(() => import('../../containers/shipping/shippingAddressEdit'));
const IspuDetails = AsyncComponent(() => import('./ispuDetails'));
const ShippingMethod = AsyncComponent(() => import('../../containers/shipping/shippingMethod'));

class ShippingSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingAddressType: '',
    };
  }

  render() {
    const { cqContent, editState, ISPUSelected, checkoutStates } = this.props;

    if (!checkoutStates.showShippingAddress && !checkoutStates.showDeliveryMethod) {
      return null;
    }

    return (
      <div id="shippingSection">
        <NotificationBar section={NOTIFICATIONS.SHIPPING} />
        <div className="pad24 border_grayThree borderSize_2 noTopBorder noLeftBorder">
          <h2 className="h1 margin24 onlyBottomMargin fontSize32"> {cqContent.label.DT_OD_CHECKOUT_SHIPPING_TITLE} </h2>

          {!ISPUSelected &&
            <div className="margin24 noSideMargin">
              <p>{cqContent.label.DT_OD_CHECKOUT_SIGNATURE_REQUIRED_DISCLAIMER}</p>
            </div>
          }
          {/* Shipping Address */}
          {!(editState[EDIT_STATE.SHIPPING] || ISPUSelected) && checkoutStates.showShippingAddress &&
            <ShippingAddress />
          }

          {/* Shipping Address Edit */}
          {editState[EDIT_STATE.SHIPPING] && (!ISPUSelected) && checkoutStates.showShippingAddress &&
            <ShippingAddressEdit />
          }

          {/* ISPU */}
          {ISPUSelected && !editState[EDIT_STATE.SHIPPING] &&
            <IspuDetails
              {...this.props}
              initialValues={{
                email: this.props.contactInfo.emailAddress,
                phoneNumber: this.props.contactInfo.phoneNumber,
                shippingAddressType: 'ISPU',
              }}
            />
          }

          {/* Edit ISPU */}
          {ISPUSelected && editState[EDIT_STATE.SHIPPING] &&
            <IspuEditDetails
              {...this.props}
              initialValues={{
                email: this.props.contactInfo.emailAddress,
                phoneNumber: this.props.contactInfo.phoneNumber,
                shippingAddressType: 'ISPU',
              }}
            />
          }
          {/* Shipping Methods */}
          {!editState[EDIT_STATE.SHIPPING] && checkoutStates.showDeliveryMethod &&
            <div>
              <hr className="onlyTopBorder border_black margin36 noSideMargin" aria-hidden />
              <ShippingMethod />
            </div>
          }
        </div>
      </div>
    );
  }
}

ShippingSection.propTypes = {
  cqContent: PropTypes.object,
  editState: PropTypes.object,
  ISPUSelected: PropTypes.bool,
  contactInfo: PropTypes.object,
  checkoutStates: PropTypes.object,
};
export default ShippingSection;
