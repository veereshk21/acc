/**
 * Created by hmahad on 1/18/2017.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Title from '../../common/Title/Title';

import HeroPriceComponent from '../../common/HeroPrice/HeroPriceComponent';

export default class CartMailInRebate extends Component { // eslint-disable-line

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
      <div className="pad12 onlySidePad">

        <Link to="/" className="margin12 floatLeft  noSideMargin color_000 fontSize_4 fontWeightBold">
          <span
            className="color_red margin6 onlyRightMargin"
          >&#10094;
          </span>{this.props.CQLabel.get('OD_CART_BACK_CTA')}
        </Link>

        <section className="section group pad18 noSidePad">
          <Title className="h2">{this.props.mailInRebateHeader}</Title>
          <p className=" margin12  noSideMargin textAlignCenter">
            <HeroPriceComponent displayPrice={this.props.mailInRebateTotal} />
          </p>
          <p className="fontSize_3 centerBlock width80 ">{this.props.mailInRebateSubTitle}</p>
        </section>

        {this.props.mailInRebateItems.map((item, i) => (
          <div className="dueMonthlyBreakdown" key={i}>
            <section className="section group pad18  ">
              <p className="bold">{item.deviceName}</p>
              <p className="fontSize_3"><span>{item.color}</span>,<span>{item.capacity}</span></p>
            </section>

            <section className="section group pad18 noSidePad ">
              <ul className="noSidePad cartList background_FF">
                <li className="clearfix pad18 ">
                  <span className="col span_4_of_5">{this.props.CQLabel.get('OD_CART_MIR_TITLE')}</span>
                  <span className="col span_1_of_5 textAlignRight  ">${item.rebateAmount}</span>
                </li>
              </ul>
            </section>
          </div>
        ))}
      </div>);
  }
}

CartMailInRebate.propTypes = {
  CQLabel: PropTypes.object,
  mailInRebateItems: PropTypes.array,
  mailInRebateSubTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  mailInRebateTotal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  mailInRebateHeader: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
