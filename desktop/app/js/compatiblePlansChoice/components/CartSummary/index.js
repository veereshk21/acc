import { Row, Col } from 'react-flexbox-grid';
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactModal from 'react-modal';

import { getParameterByName } from './../../actions';

import AsyncComponent from './../../../common/AsyncComponent';
import Anchor from './../../../common/A/A';

const Button = AsyncComponent(() => import('./../../../common/Button/Button'));
const NewPhones = AsyncComponent(() => import('./NewPhones'));
const Modal = AsyncComponent(() => import('../../../common/Modal/index'));
const ModalContent = AsyncComponent(() => import('./ModalContent'));
const OtherPhones = AsyncComponent(() => import('./OtherPhones'));
const NewDevices = AsyncComponent(() => import('./NewDevices'));
const OtherDevice = AsyncComponent(() => import('./OtherDevices'));
const DiscountContent = AsyncComponent(() => import('./DiscountContent'));
const AutoPayOffer = AsyncComponent(() => import('./AutoPayOffer'));
const UpgradedDevices = AsyncComponent(() => import('./UpgradedDevices'));
const PlanCost = AsyncComponent(() => import('./PlanCost'));
const PlanInfoModal = AsyncComponent(() => import('./PlanInfoModal'));

class CartSummaryComponent extends Component {
  static propTypes = {
    updatePlanPromptInfo: PropTypes.object,
    cq: PropTypes.object.isRequired,
    planSorId: PropTypes.string,
    keepCurrentPlan: PropTypes.bool,
    keepCurrentPlanURL: PropTypes.string,
    seePlanFeatures: PropTypes.func,
    isMultiUpgrade: PropTypes.bool,
    multiUpgradeContent: PropTypes.object,
    multiUpgradeCheck: PropTypes.func,
    mixAndMaxEnabled: PropTypes.bool,
    showSeeDetails: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.updatePlanProceed = this.updatePlanProceed.bind(this);
    this.keepPlanProceed = this.keepPlanProceed.bind(this);
    this.handleAccordionState = this.handleAccordionState.bind(this);
    this.state = {
      modalOpen: false,
      showPlanInfoModal: false,
      expanded: false,
    };
  }

  componentWillMount() {
    document.addEventListener('keydown', this._handleEscKey.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleEscKey.bind(this));
  }

  onImpPlanInfoHLL = () => {
    this.setState({ showPlanInfoModal: true });
  }
  updatePlanContinue = () => {
    this.setState({ modalOpen: true });
  };
  updateSelectedPlan = (planSorId, index) => {
    this.setState({ planSorId, index });
  }

  _handleEscKey(event) {
    if (event.keyCode === 27) {
      this.setState({ showPlanInfoModal: false });
    }
  }

  keepPlanProceed = () => {
    const { isMultiUpgrade, keepCurrentPlanURL, multiUpgradeCheck, multiUpgradeContent } = this.props;
    if (isMultiUpgrade) {
      multiUpgradeCheck(keepCurrentPlanURL, multiUpgradeContent);
    } else {
      window.location = keepCurrentPlanURL;
    }
  };

