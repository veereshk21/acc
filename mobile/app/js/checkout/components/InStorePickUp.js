/* eslint-disable consistent-return */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GoogleMap from './../../common/GoogleMaps';
import ISPUStoreList from './ispuStoreList';
import NoStores from './noStores';
import Loader from '../../common/Loader/Loader';


/* eslint-disable class-methods-use-this */
class InStorePickUp extends Component {
  constructor(props) {
    super(props);
    this.submitZipCode = this.submitZipCode.bind(this);
    this.createMapOptions = this.createMapOptions.bind(this);
    this.validateZipCode = this.validateZipCode.bind(this);
    this.restrictZipCode = this.restrictZipCode.bind(this);
    this.getSelectedStores = this.getSelectedStores.bind(this);
  }

  componentDidMount() {
    if (!this.props.storeList || this.props.storeList.length <= 0) {
      this.geocode(this.props.submitZipCode, this.props.zipCode);
    }
  }

  getSelectedStores() {
    if (typeof this.props.selectedStoreId !== 'undefined' && this.props.selectedStoreId !== null && !this.props.navigateToStoreDetail) {
      return this.props.storeList.filter((store) => store.storeId === this.props.selectedStoreId);
    }

    return this.props.storeList;
  }

  geocode(submitZipCode, zipCode) {
    if (window.google && window.google.maps) {
      /* eslint-disable no-undef */
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: zipCode }, (results, status) => {
        /* eslint-disable no-undef */
        if (status === google.maps.GeocoderStatus.OK) {
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

  validateZipCode(e) {
    // Allow: backspace, delete, tab, escape and enter
    if ([8, 9, 27, 13, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl/cmd+A
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: Ctrl/cmd+C
      (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: Ctrl/cmd+X
      (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }

  restrictZipCode(e) {
    const { value } = e.target;
    const keyCode = e.which ? e.which : e.keyCode;
    const checkPatt = /^([0-9]{0,5})$/g;

    if (keyCode !== 13 && ((value && value.length >= 5) ||
      keyCode === 46 || checkPatt.test(value) === false)) {
      e.preventDefault();
      return false;
    }
  }


  createMapOptions() {
    return {
      panControl: true,
      mapTypeControl: false,
      scrollwheel: true,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [],
    };
  }

  markerClicked(storeId) {
    this.props.markerClicked(storeId, true);
  }

  mapClicked() {
    this.props.mapClicked();
  }

  submitZipCode(event) {
    event.preventDefault();
    const zipCode = document.getElementById('zipCode').value;
    if (!zipCode) {
      return;
    }
    /* eslint-disable no-undef */
    this.geocode(this.props.submitZipCode, zipCode);
    /* eslint-ensable no-undef */
  }

  showAll(reRenderMaps) {
    this.props.markerClicked(null, reRenderMaps);
  }

  storeSelected(storeId) {
    this.props.storeSelected(storeId);
  }

  showMapsAndStoreList() {
    const { cqContent, gMapApiKey } = this.props;
    const zoom = 10;
    const markers = this.props.storeList.map((obj) => ({
      lat: Number(obj.latitude),
      long: Number(obj.longitude),
      storeId: obj.storeId,
      deviceAvailable: obj.deviceAvailable,
      selectedStore: (this.props.selectedStoreId === obj.storeId ? !this.props.navigateToStoreDetail : false),
    }));
    const center = {
      lat: this.props.storeList[0].latitude,
      long: this.props.storeList[0].longitude,
    };
    const stores = this.getSelectedStores();
    const mapHeight = this.props.mapOnlyView ?
      (window.innerHeight * 0.75) : (window.innerHeight * 0.5);
    const isDetailsMap = false;

    return (
      <div>
        {this.props.isFetching === true && <Loader />}
        <div className="margin12 onlyBottomMargin pad12 onlyTopPad">
          <Link to="/shippingMethod" className="secondaryCTA m-back color_000 fontTextBold" analyticstrack="back-to-ship-options">
            {cqContent.label.OD_CHECKOUT_BACK_TEXT}
          </Link>
        </div>
        <div id="searchStore" className="searchStore section group">
          <form onSubmit={this.submitZipCode} autoComplete="off">

            <img src="/reactive/shop/mobile/build/images/icon_search.png" alt="Search store" className="searchIcon" />
            <input
              type="tel"
              name="zipCode"
              id="zipCode"
              className="zipCode fontSize_4"
              placeholder={cqContent.label.OD_CHECKOUT_FIND_STORES_ZIPCODE_TEXT}
              max="99999"
              onKeyDown={this.validateZipCode}
              onKeyPress={this.restrictZipCode}
              analyticstrack="search-stores-by-zip"
            />
            <button onClick={this.submitZipCode} className="button secondary filterButton" analyticstrack="search-stores-by-zip">{cqContent.label.OD_CHECKOUT_ISPU_FIND_STORES_TEXT}</button>
          </form>
        </div>
        <div className="section group">
          <div className="googlemap_holder">
            <GoogleMap
              center={center}
              zoom={zoom}
              markers={markers}
              bootstrapURLKeys={gMapApiKey}
              options={this.createMapOptions()}
              onMarkerClicked={this.markerClicked.bind(this)}
              onMapClicked={this.mapClicked.bind(this)}
              reRenderMaps={this.props.reRenderMaps}
              height={mapHeight}
              isDetailsMap={isDetailsMap}
            />
          </div>
        </div>
        {
          (!this.props.mapOnlyView) ?
            <div className="section group width100" style={{ position: 'absolute' }}>
              <ISPUStoreList
                cqContent={cqContent}
                storeList={stores}
                selectedStoreId={this.props.selectedStoreId}
                navigateToStoreDetail={this.props.navigateToStoreDetail}
                storeSelected={this.props.storeSelected}
                showAll={this.showAll.bind(this)}
                showMore={this.props.showMoreStores}
                displayShowMore={this.props.displayShowMore}
                useISPUService={this.props.useISPUService}
                nextURL={this.props.nextURL}
              />
            </div>
            :
            <div className="margin18">
              <a className="link" role="button" onClick={this.showAll.bind(this, true)} analyticstrack={cqContent.label.OD_CHECKOUT_ISPU_LIST_STORES_TEXT}>{cqContent.label.OD_CHECKOUT_ISPU_LIST_STORES_TEXT}</a>
            </div>
        }

      </div>
    );
  }

  showNoResults() {
    const { cqContent } = this.props;
    return (
      <div>{this.props.isFetching === true && <Loader />}
        <div id="searchStore" className="noResultSearchStore section group">
          <form onSubmit={this.submitZipCode} autoComplete="off">
            <img src="/reactive/shop/mobile/build/images/icon_search.png" alt="Search store" className="searchIcon" />
            <input
              type="tel"
              name="zipCode"
              id="zipCode"
              className="zipCode"
              placeholder={cqContent.label.OD_CHECKOUT_FIND_STORES_ZIPCODE_TEXT}
              onKeyDown={this.validateZipCode}
              onKeyPress={this.restrictZipCode}
              analyticstrack="search-stores-by-zip"
            />
            <button onClick={this.submitZipCode} className="button secondary filterButton" analyticstrack="search-stores-by-zip">{cqContent.label.OD_CHECKOUT_ISPU_FIND_STORES_TEXT}</button>
          </form>
        </div>
        <NoStores cqContent={cqContent} />
      </div>

    );
  }

  render() {
    const { cqContent } = this.props;

    if (typeof this.props.storeList !== 'undefined' && this.props.storeList.length > 0) {
      return (
        <div>
          {this.showMapsAndStoreList()}
        </div>
      );
    }

    return (
      <div>
        <div className="margin12 onlyBottomMargin pad12 onlyTopPad">
          <Link to="/shippingMethod" className="secondaryCTA m-back color_000 fontTextBold" analyticstrack="back">
            {cqContent.label.OD_CHECKOUT_BACK_TEXT}
          </Link>
        </div>
        {this.showNoResults()}
      </div>
    );
  }
}

InStorePickUp.propTypes = {
  cqContent: PropTypes.object,
  storeList: PropTypes.array,
  isFetching: PropTypes.bool,
  mapOnlyView: PropTypes.bool,
  selectedStoreId: PropTypes.string,
  reRenderMaps: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  navigateToStoreDetail: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  storeSelected: PropTypes.func,
  gMapApiKey: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  markerClicked: PropTypes.func,
  mapClicked: PropTypes.func,
  submitZipCode: PropTypes.func,
  zipCode: PropTypes.string,
  showMoreStores: PropTypes.func,
  displayShowMore: PropTypes.bool,
  nextURL: PropTypes.string,
  useISPUService: PropTypes.bool,
};

export default InStorePickUp;
