/**
 * Created by hmahad on 1/19/2017.
 */


import React, { Component } from 'react';


export default class HeroPriceComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: '$',
      price: '0',
      cents: '00',
    };
  }

  componentWillMount() {
    const displayPrice = this.props.displayPrice;

    const heroPrice = displayPrice.toString().split('.');

    this.setState({
      price: heroPrice[0],
      cents: heroPrice[1] ? heroPrice[1] : '00',
    });
  }

  render() {
    return (
      <span className="positionRelative fontSize_7 fontWeightBold" aria-label={`$${this.state.price}.${this.state.cents}`}>
        <span aria-hidden="true">
          <span className="pricingStyle">{this.state.currency}</span><span >{this.state.price}</span><sup className="fontSize_4">{this.state.cents}</sup>
        </span>
      </span>
    );
  }
}

HeroPriceComponent.propTypes = {
  displayPrice: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
};
