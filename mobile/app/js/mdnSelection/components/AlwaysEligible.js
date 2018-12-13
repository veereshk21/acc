import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from '../../common/Button/Button';
import * as Constants from '../constants';
import Loader from '../../common/Loader/Loader';
import { hashHistory } from './../../store';
import Title from '../../common/Title/Title';
import HorizontalRule from '../../common/HorizontalRule';

export default class AlwaysEligible extends React.Component {
  constructor(props) {
    super(props);
    // this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
    this.state = {
      isFetching: false,
    };
  }

  /* --- Component Lifecycle Methods --- */
  componentWillMount() {
    // MDN is not eligible, take them back to main selection page
    // console.log('componentWillMount', this.props.selectedMDN.upgradeEligbile);
    if (!this.props.selectedMDN.upgradeEligbile) {
      hashHistory.push('/'); // eslint-disable-line
    }
  }

  shouldComponentUpdate(newProps) {
    if (newProps.submitAgreementResponse && newProps.submitAgreementResponse.output && newProps.submitAgreementResponse.statusCode === '00') {
      const { redirectURL, selectedMTN } = newProps.submitAgreementResponse.output;
      const queryPresence = redirectURL.indexOf('?') === -1 ? '?' : '&';
      // hashHistory.replace('/', '/alwaysEligible');
      this.setState({
        isFetching: false,
      });
      if (window.sessionStorage.getItem('loaded')) {
        window.sessionStorage.setItem('loaded', 'false');
      }
      window.location = `${redirectURL + queryPresence}selectedMTN=${selectedMTN}`;
      return false;
    }
    return true;
  }

  /**
     * Event handler for when the user clicks on upgrade button
     * @param event - the event
     */
  alwaysEligibleUpgrade = () => {
    const { submitAgreement, selectedMDN, ajaxCallUrl } = this.props;
    submitAgreement(selectedMDN.mtn, Constants.UPGRADE, selectedMDN.deviceType, selectedMDN.brand, selectedMDN.deviceId, ajaxCallUrl);
  }

  render() {
    const { selectedMDN, cqJSON } = this.props;
    return (
      <Grid className="pad32">
        {this.state.isFetching && <Loader />}

        <Row>
          <Col xs={12}>
            <Title
              dangerouslySetInnerHTML={{ __html: selectedMDN.twoYearContract.mtnSummaryPageTitle }}
            />
            <HorizontalRule />
          </Col>

          <Col xs={12}>
            <div className="background_primary width100 progressBar background_CC">
              <div
                className="progressBar background_gray_six"
                style={{ width: `${selectedMDN.twoYearContract.daysPercentage}%` }}
              />
            </div>
            <Row className="margin18 onlyTopMargin">
              <Col xs={6} >
                {selectedMDN.twoYearContract.daysRemainingText}
              </Col>
              <Col xs={6} className="textAlignRight" >
                {selectedMDN.twoYearContract.totalPrice} {cqJSON.label.OD_MDN_2_YEAR_LBL}
              </Col>
            </Row>
            <HorizontalRule y={1} color="#D8DADA" />
          </Col>
          <Col xs={12}>
            <p className="fontDisplayMedium">
              {selectedMDN.twoYearContract.mtnSummaryPageSubTitle}
            </p>
            <span className="color_gray_six">{selectedMDN.twoYearContract.description}</span>
          </Col>
        </Row>
        <Row className="footerFixed">
          <Col xs={12}>
            <Button
              type="button"
              className={'button centerBlock ' + this.state.buttonDisabled}
              disabled={this.state.buttonDisabled}
              onClick={this.alwaysEligibleUpgrade}
              analyticstrack="alwasys-eligible-upgrade"
            >{cqJSON.label.OD_MDN_UPGRADE_EARLY_BTN}
            </Button>
            <div className="pad18 noSidePad textAlignLeft">
              {selectedMDN.twoYearContract.deviceAgreementLink ?
                <a className="link" analyticstrack="device-agreement" href={selectedMDN.twoYearContract.deviceAgreementLink}>{selectedMDN.twoYearContract.deviceAgreementText}</a>
                : selectedMDN.twoYearContract.deviceAgreementText
              }
            </div>
          </Col>
        </Row>
      </Grid >
    );
  }
}

AlwaysEligible.propTypes = {
  selectedMDN: PropTypes.object,
  cqJSON: PropTypes.object,
  submitAgreement: PropTypes.func,
  ajaxCallUrl: PropTypes.string,
};
