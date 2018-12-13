import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';

const validate = (data, props) => {
  const errors = {};

  props.agreementFields.forEach((checkbox) => {
    if (!data.get(checkbox)) {
      errors[checkbox] = 'Required';
    }
  });

  return errors;
};

const DeviceAgreement = (props) => {
  const {
    cqContent, agreementState, agreementChecked, termsAndConditionsInfo,
  } = props;

  const onAgreementChecked = (name, isChecked) => {
    agreementChecked({ name, state: isChecked });
  };


  return (
    <form className="margin20 noSideMargin">
      {termsAndConditionsInfo !== null && termsAndConditionsInfo.humAgreement && termsAndConditionsInfo.humAgreement !== null &&
        <div className="border_EB onlyTopBorder">
          <p className="verticalCenter leftAlign bold bolder">
            <Field
              className="checkbox"
              name="humAgreement"
              id="humAgreement"
              component="input"
              type="checkbox"
              onChange={(evt) => (onAgreementChecked('humAgreement', evt.target.checked))}
              checked={!!agreementState.humAgreement}
              tabIndex="-1"
              aria-hidden
            />
            <label htmlFor="humAgreement" className="displayInlineBlock" aria-checked={!!agreementState.humAgreement} aria-labelledby="humAgreement" />
          </p>

          <p className="verticalCenter leftAlign pad12 onlyLeftPad" aria-label={`${cqContent.label.DT_OD_CHECKOUT_HUM_TC_MAIN_SCREEN_VZW_TEXT} ${cqContent.label.DT_OD_CHECKOUT_HUM_TC_MAIN_SCREEN_VZW_LINK_TEXT}`}>
            <span aria-hidden>{cqContent.label.DT_OD_CHECKOUT_HUM_TC_MAIN_SCREEN_VZW_TEXT}&nbsp;<a
              href={termsAndConditionsInfo.humAgreement.humTcUrl}
              aria-hidden
              target="_blank"
            >{cqContent.label.DT_OD_CHECKOUT_HUM_TC_LINK_TEXT}
            </a>
            </span>
          </p>

        </div>
      }
    </form>
  );
};

DeviceAgreement.propTypes = {
  cqContent: PropTypes.object,
  agreementState: PropTypes.object,
  agreementChecked: PropTypes.func,
  termsAndConditionsInfo: PropTypes.object,
};

export default reduxForm({
  form: 'agreementForm',
  validate,
})(DeviceAgreement);
