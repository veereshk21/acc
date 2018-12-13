import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import renderHTML from 'react-render-html';

import DeviceAgreement from '../termsAndConditions/deviceAgreement';
import Agreement from './agreement';

const validate = (data, props) => {
  const errors = {};

  props.agreementFields.forEach((checkbox) => {
    if (!data.get(checkbox)) {
      errors[checkbox] = 'Required';
    }
  });

  return errors;
};

const AgreementSection = (props) => (

  <div id="agreementSection" className="border_grayThree borderSize_2 noTopBorder noLeftBorder">
    <div className="pad24 border_red borderSize_4 onlyTopBorder">
      <h2 className="h1 fontSize32"> {props.cqContent.label.DT_OD_CHECKOUT_TC_TITLE} </h2>
      <iframe title="Print" id="printFrame" className="clear" aria-hidden="true" tabIndex="-1" />

      {/* Protection Agreement */}
      {props.termsAndConditionsInfo.deviceProtectionTC !== null &&
        <Agreement
          terms={props.termsAndConditionsInfo.deviceProtectionTC}
          name="deviceProtectionTC"
          id="deviceProtectionTC"
          labelId="deviceProtectionTC_title"
          label={props.cqContent.label.DT_OD_CHECKOUT_TC_PROTECTION_AGREEMENT_CONFIRMATION}
        />
      }
      {props.termsAndConditionsInfo !== null &&
        <div>
          {/* Edge/DPP Agreement */}
          {props.termsAndConditionsInfo.edgeTerms !== null &&
            props.termsAndConditionsInfo.edgeTerms.map((edgeTerm, id) => (
              <div key={'devicePaymentAgrement_' + id}>
                <Agreement
                  title={edgeTerm.deviceLabel === 'UPGRADE' ? props.cqContent.label.DT_OD_CHECKOUT_TC_DPP_EUP_AGREEMENT_TITLE : props.cqContent.label.DT_OD_CHECKOUT_TC_DPP_AAL_AGREEMENT_TITLE}
                  terms={renderHTML(edgeTerm.edgeTermsAndCondition)}
                  name={'devicePaymentAgrement_' + id}
                  id={'devicePaymentAgrement_' + id}
                  labelId={'devicePaymentAgrement_title_' + id}
                  cqContent={props.cqContent}
                  label={renderHTML(props.cqContent.label.DT_OD_CHECKOUT_TC_DPP_AGREEMENT_CONFIRMATION)}
                />
              </div>
            ))
          }

          <div className="margin10 onlyTopMargin background_FF">
            <DeviceAgreement {...props} />
          </div>

          {/* TradeIn Agreement */}
          {props.tradeInPromoDetails !== null && props.termsAndConditionsInfo.tradeinTermsandConditions !== null &&
            <Agreement
              title={props.cqContent.label.DT_OD_CHECKOUT_TC_TRADE_IN_TITLE}
              terms={props.termsAndConditionsInfo.tradeinTermsandConditions}
              name="tradeinAgreement"
              id="tradeinAgreement"
              labelId="tradeinAgreement_title"
              label={props.cqContent.label.DT_OD_CHECKOUT_TC_TRADE_IN_AGREEMENT_CONFIRMATION}
            />
          }

          {/* CPC  - Partial Monthly Charges Agreement */}
          {props.termsAndConditionsInfo.partialMonthChargesText !== null &&
            <Agreement
              name="partialMonthChargesAgreement"
              id="partialMonthChargesAgreement"
              labelId="partialMonthChargesAgreement_title"
              label={props.termsAndConditionsInfo.partialMonthChargesText}
            />
          }

          {/* CPC  - Monthly Allowence / Promotion Text Agreement */}
          {props.termsAndConditionsInfo.promotionTextCPC !== null &&
            <Agreement
              name="promotionTextCPCAgreement"
              id="promotionTextCPCAgreement"
              labelId="promotionTextCPCAgreement_title"
              label={props.termsAndConditionsInfo.promotionTextCPC}
            />
          }

          {/* EPP Agreement */}
          {props.termsAndConditionsInfo.eppTermsAndConditions !== null &&
            <Agreement
              terms={renderHTML(props.termsAndConditionsInfo.eppTermsAndConditions)}
              name="eppAgreement"
              id="eppAgreement"
              labelId="eppAgreement_title"
              label={props.cqContent.label.DT_OD_CHECKOUT_TC_EPP_AGREEMENT_CONFIRMATION}
            />
          }

          {/* Customer Agreement */}
          {props.termsAndConditionsInfo.agreementText !== null &&
            <Agreement
              terms={props.termsAndConditionsInfo.agreementText}
              name="custAgreement"
              id="custAgreement"
              labelId="custAgreement_title"
              label={props.cqContent.label.DT_OD_CHECKOUT_TC_CUSTOMER_AGREEMENT_CONFIRMATION}
            />
          }
        </div>
      }
      <p className="legal">{props.cqContent.label.DT_OD_CHECKOUT_TAX_DISCLAIMER}</p>
    </div>
  </div>
);

AgreementSection.propTypes = {
  cqContent: PropTypes.object,
  termsAndConditionsInfo: PropTypes.object,
  tradeInPromoDetails: PropTypes.object,
};

// export default AgreementSection;
export default reduxForm({
  form: 'agreementForm',
  validate,
})(AgreementSection);
