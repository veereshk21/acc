/* eslint-disable no-undef,react/no-find-dom-node,react/prop-types,react/no-string-refs,no-unused-expressions,no-nested-ternary */
/**
 * Created by mambig on 7/12/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import GoogleMapMap from './GoogleMapHolder';
import GoogleMapLoader from './GoogleMapLoader';

class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.mounted_ = false;
    this.initialized_ = false;
    this.googleApiLoadedCalled_ = false;
    this.googleMapLoader = GoogleMapLoader;

    if (this.props.center === undefined && this.props.defaultCenter === undefined) {
      console.warn('GoogleMap: center or defaultCenter property must be defined'); // eslint-disable-line
    }

    if (this.props.zoom === undefined && this.props.defaultZoom === undefined) {
      console.warn('GoogleMap: zoom or defaultZoom property must be defined'); // eslint-disable-line
    }
  }

  componentDidMount() {
    this.mounted_ = true;
    if (this._isCenterDefined(this.props.center || this.props.defaultCenter)) {
      this._initMap();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.reRenderMaps) {
      this.initialized_ = false;
      this._initMap();
    }
  }
  _initMap() {
    if (this.initialized_) {
      return;
    }
    this.initialized_ = true;


    const bootstrapURLKeys = { ...this.props.bootstrapURLKeys };
    const options = typeof this.props.options === 'function' ? this.props.options() : this.props.options;

    const propsOptions = {
      zoom: this.props.zoom || this.props.defaultZoom,
      center: this.props.center || this.props.defaultCenter,
    };


    const mapOptions = {
      ...propsOptions,
      ...options,
    };

    const { center, ...restOptions } = mapOptions;


    this.googleMapLoader(bootstrapURLKeys).then(() => {
      if (!this.mounted_) {
        return;
      }


      if (this.refs.google_map_dom !== null && this.refs.google_map_dom !== undefined) {
        const mapCenter = new google.maps.LatLng(center.lat, center.long);

        const map = new google.maps.Map(ReactDOM.findDOMNode(this.refs.google_map_dom), { center: mapCenter, ...restOptions });
        const iconRed = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#cc0000',
          strokeColor: '#cc0000',
          fillOpacity: 1,
          scale: 4,
        };
        const iconGrey = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#808080',
          strokeColor: '#808080',
          fillOpacity: 1,
          scale: 4,
        };
        const pinnedLocation = {
          url: '/reactive/shop/desktop/build/images/pinned_location.png',
          size: new google.maps.Size(22, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(11, 30),
        };

        this.props.markers.forEach((markerObj) => {
          const marker = new google.maps.Marker({
            icon: markerObj.deviceAvailable ? (markerObj.selectedStore ? pinnedLocation : iconRed) : iconGrey,
            position: new google.maps.LatLng(markerObj.lat, markerObj.long),
            storeId: markerObj.storeId,
          });
          google.maps.event.addListener(marker, 'click', this.markerClicked.bind(this, marker.storeId));
          marker.setMap(map);
        });
        map.addListener('click', this.mapClicked.bind(this));
      }
    });
  }
  _isCenterDefined(center) {
    return (center && (
      (typeof center === 'object' && !isNaN(center.lat) && !isNaN(center.long)) ||
            (Array.isArray(center) && center.length === 2 && !isNaN(center[0]) && !isNaN(center[1])))
    );
  }
  markerClicked(storeId) {
    if (!this.props.isDetailsMap) {
      this.props.onMarkerClicked && this.props.onMarkerClicked(storeId);
    }
  }
  mapClicked() {
    this.props.onMapClicked && this.props.onMapClicked();
  }
  render() {
    return (
      <div>
        <GoogleMapMap ref="google_map_dom" height={this.props.height} />
      </div>
    );
  }
}

export default GoogleMap;
