/**
 * Created by mambig on 7/12/16.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class GoogleMapMap extends Component {
  shouldComponentUpdate() {
    return true;
  }
  render() {
    const style = {
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      margin: 0,
      padding: 0,
      position: 'inherit',
    };
    const { height } = this.props;
    style.height = height;
    return (
      <div style={style} />
    );
  }
}
GoogleMapMap.propTypes = {
  height: PropTypes.any,
};