  modalClose = () => {
    this.setState({ modalOpen: false });
  };
  handleAccordionState = (e) => {
    e.preventDefault();
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.stopPropagation();
    }
    this.setState({
      expanded: !this.state.expanded,
    });
  }
  updatePlanProceed() {
    const { planSorId } = this.props;
    if (planSorId) {
      const acceptURL = window.compatiblePlansJSON.output.acceptURL;
      let url = `${acceptURL}?planSorId=${planSorId}`;
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

  render() {
    const { updatePlanPromptInfo, cq, keepCurrentPlan, mixAndMaxEnabled, showSeeDetails } = this.props;
    return (
      <section>
        <Modal
          mounted={this.state.modalOpen}
          closeFn={this.modalClose}
          style={{ background: 'white', width: '800px' }}
          showCloseX
        >
          {/* Modal Content */}
          <ModalContent
            cq={cq}
            updatePlanProceed={this.updatePlanProceed}
            keepCurrentPlan={keepCurrentPlan}
            keepPlanProceed={this.keepPlanProceed}
          />
        </Modal>

        <ReactModal
          isOpen={this.state.showPlanInfoModal}
          contentLabel="plan bill breakdown modal"
          overlayClassName="Overlay zIndex700"
          className="Overlay-modal billBreakDown"
        >
          <button onClick={() => this.setState({ showPlanInfoModal: false })} analyticstrack="select-showPlanInfo-modal-CTA" className="closeModal" aria-label="close modal">Close Modal</button>
          <PlanInfoModal selectedPlanId="" cq={cq} />
        </ReactModal>


        <Row>
          <Col xs={7} sm={7}>
            {mixAndMaxEnabled &&
              <Row>

                <Button
                  className=" secondaryBtnWidth primary margin10"
                  type="button"
                  disabled={!this.props.planSorId}
                  onClick={this.updatePlanContinue}
                  analyticstrack="select-pickPlan-CTA"
                  style={{ width: 200, height: 40, padding: 7 }}
                  tabIndex="0"
                >
                  Pick this plan
                </Button>

                {showSeeDetails &&

                  <Button
                    className=" secondaryBtnWidth secondary margin10"
                    type="button"
                    analyticstrack="select-planDetails-CTA"
                    onClick={(e) => this.props.seePlanFeatures(e)}
                    style={{ width: 200, height: 40, padding: 7 }}
                    tabIndex="0"
                  >
                    See details
                  </Button>

                }
              </Row>
            }
            {mixAndMaxEnabled &&
              <Row>
                <Col xs={12} className="pad6 fontSize_7 textLeft noSidePad">
                  <div className="pad20 onlyTopPad">
                    <Anchor href="#" tabIndex="0" className="outlineFocus margin3 onlyLeftMargin textUnderline inlineBlock fontSize_3 pointer" onClick={this.onImpPlanInfoHLL}>{cq.label.DT_OD_IMP_PLAN_BROADBAND_INFO_TEXT}</Anchor>
                  </div>
                </Col>
              </Row>
            }
            {!mixAndMaxEnabled &&
              <Row>
                <Col xs={11} className="fontSize_1 margin36 onlyTopMargin">
                  {cq.label.DT_OD_TOTAL_DUE_TEXT}
                </Col>
              </Row>
            }
          </Col>
          <Col xs={5} sm={5} style={{ paddingLeft: '30px' }}>
            <Accordion className="width100" accordion={false}>
              {
                <AccordionItem className="accordionItem" expanded={this.state.expanded}>

                  <AccordionItemTitle style={{ justifyContent: 'space-between', display: 'flex' }} aria-controls="order-summary">
                    <Row style={{ width: '100%' }} >
                      <Col xs={8}>
                        <span className="bold fontSize_9 orderSummarySidebar_mainHeading color_00">
                          {cq.label.DT_OD_PLAN_DUE_MONTHLY_TEXT}:
                        </span>
                      </Col>
                      <Col xs={4} className="textRight">
                        <span className=" margin12 onlyRightMargin bold fontSize_9 orderSummarySidebar_mainHeading color_00 textAlignRight">${updatePlanPromptInfo.discounted && updatePlanPromptInfo.totalDiscountedPlanPrice ? updatePlanPromptInfo.totalDiscountedPlanPrice : updatePlanPromptInfo.totalPlanPrice}</span>
                        <button aria-label={cq.label.DT_OD_PLAN_DUE_MONTHLY_TEXT} aria-expanded={this.state.expanded} analyticstrack="select-planDetails-CTA" onClick={this.handleAccordionState} onKeyPress={this.handleAccordionState} />
                      </Col>
                    </Row>
                  </AccordionItemTitle>
                  <AccordionItemBody aria-labelledby="order-summary">
                    <div className="section group min-height500" style={{ width: '100%' }} >
                      <Row className=" min-height500">
                        <Col xs={12}>
                          {/* Promo Content */}
                          <AutoPayOffer updatePlanPromptInfo={updatePlanPromptInfo} cq={cq} mixAndMaxEnabled={mixAndMaxEnabled} />

                          {/* Plan Cost for non Jax plans */}
                          <PlanCost updatePlanPromptInfo={updatePlanPromptInfo} cq={cq} mixAndMaxEnabled={mixAndMaxEnabled} />

                          {/* New Phones */}
                          <NewPhones updatePlanPromptInfo={updatePlanPromptInfo} cq={cq} mixAndMaxEnabled={mixAndMaxEnabled} />

                          {/* New Devices */}
                          <NewDevices updatePlanPromptInfo={updatePlanPromptInfo} cq={cq} mixAndMaxEnabled={mixAndMaxEnabled} />

                          {/* Upgraded Devices */}
                          <UpgradedDevices updatePlanPromptInfo={updatePlanPromptInfo} cq={cq} mixAndMaxEnabled={mixAndMaxEnabled} />

                          {/* Other Phones */}
                          <OtherPhones updatePlanPromptInfo={updatePlanPromptInfo} cq={cq} mixAndMaxEnabled={mixAndMaxEnabled} />

                          {/* Other Devices */}
                          <OtherDevice updatePlanPromptInfo={updatePlanPromptInfo} cq={cq} mixAndMaxEnabled={mixAndMaxEnabled} />

                          {/* Discount Content */}
                          <DiscountContent updatePlanPromptInfo={updatePlanPromptInfo} cq={cq} mixAndMaxEnabled={mixAndMaxEnabled} />
                        </Col>
                      </Row>
                    </div>
                  </AccordionItemBody>
                </AccordionItem>
              }
            </Accordion>
          </Col>
        </Row>
      </section>
    );
  }
}

export default CartSummaryComponent;
