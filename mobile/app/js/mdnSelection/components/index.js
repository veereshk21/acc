import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from './../../store';
import MDNSelection from './mdnSelection';
import LimitExceeded from './LimitExceeded';
import InEligibleMtnError from './inEligibleMtnError';

export default class mainView extends React.Component {
  /* --- Component Lifecycle Methods --- */
  componentDidMount() {
    /* If the account is having pastdue and the same is not already accepted , redirect to pastdue page */
    if (this.props.pastDueAccount && !this.props.pastDueAccepted) {
      hashHistory.push('/pastDue');
    }

    /**
     * Redirect to generic error page if mtnDetailList is empty, except in case of user blocked scenarios(code 03) where mtnDetail list WILL BE empty
     * */
    if (!this.props.mdnDetailsList) {
      if (!(this.props.accountLevelInEligibleDetails && this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails') && this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleCode') === 'CASH_ONLY')) {
        hashHistory.push('/genericError');
      }
    }
  }

  shouldComponentUpdate(newProps) {
    if (newProps.submitAgreementResponse && newProps.submitAgreementResponse.statusCode === '00') {
      window.location = newProps.submitAgreementResponse.output.redirectURL;
      return false;
    }
    return true;
  }

  render() {
    // Main view for MDN Selection, user can choose which device to upgrade
    const { mdnDetailsList } = this.props;

    if (mdnDetailsList) {
      if (this.props.accountLevelInEligibleDetails !== null && this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails') && this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleCode') === 'CART_DEVICE_MAX_LIMIT_REACHED') {
        return (<LimitExceeded
          inEligibilityCode={this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleCode')}
          cqJSON={this.props.cqJSON}
        />);
      }
      if (this.props.selectedMDN && !this.props.selectedMDN.upgradeEligbile) {
        return (<InEligibleMtnError cqJSON={this.props.cqJSON} />);
      }
      return (<MDNSelection
        {...this.props}
        initAAL={this.props.initAAL}
        mdnDetailsList={this.props.mdnDetailsList}
        mainTitle={this.props.mainTitle}
        changeMDNSelectionView={this.props.changeMDNSelectionView}
        changeSelectedMDN={this.props.changeSelectedMDN}
        submitAgreement={this.props.submitAgreement}
        accountLevelInEligibleDetails={this.props.accountLevelInEligibleDetails}
        cqJSON={this.props.cqJSON}
        selectedMDN={this.props.selectedMDN}
        aalAttr={this.props.aalAttr}
        isByodAllowed={this.props.isByodAllowed}
        cartRedirect={this.props.cartRedirect}
        ajaxCallSelectedMTN={this.props.ajaxCallSelectedMTN}
        getLoanInfoPreOrder={this.props.getLoanInfoPreOrder}
        submitAddALineUrl={this.props.submitAddALineUrl}
        ajaxCallUrl={this.props.ajaxCallUrl}
        preOrderResponse={this.props.preOrderResponse}
      />);
    } else if (this.props.accountLevelInEligibleDetails !== null && this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails') && this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleCode') === 'CASH_ONLY') {
      return (<LimitExceeded
        inEligibilityCode={this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleCode')}
        cqJSON={this.props.cqJSON}
      />);
    }

    return (<div />);
  }
}

mainView.propTypes = {
  ajaxCallSelectedMTN: PropTypes.string,
  initAAL: PropTypes.func,
  mainTitle: PropTypes.string,
  cqJSON: PropTypes.object,
  cartRedirect: PropTypes.string,
  mdnDetailsList: PropTypes.array,
  submitAgreement: PropTypes.func,
  submitAddALineUrl: PropTypes.string,
  changeMDNSelectionView: PropTypes.func,
  changeSelectedMDN: PropTypes.func,
  aalAttr: PropTypes.object,
  pastDueAccount: PropTypes.bool,
  pastDueAccepted: PropTypes.bool,
  accountLevelInEligibleDetails: PropTypes.object,
  getLoanInfoPreOrder: PropTypes.func,
  ajaxCallUrl: PropTypes.string,
  preOrderResponse: PropTypes.object,
  selectedMDN: PropTypes.object,
  isByodAllowed: PropTypes.bool,
};

