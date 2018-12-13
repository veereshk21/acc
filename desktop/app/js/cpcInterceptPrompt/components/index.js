import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { SINGLE_LINE } from './../constants';
import AsyncComponent from '../../common/AsyncComponent';

const MultiPlanContent = AsyncComponent(() => import('./MultiPlanContent'));
const PlanSelectionTab = AsyncComponent(() => import('./PlanSelectionTab'));
const Loader = AsyncComponent(() => import('../../common/Loader/Loader'));
const Button = AsyncComponent(() => import('../../common/Button/Button'));
const SinglePlanContent = AsyncComponent(() => import('./SinglePlanContent'));
const PlanDetails = AsyncComponent(() => import('./PlanDetails'));

class CpcInterceptPrompt extends Component {
  static propTypes = {
    cpcInterceptPromptInfo: PropTypes.object.isRequired,
    currentPlanDetails: PropTypes.object,
    cq: PropTypes.object.isRequired,
    isFetching: PropTypes.bool,
    asyncFetch: PropTypes.func,
    isMultiUpgrade: PropTypes.bool,
    acceptUrl: PropTypes.string,
    declineUrl: PropTypes.string,
    multiUpgradeContent: PropTypes.object,
    multiUpgradeCheck: PropTypes.func,
    showDataOption: PropTypes.bool,
    ctadisabled: PropTypes.bool,
    dataPlanDetails: PropTypes.object,
    dataOptionsNW: PropTypes.func,
    dataPlans: PropTypes.array,
    selectedDataPlan: PropTypes.object,
    isSingleDevicePlan: PropTypes.bool,
    autopayNotification: PropTypes.bool,
    singleDevicePlan: PropTypes.object,
    isNationwide: PropTypes.bool,
    totalCost: PropTypes.string,
    selectPlanURL: PropTypes.string,
    montlyLineAccessFees: PropTypes.string,
    isMonthlyAccessDiscount: PropTypes.bool,
    isLineAccessDiscount: PropTypes.bool,
    monthlyDiscountPrice: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.onCpcInterceptPromptDecline = this.onCpcInterceptPromptDecline.bind(this);
    this.gotoExplorePlan = this.gotoExplorePlan.bind(this);
    this.onPlantypeChangeHandler = this.onPlantypeChangeHandler.bind(this);
    this.state = {
      selectedPlanSorId: props.selectedDataPlan && props.selectedDataPlan.planSorId,
      selectedPrice: (props.selectedDataPlan && props.selectedDataPlan.price) || '0.00',
      viewState: props.isSingleDevicePlan,
      totalCost: props.totalCost,
      planName: (props.selectedDataPlan && props.selectedDataPlan.planName) || props.currentPlanDetails.currentPlanName,
      planPrice: (props.selectedDataPlan && props.selectedDataPlan.price) || props.currentPlanDetails.monthlyAccessCost,
      discountedPlanPrice: props.isMonthlyAccessDiscount && props.monthlyDiscountPrice,
      isCurrentPlan: props.selectedDataPlan && props.selectedDataPlan.currentPlan,
    };
  }

  onPlantypeChangeHandler(type) {
    this.setState({ viewState: type === SINGLE_LINE });
  }

  onCpcInterceptPromptDecline() {
    const { selectPlanURL, isNationwide, isMultiUpgrade, declineUrl, multiUpgradeCheck, multiUpgradeContent, dataPlanDetails, dataOptionsNW } = this.props;
    if (isNationwide) {
      dataOptionsNW(declineUrl, dataPlanDetails);
    } else if (isMultiUpgrade) {
      multiUpgradeCheck(declineUrl, { multiUpgradeContent });
    } else if (!this.state.viewState && this.state.selectedPlanSorId && !this.state.isCurrentPlan) {
      window.location = `${selectPlanURL}?planSorId=${this.state.selectedPlanSorId}&isDPSelected=true`;
    } else {
      window.location = declineUrl;
    }
  }

