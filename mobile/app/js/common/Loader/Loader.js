/**
 * Created by hmahad on 2/2/2017.
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import '../../../css/modules/loader.css';


export default class Loader extends Component { // eslint-disable-line

  render() {
    const StyleLoader = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      text-align:center;
      padding: 18px;
      font-family: NeueHaasGroteskDisplayMedium;
      background: rgba(255, 255, 255, 0.9);
      &::before{
        top: 40%;
      }
      &::after{
        top: 40%;
      }
    `;
    const _content = this.props.content || null;

    const class_name = this.props.className ? `spinner ${this.props.className}` : 'spinner';
    if (_content) {
      return (<StyleLoader className={class_name} dangerouslySetInnerHTML={{ __html: this.props.content }} />);
    }
    return (
      <div id="loader" className={class_name} />
    );
  }
}
Loader.propTypes = {
  className: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.any,
  ]),
};
