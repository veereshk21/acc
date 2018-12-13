import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import DeviceTile from './DeviceTile';
import Title from '../../common/Title/Title';
import HorizontalRule from '../../common/HorizontalRule';

class DeviceBrandList extends Component {
  componentDidMount() {
    const { searchDevice, selectedDevice, searchDevicesUrl } = this.props;
    const query = '/responsebrands';
    const obj = {
      carrier: 'Verizon',
      deviceCategory: selectedDevice,
      make: '',
      model: '',
    };
    searchDevice(obj, searchDevicesUrl, query);
  }

  onSelect = (dev) => {
    const {
      searchDevice, selectedDevice, setUserInput, searchDevicesUrl,
    } = this.props;
    const query = '/responsedevices';
    const obj = {
      carrier: 'Verizon',
      deviceCategory: selectedDevice,
      make: dev.make || '',
      model: '',
    };
    searchDevice(obj, searchDevicesUrl, query);
    setUserInput(dev);
    return true;
  }
  render() {
    const { cqJSON, resultsLink } = this.props;
    return (
      <Grid className="noSidePad">
        <Row>
          <Col xs={12}>
            <Title className="pad32 noBottomPad" >{cqJSON.label.OD_BYOD_WHAT_DEVICE_BRAND}</Title>
            <HorizontalRule margin="18px 0 0" />
          </Col>
        </Row>
        <Row>
          {resultsLink && resultsLink.map((res) => (<DeviceTile device={res} onSelect={this.onSelect} brandPage cqJSON={cqJSON} />))}
        </Row>
      </Grid>
    );
  }
}

DeviceBrandList.propTypes = {
  searchDevice: PropTypes.func,
  selectedDevice: PropTypes.string,
  resultsLink: PropTypes.array,
  cqJSON: PropTypes.object,
  setUserInput: PropTypes.func,
  searchDevicesUrl: PropTypes.func,
};

export default DeviceBrandList;