  getTotalCost(selectedPrice) {
    return parseFloat(parseFloat(selectedPrice) + parseFloat(this.props.montlyLineAccessFees)).toFixed(2);
  }

  gotoExplorePlan() {
    this.props.asyncFetch();
    const { isMultiUpgrade, acceptUrl, multiUpgradeCheck, multiUpgradeContent } = this.props;
    if (isMultiUpgrade) {
      multiUpgradeCheck(acceptUrl, multiUpgradeContent);
    } else {
      window.location = acceptUrl;
    }
  }

  goBack() {
    window.history.back();
  }

  render() {
    const {
      cpcInterceptPromptInfo,
      cq,
      isFetching,
      currentPlanDetails,
      ctadisabled,
      showDataOption,
      dataPlans,
      isSingleDevicePlan,
      autopayNotification,
      singleDevicePlan,
      isMonthlyAccessDiscount,
      isNationwide,
      isLineAccessDiscount,
    } = this.props;

    return (
      <div className="pad24  grid positionRelative fontSize_5">
        {(isFetching === true) && <Loader />}
        {isSingleDevicePlan &&
          <PlanSelectionTab cq={cq} onPlantypeChangeHandler={this.onPlantypeChangeHandler} singlePlan={this.state.viewState} />
        }
        {this.state.viewState ?
          <SinglePlanContent
            cq={cq}
            autopayNotification={autopayNotification}
            singleDevicePlan={singleDevicePlan}
          /> : <MultiPlanContent
            cq={cq}
            cpcInterceptPromptInfo={cpcInterceptPromptInfo}
            ctadisabled={ctadisabled}
            showDataOption={showDataOption}
            dataPlans={dataPlans}
            currentPlanDetails={currentPlanDetails}
            gotoExplorePlan={this.gotoExplorePlan}
            onCpcInterceptPromptDecline={this.onCpcInterceptPromptDecline}
            onPlanSelected={(plan) => this.setState({
              selectedPlanSorId: plan.planSorId,
              selectedPrice: plan.price,
              totalCost: this.getTotalCost(plan.price),
              planName: plan.planName,
              planPrice: plan.price,
              discountedPlanPrice: plan.finalPrice,
              isCurrentPlan: plan.currentPlan,
            })}
            selectedPlanSorId={this.state.selectedPlanSorId}
            selectedPrice={this.state.selectedPrice}
          />
        }
        <PlanDetails
          currentPlanDetails={currentPlanDetails}
          isNationwide={isNationwide}
          cq={cq}
          planName={this.state.planName}
          planPrice={this.state.planPrice}
          monthlyDiscountPrice={this.state.discountedPlanPrice}
          isLineAccessDiscount={isLineAccessDiscount}
          viewState={this.state.viewState}
          totalCost={this.state.totalCost}
          isMonthlyAccessDiscount={isMonthlyAccessDiscount}
        />
        <footer>
          <Row>
            <Col xs={7}>
              <button className="button bold secondary large" analyticstrack="select-goBack-page-CTA" type="button" onClick={this.goBack.bind()} dangerouslySetInnerHTML={{ __html: cq.label.DT_OD_CPC_INTERCEPT_BACK_BTN }} />
            </Col>
            <Col xs={5} className="textAlignRight">
              <Button
                className="bold large"
                onClick={this.onCpcInterceptPromptDecline}
                disabled={ctadisabled}
                analyticstrack="select-cpcInterceptPlan-CTA"
              >{showDataOption ? cq.label.DT_OD_CPC_INTERCEPT_CONTINUE_BTN : cq.label.DT_OD_CPC_INTERCEPT_DECLINE_BTN}
              </Button>
            </Col>
          </Row>
          <section className="fontSize_3 color_gray_ten margin20 noSideMargin pad30 onlyBottomPad" dangerouslySetInnerHTML={{ __html: cq.html.DT_OD_CPC_INTERCEPT_PROMPT_LEGAL }} />
        </footer>
      </div>
    );
  }
}

export default CpcInterceptPrompt;
