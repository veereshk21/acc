import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import Button from '../../../common/Button/Button';
import { EDIT_STATE } from '../../constants';
import * as validation from '../../../common/validation';
import AsyncComponent from '../../../common/AsyncComponent';

const ShippingAddressForm = AsyncComponent(() => import('./shippingAddressForm'));

const validate = (values, props) => {
  const errors = {};
  const businessName = values.get('businessName');
  const firstName = values.get('firstName');
  const lastName = values.get('lastName');
  const shippingAddress = values.get('address1');
  const shippingAddress2 = values.get('address2');
  const state = values.get('state');
  const city = values.get('city');
  const zipCode = values.get('zipcode');
  const emailAddress = values.get('email');
  const telephoneNumber = values.get('phoneNumber');

  if (props.formValues.shipToType === 'business') {
    if (!businessName) {
      errors.businessName = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
    } else if (!validation.isValidNameWithSpace(businessName)) {
      errors.businessName = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_COMPANY_NAME_ERROR;
    }
  }

  if (!firstName) {
    errors.firstName = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidNameWithSpace(firstName)) {
    errors.firstName = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_FIRST_NAME_ERROR;
  }
  if (!lastName) {
    errors.lastName = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidNameWithSpace(lastName)) {
    errors.lastName = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_LAST_NAME_ERROR;
  }
  if (!shippingAddress) {
    errors.address1 = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidAddress(shippingAddress)) {
    errors.address1 = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_SHIPPING_ADDRESS_PRIMARY_ERROR;
  }
  if (shippingAddress2 && !validation.isValidAddress(shippingAddress2)) {
    errors.address2 = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_SHIPPING_ADDRESS_SECONDARY_ERROR;
  }
  if (!city) {
    errors.city = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidCity(city)) {
    errors.city = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_CITY_ERROR;
  }
  if (!state) {
    errors.state = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidName(state)) {
    errors.state = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_STATE_ERROR;
  }
  if (!zipCode) {
    errors.zipcode = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidZipCode(zipCode)) {
    errors.zipcode = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_ZIPCODE_ERROR;
  }
  if (!emailAddress) {
    errors.email = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidEmail(emailAddress)) {
    errors.email = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_EMAIL_ERROR;
  }
  if (!telephoneNumber) {
    errors.phoneNumber = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidPhoneNumber(telephoneNumber)) {
    errors.phoneNumber = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_PHONE_NUMBER_ERROR;
  }
  return errors;
};

class ShippingAddressEdit extends Component {
  componentDidMount = () => {
    const { addressInfo, showErrorNotification, cqContent, touch, checkoutStates } = this.props;

    if (checkoutStates.contactInfoRequired) {
      touch('phoneNumber');
      touch('email');
      if (checkoutStates.shippingNameChangeRequired) {
        // Missing First Name, Last Name, Email and Phone Number
        showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_NAME_EMAIL_AND_PHONE_NUMBER_ERROR);
      } else if (!addressInfo.email && !addressInfo.phoneNumber) {
        showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_EMAIL_AND_PHONE_NUMBER_ERROR);
      } else if (!addressInfo.email) {
        showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_EMAIL_ERROR);
      } else if (!addressInfo.phoneNumber) {
        showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_PHONE_NUMBER_ERROR);
      }
    } else if (checkoutStates.shippingNameChangeRequired) {
      // Missing First Name, Last Name
      showErrorNotification(cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_NAME_ERROR);
    }
    if (checkoutStates.shippingNameChangeRequired) {
      touch('firstName');
      touch('lastName');
    }
  }

  onCancel = () => {
    this.props.updateEditState(EDIT_STATE.SHIPPING, false);
  }
  submitShippingInfo = (data) => {
    const { cqContent } = this.props;
    const address = data.toJS();

    if ((address.state === 'HI' || address.state === 'AL') && this.props.checkoutStates.batteryShippingNotAllowedStates) {
      this.props.showErrorNotification(cqContent.error.DT_OD_CHECKOUT_STANDALONE_BATTERY_ERROR);
      if (document.getElementById('shippingSection')) {
        document.getElementById('shippingSection').scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
      }
    } else {
      this.props.updateShippingAddress(address, cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_UPDATE_FAILURE_TEXT);
    }
  }
  render() {
    const {
      cqContent, handleSubmit, valid, submitting, formValues, checkoutStates, addressInfo,
    } = this.props;
    const isBuisnessAddress = formValues.shipToType === 'business';

    let ctaText = cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_BUTTON_TEXT;
    if (checkoutStates.contactInfoRequired) {
      if (!addressInfo.email && !addressInfo.phoneNumber) {
        ctaText = cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_BUTTON_TEXT;
      } else if (!addressInfo.email) {
        ctaText = cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_MISSING_EMAIL_BUTTON_TEXT;
      } else if (!addressInfo.phoneNumber) {
        ctaText = cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_MISSING_PHONE_NUMBER_BUTTON_TEXT;
      }
    }

    return (
      <div>
        <ShippingAddressForm
          {...this.props}
          isBuisnessAddress={isBuisnessAddress}
        />
        <div className="width100 margin24 noSideMargin clearfix">
          <Button
            className="primary button large"
            type="submit"
            disabled={!valid || submitting}
            analyticstrack="shipping-update-CTA"
            onClick={
              handleSubmit((data) => {
                this.submitShippingInfo(data);
              })
            }
          >
            {ctaText}
          </Button>

          {!(checkoutStates.shippingAddressRequired || checkoutStates.shippingAddressChangeRequired || checkoutStates.poBoxShippingAddress || checkoutStates.shippingAddressValidationError || checkoutStates.batteryShippingNotAllowedStates) &&
            <Button
              className="secondary button large margin10 onlyLeftMargin"
              analyticstrack="shipping-cancel-CTA"
              onClick={this.onCancel}
            >
              {cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_CANCEL}
            </Button>
          }

        </div>
      </div >
    );
  }
}

ShippingAddressEdit.propTypes = {
  handleSubmit: PropTypes.func,
  cqContent: PropTypes.object,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  showErrorNotification: PropTypes.func,
  touch: PropTypes.func,
  formValues: PropTypes.object,
  updateEditState: PropTypes.func,
  addressInfo: PropTypes.object,
  checkoutStates: PropTypes.object,
  updateShippingAddress: PropTypes.func,
};
export default reduxForm({
  form: 'shippingAddress',
  validate,
})(ShippingAddressEdit);

