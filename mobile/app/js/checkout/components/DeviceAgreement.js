import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
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

const AgreementBreakDown = (props) => {
  const {
    cqContent, agreementState, agreementChecked, tradeInPromoDetails, termsAndConditionsInfo, isTradeInEnabled,
  } = props;

  const onAgreementChecked = (name, isChecked) => {
    agreementChecked({ name, state: isChecked });
  };


  return (
    <Row className="pad24 noSideMargin onlySidePad">
      <Col xs={12} className="noSidePad">
        <form>
          <Row className="border_EB onlyBottomBorder pad24 noSidePad noSideMargin">
            <Col xs={1} className="noSidePad">
              <Field
                className="checkbox"
                name="customerAgreement"
                id="customerAgreement"
                component="input"
                type="checkbox"
                onChange={(evt) => (onAgreementChecked('customerAgreement', evt.target.checked))}
                checked={!!agreementState.customerAgreement}
                aria-label={cqContent.label.OD_CHECKOUT_CUSTOMER_AGREEMENT_ARIA_LABEL}
                tabIndex="-1"
                aria-hidden
              />
              <label
                htmlFor="customerAgreement"
                className="displayInlineBlock"
                aria-checked={!!agreementState.customerAgreement}
                aria-labelledby="customerAgreement"
              >
                <svg className="checkboxContainer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><rect className="checkboxRectangleOutline" x="0" y="0" rx="14" ry="14" fill="none" /><rect className="checkboxRectangle" x="0" y="0" rx="14" ry="14" fill="none" /><path className="checkboxCheckmark" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
              </label>
            </Col>
            <Col
              xs={11}
              className="noSidePad"
              aria-label={cqContent.label.OD_CHECKOUT_CUSTOMER_AGREEMENT_ARIA_LABEL}
            >
              <div className="pad24 onlyLeftPad">
                <span>
                  <span dangerouslySetInnerHTML={{ __html: cqContent.label.OD_CHECKOUT_CUSTOMER_AGREEMENT_PREFIX }} />
                  {cqContent.label.OD_CHECKOUT_CUSTOMER_AGREEMENT_LINK_TEXT &&
                    <Link
                      to="/customerAgreement"
                      className="link"
                      analyticstrack="customer-agreement"
                      dangerouslySetInnerHTML={{ __html: cqContent.label.OD_CHECKOUT_CUSTOMER_AGREEMENT_LINK_TEXT }}
                    />
                  }
                  <span dangerouslySetInnerHTML={{ __html: cqContent.label.OD_CHECKOUT_CUSTOMER_AGREEMENT_INFIX }} />
                  {cqContent.label.OD_CHECKOUT_CUSTOMER_AGREEMENT_PRIVACY_LINK_TEXT &&
                    <a
                      analyticstrack="privacyPolicy-link"
                      className="link"
                      dangerouslySetInnerHTML={{ __html: cqContent.label.OD_CHECKOUT_CUSTOMER_AGREEMENT_PRIVACY_LINK_TEXT }}
                      href="https://www.verizon.com/about/privacy/privacy-policy-summary"
                    />
                  }
                  <span dangerouslySetInnerHTML={{ __html: cqContent.label.OD_CHECKOUT_CUSTOMER_AGREEMENT_SUFIX }} />
                </span>
              </div>
            </Col>
          </Row>

          {termsAndConditionsInfo !== null && termsAndConditionsInfo.humAgreement && termsAndConditionsInfo.humAgreement !== null &&
            <Row className="border_EB onlyBottomBorder pad24 noSidePad noSideMargin">
              <Col xs={1} className="noSidePad">
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
                <label htmlFor="humAgreement" className="displayInlineBlock" aria-checked={!!agreementState.humAgreement} aria-labelledby="humAgreement">
                  <svg className="checkboxContainer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><rect className="checkboxRectangleOutline" x="0" y="0" rx="14" ry="14" fill="none" /><rect className="checkboxRectangle" x="0" y="0" rx="14" ry="14" fill="none" /><path className="checkboxCheckmark" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                </label>
              </Col>
              <Col xs={11} className="noSidePad" aria-label={`${cqContent.label.OD_CHECKOUT_MAIN_SCREEN_VZW_TEXT} ${cqContent.label.OD_CHECKOUT_MAIN_SCREEN_VZW_LINK_TEXT}`}>
                <div className="pad24 onlyLeftPad">
                  <span aria-hidden>{cqContent.label.OD_CHECKOUT_MAIN_SCREEN_VZW_TEXT}&nbsp;
                    <a
                      href={termsAndConditionsInfo.humAgreement.humTcUrl}
                      aria-hidden
                      target="_blank"
                      analyticstrack="view-agreements"
                    >{cqContent.label.OD_CHECKOUT_HUM_TC_LINK_TEXT}
                    </a>
                  </span>
                </div>
              </Col>

            </Row>
          }

          {termsAndConditionsInfo !== null && termsAndConditionsInfo.eppTermsAndConditions !== null &&
            <Row className="border_EB onlyBottomBorder pad24 noSidePad noSideMargin">
              <Col xs={1} className="noSidePad">
                <Field
                  className="checkbox"
                  name="eppAgreement"
                  id="eppAgreement"
                  component="input"
                  type="checkbox"
                  onChange={(evt) => (onAgreementChecked('eppAgreement', evt.target.checked))}
                  checked={!!agreementState.eppAgreement}
                  tabIndex="-1"
                  aria-label={`${cqContent.label.OD_CHECKOUT_EPP_READ_AGREEMENT_TEXT} ${cqContent.label.OD_CHECKOUT_EPP_TERMS_AND_CONDITIONS_LINK}`}
                  aria-hidden
                />
                <label htmlFor="eppAgreement" className="displayInlineBlock" aria-checked={!!agreementState.eppAgreement} aria-labelledby="eppAgreement">
                  <svg className="checkboxContainer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><rect className="checkboxRectangleOutline" x="0" y="0" rx="14" ry="14" fill="none" /><rect className="checkboxRectangle" x="0" y="0" rx="14" ry="14" fill="none" /><path className="checkboxCheckmark" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                </label>
              </Col>
              <Col xs={11} className="noSidePad" aria-label={`${cqContent.label.OD_CHECKOUT_EPP_READ_AGREEMENT_TEXT} ${cqContent.label.OD_CHECKOUT_EPP_TERMS_AND_CONDITIONS_LINK}`}>
                <div className="pad24 onlyLeftPad">
                  <span aria-hidden>{cqContent.label.OD_CHECKOUT_EPP_READ_AGREEMENT_TEXT} &nbsp;
                    <Link
                      className="link"
                      to="/eppAgreement"
                      aria-hidden
                      analyticstrack="customer-agreement"
                    >{cqContent.label.OD_CHECKOUT_EPP_TERMS_AND_CONDITIONS_LINK}
                    </Link>
                  </span>
                </div>
              </Col>
            </Row>
          }
          {isTradeInEnabled && tradeInPromoDetails !== null &&
            <Row className="border_EB onlyBottomBorder pad24 noSidePad noSideMargin">
              <Col xs={1} className="noSidePad">
                <Field
                  className="checkbox"
                  name="tradeinAgreement"
                  id="tradeinAgreement"
                  component="input"
                  type="checkbox"
                  onChange={(evt) => (onAgreementChecked('tradeinAgreement', evt.target.checked))}
                  checked={!!agreementState.tradeinAgreement}
                  tabIndex="-1"
                  aria-label={`${cqContent.label.OD_CHECKOUT_MAIN_SCREEN_TRADE_IN_TEXT} ${cqContent.label.OD_CHECKOUT_MAIN_SCREEN_TRADE_IN_LINK_TEXT}`}
                  aria-hidden
                />
                <label htmlFor="tradeinAgreement" className="displayInlineBlock" aria-checked={!!agreementState.tradeinAgreement} aria-labelledby="tradeinAgreement">
                  <svg className="checkboxContainer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><rect className="checkboxRectangleOutline" x="0" y="0" rx="14" ry="14" fill="none" /><rect className="checkboxRectangle" x="0" y="0" rx="14" ry="14" fill="none" /><path className="checkboxCheckmark" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                </label>
              </Col>
              <Col xs={11} className="noSidePad" aria-label={`${cqContent.label.OD_CHECKOUT_MAIN_SCREEN_TRADE_IN_TEXT} ${cqContent.label.OD_CHECKOUT_MAIN_SCREEN_TRADE_IN_LINK_TEXT}`} >
                <div className="pad24 onlyLeftPad">
                  <span aria-hidden>{cqContent.label.OD_CHECKOUT_MAIN_SCREEN_TRADE_IN_TEXT}&nbsp;
                    <Link
                      to="/tradeInAgreement"
                      className="link"
                      aria-hidden
                      analyticstrack="trade-in-agreement"
                    >{cqContent.label.OD_CHECKOUT_MAIN_SCREEN_TRADE_IN_LINK_TEXT}
                    </Link>
                  </span>
                </div>
              </Col>
            </Row>
          }
        </form>
      </Col>
    </Row>
  );
};

AgreementBreakDown.propTypes = {
  cqContent: PropTypes.object,
  agreementState: PropTypes.object,
  tradeInPromoDetails: PropTypes.string,
  agreementChecked: PropTypes.func,
  termsAndConditionsInfo: PropTypes.object,
  isTradeInEnabled: PropTypes.bool,
};

export default reduxForm({
  form: 'agreementForm',
  validate,
})(AgreementBreakDown);
