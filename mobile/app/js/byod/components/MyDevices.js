/* eslint-disable no-class-assign,no-nested-ternary */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';

import Title from '../../common/Title/Title';
import MyDeviceTile from './MyDeviceTile';
import HorizontalRule from '../../common/HorizontalRule';


class MyDevices extends Component {
  componentWillMount() { }
  render() {
    const {
      cqJSON, devices, submitIMEI,
    } = this.props;
    return (
      <Row >
        <Col xs={12}>
          <Title className="pad32 noBottomPad" dangerouslySetInnerHTML={{ __html: cqJSON.label.OD_BYOD_SELECT_DEVICE }} />
          <HorizontalRule />
        </Col>
        <Col xs={12}>
          <Row>
            {devices.map((device) => <MyDeviceTile device={device} cqJSON={cqJSON} onSelect={submitIMEI} />)}
          </Row>
        </Col>
      </Row>
    );
  }
}


MyDevices.propTypes = {
  cqJSON: PropTypes.object,
  devices: PropTypes.array,
  submitIMEI: PropTypes.func,
};

export default MyDevices;
