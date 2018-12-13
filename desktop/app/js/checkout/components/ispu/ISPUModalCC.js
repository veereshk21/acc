/* eslint-disable consistent-return */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import ISPUModal from '@vz-react/ISPUModal';

import { setCookie } from './../../../common/Helpers';

class ISPUModalCC extends Component {
  constructor(props) {
    super(props);
    this.onISPUSubmit = false;
  }
  componentDidMount() {
    if (typeof this.props.storeList === 'undefined' || this.props.storeList === null) {
      this.geocode(this.props.submitZipCode, this.props.zipCode);
    } else {
      this.props.asyncFetchSucess();
    }
  }

  geocode = (submitZipCode, zipCode) => {
    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: zipCode }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          const latLng = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };
          submitZipCode(zipCode, latLng);
        } else {
          const latLng = { lat: null, lng: null };
          submitZipCode(zipCode, latLng);
        }
      });
    } else {
      const latLng = { lat: null, lng: null };
      submitZipCode(zipCode, latLng);
    }
  }

  checkStores = (address) => {
    const submitZipCode = this.props.submitZipCode;
    const geocoder = new window.google.maps.Geocoder();
    const latlng = new window.google.maps.LatLng(address.latitude, address.longitute);
    geocoder.geocode({ latLng: latlng }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
        results[0].address_components.map((item) => { // eslint-disable-line
          const types = item.types;
          types.map((type) => { // eslint-disable-line
            if (type === 'postal_code') {
              submitZipCode(item.short_name, { lat: address.latitude, lng: address.longitute });
            }
          });
        });
      } else {
        submitZipCode('', { lat: address.latitude, lng: address.longitute });
      }
    });
  };

  submitISPU = (store) => {
    this.onISPUSubmit = true;
    const param = {};
    param.shippingAddressType = 'pickUpStore';
    param.orderId = this.props.orderDetails.orderId;
    param.storeId = store.storeId;
    param.standaloneAccessories = this.props.standaloneAccessories;
    param.longitude = store.longitude;
    param.latitude = store.latitude;
    param.shipOptionChangeOnly = true;
    param.phoneNumber = this.props.phoneNumber ? this.props.phoneNumber : '';
    this.props.submitISPU(param);
    setCookie('ISPU_FILTER_SELECTED', false);
    this.props.ispuSuccessful();
  }

  _showMore = () => {
    const { useISPUService, nextURL, displayShowMore } = this.props;
    if ((useISPUService && nextURL && displayShowMore) || (!useISPUService && displayShowMore)) {
      this.props.showMoreStores();
    }
  }

  toggleModal() {
    if (this.onISPUSubmit) {
      this.props.ispuSuccessful();
    } else {
      this.props.toggleModal();
    }
    this.onISPUSubmit = false;
  }


  render() {
    return (
      <section id="ispu_cc" className="pad18 onlyTopPad">
        <Row>
          <Col xs={12}>
            <ISPUModal
              checkStores={this.checkStores}
              storeList={this.props.storeList ? this.props.storeList : []}
              submitISPU={this.submitISPU}
              showModal={this.props.ispuModalVisible}
              toggleModal={() => this.toggleModal()}
              isFetching={false}
              showMore={this._showMore}
            />
          </Col>
        </Row>
      </section>
    );
  }
}

ISPUModalCC.propTypes = {
  storeList: PropTypes.array,
  submitISPU: PropTypes.func,
  submitZipCode: PropTypes.func,
  zipCode: PropTypes.string,
  toggleModal: PropTypes.func,
  orderDetails: PropTypes.object,
  standaloneAccessories: PropTypes.bool,
  phoneNumber: PropTypes.string,
  ispuModalVisible: PropTypes.bool,
  ispuSuccessful: PropTypes.func,
  useISPUService: PropTypes.bool,
  nextURL: PropTypes.string,
  displayShowMore: PropTypes.bool,
  showMoreStores: PropTypes.func,
  asyncFetchSucess: PropTypes.func,
};

export default ISPUModalCC;
