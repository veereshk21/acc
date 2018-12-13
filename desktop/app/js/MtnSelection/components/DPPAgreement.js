import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import { hashHistory } from './../../store';
import * as Constants from '../constants';
import AsyncComponent from '../../common/AsyncComponent';
import DppAgreementOptions from './DPPAgreementOptions';
import Notification from './../../common/Notification/Notification';

import deviceImgNA from '../../../images/device_placeHolder.svg';

const Loader = AsyncComponent(() => import('../../common/Loader/Loader'));
const Button = AsyncComponent(() => import('../../common/Button/Button'));
const ChatAndC2C = AsyncComponent(() => import('../../common/ChatAndC2C'));


export default class DppAgreement extends React.Component {
  static propTypes = {
    selectedMDN: PropTypes.object,
    router: PropTypes.object,
    cqJSON: PropTypes.object,
    submitAgreement: PropTypes.func,
    changeMDNSelectionView: PropTypes.func,
    ajaxCallUrl: PropTypes.string,
    // showErrorNotification: PropTypes.func,
    hideNotification: PropTypes.func,
  };

  constructor(props) {
    super(props);
    if ((props.selectedMDN.loanInfo && props.selectedMDN.loanInfo.edgeUpRequiredPercentage === 100) || !props.edgeEligible) {   // eslint-disable-line
      // If user needs to pay 100% of the loadn in order to edgeup it is a buy out scenario
      this.selectedOption = Constants.DPP_BUYOUT_ONLY;
      this.UpgradeReadyClass = 'is-hidden';
      this.state = { buttonDisabled: false };
    } else {
      this.selectedOption = null;
      this.UpgradeReadyClass = '';
      this.state = { buttonDisabled: true };
    }
    this.payContent = '';
    this.dppUpgrade = this.dppUpgrade.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
    this.dppOptionChange = this.dppOptionChange.bind(this);
    this.state = {
      isFetching: false,
      buttonDisabled: !(this.selectedOption),
      showReturnContent: false,
      showKeepContent: false,
    };
  }

