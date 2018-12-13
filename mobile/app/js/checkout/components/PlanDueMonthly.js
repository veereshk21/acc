/* eslint-disable jsx-a11y/tabindex-no-positive */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';

import BackButton from '../../common/BackButton/BackButton';
import HorizontalRule from '../../common/HorizontalRule';
import HeroPriceComponent from '../../common/HeroPrice/';
import ItemBreakdown from '../../common/ItemBreakDown/';

export default class CartDueMonthly extends React.Component {
  componentDidMount() {
    // Accessibility focus fix for hash navigation
    const pageTitle = document.getElementById('section_title');
    if (pageTitle) {
      pageTitle.focus();
    }
  }
  componentWillReceiveProps(newProps) {
    if (!newProps.isFetching && window.hideLoader) {
      window.hideLoader();
    }
  }
  render() {
    const { cqContent, plans } = this.props;
    return (
      <Grid className="pad12 onlyTopPad">

        <Row className="noSideMargin">
          <Col xs={12} className="noSidePad">
            <BackButton to="/">{cqContent.label.OD_CHECKOUT_BACK_TEXT}</BackButton>
          </Col>
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={12}>
            <Row className="noSideMargin ">
              <Col xs={12} className="noSidePad">
                <h1 className=" noSidePad">{cqContent.label.OD_CHECKOUT_PLAN_DUE_MONTHLY_TEXT}</h1>
                <HorizontalRule />
              </Col>
            </Row>
            <HeroPriceComponent margin="32px 0" className="noSidePad" displayPrice={this.props.totalDueMonthly} />

            {plans.map((plan) => (
              <div key={plan.get('totalMonthlyPlanCost')}>
                <ItemBreakdown
                  name={<span className="fontDisplayMedium fontSize_1_3" dangerouslySetInnerHTML={{ __html: plan.get('planDisplayName') }} />}
                  price={plan.get('totalMonthlyPlanCost')}
                >
                  <span className="displayBlock fontSize_1_3 color_gray_six" dangerouslySetInnerHTML={{ __html: plan.get('planDescription') }} />
                </ItemBreakdown>
              </div>
            ))}
          </Col>
        </Row>
      </Grid>
    );
  }
}


CartDueMonthly.propTypes = {
  cqContent: PropTypes.object,
  totalDueMonthly: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  plans: PropTypes.array,
  // isFetching: PropTypes.bool,
};
