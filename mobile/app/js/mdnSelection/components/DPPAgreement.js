import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { hashHistory } from './../../store';
import Button from '../../common/Button/Button';
import * as Constants from '../constants';
import DPPAgreementOptions from './DPPAgreementOptions';
import Loader from '../../common/Loader/Loader';
import Title from '../../common/Title/Title';
import HorizontalRule from '../../common/HorizontalRule';

export default class DPPAgreement extends React.Component {
  constructor(props) {
    super(props);
    if ((props.selectedMDN.loanInfo && props.selectedMDN.loanInfo.edgeUpRequiredPercentage === 100) || !props.edgeEligible) {
      // If user needs to pay 100% of the loadn in order to edgeup it is a buy out scenario
      this.selectedOption = Constants.DPP_BUYOUT_ONLY;
      this.UpgradeReadyClass = 'is-hidden';
      this.state = { buttonDisabled: false };
    } else {
      this.selectedOption = null;
      this.UpgradeReadyClass = '';
      this.state = { buttonDisabled: true };
    }
    this.dppUpgrade = this.dppUpgrade.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
    this.dppOptionChange = this.dppOptionChange.bind(this);
    this.state = {
      isFetching: false,
      buttonDisabled: !(this.selectedOption),
    };
  }
  componentWillMount() {
    // MDN is not eligible, take them back to main selection page
    if (!this.props.selectedMDN.upgradeEligbile) {
      hashHistory.push('/');
    }
  }

  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent;
  }

  shouldComponentUpdate(newProps) {
    if (newProps.mdnSelectionView === Constants.APPRAISAL_VIEW) {
      // User will be sent to DPP Appraisal page
      hashHistory.push(`/dppAppraisal?mdn=${newProps.selectedMDN.mtn}`);

      return false;
    }
    if (newProps.submitAgreementResponse && newProps.submitAgreementResponse.statusCode === '00') {
      // User has submited agreement, redirect to  url from response
      // hashHistory.replace('/', '/dppAgreement');
      this.setState({
        isFetching: false,
      });
      if (window.sessionStorage.getItem('loaded')) {
        window.sessionStorage.setItem('loaded', 'false');
      }
      window.location = newProps.submitAgreementResponse.output.redirectURL;
      return false;
    }
    return true;
  }

  onBackButtonEvent(e) {
    e.preventDefault();
    this.props.changeMDNSelectionView(Constants.MDN_SELECTION_VIEW);
  }

  /**
     * Event handler for when user changes their DPP option
     * @param e - the event
     */
  dppOptionChange(e) {
    this.setState({ buttonDisabled: false });
    this.selectedOption = e.target.value;
  }

  /**
     * Event handler for when the user clicks on upgrade button, will check which option the user has selected
     * @param event - the event
     */
  dppUpgrade() {
    const {
      changeMDNSelectionView, submitAgreement, selectedMDN, ajaxCallUrl,
    } = this.props;
    // Move to appraisal view if user selected to return device
    if (this.selectedOption === Constants.DPP_RETURN) {
      this.setState({
        isFetching: true,
      });
      changeMDNSelectionView(Constants.APPRAISAL_VIEW);
    } else if (this.selectedOption === Constants.DPP_KEEP || this.selectedOption === Constants.DPP_BUYOUT_ONLY) {
      this.setState({
        isFetching: true,
      });
      submitAgreement(selectedMDN.mtn, this.selectedOption, selectedMDN.deviceType, selectedMDN.brand, selectedMDN.deviceId, ajaxCallUrl);
    } else {
      // Todo: add some messaging asking the user to select an option
      this.setState({ buttonDisabled: true }); // making sure is disabled...
    }
  }

  render() {
    const { selectedMDN, cqJSON } = this.props;
    return (
      <Grid className="pad32">
        {this.state.isFetching && <Loader />}
        <Row>
          <Col xs={12} >
            <Title dangerouslySetInnerHTML={{ __html: selectedMDN.loanInfo.title }} />
            <p
              className="margin18 onlyTopMargin"
              dangerouslySetInnerHTML={{ __html: selectedMDN.loanInfo.subtitle }}
            />
            <HorizontalRule />
          </Col>
          <Col xs={12}>
            {selectedMDN.loanInfo.bogoPresent && selectedMDN.loanInfo.bogoUpgradeMessage &&
              <div className="fontSize_1 pad12 background_Orange" dangerouslySetInnerHTML={{ __html: selectedMDN.loanInfo.bogoUpgradeMessage }} />
            }
            {selectedMDN.loanInfo.deviceMismatchText &&
              <div className="fontSize_1 pad12 background_Orange" dangerouslySetInnerHTML={{ __html: selectedMDN.loanInfo.deviceMismatchText }} />
            }
            {(selectedMDN.loanInfo.bogoPresent || selectedMDN.loanInfo.deviceMismatchText) && <HorizontalRule y={1} color="#D8DADA" />}
          </Col>

          <Col xs={12}>
            <span
              className={'block ' + this.UpgradeReadyClass}
              style={{ marginLeft: `${selectedMDN.loanInfo.edgeUpRequiredPercentage}%` }}
            >
              <span className="margin-48 onlyLeftMargin block">{cqJSON.label.OD_MDN_DPP_AGREEMENT_UPGRADE_READY}</span>
              <span className="font-icon_arrowDown margin-6 onlyLeftMargin" />
            </span>
            <div className="background_primary width100 progressBar background_CC">
              <div
                className="progressBar background_gray_six"
                style={{ width: `${selectedMDN.loanInfo.paidAmountPercentage}%` }}
              />
            </div>
            <Row className="margin18 noSideMargin">
              <Col xs={6}>{selectedMDN.loanInfo.paidToDate} </Col>
              <Col xs={6} className="textAlignRight">{selectedMDN.loanInfo.totalPrice}</Col>
            </Row>
            <HorizontalRule y={1} color="#D8DADA" />
          </Col>
          <Col xs={12}>
            <DPPAgreementOptions
              selectedOption={this.selectedOption}
              selectedMDN={selectedMDN}
              dppOptionChange={this.dppOptionChange}
              edgeUpRequiredPercentage={selectedMDN.loanInfo.edgeUpRequiredPercentage}
            />
          </Col>
          <Col xs={12}>
            {selectedMDN.loanInfo.legalDisclaimer &&
              <p className="color_gray_six fontSize_1">{selectedMDN.loanInfo.legalDisclaimer}</p>
            }
            {((this.selectedOption === 'return' && selectedMDN.loanInfo.returnOptionAmt) || this.selectedOption === 'keep_buyout') &&
              <div className="width100 clearfix pad12 noSidePad background_Orange">
                <span className="width10 font-icon_info margin10 onlySideMargin floatLeft" />
                <span className="width80 floatLeft fontSize_1_3" dangerouslySetInnerHTML={{ __html: cqJSON.html.OD_MDN_PAY_OFF_DEVICE_PAYMENT_AGREEMENT_MESSAGE }} />
              </div>
            }
            <div className="textAlignCenter margin24 noSideMargin">
              <Button
                type="button"
                className={'primary width40 ' + this.state.buttonDisabled}
                disabled={this.state.buttonDisabled}
                onClick={this.dppUpgrade}
                analyticstrack="dpp-agreement-upgrade"
              >
                {cqJSON.label.OD_MDN_DPP_AGREEMENT_UPGRADE_CTA}
              </Button>
            </div>

            <div className="margin18 noSideMargin textAlignleft">
              {selectedMDN.loanInfo.deviceAgreementLink ?
                <a className="link" target="_blank" analyticstrack="deviceAgreementLink" href={selectedMDN.loanInfo.deviceAgreementLink}>{selectedMDN.loanInfo.deviceAgreementText}</a>
                : selectedMDN.loanInfo.deviceAgreementText
              }
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

DPPAgreement.propTypes = {
  selectedMDN: PropTypes.object,
  // router: PropTypes.object,
  cqJSON: PropTypes.object,
  changeMDNSelectionView: PropTypes.func,
  submitAgreement: PropTypes.func,
  edgeEligible: PropTypes.bool,
  ajaxCallUrl: PropTypes.string,
};
