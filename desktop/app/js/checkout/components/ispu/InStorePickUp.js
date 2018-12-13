/* eslint-disable consistent-return */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form/immutable';
import GoogleMap from './../../../common/GoogleMaps';
import ISPUStoreList from './ISPUStoreList';
import NoStores from './noStores';
import { renderTextField } from './../../../common/TextField/';
import * as validation from './../../../common/validation';
import RadioButton from './../../../common/RadioButton';
// import storeDetails from '../../../../json/checkout/storeDetails';

/* eslint-disable class-methods-use-this */
class InStorePickUp extends Component {
  componentDidMount() {
    if (typeof this.props.storeList === 'undefined' || this.props.storeList === null) {
      this.geocode(this.props.submitZipCode, this.props.zipCode);
    } else {
      this.props.asyncFetchSucess();
    }
  }

  getSelectedStores = () => {
    if (typeof this.props.selectedStoreId !== 'undefined' && this.props.selectedStoreId !== null && !this.props.navigateToStoreDetail) {
      return this.props.storeList.filter((store) => store.storeId === this.props.selectedStoreId);
    }

    return this.props.storeList;
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

  validateZipCode = (e) => {
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

  restrictZipCode = (e) => {
    const { value } = e.target;
    const keyCode = e.which ? e.which : e.keyCode;
    const checkPatt = /^([0-9]{0,5})$/g;

    if (keyCode !== 13 && ((value && value.length >= 5) ||
      keyCode === 46 || checkPatt.test(value) === false)) {
      e.preventDefault();
      return false;
    }
  }


  createMapOptions = () => ({
    panControl: true,
    mapTypeControl: false,
    scrollwheel: true,
    zoomControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    styles: [],
  })

  markerClicked = (storeId) => {
    this.props.markerClicked(storeId, true);
  }

  mapClicked = () => {
    this.props.mapClicked();
  }

  submitZipCode = (event) => {
    event.preventDefault();
    const zipCode = this.props.formValues.zipCode;
    if (!zipCode) {
      return;
    }
    this.geocode(this.props.submitZipCode, zipCode);
  }

  showAll = (reRenderMaps) => {
    this.props.markerClicked(null, reRenderMaps);
  }

  showAllList = (reRenderMaps, event) => {
    event.preventDefault();
    this.props.markerClicked(null, reRenderMaps);
  }

  storeSelected = (store) => {
    const param = {};
    param.shippingAddressType = 'pickUpStore';
    param.orderId = this.props.orderDetails.orderId;
    param.storeId = store.storeId;
    param.standaloneAccessories = this.props.standaloneAccessories;
    param.longitude = store.longitude;
    param.latitude = store.latitude;
    param.shipOptionChangeOnly = true;
    param.phoneNumber = this.props.phoneNumber ? this.props.phoneNumber : '';
    // if (tradeIn && tradeInAddress) {
    //   param.ispuLastName = tradeInAddress.lastName;
    //   param.ispuFirstName = tradeInAddress.firstName;
    //   param.ispuState = tradeInAddress.state;
    //   param.ispuPostalCode = tradeInAddress.zipcode;
    //   param.ispuAddress1 = tradeInAddress.address1;
    //   param.ispuAddress2 = tradeInAddress.address2;
    //   param.ispuCity = tradeInAddress.city;
    //   if (tradeInAddress.companyName) {
    //     param.ispuCOName = tradeInAddress.companyName;
    //   }
    // }
    this.props.submitISPU(param);
    this.props.closeModal();
  }

  returnToReviewOrder = () => {
    window.location.href = '/';
  }

  showMapsAndStoreList() {
    const { cqContent, gMapApiKey, storeList } = this.props;
    // const { cqContent, gMapApiKey } = this.props;
    // const storeList = storeDetails.output;
    const zoom = 10;
    const markers = storeList.map((obj) => ({
      lat: Number(obj.latitude),
      long: Number(obj.longitude),
      storeId: obj.storeId,
      deviceAvailable: obj.deviceAvailable,
      selectedStore: (this.props.selectedStoreId === obj.storeId ? !this.props.navigateToStoreDetail : false),
    }));
    const center = {
      lat: storeList[0].latitude,
      long: storeList[0].longitude,
    };
    // const stores = this.getSelectedStores();
    // const mapHeight = this.props.mapOnlyView ? (window.innerHeight * 0.75) : (window.innerHeight * 0.4);
    const isDetailsMap = false;
    return (
      <div>
        <Row>
          <Col>
            <h4 className="bold">{cqContent.label.DT_OD_CHECKOUT_ISPU_CHECK_AVAILABILITY}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            {cqContent.label.DT_OD_CHECKOUT_ISPU_STORES_IN_AREA}
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Row>
              <Field
                className=""
                component={renderTextField}
                id="zipCode"
                name="zipCode"
                normalize={validation.allowOnlyNumbers}
                maxLength="10"
                label="Enter ZIP code"
                type="text"
                required
              //  disabled={!!this.props.selectValue(`balance_${index + 1}`)}
              />
            </Row>
            <Row className="pad12 onlyTopPad">
              {this.renderOptions()}
            </Row>
            <Row>
              <button onClick={this.submitZipCode} analyticstrack="shipping-ispu-findStores-CTA" className="button primary filterButton margin6">{cqContent.label.DT_OD_CHECKOUT_ISPU_FIND_STORES_TEXT}</button>
            </Row>
          </Col>
          <Col
            xs={6}
            className="background_gray_three pad12 fontSize_2"
            dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CHECKOUT_ISPU_HOW_DOES_IT_WORK }}
          />
        </Row>
        <Row>
          <Col xs={6}>
            {(!this.props.mapOnlyView) ?
              <div style={{ position: 'relative', overflowX: 'hidden', overflowY: 'auto', maxHeight: '300px' }}>
                <ISPUStoreList
                  cqContent={cqContent}
                  storeList={storeList}
                  selectedStoreId={this.props.selectedStoreId}
                  navigateToStoreDetail={this.props.navigateToStoreDetail}
                  storeSelected={this.storeSelected}
                  showAll={this.showAll.bind(this)}
                  showMore={this.props.showMoreStores}
                  displayShowMore={this.props.displayShowMore}
                  useISPUService={this.props.useISPUService}
                  nextURL={this.props.nextURL}
                />
              </div>
              :
              <div className="margin18">
                <button analyticstrack="shipping-ispu-showAllList-CTA" onClick={() => this.showAllList(true)}>{cqContent.label.DT_OD_CHECKOUT_ISPU_LIST_STORES_TEXT}</button>
              </div>
            }
          </Col>
          <Col xs={6} className="pad12 onlyTopPad">
            <GoogleMap
              center={center}
              zoom={zoom}
              markers={markers}
              bootstrapURLKeys={gMapApiKey}
              options={this.createMapOptions()}
              onMarkerClicked={() => this.markerClicked()}
              onMapClicked={() => this.mapClicked()}
              reRenderMaps={this.props.reRenderMaps}
              isDetailsMap={isDetailsMap}
            />
          </Col>
        </Row>
      </div>
    );
  }
  showNoResults() {
    const { cqContent } = this.props;
    return (
      <section>
        <Row>
          <Col xs={6}>
            <Row>
              <Col xs={9}>
                <Field
                  className=""
                  component={renderTextField}
                  id="zipCode"
                  name="zipCode"
                  normalize={validation.allowOnlyNumbers}
                  maxLength="10"
                  label="Enter ZIP code"
                  type="text"
                  required
                //  disabled={!!this.props.selectValue(`balance_${index + 1}`)}
                />
              </Col>
            </Row>
            <Row className="pad12 onlyTopPad">
              {this.renderOptions()}
            </Row>
            <Row>
              <Col xs={12}>
                <button
                  onClick={this.submitZipCode}
                  className="button primary margin12 noSideMargin"
                  analyticstrack="shipping-ispu-findStores-CTA"
                >
                  {cqContent.label.DT_OD_CHECKOUT_ISPU_FIND_STORES_TEXT}
                </button>
              </Col>
            </Row>
          </Col>
          <Col
            xs={6}
            className="background_gray_three pad12 fontSize_2"
            dangerouslySetInnerHTML={{ __html: cqContent.html.DT_OD_CHECKOUT_ISPU_HOW_DOES_IT_WORK }}
          />
        </Row>
        <NoStores cqContent={cqContent} />
      </section>

    );
  }

