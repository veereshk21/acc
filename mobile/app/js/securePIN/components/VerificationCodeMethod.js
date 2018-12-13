import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-flexbox-grid';
import RadioButton from '../../common/RadioButton/';
import HorizontalRule from '../../common/HorizontalRule';

export default class VerificationCodeMethod extends React.PureComponent {
  render() {
    const inactiveClass = this.props.inactive ? 'disableField' : '';

    return (
      <Col xs={12} className={inactiveClass}>
        <RadioButton
          name={this.props.name}
          id={this.props.value}
          value={this.props.value}
          defaultChecked={this.props.defaultChecked}
          disabled={this.props.inactive}
          onChange={this.props.onChange}
          analyticstrack="choose-verification-option"
        >
          <p className="fontDisplayMedium">
            {this.props.title}
          </p>
          <p>{this.props.text}</p>
        </RadioButton>
        <HorizontalRule y={1} color="#D8DADA" />
      </Col>
    );
  }
}

VerificationCodeMethod.defaultProps = {
  inactive: false,
};

VerificationCodeMethod.propTypes = {
  defaultChecked: PropTypes.bool,
  inactive: PropTypes.bool,
  value: PropTypes.string,
  title: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  text: PropTypes.string,
};

// onChange={this.handleOptionChange.bind(this, option)}/>
