import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';

import Modal from './../../common/Modal';

// import { SINGLE_LINE } from './../constants';
import AsyncComponent from '../../common/AsyncComponent';
// import ChatAndC2C from '../../common/ChatAndC2C';
import Notification from './../../common/Notification/Notification';


const PlansContent = AsyncComponent(() => import('./PlansContent'));
const Loader = AsyncComponent(() => import('../../common/Loader/Loader'));

class CpcInterceptPrompt extends Component {
  static defaultProps = {
    isShowCurrentPlan: true,
  };
  static propTypes = {
    cpcPromptInfo: PropTypes.object.isRequired,
    currentPlanDetails: PropTypes.object,
    cq: PropTypes.object.isRequired,
    isFetching: PropTypes.bool,
    isShowCurrentPlan: PropTypes.bool,
    asyncFetch: PropTypes.func,
    currentPlanUrl: PropTypes.string,
    exploreTVPlanUrl: PropTypes.string,
    // showDataOption: PropTypes.bool,
    ctadisabled: PropTypes.bool,
    dataPlanDetails: PropTypes.object,
    dataOptionsNW: PropTypes.func,
    // dataPlans: PropTypes.array,
    // selectedDataPlan: PropTypes.object,
    isNationwide: PropTypes.bool,
    totalCost: PropTypes.string,
    // selectPlanURL: PropTypes.string,
    montlyLineAccessFees: PropTypes.string,
    isMonthlyAccessDiscount: PropTypes.bool,
    // isLineAccessDiscount: PropTypes.bool,
    mmplanEnabled: PropTypes.bool,
    monthlyDiscountPrice: PropTypes.string,
    exploreMMPlanURL: PropTypes.string,
    modifyExistingPlanUrl: PropTypes.string,
    isShowTVP: PropTypes.bool,
    isShowME: PropTypes.bool,
    isShowMM: PropTypes.bool,
    isShowMFilex: PropTypes.bool,
    isShowKeepCurrent: PropTypes.bool,
    isDataOnlyPlan: PropTypes.bool,
    restrictedMessage: PropTypes.string,
    discountApplicable: PropTypes.bool,
    zipRestrictedAcct: PropTypes.bool,
    globalPromotions: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.onCpcPromptExploreTVP = this.onCpcPromptExploreTVP.bind(this);
    this.gotoCurrentPlan = this.gotoCurrentPlan.bind(this);
    this.learnMoreView = this.learnMoreView.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      totalCost: props.totalCost,
      planName: props.currentPlanDetails.currentPlanName,
      planPrice: props.currentPlanDetails.monthlyAccessCost,
      discountedPlanPrice: props.isMonthlyAccessDiscount && props.monthlyDiscountPrice,
      showModalDetails: false,
    };
    this.url = null;
  }

  onCpcPromptExploreTVP() {
    this.props.asyncFetch();
    const { isNationwide, exploreTVPlanUrl, dataPlanDetails, dataOptionsNW } = this.props;
    if (isNationwide) {
      dataOptionsNW(exploreTVPlanUrl, dataPlanDetails);
    } else {
      window.location = exploreTVPlanUrl;
    }
  }

  getTotalCost(selectedPrice) {
    return parseFloat(parseFloat(selectedPrice) + parseFloat(this.props.montlyLineAccessFees)).toFixed(2);
  }

  getGlobalMessage(promo, idx) {
    if (promo.placement === 'CONTENT-HEADER') {
      return (
        <Row key={idx}>
          {promo.badgeText &&
            <Col xs={12} className="onlyBottomPad pad18">
              <Notification
                type={`${promo ? 'info' : 'error'}`}
                message={promo.badgeText}
                toolTip={promo.badgeToolTip}
                noClose={this.showCloseGlobalPromo}
                learnMore={promo.badgeToolTipUrl ? this.learnMoreView : null}
                learnURL={promo.badgeToolTipUrl}
              />
            </Col>
          }
        </Row>
      );
    }
    return null;
  }

  getAppleMusic(promo) {
    return (
      <Row className="">
        <Col xs={9}>
          <div className="fontSize_8 bold lineHeight12 pad5 noSidePad">
            <span className="font-icon icon-apple" />
            <span>MUSIC</span>
          </div>
          <p>
            <span dangerouslySetInnerHTML={{ __html: promo.badgeText }} />
            {promo.badgeToolTipUrl &&
              <Link role="link" to="/" onClick={() => this.learnMoreView(promo.badgeToolTipUrl)} className="fontSize_4 color_black textDecUnderline pad5 onlyLeftPad" analyticstrack="learnMore-appleMusic-open-link">Learn more</Link>
            }
          </p>
        </Col>
      </Row>
    );
  }

  gotoCurrentPlan() {
    this.props.asyncFetch();
    const { currentPlanUrl } = this.props;
    window.location = currentPlanUrl;
  }

  goBack() {
    window.history.back();
  }

  closeModal(evt) {
    evt.preventDefault();
    this.setState({ showModalDetails: false });
  }

  learnMoreView(url) {
    this.setState({ showModalDetails: true });
    this.url = url;
  }

  render() {
    const {
      cpcPromptInfo,
      cq,
      isFetching,
      currentPlanDetails,
      ctadisabled,
      exploreMMPlanURL,
      modifyExistingPlanUrl,
      isShowTVP,
      isShowCurrentPlan,
      isShowME,
      isShowMM,
      isShowKeepCurrent,
      isDataOnlyPlan,
      isShowMFilex,
      restrictedMessage,
      discountApplicable,
      zipRestrictedAcct,
      globalPromotions,
      mmplanEnabled,
    } = this.props;
    const globalMessage = (globalPromotions && globalPromotions.promoBadgeMessages) || [];
    return (
      <div className="pad24  grid positionRelative fontSize_5">
        {(isFetching === true) && <Loader />}
        {!mmplanEnabled && globalMessage.length > 0 && globalMessage.map((promo, idx) => this.getGlobalMessage(promo, idx))}
        <PlansContent
          cq={cq}
          modifyExistingPlanUrl={modifyExistingPlanUrl}
          exploreMMPlanURL={exploreMMPlanURL}
          isShowKeepCurrent={isShowKeepCurrent}
          isDataOnlyPlan={isDataOnlyPlan}
          isShowMFilex={isShowMFilex}
          restrictedMessage={restrictedMessage}
          isShowMM={isShowMM}
          isShowCurrentPlan={isShowCurrentPlan}
          isShowME={isShowME}
          isShowTVP={isShowTVP}
          cpcPromptInfo={cpcPromptInfo}
          ctadisabled={ctadisabled}
          discountApplicable={discountApplicable}
          zipRestrictedAcct={zipRestrictedAcct}
          // showDataOption={showDataOption}
          // dataPlans={dataPlans}
          currentPlanDetails={currentPlanDetails}
          gotoCurrentPlan={this.gotoCurrentPlan}
          onCpcPromptExploreTVP={this.onCpcPromptExploreTVP}
          // selectedPlanSorId={this.state.selectedPlanSorId}
          // selectedPrice={this.state.selectedPrice}
        />

        {(mmplanEnabled && globalMessage.length > 0) && globalMessage.map((promo, idx) => this.getAppleMusic(promo, idx))}

        {this.state.showModalDetails && <Modal
          mounted={this.state.showModalDetails}
          closeFn={this.closeModal}
          style={{ background: 'white', width: '600px' }}
          underlayColor="#000"
          showCloseX
        >
          {this.url && <iframe src={this.url} className="width100" style={{ height: '50vh', border: '0' }} />}
        </Modal>}
      </div>
    );
  }
}

export default CpcInterceptPrompt;