  renderOptions = () => {
    const ispuDistances = ['5', '10', '25', '50'];
    const renderedOptions = ispuDistances.map((option, index) => {
      const radioName = `ispuDistance${index}`;
      return (
        <Col xs={6} lg={3} className="pad6 onlyTopPad" key={index}>
          <RadioButton
            name="ispuDistance"
            id={radioName}
            value={option}
            containerClassName=" "
            analyticstrack="shipping-ispu-ispuDistance-radio"
            labelClassName="displayInlineBlock verticalcenter pad12 onlyLeftPad fontSize_5 radioLabel"
          >
            {`${option} miles`}
          </RadioButton>
        </Col>
      );
    });
    return renderedOptions;
  }

  render() {
    if ((typeof this.props.storeList !== 'undefined' && this.props.storeList.length > 0) || typeof storeDetails !== 'undefined') {
      return (
        <div className="section grid group min-width600">
          {this.showMapsAndStoreList()}
        </div>
      );
    }
    return (
      <section className="pad18 onlyTopPad">
        <Row>
          <Col xs={12}>
            {this.showNoResults()}
          </Col>
        </Row>
      </section>
    );
  }
}

InStorePickUp.propTypes = {
  cqContent: PropTypes.object,
  storeList: PropTypes.array,
  mapOnlyView: PropTypes.bool,
  reRenderMaps: PropTypes.bool,
  gMapApiKey: PropTypes.object,
  submitISPU: PropTypes.func,
  mapClicked: PropTypes.func,
  markerClicked: PropTypes.func,
  submitZipCode: PropTypes.func,
  selectedStoreId: PropTypes.string,
  zipCode: PropTypes.string,
  navigateToStoreDetail: PropTypes.bool,
  formValues: PropTypes.object,
  closeModal: PropTypes.func,
  orderDetails: PropTypes.object,
  standaloneAccessories: PropTypes.bool,
  asyncFetchSucess: PropTypes.func,
  showMoreStores: PropTypes.func,
  displayShowMore: PropTypes.bool,
  nextURL: PropTypes.string,
  phoneNumber: PropTypes.string,
  useISPUService: PropTypes.bool,
};

// export default InStorePickUp;
export default reduxForm({
  form: 'ispu',
  // validate,
})(InStorePickUp);
