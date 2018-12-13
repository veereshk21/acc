/*
 * Created on Wed Aug 30 2017
 *
 * Copyright (c) 2017 Verizon Wireless
 * Author Srikrishna Gumma
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';


class DeviceOptions extends Component {
  onDeviceChange = () => {
    const { devices } = this.props;
    const selectedDevice = devices.filter((dev) => dev.deviceProdId === this.device.value);
    this.props.onDeviceChange(selectedDevice[0]);
  }

  render() {
    const { devices, selectedDevice, title } = this.props;
    return (
      <div>
        <label htmlFor="modeldd" className="fontSize_2 color_959595 ">{title}</label>
        <div className="selectpicker2" id="modeldd" name="modeldd">
          <select ref={(device) => this.device = device} onChange={this.onDeviceChange}>
            {devices.map((dev) => (
              <option key={dev.deviceProdId} selected={dev.deviceProdId === selectedDevice.deviceProdId} value={dev.deviceProdId}>{dev.model}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

DeviceOptions.propTypes = {
  onDeviceChange: PropTypes.func,
  devices: PropTypes.array,
  title: PropTypes.string,
  selectedDevice: PropTypes.object,
};

export default DeviceOptions;
