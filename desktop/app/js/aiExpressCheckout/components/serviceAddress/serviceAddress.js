import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { EDIT_STATE } from '../../constants';
import EditButton from '../../../common/EditButton';
import { capitalize } from '../../../common/Helpers';
import { normalizePhoneNumber } from '../../../common/validation';


class ServiceAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingAddressType: '',
    };
  }

  onClickEdit = () => { }
  render() {
    // const { editState, cqContent } = this.props;
    const { serviceAddress } = this.props.device;

    return (

      <div style={{ wordWrap: 'break-word' }} >
        {/* Title */}
        <div className="">
          <h3 className="fontSize_5 displayInlineBlock verticalBottom margin10 onlyRightMargin">
            Service address
          </h3>
          <EditButton
            onClick={this.props.onClickEdit}
            analyticstrack="service-address-edit-CTA"
          >
            Change
          </EditButton>
        </div>
        {/* Shipping Address */}
        {(serviceAddress.firstName || serviceAddress.lastName) &&
          <p> {capitalize(serviceAddress.firstName)} {capitalize(serviceAddress.lastName)}</p>
        }
        {serviceAddress.address1 && <p>{capitalize(serviceAddress.address1)}</p>}
        {serviceAddress.address2 && <p>{capitalize(serviceAddress.address2)}</p>}
        {(serviceAddress.city || serviceAddress.state || serviceAddress.zipcode) && <p>{serviceAddress.city}, {serviceAddress.state}, {serviceAddress.zipcode}</p>}
        {serviceAddress.phoneNumber && <p>{normalizePhoneNumber(serviceAddress.phoneNumber)}</p>}
        {/* {serviceAddress.emailAddress && <p> {serviceAddress.emailAddress.toLowerCase()}</p>} */}
      </div>
    );
  }
}

ServiceAddress.propTypes = {
  device: PropTypes.object,
  // cqContent: PropTypes.object,
  // editState: PropTypes.object,
  onClickEdit: PropTypes.func,
};
export default ServiceAddress;
