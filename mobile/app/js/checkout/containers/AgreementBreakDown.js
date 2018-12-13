/* eslint-disable no-unused-expressions */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AgreementBreakDown from './../components/AgreementBreakDown';
import * as actionCreators from '../actions';


const getAgreements = (termsAndConditionsInfo, showTradeInTerms) => {
  const agreementFields = [];
  // make all customer agreement required

  if (termsAndConditionsInfo !== null) {
    if (termsAndConditionsInfo.agreementText !== null) {
      agreementFields.push('customerAgreement');
    }

    if (termsAndConditionsInfo.humAgreement !== null) {
      agreementFields.push('humAgreement');
    }

    // make all edgeTerms checkboxes required
    termsAndConditionsInfo.edgeTerms !== null && termsAndConditionsInfo.edgeTerms.forEach((edgeTerm, id) => {
      agreementFields.push('devicePaymentAgrement_' + id);
    });

    // make eppTermsAndConditions checkbox required
    if (termsAndConditionsInfo.eppTermsAndConditions !== null) {
      agreementFields.push('eppAgreement');
    }

    // make trade-in checkbox required
    if (showTradeInTerms !== null) {
      agreementFields.push('tradeinAgreement');
    }
    if (termsAndConditionsInfo.partialMonthChargesText !== null) {
      agreementFields.push('partialMonthChargesAgreement');
    }
    if (termsAndConditionsInfo.promotionTextCPC !== null) {
      agreementFields.push('promotionTextCPCAgreement');
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
    isTradeInEnabled: (window.siteId && typeof (data.enableTradeInForAgent) !== 'undefined') ? data.enableTradeInForAgent === true : true,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AgreementBreakDown);
