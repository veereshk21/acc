/*
 * Created on Wed Aug 30 2017
 *
 * Copyright (c) 2017 Verizon Wireless
 * Author Srikrishna Gumma
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

class ColorOptions extends Component {
  onColorChange = (e) => {
    this.props.onColorChange(e.target.value);
  };
  render() {
    const { selectedDevice, sku, title } = this.props;
    const colors = _.uniqBy(selectedDevice.skus.map((csku) => csku.color));
    return (
      <div>
        <label htmlFor="colordd" className="fontSize_2 color_959595 ">{title}</label>
        <div className="selectpicker2">
          <select ref={this.props.refColor} onChange={this.onColorChange} id="colordd" name="colordd" >
            { colors.map((color) => <option key={color} defaultValue={sku.color} value={color}>{color}</option>)}
          </select>
        </div>
      </div>
    );
  }
}

ColorOptions.propTypes = {
  selectedDevice: PropTypes.object,
  onColorChange: PropTypes.func,
  sku: PropTypes.object,
  refColor: PropTypes.func,
  title: PropTypes.string,
};

export default ColorOptions;
