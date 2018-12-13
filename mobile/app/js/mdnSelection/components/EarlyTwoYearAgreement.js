import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from '../../common/Button/Button';
import * as Constants from '../constants';
import Loader from '../../common/Loader/Loader';
import Title from '../../common/Title/Title';
import { hashHistory } from './../../store';
import HorizontalRule from '../../common/HorizontalRule';

export default class DPPAgreement extends React.Component {
  constructor(props) {
    super(props);

    this.UpgradeReadyClass = '';
    this.dppUpgrade = this.dppUpgrade.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
    this.state = {
      isFetching: false,
    };
  }

  /* --- Component Lifecycle Methods --- */
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
    if (newProps.submitAgreementResponse && newProps.submitAgreementResponse.statusCode === '00') {
      // User has submited agreement, redirect to  url from response
      // hashHistory.replace('/', '/earlyTwoYear');
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

  /* --- Event Handlers --- */
  onBackButtonEvent(e) {
    e.preventDefault();
    this.props.changeMDNSelectionView(Constants.MDN_SELECTION_VIEW);
  }


  /**
     * Event handler for when the user clicks on upgrade button, will check which option the user has selected
     * @param event - the event
     */
  dppUpgrade() {
    this.setState({
      isFetching: true,
    });
    this.props.submitAgreement(this.props.selectedMDN.mtn, Constants.EARLY_TWO_YEAR, this.props.selectedMDN.deviceType, this.props.selectedMDN.brand, this.props.selectedMDN.deviceId, this.props.ajaxCallUrl);
  }

  render() {
    return (
      <Grid className="pad32">
        {this.state.isFetching && <Loader />}

        <Row>
          <Col xs={12}>
            <Title>{this.props.selectedMDN.twoYearContract.title}</Title>
            <p className="margin18 onlyTopMargin" >{this.props.selectedMDN.twoYearContract.subTitle}</p>
            <HorizontalRule />
          </Col>

          <Col xs={12}>
            <div className="margin6 onlyBottomMargin">
              <div className="textAlignRight" >
                <span className="boldText color_000">{this.props.cqJSON.label.OD_MDN_END_DATE_LBL}</span>
                {this.props.selectedMDN.twoYearContract.endDate}
              </div>
            </div>
            <div className="background_primary width100 progressBar background_CC">
              <div
                className="progressBar background_gray_six"
                style={{ width: `${this.props.selectedMDN.twoYearContract.daysPercentage}%` }}
              />
            </div>
            <HorizontalRule y={1} color="#D8DADA" />
          </Col>
          <Col xs={12} className="color_gray_six">
            {this.props.selectedMDN.twoYearContract.description}
          </Col>
        </Row>
        <Row className="footerFixed">
          <Col xs={12}>
            <Button type="button" className="button width40 " onClick={this.dppUpgrade} analyticstrack="upgrade-early-two-yr-next">{this.props.cqJSON.label.OD_MDN_UPGRADE_BTN}</Button>
            <div className="pad18 textAlignLeft color_gray_six">
              {this.props.cqJSON.label.OD_MDN_PAYMENT_AGREEMENT_INFO}
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
  changeMDNSelectionView: PropTypes.func,
  submitAgreement: PropTypes.func,
  cqJSON: PropTypes.object,
  ajaxCallUrl: PropTypes.string,
};
