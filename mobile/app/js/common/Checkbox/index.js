import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import '../../../css/modules/common/checkbox.css';

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
    type: PropTypes.string,
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
    // Don't use events handlers unless absolutly necessary, use redux forms reducer/actions
    const {
      id, disabled, name, value, checkboxClass, labelClass, children, ...rest
    } = this.props;
    return (
      <label htmlFor={id}>
        <Row>
          <Col xs={1} className={checkboxClass}>
            <input
              type="checkbox"
              id={id}
              disabled={disabled}
              className={`checkbox ${disabled ? 'disabled' : ''}`}
              value={value}
              name={name}
              {...rest}
            />
            <label className="displayInlineBlock" htmlFor={id} />
          </Col>
          <Col xs={11} className={`${labelClass} fontSize_1_3`}>
            <label htmlFor={id} >{children}</label>
          </Col>
        </Row>
      </label>
    );
  }
}

export default Checkbox;
