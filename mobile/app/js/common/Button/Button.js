/*
Button.js
renders a button

Use of this Component
<Button className="secondary">View</Button>

For disabled button
<Button disabled={true}></Button>

For onClick function
<Button className="secondary" onClick = {()=>{console.log('hi')}}>Click me</Button>
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../css/modules/buttons.css';

const CLASS_NAME = 'button';

class Button extends Component { // eslint-disable-line
  render() {
    const { type, className, disabled, children} = this.props; // eslint-disable-line
    /* Line below adds Class .button by default if its not already added */
    const classNames = !className ? CLASS_NAME : ` ${CLASS_NAME} ${className}`; // eslint-disable-line
    return (
      <button {...this.props} className={classNames} >{children}</button>
    );
  }
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
  className: '',
};
Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};
export default Button;
