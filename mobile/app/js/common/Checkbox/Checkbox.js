/**
* Checkbox.js
* Renders an input checkbox element with a label around it.
* The label goes around it for easy touch/click, specially on mobile.
* @usage
* --
* import Checkbox from '../common/Checkbox/Checkbox
* --
*
* Basic use of this Component:
* <Checkbox id={checkboxID} value={checkboxValue}>
*   [HTML or string]
* </Checkbox>
*
* If you want to make a list with borders and all, then wrap it in a div like this:
* <div key={[loopID]} className="section group border_EB onlyBottomBorder pad30 noSidePad">
*   <Checkbox id={question.questionId} value={question.questionId}>
*     <span>{question.label}</span>
*   </Checkbox>
* </div>
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../css/modules/checkbox.css';

class Checkbox extends Component { // eslint-disable-line
  render() {
    return (
      <div className={this.props.containerClassName}>
        <input
          type="checkbox"
          id={this.props.id}
          disabled={this.props.disabled}
          className="checkbox"
          value={this.props.id}
          name={this.props.name}
          onClick={this.props.onClick}
          checked={this.props.defaultChecked}
        />
        <label htmlFor={this.props.id} >
          <svg className="checkboxContainer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><rect className="checkboxRectangleOutline" x="0" y="0" rx="14" ry="14" fill="none" /><rect className="checkboxRectangle" x="0" y="0" rx="14" ry="14" fill="none" /><path className="checkboxCheckmark" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
          <div className={this.props.labelClassName}>
            {this.props.children}
          </div>
        </label>
      </div>

    );
  }
}

Checkbox.defaultProps = {
  disabled: false,
  children: '',
  name: '',
  onClick: () => (false),
  defaultChecked: false,
  containerClassName: 'col pad24 onlyLeftPad width90',
  labelClassName: 'span_10_of_12 normalText floatRight',
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  defaultChecked: PropTypes.bool,
  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
};


export default Checkbox;
