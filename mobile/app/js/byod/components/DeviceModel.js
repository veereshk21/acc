import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import DeviceTile from './DeviceTile';
import Title from '../../common/Title/Title';
import { hashHistory } from './../../store';
import HorizontalRule from '../../common/HorizontalRule';

class DeviceBrandList extends Component {
  componentWillMount() {
    if (!this.props.resultsBrand) {
      hashHistory.push('/deviceBrand');
    }
  }
  onSelect = (obj) => {
    const { setUserInput } = this.props;
    setUserInput(obj);
    hashHistory.push('/imei');
    return true;
  }
  render() {
    const { cqJSON } = this.props;
    if (!this.props.resultsBrand) {
      return (<div />);
    }
    return (
      <Grid className="noSidePad">
        <Row>
          <Col xs={12}>
            <Title className="pad32 noBottomPad">{cqJSON.label.OD_BYOD_WHAT_DEVICE_MODEL}</Title>
            <HorizontalRule margin="18px 0 0" />
          </Col>

        </Row>
        <Row>
          {this.props.resultsBrand.map((res) => (<DeviceTile device={res} onSelect={this.onSelect} brandPage={false} cqJSON={cqJSON} />))}
        </Row>
      </Grid>
    );
  }
}

DeviceBrandList.propTypes = {
  resultsBrand: PropTypes.array,
  cqJSON: PropTypes.object,
  setUserInput: PropTypes.object,
};

export default DeviceBrandList;
