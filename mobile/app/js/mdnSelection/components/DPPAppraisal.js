import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { hashHistory } from './../../store';
import * as Constants from '../constants';
import Button from '../../common/Button/Button';
import FindMyDeviceWarning from './findMyDeviceWarning';
import Title from '../../common/Title/Title';
import HorizontalRule from '../../common/HorizontalRule';
import RadioButton from '../../common/RadioButton/';

export default class DPPAppraisal extends React.Component {
  constructor(props) {
    super(props);
    this.onQualificationsLink = this.onQualificationsLink.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
    this.agreedCheckBox = this.agreedCheckBox.bind(this);
    this.onDPPUpgrade = this.onDPPUpgrade.bind(this);
    this.state = {
      buttonDisabled: true,
      isFetching: false,
    };
  }

  /* --- Component Lifecycle Methods --- */
  componentWillMount() {
    if ((this.props.selectedMDN == undefined) || (this.props.selectedMDN.upgradeEligbile == undefined) || this.props.selectedMDN.upgradeEligbile === 'false') {
      hashHistory.push('/');
    } else if (this.props.selectedMDN.loanInfo &&
      this.props.selectedMDN.loanInfo.edgeUpRequiredPercentage === 100) {
      hashHistory.push(`/dppAgreement?mtn=${this.props.selectedMDN.mtn}`);
    }
  }

  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent;
  }

  shouldComponentUpdate(newProps) {
    if (newProps.mdnSelectionView === Constants.QUALIFICATIONS_VIEW) {
      hashHistory.push('/dppAppraisalQualification');
      return false;
    }
    if (newProps.submitAgreementResponse && newProps.submitAgreementResponse.statusCode === '00' && !newProps.submitAgreementResponse.output.findMyDeviceTurnedOff) {
      // hashHistory.replace('/', '/dppAppraisal');
      // hashHistory.replace('/', '/dppAppraisalQualification');
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
    this.props.changeMDNSelectionView(Constants.DPP_VIEW);
  }

  /* --- Event Handlers --- */

  /**
   * Event handler for when the user clicks on the "good working condition" link,
   * it will trigger the action to change the view
   * @param event - the event
   */
  onQualificationsLink(event) {
    event.preventDefault();
    this.props.changeMDNSelectionView(Constants.QUALIFICATIONS_VIEW);
  }

  /**
   * Event handler for when the user clicks on the button to continue,
   * it will trigger the action to submit the dpp agreement (action for ajax call)
   * @param event - the event
   */
  onDPPUpgrade() {
    this.setState({
      isFetching: true,
    });
    this.props.submitAgreement(
      this.props.selectedMDN.mtn,
      this.props.selectedOption,
      this.props.selectedMDN.deviceType,
      this.props.selectedMDN.brand,
      this.props.selectedMDN.deviceId,
      this.props.ajaxCallUrl
    );
  }

  /**
  * Event handler for the agree checkbox, if the user has not agreed
  * the button to continue must be disabled.
  * @param e - the event
  */
  agreedCheckBox(e) {
    if (e.target.checked) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  }

  render() {
    const { submitAgreementResponse, cqJSON } = this.props;
    if (submitAgreementResponse && submitAgreementResponse.statusCode === '00' && submitAgreementResponse.output.findMyDeviceTurnedOff) {
      return <FindMyDeviceWarning redirectURL={submitAgreementResponse.output.redirectURL} cqJSON={cqJSON} />;
    }
    return (
      <Grid className="pad32">
        <Row>
          <Col xs={12}>
            <Title>{cqJSON.label.OD_MDN_DPP_APPRAISAL_TITLE}</Title>
            <p className="margin18 onlyTopMargin">{cqJSON.label.OD_MDN_DPP_APPRAISAL_SUBTITLE}</p>
            <HorizontalRule />
          </Col>
          <Col xs={12}>
            <form action="">
              <RadioButton
                name="dppOption"
                id="dppOption"
                onChange={this.agreedCheckBox}
                analyticstrack="choose-dpp-apprisal"
              >
                <span>
                  {cqJSON.label.OD_MDN_DPP_APPRAISAL_QUALIFICATIONS_TEXT + ' '}
                  <a className="link" onClick={this.onQualificationsLink} analyticstrack="apprisal-qualification-view">
                    {cqJSON.label.OD_MDN_DPP_APPRAISAL_QUALIFICATIONS_LINK_TEXT}
                  </a>
                </span>
              </RadioButton>
            </form>
            <HorizontalRule y={1} color="#D8DADA" />
          </Col>
          <Col xs={12}>
            <div dangerouslySetInnerHTML={{ __html: cqJSON.html.OD_MDN_DPP_APPRAISAL_DESCRIPTION }} />
          </Col>
        </Row>
        <Row className="footerFixed">
          <Col xs={12}>
            <Button
              type="button"
              className={`button centerBlock large ${this.state.buttonDisabled ? 'disabled' : ''}`}
              disabled={this.state.buttonDisabled}
              onClick={this.onDPPUpgrade}
              analyticstrack="upgrade-apprisal-next"
            >
              {cqJSON.label.OD_MDN_DPP_APPRAISAL_NEXT_CTA}
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

DPPAppraisal.propTypes = {
  selectedMDN: PropTypes.object,
  selectedOption: PropTypes.string,
  // router: PropTypes.object,
  cqJSON: PropTypes.object,
  submitAgreementResponse: PropTypes.object,
  submitAgreement: PropTypes.func,
  changeMDNSelectionView: PropTypes.func,
  ajaxCallUrl: PropTypes.string,
};
