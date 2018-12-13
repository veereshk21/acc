import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { hashHistory } from './../../store';
import Title from '../../common/Title/Title';
import RadioButton from '../../common/RadioButton/';
import HorizontalRule from '../../common/HorizontalRule';

class NewOrTransferPrompt extends Component {
  constructor(props) {
    super(props);
    this.onNewNumber = this.onNewNumber.bind(this);
    this.onTransferNumber = this.onTransferNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      newNumber: true,
    };
  }
  onNewNumber() {
    this.setState({
      newNumber: true,
    });
  }
  onTransferNumber() {
    this.setState({
      newNumber: false,
    });
  }
  onSubmit() {
    const { output } = this.props;
    if (this.state.newNumber) {
      window.location.href = output.newNumberUrl;
    } else {
      hashHistory.push('/transferNumber');
    }
  }
  render() {
    const { cqContent } = this.props;
    return (
      <Grid className="pad24">
        <Title>{cqContent.label.OD_PORTIN_PROMPT_TITLE}</Title>
        <HorizontalRule />
        <Row className="">
          <Col xs={12} className="pad12 noTopPad">
            <RadioButton
              id="radioName"
              name="tradeinOption"
              defaultChecked
              value="option.gotoUrl"
              onChange={this.onNewNumber}
              analyticstrack="choose-new-number"
            >
              <div className="pad6 onlyTopPad fontSize_3">{cqContent.label.OD_PORTIN_NEWNUMBER}</div>
            </RadioButton>
            <HorizontalRule y={1} margin="24px 0 0" color="#d8dada" />

          </Col>

        </Row>
        <Row>
          <Col xs={12} className="pad12 noTopPad">
            <RadioButton
              id="radioName1"
              name="tradeinOption"
              defaultChecked={false}
              onChange={this.onTransferNumber}
              analyticstrack="transfer-existing-number"
            >
              <div className="pad6 onlyTopPad fontSize_3">{cqContent.label.OD_PORTIN_NUMBERTRANSFER_TITLE}</div>
            </RadioButton>
            <HorizontalRule y={1} margin="24px 0 0" color="#d8dada" />
          </Col>
        </Row>

        <div className="footerFixed">
          <button type="button" className="button large" onClick={this.onSubmit} analyticstrack="submit-new-or-trasfer-selection">{cqContent.label.OD_PORTIN_PROMPT_NEXT_CTA}</button>
        </div>

      </Grid>
    );
  }
}
NewOrTransferPrompt.propTypes = {
  cqContent: PropTypes.object,
  output: PropTypes.object,
};
export default NewOrTransferPrompt;
