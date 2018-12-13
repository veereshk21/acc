/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';

/* this is needed to get form validation status from outside of form component */
const PlaceOrder = (props) => {
  const {
    submitOrderURL, handleSubmit, valid, submitting, cqContent, onOrderPlacement, smsOptin, updateOptInSmsNumber,
  } = props;
  const optinNumber = smsOptin ? updateOptInSmsNumber : null;
  return (
    <button
      type="submit"
      className="button large"
      disabled={!valid || submitting}
      analyticstrack="place-order"
      onClick={
        handleSubmit((data) => {
          onOrderPlacement(submitOrderURL, smsOptin, optinNumber);
        })
      }
    >{cqContent.label.OD_CHECKOUT_MAIN_SCREEN_BUTTON_TEXT}
    </button>
  );
};
PlaceOrder.propTypes = {
  submitOrderURL: PropTypes.string,
  handleSubmit: PropTypes.func,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  cqContent: PropTypes.object,
  onOrderPlacement: PropTypes.func,
  smsOptin: PropTypes.bool,
  updateOptInSmsNumber: PropTypes.string,
};
export default reduxForm({
  form: 'agreementForm',
})(PlaceOrder);
