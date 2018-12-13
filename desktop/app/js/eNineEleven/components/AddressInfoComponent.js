import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Title from '../../common/Title/Title';
import { renderTextField } from '../../common/TextField/';
import { queryStringToObj } from '../../common/Helpers/';
import MSelect from '../../common/Select/';
import { hashHistory } from './../../store';
import Loader from '../../common/Loader/Loader';
import HorizontalRule from '../../common/HorizontalRule';
import RadioButton from '../../common/RadioButton/';
import Anchor from '../../common/A/A';

const styles = {
  position: 'relative',
  bottom: '-6px',
  fontSize: '12px',
  lineHeight: '12px',
  color: 'rgb(255, 188, 61)',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
};

const validate = (values, props) => {
  const errors = {};

  const address1 = values.get('address1');
  const city = values.get('city');
  const state = values.get('state');
  const zipcode = values.get('zipcode');
  const firstName = values.get('firstName');
  const lastName = values.get('lastName');

  if (!firstName) {
    errors.firstName = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(firstName)) {
    errors.firstName = props.cqContent.error.OD_ENE_ERROR_FIRSTNAME;
  }
  if (!lastName) {
    errors.lastName = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(lastName)) {
    errors.lastName = props.cqContent.error.OD_ENE_ERROR_LASTNAME;
  }
  if (!address1) {
    errors.address1 = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z0-9\-\. ',#&;/\s]+$/i.test(address1)) { // eslint-disable-line
    errors.address1 = props.cqContent.error.OD_ENE_ERROR_ADDRESS1;
  }
  if (!city) {
    errors.city = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(city)) {
    errors.city = props.cqContent.error.OD_ENE_ERROR_CITY;
  }
  if (!zipcode) {
    errors.zipcode = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^\d{5}-\d{4}$|^\d{5}$/i.test(zipcode)) {
    errors.zipcode = props.cqContent.error.OD_ENE_ERROR_ZIPCODE;
  }

  if (!state || state === 'STATE') {
    errors.state = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  }

  return errors;
};

class AddressInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alternateBillEnabled: props.pageJSON.alternativeAddressExist,
      fieldsTouched: false,
      showWarnings: false,
      selectedAddressInfo: {},
      changeEnable: false,
      formValues: {},
      disableCTA: true,
    };
  }

  componentWillMount() {
    const { pageJSON } = this.props;
    if (pageJSON.addressInfo) {
      hashHistory.push('/addressOptions');
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.showWarnings && this.props.isFetching) {
      this.setState({
        fieldsTouched: false,
        showWarnings: true,
      });
    }
    if (!this.state.changeEnable && newProps.updateEmergencyContactInfo) {
      this.setState({ alternateBillEnabled: newProps.updateEmergencyContactInfo.alternativeAddressExist });
    }
  }

  changeAddress() {
    const { changeEnable } = this.state;
    this.setState({ alternateBillEnabled: false, changeEnable: !changeEnable });
  }

  addressInfoChange(info) {
    const obj = info;
    obj.e911AddressValidated = true;
    obj.firstName = this.state.formValues.firstName;
    obj.lastName = this.state.formValues.lastName;
    this.setState({ selectedAddressInfo: obj, disableCTA: false });
  }

  focus = () => {
    this.setState({
      fieldsTouched: true,
    });
  }
  render() {
    const {
      cqContent, handleSubmit, submitting, isFetching, onUpdateAddress, valid, updateEmergencyContactInfo,
    } = this.props;
    const { states, updateAddressUrl } = this.props.pageJSON;
    const {
      fieldsTouched,
      showWarnings,
      alternateBillEnabled,
      formValues,
      selectedAddressInfo,
      disableCTA,
    } = this.state;
    return (
      <Grid className="pad32 e911LLP">
        {isFetching && <Loader />}
        <form className="nsllpForm">
          <Row>
            <Col lg={6} sm={7} className="margin12 onlyTopMargin">
              <Title className="noSidePad">{cqContent.label.OD_ENE_PAGE_TITLE}</Title>
              {!alternateBillEnabled && <p className="fontSize_1_3 pad6 onlyTopPad">{cqContent.label.OD_ENE_PAGE_SUB_TITLE}</p>}
              <HorizontalRule />
            </Col>
          </Row>
          {!alternateBillEnabled && <Row>
            <Col xs={6} className="margin12 onlyBottomMargin">
              <Field
                component={renderTextField}
                type="text"
                id="firstName"
                name="firstName"
                placeHolder="First Name"
                required
                label={cqContent.label.OD_ENE_FIRSTNAME}
              />
            </Col>

            <Col xs={6} className="margin12 onlyBottomMargin">
              <Field
                component={renderTextField}
                type="text"
                id="lastName"
                name="lastName"
                placeHolder="Last Name"
                required
                label={cqContent.label.OD_ENE_LASTNAME}
              />
            </Col>
          </Row>}
          {!alternateBillEnabled && <Row>
            <Col xs={6} className="margin12 onlyBottomMargin">
              <Field
                onFocus={this.focus}
                component={renderTextField}
                type="text"
                id="address1"
                name="address1"
                required
                label={cqContent.label.OD_ENE_ADDRESS1}
                placeHolder="Apartment, Cube unit, building, floor etc."
                errorText={(!fieldsTouched && showWarnings) && cqContent.error.OD_ENE_ERROR_ADDRESS1}
              />

            </Col>

            <Col xs={6} className="margin12 onlyBottomMargin">
              <Field
                component={renderTextField}
                type="text"
                id="address2"
                name="address2"
                placeHolder="Apartment, building, floor etc."
                label={cqContent.label.OD_ENE_ADDRESS2}
              />
            </Col>
          </Row>}
          {!alternateBillEnabled && <Row>
            <Col xs={6} className="margin12 onlyBottomMargin">
              <Row>
                <Col xs={6}>
                  <Field
                    onFocus={this.focus}
                    component={renderTextField}
                    type="text"
                    id="zipcode"
                    name="zipcode"
                    required
                    placeHolder="Zipcode"
                    label={cqContent.label.OD_ENE_ZIPCODE}
                    errorText={(!fieldsTouched && showWarnings) && cqContent.error.OD_ENE_ERROR_ZIPCODE}
                  />
                </Col>
                <Col xs={6} className="positionRelative">
                  <MSelect
                    name="state"
                    aria-label={cqContent.label.OD_ENE_STATE}
                    id="state"
                    borderStyle
                    required
                    onFocus={this.focus}
                    label={cqContent.label.OD_ENE_STATE}
                    errorText={(!fieldsTouched && showWarnings) && cqContent.error.OD_ENE_ERROR_CITY}
                    analyticstrack="choose-e911-state"
                  >
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </MSelect>
                  {(!fieldsTouched && showWarnings) &&
                    <span
                      style={styles}
                    > {cqContent.error.OD_ENE_ERROR_STATE}
                    </span>}
                </Col>
              </Row>
            </Col>
            <Col xs={6} className="margin12 onlyBottomMargin">
              <Field
                onFocus={this.focus}
                component={renderTextField}
                type="text"
                id="city"
                name="city"
                required
                placeHolder="City Name"
                label={cqContent.label.OD_ENE_CITY}
                errorText={(!fieldsTouched && showWarnings) && cqContent.error.OD_ENE_ERROR_CITY}
              />
            </Col>
          </Row>}
          {alternateBillEnabled && <Row className="e911LLP">
            {formValues && <Col xs={12} className="margin10 noSideMargin">
              <p className="bold fontSize_5">{cqContent.label.OD_ENE_ALTERNATIVE_ADDRESS_CUST}</p>
              <p className="displayInlineBlock margin10 onlyTopMargin">
                {formValues.address1 && <span>{formValues.address1}, </span>}
                {formValues.address2 && <span>{formValues.address2}, </span>}
                {formValues.city && <span>{formValues.city}, </span>}
                {formValues.state && <span>{formValues.state}, </span>}
                {formValues.zipcode && <span>{formValues.zipcode}</span>}
              </p>
              <p>
                <Anchor onClick={this.changeAddress.bind(this)} className="color_black textDecUnderline displayInlineBlock margin15 cursorPointer onlyTopMargin">Change</Anchor>
              </p>
            </Col>}
            {updateEmergencyContactInfo.addressList && <Col lg={6} sm={7} className="margin10 noSideMargin">
              <p className="bold border_black onlyTopBorder pad20 onlyTopPad margin10 onlyTopMargin" style={{ borderWidth: '4px' }}>{cqContent.label.OD_ENE_ALTERNATIVE_ADDRESS_LIST}</p>
              {updateEmergencyContactInfo.addressList.map((address, index) => {
                const val = `${address.address1}${address.address2}${address.city}${address.state}-${index}`;
                return (<RadioButton
                  name="billingAddressRadio"
                  id={`billingDevice-${index}`}
                  value={val}
                  onChange={this.addressInfoChange.bind(this, address)}
                  labelClassName="displayInlineBlock verticalCenter margin15 noSideMargin"
                  analyticstrack="select-alternate-address-radio"
                >
                  <p className="margin10 onlySideMargin displayInlineBlock">
                    {address.address1 && <span>{address.address1}, </span>}
                    {address.address2 && <span>{address.address2}, </span>}
                    {address.city && <span>{address.city}, </span>}
                    {address.state && <span>{address.state}, </span>}
                    {address.zipcode && <span>{address.zipcode}</span>}
                  </p>
                </RadioButton>);
              })}
            </Col>}
          </Row>}
          <div className="clearfix textAlignLeft pad24 noSidePad">
            <button
              type="submit"
              className="button large"
              disabled={(!valid || submitting) || (alternateBillEnabled && disableCTA)}
              analyticstrack="submit-e911-address"
              onClick={
                handleSubmit((data) => {
                  this.setState({ changeEnable: false, formValues: data.toJS(), disableCTA: true });
                  let obj = data.toJS();
                  obj.e911AddressValidated = false;
                  if (alternateBillEnabled) {
                    obj = selectedAddressInfo;
                  }
                  onUpdateAddress(Object.assign({}, obj, queryStringToObj()), updateAddressUrl);// dispatches add new card action
                })
              }
            >{alternateBillEnabled ? cqContent.label.OD_ENE_UPDATE_CTA : cqContent.label.OD_ENE_CONTINUE_CTA}
            </button>
          </div>
        </form>
      </Grid>
    );
  }
}

AddressInfoComponent.propTypes = {
  cqContent: PropTypes.object,
  handleSubmit: PropTypes.func,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  isFetching: PropTypes.bool,
  onUpdateAddress: PropTypes.func,
  pageJSON: PropTypes.object,
  updateEmergencyContactInfo: PropTypes.object,
};

export default reduxForm({
  form: 'addressInfoForm',
  validate,
})(AddressInfoComponent);

