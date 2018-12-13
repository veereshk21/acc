import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../common/HorizontalRule';

export default class CartPlanDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentWillMount() {
    if (!this.props.plans) {
      window.location.href = '/#genericError';
    }
  }


  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log('Error:', error, '\n Info:', info);
    // You can also log the error to an error reporting service
  }
  render() {
    const {
      plans, CQLabel, inlinePlan, otherPlans, lineLevelOpted, changePlanUrl,
    } = this.props;
    const _planList = inlinePlan || otherPlans || plans.items;
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong.</div>;
    }
    return (
      <Row >
        {(_planList && _planList.length > 0) && _planList.map((planItem, i) => {
          const planImgURL = planItem.planImageURL ? (planItem.planImageURL.indexOf('?') > -1 ? planItem.planImageURL.split('?')[0] : planItem.planImageURL) : false;
          const planPrice = lineLevelOpted ? planItem.dueMonthly : planItem.accountAccess.planAmount;
          return (
            <Col
              key={`plan-${i}`
              }
              xs={12}
              className="noSidePad"
            >
              <Row className="noSideMargin">
                <Col xs={7}>

                  <div>
                    <div className="fontDisplayMedium fontSize_1_3" dangerouslySetInnerHTML={{ __html: planItem.planDisplayName }} />
                    <div className="fontSize_1_3" dangerouslySetInnerHTML={{ __html: planItem.planDescription }} />
                  </div>

                  <div className="fontSize_1_3 " dangerouslySetInnerHTML={{ __html: `$${planPrice}/mo` }} />
                  <div className="pad32 noSidePad ">
                    <a
                      role="button"
                      className="button secondary small"
                      href={changePlanUrl || planItem.planChangeURL}
                      analyticstrack="edit-plan-from-cart"
                    ><span>{CQLabel.get('OD_CART_MAIN_EDIT_CTA')}</span>
                    </a>
                  </div>
                </Col>
                <Col xs={5} className="textAlignRight">
                  {planImgURL && <img
                    src={`${planImgURL}?wid=100`}
                    srcSet={`${planImgURL}?wid=200 2x`}
                    alt={planItem.planDisplayName}
                  />}
                  {!planImgURL && planItem.planSize && planItem.unitOfMeasure &&
                    <div className="textAlignLeft floatRight">
                      <div className="fontDisplayBold fontSize_8 color_000" style={{ lineHeight: 1 }}>{planItem.planSize}<span className="block fontSize_7 color_000 fontDisplayBold" style={{ lineHeight: 1 }}>{planItem.unitOfMeasure}</span></div>

                    </div>
                  }
                </Col>
                <Col xs={12}>
                  <HorizontalRule y={1} margin="0" color="#D8DADA" />
                </Col>
              </Row>
            </Col>
          );
        })
        }
      </Row>
    );
  }
}
CartPlanDetails.defaultProps = {

};
CartPlanDetails.propTypes = {
  plans: PropTypes.object,
  inlinePlan: PropTypes.array,
  otherPlans: PropTypes.array,
  CQLabel: PropTypes.object,
  lineLevelOpted: PropTypes.bool,
  changePlanUrl: PropTypes.string,
};
