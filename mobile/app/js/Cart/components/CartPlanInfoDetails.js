/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackButton from '../../common/BackButton/BackButton';
import Title from '../../common/Title/Title';


export default class CartPlanInfoDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
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
      <section className="section pad24 onlyTopPad">
        <span className="pad6 onlyLeftPad"><BackButton /></span>
        <div className="pad24 noTopPad">
          <Title className="h2 margin18  noTopMargin textAlignCenter">Here are some more details about your plans</Title>
          <div
            className="cart_PlanInfo"
            dangerouslySetInnerHTML={{ __html: this.props.cqHTML[`OD_CART_PLAN_${this.props.sku}`] }}
          />
        </div>
      </section>);
  }
}
CartPlanInfoDetails.propTypes = {
  cqHTML: PropTypes.object,
  sku: PropTypes.string,
};
