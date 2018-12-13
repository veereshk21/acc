import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import renderHTML from 'react-render-html';

import HumAgreement from './humAgreement';
import Agreement from './agreement';
import AsyncComponent from '../../../common/AsyncComponent';
import NotificationBar from '../../../common/NotificationBar';
import { NOTIFICATIONS } from '../../constants';

const Modal = AsyncComponent(() => import('../../../common/Modal'));

const validate = (data, props) => {
  const errors = {};

  props.agreementFields.forEach((checkbox) => {
    if (!data.get(checkbox)) {
      errors[checkbox] = 'Required';
    }
  });

  return errors;
};

class AgreementSection extends Component {
  componentDidMount() {
    this.props.invalidateAsyncFetch();
  }
  render() {
    return (
      <Modal
        mounted
        showCloseX
        closeFn={this.props.onCloseModal}
        underlayColor="rgba(0,0,0,0.8)"
        className=""
        style={{
          maxWidth: 800,
        }}
      >
        <div id="agreementSection" className="agreementSection">
          <NotificationBar section={NOTIFICATIONS.AGREEMENT} />
          <div>
            <h2 className="">Customer agreements and disclosures</h2>
            <iframe title="Print" id="printFrame" className="clear" aria-hidden="true" tabIndex="-1" />
            {this.props.termsAndConditionsInfo &&
              <div>
                {/* Protection Agreement */}
                {this.props.termsAndConditionsInfo.deviceProtectionTC !== null &&
                  <Agreement
                    terms={this.props.termsAndConditionsInfo.deviceProtectionTC}
                    name="deviceProtectionTC"
                    id="deviceProtectionTC"
                    labelId="deviceProtectionTC_title"
                    label={this.props.cqContent.label.DT_OD_CHECKOUT_TC_PROTECTION_AGREEMENT_CONFIRMATION}
                  />
                }
                {/* Edge/DPP Agreement */}
                {this.props.termsAndConditionsInfo.edgeTerms !== null &&
                  this.props.termsAndConditionsInfo.edgeTerms.map((edgeTerm, id) => (
                    <div key={'devicePaymentAgrement_' + id}>
                      <Agreement
                        terms={edgeTerm.edgeTermsAndCondition}
                        name={'devicePaymentAgrement_' + id}
                        id={'devicePaymentAgrement_' + id}
                        labelId={'devicePaymentAgrement_title_' + id}
                        cqContent={this.props.cqContent}
                        label={renderHTML(this.props.cqContent.label.DT_OD_CHECKOUT_TC_DPP_AGREEMENT_CONFIRMATION)}
                      />
                    </div>
                  ))
                }

                <div className="margin10 onlyTopMargin background_FF">
                  <HumAgreement {...this.props} />
                </div>

                {/* TradeIn Agreement */}
                {this.props.tradeInPromoDetails !== null && this.props.termsAndConditionsInfo.tradeinTermsandConditions !== null &&
                  <Agreement
                    terms={this.props.termsAndConditionsInfo.tradeinTermsandConditions}
                    name="tradeinAgreement"
                    id="tradeinAgreement"
                    labelId="tradeinAgreement_title"
                    label={this.props.cqContent.label.DT_OD_CHECKOUT_TC_TRADE_IN_AGREEMENT_CONFIRMATION}
                  />
                }

                {/* CPC  - Partial Monthly Charges Agreement */}
                {this.props.termsAndConditionsInfo.partialMonthChargesText !== null &&
                  <Agreement
                    name="partialMonthChargesAgreement"
                    id="partialMonthChargesAgreement"
                    labelId="partialMonthChargesAgreement_title"
                    label={this.props.termsAndConditionsInfo.partialMonthChargesText}
                  />
                }

                {/* CPC  - Monthly Allowence / Promotion Text Agreement */}
                {this.props.termsAndConditionsInfo.promotionTextCPC !== null &&
                  <Agreement
                    name="promotionTextCPCAgreement"
                    id="promotionTextCPCAgreement"
                    labelId="promotionTextCPCAgreement_title"
                    label={this.props.termsAndConditionsInfo.promotionTextCPC}
                  />
                }

                {/* EPP Agreement */}
                {this.props.termsAndConditionsInfo.eppTermsAndConditions !== null &&
                  <Agreement
                    terms={renderHTML(this.props.termsAndConditionsInfo.eppTermsAndConditions)}
                    name="eppAgreement"
                    id="eppAgreement"
                    labelId="eppAgreement_title"
                    label={this.props.cqContent.label.DT_OD_CHECKOUT_TC_EPP_AGREEMENT_CONFIRMATION}
                  />
                }

                {/* Customer Agreement */}
                {this.props.termsAndConditionsInfo.agreementText !== null &&
                  <Agreement
                    terms={this.props.termsAndConditionsInfo.agreementText}
                    name="custAgreement"
                    id="custAgreement"
                    labelId="custAgreement_title"
                    label={this.props.cqContent.label.DT_OD_CHECKOUT_TC_CUSTOMER_AGREEMENT_CONFIRMATION}
                  />
                }
              </div>
            }
            <p className="legal margin24 noSideMargin">{this.props.cqContent.label.DT_OD_CHECKOUT_TAX_DISCLAIMER}</p>
          </div>
          <div className="margin24 noSideMargin textAlignCenter">
            <button
              className="button primary large"
              onClick={this.props.submitOrder}
              analyticstrack="agreeTermsAndPlaceOrder-CTA"
              disabled={!this.props.valid || this.props.submitting}
            >
              Accept and complete purchase
            </button>
          </div>

        </div>
      </Modal >
    );
  }
}
AgreementSection.propTypes = {
  cqContent: PropTypes.object,
  termsAndConditionsInfo: PropTypes.object,
  tradeInPromoDetails: PropTypes.object,
  onCloseModal: PropTypes.func,
  invalidateAsyncFetch: PropTypes.func,
  submitOrder: PropTypes.func,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
};

// export default AgreementSection;
export default reduxForm({
  form: 'agreementForm',
  validate,
})(AgreementSection);
