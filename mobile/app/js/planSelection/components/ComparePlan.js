import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Title from '../../common/Title/Title';
import Loader from '../../common/Loader/Loader';
import HeroPriceComponent from '../../common/HeroPrice/HeroPriceComponent';

export default class PlanDetails extends React.Component {
  componentDidMount() {
    /*
     * Make async calls to fetch data
     * */
    this.props.getComparePlanDetails(this.props.comparePlansURL, this.props.comparePlanSKU);
  }
  // getComparePlanDetails,comparePlansURL,comparePlanSKU, isFetching, cqData, comparePlanDetails

  render() {
    const { comparePlanDetails, cqData, isFetching } = this.props;


    if (!comparePlanDetails.plans || isFetching) {
      return (<Loader />);
    }

    return (

      <section className="section pad24 noSidePad">

        <Title>{cqData.label.OD_COMPARE_PLAN_TITLE}</Title>
        <div className="comparePlanWrap">
          <div className="positionRelative floatLeft width100">

            {
              comparePlanDetails.plans && comparePlanDetails.plans.map((plan, index) => (
                <div key={index} className="width50 margin18 noSideMargin textAlignCenter floatLeft">
                  {(typeof plan.planImageUrl !== 'undefined' && plan.planImageUrl !== null) ? <img src={`${plan.planImageUrl}?&hei=80`} alt="planimage" className="centerBlock" /> : <div>{(plan.plan_letter !== null) ? <div className="textAlignCenter fontSize_10 bold" style={{ marginTop: '-15px', height: '96px' }}>{plan.plan_letter}<div className="fontSize_3 bold">{plan.plan_size}</div></div> : <div className="textAlignCenter fontSize_8 bold" style={{ marginTop: '4px', height: '72px' }}>{plan.plan_size}</div>}</div>}
                  <div className="margin30 onlyTopMargin">
                    <HeroPriceComponent
                      displayPrice={plan.plan_amount}
                    >{plan.plan_amount}
                    </HeroPriceComponent>
                  </div>
                </div>
              ))
            }
            <div className="positionAbsolute color_959595 left50 top50">&rarr;</div>
          </div>
          <div
            className="clearBoth textAlignCenter pad18 noTopPad"
          >{cqData.label.OD_COMPARE_PLAN_TAXES_TEXT}<br />
            <Link
              to="/taxesDetail"
              className="link"
            >{cqData.label.OD_COMPARE_PLAN_LEARN_MORE_BUTTON_TEXT}
            </Link>
          </div>
          {
            comparePlanDetails.features && comparePlanDetails.features.map((feature, index) => (
              <div key={index} className="clearBoth width100 floatLeft">
                <div className="background_primary pad6 clearBoth  bold">
                  <span
                    className="pad12 onlyLeftPad"
                  >{feature.title}
                  </span>
                </div>
                <div className="clearBoth width100 floatLeft positionRelative">
                  <div className="width50 floatLeft pad24 noSidePad">
                    {(feature.description !== null) &&
                      <div className="clearfix">
                        <div
                          className="fontSize_6 bold textAlignCenter"
                        ><span>{feature.description.value1}</span>
                        </div>
                      </div>}
                    {
                      (feature.subDescription !== null) &&
                      <div
                        className="fontSize_2 color_000 textAlignCenter"
                      >
                        <span
                          className="textAlignRight displayInlineBlock color_666"
                        >{feature.subDescription.value1}
                        </span>
                      </div>}
                    {
                      (feature.breakdowns !== null) &&
                      feature.breakdowns.map((breakdown, featureIndex) => (
                        <div className="clearfix margin12 noSideMargin" key={`${featureIndex}+featureIndex`}>
                          {(breakdown.title !== null) ?
                            <div className="floatLeft span_6_of_12 pad12 onlyLeftPad">{breakdown.title}</div> :
                            <div className="floatLeft span_6_of_12">&nbsp;</div>}
                          <div
                            className="floatLeft fontSize_2 span_6_of_12 color_000 bold textAlignCenter"
                          >{breakdown.value1}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <div className="positionAbsolute color_959595 left50 top50">&rarr;</div>
                  <div className="width50 floatLeft background_supporting pad24 noSidePad">
                    {(feature.description !== null) &&
                      <div className="clearfix ">
                        <div
                          className="fontSize_6 bold textAlignCenter"
                        ><span>{feature.description.value2}</span>
                        </div>
                      </div>}
                    {
                      (feature.subDescription !== null) &&
                      <div
                        className="fontSize_2 color_000 textAlignCenter"
                      >
                        <span
                          className="textAlignRight displayInlineBlock color_666"
                        >{feature.subDescription.value2}
                        </span>
                      </div>}
                    {
                      (feature.breakdowns !== null) &&
                      feature.breakdowns.map((breakdown, featureIndex) => (
                        <div key={`${featureIndex}+featureIndex`} className="margin12 noSideMargin">
                          <div
                            className="fontSize_2 color_000 bold textAlignCenter"
                          >{breakdown.value2}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>))
          }
          <div
            className="clearBoth pad24  "
          >{comparePlanDetails.additionalPlanDetail.description}&nbsp;
            <Link
              to="/comparePlanDetail"
              className="link"
            >{comparePlanDetails.additionalPlanDetail.linkText}
            </Link>
          </div>
          <div className="pad30 noSidePad textAlignCenter clearBoth">
            <Link
              to="/"
              className="large  button primary centerBlock "
              style={{ width: '30%' }}
            >{cqData.label.OD_COMPARE_PLAN_GOT_IT_BUTTON_TEXT}
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
PlanDetails.propTypes = {
  getComparePlanDetails: PropTypes.func,
  comparePlansURL: PropTypes.string,
  comparePlanSKU: PropTypes.string,
  isFetching: PropTypes.bool,
  cqData: PropTypes.object,
  comparePlanDetails: PropTypes.object,
};

