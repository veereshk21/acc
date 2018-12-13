import { Grid, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import { hashHistory } from './../../store';
import LimitExceeded from './../components/limitExceeded';
// import MDNSelection from './../components/mdnSelection';
import AsyncComponent from '../../common/AsyncComponent';

const MDNSelection = AsyncComponent(() => import('./../components/mdnSelection'));

export default class mainView extends React.Component {
  static propTypes = {
    pastDueAccount: PropTypes.bool,
    pastDueAccepted: PropTypes.bool,
    accountLevelInEligibleDetails: PropTypes.object,
    cqJSON: PropTypes.object,
    mdnDetailsList: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
    submitAgreement: PropTypes.func,
    changeMDNSelectionView: PropTypes.func,
    changeSelectedMDN: PropTypes.func,
    upgradeWithOffer: PropTypes.func,
    getLoanInfoPreOrder: PropTypes.func,
    preOrderResponse: PropTypes.object,
    ajaxCallUrl: PropTypes.string,
    ajaxCallSelectedMTN: PropTypes.string,
    selectedMDN: PropTypes.object,
    mainTitle: PropTypes.string,
    selectedMdnDetails: PropTypes.object,
    changeSelectedTransferMDN: PropTypes.func,
    transferUpgrade: PropTypes.object,
    formData: PropTypes.object,
    transferTakerMTNs: PropTypes.array,
    actionSelected: PropTypes.string,
    showModal: PropTypes.bool,
    showModalValue: PropTypes.func,
    showErrorNotification: PropTypes.func,
    hideNotification: PropTypes.func,
    sharedCartInfo: PropTypes.object,
    clearCart: PropTypes.func,
    cancelPendingOrder: PropTypes.func,
    showEUPPendingConfirmation: PropTypes.bool,
    isFetchingModal: PropTypes.bool,
    transferObject: PropTypes.object,
    selectedTransferMdn: PropTypes.string,
    transferMdnDetails: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {

    };
  }


  componentDidMount() {
    /* Past dur redirection */
    if (this.props.pastDueAccount && !this.props.pastDueAccepted) {
      hashHistory.push('/pastDue');
    }

    /* Account ineligible redirection to generic error */
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
    const { mdnDetailsList, transferObject } = this.props;
    const accountLevelInEligibleDetails = this.props.accountLevelInEligibleDetails ? this.props.accountLevelInEligibleDetails.toJS() : this.props.accountLevelInEligibleDetails;


    if (mdnDetailsList) {
      if (accountLevelInEligibleDetails !== null && accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails !== null && accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode === 'CART_DEVICE_MAX_LIMIT_REACHED') {
        return (
          <div className="grid">
            <Grid fluid>
              <Row>
                <LimitExceeded
                  inEligibilityCode={accountLevelInEligibleDetails.accountLevelEUPInEligibleDetails.accountLevelInEligibleCode}
                  cqJSON={this.props.cqJSON}
                />
              </Row>
            </Grid>
          </div>);
      }
      return (
        <div className="grid">
          <MDNSelection
            mdnDetailsList={this.props.mdnDetailsList}
            mainTitle={this.props.mainTitle}
            changeMDNSelectionView={this.props.changeMDNSelectionView}
            changeSelectedMDN={this.props.changeSelectedMDN}
            upgradeWithOffer={this.props.upgradeWithOffer}
            submitAgreement={this.props.submitAgreement}
            accountLevelInEligibleDetails={this.props.accountLevelInEligibleDetails}
            cqJSON={this.props.cqJSON}
            selectedMDN={this.props.selectedMDN}
            ajaxCallSelectedMTN={this.props.ajaxCallSelectedMTN}
            getLoanInfoPreOrder={this.props.getLoanInfoPreOrder}
            ajaxCallUrl={this.props.ajaxCallUrl}
            preOrderResponse={this.props.preOrderResponse}
            selectedMdnDetails={this.props.selectedMdnDetails}
            changeSelectedTransferMDN={this.props.changeSelectedTransferMDN}
            transferUpgrade={this.props.transferUpgrade}
            formData={this.props.formData}
            transferTakerMTNs={this.props.transferTakerMTNs}
            actionSelected={this.props.actionSelected}
            showModal={this.props.showModal}
            showModalValue={this.props.showModalValue}
            showErrorNotification={this.props.showErrorNotification}
            hideNotification={this.props.hideNotification}
            sharedCartInfo={this.props.sharedCartInfo}
            clearSharedCart={this.props.clearCart}
            cancelPendingOrder={this.props.cancelPendingOrder}
            showEUPPendingConfirmation={this.props.showEUPPendingConfirmation}
            isFetchingModal={this.props.isFetchingModal}
            transferObject={transferObject}
            selectedTransferMdn={this.props.selectedTransferMdn}
            transferMdnDetails={this.props.transferMdnDetails}
          />
        </div>);
    } else if (this.props.accountLevelInEligibleDetails !== null && this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails') && this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleCode') === 'CASH_ONLY') {
      return (
        <div className="grid">
          <Grid fluid>
            <Row>
              {<LimitExceeded
                inEligibilityCode={this.props.accountLevelInEligibleDetails.get('accountLevelEUPInEligibleDetails').get('accountLevelInEligibleCode')}
                cqJSON={this.props.cqJSON}
              />}
            </Row>
          </Grid>
        </div>);
    }
    return (<div />);
  }
}
