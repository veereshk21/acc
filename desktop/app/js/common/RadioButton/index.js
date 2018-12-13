import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/lib/immutable';
import '../../../css/modules/radioButtons.scss';

class RadioButton extends Component { // eslint-disable-line
  static defaultProps = {
    type: 'radio',
    className: 'radioBtn',
    customRBClass: '',
  };

  static propTypes = {
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
    containerClassName: PropTypes.string,
    customRBClass: PropTypes.string,
    checked: PropTypes.bool,
  };

  render() {
    const { id, name, children, labelClassName, customRBClass, containerClassName, ...otherProps } = this.props;
    return (
      <div className="clearfix">
        <div className={containerClassName || 'col width90'}>
          <Field
            component="input"
            type="radio"
            id={id}
            name={name}
            className={this.props.className}
            role="radio"
            aria-checked={this.props.checked}
            {...otherProps}
          />
          <label htmlFor={children && id} className={`displayInlineBlock ${customRBClass}`}>{children &&
          <div className={labelClassName || 'col span_4_of_5 normalText margin60 onlyRightMargin floatRight'}>
            {children}
          </div>
          }</label>
        </div>
      </div>

    );
  }
}

export default RadioButton;
