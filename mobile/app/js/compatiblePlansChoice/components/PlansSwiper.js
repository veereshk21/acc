import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import Swiper from 'react-id-swiper';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import { getParameterByName } from './../actions';
import HorizontalRule from '../../common/HorizontalRule';

const Cols = styled(Col)`
  display:flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
`;

export default class PlansSwiper extends React.Component {
  constructor(props) {
    super(props);
    this.swiper = null;
  }
  render() {
    const {
      plans, comparePlansEnabled, setAdditionalPlanDetails, cqContent, updateSelectedPlan,
    } = this.props;
    let persistedPlanIndex = 0;
    const editCartPlanSorId = getParameterByName('planSorId');

    plans.forEach((plan, i) => {
      if (plan.currentPlan) {
        persistedPlanIndex = i;
      }
      if (editCartPlanSorId !== null && plan.planSorId === editCartPlanSorId) {
        persistedPlanIndex = i;
      }
    });

    const params = {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      initialSlide: persistedPlanIndex,
      slidesPerView: '1.1',
      spaceBetween: 0,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      watchOverflow: true,
      runCallbacksOnInit: false,
      setWrapperSize: true,

      setAriaAttrs: () => {
        const slides = this.swiper.slides;//eslint-disable-line
        for (let i = 0; i < slides.length; i++) {
          slides[i].setAttribute('aria-hidden', 'true');
        }
        slides[this.swiper.snapIndex].removeAttribute('aria-hidden');
      },
      on: {
        init: () => {
          setTimeout(() => {
            params.setAriaAttrs();
            updateSelectedPlan(this.swiper.slides[this.swiper.snapIndex].dataset.plansorid);
          }, 100);
        },
        slideChange: () => {
          setTimeout(() => {
            params.setAriaAttrs();
            console.log('slideChange', this.swiper.slides[this.swiper.snapIndex].dataset.plansorid, 'persistedIndex', persistedPlanIndex, 'newIndex:', this.swiper.snapIndex);
            updateSelectedPlan(this.swiper.slides[this.swiper.snapIndex].dataset.plansorid);
          }, 50);
        },

      },
    };
    const renderPlans = (plans.map((plan, i) => {
      let {
        header, priceInfo,
      } = plan;
      if (header !== null) {
        header = header.replace('$#price#', plan.priceDisc);
      }
      if (priceInfo !== null) {
        priceInfo = priceInfo.replace('$#price#', plan.priceDisc);
      }
      return (
        <div
          key={'swiper-plan-' + i}
          className="pad15 border_grey noLeftBorder"
          style={{ height: '70vh' }}
          data-plansorid={plan.planSorId}
        >
          <Row className="margin12">
            <Col xs={12}>
              <Row>
                <Col xs={12}>
                  <h1 className="fontSize_2_5" dangerouslySetInnerHTML={{ __html: header }} />
                  <HorizontalRule margin="16px 0" />
                </Col>
              </Row>
              <Row>
                {plan.displayIcon &&
                  <Cols xs={4} >
                    <span style={{ lineHeight: '1', fontSize: '20vw' }} className="fontDisplayBold textRenderingOptimizeLegibility fontSize_13 displayBlock" >
                      {plan.displayIcon}
                    </span>

                  </Cols>}
                <Cols xs={8} >
                  <span className="fontSize_6 fontDisplayBold block">
                    {plan.capacity && Parser(plan.capacity)}
                  </span>
                  {!plan.displayIcon &&
                    <div className="pad3">
                      <span> {priceInfo && Parser(priceInfo)} </span>
                    </div>}
                  {plan.displayIcon && (parseFloat(plan.discountedAccountAccessPrice) < parseFloat(plan.accountAccessPrice) ?
                    <span>
                      <span>${plan.discountedAccountAccessPrice}</span> <br />
                      <span className="textDecLineThrough color_gray_six">${plan.accountAccessPrice}</span>
                    </span>
                    :
                    <span>
                      <span>${plan.accountAccessPrice}</span>
                    </span>)
                  }
                </Cols>
              </Row>
              <HorizontalRule y={1} margin="16px 0" />

              <Row>
                {plan.autopayNotification &&
                  <Col xs={12} className="fontSize_1_3 margin6 onlyBottomMargin">
                    {plan.autopayNotification}
                  </Col>
                }
                {comparePlansEnabled &&
                  <Col xs={12} className="fontSize_1_3 margin6 onlyBottomMargin">
                    <Link
                      to={`/comparePlanCost/${plan.planName}`}
                      className="link onlyBottomPad pad3"
                      analyticstrack="compare-plans"
                    >
                      {cqContent.label.OD_COMPARE_PLAN_COST_LABEL}
                    </Link>
                  </Col>
                }
                {plan.additionalPlanDetails &&
                  <Col xs={12} className="fontSize_1_3  margin6 onlyBottomMargin">
                    <Link
                      to="/planDetails"
                      className="link"
                      analyticstrack="see-plan-details"
                      onClick={
                        () => setAdditionalPlanDetails(plan.additionalPlanDetails)
                      }
                    >
                      View additional plan details
                    </Link>
                  </Col>
                }
                {plan.comparePlans &&
                  <Col xs={12} className="fontSize_1_3 margin6 onlyBottomMargin">
                    <Link className="link" to={`/comparePlan/${plan.planSorId}`} analyticstrack="compare-plans">{cqContent.label.OD_COMPARE_PLAN_LABEL}</Link>
                  </Col>
                }
                {plan.voiceMessageInfo &&
                  <Col xs={12} className="fontSize_1_3">
                    {Parser(plan.voiceMessageInfo)}
                  </Col>
                }

              </Row>


            </Col>
          </Row>
        </div>
      );
    }));

    return (
      <div>
        <Swiper {...params} ref={(node) => this.swiper = node !== null ? node.swiper : null}>
          {renderPlans}
        </Swiper>
      </div>);
  }
}

PlansSwiper.propTypes = {
  plans: PropTypes.array,
  comparePlansEnabled: PropTypes.bool,
  setAdditionalPlanDetails: PropTypes.func,
  cqContent: PropTypes.object,
  updateSelectedPlan: PropTypes.func,
};
