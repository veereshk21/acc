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
import '../../../css/modules/radioButtons.css';

class RadioButton extends Component { // eslint-disable-line
  render() {
    const {
      id, disabled, name, children, ariaLabel, labelClassName, parentClassName, ...otherProps
    } = this.props;
    return (
      <div>
        <div className={parentClassName || 'col pad10 onlyLeftPad width90'}>
          <input
            type="radio"
            id={id}
            name={name}
            className={this.props.className}
            role="radio"
            aria-checked={this.props.checked}
            {...otherProps}
          />
          <label htmlFor={id}>
            <svg className="radioContainer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="radioCircleOutline" cx="26" cy="26" r="25" fill="none" />
              <circle className="radioCircle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmarkCheck" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
            {children &&
              <div className={labelClassName || 'col span_4_of_5 normalText pad10 onlySidePad floatRight'}>
                {children}
              </div>
            }
          </label>
        </div>
      </div>

    );
  }
}

RadioButton.defaultProps = {
  type: 'radio',
  className: 'radioBtn',
};

RadioButton.propTypes = {
  type: PropTypes.oneOf(['radio']),
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ariaLabel: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  labelClassName: PropTypes.string,
  parentClassName: PropTypes.string,
  checked: PropTypes.bool,
};


export default RadioButton;
