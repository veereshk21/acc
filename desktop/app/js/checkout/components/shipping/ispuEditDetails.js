import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form/immutable';
import { EDIT_STATE } from '../../constants';
import * as validation from '../../../common/validation';
import MSelect from '../../../common/Select/index';
import { renderTextField } from '../../../common/TextField/';

const validate = (values, props) => {
  const errors = {};
  const emailAddress = values.get('email');
  const telephoneNumber = values.get('phoneNumber');

  if (!emailAddress) {
    errors.email = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!validation.isValidEmail(emailAddress)) {
    errors.email = props.cqContent.error.DT_OD_CHECKOUT_SHIPPING_ADDRESS_INVALID_EMAIL_ERROR;
  }
  if (!telephoneNumber) {
    errors.phoneNumber = props.cqContent.error.DT_OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  }
  return errors;
};

class ISPUDetails extends Component {
  onCancel = () => this.props.updateEditState(EDIT_STATE.SHIPPING, false);

  updateISPU = (data) => {
    const { ispudetailsInfo } = this.props;

    const param = {
      email: data.get('email'),
      phoneNumber: data.get('phoneNumber'),
      activeSMSCapableMtnList: data.get('phoneNumber'),
      shippingAddressType: 'pickUpStore',
      orderId: this.props.orderId,
      storeId: ispudetailsInfo.storeId,
      standaloneAccessories: this.props.standaloneAccessories,
      longitude: ispudetailsInfo.longtitude.toString(),
      latitude: ispudetailsInfo.latitdude.toString(),
      shipOptionChangeOnly: true,
    };
    this.props.submitISPU(param);
  };

  render() {
    const { cqContent, activeSMSCapableMtnList } = this.props;
    return (
      <div>
        <Row>
          <Col xs={6}>
            <div>
              <Field
                component={renderTextField}
                id="email"
                name="email"
                label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_EMAIL_TEXT}
                type="text"
                required
              />
            </div>
            <div className="margin54 onlyTopMargin">
              <MSelect
                name="phoneNumber"
                id="phoneNumber"
                label={cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_PHONE_NUMBER_TEXT}
                borderStyle
              >
                {
                  activeSMSCapableMtnList.map((number) => (
                    <option
                      key={number}
                      value={number}
                    >
                      {validation.normalizePhoneNumber(number)}
                    </option>
                  ))
                }
              </MSelect>
            </div>
          </Col>
        </Row>
        <div className="width100 margin40 onlyTopMargin clearfix">

          <button
            className="primary button large"
            type="submit"
            disabled={!this.props.valid || this.props.submitting}
            analyticstrack="shipping-ispu-update-CTA"
            onClick={
              this.props.handleSubmit((data) => {
                this.updateISPU(data);
              })
            }
          >
            {cqContent.label.DT_OD_CHECKOUT_SHIPPING_ADDRESS_BUTTON_TEXT}
          </button>

          {!this.props.checkoutStates.contactInfoRequired &&
            <button
              className="secondary button large margin10 onlyLeftMargin"
              analyticstrack="shipping-ispu-cancel-CTA"
              onClick={this.onCancel}
            >
              {cqContent.label.DT_OD_CHECKOUT_SHIPPING_ISPU_DETAILS_CANCEL}
            </button>
          }

        </div>
      </div>
    );
  }
}

ISPUDetails.propTypes = {
  cqContent: PropTypes.object,
  updateEditState: PropTypes.func,
  contactInfo: PropTypes.object, // eslint-disable-line
  activeSMSCapableMtnList: PropTypes.array,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  orderId: PropTypes.string,
  standaloneAccessories: PropTypes.bool,
  submitISPU: PropTypes.func,
  checkoutStates: PropTypes.object,
  ispudetailsInfo: PropTypes.object,
};

export default reduxForm({
  form: 'ispuContactInfo',
  enableReinitialize: true,
  destroyOnUnmount: false,
  validate,
})(ISPUDetails);

