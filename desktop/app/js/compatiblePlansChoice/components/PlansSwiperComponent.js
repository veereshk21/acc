import { Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import React from 'react';
import Swiper from 'react-id-swiper';
import A from './../../common/A/A';
import ToolTip from './../../common/ToolTip/index';

export default class PlansSwiperComponent extends React.Component {
  static propTypes = {
    plans: PropTypes.array.isRequired,
    selectedPlanSorId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    onPlanSelected: PropTypes.func,
    cqKeys: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.selectPlan = this.selectPlan.bind(this);
  }

  selectPlan(event, plan) {
    event.preventDefault();
    this.props.onPlanSelected(plan);
  }

  renderPlanSlides() {
    const { plans, selectedPlanSorId, cqKeys } = this.props;
    return (plans.map((plan, i) => (
      <A
        tabIndex="0"
        key={'swiper-plan-' + i}
        className={'outlineFocus pad10 compatiblePlansWrap border_CC ' + ((selectedPlanSorId === plan.planSorId) ? 'is-active largeBorder_black' : '')}
        style={{ height: '501px' }}
        data-plansorid={plan.planSorId}
        onClick={(event) => {
          this.selectPlan(event, plan);
        }}
        href="#"
        analyticstrack="select-eachPlan-linkSlider"
        role="presentation"
      >
        <Row className="margin18 onlyBottomMargin">
          <div className="pad12 onlySidePad" style={{ height: '500px' }}>
            <div style={{ height: '250px', borderBottom: '1px solid #000' }}>
              {plan.jaxPlan ?
                <div className="fontSize_8 fontDisplayBold pad10 noSidePad">
                  <span dangerouslySetInnerHTML={{ __html: plan.capacity }} />
                </div> :
                <div className="fontSize_8 fontDisplayBold pad10 noSidePad">
                  {plan.capacityDesc}
                </div>
              }
              <div dangerouslySetInnerHTML={{ __html: plan.planDesc }} className="pad36 onlyBottomPad fontSize_3" />
              <div>
                <div>
                  {plan.discounted && plan.totalDiscountedPlanPrice ?
                    <div>
                      <span className="bold fontSize_12">${plan.totalDiscountedPlanPrice}</span><span className="fontSize_7">/mo</span>
                    </div>
                    :
                    <div>
                      <span className="bold fontSize_12">${plan.totalPlanPrice}</span><span className="fontSize_7">/mo</span>
                    </div>
                  }
                </div>
                {plan.jaxPlan ?
                  <div className="fontSize_1 margin18 onlyBottomMargin">
                    Includes plan access fees.
                  </div> :
                  <div className="fontSize_1 margin18 onlyBottomMargin">
                    <span className="displayInlineBlock">Includes account & line access fees.</span>
                    <span className="displayInlineBlock">Doesn&apos;t include taxes & fees.</span>
                  </div>
                }
                <div>
                  {plan.autopayNotification &&
                    <div className="">
                      <span className="fontSize_1">{cqKeys.label.DT_OD_PLAN_AUTOPAY_TEXT}</span> <span className="a11y-tooltip" />
                      <ToolTip
                        hideHeader="true"
                        direction="bottom"
                        className="margin3 onlyLeftMargin fontSize_4 cpc_tooltop"
                        header=""
                        text={cqKeys.label.DT_OD_PLAN_AUTOPAY_TOOLTIP}
                      />
                    </div>
                  }
                </div>
              </div>
            </div>
            <div style={{ height: '225px', overflow: 'hidden' }} className="margin18 onlyTopMargin">
              <div className="bold margin6 onlyBottomMargin fontSize_3">Includes:</div>
              <div className="fontSize_3 margin18 onlyBottomMargin" dangerouslySetInnerHTML={{ __html: plan.voiceMessageInfo }} />
              {!plan.jaxPlan &&
                <div className="fontSize_1">Data overage: $15 per GB</div>
              }
            </div>
          </div>
        </Row>
      </A>
    )));
  }
  render() {
    const { plans } = this.props;
    const singlePlan = plans.length <= 1;
    const self = this;

    const params = {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      renderCustomPrevButton: () => <div className="swiper-button-prev cpcPrev" analyticstrack="select-previousPlan-sliderCTA"><div className="carouselParent"><div className="carouselStyle"><div className="carouselTextStyle">See other plan sizes</div></div></div></div>,
      renderCustomNextButton: () => <div className="swiper-button-next cpcNext" analyticstrack="select-nextPlan-sliderCTA"><div className="carouselParent"><div className="carouselStyle"><div className="carouselTextStyle">See other plan sizes</div></div></div></div>,
      slidesPerView: 4,
      spaceBetween: 20,
      slidesPerGroup: 3,
      containerClass: 'compatiblePlansSlider',
      noSwiping: singlePlan, // disable swiping for single plan
      breakpoints: {
        // when window width is <= 640px
        640: {
          slidesPerView: 'auto',
          spaceBetween: 30,
          slidesPerGroup: 1,
        },
        // when window width is <= 800px
        800: {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 1,
        },
        // when window width is <= 1050px
        1050: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    };

    return (
      <div className=" relative margin6 onlyBottomMargin">
        <Swiper {...params}>
          {self.renderPlanSlides(plans)}
        </Swiper>
      </div>
    );
  }
}
