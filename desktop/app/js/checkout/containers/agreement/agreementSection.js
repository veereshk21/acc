import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AgreementSection from '../../components/agreement/agreementSection';
import * as actionCreators from '../../actions';


const getAgreements = (termsAndConditionsInfo, tradeInPromoDetails) => {
  const agreementFields = [];
  // make all customer agreement required

  if (termsAndConditionsInfo !== null) {
    if (termsAndConditionsInfo.agreementText !== null) {
      agreementFields.push('custAgreement');
    }

    if (termsAndConditionsInfo.humAgreement !== null) {
      agreementFields.push('humAgreement');
    }

    // make all edgeTerms checkboxes required
    if (termsAndConditionsInfo.edgeTerms !== null) {
      termsAndConditionsInfo.edgeTerms.forEach((edgeTerm, id) => {
        agreementFields.push('devicePaymentAgrement_' + id);
      });
    }

    // make eppTermsAndConditions checkbox required
    if (termsAndConditionsInfo.eppTermsAndConditions !== null) {
      agreementFields.push('eppAgreement');
    }

    // make trade-in checkbox required
    if (tradeInPromoDetails !== null && termsAndConditionsInfo.tradeinTermsandConditions !== null) {
      agreementFields.push('tradeinAgreement');
    }
    if (termsAndConditionsInfo.partialMonthChargesText !== null) {
      agreementFields.push('partialMonthChargesAgreement');
    }
    if (termsAndConditionsInfo.promotionTextCPC !== null) {
      agreementFields.push('promotionTextCPCAgreement');
    }
    if (termsAndConditionsInfo.deviceProtectionTC !== null) {
      agreementFields.push('deviceProtectionTC');
    }
  }
  return agreementFields;
};

function mapStateToProps(state) {
  const data = state.get('orderDetails').toJS();
  const agreementCheckboxState = state.get('customerAgreement');
  const cqContent = state.get('cqContent').toJS();
  const tradeInPromoDetails = data.tradeInPromoDetails || data.transformedTradeInPromoDetails;
  return {
    cqContent,
    termsAndConditionsInfo: data.termsAndConditionsInfo,
    agreementFields: getAgreements(data.termsAndConditionsInfo, tradeInPromoDetails),
    tradeInPromoDetails,
    agreementState: agreementCheckboxState,
    initialValues: agreementCheckboxState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AgreementSection);
