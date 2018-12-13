import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import { times } from 'lodash';

const Input = styled.input`
  height: 50px;
  width: ${(100 / 7)}%;
  text-align: center;
  font-size: 1.6em;
  margin: 10px 2px;
  border-bottom-color: #747474 !important;
  padding: 6px;
`;
export class BlockedNumberInput extends Component {
  static propTypes = {
    length: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
    onCodeChange: PropTypes.func,
  }

  state = {
    code: '',
  }


  onKeyDown = (e) => {
    const previous = e.target.previousSibling;
    const val = e.target.value;
    const charCode = (typeof e.which === 'undefined') ? e.keyCode : e.which;
    const charStr = String.fromCharCode(charCode);

    if ((charCode === 8 || charCode === 46)) {
      if (previous) {
        if (val) {
          e.target.value = null;
        } else {
          previous.value = null;
          previous.focus();
        }
      } else if (val) e.target.value = null;

      // onChange isn't fired on deletion
      this.onInputChange(e);
    } else if (!/\d/.test(charStr)) {
      e.preventDefault();
    }
  };

  onKeyUp = (e) => {
    const neighbor = e.target.nextSibling;
    const val = e.target.value;
    const charCode = (typeof e.which === 'undefined') ? e.keyCode : e.which;
    const charStr = String.fromCharCode(charCode);

    if (val && /\d/.test(charStr) && neighbor) {
      neighbor.focus();
    }
  }

  onInputChange = () => {
    const { elements } = this.form;
    let code = '';

    for (let i = 0; i < elements.length; i++) {
      code += elements[i].value;
    }

    this.setState({ code });
    this.props.onCodeChange(code);
  }
  styles = {
    input: {

    },
  };

  render() {
    return (
      <Col xs={12}>
        <form
          ref={(node) => this.form = node}
        >
          {times(this.props.length, (i) => (
            <Input
              key={i}
              maxLength="1"
              type="tel"
              onKeyUp={this.onKeyUp}
              onKeyDown={this.onKeyDown}
              onChange={this.onInputChange}
              disabled={this.props.disabled}
            />
          ))}
        </form>
      </Col>
    );
  }
}

export default BlockedNumberInput;
