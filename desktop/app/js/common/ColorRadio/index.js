import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/lib/immutable';
import '../../../css/modules/colorRadioButtons.scss';

class ColorRadio extends Component { // eslint-disable-line
  static defaultProps = {
    type: 'radio',
    className: 'colorRadio',
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
    colorCode: PropTypes.string,
    checked: PropTypes.bool,
  };

  render() {
    const { id, name, children, colorCode, ...otherProps } = this.props;
    return (
      <div className="positionRelative textAlignCenter margin6 onlySideMargin" style={{ minWidth: 50 }}>
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
        <label htmlFor={children && id} className="displayInlineBlock">
          <div
            className="colorRadioCircle"
            style={{ backgroundColor: colorCode }}
          >
            <div style={{ backgroundColor: colorCode }} />
          </div>

          {children &&
            <div>
              {children}
            </div>
          }
        </label>
      </div>
    );
  }
}

export default ColorRadio;
