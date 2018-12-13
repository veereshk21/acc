import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Title from './../../common/Title/Title';
import Button from '../../common/Button/Button';
import RadioButton from '../../common/RadioButton/';
import { hashHistory } from './../../store';
import HorizontalRule from '../../common/HorizontalRule';

class NSOLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableCTA: false,
      selectedDevice: null,
    };
  }
  onRadioChange = (event) => {
    this.props.setSelectedDevice(event.target.value);
    this.setState({
      enableCTA: true,
      selectedDevice: event.target.value,
    });
  };
  handleOnClick = () => {
    if (this.state.selectedDevice === 'connectedcar') {
      hashHistory.push('/imei');
    } else {
      hashHistory.push('/deviceBrand');
    }
  }
  render() {
    const { data, cqJSON } = this.props;

    return (
      <Grid className="pad32">
        <Row>
          <Col xs={12}>
            <Title>{cqJSON.label.OD_BYOD_DEVICES_OPTION_TITLE}</Title>
            <HorizontalRule />
          </Col>
        </Row>
        <Row>
          {data.map((dev, idx) => (
            <Col xs={12} key={idx}>
              <RadioButton
                aria-labelledby="label"
                value={dev.key}
                id={`device-${idx}`}
                name="device"
                labelClassName="col span_4_of_5 normalText pad10 onlyLeftPad floatRight"
                onChange={this.onRadioChange.bind(this)}
                analyticstrack="choose-device-option"
              >
                <span className="fontDisplayMedium fontSize_1_3">
                  {dev.name}
                </span>
              </RadioButton>
              <HorizontalRule y={1} color="#D8DADA" />
            </Col>
          ))}
          <div className="height132" />
        </Row>
        <Row>
          <Col xs={12} className="footerFixed">
            <Button className="button primary width40" disabled={!this.state.enableCTA} onClick={this.handleOnClick} analyticstrack="submit-selected-device-option">{cqJSON.label.OD_BYOD_NEXT_CTA_TEXT}</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}


NSOLanding.propTypes = {
  data: PropTypes.array,
  cqJSON: PropTypes.object,
  setSelectedDevice: PropTypes.func,
};

export default NSOLanding;
