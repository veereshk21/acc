import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';

import { hashHistory } from './../../store';
import * as Constants from '../constants';
import AsyncComponent from '../../common/AsyncComponent';

const Button = AsyncComponent(() => import('../../common/Button/Button'));
const Loader = AsyncComponent(() => import('../../common/Loader/Loader'));

export default class DPPAgreement extends React.Component {
  static propTypes = {
    selectedMDN: PropTypes.object,
    changeMDNSelectionView: PropTypes.func,
    submitAgreement: PropTypes.func,
    cqJSON: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.UpgradeReadyClass = '';
    this.dppUpgrade = this.dppUpgrade.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
    this.state = {
      isFetching: false,
    };
  }

  componentWillMount() {
    if (!this.props.selectedMDN.upgradeEligbile) {
      hashHistory.push('/');
    }
  }

  componentDidMount() {
    window.onpopstate = this.onBackButtonEvent;
  }
  shouldComponentUpdate(newProps) {
    if (newProps.submitAgreementResponse && newProps.submitAgreementResponse.statusCode === '00') {
      window.location = newProps.submitAgreementResponse.output.redirectURL;
      return false;
    }
    return true;
  }

  onBackButtonEvent(e) {
    e.preventDefault();
    this.props.changeMDNSelectionView(Constants.MDN_SELECTION_VIEW);
  }

  dppUpgrade() {
    this.setState({
      isFetching: true,
    });
    this.props.submitAgreement(this.props.selectedMDN.mtn, Constants.EARLY_TWO_YEAR, this.props.selectedMDN.deviceType, this.props.selectedMDN.brand, this.props.selectedMDN.deviceId);
  }

  render() {
    const { selectedMDN, cqJSON } = this.props;
    return (
      <section className="section group grid">
        <Grid fluid>
          {this.state.isFetching && <Loader />}
          <Row className="topButtonBar background_gray_one margin18 onlyTopMargin">
            <Col sm={3} md={3} lg={3}>
              <Row>
                <Col xs={12}>
                  <Button type="button" className="secondary large" onClick={() => hashHistory.push('/')} analyticstrack="select-2yearAgreement-cancel-CTA">{cqJSON.label.DT_OD_MDN_CANCEL_UPGRADE_BTN}</Button>
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
                  <Button type="button" className="large margin12 onlyLeftMargin" analyticstrack="select-2yearAgreement-upgradeNow-CTA" onClick={this.dppUpgrade}>{cqJSON.label.DT_OD_MDN_UPGRADE_BTN}</Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={4} xs={4}>
              <div className="section group ">
                <Row className=" min-height500 justifyContentCenter  pad36 onlyTopPad" center="xs">
                  <Col >
                    <div className=" ">
                      <div>
                        <img src={`${selectedMDN.imageUrl}&wid=165&hei=300`} alt="Selected Device" />
                      </div>
                      <div className="margin5 onlyBottomMargin">
                        <Row className="pad10 onlyBottomPad  fontSize_4 bold justifyContentCenter" >
                          <span className="pad5 block onlyTopPad">{selectedMDN.displayMtn}</span>
                        </Row>
                        <Row className="pad20 onlyTopPad fontSize_4 bold justifyContentCenter" >
                          {selectedMDN.nickname}&apos;s <span className="pad5 onlyLeftPad" dangerouslySetInnerHTML={{ __html: selectedMDN.displayDeviceName }} />
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={8} xs={8} className="">
              <div className="pad36 noBottomPad noRightPad">
                <div className="">
                  <div className="">
                    <div
                      className="fontSize_8 pad10 onlyBottomPad bold"
                      dangerouslySetInnerHTML={{ __html: this.props.selectedMDN.twoYearContract.title }}
                    />
                    <p
                      className="fontSize_5 pad6 noSidePad bold margin30 onlyTopMargin"
                      dangerouslySetInnerHTML={{ __html: this.props.selectedMDN.twoYearContract.subTitle }}
                    />
                  </div>
                  <div>
                    <div className="color_959595 fontSize_2">
                      <div className="clearfix margin6 onlyTopMargin">
                        <span className="width100 block floatLeft textAlignRight margin6 noLeftMargin" >
                          <span className="boldText color_000">{this.props.cqJSON.label.DT_OD_MDN_END_DATE_LBL}</span> {this.props.selectedMDN.twoYearContract.endDate}
                        </span>
                      </div>
                      <div className="background_gray_three width100 progressBar background_CC">
                        <div className="progressBar background_gray_six" style={{ width: `${this.props.selectedMDN.twoYearContract.daysPercentage}%` }} />
                        <div className="progressBarMarker" style={{ marginLeft: `${this.props.selectedMDN.twoYearContract.daysPercentage}%` }} />
                      </div>
                    </div>
                    <div className="pad20 noSidePad">
                      <span className="color_666">{this.props.selectedMDN.twoYearContract.description}</span>
                    </div>
                    <div className="pad20 textAlignRight">
                      <Button type="button" className="large margin12 onlyLeftMargin" analyticstrack="select-2yearAgreement-upgradeNow-CTA" onClick={this.dppUpgrade}>{cqJSON.label.DT_OD_MDN_UPGRADE_BTN}</Button>
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
