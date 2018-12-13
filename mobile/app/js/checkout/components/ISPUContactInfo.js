import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import TextField from 'material-ui/TextField';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Loader from '../../common/Loader/Loader';
import styles from '../../common/Constants/FormStyles';

const validate = (values, props) => {
  const errors = {};
  const fields = ['email', 'phoneNumber'];
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  const phoneRegex = /^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/i;
  fields.forEach((input) => {
    switch (input) {
      case 'email':
        if (typeof values.get(input) === 'undefined' || values.get(input) === '') {
          errors[input] = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
        } else if (!emailRegex.test(values.get(input))) {
          errors[input] = props.cqContent.error.OD_CHECKOUT_ISPU_CONTACT_INFO_INVALID_EMAIL_ERROR;
        }
        break;
      case 'phoneNumber':
        if (typeof values.get(input) === 'undefined' || values.get(input) === '') {
          errors[input] = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
        } else if (!phoneRegex.test(values.get(input))) {
          errors[input] = props.cqContent.error.OD_CHECKOUT_ISPU_CONTACT_INFO_INVALID_PHONE_NUMBER_ERROR;
        }
        break;
      default:
    }
    if ((input === 'email' || input === 'phone') && (typeof values.get(input) === 'undefined' || values.get(input) === '')) {
      errors[input] = props.cqContent.label.OD_CHECKOUT_FORM_FIELD_REQUIRED_TEXT;
    }
  });
  return errors;
};

const customErrorStyle = {
  float: 'left',
  lineHeight: '20px',
  backgroundColor: '#fff',
  width: '100%',
};

// eslint-disable-next-line react/prop-types
const renderField = ({ input, label, type, meta: { active, touched, error }, ...custom }) => ( // eslint-disable-line
  <TextField
    hintText={label}
    underlineFocusStyle={styles.underlineFocusStyle}
    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
    style={{ width: '100%', float: 'left' }}
    floatingLabelText={label}
    errorStyle={customErrorStyle}
    errorText={!active && touched && error}
    {...input}
    {...custom}

  />
);

class ISPUContactInfo extends Component {
  constructor(props) {
    super(props);
    this.checkboxSelected = this.checkboxSelected.bind(this);
  }
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
  componentWillMount() {
    this.setState({ defaultChecked: true });
  }
  handleChange(event) {
    this.setState({ activeSMSCapableMtn: event.target.value });
  }
  checkboxSelected() {
    this.setState({ defaultChecked: !this.state.defaultChecked });
  }

