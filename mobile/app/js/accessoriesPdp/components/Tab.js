/* eslint-disable react/prefer-stateless-function */
/**
* Tab.js
* renders the tab component for PDP

* Use of this Component
* <Tab text={item} key={item} isActive={item == this.props.active}/>
* */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import A from '../../common/A/A';

const CLASS_NAME = 'inlineBlock color_000 margin12 pad20 onlyBottomPad';

class Tab extends Component {
  render() {
    const {
      isActive, activeClass, text, ...otherProps
    } = this.props;
    const classNames = (isActive) ? `inlineBlock pad12 noTopPad ${activeClass}` : `${CLASS_NAME}`;
    return (
      <A {...otherProps} href="#" role="tab" className={classNames}><span >{text}</span></A>
    );
  }
}
Tab.defaultProps = {
  activeClass: 'border_active onlyBottomBorder color_red',
  isActive: false,
};
Tab.propTypes = {
  text: PropTypes.string,
  activeClass: PropTypes.string,
  isActive: PropTypes.bool,
};
export default Tab;
