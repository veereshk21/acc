/**
 * Created by hmahad on 2/2/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../../css/modules/loader.scss';

export default class Loader extends Component { // eslint-disable-line
  render() {
    const class_name = this.props.className ? `spinner ${this.props.className}` : 'spinner';
    return (
      <div id="loader" className={class_name} />
    );
  }
}
Loader.propTypes = {
  className: PropTypes.string,
};
