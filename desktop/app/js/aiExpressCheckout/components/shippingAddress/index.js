import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Row, Col } from 'react-flexbox-grid';
import IspuEditDetails from './ispuEditDetails';
import { EDIT_STATE } from '../../constants';
import AsyncComponent from '../../../common/AsyncComponent';

const ShippingAddress = AsyncComponent(() => import('../../containers/shippingAddress/shippingAddress'));
const ShippingAddressEdit = AsyncComponent(() => import('../../containers/shippingAddress/shippingAddressEdit'));
const IspuDetails = AsyncComponent(() => import('./ispuDetails'));

class ShippingAddressSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingAddressType: '',
    };
  }

  render() {
    const { editState, ISPUSelected, checkoutStates } = this.props;

    if (!checkoutStates.showShippingAddress && !checkoutStates.showDeliveryMethod) {
      return null;
    }

    return (
      <div id="shippingAddressSection">
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
      </div>
    );
  }
}

ShippingAddressSection.propTypes = {
  editState: PropTypes.object,
  ISPUSelected: PropTypes.bool,
  contactInfo: PropTypes.object,
  checkoutStates: PropTypes.object,
};
export default ShippingAddressSection;
