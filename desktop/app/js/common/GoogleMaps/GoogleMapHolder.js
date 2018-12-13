/**
 * Created by mambig on 7/12/16.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const style = {
  width: '100%',
  height: '300px',
  left: 0,
  top: 0,
  margin: 0,
  padding: 0,
  position: 'inherit',
};

export default class GoogleMapMap extends Component {
  shouldComponentUpdate() {
    return true;
  }
  render() {
    // const height = this.props.height;
    // style.height = height;
    return (
      <div style={style} className="gMapWrap" />
    );
  }
}

GoogleMapMap.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
};
