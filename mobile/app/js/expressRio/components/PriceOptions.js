/*
 * Created on Wed Aug 30 2017
 *
 * Copyright (c) 2017 Verizon Wireless
 * Author Srikrishna Gumma
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PriceOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pricedescription: props.sku.notradein[0].priceMsgDescription,
      frpdescription: '; ' + props.sku.notradein[1].priceMsgDescription + ': ',
      frpprice: props.sku.notradein[1].priceMsg,
    };
  }
  onPriceChange = () => {
    const val = this.price.value;
    let contractTerm = this.props.contractTerm; // eslint-disable-line
    let { frpprice } = this.state;
    let { frpdescription } = this.state;
    if (val === '0') {
      contractTerm = 99;
      frpprice = this.props.sku.notradein[1].priceMsg;
      frpdescription = '; ' + this.props.sku.notradein[1].priceMsgDescription + ': ';
    } else {
      contractTerm = 0;
      frpprice = '';
      frpdescription = '';
    }
    this.setState({
      pricedescription: this.props.sku.notradein[val].priceMsgDescription,
      frpprice,
      frpdescription,
    });
    this.props.onPriceChange(contractTerm);
  }
  render() {
    const { sku, title, contractTerm } = this.props;
    const { pricedescription, frpdescription, frpprice } = this.state;
    return (
      <div>
        <label htmlFor="pricedd" className="fontSize_2 color_959595 ">{title}</label>
        <div className="selectpicker2">
          <select ref={(price) => this.price = price} onChange={this.onPriceChange} id="pricedd" name="pricedd" value={contractTerm === 99 ? '0' : '1'}>
            {sku.notradein.map((pricing, index) => <option key={pricing.priceMsg} value={index} >{pricing.priceMsg}</option>)}
          </select>
        </div>
        <div className="fontSize_2 color_959595 margin18 onlyTopMargin">{pricedescription} {frpdescription} {frpprice}</div>
      </div>
    );
  }
}

PriceOption.propTypes = {
  onPriceChange: PropTypes.func,
  sku: PropTypes.object,
  title: PropTypes.string,
  contractTerm: PropTypes.number,
};

export default PriceOption;
