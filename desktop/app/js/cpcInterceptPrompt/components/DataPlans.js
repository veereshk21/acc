import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';
import Swiper from 'react-id-swiper';

export default class DataPlans extends React.Component {
  static propTypes = {
    plans: PropTypes.array.isRequired,
    selectedPlanSorId: PropTypes.string,
    onPlanSelected: PropTypes.func,
    cq: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.selectPlan = this.selectPlan.bind(this);
  }

  selectPlan(plan) {
    this.props.onPlanSelected(plan);
  }
  renderPlanSlides() {
    const { plans, selectedPlanSorId } = this.props;
    return (plans.map((plan, i) => (
      <div
        key={'swiper-plan-' + i}
        className={'pad10 compatiblePlansWrap background-gray ' + ((selectedPlanSorId === plan.planSorId) ? 'is-active ' : ' ') + (plan.currentPlan ? 'currentPlan bold' : '')}
        style={{ height: 'auto' }}
        data-plansorid={plan.planSorId}
        onClick={this.selectPlan.bind(this, plan)}
        analyticstrack="select-cpcInterceptPlan-swiperBox"
        role="presentation"
      >
        <div style={{ minHeight: '100px', paddingTop: '40px', height: 'auto' }}>
          <div className="planCentre">
            <div className="fontSize_8 fontDisplayBold pad10 noSidePad" style={{ height: '50px' }}>
              {plan.planCapacity || plan.planName}
            </div>
            <div className="fontSize_8 fontDisplayBold pad10 noSidePad background_gray_three">
              ${plan.price}
            </div>
          </div>
        </div>
      </div>
    )));
  }
  render() {
    const { plans, cq } = this.props;
    const singlePlan = plans.length <= 1;
    const self = this;

    const params = {
      navigation: {
        nextEl: '.swiper-button-next.swiper-button-black',
        prevEl: '.swiper-button-prev.swiper-button-black',
      },
      slidesPerView: 7,
      spaceBetween: 20,
      containerClass: 'compatiblePlansSlider',
      noSwiping: singlePlan, // disable swiping for single plan
    };

    return (
      <Row>
        <Col xs={12} className="margin18 onlyBottomMargin">
          <div className="bold">{cq.label.DT_OD_CPC_INTERCEPT_CHOOSE_DATA_HEADING}</div>
          <div>{cq.label.DT_OD_CPC_INTERCEPT_CHOOSE_DATA_DESCRIPTION}</div>
        </Col>
        <Col xs={12}>
          <div className="background_supporting relative" style={{ margin: '0 30px 18px' }}>
            <Swiper {...params}>
              {self.renderPlanSlides(plans)}
            </Swiper>
          </div>
        </Col>
      </Row>
    );
  }
}
