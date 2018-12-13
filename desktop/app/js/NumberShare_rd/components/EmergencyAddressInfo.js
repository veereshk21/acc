
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues, getFormSyncErrors } from 'redux-form/immutable';
import { Grid, Col, Row } from 'react-flexbox-grid';
// import * as _ from 'lodash';

import Loader from '../../common/Loader/Loader';
import MSelect from '../../common/Select/index';
import RadioButton from '../../common/RadioButton/index';
import Anchor from '../../common/A/A';
import { renderTextField } from '../../common/TextField/';

const validate = (values, props) => {
  const errors = {};

  const address1 = values.get('address1');
  const city = values.get('city');
  const state = values.get('state');
  const zipcode = values.get('zipcode');
  const firstName = values.get('firstName');
  const lastName = values.get('lastName');

  if (!firstName) {
    errors.firstName = props.cqContent.error.DT_OD_ENE_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(firstName)) {
    errors.firstName = props.cqContent.error.DT_OD_ENE_ERROR_FIRSTNAME;
  }
  if (!lastName) {
    errors.lastName = props.cqContent.error.DT_OD_ENE_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(lastName)) {
    errors.lastName = props.cqContent.error.DT_OD_ENE_ERROR_LASTNAME;
  }
  if (!address1) {
    errors.address1 = props.cqContent.error.DT_OD_ENE_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z0-9\-\. ',#&;/\s]+$/i.test(address1)) { // eslint-disable-line
    errors.address1 = props.cqContent.error.DT_OD_ENE_ERROR_ADDRESS1;
  }
  if (!city) {
    errors.city = props.cqContent.error.DT_OD_ENE_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(city)) {
    errors.city = props.cqContent.error.DT_OD_ENE_ERROR_CITY;
  }
  if (!zipcode) {
    errors.zipcode = props.cqContent.error.DT_OD_ENE_FIELD_REQUIRED_TEXT;
  } else if (!/^\d{5}-\d{4}$|^\d{5}$/i.test(zipcode)) {
    errors.zipcode = props.cqContent.error.DT_OD_ENE_ERROR_ZIPCODE;
  }

  if (!state || state === props.cqContent.label.DT_OD_ENE_STATE_OPTION) {
    errors.state = props.cqContent.label.DT_OD_ENE_FIELD_REQUIRED_TEXT;
  }
  return errors;
};

class EmergencyAddressInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alternateBillEnabled: props.emergencyContactInfo.alternativeAddressExist,
      selectedAddressInfo: {},
      changeEnable: false,
      disableCTA: true,
    };
  }

  componentDidMount() {
    const { numberShare, productInfo } = this.props;
    if (numberShare.eligibleForE911Address && productInfo) {
      this.props.getEmergencyAddress(numberShare.redirectUrl);
    } else {
      this.props.indexLLP();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.changeEnable && nextProps.updateEmergencyContactInfo) {
      this.setState({ alternateBillEnabled: nextProps.updateEmergencyContactInfo.alternativeAddressExist });
    }
  }

  // gets called click of CTA
  onSubmit() {
    const { numberShare, addDeviceShare, productInfo } = this.props;
    const deviceInfo = Object.assign({}, { redirectUrl: numberShare.redirectUrl, ...productInfo });
    this.setState({ changeEnable: false });
    if (numberShare.devicesList) {
      if (!this.state.alternateBillEnabled) {
        if (this.props.formValues && this.props.formValues.billingAddressRadio) {
          delete this.props.formValues.billingAddressRadio;
        }
        deviceInfo.e911FormData = this.props.formValues;
      } else {
        deviceInfo.e911FormData = this.state.selectedAddressInfo;
      }
      addDeviceShare(deviceInfo);
    } else {
      window.location = numberShare.cartRedirectUrl;
    }
  }

  addressInfoChange(info) {
    const obj = info;
    obj.chooseNoSelect = this.props.formValues.chooseNoSelect;
    obj.e911AddressValidated = true;
    obj.firstName = this.props.formValues.firstName;
    obj.lastName = this.props.formValues.lastName;
    this.setState({ selectedAddressInfo: obj, disableCTA: false });
  }

  changeAddress() {
    const { changeEnable } = this.state;
    this.setState({ alternateBillEnabled: false, changeEnable: !changeEnable });
  }

  render() {
    const { cqContent, handleSubmit, numberShare, submitting, isFetching, valid, emergencyContactInfo, updateEmergencyContactInfo } = this.props; // eslint-disable-line
    const { alternateBillEnabled, disableCTA } = this.state;
    return (
      <section className="margin15 onlyTopMargin vhm80">
        {isFetching && <Loader />}
        <Grid fluid>
          <Row>
            <Col xs={6} className="floatLeft">
              <Row>
                <Col lg={12} sm={12} md={12}>
                  {!alternateBillEnabled ?
                    <h2 className="fontSize_11 margin15 onlyTopMargin width85">{cqContent.label.DT_OD_ENE_PAGE_TITLE}</h2> :
                    <h2 className="fontSize_11 margin15 onlyTopMargin width85">{cqContent.label.DT_OD_ENE_ALTERNATIVE_ADDRESS_HEADER}</h2>
                  }
                </Col>
              </Row>
              {!alternateBillEnabled && <Row>
                <Col lg={11} sm={12} md={12}>
                  <p className="margin10 noSideMargin">{cqContent.label.DT_OD_ENE_PAGE_SUB_TITLE}</p>
                </Col>
              </Row>}
              {!alternateBillEnabled && <p className="fontSize_1" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_ENE_FIELD_REQUIRED }} />}
            </Col>
          </Row>

          {!alternateBillEnabled && <Row className="margin10 onlyTopMargin e911LLP">
            <Col xs={8} className="floatLeft">
              {emergencyContactInfo.emergencyAddressError && <div className="margin10 color_white onlyTopMargin pad30 background_black">
                <span className="notification_iconwrap">
                  <div className="floatRight">
                    <div role="button" tabIndex="0" aria-label="Close" className="notification_close cursorPointer bold" onClick={this.closeErrorModal.bind(this)} />
                  </div>
                  <div>
                    <span className="floatLeft block notification_icon m-warning fontTextMedium" />
                    <span className="floatLeft block pad20 onlySidePad bold margin10 onlyTopMargin" dangerouslySetInnerHTML={{ __html: emergencyContactInfo.emergencyAddressError }} />
                  </div>
                </span>
              </div>}
              <section className="margin10  onlyBottomMargin noShare_e911Form">
                <Row className=" margin15 noSideMargin nsllpForm">
                  <Col md={6} xs={6} className="">
                    <Field
                      className="leftAlign width100 eAddressDD"
                      onFocus={this.focus}
                      component={renderTextField}
                      type="text"
                      id="address1"
                      name="address1"
                      placeHolder="Apartment, Cube unit, building, floor etc."
                      label={cqContent.label.DT_OD_ENE_ADDRESS1}
                    />
                  </Col>
                  <Col md={6} xs={6} className="">
                    <div className="clearfix">
                      <Field
                        className="leftAlign width100 fontSize_4"
                        component={renderTextField}
                        type="text"
                        id="address2"
                        name="address2"
                        placeHolder="Apartment, building, floor etc."
                        label={cqContent.label.DT_OD_ENE_ADDRESS2}
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="clearfix nsllpForm">
                  <Col md={3} xs={3} className="color_black">
                    <Field
                      className="leftAlign width100 fontSize_4"
                      onFocus={this.focus}
                      component={renderTextField}
                      type="text"
                      id="zipcode"
                      name="zipcode"
                      placeHolder="Zipcode"
                      label={cqContent.label.DT_OD_ENE_ZIPCODE}
                    />
                  </Col>
                  <Col md={3} xs={3} className="e911StateWrap">
                    <MSelect
                      name="state"
                      id="state"
                      className="fontSize_4 color_000"
                      label={cqContent.label.DT_OD_ENE_STATE}
                      style={{ height: '50px', fontSize: '14px', fontWeight: 'bold', color: '#333' }}
                      borderStyle
                    >
                      <option value="" key="disabled" dangerouslySetInnerHTML={{ __html: cqContent.label.DT_OD_ENE_STATE_OPTION }} selected disabled analyticstrack="select-e911-location-list" />
                      {
                        emergencyContactInfo.states && emergencyContactInfo.states.map((stateName) => <option key={stateName} value={stateName}> {stateName} </option>)
                      }
                    </MSelect>
                  </Col>
                  <Col md={6} xs={6} className="">
                    <Field
                      className="leftAlign width100 fontSize_4"
                      onFocus={this.focus}
                      component={renderTextField}
                      type="text"
                      id="city"
                      name="city"
                      placeHolder="City Name"
                      label={cqContent.label.DT_OD_ENE_CITY}
                    />
                  </Col>
                </Row>
              </section>
            </Col>
          </Row>}

          {alternateBillEnabled && <Row className="margin10 onlyTopMargin e911LLP">
            <Col xs={12}>
              {this.props.formValues && <Row>
                <Col xs={5} className="margin15 noSideMargin">
                  <div className="bold fontSize_6">{cqContent.label.DT_OD_ENE_ALTERNATIVE_ADDRESS_CUST}</div>
                  <div className="margin15 onlyTopMargin">
                    {this.props.formValues.address1 && <span>{this.props.formValues.address1}, </span>}
                    {this.props.formValues.address2 && <span>{this.props.formValues.address2}, </span>}
                    {this.props.formValues.city && <span>{this.props.formValues.city}, </span>}
                    {this.props.formValues.state && <span>{this.props.formValues.state}, </span>}
                    {this.props.formValues.zipcode && <span>{this.props.formValues.zipcode}</span>}
                  </div>
                  <div>
                    <Anchor onClick={this.changeAddress.bind(this)} className="color_black textDecUnderline margin15 noSideMargin cursorPointer">{cqContent.label.DT_OD_ENE_FIELD_CHANGE_LINK}</Anchor>
                  </div>
                </Col>
              </Row>}
              {updateEmergencyContactInfo.addressList && <Row>
                <Col xs={5} className="margin15 noSideMargin">
                  <p className="bold fontSize_6 margin15 onlyTopMargin">{cqContent.label.DT_OD_ENE_ALTERNATIVE_ADDRESS_LIST}</p>
                  {updateEmergencyContactInfo.addressList.map((address, index) => {
                    const val = `${address.address1}${address.address2}${address.city}${address.state}-${index}`;
                    return (<RadioButton
                      name="billingAddressRadio"
                      id={`billingDevice-${index}`}
                      value={val}
                      onChange={this.addressInfoChange.bind(this, address)}
                      containerClassName="margin24 onlyTopMargin"
                      labelClassName="displayInlineBlock verticalCenter"
                      analyticstrack="select-alternate-address-radio"
                    >
                      <p className="margin5 onlySideMargin displayInlineBlock">
                        {address.address1 && <span>{address.address1}, </span>}
                        {address.address2 && <span>{address.address2}, </span>}
                        {address.city && <span>{address.city}, </span>}
                        {address.state && <span>{address.state}, </span>}
                        {address.zipcode && <span>{address.zipcode}</span>}
                      </p>
                    </RadioButton>);
                  })}
                </Col>
              </Row>}
            </Col>
          </Row>}
          <Row>
            <button
              style={{ width: '200px' }}
              disabled={this.props.invalid || (alternateBillEnabled && disableCTA)}
              className="button bold margin20 onlyTopMargin block"
              type="submit"
              onClick={this.onSubmit.bind(this)}
              analyticstrack="select-e911-details-CTA"
              dangerouslySetInnerHTML={{ __html: alternateBillEnabled ? cqContent.label.DT_OD_ENE_UPDATE_CTA : cqContent.label.DT_OD_NS_PROMPT_NEXT_CTA }}
            />
          </Row>
        </Grid>
      </section>
    );
  }
}

EmergencyAddressInfo.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};


EmergencyAddressInfo.propTypes = {
  invalid: PropTypes.object,
  numberShare: PropTypes.object,
  getEmergencyAddress: PropTypes.func,
  productInfo: PropTypes.object,
  emergencyContactInfo: PropTypes.object,
  addDeviceShare: PropTypes.func,
  formValues: PropTypes.object,
  indexLLP: PropTypes.func,
  updateEmergencyContactInfo: PropTypes.object,
};

EmergencyAddressInfo = reduxForm({ // eslint-disable-line no-class-assign
  form: 'NumberShareForm',
  enableReinitialize: true,
  validate,
})(EmergencyAddressInfo);

EmergencyAddressInfo = connect( // eslint-disable-line no-class-assign
  (state) => {
    const formMap = getFormValues('NumberShareForm')(state);
    const formValues = formMap ? formMap.toJS() : {};
    const formErrors = getFormSyncErrors('NumberShareForm')(state);
    return {
      formValues,
      formErrors,
    };
  })(EmergencyAddressInfo);

export default EmergencyAddressInfo;