  /* --- Component Lifecycle Methods --- */
  componentWillMount() {
    // MDN is not eligible, take them back to main selection page
    if (!this.props.selectedMDN.upgradeEligbile) {
      this.props.router.push('/');
    }
  }

  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent;
    if (this.props.selectedMDN) {
      this.props.hideNotification();
      /* if (window.showMisMatchNotification) {
        this.props.showErrorNotification(window.showMisMatchNotification);
      } else {
        this.props.hideNotification();
      } */
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.formData.toJS().dppOption && newProps.formData.toJS().dppOption.values) {
      this.state.buttonDisabled = false;
      this.selectedOption = newProps.formData.toJS().dppOption.values.dppOption;
      this.payContent = ((this.selectedOption === Constants.DPP_RETURN) ? newProps.selectedMDN.loanInfo.returnOptionAmt : newProps.selectedMDN.loanInfo.keepOptionAmt) + this.props.cqJSON.label.DT_OD_MDN_DPP_NOTIFY_MSG;
      this.state.showReturnContent = (newProps.formData.toJS().dppOption.values.dppOption === Constants.DPP_RETURN) || false;
      this.state.showKeepContent = (newProps.formData.toJS().dppOption.values.dppOption === Constants.DPP_KEEP) || false;
    }
    return true;
  }

  shouldComponentUpdate(newProps) {
    if (newProps.mdnSelectionView === Constants.APPRAISAL_VIEW) {
      // User will be sent to DPP Appraisal page
      hashHistory.push(`/dppAppraisal?mdn=${newProps.selectedMDN.mtn}`);
      return false;
    }
    if (newProps.submitAgreementResponse && newProps.submitAgreementResponse.statusCode === '00') {
      // User has submited agreement, redirect to  url from response
      window.location = newProps.submitAgreementResponse.output.redirectURL;
      return false;
    }
    return true;
  }

  /* --- Event Handlers --- */
  onBackButtonEvent(e) {
    e.preventDefault();
    this.props.changeMDNSelectionView(Constants.MDN_SELECTION_VIEW);
    // hashHistory.push('/');
    // this.props.changeMDNSelectionView(Constants.MDN_SELECTION_VIEW);
  }

  /**
   * Event handler for when user changes their DPP option
   * @param e - the event
   */
  dppOptionChange(option, value, e) {
    if (!this.selectedOption) {
      // to avoid a re-render
      this.setState({ buttonDisabled: false });
    }
    this.selectedOption = e.target.value;
    this.payContent = value;
    this.setState({ showReturnContent: option === Constants.DPP_RETURN || false });
    this.setState({ showKeepContent: option === Constants.DPP_KEEP || false });
  }

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
    const { selectedMDN } = this.props;
    return (
      <section className="section group grid">
        <Grid fluid>
          {this.state.isFetching && <Loader />}
          <Row className="pad18 noSidePad">
            <Col sm={12} md={12} lg={12}>
              <h1>Monthly Device Payment Agreement Summary</h1>
            </Col>
          </Row>
          <Row className="topButtonBar background_gray_one">
            <Col sm={3} md={3} lg={3}>
              <Row>
                <Col xs={12}>
                  <Button
                    type="button"
                    className="button secondary large"
                    analyticstrack="select-dppAgreement-goBack-CTA"
                    onClick={() => window.history.back()}
                  >
                    Back
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col sm={6} md={6} lg={6} className="pad6 onlyTopPad">
              <Row>
                <Col xs={12} className="bold fontSize_10 textAlignCenter">
                  Select Upgrade Option
                </Col>
              </Row>
            </Col>
            <Col sm={3} md={3} lg={3}>
              <Row>
                <Col xsOffset={5} xs={7}>
                  <Button
                    type="button"
                    className={'button margin12 onlyLeftMargin primary large ' + this.state.buttonDisabled}
                    disabled={this.state.buttonDisabled}
                    analyticstrack="select-dppAgreement-upgradeNow-CTA"
                    onClick={this.dppUpgrade}
                  >
                    {this.props.cqJSON.label.DT_OD_MDN_UPGRADE_BTN}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="" style={{ width: '100%' }}>
            <Col sm={4} md={4} lg={4}>
              <div className="section group min-height500">
                <Row className="min-height500 pad36 onlyTopPad textAlignCenter">
                  <Col xs={12}>
                    <div>
                      <div className="textAlignCenter">
                        <img src={(selectedMDN.imageUrl !== null) ? `${selectedMDN.imageUrl}&wid=165&hei=300` : deviceImgNA} alt="Selected Device" className={(selectedMDN.imageUrl === null) ? 'mtnDefaultImg' : ''} />
                      </div>
                      <div className="margin5 onlyBottomMargin">
                        <Row className="pad10 onlyBottomPad fontSize_4 justifyContentCenter" >
                          <span className="pad5 block onlyTopPad">{selectedMDN.displayMtn}</span>
                        </Row>
                        <Row className="pad20 onlyTopPad fontSize_4 bold justifyContentCenter" >
                          {selectedMDN.nickname} &lsquo;s <span className="pad5 onlyLeftPad" dangerouslySetInnerHTML={{ __html: selectedMDN.displayDeviceName }} />
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={8} xs={8} className="">
              <div className="pad30 onlyLeftPad">
                <div>
                  <div className="pad36 onlyTopPad">
                    <div
                      className="fontSize_8 pad10 onlyBottomPad bold"
                      dangerouslySetInnerHTML={{ __html: this.props.selectedMDN.loanInfo.subtitle }}
                    />
                    {selectedMDN.loanInfo.bogoPresent && selectedMDN.loanInfo.bogoUpgradeMessage &&
                      <Row middle="xs" className="width100 clearfix pad12 noSidePad background_yellow relative margin25 onlyBottomMargin">
                        <Col className="width5 font-icon_info_circle margin10 onlySideMargin floatLeft" />
                        <Col className="width90 floatLeft fontSize_1_3 bold " dangerouslySetInnerHTML={{ __html: selectedMDN.loanInfo.bogoUpgradeMessage }} />
                      </Row>
                    }
                    <div className="fontSize_3 color_666" dangerouslySetInnerHTML={{ __html: this.props.selectedMDN.loanInfo.keepOptionDescription }} />
                    <div className="fontSize_3 color_666" dangerouslySetInnerHTML={{ __html: this.props.selectedMDN.loanInfo.subtitleDescriptionText }} />
                  </div>

                  <div className="pad24 noSidePad width100">
                    <span className={'block ' + this.UpgradeReadyClass} style={{ marginLeft: `${this.props.selectedMDN.loanInfo.edgeUpRequiredPercentage}%` }} />
                    <div className="clearfix margin6 noSideMargin color_000">
                      <span className="span_6_of_12 block floatLeft">{this.props.selectedMDN.loanInfo.paidToDate}</span>
                      <span className="span_6_of_12 block floatLeft textAlignRight">{this.props.selectedMDN.loanInfo.paidAmountPercentage}% {this.props.cqJSON.label.DT_OD_MDN_LOAN_INFO_PAID_LABEL}</span>
                    </div>

                    <div className="background_gray_three width100 progressBar">
                      <div className="progressBar background_gray_six" style={{ width: `${this.props.selectedMDN.loanInfo.paidAmountPercentage}%` }} />
                      <div className="progressBarMarker" style={{ marginLeft: `${this.props.selectedMDN.loanInfo.paidAmountPercentage}%` }} />
                    </div>
                    <div className="clearfix margin6 noSideMargin color_000">
                      <span className="span_6_of_12 block bold floatLeft ">{this.props.selectedMDN.loanInfo.pendingInstallmentText}</span>
                      <span className="span_6_of_12 block bold floatRight textAlignRight">{this.props.selectedMDN.loanInfo.remainingAmountText}</span>
                    </div>
                  </div>
                  <DppAgreementOptions selectedOption={this.selectedOption} selectedMDN={this.props.selectedMDN} cqContent={this.props.cqJSON} />
                </div>
                <p className="margin12 noSideMargin fontSize_2">{this.props.cqJSON.label.DT_OD_CREDIT_AUTH_LEGAL_COPY}</p>
                {this.state.showKeepContent &&
                  <div>
                    {this.props.selectedMDN.loanInfo.keepOptionAmt ?
                      <Notification type="error" message={`${this.payContent} ${this.props.cqJSON.html.DT_OD_PAY_OFF_DEVICE_PAYMENT_AGREEMENT_MESSAGE}`} /> :
                      <Notification type="error" message={`${this.props.cqJSON.html.DT_OD_PAY_OFF_DEVICE_PAYMENT_AGREEMENT_MESSAGE}`} />
                    }
                  </div>
                }
                {this.state.showReturnContent &&
                  <div>
                    {this.props.selectedMDN.loanInfo.returnOptionAmt &&
                      <Notification type="error" message={`${this.payContent} ${this.props.cqJSON.html.DT_OD_PAY_OFF_DEVICE_PAYMENT_AGREEMENT_MESSAGE}`} />
                    }
                  </div>
                }
                <div className="pad20 textAlignRight">
                  <Button
                    type="button"
                    className={'button margin12 onlyLeftMargin primary large ' + this.state.buttonDisabled}
                    disabled={this.state.buttonDisabled}
                    analyticstrack="select-dppAgreement-upgradeNow-CTA"
                    onClick={this.dppUpgrade}
                  >
                    {this.props.cqJSON.label.DT_OD_MDN_UPGRADE_BTN}
                  </Button>

                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}
