import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/lib/immutable';
import '../../../css/modules/checkbox.scss';
import InputField from './inputField';

class Checkbox extends Component { // eslint-disable-line
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    name: PropTypes.string,
    disabled: PropTypes.bool,
    checkboxClass: PropTypes.string,
    labelClass: PropTypes.string,
    value: PropTypes.string,
  };

  static defaultProps = {
    type: 'checkbox',
    disabled: false,
    children: '',
    name: '',
    checkboxClass: '',
    labelClass: '',
  };

  render() {
    // Don't use events handlers unless absolutely necessary, use redux forms reducer/actions
    const { id, checkboxClass, labelClass, children, ...rest } = this.props;
    return (
      <div className="displayInlineBlock maxWidth100">
        <div className={checkboxClass}>
          <Field
            component={InputField}
            id={id}
            {...rest}
          />
          <label htmlFor={id}>
            <div className={labelClass}>{children}</div>
          </label>
        </div>
      </div>
    );
  }
}

export default Checkbox;
