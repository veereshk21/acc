import { Grid, Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getParameterByName } from './../actions';
import * as Constants from './../constants';
import Anchor from '../../common/A/A';
import AsyncComponent from '../../common/AsyncComponent';
import Button from '../../common/Button/Button';
import CartsummaryComponent from './CartSummary/index';
import Loader from '../../common/Loader/Loader';
import SeeDetailsHLL from './SeeDetailsModal';

// import Loader from '../../common/Loader/Loader';
// import Notification from './../../common/Notification/Notification';
// import NotificationBar from './../../common/NotificationBar';

const SinglePlanComponent = AsyncComponent(() => import('../components/SinglePlanComponent'));
const MultiPlanComponent = AsyncComponent(() => import('../components/MultiPlanComponent'));
const Modal = AsyncComponent(() => import('./../../common/Modal/index'));
const Notification = AsyncComponent(() => import('./../../common/Notification/Notification'));
const NotificationBar = AsyncComponent(() => import('./../../common/NotificationBar'));
const ModalContent = AsyncComponent(() => import('./CartSummary/ModalContent'));

class CompatiblePlans extends Component {
  static propTypes = {
    updatePlanPromptInfo: PropTypes.object.isRequired,
    cq: PropTypes.object.isRequired,
    additionalPlanDetails: PropTypes.object,
    setAdditionalPlanDetails: PropTypes.func,
    isFetching: PropTypes.bool,
    isPlanDetailsShow: PropTypes.bool,
    location: PropTypes.object,
    isSingleDevice: PropTypes.bool,
    keepCurrentPlanURL: PropTypes.string,
    singleLinePlans: PropTypes.array,
    dataOnlyPlans: PropTypes.array,
    multiLinePlans: PropTypes.array,
    multiUpgradeCheck: PropTypes.func,
    isMultiUpgrade: PropTypes.bool,
    multiUpgradeContent: PropTypes.object,
    mixAndMaxEnabled: PropTypes.bool,
    cqModal: PropTypes.object,
    linesCount: PropTypes.number,
    showSeeDetails: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.singleLinePlans = props.singleLinePlans || [];
    this.multiLinePlans = props.multiLinePlans || [];
    this.dataOnlyPlans = props.dataOnlyPlans;
    this.onPlantypeChangeHandler = this.onPlantypeChangeHandler.bind(this);
    let selectedPlan = null;
    if (props.isSingleDevice) {
      const recommendedPlan = this.singleLinePlans.filter((plan) => plan.recommendedPlan === true);
      selectedPlan = recommendedPlan.length > 0 ? recommendedPlan[0] : this.singleLinePlans[0];
    } else {
      const recommendedPlan = this.multiLinePlans.filter((plan) => plan.recommendedPlan === true);
      selectedPlan = recommendedPlan.length > 0 ? recommendedPlan[0] : this.multiLinePlans[0];
    }
    if (props.mixAndMaxEnabled) {
      const _multiLinePlans = [...this.multiLinePlans, ...this.singleLinePlans];
      this.multiLinePlans = _multiLinePlans;
      const recommendedPlan = _multiLinePlans.filter((plan) => plan.recommendedPlan === true);
      selectedPlan = recommendedPlan.length > 0 ? recommendedPlan[0] : _multiLinePlans[0];
    }
    this.state = {
      planSelectionType: props.isSingleDevice ? 'single_device' : 'multi_device',
      cartSummaryObj: selectedPlan,
      selectedPlanSorId: selectedPlan.planSorId,
      modalOpen: false,
      modalContent: '',
      planDetailsModal: false,
      selectPlanModal: false,
      impDataModal: false,
      showSeeDetailsHLL: false,
      viewState: (!props.mixAndMaxEnabled && props.isSingleDevice),
    };
    this.keepCurrentPlan = this.keepCurrentPlan.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this._handleEscKey.bind(this));
  }

  componentDidMount() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleEscKey.bind(this));
  }

  onImpPlanInfo = (evt) => {
    evt.preventDefault();
    this.setState({
      modalOpen: true,
      impDataModal: true,
    });
    this.setState({
      modalContent: this.props.cq.html.DT_OD_IMPORTANT_PLAN_INFO_HTML,
    });
  }

  onImpDataSvcInfo = (evt) => {
    evt.preventDefault();
    window.open(this.props.cq.serviceUrls.DT_OD_BROADBAND_INTERNET_SERVICES_LNK, '_blank');
  }

  onSelectPlan = (evt) => {
    evt.preventDefault();
    this.setState({
      modalOpen: true,
      selectPlanModal: true,
    });
  }
  onPlantypeChangeHandler(type) {
    let selectedPlan = null;
    if (type === Constants.SINGLE_LINE) {
      const recommendedPlan = this.singleLinePlans.filter((plan) => plan.recommendedPlan === true);
      selectedPlan = recommendedPlan.length > 0 ? recommendedPlan[0] : this.singleLinePlans[0];
    } else {
      const recommendedPlan = this.multiLinePlans.filter((plan) => plan.recommendedPlan === true);
      selectedPlan = recommendedPlan.length > 0 ? recommendedPlan[0] : this.multiLinePlans[0];
    }
    this.setState({ viewState: type === Constants.SINGLE_LINE, cartSummaryObj: selectedPlan, selectedPlanSorId: selectedPlan.planSorId });
  }
  _handleEscKey(event) {
    if (event.keyCode === 27) {
      this.modalClose();
    }
  }
  handlePlanSelection = (sorId) => {
    const recommendedPlan = this.multiLinePlans.filter((plan) => plan.planSorId === sorId);
    const selectedPlan = recommendedPlan.length > 0 ? recommendedPlan[0] : this.multiLinePlans[0];
    this.setState({
      selectedPlanSorId: sorId,
      modalOpen: false,
      cartSummaryObj: selectedPlan,
    });
  }
  seePlanFeatures = (evt) => {
    evt.preventDefault();
    if (this.props.mixAndMaxEnabled) {
      this.setState({
        modalOpen: true,
        showSeeDetailsHLL: true,
      });
    } else {
      this.setState({
        modalOpen: true,
        planDetailsModal: true,
      });
      this.setState({
        modalContent: this.props.cq.html.DT_OD_PLAN_FEATURES,
      });
    }
  }

  modalClose = () => {
    this.setState({
      modalOpen: false,
      impDataModal: false,
      selectPlanModal: false,
      planDetailsModal: false,
      showSeeDetailsHLL: false,
    });
  }

  updatePlanProceed = () => {
    if (this.state.selectedPlanSorId) {
      const acceptURL = window.compatiblePlansJSON.output.acceptURL;
      let url = `${acceptURL}?planSorId=${this.state.selectedPlanSorId}`;
      const editPlan = getParameterByName('editPlan');
      const flow = getParameterByName('flow');
      const planCommId = getParameterByName('planCommId');

      if (editPlan !== null) url += `&editPlan=${editPlan}`;
      if (flow !== null) url += `&flow=${flow}`;
      if (planCommId !== null) url += `&planCommId=${planCommId}`;

      const { isMultiUpgrade, multiUpgradeCheck, multiUpgradeContent } = this.props;
      if (isMultiUpgrade) {
        multiUpgradeCheck(url, multiUpgradeContent);
      } else {
        window.location = url;
      }
    }
  }

  formatPlanInfo(planObj) {
    const planList = planObj.info.split('<br />').map((item) => <li>{item}</li>);
    return <ul>{planList}</ul>;
  }

  keepCurrentPlan(event) {
    event.preventDefault();
    const { keepCurrentPlanURL } = this.props.updatePlanPromptInfo;
    const { isMultiUpgrade, multiUpgradeCheck, multiUpgradeContent } = this.props;
    if (isMultiUpgrade) {
      multiUpgradeCheck(keepCurrentPlanURL, multiUpgradeContent);
    } else {
      window.location = keepCurrentPlanURL;
    }
  }
  render() {
    const {
      updatePlanPromptInfo,
      setAdditionalPlanDetails,
      additionalPlanDetails,
      isPlanDetailsShow,
      cq,
      isFetching,
      multiUpgradeCheck,
      isMultiUpgrade,
      multiUpgradeContent,
      mixAndMaxEnabled,
      cqModal,
      linesCount,
      showSeeDetails,
    } = this.props;

    return (
      <Row className="section clearfix">
        {this.state.impDataModal &&
          <Modal
            mounted={this.state.modalOpen}
            closeFn={this.modalClose}
            style={{ margin: 'auto', background: 'white', width: '50%' }}
            showCloseX
          >
            <div className="pad20">
              <div dangerouslySetInnerHTML={{ __html: this.state.modalContent }} />
              <div />
            </div>
          </Modal>
        }
        {this.state.selectPlanModal &&
          <Modal
            mounted={this.state.modalOpen}
            closeFn={this.modalClose}
            style={{ background: 'white', width: '580px' }}
            showCloseX
          >
            {/* Modal Content */}
            <ModalContent
              cq={cq}
              updatePlanProceed={this.updatePlanProceed}
              keepCurrentPlan={updatePlanPromptInfo.keepCurrentPlan}
              keepPlanProceed={this.keepCurrentPlan}
            />
          </Modal>
        }
        {this.state.planDetailsModal &&
          <Modal
            mounted={this.state.modalOpen}
            closeFn={this.modalClose}
            style={{ background: 'white', width: '580px' }}
            showCloseX
          >
            <div className="pad20">
              <div dangerouslySetInnerHTML={{ __html: this.state.modalContent }} />
              <div />
            </div>
          </Modal>
        }
        {this.state.showSeeDetailsHLL &&
          <Modal
            mounted={this.state.modalOpen}
            closeFn={this.modalClose}
            underlayColor="#000000e6"
            style={{ background: 'white', width: '1000px', padding: '15px' }}
            showCloseX
          >
            <SeeDetailsHLL
              isMixMatchPlan={this.props.mixAndMaxEnabled || false}
              cq={cq}
              selectedPlan={this.handlePlanSelection}
              allPlans={this.multiLinePlans}
              currentPlanName={updatePlanPromptInfo.currentPlanName}
              cqModal={cqModal}

            />
          </Modal>
        }

        {isFetching === true && <Loader />}
        <Grid fluid>
          <Row className="titleSection" >
            <Col md={mixAndMaxEnabled ? 7 : 5} sm={mixAndMaxEnabled ? 7 : 5} lg={mixAndMaxEnabled ? 5 : 5} className="pad55 pad12 noSidePad">
              <h1>Let&apos;s pick the right plan for your {linesCount} line{linesCount > 1 && 's'} to share.</h1>
            </Col>
            <Col md={mixAndMaxEnabled ? 5 : 7} sm={mixAndMaxEnabled ? 5 : 7} lg={mixAndMaxEnabled ? 7 : 7} className="pad12 noRightPad noSidePad">
              {!mixAndMaxEnabled &&
                <Row>
                  <Col xsOffset={4} xs={4}>
                    <Button
                      className="width100 primary tabletPlanBtn"
                      type="button"
                      analyticstrack="select-pickPlan-CTA"
                      disabled={!this.state.selectedPlanSorId}
                      onClick={this.onSelectPlan}
                    >
                      Pick this plan
                    </Button>
                  </Col>
                  {this.state.cartSummaryObj.jaxPlan &&
                    <Col xs={4}>
                      <Button
                        className="width100 secondary tabletPlanBtn"
                        type="button"
                        analyticstrack="select-planDetails-CTA"
                        onClick={this.seePlanFeatures.bind(this)}
                      >
                        See details
                      </Button>
                    </Col>
                  }
                </Row>
              }
            </Col>
          </Row>
          <Row style={{ width: '100%', marginBottom: '48px' }}>
            <Col xs={8}>
              {updatePlanPromptInfo.currentPlanName &&
                <Row style={{ margin: 0 }}>
                  <Col xs={!mixAndMaxEnabled ? 8 : 7} sm={!mixAndMaxEnabled ? 5 : 7} className="pad6 fontSize_4">
                    You are currently on&nbsp;<span dangerouslySetInnerHTML={{ __html: updatePlanPromptInfo.currentPlanName }} />.
                  </Col>
                  {!mixAndMaxEnabled &&
                    <Col xs={2} sm={2} className="pad6 fontSize_4">
                      <span>${updatePlanPromptInfo.currentPlanPrice}/mo</span>
                    </Col>
                  }
                  {!mixAndMaxEnabled &&
                    <Col xs={4} className="pad6 fontSize_4">
                      {updatePlanPromptInfo.keepCurrentPlan &&
                        <button tabIndex="0" analyticstrack="select-keepCurrentPlan-CTA" onClick={this.keepCurrentPlan} style={{ paddingTop: '2px', paddingBottom: '2px', fontSize: '10px' }} className="button secondary">{cq.label.DT_OD_KEEP_CURRENT_PLAN}</button>
                      }
                    </Col>
                  }
                </Row>
              }
            </Col>
            {!mixAndMaxEnabled &&
              <Col xs={4} className="pad6 fontSize_7 textRight">
                <div className="">
                  <Anchor href="#" tabIndex="0" analyticstrack="select-onImpPlanInfo-link" className="outlineFocus textUnderline inlineBlock fontSize_3 pointer" onClick={this.onImpPlanInfo}>{cq.label.DT_OD_IMP_PLAN_INFO_TEXT}</Anchor>
                  <Anchor href="#" tabIndex="0" analyticstrack="select-onImpDataSvcInfo-link" className="outlineFocus textUnderline inlineBlock planInfo fontSize_3 pointer8 pointer" onClick={this.onImpDataSvcInfo}>{cq.label.DT_OD_IMP_DATA_INFO_TEXT}</Anchor>
                </div>
              </Col>
            }
          </Row>
          <Row>
            <Col xs={12} className="centerBlock">
              <NotificationBar page={this.props.location.pathname} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {updatePlanPromptInfo.restricedZipcode &&
                <div className="margin36 onlyBottomMargin">
                  <Notification message={cq.html.DT_OD_SIM_RESTRICTION_INFO} type="error" noClose noIcon />
                </div>
              }

              {!mixAndMaxEnabled && this.props.isSingleDevice &&
                <Row style={{ margin: 0, paddingBottom: '48px' }}>
                  <div className="planSelectionTab">
                    <Col xs={6} className={`pad12 ${this.state.viewState && 'highlighted'}`}>
                      <Row
                        style={{ cursor: 'pointer', padding: 0 }}
                        onClick={this.onPlantypeChangeHandler.bind(this, Constants.SINGLE_LINE)}
                        analyticstrack="select-singleLinePlan-CTA"
                        role="button"
                        tabIndex="0"
                      >
                        <Col xs={7} style={{ padding: 0 }}>
                          <div className="bold fontSize_9">
                            Plans for a single smartphone
                          </div>
                          <div>
                            The best value for one smartphone and up to two additional device types.
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={6} className={`pad12 ${!this.state.viewState && 'highlighted'}`}>
                      <Row
                        style={{ cursor: 'pointer', padding: 0 }}
                        onClick={this.onPlantypeChangeHandler.bind(this, Constants.MULTI_LINE)}
                        role="button"
                        analyticstrack="select-multiLinePlan-CTA"
                        tabIndex="0"
                      >
                        <Col xs={7} style={{ padding: 0 }}>
                          <div className="bold fontSize_9">
                            Plans for multiple devices
                          </div>
                          <div>
                            Flexible plans to share between up to 10 smartphones and devices.
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </div>
                </Row>
              }
              <Row className="margin24 onlyBottomMargin">
                {this.state.viewState &&
                  (this.singleLinePlans && this.singleLinePlans.length > 0) &&
                  <SinglePlanComponent
                    singleLinePlans={this.singleLinePlans}
                    comparePlansEnabled={updatePlanPromptInfo.comparePlansEnabled}
                    setAdditionalPlanDetails={setAdditionalPlanDetails}
                    additionalPlanDetails={additionalPlanDetails}
                    isPlanDetailsShow={isPlanDetailsShow}
                    onPlanSelected={(plan) => this.setState({ cartSummaryObj: plan, selectedPlanSorId: plan.planSorId })}
                    cq={cq}
                    selectedPlanSorId={this.state.selectedPlanSorId}
                    mixAndMaxEnabled={mixAndMaxEnabled}
                  />
                }
                {!this.state.viewState &&
                  (this.multiLinePlans && this.multiLinePlans.length > 0) &&
                  <MultiPlanComponent
                    singleLinePlans={this.singleLinePlans}
                    multiLinePlans={this.multiLinePlans}
                    dataOnlyPlans={this.dataOnlyPlans}
                    updatePlanPromptInfo={updatePlanPromptInfo}
                    setAdditionalPlanDetails={setAdditionalPlanDetails}
                    additionalPlanDetails={additionalPlanDetails}
                    isPlanDetailsShow={isPlanDetailsShow}
                    onPlanSelected={(plan) => this.setState({ cartSummaryObj: plan, selectedPlanSorId: plan.planSorId })}
                    cq={cq}
                    selectedPlanSorId={this.state.selectedPlanSorId}
                    mixAndMaxEnabled={mixAndMaxEnabled}
                  />
                }
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <CartsummaryComponent
                planSorId={this.state.selectedPlanSorId}
                updatePlanPromptInfo={this.state.cartSummaryObj}
                lacInfo={updatePlanPromptInfo.lacMap}
                cq={cq}
                keepCurrentPlanURL={updatePlanPromptInfo.keepCurrentPlanURL}
                multiUpgradeCheck={multiUpgradeCheck}
                isMultiUpgrade={isMultiUpgrade}
                multiUpgradeContent={multiUpgradeContent}
                mixAndMaxEnabled={mixAndMaxEnabled}
                // onImpPlanInfo={this.onImpPlanInfo}
                seePlanFeatures={this.seePlanFeatures}
                dataOnlyPlans={this.dataOnlyPlans}
                showSeeDetails={showSeeDetails}
              />
            </Col>
          </Row>
          <footer className="footerContent width100 margin36 noSideMargin textAlignCenter" />
        </Grid>
      </Row>
    );
  }
}

export default CompatiblePlans;
