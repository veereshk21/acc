import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, Row } from 'react-flexbox-grid';
import ProtectionPlans from './../components/ProtectionPlans';
import Loader from '../../common/Loader/Loader';

class Protection extends Component {
  componentWillMount() {
    const { throttleAccessoriesBundle, bundleAccessoriesURL } = this.props;
    this.props.fetchDeviceImage({
      deviceProdId: this.props.deviceProdId,
      deviceSkuId: this.props.deviceSkuId,
    });
    if (throttleAccessoriesBundle) {
      this.props.fetchAccessoriesBundle(bundleAccessoriesURL);
    }
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div className="section group grid positionRelative">
        {(isFetching === true) && <Loader />}
        <Grid fluid>
          <Row className="border_black onlyBottomBorder">
            <Col sm={12} md={12} lg={12}>
              <ProtectionPlans {...this.props} deviceDetails={this.props.deviceImage.deviceImage} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Protection;

Protection.propTypes = {
  isFetching: PropTypes.bool,
  fetchDeviceImage: PropTypes.func,
  deviceImage: PropTypes.object,
  deviceProdId: PropTypes.string,
  deviceSkuId: PropTypes.string,
  bundleAccessoriesURL: PropTypes.string,
  fetchAccessoriesBundle: PropTypes.func,
  throttleAccessoriesBundle: PropTypes.bool,
};
