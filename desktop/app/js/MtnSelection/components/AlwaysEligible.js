import { reduxForm } from 'redux-form/immutable';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { hashHistory } from '../../store';
import * as Constants from '../constants';
import AsyncComponent from '../../common/AsyncComponent';
import Button from '../../common/Button/Button';
import Loader from '../../common/Loader/Loader';
import Notification from './../../common/Notification/Notification';

import deviceImgNA from '../../../images/device_placeHolder.svg';

const RadioButton = AsyncComponent(() => import('../../common/RadioButton'));
const MSelect = AsyncComponent(() => import('../../common/Select'));

class AlwaysEligible extends Component {
  propTypes = {
    selectedMDN: PropTypes.object,
    cqJSON: PropTypes.object,
    submitAgreement: PropTypes.func,
    transferTakerMTNs: PropTypes.array,
    changeSelectedTransferMDN: PropTypes.func,
    transferGiverMTNs: PropTypes.array,
    asyncCallStatus: PropTypes.object,
    change: PropTypes.func,
    transferObject: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.selectedTransferMtn = null;
    this.tranferMtn = this.tranferMtn.bind(this);
    this.state = {
      showOptions: false,
      transferFlag: false,
      value: '0',
    };
  }

  componentWillMount() {
    if (!this.props.selectedMDN.upgradeEligbile) {
      hashHistory.push('/');
    }
  }

  componentWillReceiveProps(newProps) {
    this.formDetails = newProps.formData.toJS();
    this.selectedOption = this.formDetails.upgradeOption.values && this.formDetails.upgradeOption.values.upgradeOption;
    this.setState({ showOptions: this.selectedOption === 'transferUpgrade' });
    const selectedMtn = this.formDetails.upgradeOption.values && this.formDetails.upgradeOption.values.selectedMtn;
    if (this.state.showOptions && selectedMtn && selectedMtn !== this.selectedTransferMtn) {
      this.selectedTransferMtn = this.formDetails.upgradeOption.values && this.formDetails.upgradeOption.values.selectedMtn;
      this.tranferMtn();
    }
    if (!this.state.showOptions && this.state.transferFlag) {
      this.undoTransfer();
      this.setState({ transferFlag: false, value: '0' });
      this.props.change('selectedMtn', '0');
      // this.formDetails.upgradeOption.values.selectedMtn = '0';
    }
  }

  shouldComponentUpdate(newProps) {
    if (newProps.submitAgreementResponse && newProps.submitAgreementResponse.output && newProps.submitAgreementResponse.statusCode === '00') {
      const { redirectURL } = newProps.submitAgreementResponse.output;
      const { selectedMTN } = newProps.submitAgreementResponse.output;
      const queryPresence = redirectURL.indexOf('?') === -1 ? '?' : '&';
      window.location = `${redirectURL + queryPresence}selectedMTN=${selectedMTN}`;
      return false;
    }
    return true;
  }

  tranferMtn() {
    const { transferObject } = this.props;
    const data = {};
    data.action = Constants.TRANSFER_ACTION;
    data.transferToMTN = this.props.selectedMDN.mtn;
    data.transferFromMTN = this.selectedTransferMtn;
    if (data.transferFromMTN !== '0') {
      this.props.changeSelectedTransferMDN(data, transferObject);
      this.state.transferFlag = true;
    }
  }

  undoTransfer() {
    const data = {};
    data.action = Constants.REDO_TRANFER_ACTION;
    data.undoTransferMTN = this.selectedTransferMtn;
    this.props.changeSelectedTransferMDN(data);
  }

  alwaysEligibleUpgrade = () => {
    this.props.submitAgreement(this.props.selectedMDN.mtn, Constants.UPGRADE, this.props.selectedMDN.deviceType, this.props.selectedMDN.brand, this.props.selectedMDN.deviceId, this.selectedOption);
  }

