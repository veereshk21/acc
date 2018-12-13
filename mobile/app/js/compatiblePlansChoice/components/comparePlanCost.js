import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';
import HeroPriceComponent from '../../common/HeroPrice/HeroPriceComponent';
import ComparePlanCostBox from './ComparePlanCostBox';

const PlanDetails = ({ comparePlanCostView, selectedPlan, cqContent }) => {
  if (!comparePlanCostView.currentPlan && !selectedPlan) {
    return (<Loader />);
  }
  const planPrice = (selectedPlan.price).replace(/[`~!@#$%^&*()_|+\-=?;:'",<>{}[]]/gi, '').split('/');
  const arrowLocate = { top: '10px', right: '-5px' };
  let planPage = '';
  setTimeout(() => { window.scrollTo(0, 0); }, 0); /* set(0,0) focus On Page Load */
  if (selectedPlan.planName === 'punlimited') {
    planPage = cqContent.label.OD_UNLIMITED_P_PLAN_DETAILS_LABEL;
  } else if (selectedPlan.planName === 'vunlimited') {
    planPage = cqContent.label.OD_UNLIMITED_V_PLAN_DETAILS_LABEL;
  }
  return (
    <section className="section pad24 noSidePad">
      <Title>{comparePlanCostView.comparePlanHeader}</Title>
      <div className="onlySidePad pad5">
        {/* END: Icons of plans */}
        <div className="width50 margin18 noSideMargin textAlignCenter floatLeft">
          <p className="lineHeight36 fontSize_9 bold">{comparePlanCostView.currentPlan.displayIcon}</p>
          <p className="lineHeight36 fontSize_5 bold" dangerouslySetInnerHTML={{ __html: comparePlanCostView.currentPlan.capacity }} />
        </div>
        <div className="width50 margin18 noSideMargin textAlignCenter floatLeft">
          <p className="lineHeight36 fontSize_9 bold">{selectedPlan.displayIcon}</p>
          <p className="lineHeight36 fontSize_5 bold" dangerouslySetInnerHTML={{ __html: selectedPlan.capacity }} />
        </div>
        {/* END: Icons of plans */}

        {/* START: Plans prices large */}
        <div className="width50 margin18 noSideMargin textAlignCenter floatLeft positionRelative">
          <HeroPriceComponent displayPrice={comparePlanCostView.currentPlan.price} />
          <div className="positionAbsolute lightGray" style={arrowLocate}>&#8594;</div>
        </div>
        <div className="width50 margin18 noSideMargin textAlignCenter floatLeft">
          <HeroPriceComponent displayPrice={planPrice[0]} />
        </div>
        {/* END: Plans prices large */}
      </div>

      {/* START: Learn More */}
      <div className="clearBoth textAlignCenter fontSize_2 pad36 bold onlyBottomPad">
        <p className="grey">{comparePlanCostView.comparePlanSurcharges}</p>
        <Link to="/importantPlanInfo" className="link onlyBottomPad" analyticstrack="im-plan-info">
          {cqContent.label.OD_LEARN_MORE_PLAN_TEXT}
        </Link>
      </div>
      {/* END: Learn More */}

      <div className="clearfix width100 section">
        {/* START TO LOOP : Plans comparison Description */}
        {comparePlanCostView.currentPlan.compareDetails.map((compareDetails, index) => {
          const validationFilter = selectedPlan.compareDetails.filter((plan) => plan.sectionTitle === compareDetails.sectionTitle);

          return (
            <ComparePlanCostBox
              key={index}
              sectionTitle={compareDetails.sectionTitle}
              userCurrentPlan={compareDetails}
              userSelectedPlan={validationFilter[0]}
            />);
        })}
      </div>
      {/* END TO LOOP : Plans comparison Description */}
      {(planPage) &&
        <div className="width100 clearBoth fontSize_1 pad36 onlySidePad bold">
          <span className="lightGray margin20 onlyTopMargin displayInlineBlock">
            {planPage}
          </span>
          <Link to="/importantDataServiceInfo" className="link onlyBottomPad" analyticstrack="imp-data-info">
            {cqContent.label.OD_ADDITIONAL_PLAN_DETAILS_LABEL}
          </Link>
        </div>
      }
      <div className="margin18 textAlignCenter">
        <button className="primary button large" type="submit" analyticstrack="compare-plan-cost">
          {cqContent.label.OD_CHECKOUT_COMPARE_PLAN_COST_TEXT}
        </button>
      </div>
    </section>
  );
};

PlanDetails.propTypes = {
  comparePlanCostView: PropTypes.object.isRequired,
  selectedPlan: PropTypes.object.isRequired,
  cqContent: PropTypes.object.isRequired,

};

export default PlanDetails;
