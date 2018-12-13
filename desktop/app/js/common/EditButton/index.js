import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../css/modules/buttons.scss';
import editIcon from '../../../images/edit.svg';

const CLASS_NAME = 'editButton';

class Button extends Component { // eslint-disable-line
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    icon: PropTypes.bool,
  };

  static defaultProps = {
    type: 'button',
    className: '',
  };
  render() {
    const { type, className, children, icon } = this.props;
    /* Line below adds Class .button by default if its not already added */
    const classNames = !className ? ` ${CLASS_NAME} ${className}` : ` ${CLASS_NAME} ${className}`;
    return (
      <button
        type={type}
        {...this.props}
        className={`${classNames} ${icon ? 'icon' : 'text'}`}
        style={{
          display: 'inline-block',
          backgroundImage: icon ? "url('" + editIcon + "'), none" : 'none',
        }}
      >
        {children}
      </button>
    );
  }
}

export default Button;