  render() {
    const {
      cqContent, handleSubmit, submitISPU, storeDetails, tradeIn, tradeInAddress, activeSMSCapableMtnList,
    } = this.props;
    const renderDropdown = ({ input, label, ...custom }) => {
      const { options, ...rest } = custom;
      return (
        <div className="selectpicker">
          <select
            {...input}
            {...rest}
            value={this.state.activeSMSCapableMtn}
            onChange={this.handleChange.bind(this)}
            style={{
              width: '100%', border: 'none', bottom: '10px', position: 'absolute', padding: 0,
            }}
          >
            {options.map((optionLabel, id) => (<option key={id} value={optionLabel}>{optionLabel}</option>))}
          </select>
          <label
            htmlFor="zipcode"
            style={{
              userSelect: 'none', position: 'absolute', top: '38px', transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', zIndex: '1', lineHeight: '22px', transformOrigin: 'left top 0px', pointerEvents: 'none', color: 'rgba(0, 0, 0, 0.298039)', transform: 'scale(0.8) translate(0px, 36px)', display: 'block',
            }}
          >{label}
          </label>
        </div>);
    };
    return (
      <div className="pad12 onlyTopPad">
        {!this.props.contactInfoRequired &&
          <Link to="/storeDetailPage" className="secondaryCTA m-back color_000 fontTextBold" analyticstrack="to-store-details">{cqContent.label.OD_CHECKOUT_BACK_TEXT}</Link>
        }
        <div className="pad18">
          {this.props.isFetching === true && <Loader />}
          <div className="section group">
            <div>
              <h2 className="textAlignCenter">{cqContent.label.OD_CHECKOUT_ISPU_CONTACT_INFO_TITLE_TEXT}</h2>
              <div className="smallText textAlignCenter margin12 onlyTopMargin">
                {cqContent.label.OD_CHECKOUT_ISPU_CONTACT_INFO_DESCRIPTION_TEXT}
              </div>
              <div className="fontTextMedium textAlignCenter">{storeDetails.storeAddress}.</div>
            </div>
          </div>
          <div className="section group margin24 onlyTopMargin">
            <form onSubmit="" name="contactInformation">
              <div className="clearfix width100">
                <div className="section group pad10">
                  <Field component={renderField} aria-label="EMAIL" type="text" id="email" name="email" className="" />
                  <div className="pad10 noLeftPad">
                    <label htmlFor="email" className="fontSize_3 color_959595">{cqContent.label.OD_CHECKOUT_ISPU_CONTACT_INFO_EMAIL_TEXT}</label>
                  </div>
                </div>
                {(activeSMSCapableMtnList && activeSMSCapableMtnList.length) ?
                  <div className="section group pad10">
                    <div
                      style={{
                        backgroundColor: 'transparent', fontSize: '16px', width: '100%', height: '72px', display: 'inline-block', position: 'relative', top: '-25px', lineHeight: '24px', fontFamily: 'Roboto, sans-serif', transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', cursor: 'auto', float: 'left',
                      }}
                    >
                      <Field name="activeSMSCapableMtnList" id="state" className="width100 fontSize_4 color_000" label={cqContent.label.OD_CHECKOUT_ISPU_CONTACT_INFO_PHONE_NUMBER_TEXT} options={activeSMSCapableMtnList} value="MD" component={renderDropdown} />
                      <hr
                        style={{
                          bottom: '8px', borderTop: 'none rgb(224, 224, 224)', borderRight: 'none rgb(224, 224, 224)', borderBottom: '1px solid rgb(224, 224, 224)', borderLeft: 'none', boxSizing: 'content-box', margin: '0px', position: 'absolute', width: '100%',
                        }}
                      />
                    </div>
                  </div> :
                  <div className="section group pad10">
                    <Field component={renderField} aria-label="Mobile Number" type="text" id="phoneNumber" name="phoneNumber" className="" />
                    <div className="pad10 noLeftPad">
                      <label htmlFor="phoneNumber" className="fontSize_3 color_959595">{cqContent.label.OD_CHECKOUT_ISPU_CONTACT_INFO_PHONE_NUMBER_TEXT}</label>
                    </div>
                  </div>}
                <div className="section group pad10 ">
                  <div className="span_2_of_12 verticalCenter leftAlign bold bolder">
                    <Field
                      className="checkbox"
                      name="alertCheckBox"
                      id="alertCheckBox"
                      component="input"
                      type="checkbox"
                      onClick={this.checkboxSelected}
                      checked={this.state.defaultChecked}
                    />
                    <label
                      htmlFor="alertCheckBox"
                      className="displayInlineBlock"
                      aria-checked={this.state.defaultChecked}
                    >
                      <svg className="checkboxContainer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><rect className="checkboxRectangleOutline" x="0" y="0" rx="14" ry="14" fill="none" /><rect className="checkboxRectangle" x="0" y="0" rx="14" ry="14" fill="none" /><path className="checkboxCheckmark" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                    </label>
                  </div>
                  <div className="span_10_of_12 verticalCenter leftAlign">
                    <div className="pad6 onlyLeftPad fontSize_2 color_959595">
                      {cqContent.label.OPTIN_SMS_STATUS_UPDATE_CHECKBOX_LABEL_ISPU} {cqContent.label.OD_CHECKOUT_CONDITION_LBL}
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <button
              className="button large primary centerBlock margin24 onlyTopMargin"
              type="submit"
              analyticstrack="submit-store-contact-info"
              onClick={
                handleSubmit((data) => {
                  const param = Object.assign({}, data.toJS());
                  param.shippingAddressType = 'pickUpStore';
                  param.orderId = this.props.orderId;
                  param.storeId = this.props.storeId;
                  param.standaloneAccessories = false;
                  param.longitude = (storeDetails.longitude ? storeDetails.longitude : '');
                  param.latitude = (storeDetails.latitude ? storeDetails.latitude : '');
                  param.activeSMSCapableMtnList = this.props.activeSMSCapableMtnList.length;
                  if (tradeIn && tradeInAddress) {
                    param.ispuLastName = tradeInAddress.lastName;
                    param.ispuFirstName = tradeInAddress.firstName;
                    param.ispuState = tradeInAddress.state;
                    param.ispuPostalCode = tradeInAddress.zipcode;
                    param.ispuAddress1 = tradeInAddress.address1;
                    param.ispuAddress2 = tradeInAddress.address2;
                    param.ispuCity = tradeInAddress.city;
                    if (tradeInAddress.companyName) {
                      param.ispuCOName = tradeInAddress.companyName;
                    }
                  }
                  if (param.activeSMSCapableMtnList) {
                    param.activeSMSCapableMtnList = this.state.activeSMSCapableMtn ? this.state.activeSMSCapableMtn : this.props.activeSMSCapableMtnList[0];
                  } else {
                    param.activeSMSCapableMtnList = null;
                  }
                  param.phoneNumber = this.state.activeSMSCapableMtn ? this.state.activeSMSCapableMtn : this.props.activeSMSCapableMtnList[0];
                  param.shipOptionChangeOnly = true;
                  submitISPU(param);// despatches ISPU confirmaation
                })
              }
            >
              Continue
            </button>
          </div>
        </div>
      </div>

    );
  }
}
ISPUContactInfo.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

ISPUContactInfo.propTypes = {
  activeSMSCapableMtnList: PropTypes.array,
  storeId: PropTypes.string,
  orderId: PropTypes.string,
  isFetching: PropTypes.bool,
  cqContent: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitISPU: PropTypes.func,
  storeDetails: PropTypes.object,
  tradeIn: PropTypes.object,
  tradeInAddress: PropTypes.object,
  contactInfoRequired: PropTypes.bool,
};

export default reduxForm({
  form: 'ISPUContactInfoForm',
  validate,
})(ISPUContactInfo);
