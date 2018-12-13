import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

const validate = (data, props) => {
  const errors = {};

  props.agreementFields.forEach((checkbox) => {
    if (!data.get(checkbox)) {
      errors[checkbox] = 'Required';
    }
  });

  return errors;
};

const CPCAgreements = (props) => {
  const { termsAndConditionsInfo, agreementState, agreementChecked } = props;

  const onAgreementChecked = (name, isChecked) => {
    agreementChecked({ name, state: isChecked });
  };
  return (termsAndConditionsInfo !== null &&
    <div>
      {
        <form>
          {termsAndConditionsInfo.partialMonthChargesText !== null &&
            <div className="border_EB onlyTopBorder margin10 onlyTopMargin background_FF">
              <p className="span_2_of_12 verticalCenter leftAlign pad20 bold bolder">
                <Field
                  className="checkbox"
                  name="partialMonthChargesAgreement"
                  id="partialMonthChargesAgreement"
                  component="input"
                  type="checkbox"
                  onChange={(evt) => (onAgreementChecked('partialMonthChargesAgreement', evt.target.checked))}
                  checked={!!agreementState.partialMonthChargesAgreement}
                  aria-label={termsAndConditionsInfo.partialMonthChargesText}
                  tabIndex="-1"
                  aria-hidden
                />
                <label
                  htmlFor="partialMonthChargesAgreement"
                  className="displayInlineBlock"
                  aria-checked={!!agreementState.partialMonthChargesAgreement}
                  aria-labelledby="partialMonthChargesAgreement"
                >
                  <svg className="checkboxContainer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><rect className="checkboxRectangleOutline" x="0" y="0" rx="14" ry="14" fill="none" /><rect className="checkboxRectangle" x="0" y="0" rx="14" ry="14" fill="none" /><path className="checkboxCheckmark" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                </label>
              </p>
              <p className="span_10_of_12 verticalCenter leftAlign pad20" aria-label={termsAndConditionsInfo.partialMonthChargesText}>
                {termsAndConditionsInfo.partialMonthChargesText}
              </p>
            </div>
          }
          {termsAndConditionsInfo.promotionTextCPC !== null &&
            <div className="border_EB onlyTopBorder margin10 onlyTopMargin background_FF">
              <p className="span_2_of_12 verticalCenter leftAlign pad20 bold bolder">
                <Field
                  className="checkbox"
                  name="promotionTextCPCAgreement"
                  id="promotionTextCPCAgreement"
                  component="input"
                  type="checkbox"
                  onChange={(evt) => (onAgreementChecked('promotionTextCPCAgreement', evt.target.checked))}
                  checked={!!agreementState.promotionTextCPCAgreement}
                  aria-label={termsAndConditionsInfo.promotionTextCPC}
                  tabIndex="-1"
                  aria-hidden
                />
                <label
                  htmlFor="promotionTextCPCAgreement"
                  className="displayInlineBlock"
                  aria-checked={!!agreementState.promotionTextCPCAgreement}
                  aria-labelledby="promotionTextCPCAgreement"
                >
                  <svg className="checkboxContainer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><rect className="checkboxRectangleOutline" x="0" y="0" rx="14" ry="14" fill="none" /><rect className="checkboxRectangle" x="0" y="0" rx="14" ry="14" fill="none" /><path className="checkboxCheckmark" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                </label>
              </p>
              <p className="span_10_of_12 verticalCenter leftAlign pad20" aria-label={termsAndConditionsInfo.promotionTextCPC}>
                {termsAndConditionsInfo.promotionTextCPC}
              </p>
            </div>
          }
        </form>

      }
    </div>);
};

CPCAgreements.propTypes = {
  termsAndConditionsInfo: PropTypes.object,
  agreementState: PropTypes.object,
  agreementChecked: PropTypes.func,
};

export default reduxForm({
  form: 'agreementForm',
  validate,
})(CPCAgreements);
