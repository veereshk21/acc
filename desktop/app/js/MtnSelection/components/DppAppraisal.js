import { Grid, Row, Col } from 'react-flexbox-grid';
import { reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import React from 'react';
import renderHTML from 'react-render-html';

import { history } from './../../store';
import * as Constants from '../constants';
import AsyncComponent from '../../common/AsyncComponent';
import Notification from './../../common/Notification/Notification';

import deviceImgNA from '../../../images/device_placeHolder.svg';

const Button = AsyncComponent(() => import('../../common/Button/Button'));
const Loader = AsyncComponent(() => import('../../common/Loader/Loader'));
const FindMyDeviceWarning = AsyncComponent(() => import('./FindMyDeviceWarning'));
const Checkbox = AsyncComponent(() => import('./../../common/Checkbox/index'));

class DppAppraisal extends React.Component {
  static propTypes = {
    selectedMDN: PropTypes.object,
    selectedOption: PropTypes.string,
    router: PropTypes.object,
    cqJSON: PropTypes.object,
    submitAgreementResponse: PropTypes.object,
    submitAgreement: PropTypes.func,
    changeMDNSelectionView: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onQualificationsLink = this.onQualificationsLink.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
    this.onDPPUpgrade = this.onDPPUpgrade.bind(this);
    this.state = {
      buttonDisabled: true,
      isFetching: false,
      showFindMyDeviceInfo: false,
    };
  }

  componentWillMount() {
    if (this.props.selectedMDN.upgradeEligbile === 'false') {
      this.props.router.push('/');
    } else if (this.props.selectedMDN.loanInfo &&
      this.props.selectedMDN.loanInfo.edgeUpRequiredPercentage === 100) {
      this.props.router.push(`/dppAgreement?mdn=${this.props.selectedMDN.mtn}`);
    }
  }

  componentDidMount() {
    this.props.changeMDNSelectionView(Constants.DPP_SUMMARY_VIEW);
    window.onpopstate = this.onBackButtonEvent;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.formData.toJS().selectAppraiselConditions && newProps.formData.toJS().selectAppraiselConditions.values) {
      this.state.buttonDisabled = !newProps.formData.toJS().selectAppraiselConditions.values.selectAppraiselConditions;
      this.state.showFindMyDeviceInfo = newProps.formData.toJS().selectAppraiselConditions.values.selectAppraiselConditions;
    }
    return true;
  }

  shouldComponentUpdate(newProps) {
    if (newProps.mdnSelectionView === Constants.QUALIFICATIONS_VIEW) {
      this.props.router.push('/dppAppraisalQualification');
      return false;
    }
    if (newProps.submitAgreementResponse && newProps.submitAgreementResponse.statusCode === '00' && !newProps.submitAgreementResponse.output.findMyDeviceTurnedOff) {
      window.location = newProps.submitAgreementResponse.output.redirectURL;
      return false;
    }
    return true;
  }

  onBackButtonEvent(e) {
    e.preventDefault();
    history.push(`/dppAgreement?mdn=${this.props.selectedMDN.mtn}`);
  }

  onQualificationsLink(event) {
    event.preventDefault();
    this.props.changeMDNSelectionView(Constants.QUALIFICATIONS_VIEW);
    // this.props.router.push('/dppAppraisalQualification');
  }

  onDPPUpgrade() {
    this.setState({
      isFetching: true,
    });
    this.props.submitAgreement(
      this.props.selectedMDN.mtn,
      this.props.selectedOption,
      this.props.selectedMDN.deviceType,
      this.props.selectedMDN.brand,
      this.props.selectedMDN.deviceId
    );
  }

  render() {
    const { selectedMDN, submitAgreementResponse, cqJSON } = this.props;
    const hasEntity = new RegExp(/&(?:[a-z]+|#x?\d+);/gi);
    if (submitAgreementResponse && submitAgreementResponse.statusCode === '00' && submitAgreementResponse.output.findMyDeviceTurnedOff) {
      return <FindMyDeviceWarning redirectURL={submitAgreementResponse.output.redirectURL} cqJSON={cqJSON} />;
    }
    return (
      <section className="section group grid">
        <Grid fluid>
          {this.state.isFetching && <Loader />}
          <Row className="pad18 noSidePad">
            <Col sm={9} md={9} lg={9}>
              <h1>Monthly Device Payment Agreement Summary</h1>
            </Col>
          </Row>
          <Row className="topButtonBar background_gray_one">
            <Col sm={3} md={3} lg={3}>
              <Row>
                <Col xs={12}>
                  <Button
                    type="button"
                    className="secondary margin20 onlyRightMargin large"
                    analyticstrack="select-dppAppraisal-goBack-CTA"
                    onClick={() => window.history.back('back')}
                  >
                    {cqJSON.label.DT_OD_MDN_DPP_APPRAISAL_BACK_TEXT}
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
                    className={`button large ${this.state.buttonDisabled ? 'disabled' : ''}`}
                    disabled={this.state.buttonDisabled}
                    analyticstrack="select-dppAppraisal-upgradeNow-CTA"
                    onClick={this.onDPPUpgrade}
                  >
                    { cqJSON.label.DT_OD_MDN_DPP_AGREEMENT_UPGRADE_NOW }
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col sm={4} md={4} lg={4}>
              <div className="section group min-height500">
                <Row className=" min-height500 justifyContentCenter pad36 onlyTopPad" center="xs">
                  <Col xs={12}>
                    <div className=" ">
                      <div>
                        <img src={(selectedMDN.imageUrl !== null) ? `${selectedMDN.imageUrl}&wid=165&hei=300` : deviceImgNA} alt="Selected Device" className={(selectedMDN.imageUrl === null) ? 'mtnDefaultImg' : ''} />
                      </div>
                      <div className="margin5 onlyBottomMargin">
                        <Row className="pad10 onlyBottomPad  fontSize_4 bold justifyContentCenter" >
                          <span className="pad5 block onlyTopPad">{selectedMDN.displayMtn}</span>
                        </Row>
                        <Row className="pad20 onlyTopPad fontSize_4 bold justifyContentCenter">
                          {selectedMDN.nickname}&apos;s <span className="pad5 onlyLeftPad" dangerouslySetInnerHTML={{ __html: selectedMDN.displayDeviceName }} />
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={8} xs={8} className="">
              <div className="pad30 onlyLeftPad">
                <div className="">
                  <div className="">
                    <div
                      className="fontSize_10 pad5 onlyBottomPad bold"
                      dangerouslySetInnerHTML={{ __html: cqJSON.label.DT_OD_MDN_DPP_APPRAISAL_TITLE }}
                    />
                  </div>
                  <div className="pad24 onlyTopPad">
                    <form action="">
                      <div className=" clearfix">
                        <div className="floatLeft" style={{ margin: '10px 20px 0 0' }}>
                          <Checkbox
                            name="selectAppraiselConditions"
                            id="selectAppraiselConditions"
                            analyticstrack="select-selectAppraiselConditions-checkbox"
                          />
                        </div>
                        <div className="floatLeft span_9_of_12 pad6 noLeftPad">
                          <span className="fontSize_6 bold">
                            {cqJSON.label.DT_OD_MDN_DPP_APPRAISAL_QUALIFICATIONS_TEXT + ' '}
                            {cqJSON.label.DT_OD_MDN_DPP_APPRAISAL_QUALIFICATIONS_LINK_TEXT}
                          </span>
                        </div>
                        <div className="pad48 onlyTopPad margin30 onlyLeftMargin">
                          <ul className="plainList pad6 sidePadOnly" style={{ listStyle: 'inside' }} dangerouslySetInnerHTML={{ __html: renderHTML(this.props.cqJSON.html.DT_OD_MDN_DPP_QUALIFICATIONS_DESCRIPTION) }} />
                        </div>
                      </div>
                    </form>
                    <div className=" pad18 onlyTopPad" dangerouslySetInnerHTML={{ __html: (hasEntity.test(cqJSON.html.DT_OD_MDN_DPP_APPRAISAL_DESCRIPTION)) ? renderHTML(cqJSON.html.DT_OD_MDN_DPP_APPRAISAL_DESCRIPTION) : cqJSON.html.DT_OD_MDN_DPP_APPRAISAL_DESCRIPTION }} />
                    {this.state.showFindMyDeviceInfo &&
                    <Notification message={this.props.cqJSON.label.DT_OD_MDN_FIND_MY_DEVICE_DESCRIPTION} />
                    }
                    <div className="pad36 textAlignRight">
                      <Button
                        type="button"
                        className={`button large ${this.state.buttonDisabled ? 'disabled' : ''}`}
                        disabled={this.state.buttonDisabled}
                        analyticstrack="select-dppAppraisal-upgradeNow-CTA"
                        onClick={this.onDPPUpgrade}
                      >
                        { cqJSON.label.DT_OD_MDN_DPP_AGREEMENT_UPGRADE_NOW }
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}

export default reduxForm({
  form: 'selectAppraiselConditions',
})(DppAppraisal);
