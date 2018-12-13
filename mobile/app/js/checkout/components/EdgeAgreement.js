import React from 'react';
import renderHTML from 'react-render-html';
import { reduxForm, Field } from 'redux-form/immutable';
import { Row, Col } from 'react-flexbox-grid';

const validate = (data, props) => {
  const errors = {};

  props.agreementFields.forEach((checkbox) => {
    if (!data.get(checkbox)) {
      errors[checkbox] = 'Required';
    }
  });

  return errors;
};


const EdgeAgreement = (props) => {
  const {
    cqContent, termsAndConditionsInfo, agreementState, agreementChecked,
  } = props;

  const onAgreementChecked = (name, isChecked) => {
    agreementChecked({ name, state: isChecked });
  };

  return (termsAndConditionsInfo !== null && termsAndConditionsInfo.edgeTerms !== null &&
    <Row className="pad24 noSideMargin onlySidePad">
      <Col xs={12} className="noSidePad">
        {
          <form className="noBottomMargin">
            {termsAndConditionsInfo.edgeTerms !== null && termsAndConditionsInfo.edgeTerms.map((edgeTerm, id) => (
              <div>
                <Row className="border_EB onlyBottomBorder pad24 noSidePad noSideMargin">
                  <Col xs={1} className="noSidePad">
                    <Field
                      className="checkbox"
                      name={'devicePaymentAgrement_' + id}
                      id={'devicePaymentAgrement_' + id}
                      component="input"
                      type="checkbox"
                      onChange={(evt) => (onAgreementChecked('devicePaymentAgrement_' + id, evt.target.checked))}
                      checked={!!agreementState['devicePaymentAgrement_' + id]}
                      tabIndex="-1"
                      aria-label={`${cqContent.label.OD_CHECKOUT_MAIN_SCREEN_TRADE_IN_TEXT} ${cqContent.label.OD_CHECKOUT_MAIN_SCREEN_TRADE_IN_LINK_TEXT}`}
                      aria-hidden
                    />
                    <label htmlFor={'devicePaymentAgrement_' + id} className="displayInlineBlock" aria-checked={!!agreementState.tradeinAgreement} aria-labelledby="tradeinAgreement">
                      <svg className="checkboxContainer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><rect className="checkboxRectangleOutline" x="0" y="0" rx="14" ry="14" fill="none" /><rect className="checkboxRectangle" x="0" y="0" rx="14" ry="14" fill="none" /><path className="checkboxCheckmark" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                    </label>
                  </Col>
                  <Col xs={11} className="noSidePad" aria-label={`${cqContent.label.OD_CHECKOUT_MAIN_SCREEN_TRADE_IN_TEXT} ${cqContent.label.OD_CHECKOUT_MAIN_SCREEN_TRADE_IN_LINK_TEXT}`} >
                    <div className="pad24 onlyLeftPad">
                      <span id={'devicePaymentAgrement_title_' + id} dangerouslySetInnerHTML={{ __html: renderHTML(`${cqContent.label.OD_CHECKOUT_MAIN_SCREEN_DEVICE_PAYMENT_AGREEMENT_TEXT}&nbsp;${edgeTerm.edgeDeviceName}.`) }} />
                    </div>
                  </Col>


                </Row>
                <Row className="margin24 noSideMargin">
                  <Col xs={12} className="height132 overflowScroll border_EB terms_external textAlignCenter pad24 noTopPad" dangerouslySetInnerHTML={{ __html: renderHTML(edgeTerm.edgeTermsAndCondition) }} />
                </Row>
              </div>
            ))}

          </form>

        }
      </Col>
    </Row>);
};

export default reduxForm({
  form: 'agreementForm',
  validate,
})(EdgeAgreement);