  render() {
    const { selectedMDN, cqJSON, transferTakerMTNs, transferGiverMTNs, asyncCallStatus } = this.props;
    return (
      <section className="section group grid">
        <div className="margin30 onlySideMargin">
          {asyncCallStatus.isFetching && <Loader />}
          <Row className="pad18 noSidePad">
            <Col sm={12} md={12}>
              <Row className="pad18 noSidePad">
                <Col sm={9} md={9} lg={9}>
                  <h1>{cqJSON.label.DT_OD_MDN_ALWAYS_ELIGIBLE_TITLE}</h1>
                </Col>
              </Row>
              <Row>
                <Col sm={3} md={3} className="pad36 pnlyTopPad">
                  <div className="section group min-height500">
                    <Row className="min-height500">
                      <Col sm={12} md={12}>
                        <div>
                          <div className="margin5 onlyBottomMargin">
                            <Row className="pad5 noSidePad fontSize_2 bold" >
                              {selectedMDN.nickname}
                            </Row>
                            <Row className="pad5 onlyBottomPad fontSize_2 bold" >
                              <span className="pad5 block onlyTopPad">{selectedMDN.displayMtn}</span>
                            </Row>
                            <Row className="pad5 onlyBottomPad fontSize_2 bold" >
                              <span className="pad5 block onlyTopPad" dangerouslySetInnerHTML={{ __html: selectedMDN.displayDeviceName }} />
                            </Row>
                          </div>
                          <div className="">
                            <img src={(selectedMDN.imageUrl !== null) ? `${selectedMDN.imageUrl}&wid=165&hei=165` : deviceImgNA} alt="Selected Device" className={(selectedMDN.imageUrl === null) ? 'mtnDefaultImg' : ''} />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col sm={9} md={9}>
                  <div className="pad36 onlyTopPad clearfix">
                    <div className="margin20 onlyRightMargin floatLeft">
                      <RadioButton
                        id="checkDown"
                        name="upgradeOption"
                        value="donwPay"
                        analyticstrack="select-upgradeOption-radio"
                      />
                    </div>
                    <div className="floatLeft span_10_of_12">
                      <span
                        className="bold fontSize_6 displayBlock"
                      >Down Payment
                      </span>
                      {this.props.selectedMDN.twoYearContract && <span className="pad3 onlyTopPad block">{this.props.selectedMDN.twoYearContract.description}</span>}
                    </div>
                  </div>
                  <div className="pad36 noSidePad clearfix">
                    <div className="margin20 onlyRightMargin floatLeft">
                      <RadioButton
                        id="checkRetail"
                        name="upgradeOption"
                        value="reatailPay"
                        analyticstrack="select-checkRetailPrice-radio"
                      />
                    </div>
                    <div className="floatLeft span_10_of_12">
                      <span
                        className="bold fontSize_6 displayBlock"
                      >{cqJSON.label.DT_OD_MDN_ALWAYS_ELIGIBLE_REPLACE_TEXT}
                      </span>
                    </div>
                  </div>
                  <Row className="pad18 noSidePad" style={{ margin: 0 }}>
                    {(transferTakerMTNs && transferTakerMTNs.length > 0 && transferTakerMTNs.indexOf(this.props.selectedMDN.mtn) > -1) &&
                      <div className="pad36 noSidePad clearfix margin24 onlyRightMargin">
                        <div className="margin20 onlyRightMargin floatLeft">
                          <RadioButton
                            id="transferUpgrade"
                            name="upgradeOption"
                            value="transferUpgrade"
                            analyticstrack="select-transferUpgrade-radio"
                          />
                        </div>
                        <div className="floatLeft">
                          <span
                            className="bold fontSize_6 displayBlock"
                          >{this.state.showOptions ? cqJSON.label.DT_OD_MDN_ALWAYS_ELIGIBLE_TRANSFER_FROM :
                              cqJSON.label.DT_OD_MDN_ALWAYS_ELIGIBLE_TRANSFER_UPGRADE}
                          </span>
                        </div>
                      </div>
                    }
                    {(this.state.showOptions && transferGiverMTNs && transferGiverMTNs.length > 0) &&
                      <Col xs={4} style={{ padding: 0 }}>
                        <div className="margin6 noSideMargin textUpdatesContainer">
                          <MSelect
                            name="selectedMtn"
                            aria-label="mtnList"
                            id="selectedMtn"
                            borderStyle
                            label="Select Device"
                            analyticstrack="select-transferGiverMTNs-list"
                          >
                            <option key="0" value="0">Select Device</option>
                            {transferGiverMTNs.map((mtn) =>
                              <option key={mtn} value={mtn}>{mtn}</option>)}
                          </MSelect>
                        </div>
                      </Col>
                    }
                  </Row>
                </Col>
              </Row>
              {(transferTakerMTNs && transferTakerMTNs.length > 0 && transferTakerMTNs.indexOf(this.props.selectedMDN.mtn) > -1) &&
                <Row style={{ margin: 0 }}>
                  <Notification type="error" message={cqJSON.html.DT_OD_MDN_ALWAYS_ELIGIBLE_TRANSFER_MESSAGE} noClose />
                </Row>
              }
              <Row className="pad18 noSidePad" xs={12} style={{ width: '100%' }}>
                <hr style={{ border: '1px solid #000', width: '100%' }} />
              </Row>
              <Row className="pad18 noSidePad" xs={12} style={{ width: '100%' }}>
                <Col xs={2}>
                  <Button
                    type="button"
                    className="button large"
                    analyticstrack="select-alwaysEligibleUpgrade-CTA"
                    onClick={this.alwaysEligibleUpgrade}
                  >Continue
                  </Button>
                </Col>
                <Col xs={1} className="pad15 noSidePad fontSize_4">
                  <a
                    role="button"
                    className="link margin15"
                    analyticstrack="select-upgradePath-details-link"
                    onClick={(evt) => {
                      evt.preventDefault();
                      window.location.href = window.location.pathname;
                    }}
                    tabIndex="0"
                  >Cancel
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </section>
    );
  }
}

export default reduxForm({
  form: 'upgradeOption',
  initialValues: {
    upgradeOption: 'donwPay',
    selectedMtn: '0',
  },
})(AlwaysEligible);

