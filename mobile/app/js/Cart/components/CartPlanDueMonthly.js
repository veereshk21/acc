/* eslint-disable jsx-a11y/tabindex-no-positive */
import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Row, Col } from 'react-flexbox-grid';
import HorizontalRule from '../../common/HorizontalRule';
import BackButton from '../../common/BackButton/BackButton';
import HeroPriceComponent from '../../common/HeroPrice/';
import ItemBreakdown from '../../common/ItemBreakDown/';

export default class CartDueMonthly extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidMount() {
    // Accessibility focus fix for hash navigation
    const pageTitle = document.getElementById('section_title');
    if (pageTitle) {
      pageTitle.focus();
    }
  }
  componentWillReceiveProps(newProps) {
    if (!newProps.isFetching) {
      window.hideLoader();
    }
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.log('Error:', error, '\n Info:', info);
    // You can also log the error to an error reporting service
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div>Something went wrong.</div>;
    }

    return (
      <Grid className="pad12 onlyTopPad">
        <Row className="noSideMargin">
          <Col xs={12} className="noSidePad">
            <BackButton to="/" />
          </Col>
        </Row>
        <Row className="noSideMargin pad24">
          <Col xs={12}>
            <Row className="noSideMargin ">
              <Col xs={12} className="noSidePad">
                <h1 className=" noSidePad">{this.props.CQLabel.get('OD_CART_PLAN_DUE_MONTHLY_TITLE')}</h1>
                <HorizontalRule />
              </Col>
            </Row>
            <HeroPriceComponent displayPrice={this.props.planOnlyDueMonthly} className="noSidePad" />
            {this.props.plans.map((item) => (
              <ItemBreakdown
                name={<span className="fontDisplayBold">{item.get('planDisplayName')}</span>}
                price={this.props.planOnlyDueMonthly}
                strikeoutprice={(parseFloat(item.get('accountAccess').get('originalPlanAmount')) > parseFloat(item.get('accountAccess').get('price'))) ? item.get('accountAccess').get('originalPlanAmount') : null}
              >
                <span className="displayBlock" dangerouslySetInnerHTML={{ __html: item.get('planDescription') }} />
              </ItemBreakdown>
            ))}
          </Col>
        </Row>
      </Grid>
    );
  }
}

CartDueMonthly.propTypes = {
  CQLabel: PropTypes.object,
  planOnlyDueMonthly: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  plans: PropTypes.array,
};
