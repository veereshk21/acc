import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/lib/immutable';
import '../../../css/modules/colorRadioButtons.scss';

class BlockRadio extends Component { // eslint-disable-line
  static defaultProps = {
    type: 'radio',
    className: '',
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
    const { id, name, children, ...otherProps } = this.props;
    return (
      <div className="clearfix">
        <Field
          component="input"
          type="radio"
          id={id}
          name={name}
          role="radio"
          aria-checked={this.props.checked}
          {...otherProps}
          className="blockRadio"
        />
        <label htmlFor={id}>
          <div
            className={`border_00 textAlignLeft boxSelector ${this.props.className || ''}`}
          >
            {children &&
              <div className={`pad12 onlySidePad margin6 noSideMargin ${this.props.disabled ? 'textDecLineThrough' : ''}`}>
                {children}
              </div>
            }
          </div>
        </label>
      </div>

    );
  }
}

export default BlockRadio;
