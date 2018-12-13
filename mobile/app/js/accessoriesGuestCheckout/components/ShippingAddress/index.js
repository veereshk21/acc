import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';
import * as validation from '../../../common/validation';
import Title from './../../../common/Title/Title';
import HorizontalRule from '../../../common/HorizontalRule';
import ShippingAddressForm from './ShippingAddressForm';
import BackButton from '../../../common/BackButton/';
import Loader from '../../../common/Loader/Loader';

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
  if (!businessName) {
    errors.businessName = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidNameWithSpace(businessName)) {
    errors.businessName = props.cq.error.OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_COMPANY_NAME_ERROR;
  }

  if (!firstName) {
    errors.firstName = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidNameWithSpace(firstName)) {
    errors.firstName = props.cq.error.OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_FIRST_NAME_ERROR;
  }
  if (!lastName) {
    errors.lastName = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidNameWithSpace(lastName)) {
    errors.lastName = props.cq.error.OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_LAST_NAME_ERROR;
  }
  if (!shippingAddress) {
    errors.address1 = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidAddress(shippingAddress)) {
    errors.address1 = props.cq.error.OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_SHIPPING_ADDRESS_PRIMARY_ERROR;
  }
  if (shippingAddress2 && !validation.isValidAddress(shippingAddress2)) {
    errors.address2 = props.cq.error.OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_SHIPPING_ADDRESS_SECONDARY_ERROR;
  }
  if (!city) {
    errors.city = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidCity(city)) {
    errors.city = props.cq.error.OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_CITY_ERROR;
  }
  if (!state) {
    errors.state = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidName(state)) {
    errors.state = props.cq.error.OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_STATE_ERROR;
  }
  if (!zipCode) {
    errors.zipcode = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidZipCode(zipCode)) {
    errors.zipcode = props.cq.error.OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_ZIPCODE_ERROR;
  }
  if (!emailAddress) {
    errors.email = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidEmail(emailAddress)) {
    errors.email = props.cq.error.OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_EMAIL_ERROR;
  }
  if (!telephoneNumber) {
    errors.phoneNumber = props.cq.error.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidPhoneNumber(telephoneNumber)) {
    errors.phoneNumber = props.cq.error.OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_PHONE_NUMBER_ERROR;
  }
  return errors;
};
class ShippingAddress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isBuisnessAddress: (props.shipToType === 'business'),
    };
  }
  handleBusinessAddressChange = (e) => {
    this.setState({
      isBuisnessAddress: e.target.checked,
    });
  }
  handleSubmitShippingForm = (data) => {
    this.props.updateShippingAddress(data);
  }
  autocompleteOnSelect = (address) => {
    const { change } = this.props;
    change('address1', address.route);
    change('city', address.locality);
    change('state', address.administrative_area_level_1);
    change('zipcode', address.postal_code);
  }
  render() {
    const {
      cq, valid, submitting, handleSubmit, isFetching, stepsCompleted,
    } = this.props;
    return (
      <Grid className="noSidePad pad12">
        {isFetching === true && <Loader />}
        {stepsCompleted.shippingAddress && <BackButton to="/" />}
        <Row className="noSideMargin pad24">
          <Col xs={12}>
            <Title className="noSidePad">{cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_TITLE_TEXT}</Title>
            <p className="pad12 onlyTopPad">{cq.label.OD_CHECKOUT_DELIVERY_ADDRESS_TITLE_DESCRIPTION_TEXT}</p>
            <HorizontalRule />

          </Col>
        </Row>
        <ShippingAddressForm {...this.props} handleBusinessAddressChange={this.handleBusinessAddressChange} isBuisnessAddress={this.state.isBuisnessAddress} autocompleteOnSelect={this.autocompleteOnSelect} />
        <Row className="noSideMargin pad24 textAlignCenter">
          <Col xs={12}>
            <button
              className="button primary large"
              type="submit"
              disabled={!valid || submitting}
              analyticstrack="sumbit-shipping-address"
              onClick={
                handleSubmit((data) => {
                  this.handleSubmitShippingForm(Object.assign({}, data.toJS()));// dispatches add new card action
                })
              }
            >Next
            </button>
          </Col>
        </Row>
      </Grid >);
  }
}

ShippingAddress.propTypes = {
  cq: PropTypes.object,
  updateShippingAddress: PropTypes.func,
  states: PropTypes.array,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  shipToType: PropTypes.string,
  isFetching: PropTypes.bool,
  stepsCompleted: PropTypes.object,
  change: PropTypes.func,
};

ShippingAddress.defaultProps = {};
export default reduxForm({
  form: 'shippingAddress',
  validate,
})(ShippingAddress);
