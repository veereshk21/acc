/**
 * Created by gautam on 4/11/2017.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import TextField from 'material-ui/TextField';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import styles from '../../common/Constants/FormStyles';
import Button from '../../common/Button/Button';

let isBusinessChecked = false;

const validate = (values, props) => {
  const errors = {};
  const businessAddressRadio = isBusinessChecked;
  const ispuCOName = values.get('ispuCOName');
  const ispuFirstName = values.get('ispuFirstName');
  const ispuLastName = values.get('ispuLastName');
  const shippingAddress = values.get('ispuAddress1');
  const shippingAddress2 = values.get('ispuAddress2');
  const ispuState = values.get('ispuState');
  const ispuCity = values.get('ispuCity');
  const ispuPostalCode = values.get('ispuPostalCode');
  const emailAddress = values.get('emailAddress');
  const telephoneNumber = values.get('phoneNumber');

  if (businessAddressRadio === true) {
    if (!ispuCOName) {
      errors.ispuCOName = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
    } else if (!/^[a-zA-Z\- ',\s]+$/i.test(ispuCOName)) {
      errors.ispuCOName = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_COMPANY_NAME_ERROR;
    }
  }

  if (!ispuFirstName) {
    errors.ispuFirstName = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(ispuFirstName)) {
    errors.ispuFirstName = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_FIRST_NAME_ERROR;
  }
  if (!ispuLastName) {
    errors.ispuLastName = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(ispuLastName)) {
    errors.ispuLastName = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_LAST_NAME_ERROR;
  }
  if (!shippingAddress) {
    errors.ispuAddress1 = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z0-9\-\. ',#&;/\s]+$/i.test(shippingAddress)) { // eslint-disable-line
    errors.ispuAddress1 = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_SHIPPING_ADDRESS_PRIMARY_ERROR;
  }
  if (shippingAddress2 && !/^[a-zA-Z0-9\-\. ',#&;/\s]+$/i.test(shippingAddress2)) { // eslint-disable-line
    errors.ispuAddress2 = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_SHIPPING_ADDRESS_SECONDARY_ERROR;
  }
  if (!ispuCity) {
    errors.ispuCity = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(ispuCity)) {
    errors.ispuCity = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_STATE_ERROR;
  }
  if (!ispuState) {
    errors.ispuState = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^[a-zA-Z\- ',\s]+$/i.test(ispuState)) {
    errors.ispuState = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_STATE_ERROR;
  }
  if (!ispuPostalCode) {
    errors.ispuPostalCode = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^\d{5}-\d{4}$|^\d{5}$/i.test(ispuPostalCode)) {
    errors.ispuPostalCode = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_ZIPCODE_ERROR;
  }
  if (!emailAddress) {
    errors.emailAddress = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(emailAddress)) { // eslint-disable-line
    errors.emailAddress = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_EMAIL_ERROR;
  }
  if (!telephoneNumber) {
    errors.phoneNumber = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
  } else if (!/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/i.test(telephoneNumber)) {
    errors.phoneNumber = props.cqContent.error.OD_CHECKOUT_DELIVERY_ADDRESS_INVALID_PHONE_NUMBER_ERROR;
  }
  return errors;
};

// eslint-disable-next-line react/prop-types
const renderField = ({ input, label, type, meta: { active, touched, error }, ...custom }) => { // eslint-disable-line
  const displayLabel = (typeof error === 'string' && error.length > 0) ? 'none' : 'block';
  return (<TextField
    hintText={label}
    underlineFocusStyle={styles.underlineFocusStyle}
    floatingLabelFocusStyle={Object.assign({}, styles.floatingLabelFocusStyle, { display: 'none' })}
    floatingLabelShrinkStyle={Object.assign({}, { transform: 'scale(0.8) translate(0px, 36px)' }, { display: displayLabel })}
    underlineDisabledStyle={{ borderBottom: '1px solid rgb(224, 224, 224)' }}
    style={{ width: '100%', float: 'left' }}
    inputStyle={{ color: '#000', opacity: 1, '-webkit-text-fill-color': '#000' }}
    floatingLabelText={label}
    errorStyle={styles.errorStyle}
    errorText={!active && touched && error}
    {...input}
    {...custom}

  />);
};

// eslint-disable-next-line react/prop-types
const renderDropdown = ({ input, label, type, meta: { touched, error }, ...custom }) => { // eslint-disable-line
  const { options, ...rest } = custom;
  return (
    <div className="selectpicker">
      <select
        {...input}
        {...rest}
        style={{
          width: '100%', border: 'none', bottom: '10px', position: 'absolute', padding: 0,
        }}
      >
        {options.map((optionLabel, id) => (<option key={id} value={optionLabel}>{optionLabel}</option>))}
      </select>
      <label
        htmlFor="ispuPostalCode"
        style={{
          userSelect: 'none', position: 'absolute', top: '38px', transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', zIndex: '1', lineHeight: '22px', transformOrigin: 'left top 0px', pointerEvents: 'none', color: 'rgba(0, 0, 0, 0.298039)', transform: 'scale(0.8) translate(0px, 36px)', display: 'block',
        }}
      >{label}
      </label>
    </div>);
};


class TradeInAddressForm extends Component {
  constructor(props) {
    super(props);
    isBusinessChecked = props.initialValues.get('isBusinessAddress');
    this.ispuState = { selectedState: props.initialValues.get('ispuState') };
  }

  // material-ui specific method
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  setBusinessStatus() {
    isBusinessChecked = !isBusinessChecked;
  }

  getAddress() {
    this.setState({ showAddress: !this.ispuState.showAddress });
  }
  handleChange(event) {
    this.setState({ selectedState: event.target.value });
  }

  render() {
    const {
      cqContent, handleSubmit, formEnabled, valid, submitting, states,
    } = this.props;
    return (
      <div>
        <form id="field" onSubmit={handleSubmit}>
          <div>
            <Field className="checkbox" name="businessAddress" id="businessAddress" onChange={this.setBusinessStatus.bind(this)} disabled={!formEnabled} component="input" type="checkbox" checked={isBusinessChecked} />
            <label htmlFor="businessAddress">
              <span className="margin10 onlyLeftMargin">{cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_BUSINESS_ADDRESS_LABEL_TEXT}</span>
            </label>
            {isBusinessChecked &&
              <div >
                <Field className="leftAlign width100 fontSize_4 " name="ispuCOName" id="ispuCOName" component={renderField} type="text" disabled={!formEnabled} label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_COMPANY_NAME_TEXT} />
              </div>}
          </div>

          <div className="clearfix">
            <Field className="leftAlign width100 fontSize_4" component={renderField} type="text" id="ispuFirstName" name="ispuFirstName" label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_FIRST_NAME_TEXT} disabled={!formEnabled} />
          </div>

          <div className="clearfix">
            <Field className="leftAlign width100 fontSize_4" component={renderField} type="text" id="ispuLastName" name="ispuLastName" label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_LAST_NAME_TEXT} disabled={!formEnabled} />
          </div>

          <div className="clearfix">
            <Field className="leftAlign width100 fontSize_4" component={renderField} type="text" id="ispuAddress1" name="ispuAddress1" label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_SHIPPING_ADDRESS_PRIMARY_TEXT} disabled={!formEnabled} />
          </div>

          <div className="clearfix">
            <Field className="leftAlign width100 fontSize_4" component={renderField} type="text" id="ispuAddress2" name="ispuAddress2" label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_SHIPPING_ADDRESS_SECONDARY_TEXT} disabled={!formEnabled} />
          </div>

          <div className="clearfix">
            <Field className="leftAlign width100 fontSize_4" component={renderField} type="text" id="ispuCity" name="ispuCity" label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_CITY_TEXT} disabled={!formEnabled} />
          </div>

          <div className="clearfix">
            <div className="col span_5_of_12">

              <div
                style={{
                  backgroundColor: 'transparent', fontSize: '16px', width: '100%', height: '72px', display: 'inline-block', position: 'relative', lineHeight: '24px', fontFamily: 'Roboto, sans-serif', transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', cursor: 'auto', float: 'left',
                }}
              >
                <Field name="ispuState" id="ispuState" className="width100 fontSize_4 color_000" label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_STATE_TEXT} options={states} value="MD" component={renderDropdown} onChange={this.handleChange.bind(this)} disabled={!formEnabled} />
                <hr
                  style={{
                    bottom: '8px', borderTop: 'none rgb(224, 224, 224)', borderRight: 'none rgb(224, 224, 224)', borderBottom: '1px solid rgb(224, 224, 224)', borderLeft: 'none', boxSizing: 'content-box', margin: '0px', position: 'absolute', width: '100%',
                  }}
                />
              </div>

            </div>
            <div className="col span_6_of_12 floatRight">
              <Field className="leftAlign width100 fontSize_4" component={renderField} type="text" id="ispuPostalCode" name="ispuPostalCode" label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_ZIPCODE_TEXT} disabled={!formEnabled} />
            </div>
          </div>

          <div className="clearfix">
            <Field className="leftAlign width100 fontSize_4" component={renderField} type="text" id="emailAddress" name="emailAddress" label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_EMAIL_TEXT} disabled={!formEnabled} />
          </div>

          <div className="clearfix">
            <Field className="leftAlign width100 fontSize_4" component={renderField} type="text" id="phoneNumber" name="phoneNumber" label={cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_PHONE_NUMBER_TEXT} disabled={!formEnabled} />
          </div>

          <footer className="textAlignCenter footerContent width100 margin24 onlyTopMargin">
            <div className="clearfix">
              <Button className="primary button large" type="submit" disabled={!formEnabled || !valid || submitting}>{cqContent.label.OD_CHECKOUT_DELIVERY_ADDRESS_BUTTON_TEXT}</Button>
            </div>
          </footer>
        </form>

      </div>

    );
  }
}

TradeInAddressForm.propTypes = {
  handleSubmit: PropTypes.func,
  cqContent: PropTypes.object,
  formEnabled: PropTypes.bool,
  initialValues: PropTypes.object,
  valid: PropTypes.bool,
  submitting: PropTypes.any,
  states: PropTypes.array,
};

TradeInAddressForm.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'TradeInAddressForm',
  validate,
})(TradeInAddressForm);
