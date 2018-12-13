/**
* RadioButton.js
* Renders a radio button element with a label around it.
* The label goes around it for easy touch/click, specially on mobile.
* @usage
* --
* import RadioButton from '../common/RadioButton/RadioButton
* --
*
* Basic use of this Component:
* <RadioButton id={RadioButtonID} name={commonNameForGroupOfRadioButton} >
*   [HTML or string]
* </RadioButton>
*
*
*
* With Default Selection:
* <RadioButton id={RadioButtonID} name={commonNameForGroupOfRadioButton}  value={RadioButtonValue} defaultChecked={selectedBool} >
*   [HTML or string]
* </RadioButton>
*
*
*
*
* If you want to make a list with borders and all, then wrap it in a div like this:
* <div className={`section group pad18 noSidePad ${(index < arr.length - 1) ? 'border_EB onlyBottomBorder' : ''}`} key={option.gotoUrl}>
*   <RadioButton id={radioID} name={commonNameForGroupOfRadioButton}>
*     <div className="fontTextBold lineHeight42">Bold Title Name</div>
*     <div className="pad6 onlyTopPad">Option Simple Description</div>
*   </RadioButton>
* </div>
*
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../css/modules/radioButtons.scss';

class ButtonSelector extends Component { // eslint-disable-line
  render() {
    const {
      children, className, isActive, ...otherProps
    } = this.props;
    return (
      <div className="pad12 onlyBottomPad clearfix ">
        <a
          className={`border_00 textAlignLeft boxSelector ${isActive ? 'm-active' : ''} ${className || ''}`}
          {...otherProps}
        >

          {children &&
            <div className="pad12 onlySidePad margin6 noSideMargin">
              {children}
            </div>
          }
        </a>
      </div>

    );
  }
}

ButtonSelector.defaultProps = {
};

ButtonSelector.propTypes = {
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  isActive: PropTypes.bool,
  labelClassName: PropTypes.string,
  className: PropTypes.string,
};


export default ButtonSelector;
