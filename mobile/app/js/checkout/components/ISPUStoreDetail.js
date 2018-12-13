import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from './../../store';
import GoogleMap from './../../common/GoogleMaps';

export default class ISPUStoreDetail extends Component {
  createMapOptions() {
    return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [],
    };
  }
  confirmStorePickUp() {
    hashHistory.push('/ISPUContactInfo');
  }

  goBack() {
    if (this.props.selectedShippingType.type === 'ISPU') {
      hashHistory.push('/');
    } else {
      hashHistory.push('/ispu');
    }
  }

  render() {
    const {
      cqContent, storeDetails, gMapApiKey, hidePickupBtn,
    } = this.props;
    const zoom = 10;
    const markers = [{
      lat: Number(storeDetails.latitude),
      long: Number(storeDetails.longitude),
      storeId: storeDetails.storeId,
      deviceAvailable: storeDetails.deviceAvailable,
      selectedStore: true,
    }];
    const center = {
      lat: Number(storeDetails.latitude),
      long: Number(storeDetails.longitude),
    };
    const isDetailsMap = true;
    return (
      <div>
        <div className="pad12 onlyTopPad">
          <a onClick={this.goBack.bind(this)} className="secondaryCTA m-back color_000 fontTextBold" analyticstrack={cqContent.label.OD_CHECKOUT_BACK_TEXT}>{cqContent.label.OD_CHECKOUT_BACK_TEXT}</a>
        </div>
        <div className="section group pad18">
          <div className="pad6 onlySidePad">
            <h2 className="textAlignCenter">{storeDetails.storeAddress}
            </h2>
            <div className="smallText textAlignCenter pad12">
              <span className="displayNone">{cqContent.label.OD_CHECKOUT_ISPU_ORDER_READY_TEXT}</span>
              <span className="fontTextMedium">{storeDetails.appendedStoreTiming}</span>
            </div>
          </div>
        </div>
        <div className="section group">
          <div className="googlemap_holder" style={{ height: '150px' }}>
            <GoogleMap
              center={center}
              zoom={zoom}
              markers={markers}
              bootstrapURLKeys={gMapApiKey}
              options={this.createMapOptions.bind(this)}
              renderMap={this.props.renderMap}
              height="150px"
              isDetailsMap={isDetailsMap}
            />
          </div>
        </div>
        <div className="" style={{ position: 'absolute' }}>
          <div className="section group">
            <div className="pad24 onlySidePad">
              <div className="smallText textAlignCenter pad18">{cqContent.label.OD_CHECKOUT_STORE_DETAILS_DESCRIPTION_TEXT}</div>
            </div>
          </div>
          <div className="section group">
            <div className="col span_5_of_5 textAlignCenter">
              <a href="#/ispu" className="link" analyticstrack={cqContent.label.OD_CHECKOUT_STORE_DETAILS_PICK_UP_LOCATION_TEXT}>
                {cqContent.label.OD_CHECKOUT_STORE_DETAILS_PICK_UP_LOCATION_TEXT}
              </a>
            </div>
          </div>

          {hidePickupBtn === false &&
            <div className="section group pad6 noSidePad">
              <div className="col span_5_of_5 textAlignCenter">
                <button type="button" className="button primary large" analyticstrack="confirm-selected-store" onClick={this.confirmStorePickUp.bind(this)}>{cqContent.label.OD_CHECKOUT_STORE_DETAILS_PICK_UP_HERE_TEXT}</button>
              </div>
            </div>}
        </div>
      </div>
    );
  }
}
ISPUStoreDetail.propTypes = {
  cqContent: PropTypes.object,
  storeDetails: PropTypes.object,
  gMapApiKey: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  hidePickupBtn: PropTypes.bool,
  renderMap: PropTypes.func,
  selectedShippingType: PropTypes.object,
};
