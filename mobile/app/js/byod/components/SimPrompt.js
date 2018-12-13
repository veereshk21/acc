import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { hashHistory } from './../../store';
import Button from './../../common/Button/Button';
import RadioButton from './../../common/RadioButton/';
import Title from '../../common/Title/Title';
import HorizontalRule from '../../common/HorizontalRule';

class SimPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
    };
  }
  onRadioChange = (evt) => {
    const val = evt.target.value;
    this.setState({
      add: (val === 'new'),
    });
  };
  onSubmit = () => {
    const { deviceId, addSimUrl } = this.props;
    if (this.state.add) {
      this.props.addNewSim({
        deviceId,
      }, addSimUrl);
    } else {
      hashHistory.push('/sim');
    }
  }
  render() {
    const { cqJSON } = this.props;
    return (
      <Grid className="pad32">
        <Row>
          <Col xs={12}>
            <Title >{cqJSON.label.OD_BYOD_SIM_PROMPT_TITLE}</Title>
            <p>{cqJSON.label.OD_BYOD_SIM_PROMPT_DESCRIPTION}</p>
            <HorizontalRule />
          </Col>
          <Col xs={12}>
            <RadioButton
              aria-labelledby="label"
              value="new"
              id="newSim"
              name="sim"
              onChange={this.onRadioChange.bind(this)}
              analyticstrack="choose-new-sim"
            >
              <span className="displayBlock pad12 noSidePad fontDisplayBold fontSize_1_3">
                {cqJSON.label.OD_BYOD_SIM_PROMPT_OPTION1}
              </span>
            </RadioButton>
            <HorizontalRule y={1} color="#d8dada" />
          </Col>
          <Col xs={12}>
            <RadioButton
              aria-labelledby="label"
              value="existing"
              id="existingSim"
              name="sim"
              onChange={this.onRadioChange.bind(this)}
              analyticstrack="choose-existing-sim"
            >
              <span className="displayBlock pad12 noSidePad fontDisplayBold fontSize_1_3">
                {cqJSON.label.OD_BYOD_SIM_PROMPT_OPTION2}
              </span>
            </RadioButton>
            <HorizontalRule y={1} color="#d8dada" />
          </Col>
          <Col xs={12} className="footerFixed">
            <Button className="button primary width40" onClick={() => this.onSubmit()} analyticstrack="submit-selected-sim-option">{cqJSON.label.OD_BYOD_NEXT_CTA_TEXT}</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

SimPrompt.propTypes = {
  deviceId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  addNewSim: PropTypes.func,
  cqJSON: PropTypes.object,
  addSimUrl: PropTypes.string.isRequired,
};

export default SimPrompt;
