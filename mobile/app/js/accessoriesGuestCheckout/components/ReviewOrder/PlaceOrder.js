/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';

/* this is needed to get form validation status from outside of form component */
const PlaceOrder = (props) => {
  const {
    submitOrderURL, handleSubmit, valid, submitting, cqContent, onOrderPlacement,
  } = props;
  return (
    <button
      type="submit"
      className="button large"
      disabled={!valid || submitting}
      analyticstrack="guest-acc-place-order"
      onClick={
        handleSubmit((data) => {
          onOrderPlacement(submitOrderURL);
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

};
export default reduxForm({
  form: 'agreementForm',
})(PlaceOrder);
